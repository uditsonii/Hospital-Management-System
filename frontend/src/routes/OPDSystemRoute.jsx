import { Routes, Route } from "react-router-dom";
import OPDRegistration from "../pages/OPDManagementSystem/OPDRegistration";
import NewPatientRegistration from "../pages/OPDManagementSystem/NewPatientRegistration";

const OPDSystemRoute = () => {
    return (
        <Routes>
            <Route path="/s" element={<OPDRegistration />} />
            <Route path="/new-registration" element={<NewPatientRegistration />} />
        </Routes>
    )
}

export default OPDSystemRoute;