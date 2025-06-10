import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LogOut } from 'lucide-react';
import Logout from '../../components/Logout';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [doctorMenuOpen, setDoctorMenuOpen] = useState(false);
  const [appointmentMenuOpen, setAppointmentMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
    const [departmentMenuOpen, setDepartmentMenuOpen] = useState(false);
    const [patientMenuOpen, setPatientMenuOpen] = useState(false);
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
          <div className="text-xl font-bold p-4 text-center text-blue-500 border-b">
            <Link to={"/"}>Admin Panel</Link>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <SidebarLink icon="🏠" label="Dashboard" to="/admin-dashboard" />
            <SidebarLink icon="👥" label="Manage Patients" to="/admin/managepatients" />
 <CollapsibleMenu
              label="Departments"
              icon="🏥"
              isOpen={departmentMenuOpen}
              toggleOpen={() => setDepartmentMenuOpen(!departmentMenuOpen)}
              links={[
                { icon: "➕", label: "Add New Department", to: "/admin/adddepartment" },
                { icon: "📋", label: "View Departments", to: "/admin/departments" },
              ]}
            />
            
            <CollapsibleMenu
              label="Manage Doctors"
              icon="🧑‍⚕️"
              isOpen={doctorMenuOpen}
              toggleOpen={() => setDoctorMenuOpen(!doctorMenuOpen)}
              links={[
                { icon: "➕", label: "Add Doctor", to: "/admin/adddoctor" },
                { icon: "📋", label: "View Doctors", to: "/admin/viewdoctor" },
                { icon: "📅", label: "Doctor Schedule", to: "/doctordetails" },
              ]}
            />

            <CollapsibleMenu
              label="Appointments"
              icon="📆"
              isOpen={appointmentMenuOpen}
              toggleOpen={() => setAppointmentMenuOpen(!appointmentMenuOpen)}
              links={[
                { icon: "📖", label: "All Appointments", to: "/admin/appointments" },
                { icon: "⏳", label: "Upcoming Appointments", to: "/admin/upcoming" },
              ]}
            />

            <SidebarLink icon="🛏️" label="OPD" to="/admin/opd" />
            <SidebarLink icon="🧪" label="Lab Reports" to="/admin/labreport" />

            <CollapsibleMenu
              label="Reports & Analytics"
              icon="📈"
              isOpen={reportMenuOpen}
              toggleOpen={() => setReportMenuOpen(!reportMenuOpen)}
              links={[
                { icon: "📊", label: "Doctor-Earning", to: "/admin/doctor-earning" },
              ]}
            />
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
      </aside>
    </>
  );
};

const SidebarLink = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 text-gray-700 text-sm hover:bg-blue-100 rounded cursor-pointer"
  >
    <span className="text-base">{icon}</span>
    <span>{label}</span>
  </Link>
);

const CollapsibleMenu = ({ icon, label, isOpen, toggleOpen, links }) => (
  <div>
    <div
      onClick={toggleOpen}
      className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-blue-100 rounded cursor-pointer text-sm"
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </div>
      {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
    </div>
    {isOpen && (
      <div className="ml-6 mt-1 space-y-1">
        {links.map((link, index) => (
          <SidebarLink key={index} icon={link.icon} label={link.label} to={link.to} />
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
