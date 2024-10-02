import React from "react";
import '../../styles/Footer.css';  
import instagram from '../../assets/instagram-brands-solid.svg';
import facebook from '../../assets/facebook-brands-solid.svg';
import twitter from '../../assets/x-twitter-brands-solid.svg';
import linkedin from '../../assets/linkedin-brands-solid.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li>OPD Consultations</li>
            <li>Lab Tests</li>
            <li>Health Checkups</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>Our Hospital</li>
            <li>Doctors</li>
            <li>Pricing</li>
            <li>Terms</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>Business</li>
            <li>Customer Care</li>
            <li>Join Us</li>
            <li>Support Us</li>
          </ul>
        </div>

        <div className="footer-column follow-us">
          <h3>Follow us on</h3>
          <ul className="social-icons">
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="disclaimer">
        <p>DISCLAIMER</p>
        <p>
          “The information provided on Medi-Connect is intended for general informational purposes only and should not be considered as medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider for any medical condition or treatment. Medi-Connect facilitates OPD appointment booking and hospital data sharing, but it does not endorse or guarantee the quality of services provided by healthcare providers.”
        </p>
      </div>

      <div className="footer-bottom">
        <p>Medi connect © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
