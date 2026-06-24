import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { FileCheck, Download, Search, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './TransferCertificatePage.css';

interface TCData {
  id: string;
  year: string;
  url: string;
}

const TransferCertificatePage: React.FC = () => {
  const [tcs, setTcs] = useState<TCData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTCs = async () => {
      try {
        const q = query(collection(db, 'tcs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedTCs: TCData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTCs.push({ id: doc.id, ...doc.data() } as TCData);
        });
        setTcs(fetchedTCs);
      } catch (error) {
        console.error("Error fetching TCs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTCs();
  }, []);

  return (
    <>
      <PageHero
        title="Transfer Certificate"
        subtitle="Download and verify school-issued Transfer Certificates"
        breadcrumb="Transfer Certificate"
      />

      <section className="tc-section section-padding">
        <div className="container">
          <div className="tc-intro" data-animate="fade-up">
            <Search size={32} className="tc-intro-icon" />
            <h2>Transfer <span className="highlight-text">Certificate Lookup</span></h2>
            <p>Please check the school-issued Transfer Certificates below. Contact the school office for any queries regarding your TC.</p>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : tcs.length === 0 ? (
             <div className="tc-list" data-animate="fade-up" data-delay="1">
              <div className="tc-card" style={{ display: 'block', textAlign: 'center' }}>
                <p>No Transfer Certificates have been uploaded yet.</p>
              </div>
            </div>
          ) : (
            <div className="tc-list" data-animate="fade-up" data-delay="1">
              {tcs.map(tc => (
                <div className="tc-card" key={tc.id} style={{ marginBottom: '1rem' }}>
                  <div className="tc-card__icon">
                    <FileCheck size={24} />
                  </div>
                  <div className="tc-card__info">
                    <h3>Transfer Certificate</h3>
                    <p>Academic Year: <strong>{tc.year}</strong></p>
                  </div>
                  <a
                    href={tc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline tc-download-btn"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="tc-contact" data-animate="fade-up" data-delay="2">
            <h3>Need Your Transfer Certificate?</h3>
            <p>If your TC is not listed above, please contact the school office:</p>
            <div className="tc-contact-info">
              <a href="tel:7078804892" className="btn btn-primary">📞 Call: 7078804892</a>
              <a href="tel:9319787083" className="btn btn-outline">📞 Call: 9319787083</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TransferCertificatePage;
