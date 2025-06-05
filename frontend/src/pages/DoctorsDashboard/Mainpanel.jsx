import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-72'}`}>
        
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="p-6 md:p-10 space-y-10 text-base md:text-lg">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">📅 Today's Appointments</h2>
              <p className="text-gray-700 mt-2">
                You have <strong>5</strong> appointments scheduled today.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-600 mb-2">🧍‍♂️ New Patients</h2>
              <p className="text-gray-700 mt-2">
                <strong>3</strong> new patients have registered.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-600 mb-2">💬 Messages</h2>
              <p className="text-gray-700 mt-2">
                <strong>2</strong> unread messages from patients.
              </p>
            </div>
          </section>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
