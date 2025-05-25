import React, { useState } from 'react';
import Sidebar from './Sidebar';

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: '',
    doctor: '',
    date: '',
    time: '',
    purpose: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Appointment booked successfully!');
        setForm({ name: '', doctor: '', date: '', time: '', purpose: '' });
      })
      .catch((err) => {
        console.error('Error booking appointment:', err);
      });
  };
  return (
        <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="max-w-2xl mx-auto ml-100 mt-10 p-8 bg-white rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">📅 Book an Appointment</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">-- Choose a Doctor --</option>
            <option value="Dr. Sharma">Dr. Sharma (General Physician)</option>
            <option value="Dr. Mehra">Dr. Mehra (Eye Specialist)</option>
            <option value="Dr. Singh">Dr. Singh (Dentist)</option>
            <option value="Dr. Patel">Dr. Patel (Cardiologist)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose of Visit (Optional)</label>
          <textarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Briefly describe the purpose of visit"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
     </div>
  );
};

export default BookAppointment;
