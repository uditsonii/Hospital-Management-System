import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthCheck from "../components/AuthCheck";

import MainDashboard from "../pages/DoctorsDashboard/Mainpanel";
import DoctorAppointments from "../pages/DoctorsDashboard/DoctorAppointments";

const DoctorDashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthCheck>
            <MainDashboard />
          </AuthCheck>
        }
      >
        <Route index element={<div>Welcome to Doctor Dashboard</div>} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<div>Patients Component Coming Soon</div>} />
        <Route path="prescriptions" element={<div>Prescriptions Component Coming Soon</div>} />
        <Route path="lab-reports" element={<div>Lab Reports Component Coming Soon</div>} />
        <Route path="analytics" element={<div>Analytics Component Coming Soon</div>} />
        <Route path="profile" element={<div>Profile Component Coming Soon</div>} />
      </Route>
    </Routes>
  );
};

export default DoctorDashboardRoutes;