import React from 'react';
import './AcademicsSection.css';

const academicsData = [
  {
    title: 'Early Childhood',
    grades: 'Nursery, LKG & UKG',
    desc: 'Building curiosity, creativity, and a love of learning through play-based education.',
    img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Primary School',
    grades: 'Classes 1 – 5',
    desc: 'Developing strong foundations in literacy, numeracy, and holistic values.',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Middle School',
    grades: 'Classes 6 – 8',
    desc: 'Encouraging analytical thinking, scientific temperament, and co-curricular excellence.',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Secondary School',
    grades: 'Classes 9 – 10',
    desc: 'Preparing students for CBSE Board examinations with focused academic rigour.',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  }
];

const AcademicsSection: React.FC = () => {
  return (
    <section className="academics-section" id="academics">
      <div className="container academics-grid">
        <div className="academics-title" data-animate="fade-left">
          <h5>ACADEMICS</h5>
          <h2>CBSE Curriculum from <strong>Nursery to Class X</strong> — Nurturing <strong>Every Stage of Growth</strong></h2>
        </div>

        <div className="academics-cards">
          {academicsData.map((item, index) => (
            <div
              className="academic-card"
              key={index}
              data-animate="overlap"
              data-delay={String(index + 1)}
            >
              <div className="card-img-container">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="card-grades">{item.grades}</p>
                <p className="card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
