import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Success from './Success';
import axios from 'axios';
import Navbar from '../common/Navbar';
import '../../styles/OPD.css'

function OPDRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    department: '',
    symptoms: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId="luson";
    axios.post(`http://localhost:5000/register`, { data: formData })
    .then(response => {
      console.error('Successful registering!', response.data);
    })
    .catch(error => {
      console.error('There was an error registering!', error);
    });
    console.log('Form Data Submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <h2>OPD Registration</h2>
      <form onSubmit={handleSubmit} className="opd-registration-form">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Department:</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Dermatology">Dermatology</option>
          </select>
        </div>
        <div>
          <label>Symptoms:</label>
          <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Register</button>
        <Link to="/" className="back-button">Back to Home</Link>
      </form>
    </div>
    </>
  );
}

export default OPDRegistrationForm;
