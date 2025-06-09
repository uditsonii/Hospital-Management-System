import { Routes, Route } from "react-router-dom";
import NewPatientRegistration from "../pages/OPDManagementSystem/NewPatientRegistration";
import OPDFillSlip from "../pages/OPDManagementSystem/OPDFillSlip";
import AuthCheck from "../components/AuthCheck";
import OpdRequests from "../pages/OPDManagementSystem/OpdRequests.jsx";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socket from "../pages/OPDManagementSystem/socket";
import {
  OpdNotificationContext,
  OpdNotificationProvider,
} from "../Context/OpdNotifications.context";

const OPDSystemRouteInner = () => {
  const location = useLocation();
  const { setNotificationCountContext, setLatestAppointment } = useContext(OpdNotificationContext);

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
    <Routes>
      <Route path="/fill-slip" element={<OPDFillSlip />} />
      <Route path="/opd-requests" element={<OpdRequests />} />
      <Route path="/register-new-patient" element={<NewPatientRegistration />} />
    </Routes>
  );
};

const OPDSystemRoute = () => (
  <OpdNotificationProvider>
    <OPDSystemRouteInner />
  </OpdNotificationProvider>
);


export default OPDSystemRoute;
