import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../common/Navbar';
import '../../styles/OPD.css';

function OPDRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    department: '',
    pincode: '',
    reason: '',
    date: '',
    report: [], 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be a positive number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact.match(/^\d{10}$/)) newErrors.contact = 'Contact number must be 10 digits';
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters long';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    if (!formData.date) newErrors.date = 'Date is required';

    // Optional: Validate file type and size if a file is uploaded
    if (formData.report) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(formData.report.type)) {
        newErrors.report = 'Only PDF, JPEG, and PNG files are allowed';
      }
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (formData.report.size > maxSizeInBytes) {
        newErrors.report = 'File size should not exceed 5MB';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'report') {
      // Convert FileList to array and set it in state
      setFormData((prevData) => ({
        ...prevData,
        report: [...prevData.report, ...Array.from(files)], // Add new files to the existing array
      }));
      setErrors({ ...errors, report: '' }); // Clear report errors
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setIsSubmitting(true);
  
    // Create FormData to handle file upload
    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    submissionData.append('age', formData.age);
    submissionData.append('gender', formData.gender);
    submissionData.append('contact', formData.contact);
    submissionData.append('address', formData.address);
    submissionData.append('department', formData.department);
    submissionData.append('pincode', formData.pincode);
    submissionData.append('reason', formData.reason);
    submissionData.append('date', formData.date);
    
    // Append each file in the report array to FormData
    formData.report.forEach((file) => {
      submissionData.append('report', file);
    });
  
    axios.post(`https://medi-connect-f671.onrender.com/hospitalapi/emergency`, submissionData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Successfully registered!', response.data);
        alert('Registration Successful!');
        // Optionally, reset the form
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: '',
          contact: '',
          address: '',
          department: '',
          pincode: '',
          reason: '',
          date: '',
          report: [],
        });
      })
      .catch(error => {
        console.error('There was an error registering!', error);
        alert('Registration failed. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  

  return (
    <>
      <Navbar />
      <section className="form-container">
        <h2>OPD Registration</h2>
        <form onSubmit={handleSubmit} className="opd-registration-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Age Field */}
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          {/* Gender Field */}
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          {/* Contact Number Field */}
          <div className="form-group">
            <label htmlFor="contact">Contact Number:</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          {/* Pincode Field */}
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>

          {/* Department Field */}
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Department</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="gynecology">Gynecology</option>
              <option value="dermatology">Dermatology</option>
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </div>

          {/* Reason Field */}
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Enter the reason for your visit"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
            {errors.reason && <span className="error">{errors.reason}</span>}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          {/* Optional Report Upload Field */}
         {/* Optional Report Upload Field */}
          <div className="form-group">
            <label htmlFor="report">Upload Report (Optional):</label>
            <input
              type="file"
              id="report"
              name="report"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleChange}
              multiple // Allow multiple file selections
            />
            {errors.report && <span className="error">{errors.report}</span>}
          </div>


          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>

          {/* Back to Home Link */}
          <Link to="/" className="back-button">Back to Home</Link>
        </form>
      </section>
    </>
  );
}

export default OPDRegistrationForm;
