import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IndexNavbar from "../components/IndexNavbar";
import Footer from "../components/Footer";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    mobile_no: "",
    gname: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    email: "",
    bloodGroup: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, option);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/opd/register-new-patient`,
        option
      );

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
      } else {
        alert("Registration failed: ", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <IndexNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            🏥 Patient Registration
          </h2>

          <div className="flex flex-col gap-4">
            <label>Name *</label>
            <input
              name="name"
              placeholder="👤 Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Age *</label>
            <input
              name="age"
              type="number"
              placeholder="🎂 Age"
              value={form.age}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Gender *</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                ⚧️ Select Gender
              </option>
              <option value="male">♂️ Male</option>
              <option value="female">♀️ Female</option>
              <option value="other">⚧️ Other</option>
            </select>

            <label>Mobile Number *</label>
            <input
              name="mobile_no"
              placeholder="📱 Mobile Number"
              value={form.mobile_no}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Guardian's Name</label>
            <input
              name="gname"
              placeholder="👪 Guardian's Name"
              value={form.gname}
              onChange={handleChange}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Password *</label>
            <input
              name="password"
              type="password"
              placeholder="🔒 Password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Confirm Password *</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="🔑 Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label>Email</label>
            <input
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
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
                value={form.address}
                rows={2}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition"
          >
            📝 Register
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            {/* <a href="/main" className="text-blue-600 underline hover:text-blue-800">
            Login
          </a> */}
            <Link
              to={"/login"}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
