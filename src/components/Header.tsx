import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import './Header.css';

interface DropdownItem {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to?: string;
  children?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Introduction', to: '/introduction' },
      { label: "Management's Desk", to: '/managements-desk' },
      { label: 'Facilities', to: '/facilities' },
    ],
  },
  {
    label: 'Admission',
    children: [
      { label: 'Admission Process', to: '/admission-process' },
      { label: 'School Uniform & Timings', to: '/school-uniform-timings' },
    ],
  },
  {
    label: 'Academics',
    children: [
      { label: 'CBSE Curriculum', to: '/cbse-curriculum' },
      { label: 'Results', to: '/results' },
    ],
  },
  { label: 'Event Gallery', to: '/events' },
  { label: 'Achievers', to: '/achievers' },
  { label: 'Alumni', to: '/alumni' },
  { label: 'TC', to: '/tc' },
  { label: 'Mandatory Disclosure', to: '/mandatory-disclosure' },
  { label: 'Contact Us', to: '/contact-us' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const showLightText = isHomePage && !scrolled;

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${!isHomePage ? ' header--inner' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="SCM Children Academy Logo" className="logo-img" />
          <div className="logo-text">
            <span className={`logo-main${showLightText ? ' logo-main--light' : ''}`}>S.C.M. CHILDREN ACADEMY</span>
            <span className={`logo-sub${showLightText ? ' logo-sub--light' : ''}`}>HALDAUR, BIJNOR</span>
          </div>
        </Link>

        <nav className="nav-links">
          {navItems.map((item) =>
            item.children ? (
              <div
                className="nav-dropdown"
                key={item.label}
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`nav-dropdown__trigger${showLightText ? ' nav-link--light' : ''}`}
                  type="button"
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label} <ChevronDown size={14} className={`chevron${openDropdown === item.label ? ' chevron--open' : ''}`} />
                </button>
                <div className={`nav-dropdown__menu${openDropdown === item.label ? ' nav-dropdown__menu--open' : ''}`}>
                  {item.children.map((child) => (
                    <Link key={child.to} to={child.to} className="nav-dropdown__item">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.label === 'Contact Us' ? (
              <Link key={item.label} to={item.to!} className="btn btn-primary nav-cta-btn">
                {item.label}
              </Link>
            ) : (
              <Link key={item.label} to={item.to!} className={showLightText ? 'nav-link--light' : ''}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} color={scrolled || !isHomePage ? 'var(--primary-color)' : '#fff'} /> : <Menu size={28} color={scrolled || !isHomePage ? 'var(--primary-color)' : '#fff'} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}>
        {navItems.map((item) =>
          item.children ? (
            <div className="mobile-accordion" key={item.label}>
              <button
                className="mobile-accordion__trigger"
                onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                type="button"
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={`chevron${mobileAccordion === item.label ? ' chevron--open' : ''}`}
                />
              </button>
              <div className={`mobile-accordion__panel${mobileAccordion === item.label ? ' mobile-accordion__panel--open' : ''}`}>
                {item.children.map((child) => (
                  <Link key={child.to} to={child.to} onClick={() => setMenuOpen(false)}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'Contact Us' ? (
            <Link key={item.label} to={item.to!} className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ margin: '0.75rem 1.5rem', textAlign: 'center' }}>
              {item.label}
            </Link>
          ) : (
            <Link key={item.label} to={item.to!} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
