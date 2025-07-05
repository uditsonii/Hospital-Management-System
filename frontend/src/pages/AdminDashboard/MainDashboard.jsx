import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Line chart: Monthly Patient Registration
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Patients Registered",
        data: [30, 45, 60, 40, 80, 70],
        borderColor: "#1D4ED8",
        backgroundColor: "rgba(29, 78, 216, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Bar chart: Doctor-wise OPD count
  const barData = {
    labels: ["Dr. Sharma", "Dr. Patel", "Dr. Khan", "Dr. Roy"],
    datasets: [
      {
        label: "OPD Patients",
        data: [100, 85, 120, 60],
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
      },
    ],
  };

  // Doughnut chart: Gender distribution
  // const doughnutData = {
  //   labels: ['Male', 'Female', 'Other'],
  //   datasets: [
  //     {
  //       label: 'Gender',
  //       data: [55, 40, 5],
  //       backgroundColor: ['#3B82F6', '#F472B6', '#A78BFA'],
  //       hoverOffset: 6,
  //     },
  //   ],
  // };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Navbar with sidebar toggle passed as prop */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-xl font-bold mb-4">
                Monthly Patient Registrations
              </h2>
              <Line data={lineData} />
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-xl font-bold mb-4">Doctor-wise OPD Count</h2>
              <Bar data={barData} />
            </div>

            {/* <div className="md:col-span-2 bg-white p-4 shadow rounded-xl">
              <h2 className="text-xl font-bold mb-4">Gender Distribution</h2>
              <Doughnut data={doughnutData} />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
