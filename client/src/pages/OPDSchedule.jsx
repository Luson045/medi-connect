import React from 'react';
import '../styles/Login.css';
import { useRecoilValue } from 'recoil'; // Import Recoil to use the dark mode state
import { mode } from '../store/atom'; // Import dark mode atom
import { motion } from 'framer-motion';

function OPDSchedule() {
  const dark = useRecoilValue(mode); // Access dark mode value using Recoil

  return (
    <>
      <header className="relative text-black py-16 sm:py-24 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-white overflow-hidden">
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e1f3f7"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      <div className="max-w-7xl mx-auto relative z-10">
        <div>
          <div className="container">
            <div className="heading_container heading_center">
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                <span>OPD Schedule</span>
              </motion.h2>
              <motion.p className="flex flex-col items-center mb-12 ms-4 me-4">
                <span>
                  If you are in an emergency and can not wait for an appointment
                  to be approved, you can check the available time slots for a
                  specific doctor or specialist right away. If you prefer a
                  particular doctor based on previous visits and effective
                  treatments, you can also see their schedule and book a
                  convenient time directly.
                </span>
              </motion.p>
            </div>
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default OPDSchedule;
