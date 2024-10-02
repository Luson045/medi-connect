import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import Navbar from './Navbar';
import '../../styles/UserProfile.css';

const ProfilePage = () => {
	const { user, isAuthenticated, handleLogout } = useContext(UserContext);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		// Fetch the user data if authenticated
		const fetchUserData = async () => {
			if (isAuthenticated) {
				try {
					const response = await fetch(
						'https://medi-connect-f671.onrender.com/auth/profile',
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'x-auth-token': localStorage.getItem('token'),
							},
						}
					);
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
	}, [isAuthenticated]); // Refetch if authentication status changes

	// Fallback for when user data is not available yet
	if (!userData) {
		return <div>Loading...</div>;
	}

	const isHospital = userData.departments && userData.availableServices;

	return (
		<>
			<Navbar />
			<div className='user-page'>
				<h2>{isHospital ? 'Hospital user' : 'User user'}</h2>

				{/* User Information */}
				<div className='user-info'>
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
				<div className='appointments-section'>
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
			</div>
		</>
	);
};

export default ProfilePage;
