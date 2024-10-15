const express = require("express");
const { authenticateToken } = require("../../middlewares/authMiddleware.js");
const {
  bookAppointmentByHospitalID,
  getAppointemntsByHospitalID,
  addAppointment,
  updateAppointmentByID,
  deleteAppointmentByID,
  addEmergencyAppointment,
} = require("../../controllers/appointments/appointmentsController.js");
const router = express.Router();

router.post("/hospitals/:id/book", bookAppointmentByHospitalID);
router.get("/appointments/:hospitalId", getAppointemntsByHospitalID);
router.get("/appointments/:hospitalId", addAppointment);

// These are protected routes and needs authentication from now on
router.put(
  "/appointments/:appointmentId",
  authenticateToken,
  updateAppointmentByID
);
router.patch(
  "/appointments/:appointmentId",
  authenticateToken,
  deleteAppointmentByID
);
router.delete("/:id", authenticateToken);

/**
 * @SpecialRoute
 *
 * Emergency appointments will not need the authentication
 */

router.post("/emergency", addEmergencyAppointment);

module.exports = router;
