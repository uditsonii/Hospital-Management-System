import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Login2 from '../pages/Login2';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PatientOPD from '../pages/PatientOPD';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import PatientDashboardRoutes from './PatientDashboardRoutes';
import DoctorDashboardRoute from './DoctorDashboardRoute';



const IndexRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/admin" element={<Login2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/opd" element={<PatientOPD />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route  path="*" element={<NotFound />} />

      {/* Patiend routes */}
      <Route path='/patient-dashboard/*' element={<PatientDashboardRoutes />} />

      {/* Doctor routes */}
      <Route path='/doctor-dashboard/*' element={<DoctorDashboardRoute />} />
    </Routes>
  );
};

export default IndexRoutes;
