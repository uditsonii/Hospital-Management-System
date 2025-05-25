// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-[var(--transition-speed)] ${
      isActive
        ? 'bg-[var(--accent-start)] text-[var(--text-light)] shadow-sm'
        : 'text-[var(--text-light)] hover:bg-[var(--primary-end)] hover:bg-opacity-90 hover:shadow-sm hover:text-[var(--text-light)]'
    }`;

  return (
    <nav className="bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-[var(--text-light)]">
              <FaHeartbeat className="h-10 w-10 mr-2" />
              <span className="font-bold text-2xl tracking-tight">Jeevan Jyoti Hospital</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-5">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
              <NavLink to="/opd" className={navLinkClass}>Patient OPD</NavLink>
              <NavLink
                to="/login"
                className="ml-4 px-5 py-2 rounded-md text-sm font-semibold tracking-wide text-[var(--primary-start)] bg-[var(--text-light)] hover:bg-opacity-95 transition-colors duration-[var(--transition-speed)]"
              >
                Login
              </NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[var(--primary-end)] inline-flex items-center justify-center p-2 rounded-md text-[var(--text-light)] hover:text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--primary-start)] focus:ring-white transition-all duration-[var(--transition-speed)]"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden transition-all duration-[var(--transition-speed)] ease-in-out`} id="mobile-menu">
        <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
          <NavLink to="/opd" className={navLinkClass} onClick={() => setIsOpen(false)}>Patient OPD</NavLink>
          <NavLink
            to="/login"
            className="block mt-4 px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-[var(--primary-start)] bg-[var(--text-light)] hover:bg-opacity-95 transition-colors duration-[var(--transition-speed)]"
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
