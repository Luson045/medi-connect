const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTPApi,
  resetPassword
} = require("../../controllers/auth/authController.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/otpverify", verifyOTPApi);
router.post("/reset-password", resetPassword);

module.exports = router;
