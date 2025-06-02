// src/pages/ProfilePage.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PatientProfile from './PatientProfile';
import { useState } from 'react';

const ProfilePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  
  return (
     <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Navbar with sidebar toggle passed as prop */}
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 ">
          <PatientProfile />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
