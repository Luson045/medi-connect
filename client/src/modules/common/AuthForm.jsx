import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { notify } from './notification';
import '../../styles/Login.css';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [formData, setFormData] = useState({
    type: 'hospital',
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    frontend: {},
    backend: {},
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
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
    if (!formData.email) newErrors.email = 'Email is required (frontend)';
    if (!formData.password || formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        frontend: validationErrors,
      }));
      return;
    }

    try {
      const response = await fetch(
        `https://medi-connect-f671.onrender.com/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        notify('Login successful', 'success');
        window.location.href = '/profile';
      } else {
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach((error) => {
            backendErrors[error.field] = `${error.message} (backend)`;
          });
          setErrors((prev) => ({
            ...prev,
            backend: backendErrors,
          }));
        } else {
          notify(
            data.message || 'An error occurred. Please try again.',
            'warn',
          );
        }
      }
    } catch (error) {
      notify('Error connecting to the server', 'error');
      console.error('Network Error:', error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="login_background">
      <div className="auth-maindiv">
        <div className="auth-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-section">
              <label>User Type:</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>
            <div className="form-section">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
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
                  value={formData.password}
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

            <div className="register-button">
              <button type="submit" className="auth-button">
                Login
              </button>
            </div>

            <Link to="/register" className="toggle-auth-button text-center">
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
