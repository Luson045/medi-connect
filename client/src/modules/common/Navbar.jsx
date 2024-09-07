// src/components/Navbar.js

import React, { useContext,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; // Ensure the path is correct
import { UserContext } from './userContext';

function Navbar() {
  const { user, isAuthenticated, handleLogout } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch user profile on component mount

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img className="logo-image"src="logo.png"></img></Link>
      </div>

      {/* Hamburger menu icon for mobile */}
      <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Navigation links */}
      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>

        {isAuthenticated && (
          <>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>

            {/* Show these links only if the user is a regular user */}
            {user && user.role === "user" && (
              <>
                <Link to="/hospitals">Hospitals</Link>
              </>
            )}
            {user && user.role === "hospital" && (
              <>
                <Link to="/panal">OPD Panal</Link>
              </>
            )}
          </>
        )}

        {/* Authentication links */}
        {!isAuthenticated ? (
          <>
            <Link to="/registerOPD">Instant OPD</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
