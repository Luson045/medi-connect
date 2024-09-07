import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';
import Navbar from '../common/Navbar';
import StaticLineChart from './Chart';

function Home() {
  return (
    
    <>
    <Navbar/>
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Online OPD Registration</h1>
          <p>Skip the queue and get the care you need faster.</p>
          <Link to="/registerOPD" className="hero-button">Register Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Easy Registration</h3>
            <p>Register for your OPD appointment quickly and easily.</p>
          </div>
          <div className="card">
            <h3>Experienced Doctors</h3>
            <p>Get care from our team of experienced medical professionals.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We are here to assist you any time of the day.</p>
          </div>
        </div>
        
      </section>
      <StaticLineChart/>
      
      <section className="reviews-section">
        <h2>What Our Patients will Say</h2>
        <div className="reviews">
          <div className="review">
            <p>"The online registration process was so easy and convenient. I didn't have to wait in line at all!"</p>
            <span>- John Does</span>
          </div>
          <div className="review">
            <p>"Great service and experienced doctors. Highly recommend!"</p>
            <span>- Jane Smith</span>
          </div>
          <div className="review">
            <p>"24/7 support is a life saver. I was able to get help when I needed it most."</p>
            <span>- Michael Lee</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Home;
