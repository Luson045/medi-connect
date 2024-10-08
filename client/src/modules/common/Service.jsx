import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../common/FloatingIcons';
import { services } from '../../data';
import TreatmentModal from './TreatmentModel';

const ServiceCard = ({ icon: Icon, title, details, onReadMore, isHovered }) => (
  <motion.div
    className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform-gpu transition-all ${
      isHovered ? 'hover:scale-110' : 'hover:scale-105'
    }`}
    whileHover={{ scale: 1.1, zIndex: 10 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{details}</p>
    <button
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
      onClick={onReadMore}
    >
      Read more
    </button>
  </motion.div>
);

export default function ServicePage() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null); // Track hovered card

  const handleReadMore = (treatment) => {
    setSelectedTreatment(treatment);
  };

  const closeModal = () => {
    setSelectedTreatment(null);
  };

  return (
    <>
      <header className="relative text-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-300 via-white to-blue-100 overflow-hidden">
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
              className="text-5xl font-bold mb-4 text-gray-800 leading-tight"
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
            style={{
              position: 'relative',
              backdropFilter: hoveredCard ? 'blur(4px)' : 'none', // Reduced blur
              transition: 'backdrop-filter 0.3s ease-in-out',
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredCard(index)} // Track hover
                onMouseLeave={() => setHoveredCard(null)} // Reset hover
                style={{
                  opacity: hoveredCard === null || hoveredCard === index ? 1 : 0.85, // Less opacity reduction
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <ServiceCard
                  {...service}
                  onReadMore={() => handleReadMore(service)}
                  isHovered={hoveredCard === index}
                />
              </motion.div>
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
