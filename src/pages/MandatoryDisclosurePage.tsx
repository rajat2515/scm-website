import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { FileText, Download } from 'lucide-react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './MandatoryDisclosurePage.css';

const defaultDocuments = [
  { title: 'Copy of CBSE Affiliation / Up-Gradation / Recent Extension Letter', url: 'https://scmchildrenacademy.com/wp-content/uploads/Affiliation.pdf', id: 'affiliation' },
  { title: 'Copy of Society / Trust / Company Registration / Renewal', url: 'https://scmchildrenacademy.com/wp-content/uploads/Society-Registration.pdf', id: 'society' },
  { title: 'Copy of No-Objection-Certificate (NOC) by State Government / UT', url: 'https://scmchildrenacademy.com/wp-content/uploads/NOC.pdf', id: 'noc' },
  { title: 'Copy of Recognition Certificate Under RTE Act 2009 / Renewal', url: 'https://scmchildrenacademy.com/wp-content/uploads/Recognition.pdf', id: 'recognition' },
  { title: 'Copy of Building Safety Certificate as per National Building Code', url: 'https://scmchildrenacademy.com/wp-content/uploads/Building-Safety.pdf', id: 'building' },
  { title: 'Copy of Fire Safety Certificate', url: 'https://scmchildrenacademy.com/wp-content/uploads/Fire-Safety.pdf', id: 'fire' },
  { title: 'Copy of DEO Certificate / Self Certification by School', url: 'https://scmchildrenacademy.com/wp-content/uploads/Self-Certification.pdf', id: 'deo' },
  { title: 'Copy of Water, Health and Sanitation Certificate', url: 'https://scmchildrenacademy.com/wp-content/uploads/Sanitation-Certificate.pdf', id: 'sanitation' },
  { title: 'School Fees Structure', url: 'https://scmchildrenacademy.com/wp-content/uploads/Fees-Structure.pdf', id: 'fees_structure' },
  { title: 'Annual Academic Calendar', url: 'https://scmchildrenacademy.com/wp-content/uploads/School-Calendar.pdf', id: 'calendar' },
  { title: 'School Management Committee (SMC)', url: 'https://scmchildrenacademy.com/wp-content/uploads/smc.pdf', id: 'smc' },
  { title: 'Parent Teacher Association (PTA) of School', url: 'https://scmchildrenacademy.com/wp-content/uploads/PTA.pdf', id: 'pta' },
  { title: 'CBSE BOARD RESULT OF LAST 3-YEARS', url: '#', id: 'cbse_results_3_years' },
];

const MandatoryDisclosurePage: React.FC = () => {
  const [documents, setDocuments] = useState(defaultDocuments);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'mandatory_disclosure');
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocuments(prev => prev.map(doc => {
          if (data[doc.id]) {
            return { ...doc, url: data[doc.id] };
          }
          return doc;
        }));
      }
    }, (error) => {
      console.error("Error fetching mandatory disclosure settings:", error);
    });

    return () => unsub();
  }, []);

  return (
    <>
      <PageHero
        title="Mandatory Public Disclosure"
        subtitle="Documents as required by CBSE for public access"
        breadcrumb="Mandatory Disclosure"
      />

      <section className="disclosure-section section-padding">
        <div className="container">
          <div className="disclosure-grid">
            {documents.map((doc, index) => (
              <a
                className="disclosure-card"
                key={index}
                href={doc.url}
                target={doc.url === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (doc.url === '#') {
                    e.preventDefault();
                    alert('This document has not been uploaded yet.');
                  }
                }}
                data-animate="fade-up"
                data-delay={String(Math.min(index + 1, 5))}
              >
                <div className="disclosure-card__icon">
                  <FileText size={28} />
                </div>
                <h3>{doc.title}</h3>
                <span className="disclosure-card__download">
                  <Download size={16} /> Download PDF
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MandatoryDisclosurePage;
