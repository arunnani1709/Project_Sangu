import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Heart, Users, Award, Shield, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Local images
import sangameshPhoto from "../Photos/Sangamesh.jpg";
import Doctor2 from "../Photos/Doctor2.jpg";
import Doctor4 from "../Photos/Doctor4.jpg";
import bgabout from "../Photos/bgabout.jpg";

const doctors = [
  {
    name: "Dr. Aisha Rahman",
    specialization: "Cardiologist",
    photo: Doctor2,
    description:
      "With 15+ years of experience in interventional cardiology, Dr. Aisha specializes in complex heart procedures and patient care. She is known for her compassionate approach and precise diagnostics.",
    experience: "15+ Years",
    patients: "2,500+",
  },
  {
    name: "Dr. John Lee",
    specialization: "Dermatologist",
    photo: Doctor4,
    description:
      "Dr. John is a board-certified dermatologist focused on treating chronic skin conditions. He's a leading expert in laser therapies and cosmetic dermatology, with over 10 years in practice.",
    experience: "10+ Years",
    patients: "1,800+",
  },
  {
    name: "Dr. Sangamesh Patil",
    specialization: "Orthopedic Surgeon",
    photo: sangameshPhoto,
    description:
      "Dr. Sangamesh is a highly respected orthopedic surgeon with expertise in joint replacement and sports injuries. He is known for his surgical precision and patient-centered care.",
    experience: "12+ Years",
    patients: "2,200+",
  },
];

const stats = [
  { icon: Users, value: "100 +", label: "Patients Treated" },
  { icon: Heart, value: "95%", label: "Success Rate" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Clock, value: "24/7", label: "Emergency Care" },
];

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "We treat every patient with empathy, dignity, and respect, ensuring their comfort and well-being throughout their healthcare journey.",
  },
  {
    icon: Shield,
    title: "Medical Excellence",
    description:
      "Our commitment to the highest standards of medical practice drives us to continuously improve and deliver exceptional healthcare outcomes.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "We believe in the power of teamwork, bringing together diverse medical expertise to provide comprehensive patient care.",
  },
  {
    icon: Star,
    title: "Innovation",
    description:
      "We embrace cutting-edge medical technologies and treatment methodologies to offer the most advanced care available.",
  },
];

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;

    const numValue = parseInt(value.replace(/[^\d]/g, ""));
    const increment = numValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        current = numValue;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {value.includes("%")
        ? `${count}%`
        : value.includes("+")
        ? `${count.toLocaleString()}+`
        : value.includes("/")
        ? value
        : count}
    </span>
  );
};

const DoctorCard = ({ doctor, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform overflow-hidden rounded-lg bg-white shadow-md group hover:shadow-lg ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-green-600 bg-opacity-20 opacity-0 group-hover:opacity-60 transition duration-300 flex items-end rounded-lg">
          <div className="p-4 text-white text-sm font-medium">
            {doctor.experience} Experience
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-semibold mb-3">
          {doctor.specialization}
        </p>
        <p className="text-gray-600 text-sm">{doctor.description}</p>
      </div>
    </div>
  );
};

const ValueCard = ({ value, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const Icon = value.icon;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform rounded-lg bg-white shadow-md hover:shadow-xl p-8 text-center ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
          <Icon className="w-8 h-8 text-green-400" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed">{value.description}</p>
    </div>
  );
};

const StatCard = ({ stat, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ease-out transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="mb-4 flex justify-center">
        <div className="p-4 rounded-full bg-white backdrop-blur-sm">
          <Icon className="w-8 h-8 text-black" />
        </div>
      </div>
      <div className="text-3xl font-bold text-black mb-2">
        <AnimatedCounter value={stat.value} />
      </div>
      <p className="text-blue-600 font-medium">{stat.label}</p>
    </div>
  );
};

const AboutUs = () => {
  const navigate = useNavigate(); // still imported but not used now for Contact Us
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const teamSectionRef = useRef(null);

  const scrollToTeam = () => {
    if (teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgabout})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-400/40 via-green-600/50 to-green-700/60"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1
            className={`text-5xl md:text-7xl font-bold text-black mb-6 transition-all duration-1000 ease-out ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About Navajeevena Chikitsakendra
          </h1>
          <p
            className={`text-xl md:text-2xl text-white/90 mb-8 leading-relaxed transition-all duration-1000 ease-out delay-200 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Dedicated to providing exceptional healthcare with compassion,
            innovation, and excellence. Your health and well-being are our
            highest priorities.
          </p>
          <div
            className={`transition-all duration-1000 ease-out delay-400 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={scrollToTeam}
              className="bg-white text-green-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg rounded-md shadow-lg"
            >
              About Our Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            At MedCare, we are committed to transforming healthcare by combining
            cutting-edge medical expertise with genuine human compassion.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading healthcare provider recognized for excellence in
                patient care, medical innovation, and community health improvement.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-600">
                We pledge to deliver healthcare services with integrity, respect,
                and dedication to achieving the best possible outcomes for our
                patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section ref={teamSectionRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
             Our Specialists
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.name} doctor={doctor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-200 to-green-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Exceptional Care?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your consultation today and let our team guide you to better
            health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(window.location.href = "/contact")}
              className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-md"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
