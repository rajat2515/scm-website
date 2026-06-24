import React from 'react';
import { Link } from 'react-router-dom';
import './AdmissionsCTA.css';

const AdmissionsCTA: React.FC = () => {
  return (
    <section className="admissions-cta" id="admissions">
      <div className="container">
        <div className="admissions-content">
          <h5 data-animate="fade-up">ADMISSIONS 2026–27</h5>
          <h2 data-animate="fade-up" data-delay="1">Begin Your Child's Journey at S.C.M. Children Academy, Haldaur</h2>
          <div className="admissions-btns" data-animate="fade-up" data-delay="2">
            <Link to="/contact-us" className="btn btn-outline">REQUEST A VISIT</Link>
            <Link to="/mandatory-disclosure" className="btn btn-outline">SCHOOL BROCHURE</Link>
            <Link to="/admission-process" className="btn btn-primary">APPLY NOW</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsCTA;
