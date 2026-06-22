import React from 'react';
import PageHero from '../components/PageHero';
import { Quote } from 'lucide-react';
import './ManagementDeskPage.css';

const ManagementDeskPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Management's Desk"
        subtitle="Leadership with vision and dedication"
        breadcrumb="Management's Desk"
      />

      <section className="mgmt-section section-padding">
        <div className="container">
          <div className="mgmt-card" data-animate="fade-up">
            <div className="mgmt-card__header">
              <div className="mgmt-avatar">
                <div className="mgmt-avatar__placeholder">RA</div>
              </div>
              <div className="mgmt-info">
                <h3>Ruchi Agarwal</h3>
                <span className="mgmt-role">Principal, SCM Children Academy</span>
              </div>
            </div>

            <blockquote className="mgmt-quote" data-animate="fade-up" data-delay="1">
              <Quote size={32} className="mgmt-quote-icon" />
              <p>"The future belongs to those who believe in the beauty of their dreams."</p>
              <cite>— Eleanor Roosevelt</cite>
            </blockquote>

            <div className="mgmt-message" data-animate="fade-up" data-delay="2">
              <h4>Principal's Message</h4>
              <p>
                I have always believed that the purpose of education is not just about gaining 
                knowledge but more in its application; turning it into a process that generates 
                an action, worthy of making a positive difference… in your own life, in somebody 
                else's life or the community.
              </p>
              <p>
                With the inspiration, encouragement and blessings of the honorable management, 
                constant cooperation and coordination of a hard-working group of extremely dedicated 
                teachers and the constant support and advice from a warm and friendly set of parents 
                I move ahead with zeal and enthusiasm to bring up the school to a niche as I know 
                that sky is the only limit and I chase perfection to catch excellence in every sphere 
                and I sail the ship to always reach the proper destination even if the weather is inclement.
              </p>
              <p className="mgmt-sign-off">With Warm Greetings</p>
              <p className="mgmt-signature">
                <strong>Ruchi Agarwal</strong>
                <br />
                <span>SCM Children Academy</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagementDeskPage;
