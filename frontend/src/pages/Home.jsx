import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
} from "react-icons/fa";
import TPAPartners from "../components/TPAPartners";
import Doctors from "../components/Doctors";
import HorizontalVideoScroll from "../components/HorizontalVideoScroll";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

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

const Home = () => {
  const [showEmergency, setShowEmergency] = useState(false);

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
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />
      <main>
        <section
          className="relative bg-cover bg-center bg-no-repeat text-[var(--text-light)] py-32 text-center animate-fadeIn h-[600px]"
          style={{
            backgroundImage:
              "url('https://www.zmartbuild.com/wp-content/uploads/2021/10/38054.jpg')",
          }} // Replace with your preferred image
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>{" "}
          {/* Dark overlay for contrast */}
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Welcome to{" "}
              <span className="text-blue-500 drop-shadow-[3px_3px_6px_rgba(0,0,0,0.6)]">
                Jeevan Jyoti Hospital
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto mt-4 text-slate-100">
              Your health is our priority. Compassionate care, advanced
              technology.
            </p>
            <div className="mt-40 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/opd"
                className="px-6 py-3 bg-[var(--text-light)] text-[var(--primary-start)] font-semibold rounded-lg shadow hover:scale-105 transition"
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

        {showEmergency && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            onClick={() => setShowEmergency(false)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl flex flex-col items-center gap-6 animate-zoomIn"
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
                className="rounded-2xl w-full object-cover shadow-lg"
              />
              <div className="flex items-center gap-3 text-red-700 font-extrabold text-xl mt-4 mb-2">
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
          </div>
        )}
        <section className="py-10 bg-gray-100 animate-fadeIn">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
            Our Specialists
          </h2>
          <Doctors />
        </section>
        <section className="py-20 bg-gray-100 animate-slideRight">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl  font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
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
                <div key={index} className="group [perspective:1000px]">
                  <div className="relative h-80 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-2xl">
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden [backface-visibility:hidden]">
                      <img
                        src={facility.front}
                        alt={`Facility ${index + 1}`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 bg-gray-50 p-6 rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        {facility.backTitle}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {facility.backText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white animate-slideUp">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-xl hover:scale-105 transform transition duration-300 animate-zoomIn delay-[${
                    idx * 100
                  }ms]`}
                >
                  <div className="mb-5">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-fadeIn">
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
        </section>
        <section className="py-20 bg-white animate-slideUp">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400 drop-shadow-xl">
              Our Media
            </h2>
            <HorizontalVideoScroll />
          </div>
        </section>

        <div className="animate-fadeIn">
          <TPAPartners />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
