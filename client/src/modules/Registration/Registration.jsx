import React from 'react';
import MultiStepRegistration from './MultiStepRegistration';
import '../../styles/Login.css';

function Registration() {
  return (
    <div className="login_background">
      <div className="auth-maindiv">
        <div className="auth-container">
          <h2>Register</h2>
          <MultiStepRegistration />
        </div>
      </div>
    </div>
  );
}

export default Registration;
