// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[var(--primary-end)] to-[var(--primary-start)] text-[var(--text-light)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Jeevan Jyoti Hospital</h3>
            <p className="text-sm text-slate-300">
              Providing compassionate healthcare for a healthier tomorrow.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              123 Health St, Wellness City, India
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]">About Us</a></li>
              <li><a href="/contact" className="hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]">Contact</a></li>
              <li><a href="/opd" className="hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]">OPD Services</a></li>
              <li><a href="#" className="hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]"><FaFacebook size={24} /></a>
              <a href="#" className="text-slate-300 hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]"><FaTwitter size={24} /></a>
              <a href="#" className="text-slate-300 hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]"><FaInstagram size={24} /></a>
              <a href="#" className="text-slate-300 hover:text-[var(--primary-start)] transition-colors duration-[var(--transition-speed)]"><FaLinkedin size={24} /></a>
            </div>
               </div>
        </div>
        <div className="rounded-xl shadow-xl overflow-hidden h-64 card-hover mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.220981354354!2d75.02857977433354!3d29.53905824234095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39114c4ee4aa3cbd%3A0x4cd8783de05155a0!2sJeevan%20Jyoti%20Hospital!5e0!3m2!1sen!2sin!4v1747676048193!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border:0 }}
              allowFullScreen=""
              loading="lazy"
              title="Jeevan Jyoti Hospital Location"
            ></iframe>
          </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-white-400">
          © {new Date().getFullYear()} Jeevan Jyoti Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;