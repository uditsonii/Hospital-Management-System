
import Logout from '../../components/Logout';
import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow px-12 py-6 flex items-center justify-between w-full z-40">
      {/* Left: Branding or page title */}
      <div className="text-3xl font-semibold text-blue-600">
        Welcome Dr. John Doe 👋
      </div>

      {/* Center: Search bar */}
      <div className="w-full max-w-lg mx-6 hidden md:block">
        <input
          type="text"
          placeholder="Search patients, reports..."
          className="w-full px-5 py-3 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right: Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9703/9703072.png"
          alt="Doctor Profile"
          className="w-14 h-14 rounded-full border cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg border z-50 animate-fade-in-up">
            <div className="px-6 py-4 border-b text-base text-gray-700">
              Hello, Doctor 👋
            </div>
            <a
              href="/profile"
              className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
            >
              View Profile
            </a>
            <Logout />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
