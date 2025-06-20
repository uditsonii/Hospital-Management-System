import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaStethoscope, FaUserMd, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ViewDepartment = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/departments`);
        if (!res.ok) throw new Error("Failed to fetch departments");

        const data = await res.json();
        const fixedData = data.map((dept) => ({
          ...dept,
          _id: typeof dept._id === "object" ? dept._id.$oid || dept._id : dept._id,
        }));
        setDepartments(fixedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleUpdate = (dept) => {
    setCurrentDept(dept);
    setUpdateError(null);
    setUpdateOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDept((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/departments/${currentDept._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentDept.name,
          head: currentDept.head,
          description: currentDept.description,
        }),
      });

      const data = response.status !== 204 ? await response.json() : {};

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update department");
      }

      const updatedDept = data?.department || currentDept;
      setDepartments((prev) =>
        prev.map((dept) => (dept._id === currentDept._id ? updatedDept : dept))
      );

      Swal.fire("Success", "Department updated successfully", "success");
      setUpdateOpen(false);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/departments/${_id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete department");

        setDepartments((prev) => prev.filter((dept) => dept._id !== _id));
        Swal.fire("Deleted!", "The department has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-900 mb-10">🏥 Hospital Departments</h1>

            {loading && <p className="text-blue-700 font-semibold">Loading departments...</p>}
            {error && <p className="text-red-600 font-semibold">Error: {error}</p>}

            {!loading && !error && (
              <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-blue-100">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-200 text-blue-900">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Head</th>
                      <th className="px-6 py-3 text-left">Description</th>
                      <th className="px-6 py-3 text-left flex items-center gap-1">
                        <FaUserMd /> Associated Doctors
                      </th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept) => (
                      <tr key={dept._id} className="border-t border-blue-100 hover:bg-blue-50 transition">
                        <td className="px-6 py-4 font-semibold text-blue-800 flex items-center gap-2">
                          <FaStethoscope className="text-blue-600" /> {dept.name}
                        </td>
                        <td className="px-6 py-4">{dept.head}</td>
                        <td className="px-6 py-4 italic text-gray-600">{dept.description}</td>
                        <td className="px-6 py-4 italic text-gray-500">Coming Soon</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-4">
                            <button
                              onClick={() => handleUpdate(dept)}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-full shadow-md transition transform hover:scale-105"
                            >
                              <FaEdit />
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(dept._id)}
                              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-4 rounded-full shadow-md transition transform hover:scale-105"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isUpdateOpen && currentDept && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
                >
                  <h2 className="text-2xl font-bold mb-4 text-blue-800">Update Department</h2>
                  <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={currentDept.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="head" className="block font-semibold text-gray-700 mb-1">Head</label>
                      <input
                        id="head"
                        name="head"
                        type="text"
                        value={currentDept.head}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block font-semibold text-gray-700 mb-1">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={currentDept.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {updateError && <p className="text-red-600 font-semibold">{updateError}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setUpdateOpen(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        disabled={updateLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                        disabled={updateLoading}
                      >
                        {updateLoading ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
