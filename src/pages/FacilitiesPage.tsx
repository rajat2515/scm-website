import React from 'react';
import PageHero from '../components/PageHero';
import { Bus, Monitor, BookOpen, Trophy } from 'lucide-react';
import './FacilitiesPage.css';

const facilities = [
  {
    icon: <Bus size={32} />,
    title: 'Excellent Transport Facilities',
    description: 'A modern school bus transport system is available for students coming from all parts of Bijnor areas. Female attendees are present to provide extra care for children, even at the youngest age.',
    color: '#3b82f6',
  },
  {
    icon: <Monitor size={32} />,
    title: 'Computer Lab',
    description: 'The Computer Lab is well-resourced with ultra high-speed central servers and the latest educational software linked to the world-wide-web (with adequate security and safety features) to allow students to use these facilities for learning about different topics related to their curriculum as well as gaining expertise in using the computer and the internet. We are also keen to teach children about personal safety in the use of social media.',
    color: '#8b5cf6',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Library',
    description: 'The school has a spacious library with books ranging from fiction, classics, mythology, and general knowledge to current writers from around the world and for every level.',
    color: '#10b981',
  },
  {
    icon: <Trophy size={32} />,
    title: 'Sports',
    description: 'We believe that sports play an important role in the education of a child. Our sporting facilities include a 360 running track, cricket pitch, cricket nets, football ground, basketball courts and volleyball courts.',
    color: '#f59e0b',
  },
];

const FacilitiesPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Our Facilities"
        subtitle="World-class infrastructure for holistic development"
        breadcrumb="Facilities"
      />

      <section className="facilities-section section-padding">
        <div className="container">
          <div className="facilities-intro" data-animate="fade-up">
            <span className="facilities-label">INFRASTRUCTURE</span>
            <h2>Everything Your Child Needs to <span className="highlight-text">Thrive</span></h2>
            <p>We provide state-of-the-art facilities that support academic excellence, physical development, and creative expression.</p>
          </div>

          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div
                className="facility-card"
                key={index}
                data-animate="fade-up"
                data-delay={String(index + 1)}
              >
                <div className="facility-card__icon" style={{ backgroundColor: `${facility.color}15`, color: facility.color }}>
                  {facility.icon}
                </div>
                <h3>{facility.title}</h3>
                <p>{facility.description}</p>
                <div className="facility-card__accent" style={{ backgroundColor: facility.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FacilitiesPage;
