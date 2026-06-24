import React, { useState, useEffect } from 'react';
import { X, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AnnouncementModal.css';

interface AnnouncementData {
  id: string;
  text: string;
  order: number;
  imageUrl?: string;
}

const AnnouncementModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(
          collection(db, 'announcements'),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetched: AnnouncementData[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as AnnouncementData);
        });
        
        if (fetched.length > 0) {
          // Create a composite key to track seen state for this set of announcements
          const idsKey = fetched.map(a => a.id).join('-');
          const lastSeenKey = sessionStorage.getItem('announcementSeenKey');
          
          if (lastSeenKey !== idsKey) {
            setAnnouncements(fetched);
            // Slight delay for better UX
            setTimeout(() => setIsOpen(true), 1500);
            sessionStorage.setItem('announcementSeenKey', idsKey);
          }
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  if (!isOpen || announcements.length === 0) return null;

  const currentAnn = announcements[currentIndex];

  return (
    <div className="announcement-overlay">
      <div className="announcement-modal glass-panel" data-animate="scale-in">
        <button className="announcement-close" onClick={handleClose}>
          <X size={20} />
        </button>

        {currentAnn.imageUrl && (
          <img src={currentAnn.imageUrl} alt="Announcement" className="announcement-image" />
        )}

        <div className="announcement-body">
          <div className="announcement-header">
            <div className="announcement-icon-wrapper">
              <Bell size={24} className="announcement-icon ringing" />
            </div>
            <h3>Important Update</h3>
          </div>
          
          <div className="announcement-content">
            <p>{currentAnn.text}</p>
          </div>

          <div className="announcement-footer">
            {announcements.length > 1 && (
              <div className="announcement-slider-controls">
                <button className="slider-btn" onClick={prevSlide} aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <div className="slider-dots">
                  {announcements.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
                <button className="slider-btn" onClick={nextSlide} aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            <button className="btn btn-primary announcement-btn" onClick={handleClose}>
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
