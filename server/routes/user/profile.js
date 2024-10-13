const express = require("express");
const {
  getProfile,
  editProfile,
  addDoctor,
} = require("../../controllers/user/profileController.js");
const { authenticateToken } = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.post("/profile/edit", authenticateToken, editProfile);
router.post("/profile/addDoctor", authenticateToken, addDoctor);

module.exports = router;
