import React, { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  const mainRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const main = mainRef.current;

    const handleScroll = () => {
      if (!main) return;

      const { scrollTop, scrollHeight, clientHeight } = main;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShowFooter(isAtBottom);
    };

    if (main) {
      main.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check in case already at bottom
    }

    return () => {
      if (main) {
        main.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Content Area: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto p-4 pb-24 transition-all duration-300 ease-in-out"
        >
          <Outlet />

          {/* Extra space to help detect bottom */}
          <div className="h-10" />
        </main>
      </div>

      {/* Footer - visible only at bottom of main content */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-10 transition-opacity duration-500 ease-in-out ${
          showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
