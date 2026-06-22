import React from 'react';
import './Footer.css';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>Connect With Us</h4>
          <div className="contact-info">
            <p><Phone size={16} /> <strong>Reception:</strong> 01342 - 297 277</p>
            <p><Phone size={16} /> <strong>Admissions:</strong> 9319787083</p>
            <p><Phone size={16} /> <strong>HR:</strong> 7078804892</p>
            <p><Mail size={16} /> <strong>Email:</strong> admissions@scmchildrensacademy.in</p>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/people/SCM-Children-Academy/100041894142952/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="https://www.youtube.com/channel/UCYoHO8rNkbG7au0pGLxGHXQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={20} /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Address</h4>
          <div className="address-info">
            <MapPin size={24} className="address-icon" />
            <p>
              SCM CHILDREN ACADEMY <br />
              Ward No. 9, Moh. Chaudhariyan, <br />
              Dhampur - Bijnor Road, Haldaur, <br />
              District Bijnor (UP), Pin-246726
            </p>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Location</h4>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.635025753432!2d78.28743357461536!3d29.29304275378203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390beaa1a515fc03%3A0xf7264f8e53eecd43!2sS.C.M.Children%20Academy!5e0!3m2!1sen!2sin!4v1687377883872!5m2!1sen!2sin" 
              width="100%" 
              height="150" 
              style={{ border: 0, borderRadius: '4px' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>Copyright © 2026 All Rights Reserved. SCM Children Academy, Haldaur, Bijnor.</p>
        <p>Affiliation No: 2132374 | School Code: 81858</p>
      </div>
    </footer>
  );
};

export default Footer;
