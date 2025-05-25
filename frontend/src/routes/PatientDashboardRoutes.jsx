import { Routes, Route } from "react-router-dom";
import LabReports from "../pages/PatientDashboard/LabReports";
import MedicalHistory from "../pages/PatientDashboard/MedicalHistory";
import Appointments from "../pages/PatientDashboard/Appointments";
import BookAppointment from "../pages/PatientDashboard/BookAppointment";
import React from "react";
import MainDashboard from "../pages/PatientDashboard/MainDashboard";
import AuthCheck from "../components/AuthCheck";

const PatientDashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <AuthCheck>
            <MainDashboard />
          </AuthCheck>
        }
      />
      <Route
        path="lab-reports"
        element={
          <AuthCheck>
            <LabReports />
          </AuthCheck>
        }
      />
      <Route
        path="medical-history"
        element={
          <AuthCheck>
            <MedicalHistory />
          </AuthCheck>
        }
      />
      <Route
        path="appointments"
        element={
          <AuthCheck>
            <Appointments />
          </AuthCheck>
        }
      />
      <Route
        path="book-appointment"
        element={
          <AuthCheck>
            <BookAppointment />
          </AuthCheck>
        }
      />
    </Routes>
  );
};
export default PatientDashboardRoutes;
