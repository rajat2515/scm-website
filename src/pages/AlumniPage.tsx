import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { GraduationCap, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AlumniPage.css';

interface AlumniData {
  id: string;
  name: string;
  work: string;
  message: string;
  year: string;
  imageUrl: string;
}

const AlumniPage: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const q = query(collection(db, 'alumni'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedAlumni: AlumniData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedAlumni.push({ id: doc.id, ...doc.data() } as AlumniData);
        });
        setAlumni(fetchedAlumni);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlumni();
  }, []);

  return (
    <>
      <PageHero
        title="Our Alumni"
        subtitle="Legacy of excellence and proud ambassadors"
        breadcrumb="Alumni"
      />

      <section className="alumni-section section-padding">
        <div className="container">
          <div className="alumni-intro" data-animate="fade-up" style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(30, 64, 175, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
                <GraduationCap size={40} />
              </div>
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Proud <span className="highlight-text">Alumni Network</span></h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', lineHeight: 1.6 }}>Our former students are making their mark across the globe in various fields. Discover the inspiring journeys of those who once walked these halls.</p>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : alumni.length === 0 ? (
            <div className="events-note" data-animate="fade-up" style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p>Alumni profiles will be updated here soon.</p>
            </div>
          ) : (
            <div className="alumni-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {alumni.map((al, idx) => (
                <div 
                  className="alumni-card glass-panel" 
                  key={al.id} 
                  data-animate="fade-up" 
                  data-delay={String(Math.min(idx + 1, 5))} 
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(10, 25, 47, 0.04)', cursor: 'pointer' }}
                  onClick={() => { if (al.imageUrl) setSelectedImage(al.imageUrl) }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                      <img src={al.imageUrl} alt={al.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-dark)', fontSize: '1.25rem' }}>{al.name}</h3>
                      <p style={{ margin: '0 0 0.25rem 0', color: 'var(--secondary-color)', fontWeight: 600, fontSize: '0.95rem' }}>{al.work}</p>
                      <span style={{ display: 'inline-block', background: 'rgba(10,25,47,0.05)', color: 'var(--primary-color)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Batch of {al.year}</span>
                    </div>
                  </div>
                  <div style={{ position: 'relative', marginTop: 'auto', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', flexGrow: 1 }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '20px', fontSize: '3rem', color: 'rgba(230,57,70,0.2)', lineHeight: 1, fontFamily: 'serif' }}>"</span>
                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-body)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{al.message}</p>
                  </div>
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

export default AlumniPage;
