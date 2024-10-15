const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
const User = require("../../models/user");
const Hospital = require("../../models/hospital");
require("dotenv").config({ path: "../.env" });
const jwtSecret = process.env.JWT;
const NodeGeocoder = require("node-geocoder");

const { z } = require("zod");
const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
};
const geocoder = NodeGeocoder(options);

const router = express.Router();

// Set rate limiting for the login route
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes window
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: "Too many login attempts from this IP, please try again after 5 minutes",
  },
});

// Zod Schemas for Validation
const loginSchema = z.object({
  type: z.enum(["user", "hospital"]),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

// Login route with rate limiting middleware applied
router.post("/login", loginLimiter, async (req, res) => {
  try {
    // Validate login request body using Zod
    const parsedData = loginSchema.parse(req.body);

    const { type, email, password } = parsedData;

    let userOrHospital;

    if (type === "user") {
      userOrHospital = await User.findOne({ email });
    } else if (type === "hospital") {
      userOrHospital = await Hospital.findOne({ email });
    }

    if (!userOrHospital) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, userOrHospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const payload = { user: { id: userOrHospital.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 * 3 * 24 }, (err, token) => {
      if (err) throw err;
      res.json({ token, message: `${type} logged in successfully` });
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({
      message: "Error logging in",
      error: error.message || "An unknown error occurred",
    });
  }
});

module.exports = router;
