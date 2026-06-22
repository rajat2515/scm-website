import React from 'react';
import './AboutSection.css';
import { PlayCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-left">
          <div className="about-image" data-animate="fade-up">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" alt="Students" />
          </div>
          <div className="about-caption" data-animate="fade-up" data-delay="2">
            <h6>ABOUT US</h6>
            <h2>Cornerstones of Innovation and Growth</h2>
            <p>Welcome to S.C.M. Children Academy, a place where learners are groomed into being future pioneers from a tender age.</p>
            <a href="#more" className="btn btn-primary">Discover More</a>
          </div>
        </div>

        <div className="about-right">
          <div className="stats-container">
            <div className="stat-box" data-animate="scale-in" data-delay="1">
              <h4>2000+</h4>
              <p>students</p>
            </div>
            <div className="stat-box" data-animate="scale-in" data-delay="2">
              <h4>30+</h4>
              <p>Smart Classrooms</p>
            </div>
          </div>

          <div className="vision-box" data-animate="fade-up" data-delay="3">
            <h6>OUR VISION</h6>
            <p>Our vision is aligned with the emerging trends in the society, in global economy and environment.</p>
          </div>

          <div className="founder-box" data-animate="fade-up" data-delay="4">
            <div className="founder-img">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" alt="Founder" />
            </div>
            <div className="founder-caption">
              <h6>MANAGEMENT MESSAGE</h6>
              <a href="#video" className="founder-video-link">
                <PlayCircle size={20} /> Management Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
