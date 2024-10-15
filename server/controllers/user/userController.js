const { z } = require("zod");

const User = require("../../models/user.js");
const Hospital = require("../../models/hospital.js");
const {
  userSchema,
  updateUserSchema,
} = require("../../validators/userSchemas.js");

// Creates a new user
const createUserProfile = async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const user = new User(parsedData);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(400).send(error);
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a User by ID
const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a User by ID
const updateUserByID = async (req, res) => {
  try {
    const parsedData = updateUserSchema.parse(req.body); // Validate incoming data
    const user = await User.findByIdAndUpdate(req.params.id, parsedData, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(400).send(error);
  }
};

// Delete a user by ID
const deleteUserByID = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUserProfile,
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
};
