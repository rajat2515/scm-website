import React from 'react';
import PageHero from '../components/PageHero';
import { BarChart3 } from 'lucide-react';
import './ResultsPage.css';

const ResultsPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Results"
        subtitle="Academic performance and board examination results"
        breadcrumb="Results"
      />

      <section className="results-section section-padding">
        <div className="container">
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
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
