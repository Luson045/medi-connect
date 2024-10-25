import React from 'react';
import './Pricing.css'; // Create a CSS file to style the pricing page

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
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>

        {/* Standard Plan */}
        <div className="pricing-card">
          <h2 className="plan-title">Standard</h2>
          <p className="plan-price">$19.99/month</p>
          <ul className="plan-features">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>

        
        <div className="pricing-card">
          <h2 className="plan-title">Premium</h2>
          <p className="plan-price">$29.99/month</p>
          <ul className="plan-features">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
            <li>Feature 5</li>
          </ul>
          <button className="plan-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
