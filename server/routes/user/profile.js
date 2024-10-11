const express = require("express");
const { getProfile } = require("../../controllers/user/profileController.js");
const { authenticateToken } = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);

module.exports = router;
