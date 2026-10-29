import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * ScrollMotion
 * Site-wide, scroll-linked motion without touching page markup:
 *  - A hairline progress indicator that fills as the page scrolls.
 *  - Two parallax speeds exposed as CSS variables, consumed by the hero
 *    backgrounds (--scroll-parallax) and inline imagery (--scroll-parallax-slow).
 * All writes are batched into one animation frame and skipped entirely when
 * the user prefers reduced motion.
 */
const ScrollMotion = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.style.removeProperty('--scroll-parallax');
      document.documentElement.style.removeProperty('--scroll-parallax-slow');
      return undefined;
    }

    let frame = null;

    const update = () => {
      frame = null;
      const y = window.scrollY || 0;
      const root = document.documentElement;
      root.style.setProperty('--scroll-parallax', `${Math.min(y * 0.12, 90).toFixed(1)}px`);
      root.style.setProperty('--scroll-parallax-slow', `${Math.min(y * 0.05, 42).toFixed(1)}px`);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  /* Only draw the bar once the user has actually scrolled */
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      className="ios-scroll-progress"
      style={{ scaleX: progress }}
      data-active={active ? 'true' : 'false'}
      aria-hidden="true"
    />
  );
};

export default ScrollMotion;
