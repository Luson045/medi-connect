import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { notify } from './notification';
import '../../styles/AuthForm.css'
import { Link } from 'react-router-dom';
import {FaEyeSlash ,FaEye} from 'react-icons/fa';
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
    if (location.pathname === "/register") setIsRegistering(true);
    if (location.pathname === "/login") setIsRegistering(false);
  }, [location.pathname]);

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
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
        [e.target.name]: "", // Clear frontend error for the field being edited
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (isRegistering) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone || !/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be exactly 10 digits";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.pincode || formData.pincode.length < 2)
        newErrors.password = "Invalid Pincode";
    }
    if (!formData.email) newErrors.email = "Email is required (frontend)";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (isRegistering && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        if (isRegistering && formData.password !== formData.confirmPassword) {
            notify("Passwords do not match", "warn");
            return;
        }

    const endpoint = isRegistering ? "/auth/register" : "/auth/login";
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
            const response = await fetch(`https://medi-connect-f671.onrender.com${endpoint}`, {

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
          notify(data.message || "An error occurred. Please try again.", "warn");
        }
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
      <>
        <Navbar />
        <div className='auth-container'>
				<h2>{isRegistering ? 'Register' : 'Login'}</h2>

				{/* Form Section */}
				<form onSubmit={handleSubmit} className='auth-form'>
					<div className='form-group'>
						<label>User Type:</label>
						<select name='type' value={formData.type} onChange={handleChange}>
							<option value='user'>User</option>
							<option value='hospital'>Hospital</option>
						</select>
					</div>

					{isRegistering && (
						<>
							<div className='form-group'>
								<label>Name:</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className='form-group'>
								<label>Phone:</label>
								<input
									type='text'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									
								/>
							</div>

							<div className='form-group'>
								<label>Pincode:</label>
								<input
									type='text'
									name='pincode'
									placeholder='pincode'
									value={formData.pincode}
									onChange={handleChange}
									
								/>
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
              {errors.frontend.phone && ( 
                <span className="error">{errors.frontend.phone}</span>
              )}
              {errors.backend.phone && (
                <span className="error">{errors.backend.phone}</span>
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

					<div className='form-group'>
						<label>Password:</label>
						<div className='input-group'>
                            <input
                                type={type}
                                name='password'
                                placeholder='password'
                                value={formData.password}
                                onChange={handleChange}
                               
                            />
                            <span className="eye-button" onClick={handleToggle}>
                            {type==='password' ?  <FaEyeSlash className="absolute mr-10" size = {25}/>:<FaEye className="absolute mr-10"  size = {25}/> } 
                            </span>
						</div>
						
					</div>

					{isRegistering && (
						<div className='form-section'>
							<label>Confirm Password:</label>
							<input
								type='password'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleChange}
								
							/>

						</div>
						
						
					)}

					<button type='submit' className='auth-button'>
						{isRegistering ? 'Register' : 'Login'}
					</button>
				</form>
				<div className='remember-me'>
				<div className='remember-me-chk remember-me'>
				<input type='checkbox'/> Remember me
				</div>
				<Link to="#" className="back-button">Forgot password?</Link>
				</div>
				<button onClick={toggleAuthMode} className='toggle-auth-button'>
					{isRegistering
						? 'Already have an account? Login'
						: "Don't have an account? Register"}
				</button>
				
			</div>
      </>
    );
};

export default AuthPage;
