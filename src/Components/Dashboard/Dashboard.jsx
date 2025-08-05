/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dash1 from '../Photos/Dash1.jpg';
import Dash2 from '../Photos/Dash2.jpg';
import Dash3 from '../Photos/Dash3.jpg';
import Dash4 from '../Photos/Dash4.jpg';
import Dash5 from '../Photos/Dash5.jpg';
import Backpain from '../Photos/Backpain.jpg';
import Astama from '../Photos/Astama.jpg';
import Cancer from '../Photos/Cancer.jpg';
import Cofough from '../Photos/Cofough.jpg';
import Cold from '../Photos/Cold.jpg';
import Diabaties from '../Photos/Diabaties.jpg';
import Hairloss from '../Photos/Hairloss.jpg';
import Kidneystone from '../Photos/Kidnystone.jpg';
import Sexrelatedissue from '../Photos/Sexrelatedissue.jpg';
import Skinalergy from '../Photos/Skinalergy.jpg';
import Hartproblem from '../Photos/Hartproblem.jpg';
import Bloodprsure from '../Photos/Bloodprsure.jpg';

const images = [Dash1, Dash2, Dash3, Dash4, Dash5];

const diseases = [
  {
    title: 'Back Pain',
    img: Backpain,
    description: 'Relieve chronic and acute back pain through Ayurvedic therapies like Kati Basti and Abhyanga.',
  },
  {
    title: 'Astama',
    img: Astama,
    description: 'Natural Ayurvedic support to ease breathing and respiratory issues like Asthma.',
  },
  {
    title: 'After Kemo Treatment',
    img: Cancer,
    description: 'Rejuvenating therapies to support healing post-chemotherapy using Ayurvedic principles.',
  },
  {
    title: 'Cough',
    img: Cofough,
    description: 'Soothe persistent cough with natural herbal remedies and treatments.',
  },
  {
    title: 'Cold',
    img: Cold,
    description: 'Boost immunity and relieve cold symptoms through traditional treatments.',
  },
  {
    title: 'Diabetes',
    img: Diabaties,
    description: 'Manage blood sugar levels effectively with Ayurvedic dietary and lifestyle changes.',
  },
  {
    title: 'Hair Loss',
    img: Hairloss,
    description: 'Treat hair fall and promote hair growth through Ayurvedic scalp therapies.',
  },
  {
    title: 'Kidney Stone',
    img: Kidneystone,
    description: 'Dissolve and prevent kidney stones using time-tested herbal solutions.',
  },
  {
    title: 'Infertility',
    img: Sexrelatedissue,
    description: 'Address fertility concerns with personalized Ayurvedic reproductive therapies.',
  },
  {
    title: 'Skin Allergy',
    img: Skinalergy,
    description: 'Heal skin irritations and allergies with gentle herbal treatments.',
  },
  {
    title: 'Heart Problems',
    img: Hartproblem,
    description: 'Strengthen cardiovascular health through Ayurvedic herbs and practices.',
  },
  {
    title: 'Blood Pressure',
    img: Bloodprsure,
    description: 'Regulate blood pressure naturally with holistic Ayurvedic care.',
  },
];

const Dashboard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const navigate = useNavigate();
  const scrollTargetRef = useRef(null);
  const cardRefs = useRef([]);

  // Carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to "Diseases We Treat" section
  const handleScrollToSection = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animate cards when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleCards((prev) => [...new Set([...prev, Number(index)])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Hero Section - Image Carousel */}
      <div className="relative w-full h-[650px] sm:h-[600px] md:h-[650px] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Gradient only on sm+ screens */}
        <div className="hidden sm:block absolute top-0 left-0 w-[80%] sm:w-[60%] md:w-[55%] h-full bg-gradient-to-r from-green-400 via-green-200 via-green-100 to-transparent z-10" />

        <section className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white space-y-6 max-w-[90%] sm:max-w-[80%] md:max-w-[50%] py-20">
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight 
  text-white sm:text-slate-800 
  drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] 
  animate-slideInLeft sm:animate-none">
  Dr. Patil's Navajeevana
  <br />
  Ayurveda & Physiotherapy
</h1>

<p className="text-lg sm:text-xl font-semibold font-serif 
  text-white sm:text-black 
  drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:drop-shadow-none 
  animate-slideInLeft sm:animate-none delay-200">
  Let your body speak the language of balance, and Ayurveda brings harmony to your health.
</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 
  animate-slideInRight sm:animate-none delay-300">
  <button
    onClick={() => navigate('/latest-updates')}
    className="bg-white text-green-700 px-4 py-2 rounded hover:bg-green-100"
  >
    Latest Updates
  </button>
  <button
    onClick={handleScrollToSection}
    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
  >
    Diseases We Treat
  </button>
</div>

        </section>
      </div>

      {/* Diseases We Treat Section */}
      <section
        ref={scrollTargetRef}
        className="relative z-20 mt-10 px-4 sm:px-8 py-10 bg-white shadow rounded max-w-7xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-green-700 text-center">
          Diseases We Treat
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {diseases.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`bg-white border rounded-lg shadow transition-all duration-[5200ms] ease-[cubic-bezier(0.29,1,0.36,1)] transform ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700">{card.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
