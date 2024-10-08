import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapPin, FaHospital } from 'react-icons/fa'; // Import the icons
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer to render icons to HTML
import Navbar from './Navbar';

const HospitalsAround = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [hospitals, setHospitals] = useState([]); // State to store hospitals

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
      if (data && data.elements.length > 0) {
        const hospitalData = data.elements.map((hospital) => {
          let hospitalLat, hospitalLng;
          let hospitalAddress =
            hospital.tags.addr_full || 'Address not available'; // Use addr_full for address

          if (hospital.type === 'node') {
            hospitalLat = hospital.lat;
            hospitalLng = hospital.lon;
          } else if (hospital.type === 'way' || hospital.type === 'relation') {
            hospitalLat = hospital.center.lat;
            hospitalLng = hospital.center.lon;
          }

          return {
            name: hospital.tags.name || 'Unnamed Hospital',
            address: hospitalAddress, // Get the address from the tags
            lat: hospitalLat,
            lng: hospitalLng,
          };
        });
        setHospitals(hospitalData); // Store hospitals in state
      } else {
        console.log('No hospitals found nearby.');
      }
    } catch (error) {
      console.error('Error fetching hospitals from Overpass API:', error);
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
      // Remove existing hospital markers to prevent duplicates (optional)
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
          <div>
            <br />
            <p>
              Your Location: Latitude {location.lat}, Longitude {location.lng}
            </p>
            <br />
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
            {hospitals.length > 0 ? (
              <div>
                <h3>Hospitals within 2km:</h3>
                <ul>
                  {hospitals.map((hospital, index) => (
                    <li key={index}>{hospital.name}</li>
                  ))}
                </ul>
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
