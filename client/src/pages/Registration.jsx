import React from 'react';
import MultiStepRegistration from '../components/MultiStepRegistration';
import '../styles/Login.css';
import { useRecoilValue } from 'recoil'; // Import Recoil to use the dark mode state
import { mode } from '../store/atom'; // Import dark mode atom

function Registration() {
  const dark = useRecoilValue(mode); // Access dark mode value using Recoil

  return (
    <div className={`login_background ${dark === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
      <div className={`auth-maindiv ${dark === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} transition-colors duration-300`}>
        <div className={`auth-container ${dark === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} p-8 shadow-lg rounded-lg`}>
          <h2 className={`${dark === 'dark' ? 'text-yellow-400' : 'text-gray-700'} text-3xl font-bold mb-6`}>Register</h2>
          <MultiStepRegistration />
        </div>
      </div>
    </div>
  );
}

export default Registration;
