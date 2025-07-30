import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Navbar />

      {/* Main content area (sidebar + page content) */}
      <div className="flex flex-grow overflow-hidden">
         
      <Sidebar />

        {/* Page content area */}
        <main className="flex-grow overflow-auto bg-white">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
