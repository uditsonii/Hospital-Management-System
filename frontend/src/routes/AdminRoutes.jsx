import React from "react";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "../pages/AdminDashboard/AddDoctors";
import MainDashboard from "../pages/AdminDashboard/MainDashboard";
import ViewDoctor from "../pages/AdminDashboard/ViewDoctor";
import DoctorDetails from "../pages/AdminDashboard/DoctorDetails";
import Profile from "../pages/AdminDashboard/Profile";
import ViewDepartment from "../pages/AdminDashboard/ViewDepartment";
import ManagePatients from "../pages/AdminDashboard/ManagePatients";
import UpcomingAppointments from "../pages/AdminDashboard/UpcomingAppointments";
import AddDepartment from "../pages/AdminDashboard/AddDepartment";
import Opd from "../pages/AdminDashboard/Opd";
import LabReports from "../pages/AdminDashboard/LabReports";
import DoctorEarning from "../pages/AdminDashboard/DoctorEarning";

const AdminRoutes = () => {
  return (
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
  );
};

export default AdminRoutes;
