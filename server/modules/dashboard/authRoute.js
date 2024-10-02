const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Hospital = require("../../models/hospital");
require("dotenv").config({ path: "../.env" });
const jwtSecret = process.env.JWT;
const router = express.Router();
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
    const { type, name, email, password, phone } = req.body;

    if (type === "user") {
      const user = new User({ name, email, password, phone });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } else if (type === "hospital") {
      const hospital = new Hospital({ name, email, phone });
      const salt = await bcrypt.genSalt(10);
      hospital.password = await bcrypt.hash(password, salt); // For future login if necessary
      await hospital.save();
      res.status(201).json({ message: "Hospital registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering user/hospital", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { type, email, password } = req.body;

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
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
