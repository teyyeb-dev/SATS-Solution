import React from 'react';

const Logo = ({ size = 40, className = "" }) => {
  return (
    <div className={`logo-wrapper ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background Hexagon/Shield Shape */}
        <path
          d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z"
          fill="url(#logo-gradient)"
          style={{ opacity: 0.1 }}
        />

        {/* Main stylized 'S' shape using circuit-like paths */}
        <path
          d="M30 35C30 25 40 20 50 20C60 20 70 25 70 35C70 45 60 50 50 50C40 50 30 55 30 65C30 75 40 80 50 80C60 80 70 75 70 65"
          stroke="url(#logo-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Technical Nodes (Dots) */}
        <circle cx="30" cy="35" r="5" className="logo-node--primary" />
        <circle cx="70" cy="65" r="5" className="logo-node--secondary" />
        <circle cx="50" cy="50" r="4" fill="#fff" />

        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" className="logo-stop--primary" />
            <stop offset="100%" className="logo-stop--secondary" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
