import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapPin, FaHospital } from 'react-icons/fa'; // Import the icons
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer to render icons to HTML
import { useRecoilState } from 'recoil';
import { mode } from '../store/atom';
import Navbar from '../components/Navbar';

const HospitalsAround = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [hospitals, setHospitals] = useState([]); // State to store hospitals
  const [loadingHospitals, setLoadingHospitals] = useState(false); // Loading state for hospitals
  const [dark, setDark] = useRecoilState(mode);

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
      findHospitalsNearby(latitude, longitude); // Fetch hospitals
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

  // Fetch hospitals within 2km using Overpass API
  async function findHospitalsNearby(lat, lng) {
    setLoadingHospitals(true); // Set loading to true when fetching hospitals
    const radius = 2000; // Radius in meters (2km)

    // Overpass API query to find hospitals within a 2km radius
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
      console.log('Overpass API response:', data); // Log the raw API response

      if (data && data.elements.length > 0) {
        const hospitalData = data.elements.map((hospital) => {
          let hospitalLat, hospitalLng;
          let hospitalAddress =
            hospital.tags.addr_full || 'Address not available'; // Use addr_full for address
          console.log({ hospital });
          if (hospital.type === 'node') {
            hospitalLat = hospital.lat;
            hospitalLng = hospital.lon;
          } else if (hospital.type === 'way' || hospital.type === 'relation') {
            hospitalLat = hospital.center.lat;
            hospitalLng = hospital.center.lon;
          }

          return {
            name: hospital.tags.name || 'Unnamed Hospital',
            address: hospitalAddress,
            lat: hospitalLat,
            lng: hospitalLng,
          };
        });
        setHospitals(hospitalData); // Store hospitals in state
      } else {
        console.log('No hospitals found nearby.');
        setHospitals([]); // Clear the list if none found
      }
    } catch (error) {
      console.error('Error fetching hospitals from Overpass API:', error);
    } finally {
      setLoadingHospitals(false); // Stop loading after fetch is done
    }
  }

  // Initialize map and markers
  useEffect(() => {
    if (location.lat && location.lng && !map) {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const leafletMap = L.map('map').setView(
          [location.lat, location.lng],
          13,
        );
        setMap(leafletMap);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(leafletMap);

        // Custom marker for current location
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
    }

    // Add hospital markers if the map and hospitals are available
    if (map && hospitals.length > 0) {
      // Clear old hospital markers
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Marker &&
          !layer._popup._content.includes('You are here!')
        ) {
          map.removeLayer(layer);
        }
      });

      hospitals.forEach((hospital) => {
        // Custom hospital icon using react-icons
        const hospitalIconHtml = ReactDOMServer.renderToString(
          <FaHospital style={{ color: 'red', fontSize: '24px' }} />,
        );

        const hospitalIcon = L.divIcon({
          html: hospitalIconHtml,
          className: '',
          iconSize: [24, 24],
        });

        // Add hospital markers to the map
        L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
          .addTo(map)
          .bindPopup(`${hospital.name}`);
      });
    }
  }, [location, map, hospitals]);

  return (
    <>
      <Navbar />
      <div>
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
                <p className="font-bold">
                  Your Location: Latitude {location.lat}, Longitude{' '}
                  {location.lng}
                </p>
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
