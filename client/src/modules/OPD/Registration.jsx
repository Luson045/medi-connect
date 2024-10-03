import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Added react-hook-form
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../common/Navbar';
import '../../styles/OPD.css';

function OPDRegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Added react-hook-form hooks
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (formData) => {
    setIsSubmitting(true);
    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
      symptoms: formData.symptoms.split(',').map(symptom => symptom.trim()),
    };

    axios.post(`https://medi-connect-f671.onrender.com/hospitalapi/emergency`, updatedFormData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
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
        <form onSubmit={handleSubmit(onSubmit)} className="opd-registration-form">
          <FormField
            label="Name"
            name="name"
            register={register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters long" }
            })}
            error={errors.name}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            register={register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
            error={errors.email}
          />

          <FormField
            label="Age"
            name="age"
            type="number"
            register={register("age", {
              required: "Age is required",
              min: { value: 1, message: "Age must be a positive number" }
            })}
            error={errors.age}
          />

          <div className="form-group">
            <label>Gender:</label>
            <select {...register("gender", { required: "Gender is required" })}>
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender.message}</span>}
          </div>

          <FormField
            label="Contact Number"
            name="contact"
            register={register("contact", {
              required: "Contact number is required",
              pattern: { value: /^\d{10}$/, message: "Contact number must be 10 digits" }
            })}
            error={errors.contact}
          />

          <FormField
            label="Address"
            name="address"
            register={register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters long" }
            })}
            error={errors.address}
          />

          <div className="form-group">
            <label>Department:</label>
            <select {...register("department", { required: "Department is required" })}>
              <option value="" disabled>Select Department</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
            {errors.department && <span className="error">{errors.department.message}</span>}
          </div>

          <FormField
            label="Symptoms"
            name="symptoms"
            register={register("symptoms", { required: "Symptoms description is required" })}
            error={errors.symptoms}
            as="textarea"
          />

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <Link to="/" className="back-button">Back to Home</Link>
        </form>
      </section>
    </>
  );
}

// Reusable FormField component
const FormField = ({ label, name, register, error, type = "text", as }) => (
  <div className="form-group">
    <label>{label}:</label>
    {as === "textarea" ? (
      <textarea
        {...register}
        placeholder={`Enter your ${name.toLowerCase()}`}
      ></textarea>
    ) : (
      <input
        type={type}
        {...register}
        placeholder={`Enter your ${name.toLowerCase()}`}
      />
    )}
    {error && <span className="error">{error.message}</span>}
  </div>
);

export default OPDRegistrationForm;