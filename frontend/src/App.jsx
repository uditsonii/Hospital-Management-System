import React from "react";
import IndexRoutes from "./routes/IndexRoutes";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./pages/AdminDashboard/Sidebar";
import MainDashboard from "./pages/AdminDashboard/MainDashboard";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorDashboardRoute from "./routes/DoctorDashboardRoute";

function App() {
  return (
<DoctorDashboardRoute/>);
}
export default App;

    // <Router>
    //   <div className="flex flex-col min-h-screen">
    //     <IndexNavbar />
    //     <main className="flex-grow">
    //       {/* Uncomment below to use routes */}
    //       <IndexRoutes />
    //       {/* <MainDashboard /> */}
    //     </main>
    //     <Footer />
    //   </div>
    // </Router>
