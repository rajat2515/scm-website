import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { BarChart3, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './ResultsPage.css';

interface ResultData {
  id: string;
  year: string;
  title: string;
  imageUrl: string;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(collection(db, 'results'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedResults: ResultData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedResults.push({ id: doc.id, ...doc.data() } as ResultData);
        });
        setResults(fetchedResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, []);

  return (
    <>
      <PageHero
        title="Results"
        subtitle="Academic performance and board examination results"
        breadcrumb="Results"
      />

      <section className="results-section section-padding">
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <Loader2 size={40} className="spinning" style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : results.length === 0 ? (
            <div className="results-coming-soon" data-animate="scale-in">
              <div className="results-cs-card">
                <div className="results-cs-icon">
                  <BarChart3 size={48} />
                </div>
                <h2>Results Coming Soon</h2>
                <p>Board examination results and academic performance data will be published here. Please check back shortly.</p>
                <div className="results-cs-loader">
                  <div className="results-bar results-bar--1" />
                  <div className="results-bar results-bar--2" />
                  <div className="results-bar results-bar--3" />
                  <div className="results-bar results-bar--4" />
                  <div className="results-bar results-bar--5" />
                </div>
              </div>
            </div>
          ) : (
            <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {results.map((result, index) => (
                <div
                  className="event-card"
                  key={result.id}
                  data-animate="fade-up"
                  data-delay={String(Math.min(index + 1, 5))}
                  style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    {result.imageUrl ? (
                      <img src={result.imageUrl} alt={result.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BarChart3 size={40} style={{ color: 'var(--secondary-color)', opacity: 0.5 }} />
                      </div>
                    )}
                    <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--secondary-color)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {result.year}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{result.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
