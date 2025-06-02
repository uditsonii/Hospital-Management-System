import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const dummyLabReports = [
  {
    id: 1,
    patientName: "Riya Sharma",
    testType: "Complete Blood Count (CBC)",
    reportDate: "2025-06-02",
    status: "Done",
    doctor: "Dr. Mehta",
  },
  {
    id: 2,
    patientName: "Amit Kumar",
    testType: "MRI Brain",
    reportDate: "2025-06-01",
    status: "Pending",
    doctor: "Dr. Singh",
  },
  {
    id: 3,
    patientName: "Sunita Patel",
    testType: "Blood Sugar Test",
    reportDate: "2025-05-30",
    status: "Critical",
    doctor: "Dr. Mehta",
  },
];

const statusColors = {
  Done: "bg-blue-100 text-blue-800",
  Pending: "bg-blue-50 text-blue-600",
  Critical: "bg-red-100 text-red-700",
};

const LabReports = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Counts for summary cards
  const totalReports = dummyLabReports.length;
  const doneReports = dummyLabReports.filter((r) => r.status === "Done").length;
  const pendingReports = dummyLabReports.filter((r) => r.status === "Pending").length;
  const criticalReports = dummyLabReports.filter((r) => r.status === "Critical").length;

  return (
    <div className="min-h-screen flex bg-blue-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-blue-900 mb-6">🧪 Lab Reports</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">{totalReports}</p>
                <p className="text-blue-600 mt-1">Total Reports</p>
              </div>
              <div className="bg-blue-100 p-5 rounded-lg shadow-sm flex flex-col items-center border border-blue-200">
                <p className="text-2xl font-bold text-blue-800">{doneReports}</p>
                <p className="text-blue-700 mt-1">Completed</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg shadow-sm flex flex-col items-center border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">{pendingReports}</p>
                <p className="text-blue-600 mt-1">Pending</p>
              </div>
              <div className="bg-red-100 p-5 rounded-lg shadow-sm flex flex-col items-center border border-red-200">
                <p className="text-2xl font-bold text-red-700">{criticalReports}</p>
                <p className="text-red-600 mt-1">Critical</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 border border-blue-100">
              <input
                type="text"
                placeholder="Search by Patient Name or Test Type"
                className="border border-blue-200 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <select className="border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Filter by Status</option>
                <option value="Done">Done</option>
                <option value="Pending">Pending</option>
                <option value="Critical">Critical</option>
              </select>
              <input
                type="date"
                className="border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Lab Reports Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-blue-100">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Patient Name</th>
                    <th className="py-3 px-6 text-left">Test Type</th>
                    <th className="py-3 px-6 text-left">Report Date</th>
                    <th className="py-3 px-6 text-left">Doctor</th>
                    <th className="py-3 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-blue-700 text-sm">
                  {dummyLabReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-blue-100 hover:bg-blue-50 cursor-pointer"
                      onClick={() => alert(`Open details for ${report.patientName}`)}
                    >
                      <td className="py-3 px-6">{report.patientName}</td>
                      <td className="py-3 px-6">{report.testType}</td>
                      <td className="py-3 px-6">{report.reportDate}</td>
                      <td className="py-3 px-6">{report.doctor}</td>
                      <td className="py-3 px-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[report.status]}`}
                        >
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReports;
