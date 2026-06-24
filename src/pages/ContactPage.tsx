import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageHero from '../components/PageHero';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import './ContactPage.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: 'SCM Children Academy',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        breadcrumb="Contact Us"
      />

      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Cards */}
            <div className="contact-info-panel">
              <div className="contact-card" data-animate="fade-up">
                <div className="contact-card__icon"><MapPin size={24} /></div>
                <h3>Address</h3>
                <p>SCM Children Academy<br />Ward No. 9, Moh. Chaudhariyan,<br />Dhampur – Bijnor Road, Haldaur,<br />District Bijnor (UP), Pin-246726</p>
              </div>

              <div className="contact-card" data-animate="fade-up" data-delay="1">
                <div className="contact-card__icon"><Mail size={24} /></div>
                <h3>Email</h3>
                <p>support@scmchildrenacademy.com<br />admissions@scmchildrensacademy.in</p>
              </div>

              <div className="contact-card" data-animate="fade-up" data-delay="2">
                <div className="contact-card__icon"><Phone size={24} /></div>
                <h3>Call Us</h3>
                <p>+91-7078804892<br />+91-9319787083<br />Reception: 01342 – 297 277</p>
              </div>

              <div className="contact-socials" data-animate="fade-up" data-delay="3">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a href="https://www.facebook.com/people/SCM-Children-Academy/100041894142952/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={22} /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={22} /></a>
                  <a href="https://www.youtube.com/channel/UCYoHO8rNkbG7au0pGLxGHXQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={22} /></a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-panel" data-animate="fade-left">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone</label>
                  <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91-XXXXXXXXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>⏳ Sending...</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>

                {status === 'success' && (
                  <div className="form-feedback form-feedback--success">
                    <CheckCircle size={18} />
                    Message sent successfully! We'll get back to you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-feedback form-feedback--error">
                    <AlertCircle size={18} />
                    Something went wrong. Please try calling us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="contact-map" data-animate="fade-up">
            <h3>Find Us on Map</h3>
            <div className="contact-map__frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.635025753432!2d78.28743357461536!3d29.29304275378203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390beaa1a515fc03%3A0xf7264f8e53eecd43!2sS.C.M.Children%20Academy!5e0!3m2!1sen!2sin!4v1687377883872!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SCM Children Academy Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
