import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. John Doe",
    department: "Cardiology",
    date: "2025-06-10",
    time: "10:30",
    status: "Confirmed",
    email: "john.doe@hospital.com",
    phone: "+91-9876543210",
    details: "Routine heart check-up. Please fast for 12 hours before appointment.",
  },
  {
    id: 2,
    doctor: "Dr. Jane Smith",
    department: "Neurology",
    date: "2025-06-12",
    time: "15:00",
    status: "Pending",
    email: "jane.smith@hospital.com",
    phone: "+91-9123456789",
    details: "Consultation for migraine headaches.",
  },
  // Add more appointments if needed
];


const UpcomingAppointments = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(upcomingAppointments);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFiltered(
      upcomingAppointments.filter(
        (appt) =>
          appt.doctor.toLowerCase().includes(lowerSearch) ||
          appt.department.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-grow bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-8 flex items-center gap-3">
              📅 Upcoming Appointments
            </h1>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by doctor or department..."
              className="w-full max-w-md p-3 mb-8 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Appointments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.length === 0 && (
                <p className="text-gray-600 col-span-full">No appointments found.</p>
              )}

              {filtered.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-blue-900 mb-1">{appt.doctor}</h2>
                    <p className="text-sm text-blue-600 font-medium">{appt.department}</p>
                  </div>

                  <div className="mt-4 space-y-2 text-gray-700">
                    <p>
                      <strong>Date:</strong>{" "}
                      <span className="text-blue-800 font-semibold">{appt.date}</span>
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      <span className="text-blue-800 font-semibold">{appt.time}</span>
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          appt.status === "Confirmed"
                            ? "bg-green-200 text-green-800"
                            : appt.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </p>

                   
                  </div>

                  <button
                    onClick={() => setSelected(appt)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">{selected.doctor}</h2>
              <p className="text-sm text-gray-600 mb-4 italic">{selected.department}</p>
              <p className="mb-4 text-gray-800">{selected.details}</p>

              <div className="space-y-1 text-gray-700 text-sm">
                <p>
                  <strong>Contact:</strong> {selected.phone} |{" "}
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selected.email}
                  </a>
                </p>
                <p>
                  <strong>Date & Time:</strong> {selected.date} at {selected.time}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <style>
          {`
            @keyframes fadeIn {
              from {opacity: 0; transform: translateY(10px);}
              to {opacity: 1; transform: translateY(0);}
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease forwards;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
