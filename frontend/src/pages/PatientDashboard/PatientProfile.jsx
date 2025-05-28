import React, { useState ,useEffect} from "react";
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
  const navigate=useNavigate();
useEffect(() => {
  const localUser = JSON.parse(localStorage.getItem("user")) || {};
  setUser(localUser);
}, []);


const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 useEffect(() => {
  if (user) {
    setFormData({
      fullName: user.name || "",
      age: user.age || "",
      gender: user.gender || "",
      mobile: user.mobile_no|| "",     
      gname: user.gname || "",      
      password:"", 
      confirmPassword: "",
    });
  }
}, [user]);
   const handleSubmit = async (e) => {
  e.preventDefault();
  const userId = user?._id;

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (formData.mobile.length !== 10 || isNaN(formData.mobile)) {
    setError("Mobile number must be 10 digits");
    return;
  }

  setError("");

  try {
    const response = await fetch(`http://localhost:8000/profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
const handleClose=()=>
{
 navigate('/patient-dashboard')
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2">
      <div className="bg-white rounded-lg w-full max-w-sm p-4 relative shadow-lg">
        {/* Close Button */}
        <IoClose
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl">
          </IoClose >
        {/* Success Message */}
        {showSuccess ? (
          <div className="text-center space-y-4 py-6">
            <p className="text-green-600 text-lg font-semibold">✅ Profile Updated successfully!</p>
        
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Patient Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-gray-700 text-sm">
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />

              <input
                name="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Age"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
              <input
                name="gname"
                type="text"
                value={formData.gname}
                onChange={handleChange}
                required
                placeholder="Guardian's Name"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
               

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />

              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />

              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
