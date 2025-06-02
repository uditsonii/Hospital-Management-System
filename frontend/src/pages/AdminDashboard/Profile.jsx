import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Profile = () => {
  const [adminData, setAdminData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91-9999999999",
    password: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (adminData.password !== adminData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setIsEditing(false);
    alert("✅ Profile updated (frontend only)");
    // TODO: Send updated data to backend
  };
const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100">
        <div className="px-6 py-5 bg-blue-400">
          <h1 className="text-white text-3xl font-bold tracking-wide text-center">
            👤 Admin Profile
          </h1>
        </div>
        <div className="p-6 space-y-5 text-gray-800">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                isEditing
                  ? "focus:ring-blue-400 bg-white"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                isEditing
                  ? "focus:ring-blue-400 bg-white"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={adminData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                isEditing
                  ? "focus:ring-blue-400 bg-white"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={adminData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                isEditing
                  ? "focus:ring-blue-400 bg-white"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={adminData.confirmPassword}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                isEditing
                  ? "focus:ring-blue-400 bg-white"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="text-center pt-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all"
              >
                💾 Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
