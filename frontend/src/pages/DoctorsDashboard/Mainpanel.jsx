import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom'; // ✅ Add this

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Top bar */}
        <div className="shadow-md bg-white p-6 flex items-center justify-between md:justify-end">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-blue-600 text-white px-6 py-3 rounded text-lg"
          >
            ☰ Menu
          </button>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="p-10 space-y-10 text-lg">
          <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-8">
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">📅 Today's Appointments</h2>
              <p className="text-gray-700 mt-2 text-lg">
                You have <strong>5</strong> appointments scheduled today.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-8">
              <h2 className="text-3xl font-semibold text-green-600 mb-4">🧍‍♂️ New Patients</h2>
              <p className="text-gray-700 mt-2 text-lg">
                <strong>3</strong> new patients have registered.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-8">
              <h2 className="text-3xl font-semibold text-purple-600 mb-4">💬 Messages</h2>
              <p className="text-gray-700 mt-2 text-lg">
                <strong>2</strong> unread messages from patients.
              </p>
            </div>
          </section>

          {/* 🔽 Here is the outlet for nested routes like /appointments */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
