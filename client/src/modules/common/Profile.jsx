
import React, { useContext,useState } from 'react';
import { UserContext } from './userContext';
import Navbar from './Navbar';

const ProfilePage = () => {
    // Determine if the user is for a user or a hospital based on the presence of specific fields
    const { user, isAuthenticated, handleLogout } = useContext(UserContext);
    const isHospital = user.departments && user.availableServices;

    return (
      <>
      <Navbar/>
        <div className="user-page">
            <h2>{isHospital ? 'Hospital user' : 'User user'}</h2>

            {/* user Information */}
            <div className="user-info">
                <h3>user Information</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>

                {isHospital ? (
                    <>
                        <p><strong>Address:</strong> {`${user.address?.street || 'N/A'}, ${user.address?.city || 'N/A'}, ${user.address?.state || 'N/A'}`}</p>
                        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                        <p><strong>Departments:</strong> {user.departments.join(', ') || 'N/A'}</p>
                        <p><strong>Available Services:</strong> {user.availableServices.join(', ') || 'N/A'}</p>
                        <p><strong>Ratings:</strong> {user.ratings || 'N/A'}/5</p>
                    </>
                ) : (
                    <>
                        <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString() || 'N/A'}</p>
                        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                        <p><strong>Medical History:</strong> {user.medicalHistory?.join(', ') || 'None'}</p>
                    </>
                )}
            </div>

            {/* Appointments Section */}
            <div className="appointments-section">
                <h3>Appointments</h3>
                {user.appointments.length === 0 ? (
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
                            {user.appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{isHospital ? appointment.userId?.name || 'N/A' : appointment.hospitalId?.name || 'N/A'}</td>
                                    <td>{appointment.status}</td>
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

export default ProfilePage;
