import React, { useState, useEffect } from 'react';
import instagram from '../../assets/instagram-brands-solid.svg';
import facebook from '../../assets/facebook-brands-solid.svg';
import twitter from '../../assets/x-twitter-brands-solid.svg';
import linkedin from '../../assets/linkedin-brands-solid.svg';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-gray-800 text-white p-20">
      <div className="flex flex-col md:flex-row justify-between text-center md:text-left mt-4">
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl md:text-4xl font-semibold mb-6">Services</h3>
          <ul>
            <li className="mb-4 text-lg md:text-2xl">OPD Consultations</li>
            <li className="mb-4 text-lg md:text-2xl">Lab Tests</li>
            <li className="mb-4 text-lg md:text-2xl">Health Checkup</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl md:text-4xl font-semibold mb-6">About</h3>
          <ul>
            <li className="mb-4 text-lg md:text-2xl">Our Hospital</li>
            <li className="mb-4 text-lg md:text-2xl">Doctors</li>
            <li className="mb-4 text-lg md:text-2xl">Pricing</li>
            <li className="mb-4 text-lg md:text-2xl">Terms</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl md:text-4xl font-semibold mb-6">Contact Us</h3>
          <ul>
            <li className="mb-4 text-lg md:text-2xl">Business</li>
            <li className="mb-4 text-lg md:text-2xl">Customer Care</li>
            <li className="mb-4 text-lg md:text-2xl">Join Us</li>
            <li className="mb-4 text-lg md:text-2xl">Support Us</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl md:text-4xl font-semibold mb-6">Follow us on</h3>
          <ul className="flex justify-center space-x-8 md:space-x-10">
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" className="w-12 md:w-16 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200" /> {/* White icon */}
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-12 md:w-16 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200" /> {/* White icon */}
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="w-12 md:w-16 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200" /> {/* White icon */}
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" className="w-12 md:w-16 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200" /> {/* White icon */}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="font-bold text-xl md:text-3xl">DISCLAIMER</p>
        <p className="text-gray-300 text-base md:text-xl mt-2">
          “The information provided on Med-Space is intended for general informational purposes only and should not be considered as medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider for any medical condition or treatment. Med-Space facilitates OPD appointment booking and hospital data sharing, but it does not endorse or guarantee the quality of services provided by healthcare providers.”
        </p>
      </div>

      <div className="text-center mt-4 text-gray-400 text-sm md:text-lg">
        <p>Medi connect ©2024</p>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 md:p-5 rounded-full">
          <FaArrowUp size={28} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
