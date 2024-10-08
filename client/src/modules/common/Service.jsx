import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../common/FloatingIcons';
import { services } from '../../data';
import TreatmentModal from './TreatmentModel';
const ServiceCard = ({ icon: Icon, title, details, onReadMore }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-transform transform-gpu hover:scale-105"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{details}</p>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
      onClick={onReadMore}
    >
      Read more
    </button>
  </motion.div>
);

export default function ServicePage() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleReadMore = (treatment) => {
    setSelectedTreatment(treatment);
  };

  const closeModal = () => {
    setSelectedTreatment(null);
  };

  return (
    <>
      <header className="relative text-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 via-white to-blue-50 overflow-hidden">
        {/* Background Shape */}
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e0f2f9"
              fillOpacity="1"
              d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,154.7C672,149,768,107,864,117.3C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              A better life starts with a beautiful smile
            </motion.p>
          </div>

          {/* Service Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ staggerChildren: 0.2 }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onReadMore={() => handleReadMore(service)}
              />
            ))}
          </motion.div>
        </div>

        {/* Decorative Floating Icons */}
        <FloatingIcons />
      </header>

      {/* Treatment Modal */}
      {selectedTreatment && (
        <TreatmentModal
          isOpen={Boolean(selectedTreatment)}
          onRequestClose={closeModal}
          treatment={selectedTreatment}
        />
      )}
    </>
  );
}
