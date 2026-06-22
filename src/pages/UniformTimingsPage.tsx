import React from 'react';
import PageHero from '../components/PageHero';
import { Shirt, Clock, Sun, Snowflake } from 'lucide-react';
import './UniformTimingsPage.css';

const UniformTimingsPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="School Uniform & Working Hours"
        subtitle="Guidelines for dress code and daily schedule"
        breadcrumb="Uniform & Timings"
      />

      <section className="uniform-section section-padding">
        <div className="container">
          <div className="uniform-grid">
            <div className="uniform-card" data-animate="fade-up">
              <div className="uniform-card__icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Shirt size={32} />
              </div>
              <h3>Boys Uniform</h3>
              <ul>
                <li>White shirt with school monogram</li>
                <li>Navy blue trousers</li>
                <li>School tie and belt</li>
                <li>Black shoes with white socks</li>
                <li>School blazer (winter)</li>
              </ul>
            </div>

            <div className="uniform-card" data-animate="fade-up" data-delay="1">
              <div className="uniform-card__icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                <Shirt size={32} />
              </div>
              <h3>Girls Uniform</h3>
              <ul>
                <li>White shirt with school monogram</li>
                <li>Navy blue skirt / salwar</li>
                <li>School tie and belt</li>
                <li>Black shoes with white socks</li>
                <li>School blazer (winter)</li>
              </ul>
            </div>

            <div className="uniform-card" data-animate="fade-up" data-delay="2">
              <div className="uniform-card__icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Sun size={32} />
              </div>
              <h3>Summer Timings</h3>
              <div className="timing-table">
                <div className="timing-row">
                  <span>School Opens</span>
                  <strong>7:30 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Assembly</span>
                  <strong>7:45 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Classes Begin</span>
                  <strong>8:00 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Dispersal</span>
                  <strong>2:00 PM</strong>
                </div>
              </div>
            </div>

            <div className="uniform-card" data-animate="fade-up" data-delay="3">
              <div className="uniform-card__icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Snowflake size={32} />
              </div>
              <h3>Winter Timings</h3>
              <div className="timing-table">
                <div className="timing-row">
                  <span>School Opens</span>
                  <strong>8:30 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Assembly</span>
                  <strong>8:45 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Classes Begin</span>
                  <strong>9:00 AM</strong>
                </div>
                <div className="timing-row">
                  <span>Dispersal</span>
                  <strong>2:30 PM</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="uniform-note" data-animate="fade-up">
            <Clock size={20} />
            <p>Office hours for form collection and enquiries: <strong>8:00 AM to 2:00 PM</strong></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniformTimingsPage;
