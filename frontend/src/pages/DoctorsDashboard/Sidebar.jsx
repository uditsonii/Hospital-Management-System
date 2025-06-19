import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from '../../components/Logout';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="text-xl font-bold p-6 text-center text-blue-600 border-b">
            <Link to={"/"}>Doctor Panel</Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-5 space-y-3 text-gray-800 text-sm">
            <SidebarLink icon="🏠" label="Dashboard" to="/doctor-dashboard" />
            <SidebarLink icon="👥" label="My Patients" to="/patients" />
            <SidebarLink icon="📅" label="Appointments" to="/doctor-dashboard/appointments" />
            <SidebarLink icon="📝" label="Prescriptions" to="/prescriptions" />
            <SidebarLink icon="🧪" label="Lab Reports" to="/lab-reports" />
            <SidebarLink icon="📊" label="Analytics" to="/analytics" />
            <SidebarLink icon="👤" label="Profile" to="/doctor-dashboard/profile" />
             <hr className="my-2 border-t border-gray-300" />

            {/* ✅ Styled logout like sidebar link with hover */}
            <div className="ml-2">
              <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-blue-100 rounded cursor-pointer transition">
                <span className="text-lg">🔓</span>
                <Logout />
              </div>
              </div>
          </nav>
        </div>

        {/* Optional Footer */}
        <div className="p-4 border-t text-sm text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Jeevan Jyoti Hospital. All rights reserved.
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ icon, label, to }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
       ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`
    }
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </NavLink>
);

export default Sidebar;
