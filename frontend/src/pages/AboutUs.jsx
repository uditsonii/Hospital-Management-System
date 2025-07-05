import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import IndexNavbar from "../components/IndexNavbar";

const services = [
  { name: "24x7 Emergency", icon: "🚑" },
  { name: "Cardiology", icon: "❤" },
  { name: "Pediatrics", icon: "👶" },
  { name: "Maternity Care", icon: "🤰" },
  { name: "Diagnostics", icon: "🔬" },
  { name: "Outpatient Services", icon: "💊" },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <IndexNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 text-blue-800 animate-slide-down">
          About Us
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10 animate-fade-in-up">
          Trusted healthcare with compassion and excellence.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16">
          <img
            src="https://wallpapers.com/images/hd/doctor-pictures-l5y1qs2998u7rf0x.jpg"
            alt="Doctor"
            className="rounded-2xl w-full md:w-1/2 shadow-xl animate-zoom-in"
          />
          <div className="text-gray-700 text-lg leading-relaxed animate-slide-in-right">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              Who We Are
            </h2>
            <p>
              <span className="font-bold text-blue-800">At City Hospital,</span>
              we are a multidisciplinary team of healthcare professionals committed to delivering compassionate, affordable, and
              high-quality medical services. Our mission is to provide holistic care tailored to each patient's
              needs with modern diagnostics, 24x7 emergency services, and personalized treatments.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-700 mb-2 animate-slide-up">Our Services</h2>
          <p className="text-gray-600 animate-fade-in">Comprehensive care for all your health needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white shadow-xl rounded-2xl transform transition duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="text-4xl mb-3 animate-bounce text-blue-700">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
          <div className="text-gray-700 text-lg leading-relaxed animate-slide-in-left">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Why Choose Us</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Experienced and compassionate doctors</li>
              <li>Modern infrastructure and advanced diagnostics</li>
              <li>Patient-first approach</li>
              <li>Affordable and transparent billing</li>
              <li>24x7 support and emergency services</li>
            </ul>
          </div>
          <img
            src="https://www.sterlinghcs.com/wp-content/uploads/2020/05/medical-emergency-1300x1536.jpg"
            alt="Why Us"
            className="rounded-2xl w-full md:w-1/2 shadow-xl animate-fade-in"
          />
        </div>

        <div className="text-center mb-16 animate-slide-up">
          <img
            src="https://cdn.lecturio.com/assets/Featured-image-Student-Blog-Hospital-Team.jpg"
            alt="Hospital Team"
            className="rounded-xl w-full max-w-4xl mx-auto shadow-2xl animate-zoom-in"
          />
          <p className="text-lg mt-6 text-blue-800 font-semibold animate-pulse">
            Discover compassionate care at City Hospital.
          </p>
          <Link to="/contact">
            <button className="mt-6 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 animate-bounce-in">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
