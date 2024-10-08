import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instagram from '../../assets/instagram-brands-solid.svg';
import facebook from '../../assets/facebook-brands-solid.svg';
import twitter from '../../assets/x-twitter-brands-solid.svg';
import linkedin from '../../assets/linkedin-brands-solid.svg';
import { FaArrowUp } from 'react-icons/fa';
import Box from '@mui/material/Box';
import GoogleTranslate from './GoogleTranslate';
import { border, display, width } from '@mui/system';
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
    <footer className="bg-gray-800 text-white p-14">
      <div className="flex flex-col md:flex-row justify-between text-center md:text-left mt-4">
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Services</h3>
          <ul>
            <li className="mb-3 text-base md:text-lg">OPD Consultations</li>
            <li className="mb-3 text-base md:text-lg">Lab Tests</li>
            <li className="mb-3 text-base md:text-lg">Health Checkup</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">About</h3>
          <ul>
            <li className="mb-3 text-base md:text-lg">Our Hospital</li>
            <li className="mb-3 text-base md:text-lg">Doctors</li>
            <li className="mb-3 text-base md:text-lg">Pricing</li>
            <li className="mb-3 text-base md:text-lg">
              <Link to="/terms-and-conditions" className="mb-3 text-base md:text-lg">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Us</h3>
          <ul>
            <li className="mb-3 text-base md:text-lg">Business</li>
            <li className="mb-3 text-base md:text-lg">Customer Care</li>
            <li className="mb-3 text-base md:text-lg">Join Us</li>
            <li className="mb-3 text-base md:text-lg">Support Us</li>
          </ul>
          
        </div>

        <div className="mb-8 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Follow us on
          </h3>
          <ul className="flex justify-center space-x-6 md:space-x-8">
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-8 md:w-10 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-8 md:w-10 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-8 md:w-10 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-8 md:w-10 filter brightness-0 invert hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            </li>
          </ul>
          <div className="translator"
              style={{
                position:'relative',
                marginLeft: 'auto',
                marginRight: '0',
                marginBottom : '4px',
                marginTop: '16px',
                color: "white",
                display: "block",
                alignItems: "center",
                width: 'fit-content',
              }}>
                <img src="/google.png" alt="" className="google-translate" style={{display: 'inline-block',width:'45px'}} />

                <GoogleTranslate/>
                        </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="font-bold text-lg md:text-xl">DISCLAIMER</p>
        <p className="text-gray-300 text-sm md:text-base mt-2">
          “The information provided on Med-Space is intended for general
          informational purposes only and should not be considered as medical
          advice, diagnosis, or treatment. Always seek the advice of a qualified
          healthcare provider for any medical condition or treatment. Med-Space
          facilitates OPD appointment booking and hospital data sharing, but it
          does not endorse or guarantee the quality of services provided by
          healthcare providers.”
        </p>
      </div>

      <div className="text-center mt-4 text-gray-400 text-xs md:text-sm">
        <p>Medi connect ©2024</p>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-3 md:p-4 rounded-full z-[1000]"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
