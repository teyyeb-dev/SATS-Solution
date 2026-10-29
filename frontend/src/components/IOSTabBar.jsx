import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', icon: 'ti-home', label: 'Home', end: true },
  { to: '/work', icon: 'ti-briefcase', label: 'Work' },
  { to: '/blog', icon: 'ti-file-text', label: 'Insights' },
  { to: '/careers', icon: 'ti-users', label: 'Careers' },
  { to: '/contact', icon: 'ti-mail', label: 'Contact' },
];

/**
 * iOS-style bottom tab bar. Rendered on small screens only (CSS decides),
 * so it reads like the primary navigation of a native app.
 */
const IOSTabBar = () => (
  <nav className="ios-tabbar" aria-label="Primary">
    {tabs.map((tab) => (
      <NavLink
        key={tab.to}
        to={tab.to}
        end={tab.end}
        className={({ isActive }) => `ios-tab${isActive ? ' active' : ''}`}
      >
        <i className={`ti ${tab.icon}`} aria-hidden="true" />
        <span>{tab.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default IOSTabBar;
