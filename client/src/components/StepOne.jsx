import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RegistrationContext from '../store/RegistrationContext';
import { useRecoilValue } from 'recoil'; // Recoil hook for dark mode
import { mode } from '../store/atom'; // Assuming dark mode is stored in Recoil

function StepOne() {
  const { basicDetails, setBasicDetails, nextStep } =
    useContext(RegistrationContext);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    frontend: {},
    backend: {},
  });

  const dark = useRecoilValue(mode); // Using Recoil to get dark mode status

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateEmail = (email) => {
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailExp.test(email);
  };

  const handleChange = (e) => {
    setBasicDetails({
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
    if (!basicDetails.email) newErrors.email = 'Email is required';
    if (basicDetails.email && !validateEmail(basicDetails.email))
      newErrors.email = 'Please enter a valid email address';
    if (!basicDetails.password) {
      newErrors.password = 'Password is required';
    } else if (basicDetails.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(basicDetails.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(basicDetails.password)) {
      newErrors.password =
        'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(basicDetails.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(basicDetails.password)) {
      newErrors.password =
        'Password must contain at least one special character';
    }
    if (!basicDetails.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }
    if (basicDetails.password !== basicDetails.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleContinue = (e) => {
    e.preventDefault();

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
      <form
        className={`auth-form ${dark === 'dark'
          ? 'bg-gray-900 text-yellow-400'
          : 'bg-white text-gray-700'
          }`}
      >
        <div className="form-section">
          <label
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
          >
            User Type:
          </label>
          <select
            name="type"
            value={basicDetails.type}
            onChange={handleChange}
            className={`${dark === 'dark'
              ? 'bg-gray-800 text-yellow-400 border-yellow-400'
              : 'bg-white text-gray-700 border-gray-300'
              }`}
          >
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>

        <div className="form-section">
          <label
            htmlFor="name"
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
            style={{ display: 'inline' }}
          >
            Name: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={basicDetails.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className={`${dark === 'dark'
              ? 'bg-gray-800 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
          />
          {errors.frontend.name && (
            <span className="error">{errors.frontend.name}</span>
          )}
        </div>

        <div className="form-section">
          <label
            htmlFor="phone"
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
            style={{ display: 'inline' }}
          >
            Phone: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="9898989898"
            value={basicDetails.phone}
            onChange={handleChange}
            required
            className={`${dark === 'dark'
              ? 'bg-gray-800 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
          />
          {errors.frontend.phone && (
            <span className="error">{errors.frontend.phone}</span>
          )}
        </div>

        <div className="form-section">
          <label
            htmlFor="email"
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
            style={{ display: 'inline' }}
          >
            Email: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={basicDetails.email}
            onChange={handleChange}
            required
            className={`${dark === 'dark'
              ? 'bg-gray-800 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
          />
          {errors.frontend.email && (
            <span className="error">{errors.frontend.email}</span>
          )}
        </div>

        <div className="form-section">
          <label
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
            style={{ display: 'inline' }}
          >
            Password: <span style={{ color: 'red' }}>*</span>
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              placeholder="password"
              value={basicDetails.password}
              onChange={handleChange}
              required
              className={`${dark === 'dark'
                ? 'bg-gray-800 text-yellow-400'
                : 'bg-white text-gray-700'
                }`}
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
        </div>

        <div className="form-section">
          <label
            className={`auth-form ${dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
              }`}
            style={{ display: 'inline' }}
          >
            Confirm Password: <span style={{ color: 'red' }}>*</span>
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="password"
              value={basicDetails.confirmPassword}
              onChange={handleChange}
              required
              className={`${dark === 'dark'
                ? 'bg-gray-800 text-yellow-400'
                : 'bg-white text-gray-700'
                }`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="password-toggle"
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.frontend.confirmPassword && (
            <span className="error">{errors.frontend.confirmPassword}</span>
          )}
        </div>

        <div className="register-button">
          <button
            type="submit"
            className={`auth-button ${dark === 'dark'
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        <Link
          to="/login"
          className={`toggle-auth-button text-center ${dark === 'dark' ? 'text-white' : 'text-black'
            }`}
        >
          Already have an account? Login
        </Link>
      </form>
    </>
  );
}

export default StepOne;
