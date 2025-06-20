import React, { useState, useEffect, useContext } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { OpdNotificationContext } from "../Context/OpdNotifications.context";

const OPDNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // default

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user._id || "";
  const userName = user.name || "OPD User";
  const userEmail = user.email || "user@opdclinic.com";

  //search patient for pid by name, mobile_noh
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleCloseDropdown = (e) => {
      const dropdown = document.getElementById('search-dropdown-container');
      if(dropdown && !dropdown.contains(e.target)){
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleCloseDropdown);
    return () => document.removeEventListener('mousedown', handleCloseDropdown);
   }, [])

  const handleSearch = async (e) => {
    setIsOpen(true);
    try {
      // console.log(query);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/opd/search?query=${query}`
      );
      const data = await res.json();
      // console.log(data);
      setResults(data.data);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  const { notificationCountContext } = useContext(OpdNotificationContext);

  useEffect(() => {
    setNotificationCount(notificationCountContext);
  }, [notificationCountContext]);

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

        {/* Center Section: Search */}
        <div className="flex-1 mx-6 hidden md:block">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search patients, doctors..."
            className="w-full px-5 py-2 text-gray-700 text-sm bg-white border border-blue-200 rounded-full shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
          />
        </div>
        <button onClick={handleSearch}>Search</button>
        {/* dropdown */}
        {isOpen && (
          <div id="search-dropdown-container" className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
          {/* Trending Searches */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">SEARCH PATIENTS</h3>
            <div className="mt-4">
              {results.length > 0
                ? results.map((patient, index) => (
                    <div
                      key={index}
                      className="p-4 mb-2 bg-gray-100 rounded shadow-sm"
                    >
                      <p>
                        <strong>Name:</strong> {patient.name}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {patient.mobile_no}
                      </p>
                      <p>
                        <strong>PID:</strong> {patient.pid}
                      </p>
                    </div>
                  ))
                : query && (
                    <p className="text-gray-500 mt-2">No patients found.</p>
                  )}
            </div>
          </div>
          </div>
        )}

        {/* Right Section: Notifications + Profile */}
        <div className="flex items-center gap-4 relative">
          {/* Notification Icon */}
          <Link
            to="/opd/opd-requests"
            className="relative text-blue-700 hover:text-blue-900 transition"
            title="Appointment Requests"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {notificationCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
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
                  <p className="text-sm font-semibold text-blue-800 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-blue-500 truncate">{userEmail}</p>
                </div>

                <Link
                  to={`/profile/${userId}`}
                  className="block px-4 py-3 text-sm text-blue-700 hover:bg-blue-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  👤 Profile
                </Link>

                <div className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2 transition rounded-b-lg">
                  🔓 <Logout />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-6 pb-4 bg-blue-50">
        <input
          type="text"
          value={query}
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-700 text-sm bg-white rounded-full placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </header>
  );
};

export default OPDNavbar;
