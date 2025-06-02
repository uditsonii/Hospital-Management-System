import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaStethoscope, FaUserMd } from "react-icons/fa";

// Department & doctor data
const departments = [
  {
    id: 1,
    name: "Cardiology",
    head: "Dr. John Doe",
    description: "Deals with disorders of the heart and circulatory system.",
  },
  {
    id: 2,
    name: "Neurology",
    head: "Dr. Jane Smith",
    description: "Treats diseases of the brain and nervous system.",
  },
  {
    id: 3,
    name: "Orthopedics",
    head: "Dr. Alex Johnson",
    description: "Concerned with injuries and diseases of the musculoskeletal system.",
  },
  {
    id: 4,
    name: "Pediatrics",
    head: "Dr. Asha Verma",
    description: "Provides medical care to infants, children, and adolescents.",
  },
  {
    id: 5,
    name: "Dermatology",
    head: "Dr. Neha Singh",
    description: "Specializes in skin, hair, and nail disorders.",
  },
];

const doctors = [
  { id: 1, name: "Dr. Rakesh Mehta", departmentId: 1 },
  { id: 2, name: "Dr. Sunita Gupta", departmentId: 1 },
  { id: 3, name: "Dr. Rohan Das", departmentId: 2 },
  { id: 4, name: "Dr. Alka Sharma", departmentId: 2 },
  { id: 5, name: "Dr. Mukesh Khanna", departmentId: 3 },
  { id: 6, name: "Dr. Neelam Joshi", departmentId: 4 },
  { id: 7, name: "Dr. Shubham Patel", departmentId: 5 },
];

const ViewDepartment = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-900 mb-10">🏥 Hospital Departments</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept) => {
                const deptDoctors = doctors.filter(doc => doc.departmentId === dept.id);

                return (
                  <div
                    key={dept.id}
                    className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                        <FaStethoscope className="text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-blue-800">{dept.name}</h2>
                    </div>

                    <p className="text-gray-700 mb-2"><span className="font-semibold text-blue-700">Head:</span> {dept.head}</p>
                    <p className="text-gray-600 text-sm italic mb-4">{dept.description}</p>

                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-1">
                        <FaUserMd className="text-blue-500" /> Associated Doctors
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                        {deptDoctors.length > 0 ? (
                          deptDoctors.map(doc => (
                            <li key={doc.id}>{doc.name}</li>
                          ))
                        ) : (
                          <li className="italic text-gray-500">No doctors assigned</li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
