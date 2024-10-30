const mongoose = require("mongoose");
const { z } = require("zod");
const asyncHandler = require("express-async-handler");
const NodeGeocoder = require("node-geocoder");
const axios = require("axios");
const sendMail = require("../../utils/notifications/sendMail.js");
const {
  appointmentSchema,
  updateAppointmentSchema,
} = require("../../validators/appointmentSchemas.js");
const User = require("../../models/user.js");
const Hospital = require("../../models/hospital.js");

// Set up the OpenCage provider
const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
};
const geocoder = NodeGeocoder(options);

// Book an appointment by hospital ID
const bookAppointmentByHospitalID = async (req, res) => {
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
};

// Get appointments by hospital ID
const getAppointemntsByHospitalID = async (req, res) => {
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
};

// Add a new appointment
const addAppointment = async (req, res) => {
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
};

// Update appointment status by ID
const updateAppointmentByID = async (req, res) => {
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
};

// Delete appointment by ID
const deleteAppointmentByID = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the hospital and the specific appointment
      const hospital = await Hospital.findOne(
        { "appointments._id": appointmentId },
        { "appointments.$": 1 }
      ).session(session);

      if (!hospital || !hospital.appointments.length) {
        await session.abortTransaction();
        return res
          .status(404)
          .json({ message: "Appointment not found in hospital" });
      }

      const appointment = hospital.appointments[0];

      // Remove the appointment from the hospital
      await Hospital.updateOne(
        { _id: hospital._id },
        { $pull: { appointments: { _id: appointmentId } } },
        { session }
      );

      console.log("Appointment deleted from hospital");

      // Find and update the user using the appointment details
      const userResult = await User.updateOne(
        {
          "appointments.hospitalId": hospital._id,
          "appointments.date": appointment.date,
          "appointments.reason": appointment.reason,
        },
        {
          $pull: {
            appointments: {
              hospitalId: hospital._id,
              date: appointment.date,
              reason: appointment.reason,
            },
          },
        },
        { session }
      );

      if (userResult.modifiedCount === 0) {
        await session.abortTransaction();
        return res
          .status(404)
          .json({ message: "Appointment not found in user" });
      }

      console.log("Appointment deleted from user");

      await session.commitTransaction();
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Emergency Appointments
const addEmergencyAppointment = asyncHandler(async (req, res) => {
  const { name, email, age, gender, contact, pincode, reason, date } = req.body;
  console.log("name:", name);
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

  // Check if a user with the provided email already exists
  let profile = await User.findOne({ email });

  if (!profile) {
    // If no user exists, create a new one
    const password = Math.random().toString(36).slice(-8);
    profile = new User({
      name,
      email,
      age,
      password,
      gender,
      phone: contact,
    });
  }

  const appointment = {
    userId: profile._id,
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

    console.log(
      `Your appointment has been booked at ${hospital.name} on ${appointment.date}`
    );
    await sendMail(
      `Your appointment has been booked at ${hospital.name} on ${appointment.date}`,
      profile.email
    );

    res.status(200).json({
      message: "Appointment booked successfully",
      appointment,
      hospital: {
        id: hospital._id,
        name: hospital.name,
        address: hospital.address,
        phone: hospital.phone
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

module.exports = {
  bookAppointmentByHospitalID,
  getAppointemntsByHospitalID,
  addAppointment,
  updateAppointmentByID,
  deleteAppointmentByID,
  addEmergencyAppointment,
};
