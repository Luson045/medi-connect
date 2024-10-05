import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import '../../styles/HospitalList.css';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          'https://medi-connect-f671.onrender.com/hospitalapi/'
        );
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals', error);
      }
    };

    fetchHospitals();
  }, []);

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
        }
      );

      alert(response.data.message);
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

    const filtered = hospitals.filter((hospital) => {
      const nameMatch = hospital.name?.toLowerCase().includes(query) || false;
      const address = hospital.address || {};
      const streetMatch = address.street?.toLowerCase().includes(query) || false;
      const cityMatch = address.city?.toLowerCase().includes(query) || false;
      const stateMatch = address.state?.toLowerCase().includes(query) || false;

      return nameMatch || streetMatch || cityMatch || stateMatch;
    });

    setFilteredHospitals(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="hospital-list-container container mt-8">
        <h2 className="text-center mb-4 mt-8">Hospitals</h2>

        {/* Search bar */}
        <div className="search-bar mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="row">
          {filteredHospitals.map((hospital) => (
            <div key={hospital._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title">{hospital.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Address:</strong> {hospital.address?.street || 'N/A'},{' '}
                    {hospital.address?.city || 'N/A'}, {hospital.address?.state || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {hospital.phone || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Website:</strong> <a href={hospital.website}>{hospital.website || 'N/A'}</a>
                  </p>
                  <p className="card-text">
                    <strong>Departments:</strong> {hospital.departments?.join(', ') || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Available Services:</strong>{' '}
                    {hospital.availableServices?.join(', ') || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Ratings:</strong> {hospital.ratings || 'N/A'}/5
                  </p>
                  <p className="card-text">
                    <strong>Running Appointments:</strong>{' '}
                    {hospital.appointments.length || 'N/A'}
                  </p>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    Book Appointment
                  </button>
                </div>

                {selectedHospital && selectedHospital._id === hospital._id && (
                  <div className="booking-form mt-4 p-3 bg-light">
                    <h4>Book Appointment</h4>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="date"
                      value={bookingData.date}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="reason"
                      placeholder="Reason for appointment"
                      value={bookingData.reason}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleBooking(hospital._id)}
                    >
                      Confirm Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HospitalsList;
