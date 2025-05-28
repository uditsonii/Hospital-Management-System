import React, { useState } from 'react';
import Sidebar from './Sidebar';

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

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full md:ml-64">
        {/* Mobile Toggle Button */}
        <div className="md:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ☰
          </button>
        </div>

        {/* Page Header */}
        <div className="p-4 sm:p-6 md:p-10">
          <h2 className="text-4xl font-extrabold text-sky-700 mb-4 text-center md:text-left">
            🩺 Medical History
          </h2>
          <p className="text-sky-600 text-center md:text-left text-lg mb-10">
            View your complete medical history below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {medicalHistory.map((visit, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold text-sky-800">
                    {visit.reason || "General Visit"}
                  </h3>
                  <span className="text-sm text-sky-500">
                    {new Date(visit.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-3 text-sky-700 text-sm leading-relaxed">
                  <p>
                    <strong className="text-sky-900">👨‍⚕️ Doctor:</strong> {visit.doctorName}
                  </p>
                  <p>
                    <strong className="text-sky-900">📅 Date & Time:</strong>{" "}
                    {new Date(visit.date).toLocaleString()}
                  </p>
                  <p>
                    <strong className="text-sky-900">📝 Notes:</strong>{" "}
                    {visit.notes || "No notes provided"}
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
