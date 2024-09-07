import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create UserContext
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get location

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, consider the user as not authenticated
        setAuth(false);
        setUser(null);
        return;
      }
      
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userid', data._id); // Store user ID if needed elsewhere
        setUser(data);
        setAuth(true);
      } else {
        // Handle cases where token might be invalid or expired
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
  };

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]); // Refetch profile when location changes or on refresh

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    setAuth(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, setAuth, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
