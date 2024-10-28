import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { databaseUrls } from '../data/databaseUrls';
import PropTypes from 'prop-types';

// Create UserContext
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation(); // Get location

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
    
      if (!token) {
        setAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
  
      const response = await fetch(databaseUrls.auth.profile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userid', data._id);
        setUser(data); // `data` should include `isAdmin` from backend if user is an admin
        setAuth(true);
      } else {
        setAuth(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setAuth(false);
      setUser(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProfile();
  }, [location.pathname]); // Refetch profile when location changes or on refresh

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    setAuth(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loading, setUser, setAuth, handleLogout }} // Return loading in context
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
