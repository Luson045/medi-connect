import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../common/Navbar';
import '../../styles/OPD.css';

function OPDRegistrationForm() {
	const [formData, setFormData] = useState({
		name: '',
		age: '',
		gender: '',
		contact: '',
		address: '',
		department: '',
		symptoms: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`https://medi-connect-f671.onrender.com/register`, {
				data: formData,
			})
			.then((response) => {
				console.log('Successfully registered!', response.data);
			})
			.catch((error) => {
				console.error('There was an error registering!', error);
			});
		console.log('Form Data Submitted:', formData);
	};

	return (
		<>
			<Navbar />
			<section className='form-container'>
				<h2>OPD Registration</h2>
				<form onSubmit={handleSubmit} className='opd-registration-form'>
					<div className='form-group'>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							placeholder='Enter your full name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Age:</label>
						<input
							type='number'
							name='age'
							placeholder='Enter your age'
							value={formData.age}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Gender:</label>
						<select
							name='gender'
							value={formData.gender}
							onChange={handleChange}
							required
						>
							<option value='' disabled>
								Select gender
							</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
							<option value='Other'>Other</option>
						</select>
					</div>

					<div className='form-group'>
						<label>Contact Number:</label>
						<input
							type='tel'
							name='contact'
							placeholder='Enter your contact number'
							value={formData.contact}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Address:</label>
						<input
							type='text'
							name='address'
							placeholder='Enter your address'
							value={formData.address}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Department:</label>
						<select
							name='department'
							value={formData.department}
							onChange={handleChange}
							required
						>
							<option value='' disabled>
								Select Department
							</option>
							<option value='General Medicine'>General Medicine</option>
							<option value='Pediatrics'>Pediatrics</option>
							<option value='Orthopedics'>Orthopedics</option>
							<option value='Gynecology'>Gynecology</option>
							<option value='Dermatology'>Dermatology</option>
						</select>
					</div>

					<div className='form-group'>
						<label>Symptoms:</label>
						<textarea
							name='symptoms'
							placeholder='Describe your symptoms'
							value={formData.symptoms}
							onChange={handleChange}
							required
						></textarea>
					</div>

					<button type='submit' className='submit-btn'>
						Register
					</button>
					<Link to='/' className='back-button'>
						Back to Home
					</Link>
				</form>
			</section>
		</>
	);
}

export default OPDRegistrationForm;
