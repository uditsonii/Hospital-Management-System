import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-06-05', time: '10:30 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Jane Doe', date: '2025-06-08', time: '2:00 PM', status: 'Pending' },
  { id: 3, doctor: 'Dr. Lee Wong', date: '2025-06-10', time: '9:00 AM', status: 'Confirmed' },
];
const statusColors = {
  Confirmed: 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-800',
};
export default function Appointments() {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="ml-64 p-8 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-300 pb-4">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-semibold text-blue-800">
            Upcoming Appointments
          </h1>
        </div>
        <p className="text-gray-600 text-lg mt-3 sm:mt-0">
           <span className="font-semibold text-blue-700">{today}</span>
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingAppointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-blue-700">{appt.doctor}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appt.status]}`}
              >
                {appt.status}
              </span>
            </div>
            <p className="text-gray-700 font-medium">
              {new Date(appt.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} at {appt.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
