import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/OPD.css';
import '../styles/Loader.css';
import jsPDF from 'jspdf';
// import pincodes from 'indian-pincodes';
import { pininfo } from 'indian_address';
import { AiOutlineDownload } from 'react-icons/ai';
import { TailSpin } from 'react-loader-spinner';
import { useRecoilValue } from 'recoil';
import { mode } from '../store/atom';
import { databaseUrls } from '../data/databaseUrls';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  Steps,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// form with steps
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button  from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//steps name
const steps = ['Personal information', 'Contact information', 'upload image'];

function OPDRegistrationForm() {
  const dark = useRecoilValue(mode); // Using Recoil state for dark mode
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    department: '',
    pincode: '',
    reason: '',
    date: '',
    report: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // steps state
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // steps method

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number';
    } else if (formData.age < 18) {
      newErrors.age = 'Age must be greater than 18';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact.match(/^\d{10}$/))
      newErrors.contact = 'Contact number must be 10 digits';
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters long';
    }
    if (!formData.department) newErrors.department = 'Department is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pininfo[formData.pincode]) {
      newErrors.pincode = 'Invalid pincode'; // Handle invalid pincode
    } else {
      console.log('Pincode details:', pininfo[formData.pincode]);
    }
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required'; // Validation for reason
    if (!formData.date) newErrors.date = 'Date is required'; // Validation for date

    if (formData.report.length > 0) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

      formData.report.forEach((file) => {
        if (!allowedTypes.includes(file.type)) {
          newErrors.report = 'Only PDF, JPEG, and PNG files are allowed';
        }
        if (file.size > maxSizeInBytes) {
          newErrors.report = 'File size should not exceed 5MB';
        }
      });
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'report') {
      setFormData((prevData) => ({
        ...prevData,
        report: [...prevData.report, ...Array.from(files)],
      }));
      setErrors({ ...errors, report: '' });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      contact: formData.contact,
      pincode: formData.pincode,
      reason: formData.reason,
      date: formData.date,
    };

    axios
      .post(databaseUrls.hospitals.emergency, submissionData)
      .then((response) => {
        console.log('Successfully registered!', response.data);
        setRegistrationDetails(submissionData);
        setAppointmentDetails(response.data);
        setShowModal(true); // Show the modal after successful registration
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: '',
          contact: '',
          address: '',
          department: '',
          pincode: '',
          reason: '',
          date: '',
          report: [],
        });
      })
      .catch((error) => {
        console.error('There was an error registering!', error);
        alert('Registration failed. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add light cream background for main content
    doc.setFillColor(252, 248, 230); // Light cream for body
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    
    // Add darker header background for logo
    doc.setFillColor(41, 128, 185); // Professional blue for header
    doc.rect(0, 0, doc.internal.pageSize.width, 45, 'F');
    
    // Set text color to white for header content
    doc.setTextColor(255, 255, 255);
    
    // Logo (add your base64 logo image here)
    var img = new Image();
    img.src = '/1.png';
    doc.addImage(img, 'png', 85, 5, 40, 15);
    
    // Header text in white
    doc.setFontSize(14);
    doc.text('Hospital Appointment Confirmation', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Generated from Med-Space', 105, 36, { align: 'center' });
    
    // Switch to dark text for body content
    doc.setTextColor(44, 62, 80); // Dark blue-grey for better readability
    
    // Body
    doc.setFontSize(12);
    doc.text('OPD Registration Details', 20, 60);
    doc.setDrawColor(41, 128, 185); // Blue line color
    doc.line(20, 65, 190, 65); // Decorative line under section header
    
    doc.text(`Name: ${registrationDetails.name}`, 20, 75);
    doc.text(`Age: ${registrationDetails.age}`, 20, 85);
    doc.text(
        `Date of Appointment: ${appointmentDetails.appointment.date}`,
        20,
        95
    );
    doc.text(`Reason: ${appointmentDetails.appointment.reason}`, 20, 105);
    doc.text(`Hospital: ${appointmentDetails.hospital.name}`, 20, 115);
    doc.text(
        `Address: ${appointmentDetails.hospital.address.street}, ${appointmentDetails.hospital.address.city}, ${appointmentDetails.hospital.address.state}, ${appointmentDetails.hospital.address.postalCode}`,
        20,
        125
    );
    doc.text(`Contact: ${appointmentDetails.hospital.phone}`, 20, 135);
    
    // Footer with blue background
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Add footer background
        doc.setFillColor(41, 128, 185);
        doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F');
        
        // Footer text in white
        doc.setTextColor(255, 255, 255);
        doc.text(
            `Page ${i} of ${pageCount}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 12,
            { align: 'center' }
        );
        doc.text(
            'Thank you for choosing Our Hospital. Please bring this document on the day of your appointment.\n 2024 Med-Space. All rights reserved.',
            105,
            doc.internal.pageSize.height - 6,
            { align: 'center' }
        );
    }
    
    // Save PDF
    doc.save('appointment-details.pdf');
  };


  return (
    <>
      <div className={`${dark === 'dark' ? 'dark' : ''}`}>
        <section className={`form-container ${dark === 'dark' ? 'dark' : ''} `}>
          <h2 className={dark === 'dark' ? 'text-yellow-400' : 'text-gray-900'}>
            OPD Registration
          </h2>

          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} className="w-full">
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <React.Fragment>
              <form
                onSubmit={handleSubmit}
                className="opd-registration-form justify-center !flex flex-col w-3/4 mt-5"
              >

                {activeStep === 0 && (
                  <React.Fragment>
                    <div
                      className={`form-group ${dark === 'dark' ? 'dark-mode' : ''}`}
                    >
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.name && (
                        <span className="error">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="age">Age:</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.age && (
                        <span className="error">{errors.age}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender:</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <span className="error">{errors.gender}</span>
                      )}
                    </div>
                  </React.Fragment>
                )}
                {activeStep === 1 && (
                  <React.Fragment>
                    <div className="form-group">
                      <label htmlFor="contact">Contact Number:</label>
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        placeholder="Enter your contact number"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.contact && (
                        <span className="error">{errors.contact}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.address && (
                        <span className="error">{errors.address}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="pincode">Pincode:</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        placeholder="Enter your pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.pincode && (
                        <span className="error">{errors.pincode}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="department">Department:</label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className={dark === 'dark' ? 'input-dark' : ''}
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="gynecology">Gynecology</option>
                        <option value="dermatology">Dermatology</option>
                      </select>
                      {errors.department && (
                        <span className="error">{errors.department}</span>
                      )}
                    </div>
                  </React.Fragment>
                )}
                {activeStep === 2 && (
                  <React.Fragment>
                    <div
                      className={`form-group ${dark === 'dark' ? 'input-dark' : ''}`}
                    >
                      <label htmlFor="date">Date:</label>
                      <input
                        className={dark === 'dark' ? 'input-dark' : ''}
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={today} // Set the minimum value to today's date
                      />
                      {errors.date && (
                        <span className="error">{errors.date}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="report">Upload Report (Optional):</label>
                      <input
                        type="file"
                        id="report"
                        name="report"
                        multiple
                        onChange={handleChange}
                        className={dark === 'dark' ? 'input-dark' : ''}
                      />
                      {errors.report && (
                        <span className="error">{errors.report}</span>
                      )}
                    </div>
                    <div className="form-group form-textarea">
                      <label htmlFor="reason">Reason:</label>
                      <textarea
                        id="reason"
                        name="reason"
                        placeholder="Enter the reason for your visit"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                      ></textarea>
                      {errors.reason && (
                        <span className="error">{errors.reason}</span>
                      )}
                    </div>
                  </React.Fragment>
                )}

                <div className="flex !w-full justify-between items-center">
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <div className="form-actions form-buttons w-full">
                      <button
                        type="submit"
                        className={`submit-btn ${dark === 'dark' ? 'btn-dark' : ''} `}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Registering...' : 'Register'}
                      </button>

                      {/* <Link
                          to="/"
                          className={`back-btn ${dark === 'dark' ? 'link-dark' : ''}`}
                        >
                          Back to Home
                        </Link> */}
                    </div>
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </div>
              </form>
            </React.Fragment>
          </Box>
        </section>
      </div>

      {showModal && (
        <div className={`modal ${dark === 'dark' ? 'modal-dark' : ''}`}>
          <div className="modal-content">
            <div className="OpdHeader">
              <img src="/favicon.png" className="image" alt="Logo" />
              <p className="OPDText">Med-Space</p>
            </div>
            <hr></hr>

            <h3
              style={{ marginTop: '20px' }}
              className={dark === 'dark' ? 'text-yellow-400' : ''}
            >
              Registration Successful!
            </h3>

            <p>Here are your appointment details:</p>
            <ul>
              <li>Name: {registrationDetails?.name || 'John Doe'}</li>
              <li>Age: {registrationDetails?.age || 28}</li>
              <li>
                Date of Appointment:{' '}
                {appointmentDetails?.appointment?.date || '2024-10-10'}
              </li>
              <li>
                Reason:{' '}
                {appointmentDetails?.appointment?.reason || 'Routine check-up'}
              </li>
              <li>
                Hospital:{' '}
                {appointmentDetails?.hospital?.name || 'City Hospital'}
              </li>
              <li>
                Address:{' '}
                {appointmentDetails?.hospital?.address.street || 'Null'},{appointmentDetails?.hospital?.address.city || 'Null'},{appointmentDetails?.hospital?.address.state || 'Null'}
              </li>
              
              <li>
                Phone:{' '}
                {appointmentDetails?.hospital?.phone || 'City Hospital'}
              </li>
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className={dark === 'dark' ? 'btn-dark' : ''}
            >
              Close
            </button>

            {/* PDF download icon in the lower right corner */}
            <div className="download-icon" onClick={downloadPDF}>
              <AiOutlineDownload
                className={dark === 'dark' ? 'text-yellow-400' : 'text-black'}
                size={32}
                color="#007bff"
              />
            </div>

            {/* Footer */}
            <footer
              style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '12px',
              }}
            >
              <hr />
              <p>&copy; 2024 Med-Space. All rights reserved. &trade;</p>
            </footer>
          </div>
        </div>
      )}
      {/* Full-screen Loader Overlay */}
      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-container">
            <TailSpin
              height="80"
              width="80"
              color="#007bff"
              ariaLabel="loading"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default OPDRegistrationForm;
