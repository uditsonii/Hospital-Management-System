import { Routes, Route } from "react-router-dom";
import NewPatientRegistration from "../pages/OPDManagementSystem/NewPatientRegistration";
import OPDFillSlip from "../pages/OPDManagementSystem/OPDFillSlip";
import AuthCheck from "../components/AuthCheck";

const OPDSystemRoute = () => {
  return (
    <Routes>
      <Route
        path="/fill-slip"
        element={
          <AuthCheck>
            <OPDFillSlip />
          </AuthCheck>
        }
      />
      <Route
        path="/register-new-patient"
        element={
          <AuthCheck>
            <NewPatientRegistration />
          </AuthCheck>
        }
      />
    </Routes>
  );
};

export default OPDSystemRoute;
