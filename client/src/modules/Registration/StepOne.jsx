import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import RegistrationContext from './RegistrationContext';
import { Link } from 'react-router-dom';

function StepOne() {
  const { basicDetails, setBasicDetials, nextStep } =
    useContext(RegistrationContext);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    frontend: {},
    backend: {},
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setBasicDetials({
      ...basicDetails,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({
      ...prev,
      frontend: {
        ...prev.frontend,
        [e.target.name]: '', // Clear frontend error for the field being edited
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!basicDetails.name) newErrors.name = 'Name is required';
    if (!basicDetails.phone || !/^\d{10}$/.test(basicDetails.phone))
      newErrors.phone = 'Phone number must be exactly 10 digits';

    if (!basicDetails.email) newErrors.email = 'Email is required (frontend)';
    if (!basicDetails.password || basicDetails.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';
    if (basicDetails.password !== basicDetails.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleContinue = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        frontend: validationErrors,
      }));
      return;
    }
    nextStep();
  };

  return (
    <>
      <form className="auth-form">
        <div className="form-section">
          <label>User Type:</label>
          <select name="type" value={basicDetails.type} onChange={handleChange}>
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={basicDetails.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          {errors.frontend.name && (
            <span className="error">{errors.frontend.name}</span>
          )}
          {errors.backend.name && (
            <span className="error">{errors.backend.name}</span>
          )}
        </div>
        <div className="form-section">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="9898989898"
            value={basicDetails.phone}
            onChange={handleChange}
            required
          />
          {errors.frontend.phone && (
            <span className="error">{errors.frontend.phone}</span>
          )}
          {errors.backend.phone && (
            <span className="error">{errors.backend.phone}</span>
          )}
        </div>
        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={basicDetails.email}
            onChange={handleChange}
            required
          />
          {errors.frontend.email && (
            <span className="error">{errors.frontend.email}</span>
          )}
          {errors.backend.email && (
            <span className="error">{errors.backend.email}</span>
          )}
        </div>
        <div className="form-section">
          <label>Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              placeholder="password"
              value={basicDetails.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="password-toggle"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.frontend.password && (
            <span className="error">{errors.frontend.password}</span>
          )}
          {errors.backend.password && (
            <span className="error">{errors.backend.password}</span>
          )}
        </div>
        <div className="form-section">
          <label>Confirm Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="password"
              value={basicDetails.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="password-toggle"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.frontend.confirmPassword && (
            <span className="error">{errors.frontend.confirmPassword}</span>
          )}
          {errors.backend.confirmPassword && (
            <span className="error">{errors.backend.confirmPassword}</span>
          )}
        </div>
        <div className="register-button">
          <button
            type="submit"
            className="auth-button"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        <Link to="/login" className="toggle-auth-button text-center">
          Already have an account? Login
        </Link>
      </form>
    </>
  );
}

export default StepOne;
