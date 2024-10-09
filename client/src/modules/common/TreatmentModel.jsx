import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const TreatmentModal = ({ isOpen, onRequestClose, treatment }) => {
  const navigate = useNavigate(); // Get navigate function for redirection

  if (!isOpen) return null;

  const handleBookNow = () => {

    navigate('/registerOPD'); // Redirect to the booking page
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 2 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <button
          className="absolute top-2 right-2 text-black hover:text-gray-600"
          onClick={onRequestClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{treatment.title}</h2>
        <p className="text-gray-600 mb-4">{treatment.details}</p>
        
        {/* Displaying modalDetails as HTML */}
        <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: treatment.modalDetails }} />

        <div className="text-right mb-4">
          {/* <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors mr-2"
          >
            Close
          </button> */}
          {/* Book Now button */}
          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TreatmentModal;
