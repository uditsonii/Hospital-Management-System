import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctor/appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAppointments(data.appointments || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600 text-lg font-semibold">
        Loading appointments...
      </div>
    );

  if (error)
    return (
      <p className="text-red-600 text-center text-lg font-semibold mt-10">{error}</p>
    );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />
 
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-wide">
        🩺 My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-10">
          No appointments found
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.84 4.356v3.566L12 21l-7-3v-3.566a12.083 12.083 0 01.84-4.356L12 14z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{appt.name}</h3>
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {appt.date ? new Date(appt.date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Time:</span> {appt.time || "N/A"}
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  appt.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : appt.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {appt.status
                  ? appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
      </div>
  );
};

export default DoctorAppointments;
