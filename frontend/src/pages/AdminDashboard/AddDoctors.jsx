import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    mobile_no: "",
    speciality: "",
    departmentId: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/doctor/adddoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(doctor),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error adding doctor:", data.message);
        return;
      }

      console.log("Doctor added successfully:", data);
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow overflow-auto flex justify-center items-start p-6">
          <div className="w-full max-w-xl bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl transition duration-300">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wider uppercase">
              🩺 Add New Doctor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-gray-800 text-[15px] font-medium">
              {[
                { label: "👨‍⚕️ Full Name", name: "name", type: "text", placeholder: "Dr. John Doe" },
                { label: "📧 Email", name: "email", type: "email", placeholder: "doctor@example.com" },
                { label: "📞 Mobile Number", name: "mobile_no", type: "tel", placeholder: "+91-9876543210" },
                { label: "🩻 Speciality", name: "speciality", type: "text", placeholder: "Cardiologist, Surgeon..." },
                { label: "🔐 Password", name: "password", type: "password", placeholder: "Enter password" },
                { label: "🔒 Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm password" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block mb-1 font-semibold">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={doctor[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-blue-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}

              {/* Gender */}
              <div>
                <label className="block mb-1 font-semibold">⚧ Gender</label>
                <select
                  name="gender"
                  value={doctor.gender}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">♂ Male</option>
                  <option value="Female">♀ Female</option>
                  <option value="Other">⚧ Other</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block mb-1 font-semibold">🏥 Department</label>
                <select
                  name="departmentId"
                  value={doctor.departmentId}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl shadow-md transition duration-300 hover:shadow-lg"
              >
                ➕ Add Doctor
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDoctor;
