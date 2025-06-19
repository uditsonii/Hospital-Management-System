import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    pid: "",
    doctor: "",
    department: "",
    date: "",
    diagnosis: "",
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/opd/book-appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Appointment booked successfully!");
        setForm({
          name: "",
          pid: "",
          doctor: "",
          department: "",
          date: "",
          diagnosis: "",
        });
      })
      .catch((err) => {
        console.error("Error booking appointment:", err);
      });
  };

  useEffect(() => {
    let userRawData = localStorage.getItem("user");
    if (userRawData) {
      const { name, pid } = JSON.parse(userRawData);
      setForm((prev) => ({ ...prev, name, pid }));
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-blue-100 p-8 mt-10">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            📅 Book an Appointment
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
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

            {/* Patient ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Patient ID (PID)
              </label>
              <input
                type="text"
                name="pid"
                value={form.pid}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter patient ID"
                required
              />
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Doctor
              </label>
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

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">-- Select Department --</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Cardiology">Cardiology</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Diagnosis (Optional)
              </label>
              <textarea
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Briefly describe the diagnosis or symptoms"
                rows={3}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
