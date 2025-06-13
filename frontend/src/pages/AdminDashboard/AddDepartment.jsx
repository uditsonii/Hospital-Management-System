import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    head: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add department");
      }

      // SweetAlert2 Success
      await Swal.fire({
        title: "Department Added 🎉",
        html: `<div class="flex flex-col items-center">
      <img src="https://media.tenor.com/OYJL9tWUZ0cAAAAi/checkmark.gif" alt="Success" style="width:100px; margin-bottom: 10px;" />
      <p class="text-lg text-gray-800">The department has been added successfully.</p>
       </div>`,
        showConfirmButton: true,
        confirmButtonText: "Go to Departments",
        confirmButtonColor: "#2563EB",
        background: "#f0f9ff",
      });

      navigate("/departments");

      setFormData({ name: "", head: "", description: "" });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Oops 😓",
        html: `
    <div class="flex flex-col items-center">
      <img src="https://media.tenor.com/8zUVTt0RWxkAAAAi/sad-tears.gif" alt="Error" style="width:80px; margin-bottom: 10px;" />
      <p class="text-lg text-gray-700">${
        error.message || "Something went wrong"
      }</p>
    </div>
  `,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-grow bg-gradient-to-br from-blue-100 to-white p-8">
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-blue-300">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-10">
              ➕ Add New Department
            </h1>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="name"
                  className="block text-blue-900 font-semibold mb-2"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Cardiology"
                  required
                  className="w-full p-4 border border-blue-300 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="head"
                  className="block text-blue-900 font-semibold mb-2"
                >
                  Head Doctor
                </label>
                <input
                  type="text"
                  id="head"
                  name="head"
                  value={formData.head}
                  onChange={handleChange}
                  placeholder="e.g., Dr. John Doe"
                  required
                  className="w-full p-4 border border-blue-300 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-blue-900 font-semibold mb-2"
                >
                  Department Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this department..."
                  rows={5}
                  required
                  className="w-full p-4 border border-blue-300 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-4 rounded-xl hover:bg-blue-800 transition"
              >
                Add Department
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDepartment;
