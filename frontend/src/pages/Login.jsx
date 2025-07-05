// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FormInput from "../components/FormInput";
import { FaSignInAlt, FaEye, FaEyeSlash, FaHospitalAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.password) {
      setError("Mobile number and password are required.");
      return;
    }

    try {
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, option);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          willClose: () => navigate("/dashboard"),
        });
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: data.message || "Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 animate-background-pan">
      <IndexNavbar />

      <PageContainer>
        <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-blue-200 animate-fade-in-up transition-all duration-700">
            <div className="text-center mb-10">
              <FaHospitalAlt className="mx-auto text-blue-600 mb-2 w-14 h-14" />
              <h2 className="text-3xl font-extrabold text-blue-700 tracking-tight">
                Login to Your Account
              </h2>
              <p className="mt-3 text-sm text-gray-700">
                Or{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  create a new account
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                id="name"
                label="Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />

              <FormInput
                id="mobile_no"
                label="Mobile Number"
                type="tel"
                value={formData.mobile_no}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />

              <div className="relative">
                <FormInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your Password"
                  required
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-10 right-3 text-blue-600 hover:text-blue-800 transition-transform duration-300 hover:scale-110"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Sign In
                </button>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default Login;
