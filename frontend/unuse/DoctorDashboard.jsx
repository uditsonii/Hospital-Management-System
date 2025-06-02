import React, { useState } from "react";
import Sidebar from "../src/pages/DoctorsDashboard/Sidebar";
import { FaFlask, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const today = `${year}-${month}-${day}`;

  const upcomingVisits = [2];
  const labReports = [1, 2, 3, 4, 5];
  const pastVisits = [1, 2, 3];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with toggle state */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content with margin on medium+ screens */}
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        {/* Mobile hamburger */}
        <button
          className="md:hidden mb-4 px-3 py-2 bg-blue-600 text-white rounded-md"
          onClick={toggleSidebar}
        >
          ☰ Menu
        </button>

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-2">
            👋 Welcome Back, Doctor!
          </h1>
          <br />
          <p className="text-gray-600 mt-2 ml-9 text-lg">
            Here's your health summary at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center">
          <Link
            to="/appointments"
            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer overflow-visible w-72"
          >
            <div className="flex items-center gap-4">
              <FaCalendarAlt className="text-blue-500 text-4xl" />
              <div>
                <p className="text-gray-600 font-bold">Appointments</p>
                <h2 className="text-2xl font-bold">{upcomingVisits.length}</h2>
              </div>
            </div>
          </Link>

          <Link
            to="/lab-reports"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer w-72"
          >
            <div className="flex items-center gap-4">
              <FaFlask className="text-green-500 text-4xl" />
              <div>
                <p className="text-gray-600 font-bold">Lab Reports</p>
                <h2 className="text-2xl font-bold">{labReports.length}</h2>
              </div>
            </div>
          </Link>

          <Link
            to="/medical-history"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer w-72"
          >
            <div className="flex items-center gap-4">
              <FaNotesMedical className="text-purple-500 text-4xl" />
              <div>
                <p className="text-gray-600 font-bold">Past Visits</p>
                <h2 className="text-2xl font-bold">{pastVisits.length}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-gray-700 text-lg">
          <h3 className="text-xl font-semibold mb-2">Health Tip 💡</h3>
          <p>
            Stay hydrated and follow your medication schedule. Regular checkups
            help in early detection and prevention!
          </p>
        </div>
      </div>
    </div>
  );
}
