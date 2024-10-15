import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { FaMapPin, FaHospital } from 'react-icons/fa'; // Import the icons
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer to render icons to HTML
import { useRecoilState } from 'recoil';
import { mode } from '../store/atom';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine

import Navbar from '../components/Navbar';
import '../styles/Nearbyhospitals.css';

const HospitalsAround = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [dark, setDark] = useRecoilState(mode);
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

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options,
    );
  }, []);

  // Fetch human-readable address using reverse geocoding (Nominatim API)
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
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
          const distance =
            L.latLng(lat, lng).distanceTo(
              L.latLng(hospital.lat, hospital.lng),
            ) / 1000; // distance in km
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
        console.error('Error removing route control:', error);
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
      createMarker: () => {}, // Removes default markers (if you want custom markers)
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }], // Set route color to blue
      },
    }).addTo(map);

    setRouteControl(newRouteControl);
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        {' '}
        {/* Add this wrapper for margin */}
        {location.lat && location.lng ? (
          <div className="flex flex-col-reverse  py-16  md:flex-row ">
            <div
              className={`h-1/2 md:w-[30%] md:h-screen  md:overflow-y-scroll ${
                dark === 'dark'
                  ? 'bg-gray-900 text-gray-200'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div
                className={`${
                  dark === 'dark'
                    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100 shadow-2xl'
                    : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
                } px-2 py-2.5 `}
              >
                <p className="font-bold">Your Location: {address}</p>
              </div>
              <div>
                {loadingHospitals ? (
                  <p>Loading hospitals...</p>
                ) : hospitals.length > 0 ? (
                  <div className="container mx-auto ">
                    <br />
                    <h3
                      className={`text-lg tracking-widest text-center font-semibold ${
                        dark === 'dark' ? 'text-[#f6e05e]' : 'text-[#c229b8]'
                      }`}
                    >
                      Hospitals within 2km:
                    </h3>
                    <br />
                    <div className="flex flex-col w-full">
                      {hospitals.map((hospital, index) => {
                        return (
                          <div
                            key={index}
                            className={`mx-auto w-full  rounded-xl shadow-2xl  p-4 mb-3
                               ${
                                 dark === 'dark'
                                   ? 'bg-[#2d3748] text-[#e2e8f0]'
                                   : 'bg-[#fff] text-[#333]'
                               }`}
                          >
                            <div className="uppercase tracking-wide text-[10px] text-custom-blue font-semibold ">
                              Hospital
                            </div>
                            <h1
                              className={`block mt-1 text-lg leading-tight font-semibold  ${
                                dark === 'dark'
                                  ? 'text-[#f6e05e]'
                                  : 'text-[#c229b8]'
                              }`}
                            >
                              {hospital.name}
                            </h1>
                            {/* <div className="mt-2 text-sm">
                          <span className="text-gray-700 font-semibold">Address:</span>
                          <p className='text-xs'>{hospital.address}</p>
                        </div> */}
                            <div className="mt-2 text-sm">
                              <span className="font-semibold">
                                Coordinates:
                              </span>
                              <p className="text-xs">
                                Lat: {hospital.lat}, Lon: {hospital.lng}
                              </p>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className=" font-semibold">Distance:</span>
                              <p className="text-xs">
                                {distances[hospital.name]} km
                              </p>
                            </div>
                            <button
                              onClick={() => showRouteToHospital(hospital)}
                              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              Show Route
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p>No hospitals found nearby.</p>
                )}
              </div>
            </div>
            <div
              id="map"
              className="h-[50vh] w-full  md:w-[70%] md:h-screen "
            ></div>
          </div>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </>
  );
};

export default HospitalsAround;
