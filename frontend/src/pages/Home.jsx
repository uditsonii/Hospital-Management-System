import React, { useState, useEffect } from "react";
import bgImage from '../assets/bgImage/bgImage.jpg';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAmbulance,
  FaUserMd,
  FaProcedures,
  FaFlask,
  FaHospitalAlt,
  FaClock,
  FaHospitalSymbol,
  FaUserAlt,
  FaClinicMedical,
  FaHeartbeat,
  FaComments,
} from "react-icons/fa";

import TPAPartners from "../components/TPAPartners";
import Doctors from "../components/Doctors";
import HorizontalVideoScroll from "../components/HorizontalVideoScroll";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";
import MedicalChatbot from "../components/chatboxai";

const services = [
  {
    icon: <FaUserMd className="text-white text-4xl" />,
    title: "Expert Doctors",
    description: "Highly qualified and experienced medical professionals.",
  },
  {
    icon: <FaProcedures className="text-white text-4xl" />,
    title: "Advanced Procedures",
    description:
      "Utilizing cutting-edge technologies for effective treatments.",
  },
  {
    icon: <FaFlask className="text-white text-4xl" />,
    title: "Modern Laboratory",
    description: "Precise diagnostics with modern lab facilities.",
  },
  {
    icon: <FaAmbulance className="text-white text-4xl" />,
    title: "Emergency Care",
    description: "Round-the-clock emergency response team.",
  },
  {
    icon: <FaHospitalSymbol className="text-white text-4xl" />,
    title: "In-Patient Care",
    description: "Comfortable and personalized in-patient services.",
  },
  {
    icon: <FaHeartbeat className="text-white text-4xl" />,
    title: "Specialized Clinics",
    description: "Focused care in cardiology, pediatrics, oncology and more.",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Home = () => {
  const [showEmergency, setShowEmergency] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fullText = "City Hospital";
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const typewriter = () => {
      if (!isDeleting) {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          setI(i + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
          return;
        }
      } else {
        if (i > 0) {
          setTypewriterText(fullText.slice(0, i - 1));
          setI(i - 1);
        } else {
          setIsDeleting(false); // Reset to typing
        }
      }
    };

    const timeout = setTimeout(typewriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [i, isDeleting]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 500) {
        setShowEmergency(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <IndexNavbar />
      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat text-white py-24 px-4 sm:py-32 text-center h-[600px]"
          style={{
            // backgroundImage: "url('https://www.zmartbuild.com/wp-content/uploads/2021/10/38054.jpg')",
             backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center items-center h-full">
            {/* <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Welcome to{" "}
              <span className="text-blue-500 drop-shadow-[3px_3px_6px_rgba(0,0,0,0.6)]">
                City Hospital
              </span>
            </h1> */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 animate-gradientWave bg-[length:200%_200%]">
                Welcome to{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 animate-gradientWave bg-[length:200%_200%] inline-block border-r-2 border-white pr-1 animate-blink">
                {typewriterText}
              </span>
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mt-4 text-slate-100">
              Your health is our priority. Compassionate care, advanced
              technology.
            </p>
            <div className="mt-40 flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link
                to="/opd"
                className="px-6 py-3 bg-[var(--text-light)] text-[var(--primary-start)] font-semibold rounded-lg shadow hover:scale-105 transition"
              >
                Book Appointment
              </Link> */}
              <Link
                to="/opd"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold rounded-lg shadow-xl hover:shadow-blue-400/40 hover:scale-105 transition-all"
              >
                Book Appointment
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border border-[var(--text-light)] text-[var(--text-light)] font-semibold rounded-lg hover:bg-[var(--text-light)] hover:text-[var(--primary-start)] transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Popup */}
        {showEmergency && (
          // <div
          //   className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          //   onClick={() => setShowEmergency(false)}
          // >

          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4"
            onClick={() => setShowEmergency(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="bg-white rounded-2xl px-4 py-6 w-full max-w-sm sm:max-w-md md:max-w-lg relative shadow-2xl flex flex-col items-center gap-6 animate-zoomIn max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEmergency(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold transition"
              >
                &times;
              </button>
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
                alt="Emergency Services"
                // className="rounded-2xl w-full object-cover shadow-lg max-h-48 sm:max-h-64"
                className="rounded-xl w-full h-auto object-cover shadow-md"
              />
              {/* <div className="flex items-center gap-3 text-red-700 font-extrabold text-xl mt-4 mb-2"> */}
              <div className="flex flex-wrap items-center gap-2 text-red-700 font-extrabold text-lg sm:text-xl mt-4 mb-2">
                <FaHospitalAlt className="text-3xl" />
                <span>Hospital Emergency:</span>
                <a
                  href="tel:1800123456"
                  className="underline hover:text-red-900 transition"
                >
                  1800-123-456
                </a>
                <FaClock className="text-xl text-red-500 ml-2" />
                <span className="text-sm font-normal ml-1">24×7 Service</span>
              </div>
              <h2 className="text-3xl font-extrabold text-red-600 text-center">
                Emergency Services
              </h2>
              <ul className="text-gray-800 text-lg space-y-6 w-full">
                <li className="flex items-center gap-4 hover:text-red-600 transition cursor-pointer">
                  <FaAmbulance className="text-red-600 text-2xl flex-shrink-0" />
                  <strong className="min-w-[120px]">Ambulance:</strong>
                  <a
                    href="tel:1800123456"
                    className="text-blue-600 hover:underline"
                  >
                    1800-123-456
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Our Specialists Section */}
        <motion.section
          className="py-10 bg-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
            Our Specialists
          </h2>
          <div className="px-4 sm:px-6 lg:px-8">
            <Doctors />
          </div>
        </motion.section>

        {/* Our Facilities Section */}
        <motion.section
          className="py-20 bg-gray-100"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
              Our Facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  front:
                    "https://www.carthagehospital.com/wp-content/uploads/2018/05/Emergency-room.jpg",
                  backTitle: "Emergency Department",
                  backText:
                    "24/7 emergency care equipped with latest life-saving technology.",
                },
                {
                  front:
                    "https://th.bing.com/th/id/OIP.nEWcNXhCrSEcaIXEKip62gHaEK?rs=1&pid=ImgDetMain",
                  backTitle: "Diagnostic Lab",
                  backText:
                    "Precision testing with modern diagnostic tools and fast reporting.",
                },
                {
                  front:
                    "https://bbhospital.com.np/Content/img/c94a3833-aa20-439e-9ff1-4979bbb79dc8.jpg",
                  backTitle: "In-patient Wards",
                  backText:
                    "Spacious, clean, and comfortable recovery rooms with personalized care.",
                },
                {
                  front:
                    "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_33/2120896/170815-pharmacy-mn-1340.jpg",
                  backTitle: "Pharmacy",
                  backText:
                    "On-site pharmacy offering genuine medicines and 24×7 availability.",
                },
                {
                  front:
                    "https://smims.sreemookambikainstitute.com/wp-content/uploads/2022/08/ot-2.jpg",
                  backTitle: "Operation Theatres",
                  backText:
                    "Modern, sterile surgical theatres with top-tier equipment and safety.",
                },
                {
                  front:
                    "https://timesapplaud.com/wp-content/uploads/2024/01/ICU.jpg",
                  backTitle: "ICU Facilities",
                  backText:
                    "Advanced intensive care units staffed by experienced professionals.",
                },
              ].map((facility, index) => (
                <div
                  key={index}
                  className="group [perspective:1000px] hover:shadow-2xl transition duration-500"
                >
                  <div className="relative h-80 w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-2xl">
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden [backface-visibility:hidden]">
                      <img
                        src={facility.front}
                        alt={`Facility ${index + 1}`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>

                    {/* Back */}
                    {/* <div className="absolute inset-0 bg-gray-50 p-6 rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        {facility.backTitle}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {facility.backText}
                      </p>
                    </div> */}
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center text-center">
                      {/* Blurred Background Image Layer */}
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-105 filter blur-sm brightness-75"
                        style={{
                          backgroundImage: `url(${facility.front})`,
                        }}
                      ></div>

                      {/* Overlay Content */}
                      <div className="relative z-10 bg-white/60 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg max-w-xs">
                        <h3 className="text-xl font-semibold text-blue-700 mb-2">
                          {facility.backTitle}
                        </h3>
                        <p className="text-gray-800 text-sm">
                          {facility.backText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Services Section */}
        <motion.section
          className="py-20 bg-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
              Our Services
            </h2>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 text-white shadow-2xl hover:scale-105 transition-transform duration-300"
                  // className="p-8 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer"
                  variants={cardVariants}
                >
                  <div className="mb-5">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* We Value The Life Section */}
        <motion.section
          className="py-20 bg-gray-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center">
              <img
                src="/images/dr-anjani.png"
                alt="Dr. Anjani Agarwal"
                className="rounded-[60px] shadow-2xl object-cover w-full max-w-md"
              />
              <h3 className="text-2xl font-bold mt-6 text-blue-600">
                Dr. Anjani Agarwal
              </h3>
              <p className="text-gray-600 text-sm">Director</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-8">
                We Value the Life
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full text-xl">
                    <FaUserAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Patient First</h4>
                    <p className="text-gray-700 text-sm">
                      For us, patient care comes first & we put patient's needs
                      above all...
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full text-xl">
                    <FaClinicMedical />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Quality & Affordable</h4>
                    <p className="text-gray-700 text-sm">
                      Quality care is the key component of the right to
                      health...
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full text-xl">
                    <FaHospitalAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      All Services under One Roof
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We bring unparalleled medical services and diagnostic
                      facilities...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Media Section */}
        <motion.section
          className="py-20 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
              Our Media
            </h2>
            <HorizontalVideoScroll />
          </div>
        </motion.section>

        {/* TPA Partners */}
        <motion.div
          className="animate-fadeIn"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <TPAPartners />
          </div>
        </motion.div>

        {/* Floating Chatbot Component */}
        {/* <div className="fixed bottom-6 right-6 z-50 w-[370px]"> */}
        {/* <div className="fixed bottom-6 right-6 z-50 w-[370px] rounded-2xl shadow-lg ring-2 ring-blue-400 animate-pulse hover:animate-none transition-all duration-300">
          <MedicalChatbot />
        </div> */}
        <div
          className="fixed right-2 sm:right-6 w-[90vw] sm:w-96 z-50 
             rounded-2xl shadow-2xl ring-2 ring-blue-400 
             animate-bounce-slow hover:animate-none 
             opacity-70 hover:opacity-100 
             transition-all duration-500 ease-in-out cursor-pointer group"
        >
          <MedicalChatbot />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
