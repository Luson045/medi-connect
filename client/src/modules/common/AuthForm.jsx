import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { notify } from './notification';
import '../../styles/AuthForm.css'
import { Link } from 'react-router-dom';
import {FaEyeSlash ,FaEye} from 'react-icons/fa';
const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        type: 'hospital',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        pincode: '',
        dateOfBirth: '',
        gender: '',
    });
	const [type, setType] = useState('password');


  const handleSubmit = async (e) => {
    e.preventDefault();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleToggle = () => {
		if (type==='password'){
		 //  setIcon('eye');
		   setType('text')
		} else {
		  // setIcon('eye-slash')
		   setType('password')
		}
	 }
    const handleSubmit = async (e) => {
        e.preventDefault();


    try {
      const response = await fetch(
        `https://medi-connect-f671.onrender.com${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

       const endpoint = isRegistering ? '/auth/register' : '/auth/login';
        const payload = isRegistering
            ? { ...formData }
            : {
                  type: formData.type,
                  email: formData.email,
                  password: formData.password,
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
                    localStorage.setItem('token', data.token);
                    notify("Login successful", "success");
                    window.location.href = "/";
                }
            } else {
                notify(data.message, "warn");
                console.error(data.message);
            }
        } catch (error) {
            notify("Error connecting to the server", "error");
            console.error(error);

        }
      }
    } catch (error) {
      notify("Error connecting to the server", "error");
      console.error("Network Error:", error);
    }
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

							{/* <div className='form-group'>
								<label>Address:</label>
								<input
									type='text'
									name='address'
									value={formData.address}
									onChange={handleChange}
									
								/>
							</div> */}
						</>
					)}

					<div className='form-group'>
						<label>Email:</label>
						<input
							type='text'
							name='email'
                            placeholder='example@mail.com'
							value={formData.email}
							onChange={handleChange}
							
						/>
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
