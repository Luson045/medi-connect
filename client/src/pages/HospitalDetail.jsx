import React, { useEffect, useState } from 'react';
import '../styles/UserProfile.css';
import { databaseUrls } from '../data/databaseUrls';
import { useLocation, useNavigate } from 'react-router-dom';

const HospitalDetail = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hospitalId = queryParams.get('id');

  useEffect(() => {
    if (!hospitalId) {
      navigate('/not-found');
    }else{
      // fetch
      fetch(databaseUrls.hospitals.fromId.replace('_id', hospitalId))
      .then((data) => data.json())
      .then((data) => {setUserData(data)})
    }
  },[]);

  if (!hospitalId) {
    return <></>;
  }

  // Fallback for when user data is not available yet
  if (!userData) {
    return <div>Loading...</div>;
  } 

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <div className="user-page">
        <div className="header">
          <h2>Hospital</h2>
        </div>

        {/* User Information */}
        <div className="user-info">
          <h3>Information</h3>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
            <>
              <p>
                <strong>Address:</strong>{' '}
                {`${userData.address?.street || 'N/A'}, ${
                  userData.address?.city || 'N/A'
                }, ${userData.address?.state || 'N/A'}`}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone || 'N/A'}
              </p>
              <p>
                <strong>Departments:</strong>{' '}
                {userData.departments.join(', ') || 'N/A'}
              </p>
              <p>
                <strong>Available Services:</strong>{' '}
                {userData.availableServices.join(', ') || 'N/A'}
              </p>
              <p>
                <strong>Ratings:</strong> {userData.ratings || 'N/A'}/5
              </p>
            </>
        </div>

        {/* Doctors Section */}
        <div className="doctors-section">
          <div className="flex mb-4 pb-4 justify-content-center m-auto">
            <h3 className="m-auto">Doctors</h3>
            <button
              className="ms-4 m-auto"
              onClick={() => {
                navigate(`/checkOPDSchedule?id=${hospitalId}`);
              }}
            >
              View full OPD Schedule
            </button>
          </div>
          {!userData.doctors || userData.doctors.length === 0 ? (
            <p>No doctors added.</p>
          ) : (
            <table className="overflow-x-auto w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {userData.doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.department}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      {doctor.opdSchedule &&
                      Object.values(doctor.opdSchedule).some(
                        (value) => value !== null,
                      ) ? (
                        <p>
                          {Object.keys(doctor.opdSchedule)
                            .filter((day) => doctor.opdSchedule[day] !== null)
                            .map((day) => capitalizeFirstLetter(day))
                            .join(', ')}
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </>
  );
};

export default HospitalDetail;