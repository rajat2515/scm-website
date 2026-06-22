import React from 'react';
import PageHero from '../components/PageHero';
import { FileText, Clock, Camera, CheckCircle, UserCheck, CreditCard, ClipboardList, Phone } from 'lucide-react';
import './AdmissionProcessPage.css';

const steps = [
  { icon: <FileText size={24} />, title: 'Collect the Form', desc: 'Form can be collected from School Reception or you can download from the Downloads page.' },
  { icon: <Clock size={24} />, title: 'Office Timings', desc: 'Timings to collect forms — 08:00 a.m. to 2:00 p.m.' },
  { icon: <UserCheck size={24} />, title: 'Age Eligibility', desc: 'The eligible age for Nursery admission is 3 years as of 31st March of the current session.' },
  { icon: <ClipboardList size={24} />, title: 'Birth Certificate', desc: 'The photocopy of the Birth Certificate issued by the Municipal Corporation or concerned civic authority must be attached along with the form.' },
  { icon: <Camera size={24} />, title: 'Photograph', desc: 'The photograph of the child must be pasted on the form.' },
  { icon: <CheckCircle size={24} />, title: 'Complete Registration', desc: 'Incomplete registration will not be processed.' },
  { icon: <Phone size={24} />, title: 'Verification', desc: 'On completion of the registration process, parents will be called for verification of documents within 7–10 working days.' },
  { icon: <CreditCard size={24} />, title: 'Fee Deposit', desc: 'Once the admission is confirmed, the fee must be deposited within the stipulated period.' },
];

const AdmissionProcessPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Admission Process"
        subtitle="Simple, transparent steps to join our learning community"
        breadcrumb="Admission Process"
      />

      <section className="admission-section section-padding">
        <div className="container">
          <div className="admission-intro" data-animate="fade-up">
            <span className="admission-label">ADMISSIONS OPEN</span>
            <h2>Admissions are open for classes <span className="highlight-text">Nursery – IX</span> for session 2026–27</h2>
          </div>

          <div className="admission-timeline">
            {steps.map((step, index) => (
              <div
                className="timeline-step"
                key={index}
                data-animate="fade-up"
                data-delay={String(Math.min(index + 1, 5))}
              >
                <div className="timeline-step__number">{index + 1}</div>
                <div className="timeline-step__connector" />
                <div className="timeline-step__card">
                  <div className="timeline-step__icon">{step.icon}</div>
                  <div className="timeline-step__content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="admission-cta" data-animate="fade-up">
            <p>For more information, contact our admissions office:</p>
            <div className="admission-cta__contacts">
              <a href="tel:9319787083" className="btn btn-primary">📞 Call: 9319787083</a>
              <a href="mailto:admissions@scmchildrensacademy.in" className="btn btn-outline">✉ Email Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdmissionProcessPage;
