import React from "react";
import { motion } from "framer-motion";

const specialists = [
  {
    name: "Dr. Suresh Bishnoi",
    title: "General Physician",
    image: "https://i.ytimg.com/vi/5tFOUHQmXkk/maxresdefault.jpg",
    des: "Experienced physician specializing in comprehensive health solutions for all age groups.",
  },
  {
    name: "Dr. Richa Bishnoi",
    title: "BDS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63-1lmfuXa5nb37-89lqHhWC9G6tjeHf1u_IJwXgGawuvxRPMXN3e5ZOzzWlf6DsKuEI&usqp=CAU",
    des: "Expert in dental care with a gentle approach, ensuring healthy smiles.",
  },
  {
    name: "Dr. Sunil Kumar",
    title: "Physiotherapist",
    image: "https://www.internationalinsurance.com/wp-content/uploads/2021/04/Indian-doctor-at-desk-scaled.jpg",
    des: "Helping patients recover mobility and live pain-free through advanced therapy.",
  },
  {
    name: "Dr. Munish Singla",
    title: "Gen & Laparoscopic Surgeon",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyM0CPhh1BKV54q45ty0CdmsXTkhOjhp-GrpWseztwQglx6bwrCXCLfBv9DQ78mYHSt5A&usqp=CAU",
    des: "Precision-driven surgical expert with a focus on minimally invasive treatments.",
  },
];

const Doctors = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-16">
          {specialists.map((doc, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-65 h-64 object-cover border-4 border-blue-400 shadow-lg transition-transform duration-500 hover:scale-105"
                />
                <div className="text-center md:text-left max-w-md">
                  <h3 className="text-4xl font-semibold text-blue-500">{doc.name}</h3>
                  <p className="text-blue-600 font-medium">{doc.title}</p>
                  <p className="mt-2 text-gray-700">{doc.des}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Doctors;