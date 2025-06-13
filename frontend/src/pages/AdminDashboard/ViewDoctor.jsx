import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ViewDoctors = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [selectedRow, setSelectedRow] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  const handleEdit = async (id) => {
    try{
const result=await axios.put("http://localhost:8000/api/doctor/updatedoctor")
    }
    catch(err)
    {
      console.log(err);
      setError("Failed to Update Doctor");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this doctor?");
    if (confirmed) {
      alert(`Doctor with ID ${id} deleted.`);
    }
  };

 useEffect(() => {
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const response = await fetch("http://localhost:8000/api/doctor/fetchdoctor", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setDoctors(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors data.");
    }
  };

  getData();
}, []);


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

            {error && (
              <p className="text-red-600 p-4">{error}</p>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Id</th>
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
                  {doctors.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">No Data Found</td>
                    </tr>
                  ) : (
                    doctors.map((doctor, idx) => (
                      <tr
                        key={doctor.id || doctor._id} // support MongoDB _id or id
                        onClick={() => handleRowClick(doctor.id || doctor._id)}
                        className={`group border-b border-gray-200 cursor-pointer
                          ${selectedRow === (doctor.id || doctor._id) ? "bg-blue-100" : idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                          hover:bg-blue-200 hover:shadow-md transition duration-200 ease-in-out`}
                      >
                        <td className="py-3 px-6 text-left font-medium text-blue-800">{doctor.name}</td>
                        <td className="py-3 px-6 text-left">{doctor.deptid}</td>
                        <td className="py-3 px-6 text-left">{doctor.email}</td>
                        <td className="py-3 px-6 text-left">{doctor.mobile_no}</td>
                        <td className="py-3 px-6 text-left">{doctor.speciality}</td>
                        <td className="py-3 px-6 text-left">{doctor.department}</td>
                        <td className="py-3 px-6 text-left">{doctor.gender}</td>
                        <td className="py-3 px-6 text-center">{doctor.age}</td>
                        <td className="py-3 px-6 text-center flex gap-3 justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(doctor.id || doctor._id);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label={`Edit ${doctor.name}`}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(doctor.id || doctor._id);
                            }}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Delete ${doctor.name}`}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
