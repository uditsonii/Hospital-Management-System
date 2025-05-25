import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DoctorRegister = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',
    gender: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }
    alert('✅ Doctor registered successfully!');
    setForm({
      name: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      specialization: '',
      experience: '',
      gender: '',
    });
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-6 py-6 space-y-4"
      >
        <h2 className="text-2xl font-extrabold text-center text-blue-700 mb-2">
          🩺 Doctor Registration
        </h2>

        <input
          name="name"
          placeholder="👤 Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="mobile"
          placeholder="📱 Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="✉️ Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="🔑 Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="specialization"
          placeholder="🧠 Specialization (e.g., Cardiologist)"
          value={form.specialization}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="experience"
          type="number"
          placeholder="📅 Years of Experience"
          value={form.experience}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="" disabled>⚧️ Select Gender</option>
          <option value="male">♂️ Male</option>
          <option value="female">♀️ Female</option>
          <option value="other">⚧️ Other</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
        >
          📝 Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default DoctorRegister;
