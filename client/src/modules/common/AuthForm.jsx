import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router-dom";
import Navbar from '../common/Navbar';
import { notify } from './notification';
import "../../styles/Login.css";

// Constants for cleaner code
const API_BASE_URL = 'https://medi-connect-f671.onrender.com';
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const location = useLocation();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      type: "hospital",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    }
  });

  // Effect to handle URL-based mode switching (login/register)
  useEffect(() => {
    if (location.pathname === "/register") setIsRegistering(true);
    if (location.pathname === "/login") setIsRegistering(false);
  }, [location.pathname]);

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    reset(); // Clear form when toggling
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    // Frontend validation for matching passwords
    if (isRegistering && formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    const payload = isRegistering ? { ...formData } : {
      type: formData.type,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        if (isRegistering) {
          notify("Registration successful", "success");
          toggleAuthMode(); // Switch to login mode after successful registration
        } else {
          localStorage.setItem('token', data.token);
          notify("Login successful", "success");
          window.location.href = "/";
        }
      } else {
        handleBackendErrors(data.errors || { message: data.message });
      }
    } catch (error) {
      notify("Error connecting to the server", "error");
    }
  };

  const handleBackendErrors = (backendErrors) => {
    // Set backend errors to display in the form (for form fields)
    if (backendErrors instanceof Array) {
      backendErrors.forEach(error => {
        setError(error.field, { type: "backend", message: error.message });
      });
    } else {
      notify(backendErrors.message || "An error occurred", "warn");
    }
  };

  // Watch the password for validation
  const password = watch('password');

  return (
    <div className="login_background">
      <Navbar />
      <div className="auth-maindiv">
        <div className="auth-container">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {/* User Type */}
            <div className="form-section">
              <label>User Type:</label>
              <select {...register("type", { required: true })}>
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            {/* Conditional Registration Fields */}
            {isRegistering && (
              <>
                <FormField label="Name" type="text" register={register("name", { required: "Name is required" })} error={errors.name} />
                <FormField label="Phone" type="text" register={register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" }
                })} error={errors.phone} />
                <FormField label="Address" type="text" register={register("address", { required: "Address is required" })} error={errors.address} />
              </>
            )}

            {/* Common Fields */}
            <FormField label="Email" type="email" register={register("email", {
              required: "Email is required",
              pattern: { value: EMAIL_PATTERN, message: "Invalid email format" }
            })} error={errors.email} />

            <FormField label="Password" type="password" register={register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters long" },
              pattern: { value: PASSWORD_PATTERN, message: "Password must contain at least one letter and one number" }
            })} error={errors.password} />

            {isRegistering && (
              <FormField label="Confirm Password" type="password" register={register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })} error={errors.confirmPassword} />
            )}

            <div className="register-button">
              <button type="submit" className="auth-button">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </div>
          </form>

          <button onClick={toggleAuthMode} className="toggle-auth-button">
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable form field component
const FormField = ({ label, type, register, error }) => (
  <div className="form-section">
    <label>{label}:</label>
    <input type={type} {...register} />
    {error && <p className="error">{error.message}</p>}
  </div>
);

export default AuthPage;
