import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-mega-grid">
        
        {/* COLUMN 1: School & Admissions */}
        <div className="footer-links-col">
          <div className="footer-link-group">
            <h4>School</h4>
            <ul>
              <li><Link to="/introduction">About SCM</Link></li>
              <li><Link to="/managements-desk">Principal's Desk</Link></li>
              <li><Link to="/mandatory-disclosure">Affiliations & Accreditations</Link></li>
              <li><Link to="/contact-us">Parent Engagement</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>Admissions</h4>
            <ul>
              <li><Link to="/admission-process">Admission Process</Link></li>
              <li><Link to="/school-uniform-timings">Uniform & Timings</Link></li>
            </ul>
          </div>
        </div>

        {/* COLUMN 2: Beyond Learning & Documents */}
        <div className="footer-links-col">
          <div className="footer-link-group">
            <h4>Beyond Learning</h4>
            <ul>
              <li><Link to="/facilities">Co-Curricular Activities</Link></li>
              <li><Link to="/facilities">Sports</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>Documents</h4>
            <ul>
              <li><Link to="/mandatory-disclosure">Mandatory Public Disclosure</Link></li>
              <li><Link to="/tc">Transfer Certificate</Link></li>
            </ul>
          </div>
        </div>

        {/* COLUMN 3: Learning Spaces, Connections, ERP, Quick Links */}
        <div className="footer-links-col">
          <div className="footer-link-group">
            <h4>Learning Spaces</h4>
            <ul>
              <li><Link to="/cbse-curriculum">Education</Link></li>
              <li><Link to="/facilities">Sports</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>Connections</h4>
            <ul>
              <li><Link to="/events">Gallery</Link></li>
              <li><Link to="/alumni">Alumni</Link></li>
              <li><Link to="/results">Results</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>ERP & Quick Links</h4>
            <ul>
              <li><a href="https://www.scmacademyerp.in" target="_blank" rel="noopener noreferrer">ERP Login</a></li>
              <li><Link to="/mandatory-disclosure">Mandatory Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* COLUMN 4: Contact Us & Map (Takes wider space) */}
        <div className="footer-contact-col contact-mega-group">
          <h4>Contact Us</h4>
          
          <div className="contact-details-grid">
            <div className="contact-info-col">
              <div className="footer-brand" style={{ marginBottom: '1.25rem' }}>
                <img src={logo} alt="SCM Children Academy Logo" style={{ height: '60px', marginBottom: '0.75rem' }} />
                <h5 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>S.C.M. CHILDREN ACADEMY</h5>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  Affiliation No: 2132374 <br/> School Code: 81858 <br/> UDISE No: 09030510408
                </p>
              </div>
              <div className="contact-info">
                <p><Phone size={16} /> <strong>Reception:</strong> 01342 - 297 277</p>
                <p><Phone size={16} /> <strong>Admissions:</strong> 9319787083</p>
                <p><Mail size={16} /> <strong>Email:</strong> admissions@scmchildrensacademy.in</p>
              </div>
              <div className="address-info mt-3">
                <MapPin size={16} className="address-icon" />
                <p>
                  SCM CHILDREN ACADEMY, Ward No. 9, Moh. Chaudhariyan, <br />
                  Dhampur - Bijnor Road, Haldaur, Bijnor (UP), 246726
                </p>
              </div>
              <div className="social-links">
                <a href="https://www.facebook.com/people/SCM-Children-Academy/100041894142952/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={18} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={18} /></a>
                <a href="https://www.youtube.com/channel/UCYoHO8rNkbG7au0pGLxGHXQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={18} /></a>
              </div>
            </div>
            
            <div className="footer-map-container" style={{ height: '100%', minHeight: '300px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.635025753432!2d78.28743357461536!3d29.29304275378203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390beaa1a515fc03%3A0xf7264f8e53eecd43!2sS.C.M.Children%20Academy!5e0!3m2!1sen!2sin!4v1687377883872!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>Copyright © 2026 All Rights Reserved. SCM Children Academy, Haldaur, Bijnor.</p>
        <p>Designed with ❤️ for Excellence in Education</p>
      </div>
    </footer>
  );
};

export default Footer;
