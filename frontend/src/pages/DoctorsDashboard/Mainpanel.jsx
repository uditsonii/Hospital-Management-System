import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import DoctorPanel from './DoctorPanel'; // Assuming you have a PatientPanel component
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
         <main className="p-4">
                  <DoctorPanel />
                </main>
      </div>
    </div>
  );
};

export default MainDashboard;
