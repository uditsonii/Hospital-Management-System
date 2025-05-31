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

function OPDRegistration() {
  const [formData, setFormData] = useState({
    // Appointment details
    department: "",
    doctor: "",
    appointmentDate: "",
    visitType: "",
    referredBy: "",

    // Additional Info
    insuranceNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      mobile_no: "",
      email: "",
      address: "",
      department: "",
      doctor: "",
      visitType: "",
      bloodGroup: "",
      insuranceNumber: "",
      referredBy: "",
    });
  };

  return (
    // <div className="bg-gray-700 min-h-screen text-white">
    <div>
      <OPDNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-4xl rounded-xl shadow-lg overflow-hidden">
            {/* OPD Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8" />
                <div>
                  <h1 className="text-3xl font-bold">OPD Registration</h1>
                  <p className="text-blue-100 mt-1">
                    OutPatient Department - Patient Registration Form
                  </p>
                </div>
                <span>Add New Patient</span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white rounded-lg shadow"
            >
              <div className="p-6 space-y-8">
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
                        onChange={(e) => e.target.value}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Department Name</option>
                        {/*{departments.map((dept) => (
                      <option value={dept} key={dept}>
                        {dept}
                      </option>
                    ))} */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doctor *
                      </label>
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={(e) => e.target.value}
                        required
                        disabled={!formData.department}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select Doctor</option>
                        {/* {formData.department &&
                      doctors[formData.department]?.map((doc) => (
                        <option value={doc} key={doc}>
                          {doc}
                        </option>
                      ))} */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Visit Type *
                      </label>
                      <select
                        name="visitType"
                        value={formData.visitType}
                        onChange={(e) => e.target.value}
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
                        onChange={(e) => setFormData(e.target.value)}
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
                        onChange={(e) => setFormData(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}

export default OPDRegistration;
