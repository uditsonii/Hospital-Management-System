// src/context/OpdNotificationContext.jsx
import React, { createContext, useState } from "react";

export const OpdNotificationContext = createContext();

export const OpdNotificationProvider = ({ children }) => {
  const [notificationCountContext,setNotificationCountContext] = useState(0);
  const [latestAppointment, setLatestAppointment] = useState(null);

  return (
    <OpdNotificationContext.Provider value={{
      setNotificationCountContext,
      notificationCountContext,
      latestAppointment,
      setLatestAppointment,
    }}>
      {children}
    </OpdNotificationContext.Provider>
  );
};
