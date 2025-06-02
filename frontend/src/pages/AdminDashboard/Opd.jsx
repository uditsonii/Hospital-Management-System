import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const opdRecords = [
  {
    id: 1,
    patientName: "Anita Sharma",
    doctor: "Dr. John Doe",
    department: "Cardiology",
    type: "New",
    date: "2025-06-02",
    time: "10:30 AM",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    patientName: "Rohan Verma",
    doctor: "Dr. Jane Smith",
    department: "Neurology",
    type: "Follow-up",
    date: "2025-06-02",
    time: "11:15 AM",
    paymentStatus: "Pending",
  },
  // Add more dummy data here
];

const Opd = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
          <h1 className="text-3xl font-semibold text-blue-800 mb-6">
            📝 OPD Management
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-5 border-t-4 border-blue-400">
              <h2 className="text-blue-600 font-semibold text-xl">Today's OPDs</h2>
              <p className="text-3xl font-bold text-gray-700 mt-2">25</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-t-4 border-green-400">
              <h2 className="text-green-600 font-semibold text-xl">This Week</h2>
              <p className="text-3xl font-bold text-gray-700 mt-2">142</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-t-4 border-yellow-400">
              <h2 className="text-yellow-600 font-semibold text-xl">New Patients</h2>
              <p className="text-3xl font-bold text-gray-700 mt-2">67</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-t-4 border-purple-400">
  <h2 className="text-purple-600 font-semibold text-xl">Till Today OPDs</h2>
  <p className="text-3xl font-bold text-gray-700 mt-2">1,270</p>
</div>

          </div>

          {/* OPD Table */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100 text-blue-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Patient</th>
                  <th className="px-6 py-3 text-left">Doctor</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-left">Payment</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {opdRecords.map((opd, idx) => (
                  <tr
                    key={opd.id}
                    className={`hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
                  >
                    <td className="px-6 py-4">{opd.patientName}</td>
                    <td className="px-6 py-4">{opd.doctor}</td>
                    <td className="px-6 py-4">{opd.department}</td>
                    <td className="px-6 py-4">{opd.type}</td>
                    <td className="px-6 py-4">{opd.date}</td>
                    <td className="px-6 py-4">{opd.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          opd.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {opd.paymentStatus}
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
  );
};

export default Opd;
