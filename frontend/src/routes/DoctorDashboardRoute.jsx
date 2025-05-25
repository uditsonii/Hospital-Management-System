import { Router, Route } from "react-router-dom";
import AuthCheck from "../components/AuthCheck";

const DoctorDashboardRoute = () => {
  return (
    <Router>
      <Route
        path=""
        element={
          <AuthCheck>
            <MainDashboard />
          </AuthCheck>
        }
      />
    </Router>
  );
};

export default DoctorDashboardRoute;
