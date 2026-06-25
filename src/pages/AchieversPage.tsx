import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { Award, Star, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AchieversPage.css';

interface AchieverData {
  id: string;
  name: string;
  message: string;
  imageUrl: string;
}

const AchieversPage: React.FC = () => {
  const [achievers, setAchievers] = useState<AchieverData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const q = query(collection(db, 'achievers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedAchievers: AchieverData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedAchievers.push({ id: doc.id, ...doc.data() } as AchieverData);
        });
        setAchievers(fetchedAchievers);
      } catch (error) {
        console.error("Error fetching achievers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAchievers();
  }, []);

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

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : achievers.length === 0 ? (
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
          ) : (
            <div className="achievers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {achievers.map((ach, idx) => (
                <div 
                  className="achiever-card glass-panel" 
                  key={ach.id} 
                  data-animate="fade-up" 
                  data-delay={String(Math.min(idx + 1, 5))} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1.5rem', cursor: 'pointer' }}
                  onClick={() => { if (ach.imageUrl) setSelectedImage(ach.imageUrl) }}
                >
                  <div className="achiever-photo-wrap" style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--secondary-color)', marginBottom: '1.5rem', boxShadow: '0 10px 25px rgba(230, 57, 70, 0.2)' }}>
                    <img src={ach.imageUrl} alt={ach.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{ach.name}</h3>
                  <div style={{ width: '40px', height: '3px', background: 'var(--secondary-color)', margin: '0 auto 1rem auto', borderRadius: '2px' }}></div>
                  <p style={{ color: 'var(--text-body)', fontStyle: 'italic', lineHeight: 1.6 }}>"{ach.message}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Full view" 
            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} 
            onClick={e => e.stopPropagation()} 
          />
          <button 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default AchieversPage;
