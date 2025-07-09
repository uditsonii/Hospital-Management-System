import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import MainDashboard from "../pages/DoctorsDashboard/Mainpanel";
// import DoctorAppointments from "../pages/DoctorsDashboard/DoctorAppointments";
// import DoctorProfile from "../pages/DoctorsDashboard/DoctorProfile";

//  Lazy load individual pages
const MainDashboard = lazy(() => import("../pages/DoctorsDashboard/Mainpanel"));
const DoctorAppointments = lazy(() =>
  import("../pages/DoctorsDashboard/DoctorAppointments")
);
const DoctorProfile = lazy(() =>
  import("../pages/DoctorsDashboard/DoctorProfile")
);

const DoctorDashboardRoute = () => (
  <Suspense fallback={<div className="p-10 text-center">Loading OPD...</div>}>
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/appointments" element={<DoctorAppointments />} />
      <Route
        path="/patients"
        element={<div>Patients Component Coming Soon</div>}
      />
      <Route
        path="/prescriptions"
        element={<div>Prescriptions Component Coming Soon</div>}
      />
      <Route
        path="/lab-reports"
        element={<div>Lab Reports Component Coming Soon</div>}
      />
      <Route
        path="/analytics"
        element={<div>Analytics Component Coming Soon</div>}
      />
      <Route path="/profile" element={<DoctorProfile />} />
    </Routes>
  </Suspense>
);

export default DoctorDashboardRoute;
