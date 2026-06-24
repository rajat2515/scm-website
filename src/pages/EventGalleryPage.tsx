import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { Camera, Calendar, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './EventGalleryPage.css';

interface EventData {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

const EventGalleryPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedEvents: EventData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push({ id: doc.id, ...doc.data() } as EventData);
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

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

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : events.length === 0 ? (
            <div className="events-note" data-animate="fade-up" style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p>No events have been uploaded yet. Please check back later!</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event, index) => (
                <div
                  className="event-card"
                  key={event.id}
                  data-animate="fade-up"
                  data-delay={String(Math.min(index + 1, 5))}
                >
                  <div className="event-card__image">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="event-card__placeholder">
                        <Camera size={40} />
                      </div>
                    )}
                    <span className="event-card__badge">{event.category}</span>
                  </div>
                  <div className="event-card__content">
                    <h3>{event.title}</h3>
                    <span className="event-card__date"><Calendar size={14} /> {event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="events-note" data-animate="fade-up">
            <p>More event photos and videos coming soon. Stay tuned!</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventGalleryPage;
