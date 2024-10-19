const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    phone: String,
    email: { type: String, required: true, unique: true },
    website: String,
    departments: [String],
    availableServices: [String],
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    password: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    appointments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: Date,
        reason: String,
        status: {
          type: String,
          enum: ["pending", "completed", "canceled"],
          default: "pending",
        },
      },
    ],
    doctors: [
      {
        _id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone: String,
        department: { type: String, required: true },
        opdSchedule: {
          monday: { type: String, default: null },
          tuesday: { type: String, default: null },
          wednesday: { type: String, default: null },
          thursday: { type: String, default: null },
          friday: { type: String, default: null },
          saturday: { type: String, default: null },
          sunday: { type: String, default: null },
        },
      },
    ],
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
