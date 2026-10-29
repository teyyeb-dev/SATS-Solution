import React from 'react';
import '../styles/scroller.css';

const items = [
  'Enterprise AI',
  'Cloud Infrastructure',
  'Data & AI',
  'ERP Integration',
  'Cybersecurity',
  'Autonomous Agents',
  'Computer Vision',
  'Predictive Analytics',
];

/**
 * Blur: Text Scroller
 * A continuous, seamless text marquee that sits directly above the footer.
 * The track is duplicated once so the loop never shows a gap, and the edges
 * are blurred with a masked backdrop-filter so text drifts in and out of
 * focus rather than simply being clipped.
 */
const BlurTextScroller = () => (
  <div className="blur-scroller" aria-hidden="true">
    <div className="blur-scroller-track">
      {[0, 1].map((copy) => (
        <div className="blur-scroller-group" key={copy}>
          {items.map((item, index) => (
            <span className="blur-scroller-item" key={`${copy}-${item}`}>
              {item}
              <span
                className="blur-scroller-dot"
                data-accent={index % 3 === 0 ? 'true' : 'false'}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default BlurTextScroller;
