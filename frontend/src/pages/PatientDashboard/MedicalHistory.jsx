import React from 'react'
import Sidebar from './Sidebar';

const MedicalHistory = () => {
  return (
        <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div>
      <h1>Medical History</h1>
    </div>
     </div>
  )
}

export default MedicalHistory
