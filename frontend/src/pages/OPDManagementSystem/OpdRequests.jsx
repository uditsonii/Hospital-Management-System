import React, { useEffect, useState, useContext } from "react";
import { Calendar, Clock, User, Check, X } from "lucide-react";
import { io } from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { OpdNotificationContext } from "../../Context/OpdNotifications.context";

// Toast Component with Smooth Animation
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm text-white border border-green-300 bg-gray-800 rounded-lg shadow-lg flex items-start p-4 space-x-4 animate-toast-slide-in">
    <div className="text-green-500 mt-1">
      <Check className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <p className="font-semibold">New Appointment Booked!</p>
      <p className="text-sm mt-1">{message}</p>
    </div>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
      <X className="w-5 h-5" />
    </button>
  </div>
);

const OpdRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [toasts, setToasts] = useState([]);
  const location = useLocation();
  const { latestAppointment } = useContext(OpdNotificationContext);

  // Fetch pending appointments
  const fetchPendingAppointments = async () => {
    try {
      const res = await axios.post("http://localhost:8000/opd/get-pending-requests");
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Failed to load appointments:", error);
      setToasts((prev) => [
        ...prev,
        { id: Date.now(), message: "Failed to load appointments. Please try again." },
      ]);
    }
  };

  // Handle accept with error handling and optimistic update
  const handleAccept = async (id) => {
    const originalAppointments = [...appointments];
    const patient = appointments.find((appointment) => appointment._id === id);

    // Optimistic update
    setAppointments((prev) =>
      prev.map((apt) => (apt._id === id ? { ...apt, status: "accepted" } : apt))
    );

    try {
      await axios.patch("http://localhost:8000/opd/update-appointment-status", {
        id,
        status: "accepted",
      });
      await axios.post("http://localhost:8000/opd/fill-slip", patient);

    } catch (error) {
      console.error("Failed to accept appointment:", error);
      // Revert optimistic update
      setAppointments(originalAppointments);
      setToasts((prev) => [
        ...prev,
        { id: Date.now(), message: "Failed to accept appointment. Please try again." },
      ]);
    }
  };
  
  // Handle decline with error handling and optimistic update
  const handleDecline = async (id) => {
    const originalAppointments = [...appointments];

    // Optimistic update
    setAppointments((prev) =>
      prev.map((apt) => (apt._id === id ? { ...apt, status: "declined" } : apt))
    );

    try {
      await axios.patch("http://localhost:8000/opd/update-appointment-status", {
        id,
        status: "declined",
      });
    } catch (error) {
      console.error("Failed to decline appointment:", error);
      // Revert optimistic update
      setAppointments(originalAppointments);
      setToasts((prev) => [
        ...prev,
        { id: Date.now(), message: "Failed to decline appointment. Please try again." },
      ]);
    }
  };

  // Fixed getStatusBadge function
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "accepted":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "declined":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  };

  const pendingCount = appointments.filter((apt) => apt.status === "pending").length;

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("new-appointment", (appointment) => {
      setAppointments((prev) => [appointment, ...prev]);
      const toastMessage = `${appointment.name} booked an appointment at ${appointment.date}`;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: toastMessage }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    });

    return () => socket.disconnect();
  }, []);

  // Fetch appointments only on mount or when location changes
  useEffect(() => {
    fetchPendingAppointments();
  }, [location.pathname]);

  // Handle new appointments from context
  useEffect(() => {
    if (!latestAppointment) return;

    const toastMessage = `${latestAppointment.name} booked an appointment at ${latestAppointment.date}`;
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: toastMessage }]);

    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return () => clearTimeout(timer);
  }, [latestAppointment]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        />
      ))}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Management
              </h1>
              <p className="text-gray-600">Manage patient appointment requests</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <span className="text-blue-800 font-medium">
                  {pendingCount} Pending Request{pendingCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            >
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.name}
                    </h3>
                    <span className={getStatusBadge(appointment.status)}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">{appointment.time}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Reason for Visit:
                  </p>
                  <p className="text-sm text-gray-600">{appointment.purpose}</p>
                </div>

                {/* Status Actions with Smooth Transitions */}
                {appointment.status === "pending" && (
                  <div className="flex space-x-3 transition-opacity duration-300">
                    <button
                      onClick={() => handleAccept(appointment._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-transform duration-200 hover:scale-105"
                    >
                      <Check className="h-4 w-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleDecline(appointment._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-transform duration-200 hover:scale-105"
                    >
                      <X className="h-4 w-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
                {appointment.status === "accepted" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center animate-fade-in">
                    <p className="text-green-800 font-medium text-sm">
                      Appointment Confirmed
                    </p>
                  </div>
                )}
                {appointment.status === "declined" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center animate-fade-in">
                    <p className="text-red-800 font-medium text-sm">
                      Appointment Declined
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center animate-fade-in">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
            <p className="text-gray-600">
              No appointment requests to review at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpdRequests;