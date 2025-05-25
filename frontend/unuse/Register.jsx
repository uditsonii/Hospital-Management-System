// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import FormInput from '../components/FormInput';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
    }
    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    console.log('Register Data:', formData);
    // Add actual registration logic here (e.g., API call)
    setSuccess('Registration successful! You can now log in.');
    // alert('Registration functionality placeholder. Check console for data.');
    // On successful registration, redirect or show success message
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-[var(--card-bg)] p-8 md:p-10 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <FaUserPlus className="mx-auto h-12 w-auto text-[var(--accent-start)]" />
            <h2 className="mt-6 text-3xl font-extrabold text-gradient-accent">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[var(--primary-start)] hover:text-[var(--primary-end)] transition-colors duration-[var(--transition-speed)]">
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 border border-red-300 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300 text-sm">
              {success} <Link to="/login" className="font-bold underline">Login now</Link>.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
            />
            <FormInput
              id="mobile"
              label="Mobile Number"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              required
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Your Password"
              required
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[var(--text-light)] bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-start)] transition-all duration-[var(--transition-speed)] transform hover:scale-105"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default Register;