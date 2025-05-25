import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainDashboard from '../PatientDashboard/MainDashboard';
import LabReports from '../PatientDashboard/LabREports';
import MedicalHistory from '../PatientDashboard/MedicalHistory';
import Appointments from '../PatientDashboard/Appointments';
import BookAppointment from '../PatientDashboard/BookAppointment';
import React from 'react';
import Sidebar from '../PatientDashboard/Sidebar';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/lab-reports" element={<LabReports />} />
      <Route path="/medical-history" element={<MedicalHistory />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
    </Routes>
  );
};
export default Index;
