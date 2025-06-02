import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const doctorEarningsData = [
  {
    id: 1,
    name: "Dr. John Doe",
    department: "Cardiology",
    earnings: 15000,
    appointments: 45,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    department: "Neurology",
    earnings: 12000,
    appointments: 38,
  },
  {
    id: 3,
    name: "Dr. Alex Johnson",
    department: "Orthopedics",
    earnings: 9800,
    appointments: 30,
  },
  {
    id: 4,
    name: "Dr. Asha Verma",
    department: "Pediatrics",
    earnings: 13000,
    appointments: 42,
  },
  {
    id: 5,
    name: "Dr. Neha Singh",
    department: "Dermatology",
    earnings: 8700,
    appointments: 25,
  },
];

const DoctorEarnings = () => {
  // Sidebar open state (top-level)
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // When user clicks a doctor's card
  const handleCardClick = (doctor) => {
    alert(`Show details for ${doctor.name} (Coming soon)`);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="p-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorEarningsData.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => handleCardClick(doctor)}
                className="cursor-pointer bg-gradient-to-tr from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg p-6 hover:scale-[1.03] transform transition-transform"
              >
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-blue-100 font-medium mb-3">{doctor.department}</p>
                <p className="text-white/90 mb-1">
                  <span className="font-semibold">Earnings:</span> ₹{doctor.earnings.toLocaleString()}
                </p>
                <p className="text-white/90">
                  <span className="font-semibold">Appointments:</span> {doctor.appointments}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorEarnings;
