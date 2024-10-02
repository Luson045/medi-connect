const express = require("express");
const Hospital = require("../../models/hospital");
const User = require("../../models/user");
const NodeGeocoder = require("node-geocoder");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const { z } = require("zod");

const router = express.Router();
const jwtSecret = process.env.JWT;
// Set up the OpenCage provider
const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
};
const geocoder = NodeGeocoder(options);

const authenticateToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

// Zod Schemas for Validation
const hospitalSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  address: z.object({
    street: z.string().min(3, "Street should be at least 3 characters long"),
    city: z.string().min(2, "City should be at least 2 characters long"),
    state: z.string().min(2, "State should be at least 2 characters long"),
  }),
  phone: z.string().optional(),
});

const appointmentSchema = z.object({
  userId: z.string().length(24, "Invalid user ID"), // Assuming MongoDB ObjectId length
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  reason: z.string().min(5, "Reason should be at least 5 characters long"),
});

const updateAppointmentSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  reason: z.string().optional(),
  status: z.enum(["pending", "confirmed", "canceled"]),
});

// Create a new hospital
router.post("/", async (req, res) => {
  try {
    const parsedData = hospitalSchema.parse(req.body);
    const hospital = new Hospital(parsedData);
    await hospital.save();
    res.status(201).send(hospital);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(400).send(error);
  }
});

// Get all hospitals with optional search
router.get("/", async (req, res) => {
  const { searchQuery } = req.query;

  try {
    let hospitals;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      hospitals = await Hospital.find({
        $or: [
          { name: { $regex: regex } },
          { "address.street": { $regex: regex } },
          { "address.city": { $regex: regex } },
          { "address.state": { $regex: regex } },
        ],
      });
    } else {
      hospitals = await Hospital.find();
    }

    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a hospital by ID
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).send();
    res.send(hospital);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a hospital
router.patch("/:id", async (req, res) => {
  try {
    const parsedData = hospitalSchema.partial().parse(req.body); // Use partial to allow partial updates
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      parsedData,
      { new: true, runValidators: true }
    );
    if (!hospital) return res.status(404).send();
    res.send(hospital);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(400).send(error);
  }
});

// Delete a hospital
router.delete("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).send();
    res.send(hospital);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Book an appointment
router.post("/hospitals/:id/book", async (req, res) => {
  try {
    const parsedData = appointmentSchema.parse(req.body);
    const hospitalId = req.params.id;

    const hospital = await Hospital.findById(hospitalId);
    const user = await User.findById(parsedData.userId);

    if (!hospital || !user) {
      return res.status(404).json({ message: "Hospital or user not found" });
    }

    // Create an appointment
    const appointment = {
      userId: parsedData.userId,
      date: parsedData.date,
      reason: parsedData.reason,
      status: "pending",
    };

    hospital.appointments.push(appointment);
    await hospital.save();

    // Add the appointment to the user's record as well
    user.appointments.push({
      hospitalId,
      date: parsedData.date,
      reason: parsedData.reason,
      status: "pending",
    });
    await user.save();

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

// Get appointments for a hospital
router.get("/appointments/:hospitalId", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId).populate(
      "appointments.userId",
      "name email"
    );
    if (!hospital)
      return res.status(404).send({ message: "Hospital not found" });

    res.status(200).json(hospital.appointments);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to add a new appointment
router.post("/appointments/:hospitalId", async (req, res) => {
  try {
    const parsedData = appointmentSchema.parse(req.body);
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital)
      return res.status(404).send({ message: "Hospital not found" });

    const newAppointment = {
      userId: parsedData.userId,
      date: parsedData.date,
      reason: parsedData.reason,
      status: "pending",
    };
    hospital.appointments.push(newAppointment);
    await hospital.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to update an existing appointment
router.put("/appointments/:appointmentId", async (req, res) => {
  try {
    const parsedData = updateAppointmentSchema.parse(req.body);
    const { appointmentId } = req.params;

    const hospital = await Hospital.findOneAndUpdate(
      { "appointments._id": appointmentId },
      {
        $set: {
          "appointments.$.date": parsedData.date,
          "appointments.$.reason": parsedData.reason,
          "appointments.$.status": parsedData.status,
        },
      },
      { new: true }
    );

    if (!hospital)
      return res.status(404).send({ message: "Appointment not found" });

    const updatedAppointment = hospital.appointments.id(appointmentId);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to delete an appointment
router.delete("/appointments/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    console.log(`Attempting to delete appointment: ${appointmentId}`);

    const hospital = await Hospital.findOne({
      "appointments._id": appointmentId,
    });

    if (!hospital) {
      console.log("Hospital not found");
      return res
        .status(404)
        .send({ message: "Appointment not found in hospital records" });
    }

    const appointmentToDelete = hospital.appointments.find(
      (appointment) => appointment._id.toString() === appointmentId
    );

    if (!appointmentToDelete) {
      console.log("Appointment not found in hospital");
      return res
        .status(404)
        .send({ message: "Appointment not found in hospital records" });
    }

    console.log(`Deleting appointment: ${appointmentToDelete}`);
    hospital.appointments = hospital.appointments.filter(
      (appointment) => appointment._id.toString() !== appointmentId
    );
    await hospital.save();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send({ message: "Server error", error });
  }
});

router.post(
  "/emergency",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { pincode, reason, date } = req.body;
    if (!pincode) {
      return res.status(400).json({ message: "Pincode is required" });
    }
    const results = await geocoder.geocode(pincode + " India");
    if (results.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }
    const userLat = results[0].latitude;
    const userLong = results[0].longitude;
    const hospitals = await Hospital.find({}, { lat: 1, long: 1, _id: 1 });
    let minTime = Infinity;
    let nearestHospital = null;
    for (let hospital of hospitals) {
      const hospitalLat = hospital.lat;
      const hospitalLong = hospital.long;
      const route = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${userLong},${userLat};${hospitalLong},${hospitalLat}?overview=false`
      );
      const time = route.data.routes[0].duration;
      if (time < minTime) {
        minTime = time;
        nearestHospital = hospital;
      }
    }
    const profile = await User.findById(req.user.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    const appointment = {
      userId: req.user.id,
      date,
      reason,
      status: "pending",
    };
    try {
      const hospital = await Hospital.findById(nearestHospital._id);
      hospital.appointments.push(appointment);
      profile.appointments.push(appointment);
      await hospital.save();
      await profile.save();

      res.status(200).json({
        message: "Appointment booked successfully",
        appointment,
        hospital: {
          id: hospital._id,
          name: hospital.name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error booking appointment", error });
    }
  })
);

module.exports = router;
