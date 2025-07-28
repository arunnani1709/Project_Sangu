import React from "react";
import { useInView } from "react-intersection-observer";

// Local images
import sangameshPhoto from "../Photos/Sangamesh.jpg";
import Doctor2 from "../Photos/Doctor2.jpg";
import Doctor3 from "../Photos/Doctor3.jpg";
import Doctor4 from "../Photos/Doctor4.jpg";
import bgabout from "../Photos/bgabout.jpg"; // Background image

const doctors = [
  {
    name: "Dr. Aisha Rahman",
    specialization: "Cardiologist",
    photo: Doctor4,
    description:
      "With 15+ years of experience in interventional cardiology, Dr. Aisha specializes in complex heart procedures and patient care. She is known for her compassionate approach and precise diagnostics.",
  },
  {
    name: "Dr. John Lee",
    specialization: "Dermatologist",
    photo: Doctor2,
    description:
      "Dr. John is a board-certified dermatologist focused on treating chronic skin conditions. He’s a leading expert in laser therapies and cosmetic dermatology, with over 10 years in practice.",
  },
  {
    name: "Dr. Maria Gomez",
    specialization: "Neurologist",
    photo: Doctor3,
    description:
      "Dr. Gomez brings two decades of neurological expertise, specializing in stroke management and neurodegenerative disorders. Her research has contributed to advancements in brain health.",
  },
  {
    name: "Dr. Sangamesh Patil",
    specialization: "Orthopedic Surgeon",
    photo: sangameshPhoto,
    description:
      "Dr. Sangamesh is a highly respected orthopedic surgeon with expertise in joint replacement and sports injuries. He is known for his surgical precision and patient-centered care.",
  },
];

const DoctorCard = ({ doctor, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform 
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
        bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center w-full md:w-1/3 transform hover:scale-[1.02] backdrop-blur-md bg-opacity-90`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="w-40 h-40 mb-4 overflow-hidden rounded-xl shadow-md">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
      <p className="text-blue-500 font-medium mb-2">{doctor.specialization}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{doctor.description}</p>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div
      className="min-h-screen py-12 px-6 md:px-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgabout})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 drop-shadow-lg">
        OUR SPECIALISTS
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {doctors.map((doctor, index) => (
          <DoctorCard doctor={doctor} key={`${doctor.name}-${index}`} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
