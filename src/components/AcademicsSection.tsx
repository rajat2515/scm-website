import React from 'react';
import './AcademicsSection.css';

const academicsData = [
  {
    title: 'Early Childhood Learning',
    grades: 'Nursery & KG',
    img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Primary School',
    grades: 'Grades 1-5',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Middle School',
    grades: 'Grades 6-8',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Secondary School',
    grades: 'Grades 9-10',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  }
];

const AcademicsSection: React.FC = () => {
  return (
    <section className="academics-section" id="academics">
      <div className="container academics-grid">
        <div className="academics-title" data-animate="fade-left">
          <h5>ACADEMICS</h5>
          <h2>Pioneers of <strong>Global Curriculum</strong> and <strong>Experiential Learning</strong> Pathways</h2>
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
                <p>{item.grades}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
