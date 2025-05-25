import { Link } from "react-router-dom";

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
    <div className="about-container animate-fadeInSlow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="about-title animate-bounceInDown mt-8 mb-4">About Us</h1>
      <p className="about-subtitle animate-fadeInUp mb-10">
        Trusted healthcare with compassion and excellence.
      </p>

      <div className="section-grid flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <img
          src="https://wallpapers.com/images/hd/doctor-pictures-l5y1qs2998u7rf0x.jpg"
          alt="Doctor"
          className="section-image animate-zoomIn"
        />
        <div className="animate-slideRight max-w-xl">
          <h2 className="section-heading animate-fadeIn">Who We Are</h2>
          <p className="section-text animate-slideUp">
            <span className="text-gradient-primary font-semibold">At Jeevan Jyoti Hospital,</span> we are a multidisciplinary team of healthcare professionals committed to delivering compassionate, affordable, and high-quality medical services. With a legacy of excellence and trust, our hospital is equipped with modern diagnostic facilities, advanced surgical units, and a 24x7 emergency response system. Our mission is to provide holistic care tailored to each patient's needs, ensuring their comfort and safety at every stage of treatment. Whether it’s preventive care or specialized procedures, we strive to heal with empathy and integrity.
          </p>
        </div>
      </div>

      <h2 className="services-title animate-fadeInUp mt-16 mb-2">Our Services</h2>
      <p className="services-description animate-pulse mb-8">
        We provide a wide range of healthcare services for you and your family.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="service-card animate-zoomIn"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
          >
            <div className="service-icon animate-bounceSlow">{service.icon}</div>
            <h3 className="service-name animate-fadeInUpSlow">{service.name}</h3>
          </div>
        ))}
      </div>

      <div className="section-grid mt-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="animate-slideLeft max-w-xl md:mr-8">
          <h2 className="why-choose-text pt-6 animate-zoomIn">Why Choose Us</h2>
          <ul className="why-choose-list animate-fadeIn">
            <li className="animate-slideLeft">Experienced and compassionate doctors</li>
            <li className="animate-slideLeft">Modern infrastructure and advanced diagnostics</li>
            <li className="animate-slideLeft">Patient-first approach</li>
            <li className="animate-slideLeft">Affordable and transparent billing</li>
            <li className="animate-slideLeft">24x7 support and emergency services</li>
          </ul>
        </div>
        <img
          src="https://www.sterlinghcs.com/wp-content/uploads/2020/05/medical-emergency-1300x1536.jpg"
          alt="Why Us"
          className="section-image animate-fadeInRight"
        />
      </div>

      <div className="text-center mt-20 animate-slideUp">
        <img
          src="https://cdn.lecturio.com/assets/Featured-image-Student-Blog-Hospital-Team.jpg"
          alt="Hospital Team"
          className="cta-image animate-zoomIn"
        />
        <p className="cta-text animate-bounceIn font-semibold mt-4">
          Discover compassionate care at Jeevan Jyoti Hospital.
        </p>
        <Link to="/contact" className="cta-link animate-bounceInUp inline-block mt-6">
          <button className="cta-button animate-popIn">
            Get in Touch
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
