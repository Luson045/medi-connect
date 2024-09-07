import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/HospitalList.css';
import Navbar from '../common/Navbar';

const HospitalsList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [bookingData, setBookingData] = useState({
        date: '',
        reason: '',
    });
    const [searchQuery, setSearchQuery] = useState(''); // Search query stats
    // Fetch hospitals on component mount
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('https://medi-connect-f671.onrender.com/hospitalapi/');
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
        const userId = '66da14479e0fb718bffca688'; // Replace with actual user ID
        try {
            const response = await axios.post(`https://medi-connect-f671.onrender.com/hospitalapi/hospitals/${hospitalId}/book`, {
                userId,
                ...bookingData,
            });

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

        // Filter hospitals by name or address (street, city, or state)
        const filtered = hospitals.filter(hospital => {
            const nameMatch = hospital.name?.toLowerCase().includes(query) || false; // Ensure it evaluates to false if name is missing
            const address = hospital.address || {}; // Default to an empty object if address is null or undefined
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
          <div className="hospital-list-container">
              <h2>Hospitals</h2>
      
              {/* Search bar */}
              <center><input
                  type="text"
                  className="search-bar"
                  placeholder="Search by name or address..."
                  value={searchQuery}
                  onChange={handleSearch}
              /></center>
      
              <div className="hospital-list">
                  {filteredHospitals.map((hospital) => (
                      <div key={hospital._id} className="hospital-card">
                          <h3>{hospital.name}</h3>
                          
                          {/* Handle null or undefined address safely */}
                          <p>
                              {hospital.address?.street || 'N/A'}, {hospital.address?.city || 'N/A'}, {hospital.address?.state || 'N/A'}
                          </p>
                          
                          <p>Phone: {hospital.phone || 'N/A'}</p>
                          <p>Website: {hospital.website || 'N/A'}</p>
                          <p>Departments: {hospital.departments?.join(', ') || 'N/A'}</p>
                          <p>Available Services: {hospital.availableServices?.join(', ') || 'N/A'}</p>
                          <p>Ratings: {hospital.ratings || 'N/A'}/5</p>
                          <p>Running Appointments: {hospital.appointments.length || 'N/A'}</p>
      
                          <button onClick={() => setSelectedHospital(hospital)}>Book Appointment</button>
      
                          {selectedHospital && selectedHospital._id === hospital._id && (
                              <div className="booking-form">
                                  <h4>Book Appointment</h4>
                                  <input
                                      type="date"
                                      name="date"
                                      value={bookingData.date}
                                      onChange={handleChange}
                                      required
                                  />
                                  <input
                                      type="text"
                                      name="reason"
                                      placeholder="Reason for appointment"
                                      value={bookingData.reason}
                                      onChange={handleChange}
                                      required
                                  />
                                  <button onClick={() => handleBooking(hospital._id)}>Confirm Booking</button>
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