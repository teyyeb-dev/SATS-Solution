import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import '../styles/testimonials.css';

const testimonials = [
  {
    id: 'clinical',
    quote:
      'The autonomous triage system reclaimed our call-centre capacity within a single quarter. Patients now receive an answer in seconds, and our clinicians are finally working at the top of their licence instead of chasing scheduling errors.',
    name: 'Dr. Elena Marsh',
    role: 'Chief Medical Information Officer',
    company: 'Fortune 500 Health Provider',
    avatar: '/assets/images/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 'logistics',
    quote:
      'SATS rebuilt the predictive layer inside our ERP without a single day of downtime. Fleet routing and inventory now self-correct in real time, and the operational margin recovered almost immediately.',
    name: 'Marcus Adeyemi',
    role: 'VP of Supply Chain',
    company: 'Multi-National Logistics Firm',
    avatar: '/assets/images/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 'fintech',
    quote:
      'Their risk engine scores every transaction in under a millisecond. We eliminated the chargeback exposure that traditional rule-based systems kept missing, and the engineering documentation was audit-ready on delivery.',
    name: 'Priya Raghunathan',
    role: 'Head of Platform Engineering',
    company: 'Global FinTech Disruptor',
    avatar: '/assets/images/avatar-3.jpg',
    rating: 5,
  },
  {
    id: 'infra',
    quote:
      'We went from firefighting weekly incidents to a self-healing estate running at five nines. What impressed us most was the restraint: no unnecessary rewrites, just precise engineering where it mattered.',
    name: 'Tomas Lindqvist',
    role: 'Director of Site Reliability',
    company: 'Enterprise SaaS Provider',
    avatar: '/assets/images/avatar-4.jpg',
    rating: 5,
  },
];

const EASE = [0.16, 1, 0.3, 1];

/** Reveals a sentence word-by-word, mirroring the template's animated text. */
const AnimatedText = ({ text, baseDelay = 0.05 }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{text}</>;

  return (
    <span className="tm-quote-text">
      {text.split(' ').map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <motion.span
            className="tm-word"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.4,
              delay: baseDelay + index * 0.015,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>{' '}
        </React.Fragment>
      ))}
    </span>
  );
};

const Chevron = ({ open }) => (
  <motion.span
    className="tm-chevron"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    aria-hidden="true"
  >
    <i className="ti ti-chevron-down" />
  </motion.span>
);

const Stars = ({ rating }) => (
  <span className="tm-stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`ti ti-star${i < rating ? '-filled' : ''}`} />
    ))}
  </span>
);

const Testimonials = () => {
  const [openId, setOpenId] = useState(testimonials[0].id);
  const reduceMotion = useReducedMotion();

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section className="reviews-section tm-section">
      <div className="container">
        <div className="tm-layout">
          <div className="tm-intro reveal">
            <div className="section-label">Client Testimonials</div>
            <h2 className="section-heading">
              Trusted by the Teams <em>Running Mission-Critical Systems.</em>
            </h2>
            <p className="section-sub tm-intro-sub">
              Every engagement ends the same way: a system that behaves predictably under load, and an
              engineering partner who documents it properly. Open a testimonial to read the full account.
            </p>

            <div className="tm-aggregate">
              <div className="tm-aggregate-score">4.9</div>
              <div>
                <Stars rating={5} />
                <div className="tm-aggregate-label">Average client rating across 30+ engagements</div>
              </div>
            </div>
          </div>

          <div className="tm-list reveal">
            {testimonials.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `tm-panel-${item.id}`;
              const buttonId = `tm-toggle-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`tm-item${isOpen ? ' is-open' : ''}`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    className="tm-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <img className="tm-avatar" src={item.avatar} alt={`${item.name}, ${item.role}`} loading="lazy" />
                    <span className="tm-identity">
                      <span className="tm-name">{item.name}</span>
                      <span className="tm-role">
                        {item.role} · {item.company}
                      </span>
                    </span>
                    <Stars rating={item.rating} />
                    <span className="tm-toggle-label">{isOpen ? 'Hide' : 'Read'}</span>
                    <Chevron open={isOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="tm-panel"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <div className="tm-panel-inner">
                          <motion.span
                            className="tm-accent-bar"
                            initial={reduceMotion ? false : { scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                          />
                          <blockquote className="tm-quote">
                            <AnimatedText text={item.quote} />
                          </blockquote>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
