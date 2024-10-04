import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import { notify } from "./notification";
import "../../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"; // Import react-hook-form

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const location = useLocation();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm(); // Initialize useForm

  useEffect(() => {
    if (location.pathname === "/register") setIsRegistering(true);
    if (location.pathname === "/login") setIsRegistering(false);
  }, [location.pathname]);

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    reset(); // Reset the form when toggling between login and register
  };

  const onSubmit = async (formData) => {
    const endpoint = isRegistering ? "/auth/register" : "/auth/login";
    const payload = isRegistering ? formData : {
      type: formData.type,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`https://medi-connect-f671.onrender.com${endpoint}`, {
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          notify("Registration successful", "success");
          toggleAuthMode();
        } else {
          localStorage.setItem("token", data.token);
          notify("Login successful", "success");
          window.location.href = "/";
        }
      } else {
        notify(data.message || "An error occurred. Please try again.", "warn");
      }
    } catch (error) {
      notify("Error connecting to the server", "error");
      console.error("Network Error:", error);
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
      <Navbar />
      <div className="auth-maindiv">
        <div className="auth-container">
          <h2>{isRegistering ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-section">
              <label>User Type:</label>
              <select {...register("type", { required: true })} defaultValue="hospital">
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </select>
              {errors.type && <span className="error">User type is required</span>}
            </div>

            {isRegistering && (
              <>
                <div className="form-section">
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="form-section">
                  <label>Phone:</label>
                  <input
                    type="text"
                    placeholder="9898989898"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: { value: /^\d{10}$/, message: "Phone must be 10 digits" },
                    })}
                  />
                  {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>

                <div className="form-section">
                  <label>Address:</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && <span className="error">{errors.address.message}</span>}
                </div>
              </>
            )}

            <div className="form-section">
              <label>Email:</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-section">
              <label>Password:</label>
              <div className="password-wrapper">
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                />
                <button type="button" onClick={() => togglePasswordVisibility("password")} className="password-toggle">
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            {isRegistering && (
              <div className="form-section">
                <label>Confirm Password:</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Re-type password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) => value === watch("password") || "Passwords don't match",
                    })}
                  />
                  <button type="button" onClick={() => togglePasswordVisibility("confirmPassword")} className="password-toggle">
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
              </div>
            )}

            <button type="submit" className="auth-button">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <button onClick={toggleAuthMode} className="toggle-auth-button">
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
