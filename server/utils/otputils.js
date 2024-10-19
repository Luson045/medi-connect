// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Check if OTP is valid (both matching and not expired)
const verifyOTP = (user, submittedOtp) => {
  return user.otp === submittedOtp && user.otpExpiry > Date.now();
};

// Clear OTP after it's used
const clearOTP = async (user) => {
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
};
module.exports = { generateOTP, verifyOTP, clearOTP };
