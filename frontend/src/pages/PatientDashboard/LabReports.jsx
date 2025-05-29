import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const labReports = [
  {
    reportName: 'Complete Blood Count (CBC)',
    doctor: 'Dr. Neha Verma',
    date: '2025-05-15',
    status: 'Available',
    fileUrl: '#',
  },
  {
    reportName: 'Liver Function Test (LFT)',
    doctor: 'Dr. Manish Gupta',
    date: '2025-05-10',
    status: 'Available',
    fileUrl: '#',
  },
  {
    reportName: 'X-Ray Chest',
    doctor: 'Dr. Priya Sharma',
    date: '2025-05-18',
    status: 'Pending',
    fileUrl: '',
  },
];

const statusColors = {
  Available: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-800',
};

export default function LabReports() {
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

        {/* Main Section */}
        <div className="p-6 md:p-10 bg-blue-50 min-h-screen">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-extrabold text-sky-700">🧪 Lab Reports</h2>
            <p className="text-sky-600 mt-2 text-base md:text-lg">
              Check your recent diagnostics and test results below.
            </p>
            <div className="mt-2 h-1 w-24 mx-auto bg-sky-300 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {labReports.map((report, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-sky-800">
                    {report.reportName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[report.status]}`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sky-700 text-sm mb-1">
                  <strong className="text-sky-900">👨‍⚕️ Doctor:</strong>{' '}
                  {report.doctor}
                </p>
                <p className="text-sky-700 text-sm mb-4">
                  <strong className="text-sky-900">📅 Date:</strong>{' '}
                  {new Date(report.date).toLocaleDateString()}
                </p>
                {report.status === 'Available' && (
                  <a
                    href={report.fileUrl}
                    className="inline-block mt-2 px-4 py-2 bg-sky-600 text-white rounded-full text-sm hover:bg-sky-700 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔍 View Report
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
