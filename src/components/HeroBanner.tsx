import React, { useState, useEffect } from 'react';
import './HeroBanner.css';

const heroImages = [
  '/school-campus.png',
  '/hero/hero-2.jpg',
  '/hero/hero-3.jpg',
  '/hero/hero-4.jpg',
  '/hero/hero-5.jpg',
  '/hero/hero-6.jpg',
  '/hero/hero-7.png',
  '/hero/hero-8.png',
  '/hero/hero-9.png',
  '/hero/hero-10.jpg',
  '/hero/hero-11.jpg'
];

const HeroBanner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-banner">
      <div className="hero-background">
        {heroImages.map((src, index) => (
          <img 
            key={src}
            src={src} 
            alt={`School Campus ${index + 1}`} 
            className={`hero-image-slide ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
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
