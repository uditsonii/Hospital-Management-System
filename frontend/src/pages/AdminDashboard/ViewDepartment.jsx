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

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState(null);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/departments");
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
      const response = await fetch(`http://localhost:8000/api/departments/${currentDept._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentDept.name,
          head: currentDept.head,
          description: currentDept.description,
        }),
      });

      let data = null;
      if (response.status !== 204) {
        data = await response.json();
      }

      if (!response.ok) {
        const errorMsg = data?.message || data?.error || "Failed to update department";
        throw new Error(errorMsg);
      }

      const updatedDept = data?.department || data || currentDept;

      setDepartments((prev) =>
        prev.map((dept) => (dept._id === currentDept._id ? updatedDept : dept))
      );

      setUpdateOpen(false);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const confirmDelete = (_id) => {
    setDeptToDelete(_id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/departments/${deptToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete department");

      setDepartments((prev) => prev.filter((dept) => dept._id !== deptToDelete));
      setDeleteModalOpen(false);
      setDeptToDelete(null);
    } catch (err) {
      alert(err.message);
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => (
                  <div
                    key={dept._id}
                    className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition"
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
                        <li className="italic text-gray-500">
                          Dynamic doctor data integration pending
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={() => handleUpdate(dept)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => confirmDelete(dept._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Update Department Modal */}
            {isUpdateOpen && currentDept && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                  <h2 className="text-2xl font-bold mb-4 text-blue-800">Update Department</h2>

                  <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">
                        Name
                      </label>
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
                      <label htmlFor="head" className="block font-semibold text-gray-700 mb-1">
                        Head
                      </label>
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
                      <label
                        htmlFor="description"
                        className="block font-semibold text-gray-700 mb-1"
                      >
                        Description
                      </label>
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

                    {updateError && (
                      <p className="text-red-600 font-semibold">{updateError}</p>
                    )}

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
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
                  <h2 className="text-xl font-bold text-red-600 mb-4">Delete Department</h2>
                  <p className="text-gray-700 mb-6">Are you sure you want to delete this department?</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirmed}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
