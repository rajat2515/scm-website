import React from 'react';
import './AdmissionsCTA.css';

const AdmissionsCTA: React.FC = () => {
  return (
    <section className="admissions-cta" id="admissions">
      <div className="container">
        <div className="admissions-content">
          <h5 data-animate="fade-up">ADMISSIONS</h5>
          <h2 data-animate="fade-up" data-delay="1">Start a Wonderful Journey</h2>
          <div className="admissions-btns" data-animate="fade-up" data-delay="2">
            <a href="#contact" className="btn btn-outline">REQUEST A VISIT</a>
            <a href="#brochure" className="btn btn-outline">BROCHURE</a>
            <a href="#apply" className="btn btn-primary">APPLY</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsCTA;
