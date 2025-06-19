import React, { useState } from "react";
import OPDNavbar from "../../components/OPDNavbar";
import { User, FileText, RefreshCcw, Save, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const NewPatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    gname: "",
    mobile_no: "",
    email: "",
    address: "",
    bloodGroup: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/opd/register-new-patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      alert(`Patient registered successfully! PID: ${data.patient.pid}`);
      resetForm();
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      gname: "",
      mobile_no: "",
      email: "",
      address: "",
      bloodGroup: "",
    });
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-white">
  <OPDNavbar />

  <div className="max-w-3xl mx-auto p-4 md:p-6">
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <FileText className="h-6 w-6" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">OPD Registration</h1>
              <p className="text-sm text-blue-200">
                OutPatient Department - Patient Registration
              </p>
            </div>
          </div>

          <Link
            to="/opd/fill-slip"
            className="px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition shadow-md"
          >
            &larr; Back
          </Link>
        </div>
      </div>
     

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center space-x-3">
              <User className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-1">
                Patient Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  label: "Name *",
                  name: "name",
                  type: "text",
                  placeholder: "Enter Patient Name",
                  required: true,
                },
                {
                  label: "Age *",
                  name: "age",
                  type: "number",
                  placeholder: "Enter Age",
                  required: true,
                },
                {
                  label: "Gender *",
                  name: "gender",
                  type: "select",
                  options: [
                    { value: "", label: "Select Gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ],
                  required: true,
                },
                {
                  label: "Mobile Number *",
                  name: "mobile_no",
                  type: "tel",
                  placeholder: "Enter Mobile Number",
                  required: true,
                },
                {
                  label: "Guardian Name",
                  name: "gname",
                  type: "text",
                  placeholder: "Enter Guardian Name",
                  required: false,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter Email",
                  required: false,
                },
                {
                  label: "Blood Group",
                  name: "bloodGroup",
                  type: "select",
                  options: [
                    { value: "", label: "Select Blood Group" },
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ],
                  required: false,
                },
              ].map(({ label, name, type, placeholder, required, options }) => (
                <div key={name} className="flex flex-col">
                  <label
                    htmlFor={name}
                    className="mb-2 text-gray-700 font-medium"
                  >
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required={required}
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required={required}
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  )}
                </div>
              ))}

              {/* Address textarea */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                <label
                  htmlFor="address"
                  className="mb-2 text-gray-700 font-medium"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-3 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-400"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Register Patient</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-3 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset Form</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPatientRegistration;
