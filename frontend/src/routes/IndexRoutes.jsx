import React, { lazy,Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AuthCheck from "../components/AuthCheck";

// Lazy load pages
// const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Login = lazy(() => import("../pages/Login"));
const Login2 = lazy(() => import("../../unuse/Login2"));
const Register = lazy(() => import("../pages/Register"));
const PatientOPD = lazy(() => import("../pages/PatientOPD"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

// Lazy load route groups
const PatientDashboardRoutes = lazy(() => import("./PatientDashboardRoutes"));
const DoctorDashboardRoute = lazy(() => import("./DoctorDashboardRoute"));
const OPDSystemRoute = lazy(() => import("./OPDSystemRoute"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

import Home from "../pages/Home";
// import AboutUs from "../pages/AboutUs";
// import ContactUs from "../pages/ContactUs";
// import Login2 from "../../unuse/Login2";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import PatientOPD from "../pages/PatientOPD";
// import ForgotPassword from "../pages/ForgotPassword";
// import NotFound from "../pages/NotFound";
// import Dashboard from "../pages/Dashboard";
// import PatientDashboardRoutes from "./PatientDashboardRoutes";
// import DoctorDashboardRoute from "./DoctorDashboardRoute";
// import OPDSystemRoute from "./OPDSystemRoute";
// import AdminRoutes from "./AdminRoutes";

const IndexRoutes = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
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
    </Suspense>
  );
};

export default IndexRoutes;
