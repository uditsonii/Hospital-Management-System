import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
   const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [doctor, setDoctor] = useState({
    deptid: "",
    name: "",
    email: "",
    mobile_no: "",
    specialization: "",
    // password: "",
    // confirmPassword: "",
    gender: "",
    dob: "",
    degree: "",
    experience: "",
  });

  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/departments")
        const data = await res.json();
        setDepartments(data)
      } catch (error) {
        console.error("Failed to fetch departments", err);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load departments',
          icon: 'error'
        });
      }
    }
  
    fetchDepartments();
  }, [])
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(doctor);
    try {
      const res = await fetch("http://localhost:8000/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });
      
      const data = await res.json();
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add Doctor");
      }


      // SweetAlert2 Success
      await Swal.fire({
        title: "Department Added 🎉",
        html: `<div class="flex flex-col items-center">
            <img src="https://media.tenor.com/OYJL9tWUZ0cAAAAi/checkmark.gif" alt="Success" style="width:100px; margin-bottom: 10px;" />
            <p class="text-lg text-gray-800">The Doctor has been added successfully.</p>
             </div>`,
        showConfirmButton: true,
        confirmButtonText: "Go to Doctors",
        confirmButtonColor: "#2563EB",
        background: "#f0f9ff",
      });

      navigate("/view-doctor");

      setDoctor({
        deptid: "",
        name: "",
        email: "",
        mobile_no: "",
        specialization: "",
        // password: "",
        // confirmPassword: "",
        gender: "",
        dob: "",
        degree: "",
        experience: "",
      });
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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow overflow-auto flex justify-center items-start p-6">
          <div className="w-full max-w-xl bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl transition duration-300">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wider uppercase">
              🩺 Add New Doctor
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-gray-800 text-[15px] font-medium"
            >

              {/* Department */}
              <div>
                <label className="block mb-1 font-semibold">
                  🏥 Department
                </label>
                <select
                  name="deptid"
                  value={doctor.deptid}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    // console.log(<option value={dept._id} key={dept._id}>{dept.name}</option>)
                    <option value={dept.deptid} key={dept.deptid}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Input Group */}
              {[
                {
                  label: "👨‍⚕️ Full Name",
                  name: "name",
                  type: "text",
                  placeholder: "Dr. John Doe",
                },
                {
                  label: "📞 Phone Number",
                  name: "mobile_no",
                  type: "tel",
                  placeholder: "+91-9876543210",
                },
                {
                  label: "🎂 dob",
                  name: "dob",
                  type: "date",
                },
                {
                  label: "🩻 Specialization",
                  name: "specialization",
                  type: "text",
                  placeholder: "Cardiologist, Surgeon...",
                },
                {
                  label: "🎓 Degree",
                  name: "degree",
                  type: "text",
                  placeholder: "MBBS, MD...",
                },
                {
                  label: "⏳ Experience",
                  name: "experience",
                  type: "text",
                  placeholder: "MBBS, MD...",
                },
                // {
                //   label: "🔐 Password",
                //   name: "password",
                //   type: "password",
                //   placeholder: "Enter password",
                // },
                // {
                //   label: "🔒 Confirm Password",
                //   name: "confirmPassword",
                //   type: "password",
                //   placeholder: "Confirm password",
                // },
                {
                  label: "📧 Email",
                  name: "email",
                  type: "email",
                  placeholder: "doctor@example.com",
                },
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
                    required={!(name === "experience" || name === "email" || name === "dob")}
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
