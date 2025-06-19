import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout';

const Navbar = ({ toggleSidebar, userId = 'defaultUserId' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
    <header className="bg-white shadow px-4 md:px-8 py-3 flex items-center justify-between w-full z-40">
      {/* Left: Menu button (mobile) + Welcome */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
        >
          ☰
        </button>
        <span className="text-lg md:text-2xl font-semibold text-blue-600 whitespace-nowrap">
          Welcome Dr. John Doe 👋
        </span>
      </div>

      {/* Center: Search bar (desktop only) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <input
          type="text"
          placeholder="Search patients, reports..."
          className="w-full max-w-lg px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right: Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9703/9703072.png"
          alt="Doctor Profile"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
        />

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md border z-50"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to={`/profile/${userId}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span>👤</span> Profile
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
              <span>🔓</span>
              <Logout />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
