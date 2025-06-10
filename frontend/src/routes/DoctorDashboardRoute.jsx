// DoctorDashboardRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainDashboard from "../pages/DoctorsDashboard/Mainpanel";
import DoctorAppointments from "../pages/DoctorsDashboard/DoctorAppointments";
import AuthCheck from "../components/AuthCheck";
import DoctorProfile from "../pages/DoctorsDashboard/DoctorProfile";

const DoctorDashboardRoute = () => (
  <Routes>
    <Route path="/" element={<AuthCheck><MainDashboard /></AuthCheck>}/>
      <Route path="appointments" element={<DoctorAppointments />} />
      <Route path="patients" element={<div>Patients Component Coming Soon</div>} />
      <Route path="prescriptions" element={<div>Prescriptions Component Coming Soon</div>} />
      <Route path="lab-reports" element={<div>Lab Reports Component Coming Soon</div>} />
      <Route path="analytics" element={<div>Analytics Component Coming Soon</div>} />
      <Route path="profile" element={<DoctorProfile/>} />
    
  </Routes>
);

export default DoctorDashboardRoute;
