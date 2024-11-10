import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Our Pricing Plans</h1>

      <div className="pricing-plans">
        {/* Basic Plan */}
        <div className="pricing-card">
          <h2 className="plan-title">Basic</h2>
          <p className="plan-price">$9.99/month</p>
          <ul className="plan-features">
            <li>Access to all basic features</li>
            <li>10 GB storage</li>
            <li>Email support</li>
            <li>Community access</li>
            <li>Basic analytics</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>

        {/* Standard Plan */}
        <div className="pricing-card">
          <h2 className="plan-title">Standard</h2>
          <p className="plan-price">$19.99/month</p>
          <ul className="plan-features">
            <li>Everything in Basic</li>
            <li>100 GB storage</li>
            <li>Priority email support</li>
            <li>Weekly progress reports</li>
            <li>Advanced analytics</li>
            <li>Custom branding options</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card">
          <h2 className="plan-title">Premium</h2>
          <p className="plan-price">$29.99/month</p>
          <ul className="plan-features">
            <li>Everything in Standard</li>
            <li>Unlimited storage</li>
            <li>24/7 phone support</li>
            <li>Monthly one-on-one consultations</li>
            <li>Advanced analytics and insights</li>
            <li>Dedicated account manager</li>
            <li>Access to beta features</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
