import React from 'react';
import PageHero from '../components/PageHero';
import { BookOpen, Users, Award, Calendar } from 'lucide-react';
import './IntroductionPage.css';

const IntroductionPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="About SCM Children Academy"
        subtitle="Building foundations for lifelong success since 2012"
        breadcrumb="Introduction"
      />

      <section className="intro-section section-padding">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-story" data-animate="fade-up">
              <span className="intro-label">OUR STORY</span>
              <h2>Founded in the Memory of <span className="highlight-text">Late Shree Chandra Sen</span></h2>
              <p>
                In July 2012, SCM Children Academy was founded in the memory of Late Shree Chandra Sen 
                by the Shree Chandra Sen Family. Situated at Nehtaur Tiraha Dhampur–Bijnor Road, 
                Ward No. 25, South Raishan Haldaur, the school was established with a vision to 
                provide world-class education to the community.
              </p>
              <p>
                Education is a life-long process, but it must develop from firm and broad foundations. 
                The goal of the school is to imbibe in the students a love of learning and inculcate 
                in them a desire to excel at every level.
              </p>
              <p>
                The school also aims at equipping the students with the intellectual and practical 
                skills that are necessary to meet the inevitable challenges in the future. The 
                curriculum is structured in a manner that keeps your child in touch with the 
                ever-changing world trends; right from the junior years itself.
              </p>
            </div>

            <div className="intro-highlights">
              <div className="intro-highlight-card" data-animate="fade-left" data-delay="1">
                <div className="highlight-icon"><BookOpen size={28} /></div>
                <h3>Holistic Curriculum</h3>
                <p>Social and moral values ingrained within a broad and balanced curriculum promote confidence, direction, and critical thinking skills.</p>
              </div>
              <div className="intro-highlight-card" data-animate="fade-left" data-delay="2">
                <div className="highlight-icon"><Users size={28} /></div>
                <h3>Dedicated Faculty</h3>
                <p>Highly qualified and dedicated teachers provide exposure and guidance, helping students develop their abilities and talents to the fullest.</p>
              </div>
              <div className="intro-highlight-card" data-animate="fade-left" data-delay="3">
                <div className="highlight-icon"><Award size={28} /></div>
                <h3>Excellence in Every Sphere</h3>
                <p>We constantly revamp, reinvent and evaluate the classroom and teaching strategy to create the most appropriate education your child deserves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-stats-section">
        <div className="container">
          <div className="intro-stats-grid">
            <div className="intro-stat" data-animate="scale-in" data-delay="1">
              <div className="intro-stat-icon"><Calendar size={32} /></div>
              <h3>2012</h3>
              <p>Year Founded</p>
            </div>
            <div className="intro-stat" data-animate="scale-in" data-delay="2">
              <div className="intro-stat-icon"><BookOpen size={32} /></div>
              <h3>CBSE</h3>
              <p>Affiliated Board</p>
            </div>
            <div className="intro-stat" data-animate="scale-in" data-delay="3">
              <div className="intro-stat-icon"><Users size={32} /></div>
              <h3>Nursery–X</h3>
              <p>Grade Range</p>
            </div>
            <div className="intro-stat" data-animate="scale-in" data-delay="4">
              <div className="intro-stat-icon"><Award size={32} /></div>
              <h3>2132374</h3>
              <p>Affiliation No.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-values section-padding">
        <div className="container">
          <div className="values-content" data-animate="fade-up">
            <span className="intro-label">OUR VALUES</span>
            <h2>Nurturing <span className="highlight-text">Well-Rounded Personalities</span></h2>
            <p className="values-text">
              The social and moral values, which are ingrained within a broad and balanced curriculum, 
              help to promote confidence, direction, and critical thinking skills, leading to the 
              development of well-adjusted, adaptable and integrated personalities. Students develop 
              their abilities and talents, and discover their learning potential to the fullest, which 
              is reached in an invigorating and competitive atmosphere, created by excellent facilities, 
              exposure and guidance provided by a highly qualified and dedicated faculty.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroductionPage;
