import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Check, X, Phone, Mail } from "lucide-react";
import { io } from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:8000");
//style to be added in another file
// @keyframes slide-in {
//   from {
//     transform: translateX(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0%);
//     opacity: 1;
//   }
// }
// .animate-slide-in {
//   animation: slide-in 0.4s ease-out;
// }

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm text-white border border-green-300 bg-gray-800 rounded-lg shadow-lg flex items-start p-4 space-x-4 animate-slide-in">
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
  const [appointments, setAppointments] = useState([]); // your existing initial data
  const [toasts, setToasts] = useState([]);

  const handleAccept = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "accepted" } : apt))
    );
  };

  const handleDecline = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "declined" } : apt))
    );
  };

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
  const fetchPendingAppointments = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/opd/get-pending-requests"
      );
      console.log(res.data.data);
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  };
  useEffect(() => {
    fetchPendingAppointments();
    console.log(appointments);
    if (!socket.hasListeners("new_appointment")) {
      socket.on("new_appointment", (data) => {
        console.log(data);
        setAppointments((prev) => [data, ...prev]);

        const toastMessage = `${data.name} booked an appointment at ${data.date}`;
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message: toastMessage }]);

        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
      });
    }

    return () => {
      socket.off("new_appointment");
    };
  }, []);

  const pendingCount = appointments.filter(
    (apt) => apt.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Toast Container */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Management
              </h1>
              <p className="text-gray-600">
                Manage patient appointment requests
              </p>
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
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <div className="flex items-center justify-between">
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
              </div>

              <div className="p-6">
                <div className="space-y-4">
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
                    <span className="text-sm text-gray-700">
                      {appointment.time}
                    </span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700 truncate">
                      {appointment.patientEmail}
                    </span>
                  </div> */}
                  {/* <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700">
                      {appointment.patientPhone}
                    </span>
                  </div> */}

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Reason for Visit:
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.purpose}
                    </p>
                  </div>
                </div>

                {/* Status Actions */}
                {appointment.status === "pending" && (
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => handleAccept(appointment._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleDecline(appointment._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
                {appointment.status === "accepted" && (
                  <div className="mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-green-800 font-medium text-sm">
                        Appointment Confirmed
                      </p>
                    </div>
                  </div>
                )}
                {appointment.status === "declined" && (
                  <div className="mt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                      <p className="text-red-800 font-medium text-sm">
                        Appointment Declined
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Appointments
            </h3>
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
