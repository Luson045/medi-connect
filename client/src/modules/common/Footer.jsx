import React, { useState, useEffect } from 'react';
import '../../styles/Footer.css';
import instagram from '../../assets/instagram-brands-solid.svg';
import facebook from '../../assets/facebook-brands-solid.svg';
import twitter from '../../assets/x-twitter-brands-solid.svg';
import linkedin from '../../assets/linkedin-brands-solid.svg';
//import CustomerCare from '../../assets/call-center.gif';
//import Consultation from '../../assets/consultation.gif';
//import PriceTag from '../../assets/price-tag.gif';
//import Terms from '../../assets/terms-and-conditions.png';
//import Join from '../../assets/join.gif';
import { FaArrowUp } from 'react-icons/fa';
//import hospital from '../../assets/hospital.gif';
//import doctor from '../../assets/doctors-office.gif';
//import support from '../../assets/support.png';
//import business from '../../assets/business.gif';
//import bloodTest from '../../assets/blood-test.gif';
//import health from '../../assets/health-checkup.gif';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  //function for scrolling to the top:
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={Consultation} alt="OPD Consultation Icon" className="w-12 h-12" /> */}
              <span>OPD Consultations</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={bloodTest} alt="Lab Test Icon" className="w-12 h-12" /> */}
              <span>Lab Tests</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={health} alt="Health Checkup Icon" className="w-12 h-12" /> */}
              <span>Health Checkup</span>
            </li>
          </ul>
        </div>
    
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={hospital} alt="Hospital Icon" className="w-10 h-10" /> */}
              <span>Our Hospital</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={doctor} alt="Doctors Icon" className="w-12 h-12" /> */}
              <span>Doctors</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={PriceTag} alt="Pricing Icon" className="w-12 h-12" /> */}
              <span>Pricing</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={Terms} alt="Terms Icon" className="w-10 h-10" /> */}
              <span>Terms</span>
            </li>
          </ul>
        </div>
    
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={business} alt="Business Icon" className="w-10 h-10" /> */}
              <span>Business</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={CustomerCare} alt="Customer Care Icon" className="w-12 h-12" /> */}
              <span>Customer Care</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={Join} alt="Join Us Icon" className="w-12 h-12" /> */}
              <span>Join Us</span>
            </li>
            <li className="flex items-center space-x-4 mb-2">
              {/* <img src={support} alt="Support Us Icon" className="w-10 h-10" /> */}
              <span>Support Us</span>
            </li>
          </ul>
        </div>

        <div className="footer-column follow-us">
          <h3>Follow us on</h3>
          <ul className="social-icons">
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="LinkedIn" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="disclaimer">
        <p>DISCLAIMER</p>
        <p>
          “The information provided on Medi-Connect is intended for general
          informational purposes only and should not be considered as medical
          advice, diagnosis, or treatment. Always seek the advice of a qualified
          healthcare provider for any medical condition or treatment.
          Medi-Connect facilitates OPD appointment booking and hospital data
          sharing, but it does not endorse or guarantee the quality of services
          provided by healthcare providers.”
        </p>
      </div>

      <div className="footer-bottom">
        <p>Medi connect ©2024</p>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <FaArrowUp size={24} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
