import React from 'react';
import './HeroBanner.css';

const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-background">
        <img 
          src="/school-campus.png" 
          alt="School Campus" 
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text-wrapper">
          <div className="hero-accent-line"></div>
          <h1 className="hero-title">
            Next Step to <br />
            <span className="highlight">Future</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
