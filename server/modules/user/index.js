const express = require('express');
const User = require('../../models/user');
const { z } = require('zod');

const router = express.Router();

// Zod Schemas for Validation
const userSchema = z.object({
    name: z.string().min(3, 'Name should be at least 3 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password should be at least 6 characters long'),
});

const updateUserSchema = z.object({
    name: z.string().min(3, 'Name should be at least 3 characters long').optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z.string().min(6, 'Password should be at least 6 characters long').optional(),
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const parsedData = userSchema.parse(req.body); // Validate incoming data
        const user = new User(parsedData);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(400).send(error);
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user
router.patch('/:id', async (req, res) => {
    try {
        const parsedData = updateUserSchema.parse(req.body); // Validate incoming data
        const user = await User.findByIdAndUpdate(req.params.id, parsedData, { new: true, runValidators: true });
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(400).send(error);
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
