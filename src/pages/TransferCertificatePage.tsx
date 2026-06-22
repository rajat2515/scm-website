import React from 'react';
import PageHero from '../components/PageHero';
import { FileCheck, Download, Search } from 'lucide-react';
import './TransferCertificatePage.css';

const TransferCertificatePage: React.FC = () => {
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
            <p>Please check the school-issued Transfer Certificate below. Contact the school office for any queries regarding your TC.</p>
          </div>

          <div className="tc-list" data-animate="fade-up" data-delay="1">
            <div className="tc-card">
              <div className="tc-card__icon">
                <FileCheck size={24} />
              </div>
              <div className="tc-card__info">
                <h3>Transfer Certificate</h3>
                <p>Student TC document</p>
              </div>
              <a
                href="https://scmchildrenacademy.com/wp-content/uploads/0460.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline tc-download-btn"
              >
                <Download size={16} /> Download
              </a>
            </div>
          </div>

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
