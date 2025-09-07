import React, { useState } from "react";
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

// Treatment images imported
import VirechanaImg from "../Photos/Treatement/VirechanaImg.jpg";
import VamanaImg from "../Photos/Treatement/VamanaImg.jpg";
import BastiImg from "../Photos/Treatement/BastiImg.jpg";
import AgniKarmaImg from "../Photos/Treatement/AgniKarmaImg.jpg";
import ValukaSwedaImg from "../Photos/Treatement/ValukaSwedaImg.jpg";
import UttaraBastiImg from "../Photos/Treatement/UttaraBastiImg.jpg";
import AbhyangaImg from "../Photos/Treatement/AbhyangaImg.jpg";
import KatiBastiImg from "../Photos/Treatement/KatiBastiImg.jpg";
import JanuBastiImg from "../Photos/Treatement/JanuBastiImg.jpg";
import GreevaBastiImg from "../Photos/Treatement/GreevaBastiImg.jpg";
import ShiroBastiImg from "../Photos/Treatement/ShiroBastiImg.jpg";
import UdvarthanaImg from "../Photos/Treatement/UdvarthanaImg.jpg";
import ShastikaShaliPindaSwedaImg from "../Photos/Treatement/ShastikaShaliPindaSwedaImg.jpg";
import BashpaswedaImg from "../Photos/Treatement/BashpaswedaImg.jpg"; 
import LeechTherapyImg from "../Photos/Treatement/LeechTherapyImg.jpg";
import NadiParikshaImg from "../Photos/Treatement/NadiParikshaImg.jpg";
import PhysiotherapyImg from "../Photos/Treatement/PhysiotherapyImg.jpg";
import CuppingTherapyImg from "../Photos/Treatement/CuppingTherapyImg.jpg";
import LifestyleDietImg from "../Photos/Treatement/LifestyleDietImg.jpg";
import YogaMeditationImg from "../Photos/Treatement/YogaMeditationImg.jpg";
import asyaKarmaImg from "../Photos/Treatement/asyaKarmaImg.jpg";
// import NasyaKarmaImg from "../Photos/Treatement/NasyaKarmaImg.jpg";


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

// ✅ Updated treatments array with imported images
const treatments =[
  { name: "Virechana", description: "Detoxification through purgation therapy.", image: VirechanaImg },
  { name: "Vamana", description: "Therapeutic emesis to eliminate Kapha dosha.", image: VamanaImg },
  { name: "Basti", description: "Enema therapy to balance Vata dosha.", image: BastiImg },
  { name: "Udvarthana", description: "Dry powder massage to reduce fat and detox.", image: UdvarthanaImg },
  { name: "Agni Karma", description: "Thermal therapy for chronic pain conditions.", image: AgniKarmaImg },
  { name: "Bashpasweda", description: "Steam therapy for improving blood circulation.", image: BashpaswedaImg },
  { name: "Valuka Sweda", description: "Sand bolus sweating therapy for joint pain.", image: ValukaSwedaImg },
  { name: "Uttara Basti", description: "Enema therapy specific to urinary/reproductive systems.", image: UttaraBastiImg },
  { name: "Abhyanga", description: "Rejuvenating full-body oil massage.", image: AbhyangaImg },
  { name: "Kati Basti", description: "Warm oil treatment for lower back pain.", image: KatiBastiImg },
  { name: "Janu Basti", description: "Oil pooling therapy for knee pain relief.", image: JanuBastiImg },
  { name: "Greeva Basti", description: "Neck therapy with warm medicated oil.", image: GreevaBastiImg },
  { name: "Shiro Basti", description: "Oil therapy for stress and mental clarity.", image: ShiroBastiImg },
  { name: "Leech Therapy", description: "Natural detox using medicinal leeches.", image: LeechTherapyImg },
  { name: "Physiotherapy", description: "Modern rehab practices for mobility and pain.", image: PhysiotherapyImg },
  { name: "Cupping Therapy", description: "Suction therapy to increase blood flow.", image: CuppingTherapyImg },
  { name: "Lifestyle & Diet Consultation", description: "Personalized guidance on food and habits.", image: LifestyleDietImg },
  { name: "Yoga & Meditation", description: "Mind-body practices for holistic wellness.", image: YogaMeditationImg },
    { name: "Nadi Pariksha (Pulse Diagnosis)", description: "Traditional pulse-based diagnostic method.", image: NadiParikshaImg },
{ name: "Asya Karma", description: "Oral therapy for dental and mouth issues.", image: asyaKarmaImg },
  { name: "Shastika Shali Pinda Sweda", description: "Rejuvenation with rice bolus therapy.", image: ShastikaShaliPindaSwedaImg },
];



const Hospital = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTreatment = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Accommodation Section */}
      <section className="relative text-black py-16 px-6 md:px-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${Hospitalbg})`,
            opacity: 0.2,
          }}
        />
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 z-10">
              <h2 className="text-3xl font-bold mb-4">Accommodation Facilities</h2>
              <p className="mb-4 leading-relaxed">
                Our hospital offers rooms from general wards.
              </p>
              <ul className="space-y-2 pl-4 list-disc text-black">
                <li>General Ward</li>
                <li>10 IPD Beds</li>
                <li>Food for IPD Patients</li>
              </ul>
            </div>

            <div className="md:w-1/2 w-full">
              <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000} transitionTime={800} showArrows>
                {[Hospital1, Hospital2, Hospital3].map((src, idx) => (
                  <div key={idx} className="px-2">
                    <img src={src} alt={`Room ${idx + 1}`} className="rounded-lg w-full h-[300px] object-cover" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Treatments Section */}
      <section className="relative text-black py-16 px-6 md:px-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${Hospitalbg})`,
            opacity: 0.2,
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
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12"> Physiotherapy Facilities</h2>
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

          {/* Treatments with dropdown */}
          <div className="bg-white backdrop-blur-sm p-6 rounded-xl max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Treatments We Provide</h2>
            <div className="flex flex-wrap -mx-3">
  {treatments.map((treatment, index) => (
    <div
      key={index}
      onClick={() => toggleTreatment(index)}
      className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6 cursor-pointer"
    >
      <div
  className={`bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm transition-all duration-300 flex flex-col justify-start ${
    openIndex === index ? "shadow-md" : "hover:shadow-md"
  }`}
>

        <h3 className="text-lg font-semibold text-green-700 mb-1 text-center">
          {treatment.name}
        </h3>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openIndex === index ? "max-h-[1000px] mt-4" : "max-h-0"
          }`}
        >
          <div className="text-center">
            <img
              src={treatment.image}
              alt={treatment.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <p className="text-sm text-gray-600">{treatment.description}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hospital;
