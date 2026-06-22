import React from 'react';
import PageHero from '../components/PageHero';
import { Camera, Calendar } from 'lucide-react';
import './EventGalleryPage.css';

const placeholderEvents = [
  { title: 'Annual Day Celebration', date: '2025', category: 'Cultural' },
  { title: 'Sports Day', date: '2025', category: 'Sports' },
  { title: 'Independence Day', date: '2025', category: 'National' },
  { title: 'Republic Day', date: '2025', category: 'National' },
  { title: 'Science Exhibition', date: '2025', category: 'Academic' },
  { title: 'Art & Craft Fair', date: '2025', category: 'Creative' },
];

const EventGalleryPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Event Gallery"
        subtitle="Celebrating milestones and memories"
        breadcrumb="Event Gallery"
      />

      <section className="events-section section-padding">
        <div className="container">
          <div className="events-intro" data-animate="fade-up">
            <Camera size={32} className="events-intro-icon" />
            <h2>School <span className="highlight-text">Events & Activities</span></h2>
            <p>From annual celebrations to academic exhibitions, our students participate in a wide range of events that foster creativity, teamwork, and leadership.</p>
          </div>

          <div className="events-grid">
            {placeholderEvents.map((event, index) => (
              <div
                className="event-card"
                key={index}
                data-animate="fade-up"
                data-delay={String(Math.min(index + 1, 5))}
              >
                <div className="event-card__image">
                  <div className="event-card__placeholder">
                    <Camera size={40} />
                  </div>
                  <span className="event-card__badge">{event.category}</span>
                </div>
                <div className="event-card__content">
                  <h3>{event.title}</h3>
                  <span className="event-card__date"><Calendar size={14} /> {event.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="events-note" data-animate="fade-up">
            <p>More event photos and videos coming soon. Stay tuned!</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventGalleryPage;
