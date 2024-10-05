import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { notify } from './notification';
import '../../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    type: "hospital",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({
    frontend: {},
    backend: {},
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/register') setIsRegistering(true);
    if (location.pathname === '/login') setIsRegistering(false);
  }, [location.pathname]);

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({ frontend: {}, backend: {} }); // Clear errors when toggling
  };

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
    if (isRegistering) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.phone || !/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be exactly 10 digits";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.pincode || formData.pincode.length !==6)
        newErrors.pincode = "Pincode must be of 6 digits";
    }
    if (!formData.email) newErrors.email = 'Email is required (frontend)';
    if (!formData.password || formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';
    if (isRegistering && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

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

    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    const payload = isRegistering
      ? { ...formData }
      : {
          type: formData.type,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          pincode: formData.pincode,
        };

    try {
      const response = await fetch(
        `https://medi-connect-f671.onrender.com${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          notify('Registration successful', 'success');
          toggleAuthMode();
        } else {
          localStorage.setItem("token", data.token);
          notify("Login successful", "success");
          window.location.href = "/profile";
        }
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
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-section">
              <label>User Type:</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            {isRegistering && (
              <>
                <div className="form-section">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
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
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="9898989898"
                    value={formData.phone}
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
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.frontend.address && (
                    <span className="error">{errors.frontend.address}</span>
                  )}
                  {errors.backend.address && (
                    <span className="error">{errors.backend.address}</span>
                  )}
                </div>
              </>
            )}
            {isRegistering && (<div className="form-section">
              <label>PIN:</label>
              <input
                type="text"
                name="pincode"
                placeholder="114011"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              {errors.frontend.pincode && ( 
                <span className="error">{errors.frontend.pincode}</span>
              )}
              {errors.backend.pincode && (
                <span className="error">{errors.backend.pincode}</span>
              )}
            </div>)
            }
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

            {isRegistering && (
              <div className="form-section">
                <label>Confirm Password:</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-type password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
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
                  <span className="error">
                    {errors.frontend.confirmPassword}
                  </span>
                )}
                {errors.backend.confirmPassword && (
                  <span className="error">
                    {errors.backend.confirmPassword}
                  </span>
                )}
              </div>
            )}

            <div className="register-button">
              <button type="submit" className="auth-button">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </div>
          </form>

          <button onClick={toggleAuthMode} className="toggle-auth-button">
            {isRegistering
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;