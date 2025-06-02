import React from "react";
import OPDNavbar from "../../components/OPDNavbar";

function OPDRegistration() {
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
            {/* <FileText className="h-8 w-8" /> */}
            <div>
              <h1 className="text-3xl font-bold">OPD Registration</h1>
              <p className="text-blue-100 mt-1">OutPatient Department - Patient Registration Form</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Patient Information */}
          <div className="bg-gray-50 rounded-lg p-6">
             <div className="flex items-center space-x-2 mb-4">
              {/* <User className="h-5 w-5 text-blue-600" /> */}
              <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input type="text" name="firstName" value={FormData.firstName} onChange={(e) => setFormData(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter Your First Name"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Last></Last> Name
                </label>
                <input type="text" name="lastName" value={FormData.firstName} onChange={(e) => setFormData(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter Your First Name"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input type="text" name="firstName" value={FormData.firstName} onChange={(e) => setFormData(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter Your First Name"/>
              </div>
            </div>
           </div>
        </div>
      </div>
      </div>
     </div>
    </div>
  );
}

export default OPDRegistration;
