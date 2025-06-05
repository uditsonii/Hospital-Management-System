import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ManagePatients = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", gender: "", contact: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/patients");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/patients/${editingId}`
      : "http://localhost:5000/api/patients";
    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ name: "", age: "", gender: "", contact: "", address: "" });
      setEditingId(null);
      fetchPatients();
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/patients/${id}`, { method: "DELETE" });
      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64 p-6">
        <Navbar toggleSidebar={toggleSidebar} />

        <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="border p-2 rounded" required />
          <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="border p-2 rounded" required />
          <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="border p-2 rounded" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full md:w-auto">
            {editingId ? "Update" : "Add"} Patient
          </button>
        </form>

        {loading ? (
          <p>Loading patients...</p>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Gender</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{patient.name}</td>
                    <td className="px-4 py-2">{patient.age}</td>
                    <td className="px-4 py-2">{patient.gender}</td>
                    <td className="px-4 py-2">{patient.contact}</td>
                    <td className="px-4 py-2">{patient.address}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;