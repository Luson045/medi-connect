import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clipboard, PhoneCall, Hospital } from 'lucide-react';
import Navbar from '../components/Navbar';
import StaticLineChart from '../components/Chart';
import Review from '../components/Review';
import TableComponent from '../components/TableComponent';
import PatientDistributionChart from '../components/PatientDistributionChart';
import FloatingIcons from '../components/FloatingIcons';
import '../styles/Home.css';
import { useRecoilValue } from 'recoil';
import { mode } from '../store/atom';

const ServiceCard = ({ icon: Icon, title, details }) => {
  const dark = useRecoilValue(mode);
  return <>
    <motion.div
      className={`rounded-lg shadow-lg p-6 flex flex-col items-end justify-between hover:shadow-xl transition-transform transform-gpu ${dark === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      <div className="flex flex-col items-center text-center">
        <Icon size={48} className={`${dark === 'dark' ? 'text-yellow-400' : 'text-blue-500'} mb-4`} />
        <h3 className={`text-xl font-semibold mb-2 ${dark === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`mb-8 ${dark === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {details}
        </p>
      </div>
      <div className="flex items-end">
        <Link className={`${dark === 'dark' ? 'text-yellow-400' : 'text-blue-500'}`}>Read more</Link>
      </div>
    </motion.div>
  </>
};

const Button = ({ children, primary, to }) => {
  const dark = useRecoilValue(mode);

  return (
    
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Link
        to={to}
        className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md ${primary
          ? dark === 'dark'
            ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-gray-950'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
          : dark === 'dark'
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            : 'bg-blue-200 text-blue-600 hover:bg-blue-300'
          }`}
      >
        {children}
      </Link>
    </motion.div>
  )
};

function Home() {
  const dark = useRecoilValue(mode);
  const services = [
    {
      icon: Clipboard,
      title: 'Easy Registration',
      details:
        'Quickly and easily register for your OPD appointment with just a few simple steps. Save time by avoiding long waits and secure your preferred time slot hassle-free.',
    },
    {
      icon: Hospital,
      title: 'Medical Resource Data Sharing',
      details:
        'Stay updated on the latest data regarding hospital equipment to ensure you have access to the most current information.',
    },
    {
      icon: PhoneCall,
      title: '24/7 Support',
      details:
        "We are here to assist you at any time of the day, ensuring you receive the support you need whenever it's convenient for you.",
    },
  ];

  return (
    <>
      {/*google-site-verification: google702f0a7aa8f19d22.html*/}
      <div
        className={`min-h-screen ${dark === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-blue-100 to-blue-50'
          }`}
      >
        <Navbar />

        <header
          className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${dark === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-white text-black'
            }`}
        >
          <div className="absolute inset-0">
            <svg
              className="absolute bottom-0 left-0 right-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill={dark === 'dark' ? '#1f2937' : '#e1f3f7'} // Adjusting the fill color for dark mode
                fillOpacity="1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${dark === 'dark'
                  ? 'from-gray-500 to-gray-700' // Dark mode gradient
                  : 'from-blue-500 to-blue-600' // Default light mode gradient
                  }`}
              >
                Revolutionizing
              </span>
              <br />
              <span className={dark === 'dark' ? 'text-gray-200' : 'text-black'}>
                OPD Registration
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl sm:text-2xl md:text-3xl mb-12 max-w-3xl transition-colors duration-300 ${dark === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring' }}
            >
              Skip the queue and get the care you need faster.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, type: 'spring' }}
            >
              <Link to="/registerOPD">
                <motion.button
                  className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${dark === 'dark'
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${dark === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-blue-200 text-blue-600 hover:bg-blue-300'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Explore Services
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <FloatingIcons />
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-20">

            <motion.h2
              className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${dark === 'dark' ? 'text-yellow-400' : 'text-blue-600'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ staggerChildren: 0.2 }}
            >
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </motion.div>
            <motion.div className="flex justify-center items-center">
              <Button to="/services">View All</Button>
            </motion.div>
          </section>

          <section className="mb-20 relative">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Insights and Analytics
            </motion.h2>

            <motion.div
              className="mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                Patient Distribution by Time Slot
              </h3>
              <TableComponent />
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4  text-blue-700">
                Patient Flow Analysis
              </h3>
              <div className="h-64  w-full sm:w-2/3 mb-8">
                <StaticLineChart />
              </div>
              <FloatingIcons count={8} leftMargin={70} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Patient Distribution by Category
                </h3>
                <PatientDistributionChart />
              </motion.div>
              <motion.div
                className="bg-white rounded-lg shadow-lg p-3 sm:p-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Resource Allocation
                </h3>
                <motion.img
                  src="data2.png"
                  alt="Medical resource allocation visualization"
                  className="rounded-lg object-cover w-full h-64 sm:h-80 md:h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
            </div>
          </section>

          <Review />
        </main>
      </div>
    </>
  );
}

export default Home;
