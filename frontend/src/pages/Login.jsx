// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FormInput from "../components/FormInput";
import { FaSignInAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name|| !formData.password) {
      setError("Mobile number and password are required.");
      return;
    }
    // Basic mobile number validation (10 digits)
    // if (!/^\d{10}$/.test(formData.mobile_no)) {
    //   setError("Please enter a valid 10-digit mobile number.");
    //   return;
    // }
    console.log("Login Data:", formData);
    // Add actual login logic here (e.g., API call)
    // alert("Login functionality placeholder. Check console for data.");
    // On successful login, redirect or update auth state

    // login check
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const res = await fetch("http://localhost:8000/login", option);

      const data = await res.json();
      // const data = await res.text();
      console.log('response: ', data)
      console.log("token: ", data.token);
      if (res.ok) {
        console.log("daata ", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.user);
        alert("Login Successfully");
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials: ", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />
      <PageContainer>
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-md bg-[var(--card-bg)] p-8 md:p-10 rounded-xl shadow-2xl">
            <div className="text-center mb-8">
              <FaSignInAlt className="mx-auto h-12 w-auto text-[var(--primary-start)]" />
              <h2 className="mt-6 text-3xl font-extrabold text-gradient-primary">
                Login to Your Account
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Or{" "}
                <Link
                  to="/register"
                  className="font-medium text-[var(--primary-start)] hover:text-[var(--primary-end)] transition-colors duration-[var(--transition-speed)]"
                >
                  create a new account
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 border border-red-300 text-sm">
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
              />
              <FormInput
                id="mobile_no"
                label="Mobile Number"
                type="tel"
                value={formData.mobile_no}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
              <FormInput
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password"
                required
              />
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[var(--text-light)] bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-start)] transition-all duration-[var(--transition-speed)] transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[var(--primary-start)] hover:text-[var(--primary-end)] transition-colors duration-[var(--transition-speed)]"
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
