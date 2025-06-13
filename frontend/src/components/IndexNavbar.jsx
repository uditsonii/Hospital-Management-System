// src/components/IndexNavbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

const IndexNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-[var(--transition-speed)] ${
      isActive
        ? 'bg-[var(--accent-start)] text-[var(--text-light)] shadow-sm'
        : 'text-[var(--text-light)] hover:bg-[var(--primary-end)] hover:bg-opacity-90 hover:shadow-sm hover:text-[var(--text-light)]'
    }`;

  return (
    <nav className="bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center text-[var(--text-light)]">
            <FaHeartbeat className="h-10 w-10 mr-2" />
            <span className="font-bold text-2xl tracking-tight">Jeevan Jyoti Hospital</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
            <NavLink to="/opd" className={navLinkClass}>Patient OPD</NavLink>
            <NavLink
              to="/login"
              className="ml-4 px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-[var(--primary-start)] bg-[var(--text-light)] hover:bg-opacity-95 transition-colors duration-[var(--transition-speed)] whitespace-nowrap"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-[var(--text-light)] hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
<div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
  <div className="px-0 pt-3 pb-5 space-y-3 overflow-x-hidden">
    <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
    <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About Us</NavLink>
    <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
    <NavLink
      to="/opd"
      className={`${navLinkClass} whitespace-nowrap`}
      onClick={() => setIsOpen(false)}
    >
      Patient OPD
    </NavLink>
    <NavLink
      to="/login"
      className="w-fit block px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-[var(--primary-start)] bg-[var(--text-light)] hover:bg-opacity-95 transition-colors duration-[var(--transition-speed)]"
      onClick={() => setIsOpen(false)}
    >
      Login
    </NavLink>
  </div>
</div>
    </nav>
  );
};

export default IndexNavbar;
