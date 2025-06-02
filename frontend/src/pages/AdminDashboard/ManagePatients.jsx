import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const ManagePatients = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />

        </div>
    </div>
  );
};

export default ManagePatients;
