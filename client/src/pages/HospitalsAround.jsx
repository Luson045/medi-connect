import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import { FaMapPin, FaHospital } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import Navbar from '../components/Navbar';
import '../styles/Nearbyhospitals.css';

const HospitalsAround = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [routeControl, setRouteControl] = useState(null); // State to store the current route
  const [distances, setDistances] = useState({}); // Store distances for each hospital
  const [address, setAddress] = useState('Fetching address...'); // State for the human-readable address

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lat: latitude, lng: longitude });
      findHospitalsNearby(latitude, longitude);
      fetchAddress(latitude, longitude); // Fetch human-readable address
    };

    const errorCallback = (error) => {
      console.error('Error getting location: ', error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  }, []);

  // Fetch human-readable address using reverse geocoding (Nominatim API)
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name); // Set the human-readable address
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Unable to fetch address');
    }
  };

  async function findHospitalsNearby(lat, lng) {
    setLoadingHospitals(true);
    const radius = 2000;

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        way["amenity"="hospital"](around:${radius},${lat},${lng});
        relation["amenity"="hospital"](around:${radius},${lat},${lng});
      );
      out center;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.elements.length > 0) {
        const hospitalData = data.elements.map((hospital) => {
          let hospitalLat, hospitalLng;
          if (hospital.type === 'node') {
            hospitalLat = hospital.lat;
            hospitalLng = hospital.lon;
          } else if (hospital.type === 'way' || hospital.type === 'relation') {
            hospitalLat = hospital.center.lat;
            hospitalLng = hospital.center.lon;
          }

          return {
            name: hospital.tags.name || 'Unnamed Hospital',
            lat: hospitalLat,
            lng: hospitalLng,
          };
        });

        // Calculate distances to each hospital
        const calculatedDistances = hospitalData.reduce((acc, hospital) => {
          const distance = L.latLng(lat, lng).distanceTo(L.latLng(hospital.lat, hospital.lng)) / 1000; // distance in km
          acc[hospital.name] = distance.toFixed(2); // Keep 2 decimal places
          return acc;
        }, {});

        setHospitals(hospitalData);
        setDistances(calculatedDistances); // Store distances
      } else {
        setHospitals([]);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoadingHospitals(false);
    }
  }

  // Initialize map and markers
  useEffect(() => {
    if (location.lat && location.lng && !map) {
      const leafletMap = L.map('map').setView([location.lat, location.lng], 13);
      setMap(leafletMap);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(leafletMap);

      const currLocIconHtml = ReactDOMServer.renderToString(
        <FaMapPin style={{ color: 'blue', fontSize: '24px' }} />,
      );
      const currLocIcon = L.divIcon({
        html: currLocIconHtml,
        className: '',
        iconSize: [24, 24],
      });

      L.marker([location.lat, location.lng], { icon: currLocIcon })
        .addTo(leafletMap)
        .bindPopup('You are here!')
        .openPopup();
    }

    // Add hospital markers
    if (map && hospitals.length > 0) {
      hospitals.forEach((hospital) => {
        const hospitalIconHtml = ReactDOMServer.renderToString(
          <FaHospital style={{ color: 'red', fontSize: '24px' }} />,
        );
        const hospitalIcon = L.divIcon({
          html: hospitalIconHtml,
          className: '',
          iconSize: [24, 24],
        });

        L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
          .addTo(map)
          .bindPopup(hospital.name);
      });
    }
  }, [location, map, hospitals]);

  // Show route from current location to selected hospital
  const showRouteToHospital = (hospital) => {
    // Only proceed if the map is initialized
    if (!map) return;

    // Remove the previous route if it exists
    if (routeControl) {
      try {
        map.removeControl(routeControl);
      } catch (error) {
        console.error("Error removing route control:", error);
      }
    }

    // Create a new route control
    const newRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(location.lat, location.lng), // Current location
        L.latLng(hospital.lat, hospital.lng), // Hospital location
      ],
      routeWhileDragging: true,
      addWaypoints: false, // Disable adding new waypoints
      show: false, // Disable the default instructions control (this hides the panel)
      createMarker: () => { }, // Removes default markers (if you want custom markers)
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }], // Set route color to blue
      },
    }).addTo(map);

    setRouteControl(newRouteControl);
  };

  return (
    <>
      <Navbar />
      <div className="content-container"> {/* Add this wrapper for margin */}
        {location.lat && location.lng ? (
          <div>
            <div className="location-info"> {/* Adjust margin or padding here */}
              <h3 style={{ fontWeight: "600" }}>Your Current Location :</h3>
              <p style={{ fontWeight: "600" }}>{address}</p> {/* Display the human-readable address */}
            </div>
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
            {loadingHospitals ? (
              <p>Loading hospitals...</p>
            ) : hospitals.length > 0 ? (
              <div className='container mx-auto'>
                <div className="flex justify-center">
  <button className='text-lg tracking-widest text-center font-bold text-black mb-3 mt-3 bg-transparent border border-blue-500 px-4 py-2 rounded transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600'>
    Hospitals within 2 km
  </button>
</div>



                <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                  {hospitals.map((hospital, index) => (
                    <div key={index} className="mx-auto w-full bg-white rounded-xl shadow-md p-4">
                      <div className="uppercase tracking-wide text-[10px] text-custom-blue font-semibold ">Hospital</div>
                      <h1 className="block mt-1 text-lg leading-tight font-semibold text-gray-800">{hospital.name}</h1>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-700 font-semibold">Coordinates:</span>
                        <p className='text-xs'>Lat: {hospital.lat}, Lon: {hospital.lng}</p>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-700 font-semibold">Distance:</span>
                        <p className='text-xs'>{distances[hospital.name]} km</p>
                      </div>
                      <button
                        onClick={() => showRouteToHospital(hospital)}
                        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Show Route
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No hospitals found nearby.</p>
            )}
          </div>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </>
  );
};

export default HospitalsAround;
