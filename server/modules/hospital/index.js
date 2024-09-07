const express = require('express');
const Hospital = require('../../models/hospital');
const User = require('../../models/user');

const router = express.Router();

// Create a new hospital
router.post('/', async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).send(hospital);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all hospitals with current appointments count
// Get all hospitals
router.get('/', async (req, res) =>  {
    const { searchQuery } = req.query;

    try {
        let hospitals;
        if (searchQuery) {
            // Search for hospitals by name or address using case-insensitive regex
            const regex = new RegExp(searchQuery, 'i');
            hospitals = await Hospital.find({
                $or: [
                    { name: { $regex: regex } },
                    { 'address.street': { $regex: regex } },
                    { 'address.city': { $regex: regex } },
                    { 'address.state': { $regex: regex } }
                ]
            });
        } else {
            hospitals = await Hospital.find();
        }

        res.status(200).json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get a hospital by ID
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).send();
        res.send(hospital);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a hospital
router.patch('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hospital) return res.status(404).send();
        res.send(hospital);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a hospital
router.delete('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) return res.status(404).send();
        res.send(hospital);
    } catch (error) {
        res.status(500).send(error);
    }
});



// Book an appointment
router.post('/hospitals/:id/book', async (req, res) => {
  try {
      const { userId, date, reason } = req.body;
      const hospitalId = req.params.id;

      const hospital = await Hospital.findById(hospitalId);
      const user = await User.findById(userId);

      if (!hospital || !user) {
          return res.status(404).json({ message: 'Hospital or user not found' });
      }

      // Create an appointment
      const appointment = {
          userId,
          date,
          reason,
          status: 'pending',
      };

      hospital.appointments.push(appointment);
      await hospital.save();

      // Add the appointment to the user's record as well
      user.appointments.push({ hospitalId, date, reason, status: 'pending' });
      await user.save();

      res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error booking appointment', error });
  }
});

module.exports = router;
