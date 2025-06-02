import React from "react";
import { useParams } from "react-router-dom";

// Dummy data — ideally this would come from backend
const dummyDoctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "+91-9876543210",
    specialization: "Cardiologist",
    department: "Cardiology",
    gender: "Male",
    age: 45,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91-9123456789",
    specialization: "Neurologist",
    department: "Neurology",
    gender: "Female",
    age: 38,
  },
  {
    id: 3,
    name: "Dr. Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91-9988776655",
    specialization: "Orthopedic Surgeon",
    department: "Orthopedics",
    gender: "Other",
    age: 40,
  },
];

const DoctorDetails = () => {
  const { id } = useParams();
  const doctor = dummyDoctors.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="text-center text-red-600 mt-10 text-xl">
        Doctor not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          👨‍⚕️ Doctor Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Department:</strong> {doctor.department}</p>
          <p><strong>Gender:</strong> {doctor.gender}</p>
          <p><strong>Age:</strong> {doctor.age}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
