import React from 'react';
import './AboutSection.css';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-left">
          <div className="about-image" data-animate="fade-up">
            <img src="/school-campus.png" alt="SCM Children Academy Campus" />
          </div>
          <div className="about-caption" data-animate="fade-up" data-delay="2">
            <h6>ABOUT US</h6>
            <h2>Founded in Memory of Late Shree Chandra Sen</h2>
            <p>
              Recognized as a top CBSE school in Haldaur, Bijnor, S.C.M. Children Academy
              was founded in July 2012 by the Shree Chandra Sen Family. Situated at Nehtaur Tiraha, 
              our vision is to provide world-class education to the local community. We groom students 
              from Nursery to Class X to become confident, value-driven leaders of tomorrow.
            </p>
            <Link to="/introduction" className="btn btn-primary">Discover More</Link>
          </div>
        </div>

        <div className="about-right">
          <div className="stats-container">
            <div className="stat-box" data-animate="scale-in" data-delay="1">
              <h4>1000+</h4>
              <p>Students</p>
            </div>
            <div className="stat-box" data-animate="scale-in" data-delay="2">
              <h4>2012</h4>
              <p>Year Founded</p>
            </div>
            <div className="stat-box" data-animate="scale-in" data-delay="3">
              <h4>CBSE</h4>
              <p>Affiliated Board</p>
            </div>
            <div className="stat-box" data-animate="scale-in" data-delay="4">
              <h4>Nur – X</h4>
              <p>Grade Range</p>
            </div>
          </div>

          <div className="vision-box" data-animate="fade-up" data-delay="3">
            <h6>OUR VISION</h6>
            <p>
              To provide every child with firm, broad foundations of knowledge and character —
              fostering a love of learning, a desire for excellence, and the intellectual
              skills needed to meet the challenges of tomorrow's world.
            </p>
          </div>

          <div className="founder-box" data-animate="fade-up" data-delay="4">
            <div className="founder-caption">
              <h6>MANAGEMENT MESSAGE</h6>
              <Link to="/managements-desk" className="founder-video-link">
                → Management Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

