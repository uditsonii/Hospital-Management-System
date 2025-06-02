import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const PatientProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gname: "",
  });
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        age: user.age || "",
        gender: user.gender || "",
        mobile: user.mobile_no || "",
        gname: user.gname || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?._id;

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    if (formData.mobile.length !== 10 || isNaN(formData.mobile)) {
      setError("📱 Mobile number must be 10 digits");
      return;
    }

    setError("");

    try {
      const response = await fetch(`http://localhost:8000/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          age: formData.age,
          gender: formData.gender,
          mobile_no: formData.mobile,
          gname: formData.gname,
          password: formData.password ? formData.password : user.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update profile");
        return;
      }

      const data = await response.json();
      console.log("Profile updated:", data);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Server error: Could not update profile");
    }
  };

  const handleClose = () => {
    navigate("/patient-dashboard");
  };

  return (
 <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center md:items-start
 z-50 p-4">

<div className="bg-white rounded-2xl w-full max-w-lg md:max-w-xl p-4 mt-16 relative shadow-xl border border-gray-300">
        <IoClose
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 cursor-pointer text-2xl"
        />
        {showSuccess ? (
          <div className="text-center py-10 space-y-6">
            <div className="text-green-600 text-6xl">✅</div>
            <h2 className="text-2xl font-bold">Profile Updated Successfully!</h2>
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
  👤 Update Your Profile
</h2>


            <form onSubmit={handleSubmit} className="space-y-5 text-gray-800 text-base">
              {/* Personal Info Section */}
              <div>
                <h3 className="text-xl font-semibold mb-3">📝 Personal Information</h3>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
              </div>

              <div className="flex gap-4">
                <input
                  name="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Age"
                 className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                 className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400" >
                  <option value="">Select Gender</option>
                  <option value="male">Male 👨</option>
                  <option value="female">Female 👩</option>
                  <option value="other">Other 🌈</option>
                </select>
              </div>

              <div>
                <input
                  name="gname"
                  type="text"
                  value={formData.gname}
                  onChange={handleChange}
                  required
                  placeholder="Guardian's Name 👪"
               className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>

              <div>
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Mobile Number 📞"
                 className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="text-xl font-semibold mb-3 mt-4">🔒 Change Password </h3>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password"
                 className="w-full border border-gray-300 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                 className="w-full border border-gray-300 mt-4 rounded-lg px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              {error && (
                <p className="text-red-600 text-center font-semibold text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Save Changes 💾
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
