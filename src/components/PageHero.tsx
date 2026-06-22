import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.css';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, breadcrumb }) => {
  return (
    <section className="page-hero">
      <div className="page-hero__bg">
        <div className="page-hero__gradient" />
        <div className="page-hero__pattern" />
      </div>
      <div className="container page-hero__content">
        <nav className="page-hero__breadcrumb">
          <Link to="/">Home</Link>
          <span className="page-hero__breadcrumb-sep">›</span>
          <span>{breadcrumb}</span>
        </nav>
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
