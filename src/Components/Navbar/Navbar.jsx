import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Components/Photos/Logo.jpg';
import { Menu, X } from 'lucide-react'; // or use Heroicons if you prefer

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <nav className="bg-green-400 shadow-md px-4 sm:px-6 py-3">
  <div className="flex items-center justify-between md:justify-start">
    {/* Logo */}
    <img src={Logo} alt="Logo" className="h-10 sm:h-12 w-auto rounded mr-4" />

    {/* Desktop Menu */}
    {/* Desktop Menu */}
<div className="hidden md:flex items-center justify-between flex-1 ml-6">
  <div className="flex items-center space-x-6">
    <Link to="/" className="text-white font-semibold hover:text-gray-900">Home</Link>
    <Link to="/hospital" className="text-white font-semibold hover:text-gray-900">Hospital</Link>
    <Link to="/about-us" className="text-white font-semibold hover:text-gray-900">About Us</Link>
    <Link to="/contact" className="text-white font-semibold hover:text-gray-900">Contact</Link>
  </div>
  <Link
    to="/login"
    className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-blue-100 ml-auto"
  >
    Login
  </Link>
</div>


    {/* Mobile Menu Button */}
    <div className="md:hidden ml-auto">
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {menuOpen && (
    <div className="md:hidden mt-3 flex flex-col space-y-2">
      <Link to="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-gray-300">Home</Link>
      <Link to="/about-us" onClick={() => setMenuOpen(false)} className="text-white hover:text-gray-300">About Us</Link>
      <Link to="/hospital" onClick={() => setMenuOpen(false)} className="text-white hover:text-gray-300">Hospital</Link>
      <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-gray-300">Contact</Link>
      <Link
        to="/login"
        onClick={() => setMenuOpen(false)}
        className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-blue-100 w-fit"
      >
        Login
      </Link>
    </div>
  )}
</nav>

  );
};

export default Navbar;
