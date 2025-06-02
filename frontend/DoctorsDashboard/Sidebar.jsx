import React from 'react';
import { Link } from 'react-router-dom';

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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="text-2xl font-bold p-5 text-center text-blue-600 border-b">
            Doctor Panel
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-4 space-y-2 text-gray-800">
            <SidebarLink icon="🏠" label="Dashboard" to="/" />
            <SidebarLink icon="👥" label="My Patients" to="/patients" />
            <SidebarLink icon="📅" label="Appointments" to="/appointments" />
            <SidebarLink icon="📝" label="Prescriptions" to="/prescriptions" />
            <SidebarLink icon="🧪" label="Lab Reports" to="/lab-reports" />
            <SidebarLink icon="📊" label="Analytics" to="/analytics" />
          </nav>
        </div>

        {/* Optional Footer */}
        <div className="p-4 border-t text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} MedPortal
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default Sidebar;
