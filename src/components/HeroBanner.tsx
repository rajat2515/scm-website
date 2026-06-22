import React from 'react';
import './HeroBanner.css';

const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
          alt="School Campus" 
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          Building Foundations <br />
          for <span className="highlight">Lifelong Success</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroBanner;
