import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

const IndexNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-300 ${
      isActive
        ? 'bg-white text-blue-700 shadow'
        : 'text-white hover:bg-blue-600 hover:shadow'
    }`;

  return (
    <nav
      className={`bg-gradient-to-r from-blue-700 to-sky-800 shadow-md sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center text-white">
            <FaHeartbeat className="h-8 w-8 mr-2" />
            <span className="font-bold text-2xl">Jeevan Jyoti Hospital</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
            <NavLink to="/opd" className={navLinkClass}>Patient OPD</NavLink>
            <NavLink
              to="/login"
              className={navLinkClass}
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col bg-blue-700 px-6 py-4 space-y-3 text-white">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
          <NavLink to="/opd" className={navLinkClass} onClick={() => setIsOpen(false)}>Patient OPD</NavLink>
          <NavLink
            to="/login"
            className={navLinkClass}
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
