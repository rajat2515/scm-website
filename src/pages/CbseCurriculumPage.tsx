import React from 'react';
import PageHero from '../components/PageHero';
import { GraduationCap, ExternalLink } from 'lucide-react';
import './CbseCurriculumPage.css';

const grades = [
  { level: 'Pre-Primary', range: 'Nursery & KG', desc: 'Play-based learning, foundational literacy and numeracy, sensory development', color: '#ec4899' },
  { level: 'Primary', range: 'Classes I – V', desc: 'Core subjects with emphasis on language, mathematics, environmental studies, and creative arts', color: '#3b82f6' },
  { level: 'Middle School', range: 'Classes VI – VIII', desc: 'Subject specialization begins — science, social studies, mathematics, languages, and computer science', color: '#10b981' },
  { level: 'Secondary', range: 'Classes IX – X', desc: 'Board exam preparation following CBSE guidelines with focused academic and career guidance', color: '#f59e0b' },
];

const CbseCurriculumPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="CBSE Curriculum"
        subtitle="Following the Central Board of Secondary Education framework"
        breadcrumb="CBSE Curriculum"
      />

      <section className="curriculum-section section-padding">
        <div className="container">
          <div className="curriculum-intro" data-animate="fade-up">
            <div className="curriculum-badge">
              <GraduationCap size={28} />
              <span>CBSE Affiliated</span>
            </div>
            <h2>SCM follows the <span className="highlight-text">CBSE curriculum</span> with students enrolled from Class Nursery to Class X</h2>
            <p>Our curriculum is aligned with the latest CBSE guidelines, ensuring students receive a comprehensive education that prepares them for board examinations and beyond.</p>
          </div>

          <div className="curriculum-grid">
            {grades.map((grade, index) => (
              <div
                className="curriculum-card"
                key={index}
                data-animate="fade-up"
                data-delay={String(index + 1)}
              >
                <div className="curriculum-card__bar" style={{ backgroundColor: grade.color }} />
                <div className="curriculum-card__level" style={{ color: grade.color }}>{grade.level}</div>
                <h3>{grade.range}</h3>
                <p>{grade.desc}</p>
              </div>
            ))}
          </div>

          <div className="curriculum-cta" data-animate="fade-up">
            <p>Please visit the CBSE website for the updated curriculum details:</p>
            <a
              href="https://cbseacademic.in/curriculum.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit CBSE Website <ExternalLink size={16} />
            </a>
            <p className="curriculum-source">Source: CBSE</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CbseCurriculumPage;
