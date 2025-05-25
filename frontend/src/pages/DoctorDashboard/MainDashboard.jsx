import React, { useState } from 'react';
import Sidebar from '.Sidebar';
import Navbar from '.Navbar';

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
        <div className="shadow-md bg-white p-4 flex items-center justify-between md:justify-end">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-blue-600 text-white px-4 py-2 rounded"
          >
            ☰ Menu
          </button>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
         

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-xl font-semibold text-blue-600">📅 Today's Appointments</h2>
              <p className="text-gray-600 mt-2">You have 5 appointments scheduled today.</p>
            </div>

            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-xl font-semibold text-green-600">🧍‍♂️ New Patients</h2>
              <p className="text-gray-600 mt-2">3 new patients have registered.</p>
            </div>

            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-xl font-semibold text-purple-600">💬 Messages</h2>
              <p className="text-gray-600 mt-2">2 unread messages from patients.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
