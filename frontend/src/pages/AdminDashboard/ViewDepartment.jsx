import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaStethoscope, FaUserMd } from "react-icons/fa";

const ViewDepartment = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments on component mount
  useEffect(() => {
    fetch("http://localhost:8000/api/departments") //  backend URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch departments");
        return res.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-900 mb-10">
              🏥 Hospital Departments
            </h1>

            {loading && (
              <p className="text-blue-700 font-semibold">Loading departments...</p>
            )}
            {error && (
              <p className="text-red-600 font-semibold">Error: {error}</p>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => (
                  <div
                    key={dept._id}
                    className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                        <FaStethoscope className="text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-blue-800">{dept.name}</h2>
                    </div>

                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-blue-700">Head:</span> {dept.head}
                    </p>
                    <p className="text-gray-600 text-sm italic mb-4">{dept.description}</p>

                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-1">
                        <FaUserMd className="text-blue-500" /> Associated Doctors
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                        <li className="italic text-gray-500">Dynamic doctor data integration pending</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
