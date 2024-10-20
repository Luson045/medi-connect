const { z } = require("zod");
const nodemailer = require("nodemailer");
const User = require("../../models/user.js");
const Hospital = require("../../models/hospital.js");
const { geocodeAddress } = require("../../config/geocoder.js");
const {
  userSchema,
  hospitalSchema,
  loginSchema,
  emailCheckSchema,
  otpVerificationSchema,
  passwordResetSchema,
} = require("../../validators/authSchemas.js");
const {
  hashPassword,
  comparePassword,
} = require("../../utils/bcrypt/bcryptUtils.js");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const { generateOTP, verifyOTP, clearOTP } = require("../../utils/otputils.js");

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
    // Log the incoming request body to see what data is being received
    console.log("Received Data:", req.body); 

    const parsedData = loginSchema.parse(req.body);
    const { type, email, password } = parsedData;

    // Ensure you check whether the type is user or hospital
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
    const { id, displayName, emails } = googleProfile;
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

const forgotPassword = async (req, res) => {
  try {
    // Validate the email and type input (You can define an appropriate schema here)
    const parsedData = emailCheckSchema.parse(req.body); // Assuming you have a Zod schema for validation
    const { type, email } = parsedData;

    // Search in the respective collection (User or Hospital)
    const userOrHospital = await (type === "user"
      ? User.findOne({ email })
      : Hospital.findOne({ email }));

    if (!userOrHospital) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate OTP and save it with expiry time (e.g., 10 minutes)
    const otp = generateOTP();
    userOrHospital.otp = otp;
    userOrHospital.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await userOrHospital.save(); // Save OTP and expiry to the database

    // Create the transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your preferred SMTP service
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Prepare the email content
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Password Reset OTP for Med-Space",
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "OTP sent to email successfully" });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Error processing forgot password request",
      error: error.message || "An unknown error occurred",
    });
  }
};

const verifyOTPApi = async (req, res) => {
  try {
    // Validate the input using Zod or any other validation schema
    const parsedData = otpVerificationSchema.parse(req.body);
    const { email, otp } = parsedData;

    // Search for the user by email (assuming User and Hospital collections)
    const userOrHospital =
      (await User.findOne({ email })) || Hospital.findOne({ email });

    if (!userOrHospital) {
      return res.status(404).json({ message: "User or hospital not found" });
    }

    // Check if the OTP matches and is still valid (not expired)
    if (!verifyOTP(userOrHospital, otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, now clear it from the database (prevent reuse)
    await clearOTP(userOrHospital);

    // OTP verified successfully, proceed with further steps (e.g., allow password reset)
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Error verifying OTP",
      error: error.message || "An unknown error occurred",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Validate the request data
    const { type, email, newPassword } = passwordResetSchema.parse(req.body);

    // Find the user or hospital by email
    const userOrHospital =
      type === "user"
        ? await User.findOne({ email })
        : await Hospital.findOne({ email });

    if (!userOrHospital) {
      return res.status(404).json({ message: "User or hospital not found" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's or hospital's password in the database
    userOrHospital.password = hashedPassword;

    // Clear the OTP after a successful password reset
    await clearOTP(userOrHospital);

    // Save the user or hospital with the new password
    await userOrHospital.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res
      .status(500)
      .json({
        message: "Error resetting password",
        error: error.message || "An unknown error occurred",
      });
  }
};

module.exports = {
  registerUser,
  loginUser,
  createUserFromGoogleSignIn,
  forgotPassword,
  verifyOTPApi,
  resetPassword,
};
