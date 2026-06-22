import React from 'react';
import PageHero from '../components/PageHero';
import { Award, Star } from 'lucide-react';
import './AchieversPage.css';

const AchieversPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Our Achievers"
        subtitle="Celebrating excellence and outstanding accomplishments"
        breadcrumb="Achievers"
      />

      <section className="achievers-section section-padding">
        <div className="container">
          <div className="achievers-intro" data-animate="fade-up">
            <Award size={40} className="achievers-icon" />
            <h2>Stars of <span className="highlight-text">SCM Children Academy</span></h2>
            <p>Our students consistently demonstrate excellence in academics, sports, and co-curricular activities. Here we celebrate their remarkable achievements.</p>
          </div>

          <div className="achievers-coming-soon" data-animate="scale-in">
            <div className="achievers-cs-card">
              <div className="achievers-cs-stars">
                <Star size={24} />
                <Star size={32} />
                <Star size={24} />
              </div>
              <h3>Achievers Gallery Coming Soon</h3>
              <p>We are curating our students' achievements and success stories. Check back soon to see our shining stars!</p>
              <div className="achievers-cs-dots">
                <span className="dot dot--1" />
                <span className="dot dot--2" />
                <span className="dot dot--3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AchieversPage;
