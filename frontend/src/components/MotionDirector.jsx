import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, SplitText } from '../lib/gsapSetup';
import '../styles/pro-motion.css';

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Headings that get the character-by-character treatment */
const HEADINGS = '.section-heading, .sv-hero h1, .cta-banner h2';
/* Media that wipes open as it enters the viewport */
const IMAGES = '.work-thumb img, .blog-card-thumb img, .featured-image-box, .review-av';
/* Media whose transform is owned by CSS parallax — clip only */
const MASKED = '.edge-image img, .culture-img img, .work-thumb-bg';

const MotionDirector = () => {
  const { pathname } = useLocation();
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  /* ───────── Smooth scrolling + scroll velocity ───────── */
  useEffect(() => {
    if (prefersReduced()) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    window.__nxLenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Scroll velocity spins the footer marquee faster, then settles */
    const track = document.querySelector('.blur-scroller-track');
    let idle;
    const onVelocity = ({ velocity }) => {
      if (!track) return;
      const speed = 1 + Math.min(Math.abs(velocity) / 18, 3.5);
      track.style.animationDuration = `${(46 / speed).toFixed(2)}s`;
      clearTimeout(idle);
      idle = setTimeout(() => {
        track.style.animationDuration = '';
      }, 220);
    };
    lenis.on('scroll', onVelocity);

    /* Other components ask Lenis to pause (e.g. an open sheet) */
    const onLockRequest = (event) => {
      if (event.detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener('nx:scrolllock', onLockRequest);

    return () => {
      clearTimeout(idle);
      window.removeEventListener('nx:scrolllock', onLockRequest);
      lenis.off('scroll', onScroll);
      lenis.off('scroll', onVelocity);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__nxLenis;
    };
  }, []);

  /* ───────── Per-route scroll animations ───────── */
  useEffect(() => {
    if (prefersReduced()) return undefined;

    /* Reset to top through Lenis so its internal position stays in sync */
    window.__nxLenis?.scrollTo(0, { immediate: true });

    const splits = [];
    let cancelled = false;

    const build = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        /* 1. Headings split into characters that rise out of a blur */
        gsap.utils.toArray(HEADINGS).forEach((el) => {
          if (!el.textContent.trim()) return;
          el.classList.add('in'); // stand down the CSS reveal for this node

          /* Line breaks inside a heading break character splitting, so
             those headings get a simple lift instead. */
          if (el.querySelector('br')) {
            gsap.from(el, {
              y: 26,
              opacity: 0,
              filter: 'blur(6px)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            });
            return;
          }

          const split = new SplitText(el, {
            type: 'words,chars',
            wordsClass: 'nx-word',
            charsClass: 'nx-char',
          });
          splits.push(split);

          gsap.from(split.chars, {
            yPercent: 120,
            opacity: 0,
            rotateX: -60,
            filter: 'blur(6px)',
            transformPerspective: 500,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.012,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        /* 2. Media wipes open on entry */
        gsap.utils.toArray(IMAGES).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0)', scale: 1.14 },
            {
              clipPath: 'inset(0 0 0% 0)',
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            }
          );
        });

        /* 3. Parallax-owned media: clip only, never touch transform */
        gsap.utils.toArray(MASKED).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 94%', once: true },
            }
          );
        });

        /* 4. Hero content drifts and dims as the hero scrolls away */
        const hero = document.querySelector('.sv-hero, .about-hero, .careers-hero');
        const heroInner = hero?.querySelector('.container');
        if (hero && heroInner) {
          gsap.to(heroInner, {
            yPercent: -9,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
      return ctx;
    };

    let ctx;
    /* Wait for webfonts so SplitText measures correctly */
    const ready = document.fonts?.ready || Promise.resolve();
    ready.then(() => {
      ctx = build();
    });

    return () => {
      cancelled = true;
      splits.forEach((split) => split.revert());
      ctx?.revert();
    };
  }, [pathname]);

  /* ───────── Magnetic buttons + custom cursor (desktop) ───────── */
  useEffect(() => {
    if (prefersReduced()) return undefined;

    const cleanups = [];

    if (hasFinePointer()) {
      /* Custom cursor */
      if (cursorRef.current && ringRef.current) {
        const ring = ringRef.current;
        const dot = cursorRef.current.querySelector('.nx-cursor-dot');
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
        const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });

        const onMove = (event) => {
          ringX(event.clientX);
          ringY(event.clientY);
          dotX(event.clientX);
          dotY(event.clientY);
        };

        const HOT = 'a, button, input, textarea, .svc-card, .work-card, .tm-toggle, .premium-service-tile, .ios-tab';
        const onOver = (event) => {
          const hot = event.target instanceof Element && event.target.closest(HOT);
          ring.classList.toggle('is-hover', Boolean(hot));
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerover', onOver, { passive: true });
        document.body.classList.add('nx-cursor-active');

        cleanups.push(() => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerover', onOver);
          document.body.classList.remove('nx-cursor-active');
        });
      }

      /* Magnetic pull on buttons */
      gsap.utils.toArray('.btn, .nav-cta, .premium-submit-btn').forEach((el) => {
        const pullX = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
        const pullY = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

        const onMove = (event) => {
          const rect = el.getBoundingClientRect();
          pullX((event.clientX - (rect.left + rect.width / 2)) * 0.22);
          pullY((event.clientY - (rect.top + rect.height / 2)) * 0.3);
        };
        const onLeave = () => {
          pullX(0);
          pullY(0);
        };
        /* GSAP owns the transform now, so press feedback moves here too */
        const onDown = () => gsap.to(el, { scale: 0.96, duration: 0.12, ease: 'power2.out' });
        const onUp = () => gsap.to(el, { scale: 1, duration: 0.3, ease: 'power3.out' });

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointerup', onUp);

        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
          el.removeEventListener('pointerdown', onDown);
          el.removeEventListener('pointerup', onUp);
          gsap.set(el, { clearProps: 'transform' });
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return (
    <div ref={cursorRef} className="nx-cursor" aria-hidden="true">
      <span ref={ringRef} className="nx-cursor-ring" />
      <span className="nx-cursor-dot" />
    </div>
  );
};

export default MotionDirector;
