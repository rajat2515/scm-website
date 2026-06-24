import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, FileText } from 'lucide-react';
import './QuickPortals.css';

const portals = [
  {
    title: 'ERP Portal',
    description: 'Student & Parent Login',
    icon: <Monitor size={32} />,
    link: 'https://www.scmacademyerp.in',
    color: 'portal-navy',
    external: true
  },
  {
    title: 'Mandatory Disclosure',
    description: 'CBSE Public Information',
    icon: <FileText size={32} />,
    link: '/mandatory-disclosure',
    color: 'portal-navy',
    external: false
  }
];

const QuickPortals: React.FC = () => {
  return (
    <section className="quick-portals-section">
      <div className="container">
        <div className="portals-grid">
          {portals.map((portal, index) =>
            portal.external ? (
              <a
                key={index}
                href={portal.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`portal-card glass-panel ${portal.color}`}
              >
                <div className="portal-icon-wrapper">
                  {portal.icon}
                  <div className="portal-icon-glow"></div>
                </div>
                <div className="portal-content">
                  <h3 className="portal-title">{portal.title}</h3>
                  <p className="portal-desc">{portal.description}</p>
                </div>
                <div className="portal-arrow">→</div>
              </a>
            ) : (
              <Link
                key={index}
                to={portal.link}
                className={`portal-card glass-panel ${portal.color}`}
              >
                <div className="portal-icon-wrapper">
                  {portal.icon}
                  <div className="portal-icon-glow"></div>
                </div>
                <div className="portal-content">
                  <h3 className="portal-title">{portal.title}</h3>
                  <p className="portal-desc">{portal.description}</p>
                </div>
                <div className="portal-arrow">→</div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickPortals;
