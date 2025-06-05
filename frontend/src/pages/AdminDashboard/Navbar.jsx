import Logout from '../../components/Logout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user._id || '';

  return (
  <header className="bg-white shadow px-4 py-3 w-full">
      <div className="flex items-center justify-between gap-4">
        {/* Sidebar toggle for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-600 text-white px-3 py-2 rounded"
        >
          ☰
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.30Yq02E10j8tn6kKBO1qdQHaHa&pid=Api&P=0&h=180"
            alt="Profile"
            className="w-10 h-10 rounded-full border cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
  <div
    className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md border z-50"
    onMouseLeave={() => setDropdownOpen(false)}
  >
    <Link
      to={`profile/${userId}`}
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
      </div>
    </header>
  );
};

export default Navbar;
