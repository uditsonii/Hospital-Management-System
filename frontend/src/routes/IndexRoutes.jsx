import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login2 from "../../unuse/Login2";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PatientOPD from "../pages/PatientOPD";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import PatientDashboardRoutes from "./PatientDashboardRoutes";
import DoctorDashboardRoute from "./DoctorDashboardRoute";
import OPDSystemRoute from "./OPDSystemRoute";
import AdminRoutes from "./AdminRoutes";
import AuthCheck from "../components/AuthCheck";

const IndexRoutes = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/login/admin" element={<Login2 />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      {/* <Route path="/login/admin" element={<Login2 />} /> */}
      <Route path="/opd" element={<PatientOPD />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin Routes */}
      {/* <Route path='/admin/*' element={<AdminRoutes />} /> */}
      <Route
        path="/admin/*"
        element={
          <AuthCheck role="admin">
            <AdminRoutes />
          </AuthCheck>
        }
      />

      {/* Patiend routes */}
      <Route
        path="/patient-dashboard/*"
        element={
          <AuthCheck role="patient">
            <PatientDashboardRoutes />
          </AuthCheck>
        }
      />

      {/* Doctor routes */}
      <Route
        path="/doctor-dashboard/*"
        element={
          <AuthCheck role="doctor">
            <DoctorDashboardRoute />
          </AuthCheck>
        }
      />

      {/* OPD Routes */}
      <Route
        path="/opd/*"
        element={
          <AuthCheck role="opd">
            <OPDSystemRoute />
          </AuthCheck>
        }
      />
    </Routes>
  );
};

export default IndexRoutes;
