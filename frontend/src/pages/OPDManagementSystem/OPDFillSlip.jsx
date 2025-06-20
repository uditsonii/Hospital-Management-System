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

  const departments = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "ENT",
    "Orthopedics",
  ];

  const doctors = {
    "General Medicine": ["Dr. Ram", "Dr. Shyam"],
    Cardiology: ["Dr. Smith", "Dr. Johnson"],
    Dermatology: ["Dr. Sunil", "Dr. Krishan"],
    ENT: ["Dr. Vinod", "Dr. Muskan"],
    Orthopedics: ["Dr. Pooja", "Dr. Gourav"],
  };

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/opd/patient-pid/${pid}`);
      const data = await res.json();

      if (!res.ok) {
        console.log("not found");
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/opd/fill-slip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "OPD Slip fails. Please try again.");
      }

      alert(`OPD Fills Successfully & PID: ${data.visitsDetails.pid}`); // or we take pid from formData.pid
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
      fee: "",
      appointmentDate: "",
      visitType: "",
      referredBy: "",
      insuranceNumber: "",
    });
  };

  return (
    <div>
      <div>
        <div>
          <OPDNavbar />

          <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-4">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-xl shadow-md overflow-hidden bg-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-white drop-shadow-sm" />
                      <div>
                        <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">
                          OPD Registration
                        </h1>
                        <p className="text-blue-200 mt-0.5 text-sm font-medium">
                          OutPatient Department - Patient Registration
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/opd/register-new-patient"
                      className="inline-block"
                    >
                      <button
                        type="button"
                        className="bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm px-5 py-2.5 rounded-md shadow-md transition duration-200 hover:scale-[1.02]"
                      >
                        + Add New Patient
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 max-w-6xl mx-auto">
                  <div className="space-y-8">
                    {/* Patient Information Section */}
                    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-inner border border-indigo-200">
                      <div className="flex items-center mb-5">
                        <User className="h-5 w-5 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-semibold text-indigo-900">
                          Patient Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* PID */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            PID
                          </label>
                          <input
                            type="text"
                            name="pid"
                            value={formData.pid}
                            onChange={handleInputChange}
                            onBlur={() => fetchPatientByPID(formData.pid)}
                            placeholder="Enter PID"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Name */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Your Name"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Age */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Age *
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Age"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Gender *
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Mobile Number"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Guardian Name */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Guardian Name
                          </label>
                          <input
                            type="text"
                            name="gname"
                            value={formData.gname}
                            onChange={handleInputChange}
                            placeholder="Enter Guardian Name"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Blood Group */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Blood Group
                          </label>
                          <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
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

                        {/* Address - full width on large screens */}
                        <div className="lg:col-span-4">
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Address
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            rows={3}
                            onChange={handleInputChange}
                            placeholder="Enter Address"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition resize-none text-sm"
                          />
                        </div>
                      </div>
                    </section>

                    <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-inner border border-indigo-200 mt-8 max-w-6xl mx-auto">
                      <div className="flex items-center mb-5">
                        <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-semibold text-indigo-900">
                          Appointment Details
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Department */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Department *
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          >
                            <option value="">Select Department Name</option>
                            {departments.map((dept) => (
                              <option value={dept} key={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Doctor */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Doctor *
                          </label>
                          <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.department}
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition disabled:bg-gray-100 text-sm"
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

                        {/* Diagnosis */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Diagnosis
                          </label>
                          <input
                            type="text"
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleInputChange}
                            placeholder="Enter Diagnosis"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Fee */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Fee *
                          </label>
                          <input
                            type="number"
                            name="fee"
                            value={formData.fee}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Fee"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>

                        {/* Visit Type */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Visit Type *
                          </label>
                          <select
                            name="visitType"
                            value={formData.visitType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          >
                            <option value="">Select Visit Type</option>
                            <option value="new">New Patient</option>
                            <option value="old">Old Patient</option>
                            <option value="emergency">Emergency</option>
                          </select>
                        </div>

                        {/* Referred By */}
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Referred By
                          </label>
                          <input
                            type="text"
                            name="referredBy"
                            value={formData.referredBy}
                            onChange={handleInputChange}
                            placeholder="Doctor/Hospital name"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>
                      </div>
                    </section>

                    <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 shadow-inner mt-8 max-w-5xl mx-auto border border-indigo-200">
                      <div className="flex items-center mb-4">
                        <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-semibold text-indigo-900">
                          Medical Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                            Insurance Number
                          </label>
                          <input
                            type="text"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleInputChange}
                            placeholder="Enter Insurance Number"
                            className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:outline-none shadow-sm transition text-sm"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-300 max-w-4xl mx-auto">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`flex-1 relative rounded-lg px-5 py-3 font-semibold text-white
      bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700
      hover:brightness-110
      transition duration-300 ease-in-out
      transform hover:scale-105 active:scale-95
      focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed
      flex items-center justify-center space-x-2`}
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
                        className={`flex-1 rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white
      hover:bg-gray-600
      transition duration-300 ease-in-out
      transform hover:scale-105 active:scale-95
      focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center space-x-2`}
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
