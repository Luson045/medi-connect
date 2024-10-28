import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../store/userContext'; // Import the UserContext

const Newsletters = () => {
  const { user, isAuthenticated, loading } = useContext(UserContext); // Access user and loading from UserContext
  const navigate = useNavigate();

  // Redirect if not admin or not authenticated
  useEffect(() => {
    if (!loading && (!isAuthenticated || !user?.isAdmin)) {
      navigate('/login'); // Redirect to login page if not admin
    }
  }, [isAuthenticated, user, loading, navigate]);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSendNewsletter = async () => {
    try {
      const credentials = btoa(`${user.email}:${user.password}`);
  
      const response = await fetch('http://localhost:8080/otherroutes/admin/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`, 
        },
        body: JSON.stringify({ subject, message }),
      });
  
      const result = await response.json();
      setStatus(response.ok ? { type: 'success', message: result.message } : { type: 'error', message: result.message });
  
      // Clear inputs and status message after 7 seconds
      setTimeout(() => {
        setSubject('');
        setMessage('');
        setStatus('');
      }, 7000); // 7 seconds in milliseconds
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
  
      // Clear the error message after 7 seconds
      setTimeout(() => {
        setStatus('');
      }, 7000);
    }
  };

  // Show loading message if user data is still being fetched
  if (loading) return <p>Loading...</p>;

  return isAuthenticated && user?.isAdmin ? (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Newsletter Dashboard</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Subject</label>
          <input
            type="text"
            placeholder="Enter the subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            placeholder="Write your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSendNewsletter}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Send Newsletter
        </button>

        {status && (
          <div className={`mt-4 p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Newsletters;
