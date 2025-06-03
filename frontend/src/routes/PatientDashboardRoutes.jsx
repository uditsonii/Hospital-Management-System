import { Routes, Route } from "react-router-dom";
import LabReports from "../pages/PatientDashboard/LabReports";
import MedicalHistory from "../pages/PatientDashboard/MedicalHistory";
import Appointments from "../pages/PatientDashboard/Appointments";
import BookAppointment from "../pages/PatientDashboard/BookAppointment";
import React from "react";
import MainDashboard from "../pages/PatientDashboard/MainDashboard";
import AuthCheck from "../components/AuthCheck";
import PatientProfile from "../pages/PatientDashboard/PatientProfile";
import ProfilePage from "../pages/PatientDashboard/ProfilePage";

const PatientDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/lab-reports" element={<LabReports />} />
      <Route path="/medical-history" element={<MedicalHistory />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/profile/:id" element={<PatientProfile />} />

      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  );
};
export default PatientDashboardRoutes;
