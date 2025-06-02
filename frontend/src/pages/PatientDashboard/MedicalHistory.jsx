import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from  './Navbar'
const medicalHistory = [
  {
    reason: "Fever and Cold",
    doctorName: "Dr. Priya Sharma",
    date: "2025-04-22T15:30:00",
    notes: "Advised rest and hydration. Prescribed medicine.",
    prescription: "Paracetamol 500mg, Cetrizine"
  },
  {
    reason: "Back Pain",
    doctorName: "Dr. Manish Gupta",
    date: "2025-03-10T11:00:00",
    notes: "Physiotherapy suggested. No medication prescribed.",
    prescription: ""
  },
  {
    reason: "Annual Checkup",
    doctorName: "Dr. Neha Verma",
    date: "2024-12-05T10:00:00",
    notes: "Vitals normal. No issues found.",
    prescription: ""
  }
];

const MedicalHistory = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
  <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Header */}
        <div className="p-6 md:p-10">
          <h2 className="text-4xl font-extrabold text-sky-800 mb-4 text-center md:text-left">
            🩺 Medical History
          </h2>
          <p className="text-lg text-sky-600 mb-8 text-center md:text-left">
            Track your past appointments and medical notes.
          </p>

          {/* Strips */}
          <div className="space-y-6">
            {medicalHistory.map((visit, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg border-l-4 border-sky-500 p-6 hover:shadow-xl transition-shadow"
              >
                {/* Top Row: Reason and Doctor */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h3 className="text-2xl font-semibold text-sky-800">
                    {visit.reason || "General Visit"}
                  </h3>
                  <p className="text-sky-500 font-medium text-sm mt-2 md:mt-0">
                    👨‍⚕️ <span className="text-sky-700">{visit.doctorName}</span>
                  </p>
                </div>

                {/* Details */}
                <div className="text-sky-700 text-[15px] space-y-2">
                  <p>
                    <strong className="text-sky-900">📅 Date & Time:</strong>{" "}
                    {new Date(visit.date).toLocaleString()}
                  </p>
                  <p>
                    <strong className="text-sky-900">📝 Notes:</strong> {visit.notes || "No notes provided"}
                  </p>
                  {visit.prescription && (
                    <p>
                      <strong className="text-sky-900">💊 Prescription:</strong> {visit.prescription}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
