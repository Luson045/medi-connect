// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    dob: Date,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    medicalHistory: [String],
    appointments: [
      {
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
        date: Date,
        reason: String,
        status: {
          type: String,
          enum: ["pending", "completed", "canceled"],
          default: "pending",
        },
      },
    ],
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isAdmin: { type: Boolean, default: false },  
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
