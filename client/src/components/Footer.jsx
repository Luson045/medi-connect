import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import playstore from "../assets/favicon2.png";
import {
  FaGithub,
  FaRegCopyright,
  FaDiscord,
  FaLinkedinIn,
  FaArrowUp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Corrected import for Twitter icon
import GoogleTranslate from './GoogleTranslate';
import Chatbot from '../Medical-Chatbot/Chatbot';
import { X, MessageCircle } from 'lucide-react';
// import { FaArrowUp } from 'react-icons/fa';
  
import { useRecoilValue, useRecoilState } from 'recoil'; 
import { mode } from '../store/atom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const isDarkMode = useRecoilValue(mode); // Use the Recoil state for dark mode
 const navigate = useNavigate(); 
 
 const [dark, setDark] = useRecoilState(mode);

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

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:8080/otherroutes/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('Subscription successful! Confirmation mail sent');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage('Subscription failed. Try again.');
        setMessageType('error');
      }
      setTimeout(() => {
        setMessage('');
        setEmail('');
      }, 5000); // Clear the message and input after 5 seconds
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');

      setTimeout(() => setMessage(''), 5000);
    }
  };

  // Define company links with distinct paths
  const aboutLinks = [
    { name: 'Our Hospital', path: '/our-hospital' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Pricing', path: '/pricing' },
  ];

  // Define quick links
  const servicesLinks = [
    { name: 'OPD Consultations', path: '/registerOPD' },
    { name: 'Lab Tests', path: '/labtest' },
    { name: 'Health Checkup', path: '/health-checkup' },
  ];

  // Define social media links
  const socialMedia = [
    {
      Icon: FaGithub,
      link: 'https://github.com/Luson045/medi-connect',
      color: '#333',
    },
    { Icon: FaDiscord, link: 'https://discord.gg', color: '#7289DA' },
    { Icon: FaXTwitter, link: 'https://twitter.com', color: '#1DA1F2' },
    { Icon: FaLinkedinIn, link: 'https://www.linkedin.com', color: '#0077B5' },
  ];

  // Define legal links with their paths if available
  const contactUsLinks = [
    { name: 'Business', path: '/business' },
    { name: 'Support Us', path: '/support-us' },
    { name: 'Customer Care', path: '/customer-care' },
    { name: 'Newsletter', path: '/newsletter-dashboard' },
  ];

  // const handleRating = (value) => {
  //     setRating(value);
  // };

  // const submitRating = () => {
  //     alert(`Thank you for rating us ${rating} out of 5! Comment: ${comment}`);
  //     setIsModalOpen(false);
  //     setRating(0);
  //     setComment('');
  // };

  return (
    <footer className={`${
      dark === 'dark'
        ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
        : 'bg-gradient-to-r from-[#b6dbfc] via-[#8faed9] to-[#b6dbfc] p-8 text-white shadow-lg shadow-black'
    } `}
>
    
      <div className="container mx-auto">
        {/* Newsletter Subscription Section */}
        <div className="text-center md:col-span-2 lg:col-span-4 my-4">
          <h3 className="text-2xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded border border-gray-300 text-black w-full max-w-[300px]"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full max-w-[150px]"
            >
              Subscribe
            </button>
          </div>
          {message && (
            <p className={`text-2xl mt-2 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-between space-x-4">
          {/* Med Space Section */}
          <div className="space-y-4 w-full md:w-auto">
            <Link
              to="/"
              className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src="../favicon.png"
                className="h-10 w-10 transition-transform duration-300 group-hover:rotate-6"
                alt="AgroTech AI Logo"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1f2937] to-[#b6dbfc] bg-clip-text text-transparent group-hover:from-[#133859] group-hover:to-[#b6dbfc] transition-all duration-300">
                Med Space
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The Med Space platform simplifies hospital management with
              efficient queuing models, lab test, OPDs, and inventory management
              for medicines and consumables.
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-4 w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#b6dbfc] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              About
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="flex items-center group">
                    <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                      ›
                    </span>
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[#1f2937]">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className="space-y-4 w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#b6dbfc] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Services
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="flex items-center group">
                    <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                      ›
                    </span>
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[#1f2937]">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4 w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#b6dbfc] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Contact Us
            </h3>
            <ul className="space-y-2">
              {contactUsLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="flex items-center group">
                    <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                      ›
                    </span>
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        {item.name}
                      </span>
                      <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[#1f2937]">
                        {item.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-4 w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#b6dbfc] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Follow us on
            </h3>
            <div className="flex space-x-4 mb-6">
              {socialMedia.map(({ Icon, link, color }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  style={{
                    backgroundColor: 'white',
                    color: color,
                    boxShadow: '0 0 0 0 rgba(255,255,255,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.boxShadow = `0 0 0 8px rgba(255,255,255,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.boxShadow =
                      '0 0 0 0 rgba(255,255,255,0.7)';
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* Google Translate Section */}
            <div className="flex items-center mt-6">
              <img
                src="/google.png"
                alt="Google Translate"
                className="h-8 w-8 mr-2"
              />
              <GoogleTranslate />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#b6dbfc]/30 text-center">
          <p className="font-bold bg-gradient-to-r from-[#b6dbfc] to-[#b6dbfc] bg-clip-text text-transparent group-hover:from-[#133859] group-hover:to-[#b6dbfc] transition-all duration-300">
            DISCLAIMER
          </p>
          <p 
          className={`${
            dark === 'dark'
              ? 'text-gray-300 text-sm md:text-base mt-2'
              : 'text-gray-900 text-sm md:text-base mt-2'
          } `}>
            “The information provided on Med-Space is intended for general
            informational purposes only and should not be considered as medical
            advice, diagnosis, or treatment. Always seek the advice of a
            qualified healthcare provider for any medical condition or
            treatment. Med-Space facilitates OPD appointment booking and
            hospital data sharing, but it does not endorse or guarantee the
            quality of services provided by healthcare providers.”
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-[#b6dbfc]/30 text-center">
          <p className="flex items-center justify-center text-sm">
            <FaRegCopyright className="mx-1" /> {currentYear} All Rights
            Reserved
            <span className="font-bold ml-2 bg-[#b6dbfc] text-[#1f2937] px-2 py-1 rounded transition-all duration-300 hover:bg-[#1f2937] hover:text-[#b6dbfc]">
              Medi Connect
            </span>
          </p>
        </div>

        <div
          className={`fixed bottom-4 right-6 flex flex-col gap-3 duration-300 delay-300 ${!showScrollTop && 'translate-y-[75px]'}`}
        >
          <Chatbot isOpen={isOpen} setIsOpen={setIsOpen} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 hover:shadow-inner:bg-blue-500 text-white p-3 rounded-full shadow-lg  transition-colors"
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </button>
          <button
            onClick={scrollToTop}
            className={` bg-blue-600 hover:shadow-inner:bg-blue-500 text-white p-3 md:p-4 rounded-full z-[1000] transition-all ${!showScrollTop && 'opacity-0 invisible'}`}
          >
            <FaArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer >
  );
};

export default Footer;  
