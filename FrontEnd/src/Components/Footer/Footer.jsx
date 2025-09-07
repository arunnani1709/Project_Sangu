import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-400 text-white py-4 px-4 sm:px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Navajeevana Chikitsa Kendra. All rights reserved. Developed by AS WebTechnologies
        </p>
        <p className="text-sm">
          Contact: +91 95352 61996 | Email: healthyayurveda.patil@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
