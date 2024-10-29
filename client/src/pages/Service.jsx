import React from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../components/FloatingIcons';
import { services } from '../data';
import { useRecoilState } from 'recoil'; 
import { mode } from '../store/atom';


const ServiceCard = ({ icon: Icon, title, details }) => (
  <>
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-end justify-between hover:shadow-xl transition-transform transform-gpu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      <div className="flex flex-col items-center text-center">
        <Icon size={48} className="text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-8">{details}</p>
      </div>
      <diV className="flex items-end">{/* <Link>Read more</Link> */}</diV>
    </motion.div>
  </>
);
export default function ServicePage() {
  const [dark] = useRecoilState(mode);
  return (
    <>
      <header className={`${
      dark === 'dark'
        ? 'relative text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-700 via-gray-900 to-black overflow-hidden'
        : 'relative text-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-white overflow-hidden'
    } `} 
      >
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div class="department_container">
            <div class="container ">
              <div class="heading_container heading_center">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  <span className={`${
                    dark === 'dark'
                      ? 'text-white'
                      : 'text-black'
    } `} >Our Services</span>
                </motion.h2>
                <motion.p className="flex flex-col items-center text-center mb-12">
                  <span> A better life starts with a beautiful smile</span>
                </motion.p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ staggerChildren: 0.2 }}
              >
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <FloatingIcons />
      </header>
    </>
  );
}
