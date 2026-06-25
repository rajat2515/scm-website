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
  imageUrl?: string;
  images?: { url: string; path: string; }[];
}

const EventGalleryPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category))).filter(Boolean)];
  const filteredEvents = selectedCategory === 'All' ? events : events.filter(e => e.category === selectedCategory);

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

          {!loading && events.length > 0 && (
            <div className="gallery-filters" data-animate="fade-up">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="events-note" data-animate="fade-up" style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p>No events found for this category.</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <div
                  className="event-card"
                  key={event.id}
                  data-animate="fade-up"
                  data-delay={String(Math.min(index + 1, 5))}
                  onClick={() => setSelectedEvent(event)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="event-card__image">
                    {event.images && event.images.length > 0 ? (
                      <>
                        <img src={event.images[0].url} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {event.images.length > 1 && (
                          <div className="event-card__image-count">
                            +{event.images.length - 1} photos
                          </div>
                        )}
                      </>
                    ) : event.imageUrl ? (
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

      {selectedEvent && (
        <div className="gallery-modal" onClick={() => setSelectedEvent(null)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedEvent(null)}>×</button>
            <div className="gallery-modal-header">
              <h3>{selectedEvent.title}</h3>
              <span>{selectedEvent.date}</span>
            </div>
            <div className="gallery-modal-images">
              {selectedEvent.images && selectedEvent.images.length > 0 ? (
                selectedEvent.images.map((img, idx) => (
                  <img key={idx} src={img.url} alt={`${selectedEvent.title} - ${idx + 1}`} />
                ))
              ) : selectedEvent.imageUrl ? (
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center' }}>No images available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventGalleryPage;
