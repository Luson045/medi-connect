import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../common/Navbar';
import '../../styles/OPD.css';
// import pincodes from 'indian-pincodes';
import {pininfo} from 'indian_address';

function OPDRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added email field in the state
    age: '',
    gender: '',
    contact: '',
    address: '',
    department: '',
    pincode: '', // Added pincode field
    reason: '', // Added reason field
    date: '', // Added date field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required'; // Validation for email
    if (!formData.age || formData.age <= 0)
      newErrors.age = 'Age must be a positive number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact.match(/^\d{10}$/))
      newErrors.contact = 'Contact number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.address.trim().length < 5)
      newErrors.address = 'Address must be at least 5 characters long';
    if (!formData.department) newErrors.department = 'Department is required';
  if (!formData.pincode.trim()) {
    newErrors.pincode = 'Pincode is required';
  } else if (!pininfo[formData.pincode]) {
    newErrors.pincode = 'Invalid pincode';  // Handle invalid pincode
  } else {
    console.log("Pincode details:", pininfo[formData.pincode]);
  }
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required'; // Validation for reason
    if (!formData.date) newErrors.date = 'Date is required'; // Validation for date

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
    };

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Validation passed. Submitting form...'); // Debugging log
    setIsSubmitting(true);

    axios
      .post(
        `https://medi-connect-f671.onrender.com/hospitalapi/emergency`,
        updatedFormData,
      )
      .then((response) => {
        console.log('Successfully registered!', response.data); // Debugging log
        alert('Registration Successful!'); // Optional success feedback
      })
      .catch((error) => {
        console.error('There was an error registering!', error);
        alert('Registration failed. Please try again.'); // Optional error feedback
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    console.log('Form Data Submitted:', updatedFormData); // Debugging log
};
  return (
    <>
      <section className="form-container">
        <h2>OPD Registration</h2>
        <form
          onSubmit={(e) => {
            console.log('Form submitted');
            handleSubmit(e);
          }}
          className="opd-registration-form"
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email" // Changed input type to email
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="gynecology">Gynecology</option>
              <option value="dermatology">Dermatology</option>
            </select>
            {errors.department && (
              <span className="error">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label>Reason:</label>
            <textarea
              name="reason"
              placeholder="Enter the reason for your visit"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
            {errors.reason && <span className="error">{errors.reason}</span>}
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </form>
      </section>
    </>
  );
}

export default OPDRegistrationForm;