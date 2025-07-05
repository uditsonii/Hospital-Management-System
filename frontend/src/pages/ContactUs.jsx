// src/pages/ContactUs.jsx
import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import FormInput from "../components/FormInput";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      console.log("Form Data:", formData);
      // Here you would typically send the data to a backend
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000); // Reset message after 3 seconds
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />
      <PageContainer
        title="Get In Touch"
        subtitle="We're here to help and answer any question you might have."
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[var(--card-bg)] p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-6">
              Send us a Message
            </h2>
            {isSubmitted && (
              <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
              <FormInput
                id="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Regarding..."
                required
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[var(--border-color)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-start)] focus:border-[var(--primary-start)] sm:text-sm transition-shadow duration-[var(--transition-speed)]"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[var(--text-light)] bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-start)] transition-opacity duration-[var(--transition-speed)]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[var(--card-bg)] p-8 rounded-xl shadow-xl card-hover">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-2xl text-[var(--primary-start)] mr-3 mt-1 flex-shrink-0" />
                  <p>
                    City Hospital
                    <br />
                    123 Health Street, Wellness City, PIN 543210
                    <br />
                    India
                  </p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-2xl text-[var(--primary-start)] mr-3" />
                  <a
                    href="tel:+911234567890"
                    className="hover:text-[var(--primary-end)] transition-colors"
                  >
                    +91 12345 67890
                  </a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-2xl text-[var(--primary-start)] mr-3" />
                  <a
                    href="mailto:info@jeevanjyoti.com"
                    className="hover:text-[var(--primary-end)] transition-colors"
                  >
                    info@jeevanjyoti.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] p-8 rounded-xl shadow-xl card-hover">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                Hospital Hours
              </h2>
              <ul className="space-y-1 text-slate-600">
                <li>
                  <strong>OPD:</strong> Mon - Sat: 9:00 AM - 5:00 PM
                </li>
                <li>
                  <strong>Emergency:</strong> 24/7 Open
                </li>
                <li>
                  <strong>Pharmacy:</strong> 24/7 Open
                </li>
              </ul>
            </div>
            {/*Embedded Map */}
            <div className="rounded-xl shadow-xl overflow-hidden h-64 card-hover">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.220981354354!2d75.02857977433354!3d29.53905824234095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39114c4ee4aa3cbd%3A0x4cd8783de05155a0!2sJeevan%20Jyoti%20Hospital!5e0!3m2!1sen!2sin!4v1747676048193!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="City Hospital Location"
              ></iframe>
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ContactUs;
