import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import '../../styles/HospitalList.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { UserContext } from '../common/userContext';
import hospitalsData from '../../data/hospitalsData'; // Import local hospital data

const mindate = new Date().toISOString().split('T')[0];

const HospitalsList = () => {
  const { user } = useContext(UserContext);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    reason: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Filter menu visibility state
  const [filters, setFilters] = useState({
    departments: '',
    availableServices: '',
    ratings: '',
  });
  const navigate = useNavigate();

  // Fetch hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          'https://medi-connect-f671.onrender.com/hospitalapi/',
        );

        // Combine local data and fetched data
        const combinedHospitals = [...hospitalsData, ...response.data];
        setHospitals(combinedHospitals);
        setFilteredHospitals(combinedHospitals);
      } catch (error) {
        console.error('Error fetching hospitals', error);
        // Set local data as fallback in case of error
        setHospitals(hospitalsData);
        setFilteredHospitals(hospitalsData);
      }
    };

    fetchHospitals();
  }, []);

  // Handle appointment booking
  const handleBooking = async (hospitalId) => {
    try {
      let userId = user ? user._id : '';
      const response = await axios.post(
        `https://medi-connect-f671.onrender.com/hospitalapi/hospitals/${hospitalId}/book`,
        {
          userId,
          ...bookingData,
        },
      );
      alert(response.data.message);
      setSelectedHospital(null);
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
      const nameMatch = hospital.name?.toLowerCase().includes(query) || false;
      const address = hospital.address || {}; // Default to an empty object if address is null or undefined
      const streetMatch = address.street?.toLowerCase().includes(query) || false;
      const cityMatch = address.city?.toLowerCase().includes(query) || false;
      const stateMatch = address.state?.toLowerCase().includes(query) || false;

      return nameMatch || streetMatch || cityMatch || stateMatch;
    });

    setFilteredHospitals(filtered);
  };

  const handleFilterToggle = () => {
    setShowFilterMenu(!showFilterMenu); // Toggle filter menu visibility
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = hospitals.filter((hospital) => {
      const departmentMatch = filters.departments
        ? hospital.departments?.includes(filters.departments)
        : true;
      const serviceMatch = filters.availableServices
        ? hospital.availableServices?.includes(filters.availableServices)
        : true;
      const ratingMatch = filters.ratings
        ? hospital.ratings >= parseFloat(filters.ratings)
        : true;

      return departmentMatch && serviceMatch && ratingMatch;
    });

    setFilteredHospitals(filtered);
  };

  const clearFilters = () => {
    setFilters({
      departments: '',
      availableServices: '',
      ratings: '',
    });
    setFilteredHospitals(hospitals); // Reset to the full list
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

        {/* Filter menu button */}
        <div className="filter-menu mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleFilterToggle}
          >
            {showFilterMenu ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter menu */}
        {showFilterMenu && (
          <div className="filter-options bg-gray-100 p-4 rounded mb-4">
            <div className="mb-2">
              <label className="block text-gray-700">Department:</label>
              <input
                type="text"
                name="departments"
                value={filters.departments}
                onChange={handleFilterChange}
                className="form-input w-full rounded-md border-gray-300"
                placeholder="Enter department"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Available Services:</label>
              <input
                type="text"
                name="availableServices"
                value={filters.availableServices}
                onChange={handleFilterChange}
                className="form-input w-full rounded-md border-gray-300"
                placeholder="Enter service"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Ratings (>=):</label>
              <input
                type="number"
                name="ratings"
                value={filters.ratings}
                onChange={handleFilterChange}
                className="form-input w-full rounded-md border-gray-300"
                placeholder="Enter minimum rating"
                min="1"
                max="5"
                step="0.1"
              />
            </div>

            {/* Apply and Clear Filters buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Hospital cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="bg-blue-500 text-white px-4 py-2">
                <h5 className="text-lg font-semibold">{hospital.name}</h5>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  <strong>Address:</strong> {hospital.address?.street || 'N/A'},{' '}
                  {hospital.address?.city || 'N/A'},{' '}
                  {hospital.address?.state || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {hospital.phone || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <a
                    href={hospital.website}
                    className="text-blue-500 underline"
                  >
                    {hospital.website || 'N/A'}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Departments:</strong>{' '}
                  {hospital.departments?.join(', ') || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Available Services:</strong>{' '}
                  {hospital.availableServices?.join(', ') || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Ratings:</strong> {hospital.ratings || 'N/A'}/5
                </p>
                <p className="text-gray-700">
                  <strong>Running Appointments:</strong>{' '}
                  {hospital.appointments.length || 'N/A'}
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
                    min={mindate}
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
};

export default HospitalsList;
