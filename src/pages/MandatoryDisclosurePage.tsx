import React from 'react';
import PageHero from '../components/PageHero';
import { FileText, Download } from 'lucide-react';
import './MandatoryDisclosurePage.css';

const documents = [
  { title: 'Mandatory Public Disclosure', url: 'https://scmchildrenacademy.com/wp-content/uploads/Mandatory-Disclosure.pdf' },
  { title: 'Copy of CBSE Affiliation / Up-Gradation / Recent Extension Letter', url: 'https://scmchildrenacademy.com/wp-content/uploads/Affiliation.pdf' },
  { title: 'Copy of Society / Trust / Company Registration / Renewal', url: 'https://scmchildrenacademy.com/wp-content/uploads/Society-Registration.pdf' },
  { title: 'Copy of No-Objection-Certificate (NOC) by State Government / UT', url: 'https://scmchildrenacademy.com/wp-content/uploads/NOC.pdf' },
  { title: 'Copy of Recognition Certificate Under RTE Act 2009 / Renewal', url: 'https://scmchildrenacademy.com/wp-content/uploads/Recognition.pdf' },
  { title: 'Copy of Building Safety Certificate as per National Building Code', url: 'https://scmchildrenacademy.com/wp-content/uploads/Building-Safety.pdf' },
  { title: 'Copy of Fire Safety Certificate', url: 'https://scmchildrenacademy.com/wp-content/uploads/Fire-Safety.pdf' },
  { title: 'Copy of DEO Certificate / Self Certification by School', url: 'https://scmchildrenacademy.com/wp-content/uploads/Self-Certification.pdf' },
  { title: 'Copy of Water, Health and Sanitation Certificate', url: 'https://scmchildrenacademy.com/wp-content/uploads/Sanitation-Certificate.pdf' },
  { title: 'School Fees Structure', url: 'https://scmchildrenacademy.com/wp-content/uploads/Fees-Structure.pdf' },
  { title: 'Annual Academic Calendar', url: 'https://scmchildrenacademy.com/wp-content/uploads/School-Calendar.pdf' },
  { title: 'School Management Committee (SMC)', url: 'https://scmchildrenacademy.com/wp-content/uploads/smc.pdf' },
  { title: 'Parent Teacher Association (PTA) of School', url: 'https://scmchildrenacademy.com/wp-content/uploads/PTA.pdf' },
];

const MandatoryDisclosurePage: React.FC = () => {
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
                target="_blank"
                rel="noopener noreferrer"
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
