import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";

const ViewDoctors = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [selectedRow, setSelectedRow] = useState(null);

  const [doctors, setDoctors] = useState([]);

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  useEffect(() => {
    fetchAllDoctor();
  }, []);

   const fetchAllDoctor = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/doctor");
        if(!res.ok) throw new Error("Failed to fetch departments");
        
        const data = await res.json();
        console.log(data)
        // if (!(data[0].role === 'admin') || !(data[1].role === 'opd')) {
        //   setDoctors(data);        
        // }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    }

  const handleEdit = (id) => {
    alert(`Edit doctor with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this doctor?");
    if (confirmed) {
      alert(`Doctor with ID ${id} deleted.`);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-blue-600">
              <h1 className="text-white text-2xl font-semibold tracking-wide">
                👨‍⚕️ Doctors List
              </h1>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-left">Specialization</th>
                    <th className="py-3 px-6 text-left">Department</th>
                    <th className="py-3 px-6 text-left">Gender</th>
                    <th className="py-3 px-6 text-center">Age</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-xs">
  {doctors.map((doctor, idx) => (
    <tr
      key={doctor.id}
      onClick={() => handleRowClick(doctor.id)}
      className={`group border-b border-gray-200 cursor-pointer
        ${selectedRow === doctor.id ? "bg-blue-100" : idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
        hover:bg-blue-200 hover:shadow-md transition duration-200 ease-in-out`}
    >
      <td className="py-3 px-6 text-left font-medium text-blue-800">{doctor.name}</td>
      <td className="py-3 px-6 text-left">{doctor.email}</td>
      <td className="py-3 px-6 text-left">{doctor.phone}</td>
      <td className="py-3 px-6 text-left">{doctor.specialization}</td>
      <td className="py-3 px-6 text-left">{doctor.department}</td>
      <td className="py-3 px-6 text-left">{doctor.gender}</td>
      <td className="py-3 px-6 text-center">{doctor.age}</td>
      <td className="py-3 px-6 text-center flex gap-3 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(doctor.id);
          }}
          className="text-blue-600 hover:text-blue-800"
          aria-label={`Edit ${doctor.name}`}
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(doctor.id);
          }}
          className="text-red-600 hover:text-red-800"
          aria-label={`Delete ${doctor.name}`}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctors;
