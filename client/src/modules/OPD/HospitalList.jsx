import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import '../../styles/HospitalList.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { UserContext } from '../common/userContext';

const HospitalsList = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    reason: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // Search query stats
  const navigate = useNavigate();
  // Fetch hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          'https://medi-connect-f671.onrender.com/hospitalapi/',
        );
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals', error);
      }
    };

    fetchHospitals();
  }, []);

  // Handle appointment booking
  const handleBooking = async (hospitalId) => {
    try {
      let userId = '';
      if (user) {
        userId = user._id;
      } else {
        userId = '';
      }
      const response = await axios.post(
        `https://medi-connect-f671.onrender.com/hospitalapi/hospitals/${hospitalId}/book`,
        {
          userId,
          ...bookingData,
        },
      );
      alert(response.data.message);
      setSelectedHospital(null)
      navigate(`/profile`);
    } catch (error) {
      alert('Error booking appointment');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter hospitals by name or address (street, city, or state)
    const filtered = hospitals.filter((hospital) => {
      const nameMatch = hospital.name?.toLowerCase().includes(query) || false; // Ensure it evaluates to false if name is missing
      const address = hospital.address || {}; // Default to an empty object if address is null or undefined
      const streetMatch =
        address.street?.toLowerCase().includes(query) || false;
      const cityMatch = address.city?.toLowerCase().includes(query) || false;
      const stateMatch = address.state?.toLowerCase().includes(query) || false;

      return nameMatch || streetMatch || cityMatch || stateMatch;
    });

    setFilteredHospitals(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="hospital-list-container container mx-auto mt-8 px-4">
        <h2 className="text-center mb-4 mt-8 text-2xl font-bold">Hospitals</h2>
  
        {/* Search bar */}
        <div className="search-bar mb-4">
          <input
            type="text"
            className="form-input w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-blue-500 text-white px-4 py-2">
                <h5 className="text-lg font-semibold">{hospital.name}</h5>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  <strong>Address:</strong> {hospital.address?.street || 'N/A'},{' '}
                  {hospital.address?.city || 'N/A'}, {hospital.address?.state || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {hospital.phone || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <a href={hospital.website} className="text-blue-500 underline">
                    {hospital.website || 'N/A'}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Departments:</strong> {hospital.departments?.join(', ') || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Available Services:</strong>{' '}
                  {hospital.availableServices?.join(', ') || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Ratings:</strong> {hospital.ratings || 'N/A'}/5
                </p>
                <p className="text-gray-700">
                  <strong>Running Appointments:</strong> {hospital.appointments.length || 'N/A'}
                </p>
              </div>
              <div className="text-center p-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => setSelectedHospital(hospital)}
                >
                  Book Appointment
                </button>
              </div>
  
              {selectedHospital && selectedHospital._id === hospital._id && (
                <div className="booking-form mt-4 p-4 bg-gray-100 rounded">
                  <h4 className="text-lg font-bold">Book Appointment</h4>
                  <input
                    type="date"
                    className="form-input w-full mb-2 p-2 rounded border-gray-300"
                    name="date"
                    value={bookingData.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-input w-full mb-2 p-2 rounded border-gray-300"
                    name="reason"
                    placeholder="Reason for appointment"
                    value={bookingData.reason}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={() => handleBooking(hospital._id)}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HospitalsList;
