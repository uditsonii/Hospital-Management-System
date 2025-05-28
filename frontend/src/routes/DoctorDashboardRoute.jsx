import { Routes, Route } from "react-router-dom";
import AuthCheck from "../components/AuthCheck";
import MainDashboard from "../pages/DoctorDashboard/MainDashboard";
import Sidebar from "../pages/DoctorDashboard/Sidebar";
import Navbar from "../pages/DoctorDashboard/Navbar";

const DoctorDashboardRoute = () => {
  return (
    <AuthCheck>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        {/* Add more nested routes below as needed */}
        {/* <Route path="appointments" element={<Appointments />} /> */}
      </Routes>
    </AuthCheck>
  );
};

export default DoctorDashboardRoute;
