const { z } = require("zod");
const nodemailer = require('nodemailer');
const User = require("../../models/user.js");
const Hospital = require("../../models/hospital.js");
const { geocodeAddress } = require("../../config/geocoder.js");
const {
  userSchema,
  hospitalSchema,
  loginSchema,
  emailCheckSchema,
  otpVerificationSchema,
  passwordResetSchema
} = require("../../validators/authSchemas.js");
const { hashPassword, comparePassword } = require("../../utils/bcrypt/bcryptUtils.js");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { type } = req.body;

    if (type === "user") {
      const userParseData = userSchema.parse(req.body);
      const {
        name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
        medicalHistory,
      } = userParseData;

      const hashedPassword = await hashPassword(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        dob,
        gender,
        address,
        medicalHistory,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } else if (type === "hospital") {
      const hospitalParseData = hospitalSchema.parse(req.body);
      const {
        name,
        email,
        password,
        phone,
        website,
        department,
        availableServices,
        address,
      } = hospitalParseData;

      if (!address.postalCode) {
        return res.status(400).json({ message: "Pincode is required" });
      }

      const results = await geocodeAddress(address.postalCode + " India");
      if (!results.length) {
        return res.status(404).json({ message: "Location not found" });
      }

      const { latitude: lat, longitude: long } = results[0];
      const hashedPassword = await hashPassword(password);

      const hospital = new Hospital({
        name,
        email,
        phone,
        password: hashedPassword,
        website,
        department,
        availableServices,
        address,
        lat,
        long,
      });
      await hospital.save();

      res
        .status(201)
        .json({ message: "Hospital registered successfully", hospital });
    } else {
      res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error registering user/hospital", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { type, email, password } = parsedData;

    const userOrHospital = await (type === "user"
      ? User.findOne({ email })
      : Hospital.findOne({ email }));

    if (!userOrHospital)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await comparePassword(password, userOrHospital.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const payload = { user: { id: userOrHospital.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 * 3 * 24 }, (err, token) => {
      if (err) throw err;
      res.json({ token, message: `${type} logged in successfully` });
    });
  } catch (error) {
    console.error("Login error:", error);
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
};

const createUserFromGoogleSignIn = async (googleProfile) => {
  try {
    const { id,displayName, emails } = googleProfile;
    const email = emails[0].value;
    const hashedPassword = await hashPassword(id);
    // Default values for fields that are not available from Google
    const userObject = {
      type: "user", // Assuming the type is "user"
      name: displayName || "Google User", // Use displayName or fallback
      email: email,
      password: hashedPassword, // No password for Google sign-in users
      phone: "0000000000", // Placeholder, since phone isn't provided by Google
      address: {
        street: "Unknown", // Placeholder, since no address from Google
        city: "Unknown",
        state: "Unknown",
        postalCode: "000000", // Placeholder
      },
      gender: "Male", // Placeholder since gender is not provided
      dob: new Date(), // Default to current date for dob
      medicalHistory: [], // Empty array if no medical history
    };

    // Validate the userObject with Zod schema
    const parsedUser = userSchema.parse(userObject);

    // Save to the database (MongoDB)
    const user = new User(parsedUser);
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "3d" });

    return { user, token }; // Return the user object and token
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Validation failed");
    }
    console.error("Error creating user from Google sign-in:", error);
    throw new Error("Failed to create user");
  }
};

module.exports = { registerUser, loginUser, createUserFromGoogleSignIn};
