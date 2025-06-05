import React, { useState } from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const OPDNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user._id || '';
  const userName = user.name || 'OPD User';
  const userEmail = user.email || 'user@opdclinic.com';
  return (
    <header className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-md sticky top-0 z-50 border-b border-blue-200">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Left Section: OPD Branding + Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-blue-200 hover:bg-blue-300 text-blue-700 px-3 py-2 rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide select-none">
            OPD System
          </h1>
        </div>

        {/* Center Section: Search bar (only on md+) */}
        <div className="flex-1 mx-6 hidden md:block">
          <input
            type="text"
            placeholder="Search patients, doctors..."
            className="w-full px-5 py-2 text-gray-700 text-sm bg-white border border-blue-200 rounded-full shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
          />
        </div>

        {/* Right Section: Profile Dropdown */}
        <div className="relative">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.30Yq02E10j8tn6kKBO1qdQHaHa&pid=Api&P=0&h=180"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer shadow-md hover:ring-4 hover:ring-blue-300 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-blue-200 z-50"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-4 py-3 border-b border-blue-100 bg-blue-50 rounded-t-lg">
                <p className="text-sm font-semibold text-blue-800 truncate">{userName}</p>
                <p className="text-xs text-blue-500 truncate">{userEmail}</p>
              </div>

              <Link
                to={`/profile/${userId}`}
                className="block px-4 py-3 text-sm text-blue-700 hover:bg-blue-100 transition"
                onClick={() => setDropdownOpen(false)}
              >
                👤 Profile
              </Link>

              <div
                className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2 transition rounded-b-lg"
                onClick={() => {
                  setDropdownOpen(false);
                }}
              >
                🔓 <Logout />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-6 pb-4 bg-blue-50">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-700 text-sm bg-white rounded-full placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>
    </header>
  );
};

export default OPDNavbar;
