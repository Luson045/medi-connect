const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// Zod Schemas for Validation
const userSchema = z.object({
  type: z.enum(["user", "hospital"]),
  name: z.string().min(3, "Name should be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
  phone: z.string().optional(),
  pincode: z.string().optional(),
});

const loginSchema = z.object({
  type: z.enum(["user", "hospital"]),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

// Middleware to authenticate using token
const authenticateToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Profile route to fetch current user's or hospital's profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Check if the logged-in person is a user or hospital
    let profile = await User.findById(req.user.id);
    if (!profile) {
      // If not a user, check if it's a hospital
      profile = await Hospital.findById(req.user.id);
      if (!profile) {
        return res.status(404).json({ msg: "Profile not found" });
      }
      // Include the role 'hospital' in the response
      return res.json({ ...profile.toObject(), role: "hospital" });
    }
    // Include the role 'user' in the response
    res.json({ ...profile.toObject(), role: "user" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

router.post("/register", async (req, res) => {
  try {
    // Validate the request body using Zod
    const parsedData = userSchema.parse(req.body);

    const { type, name, email, password, phone, pincode } = parsedData;

    if (type === "user") {
      const user = new User({ name, email, password, phone });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } else if (type === "hospital") {
      if (!pincode) {
        return res.status(400).json({ message: "Pincode is required" });
      }
      const hospital = new Hospital({ name, email, phone });
      const salt = await bcrypt.genSalt(10);
      hospital.password = await bcrypt.hash(password, salt); // For future login if necessary

      const results = await geocoder.geocode(pincode + " India");
      if (results.length === 0) {
        return res.status(404).json({ message: "Location not found" });
      }
      const hospitalLat = results[0].latitude;
      const hospitalLong = results[0].longitude;
      hospital.lat = hospitalLat;
      hospital.long = hospitalLong;
      hospital.address.postalCode = pincode;

      await hospital.save();
      res
        .status(201)
        .json({ message: "Hospital registered successfully", hospital });
    } else {
      res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Send Zod validation error response
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error registering user/hospital", error });
  }
});

// Login

router.post("/login", async (req, res) => {
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
