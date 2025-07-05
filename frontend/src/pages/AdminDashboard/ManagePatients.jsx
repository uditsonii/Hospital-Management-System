import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const ManagePatients = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    pid: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    bloodGroup: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/patients`);
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (patient) => {
    setForm({
      pid: patient._id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.mobile_no,
      address: patient.address,
      email: patient.email,
      bloodGroup: patient.bloodGroup,
    });
    setEditingId(patient._id);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patients/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            age: form.age,
            gender: form.gender,
            mobile_no: form.contact,
            address: form.address,
            email: form.email,
            bloodGroup: form.bloodGroup,
          }),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Patient updated!",
          text: "The patient's information has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
        });
        setForm({
          name: "",
          age: "",
          gender: "",
          contact: "",
          address: "",
          email: "",
          bloodGroup: "",
          pid: "",
        });
        setEditingId(null);
        setShowModal(false);
        fetchPatients();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Error updating patient:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the patient's information.",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64 p-6">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-3 sm:p-5 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-10">
              👥 Manage Patients
            </h1>

            {loading ? (
              <p>Loading patients...</p>
            ) : (
              <div className="w-full overflow-x-auto bg-white rounded-xl shadow-xl border border-blue-100">
                <table className="min-w-[800px] w-full table-auto text-sm sm:text-base">
                  <thead className="bg-blue-200 text-blue-900">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        PID
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Name
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Age
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Gender
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Contact
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Address
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Blood Group
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Email
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr
                        key={patient._id}
                        className="border-b hover:bg-blue-50"
                      >
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient._id}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.name}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.age}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.gender}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.mobile_no}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.address}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-center">
                          {patient.bloodGroup}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          {patient.email}
                        </td>
                        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                          <button
                            onClick={() => handleEdit(patient)}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-full shadow-md transition transform hover:scale-105"
                          >
                            <FaEdit /> Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-[90%] sm:w-full max-w-2xl p-4 sm:p-6 shadow-lg relative">
                  <h2 className="text-2xl font-bold mb-4 text-blue-700">
                    Edit Patient
                  </h2>
                  <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                    <input
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Age"
                      type="number"
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                    <input
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      placeholder="Gender"
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                    <input
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="Contact"
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="border p-2 rounded w-full text-sm"
                    />
                    <input
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                      placeholder="Blood Group"
                      className="border p-2 rounded w-full text-sm"
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="border p-2 rounded w-full text-sm"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 col-span-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePatients;
