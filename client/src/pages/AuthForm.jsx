import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner';
import { notify } from '../components/notification';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil'; // Import recoil
import { mode } from '../store/atom'; // Import dark mode atom

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dark = useRecoilValue(mode); // Get dark mode state

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div
      className={`login_background ${
        dark === 'dark' ? ' text-yellow-400' : 'bg-white text-gray-900'
      }`}
    >
      <div className="auth-maindiv">
        <div
          className={`auth-container ${
            dark === 'dark' ? ' text-yellow-400' : 'bg-white text-gray-900'
          }`}
        >
          <h2
            className={` ${
              dark === 'dark' ? ' text-yellow-400' : 'bg-white text-gray-700'
            }  text-3xl font-bold mb-6`}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-section">
              <label
                className={`auth-form ${
                  dark === 'dark'
                    ? ' text-yellow-400'
                    : 'bg-white text-gray-700'
                }`}
              >
                User Type:
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="px-2.5 py-2"
              >
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>
            <div className="form-section">
              <label
                className={`auth-form ${
                  dark === 'dark'
                    ? ' text-yellow-400'
                    : 'bg-white text-gray-700'
                }`}
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`${
                  dark === 'dark'
                    ? ' text-yellow-400'
                    : 'bg-white text-gray-900'
                }`}
              />
              {errors.frontend.email && (
                <span className="error">{errors.frontend.email}</span>
              )}
              {errors.backend.email && (
                <span className="error">{errors.backend.email}</span>
              )}
            </div>

            <div className="form-section">
              <label
                className={`auth-form ${
                  dark === 'dark'
                    ? ' text-yellow-400'
                    : 'bg-white text-gray-700'
                }`}
              >
                Password:
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${
                    dark === 'dark'
                      ? ' text-yellow-400'
                      : 'bg-white text-gray-900'
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
              {errors.backend.password && (
                <span className="error">{errors.backend.password}</span>
              )}
            </div>

            <div className="register-button">
              <button
                type="submit"
                className={`auth-button ${
                  dark === 'dark'
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Login
              </button>
            </div>

            <Link
              to="/register"
              className={`toggle-auth-button text-center ${
                dark === 'dark' ? 'text-yellow-400' : 'text-blue-600'
              }`}
            >
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-container">
            <TailSpin
              height="80"
              width="80"
              color={dark === 'dark' ? '#FBBF24' : '#007bff'}
              ariaLabel="loading"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
