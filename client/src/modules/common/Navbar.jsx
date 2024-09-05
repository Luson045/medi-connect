import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
  const [isAuthenticated, setAuth] = useState(true);
  /*const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://prodez-ai.onrender.com/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userid', data._id);
                setUser(data);
                setAuth(true);
            } else {
                // Handle unauthorized or other errors
                const data = await response.json();
                console.error(data.msg);
                setAuth(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    fetchProfile();
  }, []);*/
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to={isAuthenticated ? "/about" : "/login"}>About</Link>
      <Link to={isAuthenticated ? "/registerOPD" : "/login"}>Hospital</Link>
      <Link to={isAuthenticated ? "/profile" : "/login"}>{isAuthenticated ? "Logout" : "Login"}</Link>
      <Link to={isAuthenticated ? "/profile" : "/login"}>{isAuthenticated ? "Profile" : "Hello"}</Link>
      </div>
    </nav>
  );
}

export default Navbar;
