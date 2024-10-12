const express = require("express");
const { getProfile, editProfile } = require("../../controllers/user/profileController.js");
const { authenticateToken } = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.post("/profile/edit", authenticateToken, editProfile);
  

module.exports = router;
