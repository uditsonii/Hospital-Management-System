import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import NewPatientRegistration from "../pages/OPDManagementSystem/NewPatientRegistration";
// import OPDFillSlip from "../pages/OPDManagementSystem/OPDFillSlip";
// import OpdRequests from "../pages/OPDManagementSystem/OpdRequests.jsx";
// import OPDSlipPreview from "../pages/OPDManagementSystem/OPDSlipPreview";
import { useLocation } from "react-router-dom";
import socket from "../pages/OPDManagementSystem/socket";
import {
  OpdNotificationContext,
  OpdNotificationProvider,
} from "../Context/OpdNotifications.context";

//  Lazy load individual pages
const OPDFillSlip = lazy(() => import("../pages/OPDManagementSystem/OPDFillSlip"));
const OpdRequests = lazy(() => import("../pages/OPDManagementSystem/OpdRequests.jsx"));
const NewPatientRegistration = lazy(() => import("../pages/OPDManagementSystem/NewPatientRegistration"));
const OPDSlipPreview = lazy(() => import("../pages/OPDManagementSystem/OPDSlipPreview"));

const OPDSystemRouteInner = () => {
  const location = useLocation();
  const { setNotificationCountContext, setLatestAppointment } = useContext(
    OpdNotificationContext
  );

  useEffect(() => {
    const handleNewAppointment = (data) => {
      if (location.pathname !== "/opd-requests") {
        setNotificationCountContext((prev) => prev + 1);
      } else {
        setNotificationCountContext(0);
      }
      setLatestAppointment(data);
    };

    socket.on("new_appointment", handleNewAppointment);
    return () => socket.off("new_appointment", handleNewAppointment);
  }, [location]);


  return (
    <Suspense fallback={<div className="p-10 text-center">Loading OPD...</div>}>
    <Routes>
      <Route path="/fill-slip" element={<OPDFillSlip />} />
      <Route path="/opd-requests" element={<OpdRequests />} />
      <Route
        path="/register-new-patient"
        element={<NewPatientRegistration />}
      />
      <Route path="/slip-preview/:pid" element={<OPDSlipPreview />} />
    </Routes>
    </Suspense>
  );
};

const OPDSystemRoute = () => (
  <OpdNotificationProvider>
    <OPDSystemRouteInner />
  </OpdNotificationProvider>
);

export default OPDSystemRoute;
