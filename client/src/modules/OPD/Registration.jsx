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
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be a positive number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact.match(/^\d{10}$/)) newErrors.contact = 'Contact number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.address.trim().length < 5) newErrors.address = 'Address must be at least 5 characters long';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.symptoms.trim()) newErrors.symptoms = 'Symptoms description is required';
    if (!formData.pincode.trim().length === 6) newErrors.symptoms = 'Pincode must be 6 digits';

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
      symptoms: formData.symptoms.split(',').map(symptom => symptom.trim()),
    };

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // https://medi-connect-f671.onrender.com
    setIsSubmitting(true);
    console.log(updatedFormData);
    axios.post(`https://medi-connect-f671.onrender.com/hospitalapi/emergency`, { data: updatedFormData })
      .then(response => {
        console.log('Successfully registered!', response.data);

      })
      .catch(error => {
        console.error('There was an error registering!', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    console.log('Form Data Submitted:', updatedFormData);
  };


  return (
    <>
      <Navbar />
      <section className="form-container">
        <h2>OPD Registration</h2>
        <form onSubmit={handleSubmit} className="opd-registration-form">
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
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
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
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="" disabled>Select Department</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label>Symptoms:</label>
            <textarea
              name="symptoms"
              placeholder="Describe your symptoms with commas"
              value={formData.symptoms}
              onChange={handleChange}
              required
            ></textarea>
            {errors.symptoms && <span className="error">{errors.symptoms}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <Link to="/" className="back-button">Back to Home</Link>
        </form>
      </section>
    </>
  );
}

export default OPDRegistrationForm;
