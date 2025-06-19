import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ViewDoctors = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [selectedRow, setSelectedRow] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
const [editingDoctor, setEditingDoctor] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };
const handleEdit = async (id) => {
  const doctorToEdit = doctors.find(doc => (doc._id) === id);
  if (!doctorToEdit) return;

  const { value: formValues } = await Swal.fire({
    title: `Edit Doctor: ${doctorToEdit.name}`,
    html: `
      <style>
        .swal2-html-container {
          text-align: left;
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #222;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 2px;
          font-size: 11px;
          color: #444;
          user-select: none;
        }
        input.swal2-input {
          width: 80% !important;
          padding: 5px 8px !important;
          font-size: 12px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 5px !important;
          box-shadow: inset 1px 1px 3px rgba(0,0,0,0.05);
          background-color: #f9fafb !important;
          margin-bottom: 8px !important;
          box-sizing: border-box;
        }
        input.swal2-input:focus {
          outline: none !important;
          border-color: #2563eb !important;
          box-shadow: 0 0 5px #2563eb88 !important;
          background-color: #fff !important;
        }
          .swal2-popup {
        max-width: 400px !important;  /* smaller popup */
        overflow-x: hidden !important;
      }
      </style>

      <label for="name">Name</label>
      <input id="name" class="swal2-input" placeholder="Name" value="${doctorToEdit.name || ''}">

      <label for="email">Email</label>
      <input id="email" class="swal2-input" placeholder="Email" value="${doctorToEdit.email || ''}">

      <label for="mobile_no">Phone</label>
      <input id="mobile_no" class="swal2-input" placeholder="Phone" value="${doctorToEdit.mobile_no || ''}">

      <label for="specialization">Specialization</label>
      <input id="specialization" class="swal2-input" placeholder="Specialization" value="${doctorToEdit.specialization || doctorToEdit.speciality || ''}">

      <label for="deptid">Department Id</label>
      <input id="deptid" class="swal2-input" placeholder="Department Id" value="${doctorToEdit.deptid || ''}">

      <label for="degree">Degree</label>
      <input id="degree" class="swal2-input" placeholder="Department" value="${doctorToEdit.degree || ''}">

      <label for="gender">Gender</label>
      <input id="gender" class="swal2-input" placeholder="Gender" value="${doctorToEdit.gender || ''}">

      <label for="age">Age</label>
      <input id="age" class="swal2-input" placeholder="Age" value="${doctorToEdit.age || ''}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Save',//
    preConfirm: () => {
      return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile_no: document.getElementById('mobile_no').value.trim(),
        specialization: document.getElementById('specialization').value.trim(),
        deptid: document.getElementById('deptid').value.trim(),
        degree: document.getElementById('degree').value.trim(),
        gender: document.getElementById('gender').value.trim(),
        age: document.getElementById('age').value.trim(),
      };
    }
  });

  if (formValues) {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/doctor/${id}`, formValues);
      setDoctors((prev) =>
        prev.map((doc) =>
          (doc._id) === id ? { ...doc, ...formValues } : doc
        )
      );
      Swal.fire('Updated!', 'Doctor information has been updated.', 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('Failed!', 'Failed to update doctor.', 'error');
    }
  }
};


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/doctor/${id}`);
      setDoctors(prev => prev.filter(doc => (doc._id || doc.id) !== id));
      Swal.fire(
        'Deleted!',
        'Doctor has been deleted.',
        'success'
      );
    } catch (err) {
      console.error(err);
      Swal.fire('Failed!', 'Failed to delete doctor.', 'error');
    }
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

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/doctor/fetchdoctor`, {
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
                    <th className="py-3 px-6 text-left">Degree</th>
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
                        <td className="py-3 px-6 text-left">{doctor.specialization}</td>
                        <td className="py-3 px-6 text-left">{doctor.deptid}</td>
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
