import React, { useEffect, useState } from 'react';
import PatientPanel from './PatientPanel';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <div className="shadow-md bg-white p-4 flex items-center justify-between md:justify-end">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-blue-600 text-white px-4 py-2 rounded"
          >
            ☰ Menu
          </button>
        </div>
        <Navbar />
        <main className="p-4">
          <PatientPanel />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
