import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Register = ({ addUser }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    guardian: '',
    password: '',
    confirmPassword: '',
    age: '',
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
    alert('✅ User registered successfully!');
    setForm({
      name: '',
      mobile: '',
      guardian: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
    });
  };

  return (
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
          <input
            name="name"
            placeholder="👤 Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="mobile"
            placeholder="📱 Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="guardian"
            placeholder="👪 Guardian's Name"
            value={form.guardian}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="🔑 Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="age"
            type="number"
            placeholder="🎂 Age"
            value={form.age}
            onChange={handleChange}
            required
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

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
          Already have an account?{' '}
          <a href="/main" className="text-blue-600 underline hover:text-blue-800">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
