import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../common/Navbar';
import { notify } from './notification';

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        type: 'hospital',
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? '/auth/register' : '/auth/login';
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: formData.type,
                email: formData.email,
                password: formData.password
            }),
        });
        const data = await response.json();
        if (response.ok&&!isRegistering) {
            localStorage.setItem('token', data.token);
            notify("login successful","success");
            window.location.href="/";
        }else{
            localStorage.setItem('token', data.token);
            notify("error","warn");
            console.log(data.msg,"error");
        }
    };

    return (
      <>
      <Navbar/>
        <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="hospital">Hospital</option>
                    </select>
                </div>

                {isRegistering && (
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required={isRegistering} />
                    </div>
                )}

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                {isRegistering && (
                    <div>
                        <label>Phone:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required={isRegistering} />
                    </div>
                )}

                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>

            <button onClick={toggleAuthMode}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
      </>
    );
};

export default AuthPage;
