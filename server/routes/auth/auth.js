const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTPApi,
  resetPassword,
} = require("../../controllers/auth/authController.js");
const router = express.Router();

// Create a rate limiter for login requests
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 5 minutes",
  },
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/otpverify", verifyOTPApi);
router.post("/reset-password", resetPassword);

module.exports = router;
