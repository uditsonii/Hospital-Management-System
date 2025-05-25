import React from "react";
import PageContainer from "../components/PageContainer";
import {
  FaCalendarAlt,
  FaStethoscope,
  FaFileMedicalAlt,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

const PatientOPD = () => {
  const opdServices = [
    {
      title: "Book Appointment",
      description:
        "Easily schedule your visit with our specialists. Choose your preferred doctor and time slot.",
      icon: <FaCalendarAlt />,
      link: "/contact",
      cta: "Schedule Now",
    },
    {
      title: "View Services",
      description:
        "Explore our wide range of healthcare services tailored to your needs.",
      icon: <FaStethoscope />,
      link: "/about#services",
      cta: "View Services",
    },
    {
      title: "Access Medical Records",
      description:
        "Access your past consultation notes, lab reports, and prescriptions (Login Required).",
      icon: <FaFileMedicalAlt />,
      link: "/login",
      cta: "Access Records",
    },
    {
      title: "OPD Timings & Info",
      description:
        "Find information about our Out-Patient Department timings, procedures, and available facilities.",
      icon: <FaClock />,
      link: "/contact#hours",
      cta: "Learn More",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />
      <PageContainer
        title="Patient OPD Services"
        subtitle="Manage your appointments and access OPD information."
      >
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {opdServices.map((service, index) => (
            <div
              ky={index}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between animate-zoomIn"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="text-[3rem] text-[var(--primary-start)] mb-4 animate-bounceSlow">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm mb-6 text-center">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="mt-auto inline-block py-2 px-5 rounded-lg shadow-sm text-sm font-medium text-[var(--text-light)] bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-start)] transition-opacity duration-[var(--transition-speed)] text-center"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-[var(--card-bg)] p-8 rounded-xl shadow-lg animate-fadeInUp">
          <h2 className="text-2xl font-semibold text-gradient-secondary mb-4">
            Preparing for Your OPD Visit
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>
              Bring any previous medical records, test results, or referral
              letters.
            </li>
            <li>Make a list of your current medications, including dosage.</li>
            <li>Write down any questions you have for the doctor.</li>
            <li>
              Arrive 15 minutes before your scheduled appointment time for
              registration.
            </li>
            <li>
              Ensure you have a valid ID and insurance card (if applicable).
            </li>
          </ul>
        </section>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default PatientOPD;
