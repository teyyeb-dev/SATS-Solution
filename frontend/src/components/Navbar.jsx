import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

const navItems = [
  { to: '/', label: 'Services' },
  { to: '/work', label: 'Case Studies' },
  { to: '/about', label: 'Company' },
  { to: '/blog', label: 'Insights' },
  { to: '/careers', label: 'Careers' },
];

const EASE = [0.16, 1, 0.3, 1];
const PILL = { type: 'spring', stiffness: 420, damping: 34, mass: 0.6 };

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

/* Blur-in + slide, replayed whenever the scroll state flips */
const linkVariants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
};

/* Mobile sheet rows rise into focus */
const sheetItemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: EASE },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="nav">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <Logo size={36} />
          <span>SATS <em>Solutions</em></span>
        </Link>

        <motion.div
          className="nav-links"
          variants={listVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          /* Remounting on the scroll threshold replays the blur/slide entrance */
          key={`nav-${scrolled}`}
        >
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <motion.span className="nav-item" variants={linkVariants} key={item.to}>
                <Link to={item.to} className={`nav-link${active ? ' active' : ''}`}>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      transition={PILL}
                    />
                  )}
                  <span className="nav-label">{item.label}</span>
                </Link>
              </motion.span>
            );
          })}

          <motion.span className="nav-item" variants={linkVariants}>
            <Link
              to="/contact"
              className={`nav-cta ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact Us
            </Link>
          </motion.span>
        </motion.div>

        <button className="hamburger" id="hamburgerBtn" onClick={() => setIsOpen(true)} aria-label="Open menu">
          <i className="ti ti-menu-2"></i>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
        <div className="mob-header">
          <Link to="/" className="nav-brand" onClick={closeMenu} style={{ fontSize: '1.2rem' }}>
            <Logo size={32} />
            <span>SATS <em>Solutions</em></span>
          </Link>
          <button className="mob-close" onClick={closeMenu} aria-label="Close">
            <i className="ti ti-x"></i>
          </button>
        </div>

        <motion.div
          className="mob-nav-list"
          variants={listVariants}
          initial={false}
          animate={isOpen ? 'visible' : 'hidden'}
        >
          {[...navItems, { to: '/contact', label: 'Contact Us' }].map((item) => (
            <motion.div variants={sheetItemVariants} key={item.to}>
              <Link
                to={item.to}
                className={`mob-nav-link ${isActive(item.to) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {item.label} <i className="ti ti-chevron-right"></i>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mob-footer">
          <p>Connect with us</p>
          <div className="mob-social">
            <a href="mailto:info@satssolutions.com"><i className="ti ti-mail"></i></a>
            <a href="https://linkedin.com"><i className="ti ti-brand-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className={`mob-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>
    </>
  );
};

export default Navbar;
