import { Routes, Route } from "react-router-dom";
import NewPatientRegistration from "../pages/OPDManagementSystem/NewPatientRegistration";
import OPDFillSlip from "../pages/OPDManagementSystem/OPDFillSlip";
import AuthCheck from "../components/AuthCheck";
import OpdRequests from "../pages/OPDManagementSystem/OpdRequests.jsx";

const OPDSystemRoute = () => {
  return (
    <Routes>
      <Route path="/fill-slip" element={<OPDFillSlip />} />
      <Route path="/opd-requests" element={<OpdRequests />} />
      <Route
        path="/register-new-patient"
        element={<NewPatientRegistration />}
      />
    </Routes>
  );
};

export default OPDSystemRoute;
