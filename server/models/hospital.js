// models/hospital.js
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
    },
    phone: String,
    email: { type: String, required: true, unique: true },
    website: String,
    departments: [String],
    availableServices: [String],
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    password: { type: String, required: true },
    appointments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: Date,
        reason: String,
        status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
    }]
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
