import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageHero from '../components/PageHero';
import { FileText, Clock, Camera, CheckCircle, UserCheck, CreditCard, ClipboardList, Phone, Send, AlertCircle } from 'lucide-react';
import './AdmissionProcessPage.css';

const steps = [
  { icon: <FileText size={24} />, title: 'Collect the Form', desc: 'Form can be collected from School Reception or you can fill the online enquiry form below.' },
  { icon: <Clock size={24} />, title: 'Office Timings', desc: 'Timings to collect forms — 08:00 a.m. to 2:00 p.m.' },
  { icon: <UserCheck size={24} />, title: 'Age Eligibility', desc: 'The eligible age for Nursery admission is 3 years as of 31st March of the current session.' },
  { icon: <ClipboardList size={24} />, title: 'Birth Certificate', desc: 'The photocopy of the Birth Certificate issued by the Municipal Corporation or concerned civic authority must be attached along with the form.' },
  { icon: <Camera size={24} />, title: 'Photograph', desc: 'The photograph of the child must be pasted on the form.' },
  { icon: <CheckCircle size={24} />, title: 'Complete Registration', desc: 'Incomplete registration will not be processed.' },
  { icon: <Phone size={24} />, title: 'Verification', desc: 'On completion of the registration process, parents will be called for verification of documents within 7–10 working days.' },
  { icon: <CreditCard size={24} />, title: 'Fee Deposit', desc: 'Once the admission is confirmed, the fee must be deposited within the stipulated period.' },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const AdmissionProcessPage: React.FC = () => {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    applying_for: 'Nursery',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_ADMISSION_TEMPLATE_ID,
        {
          student_name: formData.student_name,
          parent_name: formData.parent_name,
          phone: formData.phone,
          from_email: formData.email,
          applying_for: formData.applying_for,
          message: formData.message,
          to_name: 'SCM Children Academy Admissions',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');
        setFormData({ student_name: '', parent_name: '', phone: '', email: '', applying_for: 'Nursery', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

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

          {/* Online Enquiry Form */}
          <div className="admission-form-section" data-animate="fade-up">
            <div className="admission-form-header">
              <span className="admission-label">ONLINE ENQUIRY</span>
              <h2>Apply Online — We'll Contact You</h2>
              <p>Fill out the form below and our admissions team will reach out within 1–2 working days.</p>
            </div>

            <form className="admission-form" onSubmit={handleSubmit}>
              <div className="admission-form-grid">
                <div className="form-group">
                  <label htmlFor="student_name">Student's Full Name *</label>
                  <input type="text" id="student_name" name="student_name" value={formData.student_name} onChange={handleChange} required placeholder="Child's name" />
                </div>
                <div className="form-group">
                  <label htmlFor="parent_name">Parent / Guardian Name *</label>
                  <input type="text" id="parent_name" name="parent_name" value={formData.parent_name} onChange={handleChange} required placeholder="Father's / Mother's name" />
                </div>
                <div className="form-group">
                  <label htmlFor="adm-phone">Phone Number *</label>
                  <input type="tel" id="adm-phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91-XXXXXXXXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="adm-email">Email Address</label>
                  <input type="email" id="adm-email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="applying_for">Applying for Class *</label>
                  <select id="applying_for" name="applying_for" value={formData.applying_for} onChange={handleChange} required>
                    {['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9'].map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="adm-message">Any Questions or Comments</label>
                  <textarea id="adm-message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Anything else you'd like us to know?" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary admission-submit" disabled={status === 'sending'}>
                {status === 'sending' ? '⏳ Submitting...' : <><Send size={18} /> Submit Enquiry</>}
              </button>

              {status === 'success' && (
                <div className="form-feedback form-feedback--success">
                  <CheckCircle size={18} />
                  Enquiry submitted! Our admissions team will contact you within 1–2 working days.
                </div>
              )}
              {status === 'error' && (
                <div className="form-feedback form-feedback--error">
                  <AlertCircle size={18} />
                  Submission failed. Please call us at <a href="tel:9319787083">9319787083</a> directly.
                </div>
              )}
            </form>
          </div>

          <div className="admission-cta" data-animate="fade-up">
            <p>For immediate assistance, contact our admissions office:</p>
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

