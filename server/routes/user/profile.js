const express = require("express");
const {
  getProfile,
  editProfileByID,
} = require("../../controllers/user/profileController.js");

const {
  createUserProfile,
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
} = require("../../controllers/user/userController.js");
const { authenticateToken } = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/", createUserProfile);
router.post("/:id", getUserByID);

// Protected Routes that require authentication
router.post("/", authenticateToken, getAllUsers);
router.post("/:id", authenticateToken, deleteUserByID);
router.post("/:id", authenticateToken, updateUserByID);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile/edit/:id", authenticateToken, editProfileByID);

module.exports = router;
