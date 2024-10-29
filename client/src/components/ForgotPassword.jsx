import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const sendOtp = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: userType }), // Send the selected type
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
        setMessage('OTP sent successfully. Please check your email.');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Failed to send OTP.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP. Please try again.');
      setMessageType('error');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/otpverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, type: userType }), // Include type
      });

      const data = await response.json();
      if (response.ok) {
        setStep(3);
        setMessage('OTP verified successfully. Please set your new password.');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Invalid OTP. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
      setMessageType('error');
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: userType, email, newPassword }), // Include type here
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password updated successfully. Redirecting to the login page...');
        setMessageType('success');

        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(data.message || 'Failed to reset password.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>

        {/* Display Success/Error Messages */}
        {message && (
          <p
            className={`text-center mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}

        {step >= 1 && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border p-2 w-full"
              disabled={step > 1} // Disable after OTP is sent
            >
              <option value="user">User</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>
        )}

        {step >= 1 && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              disabled={step > 1} // Disable after OTP is sent
              required
            />
          </div>
        )}

        {step === 1 && (
          <button onClick={sendOtp} className="bg-blue-500 text-white p-2 w-full rounded-lg">
            Send OTP
          </button>
        )}

        {step >= 2 && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full"
              disabled={step > 2} // Disable after OTP is verified
              required
            />
          </div>
        )}

        {step === 2 && (
          <button onClick={verifyOtp} className="bg-blue-500 text-white p-2 w-full rounded-lg">
            Verify OTP
          </button>
        )}
{step >= 3 && (
  <>
    <div className="mb-4 relative">
      <label className="block mb-2 font-semibold">New Password</label>
      <div className="password-wrapper flex items-center border rounded p-2 w-full">
        <input
          type={showPassword.newPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="flex-grow text-gray-900"
          required
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility('newPassword')}
          className="password-toggle text-gray-500"
        >
          {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

    <div className="mb-4 relative">
      <label className="block mb-2 font-semibold">Confirm Password</label>
      <div className="password-wrapper flex items-center border rounded p-2 w-full">
        <input
          type={showPassword.confirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="flex-grow text-gray-900"
          required
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility('confirmPassword')}
          className="password-toggle text-gray-500"
        >
          {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  </>
)}


        {step === 3 && (
          <div className="flex justify-between">
            <button onClick={resetPassword} className="bg-green-500 text-white p-2 w-48 rounded-lg">
              Set Password
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-500 text-white p-2 w-48 rounded-lg"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
