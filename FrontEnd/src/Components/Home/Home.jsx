import React, { useEffect, useState } from 'react';
import Dash1 from '../Photos/Dash1.jpg';
import Dash2 from '../Photos/Dash2.jpg';
import Dash3 from '../Photos/Dash3.jpg';
import Dash4 from '../Photos/Dash4.jpg';
import Dash5 from '../Photos/Dash5.jpg';

const images = [Dash1, Dash2, Dash3, Dash4, Dash5];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);


  // Carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Hero Section - Image Carousel */}
      <div className="relative w-full min-h-screen overflow-hidden">
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

        {/* Gradient overlay */}
        <div className="hidden sm:block absolute top-0 left-0 w-[80%] sm:w-[60%] md:w-[55%] h-full bg-gradient-to-r from-green-400 via-green-200 via-green-100 to-transparent z-10" />

        {/* Hero Text */}
        <section className="relative z-20 h-full flex flex-col justify-start px-6 sm:px-10 md:px-16 text-white space-y-6 max-w-[90%] sm:max-w-[80%] md:max-w-[50%] pt-50 pb-20 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white sm:text-slate-800 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-slideInLeft sm:animate-none">
            Dr. Patil's Navajeevana
            <br />
            Ayurveda & Physiotherapy
          </h1>

          <p className="text-lg sm:text-xl font-semibold font-serif text-white sm:text-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:drop-shadow-none animate-slideInLeft sm:animate-none delay-200">
            Let your body speak the language of balance, and Ayurveda brings harmony to your health.
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 animate-slideInRight sm:animate-none delay-300">
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
