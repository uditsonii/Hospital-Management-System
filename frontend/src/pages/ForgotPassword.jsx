// src/pages/ForgotPassword.jsx
import React from "react";
import PageContainer from "../components/PageContainer";
import FormInput from "../components/FormInput";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />
      <PageContainer>
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-md bg-[var(--card-bg)] p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gradient-primary mb-6 text-center">
              Forgot Your Password?
            </h2>
            <p className="text-sm text-slate-600 mb-6 text-center">
              Enter your registered mobile number and we'll send you reset
              instructions.
            </p>
            <form className="space-y-6">
              <FormInput
                id="mobile"
                label="Mobile Number"
                type="tel"
                placeholder="10-digit mobile number"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-sm font-medium text-[var(--text-light)] bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] hover:opacity-90 transition-all duration-[var(--transition-speed)] transform hover:scale-105"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
