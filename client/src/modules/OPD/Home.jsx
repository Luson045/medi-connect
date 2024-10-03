import React, { useState, useEffect } from 'react';
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
          <Link to="/registerOPD" className="hero-button">Instant OPD</Link>
        </div>
      </section>
    <Navbar/>
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Online OPD Registration</h1>
          <p>Skip the queue and get the care you need faster.</p>
          <Link to="/registerOPD" className="hero-button">Instant OPD</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Easy Registration</h3>
            <p>Register for your OPD appointment quickly and easily.</p>
      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Easy Registration</h3>
            <p>Register for your OPD appointment quickly and easily.</p>
          </div>
          <div className="card">
            <h3>Medical Resource Data Sharing</h3>
            <p>Stay upto-date with the latest data of equipments prensent in the hospital.</p>
          <div className="card">
            <h3>Medical Resource Data Sharing</h3>
            <p>Stay upto-date with the latest data of equipments prensent in the hospital.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We are here to assist you any time of the day.</p>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We are here to assist you any time of the day.</p>
          </div>
        </div>
        
      </section>
      <div>
      <h2>Research and Data</h2>
      <center><img className="data" src="data1.jpg"></img></center>
      <StaticLineChart/>
      <center><img className="data" src="data2.jpg"></img></center>
      <center><img className="data" src="data3.jpg"></img></center>
      </div>
      <section className="reviews-section">
        <h2>What Our Patients will Say</h2>
        <div className="reviews">
          <div className="review">
            <p>"The online registration process was so easy and convenient. I didn't have to wait in line at all!"</p>
            <span>-John Does</span>
          </div>
          <div className="review">
            <p>"lorem ipsum dolar sit"</p>
            <span>-Jane Smith</span>
          </div>
          <div className="review">
            <p>"lorem ipsum dolar sit"</p>
            <span>-Harsh</span>
          </div>
        </div>
      </section>
    </div>
        </div>
        
      </section>
      <div>
      <h2>Research and Data</h2>
      <center><img className="data" src="data1.jpg"></img></center>
      <StaticLineChart/>
      <center><img className="data" src="data2.jpg"></img></center>
      <center><img className="data" src="data3.jpg"></img></center>
      </div>
      <section className="reviews-section">
        <h2>What Our Patients will Say</h2>
        <div className="reviews">
          <div className="review">
            <p>"The online registration process was so easy and convenient. I didn't have to wait in line at all!"</p>
            <span>-John Does</span>
          </div>
          <div className="review">
            <p>"lorem ipsum dolar sit"</p>
            <span>-Jane Smith</span>
          </div>
          <div className="review">
            <p>"lorem ipsum dolar sit"</p>
            <span>-Harsh</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Home;
