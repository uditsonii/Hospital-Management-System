import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import LabReports from "../pages/PatientDashboard/LabReports";
// import MedicalHistory from "../pages/PatientDashboard/MedicalHistory";
// import Appointments from "../pages/PatientDashboard/Appointments";
// import BookAppointment from "../pages/PatientDashboard/BookAppointment";
// import MainDashboard from "../pages/PatientDashboard/MainDashboard";
// import PatientProfile from "../pages/PatientDashboard/PatientProfile";
// import ProfilePage from "../pages/PatientDashboard/ProfilePage";

//  Lazy load individual pages
const MainDashboard = lazy(() => import("../pages/PatientDashboard/MainDashboard"));
const LabReports = lazy(() => import("../pages/PatientDashboard/LabReports"));
const MedicalHistory = lazy(() => import("../pages/PatientDashboard/MedicalHistory"));
const Appointments = lazy(() => import("../pages/PatientDashboard/Appointments"));
const BookAppointment = lazy(() => import("../pages/PatientDashboard/BookAppointment"));
const PatientProfile = lazy(() => import("../pages/PatientDashboard/PatientProfile"));
const ProfilePage = lazy(() => import("../pages/PatientDashboard/ProfilePage"));

const PatientDashboardRoutes = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading OPD...</div>}>
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/lab-reports" element={<LabReports />} />
      <Route path="/medical-history" element={<MedicalHistory />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/profile/:id" element={<PatientProfile />} />
      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
    </Suspense>
  );
};
export default PatientDashboardRoutes;
