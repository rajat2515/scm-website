import React, { useState, useEffect, useRef } from 'react';
import './LearningSpaces.css';

const spaces = [
  { name: 'DWELL', desc: 'Where students grow, learn, and thrive every day', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop' },
  { name: 'EXPRESS', desc: 'Unleashing creativity through Art, Dance, Music', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop' },
  { name: 'GROW', desc: 'Plenty of opportunities to engage in a diverse range', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' },
  { name: 'ACHIEVE', desc: 'Prioritizing wellness and comprehensive services', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' },
];

const LearningSpaces: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const wordRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    wordRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="learning-spaces" id="learning">
      <div className="container learning-layout">
        {/* Left: single large image that crossfades */}
        <div className="ls-image-panel">
          {spaces.map((space, i) => (
            <img
              key={i}
              src={space.img}
              alt={space.name}
              className={`ls-image ${i === activeIndex ? 'ls-image--active' : ''}`}
            />
          ))}
          {/* Overlay text on the image */}
          <div className="ls-image-caption">
            <h4>{spaces[activeIndex].name}</h4>
            <p>{spaces[activeIndex].desc}</p>
          </div>
        </div>

        {/* Right: scrollable word list */}
        <div className="ls-word-panel">
          <h5>LEARNING SPACES</h5>
          <h2>A place to</h2>
          <ul className="ls-word-list">
            {spaces.map((space, i) => (
              <li
                key={i}
                ref={(el) => { wordRefs.current[i] = el; }}
                data-idx={i}
                className={i === activeIndex ? 'ls-word--active' : ''}
              >
                {space.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LearningSpaces;
