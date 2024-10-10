const mongoose = require('mongoose');
const Hospital = require('../models/hospital'); // Adjust the path accordingly

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Example Indian hospital data
const exampleHospitals = [
  {
    name: 'Apollo Hospitals',
    address: {
      street: '21, Greams Lane, Off Greams Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600006',
    },
    phone: '+91-44-2829-0200',
    email: 'info@apollohospitals.com',
    website: 'https://www.apollohospitals.com',
    departments: ['Cardiology', 'Oncology', 'Neurology'],
    availableServices: ['Emergency', 'Inpatient', 'Surgery'],
    ratings: 4.8,
    password: 'securepassword1',
    lat: 13.0724,
    long: 80.2518,
    appointments: [
      {
        userId: mongoose.Types.ObjectId(), // Replace with real user ID if available
        date: new Date('2024-10-20'),
        reason: 'Heart Surgery Consultation',
        status: 'pending',
      },
    ],
  },
  {
    name: 'Fortis Hospital',
    address: {
      street: 'A Block, Shalimar Bagh',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110088',
    },
    phone: '+91-11-4530-2222',
    email: 'contactus@fortishealthcare.com',
    website: 'https://www.fortishealthcare.com',
    departments: ['Orthopedics', 'Pediatrics', 'Cardiology'],
    availableServices: ['Outpatient', 'Emergency', 'Diagnostic'],
    ratings: 4.7,
    password: 'securepassword2',
    lat: 28.7167,
    long: 77.1667,
    appointments: [
      {
        userId: mongoose.Types.ObjectId(), // Replace with real user ID if available
        date: new Date('2024-11-05'),
        reason: 'Knee Surgery',
        status: 'completed',
      },
    ],
  },
  {
    name: 'Manipal Hospitals',
    address: {
      street: '98, HAL Airport Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560017',
    },
    phone: '+91-80-2502-4444',
    email: 'support@manipalhospitals.com',
    website: 'https://www.manipalhospitals.com',
    departments: ['Gastroenterology', 'Pulmonology', 'Oncology'],
    availableServices: ['ICU', 'Radiology', 'Consultations'],
    ratings: 4.5,
    password: 'securepassword3',
    lat: 12.9592,
    long: 77.6974,
    appointments: [
      {
        userId: mongoose.Types.ObjectId(), // Replace with real user ID if available
        date: new Date('2024-12-10'),
        reason: 'Liver Checkup',
        status: 'pending',
      },
    ],
  },
];

// Insert example hospitals into the database
Hospital.insertMany(exampleHospitals)
  .then((docs) => {
    console.log('Hospitals added successfully:', docs);
    mongoose.connection.close(); // Close the connection after insertion
  })
  .catch((err) => {
    console.error('Error adding hospitals:', err);
  });
