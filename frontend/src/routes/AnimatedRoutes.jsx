import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '../../../../src/pages/Home';
import AboutUs from '../../../../src/pages/AboutUs';
import ContactUs from '../../../../src/pages/ContactUs';
import Login from '../../../../src/pages/Login';
import Login2 from '../../../../src/pages/Login2';
import Register from '../../../../src/pages/Register';
import PatientOPD from '../../../../src/pages/PatientOPD';
import ForgotPassword from '../../../../src/pages/ForgotPassword';
import NotFound from '../../../../src/pages/NotFound';

const AnimatedRoutes = () => {
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
      <Route  path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AnimatedRoutes;
