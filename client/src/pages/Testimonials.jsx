import React from 'react';

const Testimonials = () => {
  return (
    <div>
      <header>
        <h1>Testimonials & Reviews</h1>
        <p className="subtitle">Enhancing Healthcare Delivery with Medi-Connect</p>
      </header>
      <div className="container">
        <section className="stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Hospitals Onboarded</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100k+</div>
            <div className="stat-label">Patients Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.8</div>
            <div className="stat-label">User Rating</div>
          </div>
        </section>

        <h2>What Our Users Are Saying</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3>Dr. Suresh Sharma</h3>
            <div className="rating">★★★★★</div>
            <p>
              "Medi-Connect has revolutionized the way we manage our OPD operations. The queue management system has significantly reduced patient wait times and improved overall efficiency."
            </p>
          </div>
          <div className="testimonial">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3>Nurse Anjali Kapoor</h3>
            <div className="rating">★★★★☆</div>
            <p>
              "The bed availability tracking and emergency allocation features have been a game-changer for us. We can now respond to critical situations much more efficiently."
            </p>
          </div>
          <div className="testimonial">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3>Patient Reena Gupta</h3>
            <div className="rating">★★★★★</div>
            <p>
              "As a patient, I've found Medi-Connect to be incredibly user-friendly. The online appointment booking and real-time queue updates have made my hospital visits much more convenient."
            </p>
          </div>
        </div>

        <div className="cta">
          <h2>Experience the Difference with Medi-Connect</h2>
          <p>Streamline your hospital operations and improve patient care today.</p>
          <a href="/pages/medi-connect" className="cta-button">
            Learn More ➡
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;