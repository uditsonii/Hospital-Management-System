import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";
import Logout from '../../components/Logout';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("hello");
    <Logout />
  }
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className="text-2xl font-bold p-4 text-center text-blue-500 border-b">
            Patient Panel
          </div>
          <nav className="flex flex-col p-4 space-y-3">
            <SidebarLink icon="🏠" label="Dashboard" to="/patient-dashboard" />
            <SidebarLink icon="📅" label="Upcoming Appointments" to="/patient-dashboard/appointments" />
            <SidebarLink icon="🧪" label="Lab Reports" to="/patient-dashboard/lab-reports" />
            <SidebarLink icon="🧾" label="Medical History" to="/patient-dashboard/medical-history" />
           <SidebarLink icon="📅" label="Book Appointment" to="/patient-dashboard/book-appointment" />
           <SidebarLink icon={ <BiLogOutCircle />} label="Log Out" to="/"/>
           {/* <button onClick={handleLogout} >Logout</button> */}
           <Logout />
          </nav>
        </div>
      </aside>
    </>
  );
};
const SidebarLink = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-100 rounded cursor-pointer"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{label}</span>
  </Link>
);

export default Sidebar;
