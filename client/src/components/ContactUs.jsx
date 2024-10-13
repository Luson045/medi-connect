import React from 'react';
import '../styles/ContactUs.css';
import instagram from '../assets/instagram-brands-solid.svg';
import facebook from '../assets/facebook-brands-solid.svg';
import twitter from '../assets/x-twitter-brands-solid.svg';
import linkedin from '../assets/linkedin-brands-solid.svg';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
    <Navbar />
    <div className="contact-us-page">
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <div className="title-line"></div>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
          
          <button className='btn' type="submit">Send Message</button>
        </form>
        <div className="button-line"></div>
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
    <Footer />
    </>
  );
};

export default ContactUs;
