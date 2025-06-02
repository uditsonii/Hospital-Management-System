import { Routes, Route } from "react-router-dom";
import OPDRegistration from "../pages/OPDManagementSystem/OPDRegistration";

const OPDSystemRoute = () => {
    return (
        <Routes>
            <Route path="/s" element={<OPDRegistration />} />
        </Routes>
    )
}

export default OPDSystemRoute;