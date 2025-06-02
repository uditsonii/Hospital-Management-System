import React, { useState } from "react";
import OPDNavbar from "../../components/OPDNavbar";
import {
  Calendar,
  User,
  FileText,
  RefreshCcw,
  Save,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

function OPDFillSlip() {
  const [formData, setFormData] = useState({
    // Patient Information
    pid: "",
    name: "",
    age: "",
    gender: "",
    gname: "",
    mobile_no: "",
    email: "",
    address: "",
    bloodGroup: "",
    // Appointment details
    department: "",
    doctor: "",
    diagnosis: "",
    fee: "",
    appointmentDate: "",
    visitType: "",
    referredBy: "",

    // Additional Info
    insuranceNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ['General Medicine', 'Cardiology', 'Dermatology', 'ENT', 'Orthopedics'];

  const doctors = {
    'General Medicine' : ['Dr. Ram', 'Dr. Shyam'],
    'Cardiology' : ['Dr. Smith', 'Dr. Johnson'],
    'Dermatology' : ['Dr. Sunil', 'Dr. Krishan'],
    'ENT' : ['Dr. Vinod', 'Dr. Muskan'],
    'Orthopedics' : ['Dr. Pooja', 'Dr. Gourav']
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const fetchPatientByPID = async (pid) => {
    if (!pid) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/opd/patient-pid/${pid}`);
      const data = await res.json();

      if (!res.ok) {
        console.log("not found")
        throw new error(data.message || "Patient Not Found");
      }

      // Update the form using setFormData
      setFormData((val) => ({
        ...val,
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        gname: data.gname || "",
        mobile_no: data.mobile_no || "",
        email: data.email || "",
        address: data.address || "",
        bloodGroup: data.bloodGroup || "",
      }));
    } catch (error) {
      alert("Failed to fetch patient data, Please check PID");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/opd/fill-slip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "OPD Slip fails. Please try again.");
      }

      alert(`OPD Fills Successfully & PID: ${data.visitsDetails.pid}`);  // or we take pid from formData.pid
      resetForm(); //clear the form
    } catch (error) {
      alert("OPD failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pid: "",
      name: "",
      age: "",
      gender: "",
      gname: "",
      mobile_no: "",
      email: "",
      address: "",
      bloodGroup: "",
      department: "",
      doctor: "",
      diagnosis: "",
      fee:"",
      appointmentDate: "",
      visitType: "",
      referredBy: "",
      insuranceNumber: "",
    });
  };

  return (
    // <div className="bg-gray-700 min-h-screen text-white">
    <div>
      <OPDNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-4xl rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* OPD Header */}
              <div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                  <div className="flex items-center justify-around">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-white" />
                      <div>
                        <h1 className="text-3xl font-bold text-white">
                          OPD Registration
                        </h1>
                        <p className="text-blue-100 mt-1">
                          OutPatient Department - Patient Registration Form
                        </p>
                      </div>
                    </div>
                    <Link to="/opd/register-new-patient">
                      <div className="text-white font-medium border-solid border-2 bg-sky-500 hover:bg-sky-600 rounded-lg p-3">
                        Add New Patient
                      </div>
                      {/* <button className="text-white font-medium border-solid border-2 bg-sky-500 hover:bg-sky-600 rounded-lg p-3">Add New Patient</button> */}
                    </Link>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="p-6 bg-white rounded-lg shadow"
                >
                  <div className="p-6 space-y-8">
                    {/* Patient Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <User className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          Patient Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            PID
                          </label>
                          <input
                            type="text"
                            name="pid"
                            value={formData.pid}
                            onChange={handleInputChange}
                            onBlur={() => fetchPatientByPID(formData.pid)}
                            placeholder="Enter PID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age *
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender *
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gaudian Name
                          </label>
                          <input
                            type="text"
                            name="gname"
                            value={formData.gname}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blood Group
                          </label>
                          <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            rows={2}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Appointment Details */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          Appointment Details
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department *
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Department Name</option>
                            {departments.map((dept) => (
                                <option value={dept} key={dept}>
                                  {dept}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor *
                          </label>
                          <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.department}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          >
                            <option value="">Select Doctor</option>
                            {formData.department &&
                      doctors[formData.department]?.map((doc) => (
                        <option value={doc} key={doc}>
                          {doc}
                        </option>
                      ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diagnosis 
                          </label>
                          <input
                            type="text"
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fee *
                          </label>
                          <input
                            type="number"
                            name="fee"
                            value={formData.fee}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Your First Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Visit Type *
                          </label>
                          <select
                            name="visitType"
                            value={formData.visitType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          >
                            <option value="">Select Visit Type</option>
                            <option value="new">New Patient</option>
                            <option value="old">Old Patient</option>
                            <option value="emergency">Emergency</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Referred By
                          </label>
                          <input
                            type="text"
                            name="referredBy"
                            value={formData.referredBy}
                            onChange={handleInputChange}
                            placeholder="Doctor/Hospital name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          Medical Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Insurance Number
                          </label>
                          <input
                            type="text"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCcw className="h-5 w-5 animate-spin" />
                            <span>Registering...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            <span>Register Patient</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isSubmitting}
                        className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                        <span>Reset Form</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* show doctor */}
              <div className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md min-w-[220px]">
                <p className="font-semibold">Dr. Ramesh Sharma</p>
                <p className="text-sm">General Medicine</p>
                <p className="text-xs text-gray-600">
                  Today: 10:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPDFillSlip;
