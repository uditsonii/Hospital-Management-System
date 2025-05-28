import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-06-05', time: '10:30 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Jane Doe', date: '2025-06-08', time: '2:00 PM', status: 'Pending' },
  { id: 3, doctor: 'Dr. Lee Wong', date: '2025-06-10', time: '9:00 AM', status: 'Confirmed' },
];

const statusColors = {
  Confirmed: 'bg-blue-100 text-blue-600',
  Pending: 'bg-blue-200 text-blue-700',
};

export default function Appointments() {
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-white via-blue-50 to-white">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md border-r border-blue-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-5 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-3xl text-sky-500" />
            <h1 className="text-3xl font-semibold text-sky-700">Upcoming Appointments</h1>
          </div>
          <p className="text-sky-600 text-md mt-4 sm:mt-0">
            <span className="font-medium">{today}</span>
          </p>
        </div>

        {/* Appointment Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-2xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-sky-800">{appt.doctor}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[appt.status]}`}
                >
                  {appt.status}
                </span>
              </div>
              <p className="text-sky-700 text-base">
                {new Date(appt.date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sky-500">{appt.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
