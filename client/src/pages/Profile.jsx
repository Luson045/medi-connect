import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../store/userContext';
import '../styles/UserProfile.css';

// const BASE_URL = "https:://medi-connect-f671.onrender.com/auth/profile"
const BASE_URL = 'https://medi-connect-f671.onrender.com/auth/profile';

const ProfilePage = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle the modal visibility
  const [editData, setEditData] = useState({}); // For storing the editable data
  const [isAddingDoctor, setIsAddingDoctor] = useState(false); // To toggle the Add doctor modal visibility
  const [doctorData, setDoctorData] = useState({}); // For storing the new doctor data
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  useEffect(() => {
    // Fetch the user data if authenticated
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token'),
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  // Fallback for when user data is not available yet
  if (!userData) {
    return <div>Loading...</div>;
  }

  const isHospital = userData.departments && userData.availableServices;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...userData }); // Populate the edit form with current user data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorDataChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorScheduleDataChange = (e) => {
    var { name, value } = e.target;
    const day = name.split('-')[0];
    if (value == ' ') {
      value = '';
    }

    setDoctorData((prevData) => {
      const prevSchedule = prevData.opdSchedule ? prevData.opdSchedule : {};
      prevSchedule[day] = value;
      return { ...prevData, opdSchedule: prevSchedule };
    });
    console.log(JSON.stringify(doctorData));
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/edit`, {
        method: 'POST', // Changed to POST
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Update the local state with the edited data
        setIsEditing(false); // Close the modal
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleConfirmAddDoctor = async () => {
    try {
      const postData = {
        id: userData.id,
        doctor: doctorData,
      };
      const response = await fetch(`${BASE_URL}/addDoctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Update the local state with the edited data
        setIsAddingDoctor(false); // Close the modal
      } else {
        console.error('Failed to add new doctor');
      }
    } catch (error) {
      console.error('Error adding new doctor:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Close the modal without saving changes
  };

  const handleCancelAddDoctor = () => {
    setIsAddingDoctor(false); // Close the modal without saving changes
  };

  return (
    <>
      <div className="user-page">
        <div className="header">
          <h2>{isHospital ? 'Hospital user' : 'User user'}</h2>
          <button className="edit-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>

        {/* User Information */}
        <div className="user-info">
          <h3>User Information</h3>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>

          {isHospital ? (
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
          ) : (
            <>
              <p>
                <strong>Date of Birth:</strong>{' '}
                {new Date(userData.dob).toLocaleDateString() || 'N/A'}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone || 'N/A'}
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender || 'N/A'}
              </p>
              <p>
                <strong>Medical History:</strong>{' '}
                {userData.medicalHistory?.join(', ') || 'None'}
              </p>
            </>
          )}
        </div>

        {/* Appointments Section */}
        <div className="appointments-section">
          <h3>Appointments</h3>
          {userData.appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>{isHospital ? 'Patient' : 'Hospital'}</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      {isHospital
                        ? appointment.userId?.name || 'N/A'
                        : appointment.hospitalId?.name || 'N/A'}
                    </td>
                    <td>{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Doctors Section */}
        <div className="doctors-section">
          <div className="flex mb-4 pb-4 justify-content-center m-auto">
            <h3 className="m-auto">Doctors</h3>
            <button
              className="ms-4 m-auto"
              onClick={() => {
                setIsAddingDoctor(true);
              }}
            >
              Add Doctor
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

      {/* Add Doctor Modal */}
      {isAddingDoctor && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="font-bold text-lg">Add Doctor</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={doctorData.name}
                onChange={handleDoctorDataChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={doctorData.phone}
                onChange={handleDoctorDataChange}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <select
                name="department"
                className="rounded py-1 px-2"
                value={doctorData.department}
                required
                onChange={handleDoctorDataChange}
              >
                <option value="" disabled selected>
                  Select Department
                </option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="gynecology">Gynecology</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>
            <div>
              <p>Schedule:</p>
            </div>
            <div className="form-group my-2">
              {days.map((day) => (
                <div
                  className="form-group flex flex-row m-1"
                  key={`${day}-time-container`}
                >
                  <label className="m-auto w-25">
                    {capitalizeFirstLetter(day)}:
                  </label>
                  <div className="container flex flex-row">
                    <input
                      type="text"
                      key={`${day}-time`}
                      placeholder={`(Not available)`}
                      id={`${day}-time`}
                      name={`${day}-time`}
                      className="w-auto"
                      value={doctorData.opdSchedule?.[day] || ''}
                      onChange={handleDoctorScheduleDataChange}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={handleCancelAddDoctor}>Cancel</button>
              <button onClick={handleConfirmAddDoctor}>Confirm Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={
                  editData.dob
                    ? new Date(editData.dob).toISOString().substr(0, 10)
                    : ''
                }
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={editData.gender}
                onChange={handleChange}
              >
                <option value="N/A">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Medical History:</label>
              <input
                type="text"
                name="medicalHistory"
                value={editData.medicalHistory?.join(', ') || ''}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    medicalHistory: e.target.value.split(','),
                  }))
                }
              />
            </div>

            {/* Add more fields as required depending on if it's a hospital or a regular user */}
            {isHospital && (
              <>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editData.address?.street || ''}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        address: { ...prev.address, street: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Departments:</label>
                  <input
                    type="text"
                    name="departments"
                    value={editData.departments.join(', ')}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        departments: e.target.value.split(','),
                      }))
                    }
                  />
                </div>
              </>
            )}

            <div className="modal-actions">
              <button onClick={handleConfirmEdit}>Confirm Edit</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
