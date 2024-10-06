import React, { useContext } from 'react';
import RegistrationContext from './RegistrationContext';
import { notify } from '../common/notification';
import { useNavigate } from 'react-router-dom';

const btnDivStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '5px',
};

const renderFields = (key, value) => {
  if (
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0) ||
    (typeof value === 'string' && key === 'password') ||
    key === 'confirmPassword'
  ) {
    return null; // Don't render empty fields
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    // If the value is an object (e.g., address), recursively iterate over the nested fields

    return (
      <div key={key}>
        {Object.entries(value).map(([nestedKey, nestedValue]) =>
          renderFields(nestedKey, nestedValue),
        )}
      </div>
    );
  } else if (Array.isArray(value)) {
    // If the value is an array (e.g., medicalHistory)
    return (
      <div key={key}>
        <h3>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</h3>
        {value.map((item) => (
          <h3 key={key} className="ml-1 mb-1">{`${item} `}</h3>
        ))}
      </div>
    );
  } else {
    // Render normal input fields for string, date, etc.
    return (
      <h1 className="mb-2">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</h1>
    );
  }
};

function ReviewDetails() {
  const { basicDetails, otherDetails, prevStep } =
    useContext(RegistrationContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const endpoint = 'https://medi-connect-f671.onrender.com/auth/register';
    const payload = { ...basicDetails, ...otherDetails };

    try {
      const response = await fetch(`http://localhost:3001/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        notify('Registration successful', 'success');
        navigate('/login');
      } else {
        notify(data.message || 'An error occurred. Please try again.', 'warn');
      }
    } catch (error) {
      notify('Error connecting to the server', 'error');
      console.error('Network Error:', error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 font-bold ">
          {Object.entries(basicDetails).map(([key, value]) =>
            renderFields(key, value),
          )}
        </div>
        <div className="col-md-6 font-bold">
          {' '}
          {Object.entries(otherDetails).map(([key, value]) =>
            renderFields(key, value),
          )}
        </div>
      </div>
      <div className="row w-100 mt-2">
        <div style={btnDivStyle}>
          <button type="button" className="auth-button" onClick={prevStep}>
            Back
          </button>
          <button
            type="button"
            className="auth-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default ReviewDetails;
