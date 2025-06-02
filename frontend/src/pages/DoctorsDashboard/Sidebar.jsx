import React from 'react';
import { NavLink } from 'react-router-dom';

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
          <div className="text-3xl font-bold p-8 text-center text-blue-600 border-b">
            Doctor Panel
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 space-y-4 text-gray-800 text-lg">
           <SidebarLink icon="🏠" label="Dashboard" to="/" />
          <SidebarLink icon="👥" label="My Patients" to="/patients" />
          <SidebarLink icon="📅" label="Appointments" to="/appointments" />
          <SidebarLink icon="📝" label="Prescriptions" to="/prescriptions" />
          <SidebarLink icon="🧪" label="Lab Reports" to="/lab-reports" />
          <SidebarLink icon="📊" label="Analytics" to="/analytics" />
          <SidebarLink icon="👤" label="Profile" to="/profile" />

          </nav>
        </div>

        {/* Optional Footer */}
        <div className="p-6 border-t text-base text-gray-600 text-center">
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
      `flex items-center gap-4 px-4 py-3 rounded-md transition-colors duration-200
       ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`
    }
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-lg font-medium">{label}</span>
  </NavLink>
);

export default Sidebar;
