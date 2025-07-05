import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-sky-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hospital Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">City Hospital</h3>
            <p className="text-sm text-slate-200">
              Providing compassionate healthcare for a healthier tomorrow.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              123 Health St, Wellness City, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-slate-200 hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="text-slate-200 hover:text-white transition">Contact</a></li>
              <li><a href="/opd" className="text-slate-200 hover:text-white transition">OPD Services</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-200 hover:text-white transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-slate-200 hover:text-white transition"><FaTwitter size={24} /></a>
              <a href="#" className="text-slate-200 hover:text-white transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-slate-200 hover:text-white transition"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-xl shadow-xl overflow-hidden h-64 mt-10">
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

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-blue-500 text-center text-sm text-slate-200">
          © {new Date().getFullYear()} City Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
