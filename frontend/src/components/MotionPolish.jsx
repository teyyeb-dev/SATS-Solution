import { useEffect } from 'react';

/**
 * MotionPolish
 * Adds two pointer-driven micro-interactions to the whole site without
 * touching page markup:
 *
 *  1. A soft light that follows the cursor inside cards (--mx / --my).
 *  2. A very subtle 3D tilt on the same cards.
 *
 * Both are skipped on touch devices and when the user prefers reduced
 * motion, and all writes are batched into a single animation frame.
 */
const CARD_SELECTOR = [
  '.svc-card',
  '.tech-card',
  '.work-card',
  '.insight-card',
  '.ba-col',
  '.process-step',
].join(',');

const MAX_TILT = 5; // degrees

const MotionPolish = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (reduceMotion.matches || !finePointer.matches) return undefined;

    let frame = null;
    let pending = null;
    let activeCard = null;

    const apply = () => {
      frame = null;
      if (!pending) return;
      const { card, x, y } = pending;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const relX = x - rect.left;
      const relY = y - rect.top;

      card.style.setProperty('--mx', `${relX}px`);
      card.style.setProperty('--my', `${relY}px`);
      card.style.setProperty('--rx', `${((0.5 - relY / rect.height) * MAX_TILT * 2).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${((relX / rect.width - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
    };

    const resetCard = (card) => {
      if (!card) return;
      card.classList.remove('tilt-on');
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    };

    const onPointerMove = (event) => {
      const card = event.target instanceof Element ? event.target.closest(CARD_SELECTOR) : null;

      if (!card) {
        resetCard(activeCard);
        activeCard = null;
        return;
      }

      if (card !== activeCard) {
        resetCard(activeCard);
        activeCard = card;
        card.classList.add('tilt-on');
      }

      pending = { card, x: event.clientX, y: event.clientY };
      if (frame === null) frame = window.requestAnimationFrame(apply);
    };

    const onPointerLeaveWindow = () => {
      resetCard(activeCard);
      activeCard = null;
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeaveWindow);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeaveWindow);
      if (frame !== null) window.cancelAnimationFrame(frame);
      resetCard(activeCard);
    };
  }, []);

  return null;
};

export default MotionPolish;
