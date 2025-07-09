import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import AddDoctor from "../pages/AdminDashboard/AddDoctors";
// import MainDashboard from "../pages/AdminDashboard/MainDashboard";
// import ViewDoctor from "../pages/AdminDashboard/ViewDoctor";
// import DoctorDetails from "../pages/AdminDashboard/DoctorDetails";
// import Profile from "../pages/AdminDashboard/Profile";
// import ViewDepartment from "../pages/AdminDashboard/ViewDepartment";
// import ManagePatients from "../pages/AdminDashboard/ManagePatients";
// import UpcomingAppointments from "../pages/AdminDashboard/UpcomingAppointments";
// import AddDepartment from "../pages/AdminDashboard/AddDepartment";
// import Opd from "../pages/AdminDashboard/Opd";
// import LabReports from "../pages/AdminDashboard/LabReports";
// import DoctorEarning from "../pages/AdminDashboard/DoctorEarning";

//  Lazy load individual pages
const MainDashboard = lazy(() =>
  import("../pages/AdminDashboard/MainDashboard")
);
const ViewDoctor = lazy(() => import("../pages/AdminDashboard/ViewDoctor"));
const AddDoctor = lazy(() => import("../pages/AdminDashboard/AddDoctors"));
const DoctorDetails = lazy(() =>
  import("../pages/AdminDashboard/DoctorDetails")
);
const Profile = lazy(() => import("../pages/AdminDashboard/Profile"));
const ViewDepartment = lazy(() =>
  import("../pages/AdminDashboard/ViewDepartment")
);
const AddDepartment = lazy(() =>
  import("../pages/AdminDashboard/AddDepartment")
);
const ManagePatients = lazy(() =>
  import("../pages/AdminDashboard/ManagePatients")
);
const UpcomingAppointments = lazy(() =>
  import("../pages/AdminDashboard/UpcomingAppointments")
);
const LabReports = lazy(() => import("../pages/AdminDashboard/LabReports"));
const DoctorEarning = lazy(() =>
  import("../pages/AdminDashboard/DoctorEarning")
);
const Opd = lazy(() => import("../pages/AdminDashboard/DoctorEarning"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading OPD...</div>}>
      <Routes>
        <Route path="/dashboard" element={<MainDashboard />} />

        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctordetails" element={<DoctorDetails />} />
        <Route path="/view-doctor" element={<ViewDoctor />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/departments" element={<ViewDepartment />} />
        <Route path="/managepatients" element={<ManagePatients />} />
        <Route path="/upcoming" element={<UpcomingAppointments />} />
        <Route path="/adddepartment" element={<AddDepartment />} />
        <Route path="/opd" element={<Opd />} />
        <Route path="/labreport" element={<LabReports />} />
        <Route path="/doctor-earning" element={<DoctorEarning />} />

        {/* Optional fallback route */}
        <Route path="*" element={<MainDashboard />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
