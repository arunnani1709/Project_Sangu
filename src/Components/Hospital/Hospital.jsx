import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useInView } from "react-intersection-observer";

import {
  FaBed, FaHeartbeat, FaHandHoldingMedical, FaSpa, FaCapsules, FaProcedures,
  FaHandsHelping, FaSyringe, FaDumbbell, FaHotjar, FaWalking, FaUserMd, FaDna
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { MdLocalPharmacy } from "react-icons/md";
import { GiUltrasound, GiMuscleUp, GiMedicalPack } from "react-icons/gi";

import Hospital1 from "../Photos/Hospital1.jpg";
import Hospital2 from "../Photos/Hospital2.jpg";
import Hospital3 from "../Photos/Hospital3.jpg";
import Hospitalbg from "../Photos/Hospitalbg.jpg";

// Animated Card Component
const AnimatedCard = ({ children, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {children}
    </div>
  );
};

// Facilities and treatments data
const panchakarmaFacilities = [
  { icon: <FaSpa size={30} className="text-green-600" />, title: "Panchakarma Theaters", description: "Two fully equipped Panchakarma theaters with traditional & modern amenities." },
  { icon: <FaWalking size={30} className="text-green-600" />, title: "Physiotherapy", description: "Comprehensive physio unit offering rehab, pain management, and wellness support." },
  { icon: <FaProcedures size={30} className="text-green-600" />, title: "IPD (In-Patient Department)", description: "Comfortable inpatient facilities with attentive care for short & long-term stays." },
  { icon: <FaBed size={30} className="text-green-600" />, title: "10 IPD Beds", description: "With a variety of accommodation facilities for a comfortable stay during treatment." },
  { icon: <FaBowlFood size={30} className="text-green-600" />, title: "Food for IPD Patient", description: "Healthy meals for in-patients as part of holistic care." },
  { icon: <GiMedicalPack size={30} className="text-green-600" />, title: "OPD", description: "Consultations and treatments by our specialized doctors." },
  { icon: <FaHandHoldingMedical size={30} className="text-green-600" />, title: "Pain Management Unit", description: "Expert consultations including Nadi Pariksha. Privileges for BPL holders." },
  { icon: <FaHeartbeat size={30} className="text-green-600" />, title: "ECG", description: "On-site ECG and ultrasonography for prompt diagnostics." },
  { icon: <MdLocalPharmacy size={30} className="text-green-600" />, title: "Dispensary", description: "Well-stocked Ayurvedic and modern medicine dispensary." },
];

const physiotherapyFacilities = [
  { icon: <FaCapsules size={30} className="text-green-600" />, title: "Cupping Therapy", description: "Traditional cupping therapy by trained practitioners." },
  { icon: <FaHandsHelping size={30} className="text-green-600" />, title: "IFT", description: "Interferential therapy for pain and inflammation relief." },
  { icon: <FaUserMd size={30} className="text-green-600" />, title: "US Therapy", description: "Ultrasound therapy for tissue healing." },
  { icon: <FaProcedures size={30} className="text-green-600" />, title: "Traction", description: "Spinal decompression for back and neck issues." },
  { icon: <FaHeartbeat size={30} className="text-green-600" />, title: "TENS", description: "Electrical stimulation for pain relief." },
  { icon: <GiMuscleUp size={30} className="text-green-600" />, title: "Muscle Stimulator", description: "Aids recovery and strength building." },
  { icon: <GiUltrasound size={30} className="text-green-600" />, title: "Ultrasound Therapy", description: "Deep heating for soft tissue injuries." },
  { icon: <FaDna size={30} className="text-green-600" />, title: "Nerve Stimulation Therapy", description: "Electrical stimulation for rehab." },
  { icon: <FaHotjar size={30} className="text-green-600" />, title: "Moist Heat Pack Therapy", description: "Improves circulation and relieves stiffness." },
  { icon: <FaSyringe size={30} className="text-green-600" />, title: "Dry Needling", description: "Releases trigger points and muscle tension." },
  { icon: <FaDumbbell size={30} className="text-green-600" />, title: "Exercise Therapy", description: "Custom rehab exercises." },
];

const treatments = [
  "Virechana", "Vamana", "Basti", "Nasya", "Agni Karma", "Valuka Sweda", "Parisheka",
  "Uttara Basti", "Nasya Karma", "Abhyanga", "Kati Basti", "Janu Basti", "Greeva Basti",
  "Shiro Basti", "Udvarthana", "Shastika Shali Pinda Sweda", "Jalukavacharana",
  "Bashpasweda", "Leech Therapy", "Nadi Pariksha (Pulse Diagnosis)", "Physiotherapy",
  "Cupping Therapy", "Lifestyle & Diet Consultation", "Yoga & Meditation"
];

const Hospital = () => {
  return (
    <>
      {/* 🛏 Accommodation Section */}
     <section className="relative   text-black py-16 px-6 md:px-20 overflow-hidden">
        <div
     className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
     style={{
      backgroundImage: `url(${Hospitalbg})`,
      opacity: 0.2, // 👈 Reduce this value to make it lighter
    }}
  />
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 z-10">
              <h2 className="text-3xl font-bold mb-4">Accommodation Facilities</h2>
              <p className="mb-4 leading-relaxed">
                Spread over 1 lakh sq. ft, our hospital offers rooms from general wards to premium suites.
              </p>
              <ul className="space-y-2 pl-4 list-disc text-black">
                <li>General Wards</li>
                <li>Semi Private Wards (14 Sharing)</li>
                <li>Private Wards (3 Sharing)</li>
                <li>Standard Suites</li>
                <li>Deluxe Suites</li>
                <li>Premium Suites</li>
                <li>Platinum Suites</li>
              </ul>
            </div>

            <div className="md:w-1/2 w-full">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={800}
                showArrows
              >
                {[Hospital1, Hospital2, Hospital3].map((src, idx) => (
                  <div key={idx} className="px-2">
                    <img
                      src={src}
                      alt={`Room ${idx + 1}`}
                      className="rounded-lg w-full h-[300px] object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* 🏥 Facilities & Treatments Section with Background */}
      <section className="relative  text-black py-16 px-6 md:px-20 overflow-hidden">
    {/* Background image layer with opacity */}
        <div
     className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
     style={{
      backgroundImage: `url(${Hospitalbg})`,
      opacity: 0.2, // 👈 Reduce this value to make it lighter
    }}
  />

        <div className="py-20 px-4 md:px-16 space-y-24 relative z-10">
          {/* Panchakarma Facilities */}
          <div className="bg-white backdrop-blur-sm p-6 rounded-xl max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Hospital Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {panchakarmaFacilities.map((facility, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center">
                    {facility.icon}
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">{facility.title}</h3>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Physiotherapy Facilities */}
          <div className="bg-white backdrop-blur-sm p-6 rounded-xl max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Physiotherapy Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {physiotherapyFacilities.map((facility, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center">
                    {facility.icon}
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">{facility.title}</h3>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Treatments */}
          <div className="bg-white backdrop-blur-sm p-6 rounded-xl max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Treatments We Provide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {treatments.map((treatment, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-1 text-center">
                    {treatment}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
         </section>
        {/* Optional fade bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white z-0"></div>
      
    </>
  );
};

export default Hospital;
