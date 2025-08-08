import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Login/authSlice";
import Logo from "../Photos/Logo.jpg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

 const { isAuthenticated, user } = useSelector((state) => state.auth);

const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem("user"); // 👈 just remove the specific key
  navigate("/", { replace: true }); // 👈 prevents back navigation to protected page
};


  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = location.pathname === "/home";

  return (
    <nav className="bg-green-400 shadow-md px-4 sm:px-6 py-3 relative">
      <div className="flex items-center justify-between md:justify-start">
        {/* Logo & Name */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 sm:h-12 w-auto rounded mr-4" />
          {isAuthenticated && (
           <span className="text-white font-bold text-xl block">
  Dr Patil's Navajeevana Chikitsakendra  
</span>

          )}
        </div>

        {/* Desktop Navigation (only when NOT logged in) */}
        {!isAuthenticated && !isHome && (
          <div className="hidden md:flex items-center justify-between flex-1 ml-6">
           <div className="flex items-center space-x-6 text-black">
  <Link to="/" className="font-semibold hover:text-white transition-colors duration-200">Home</Link>
  <Link to="/hospital" className="font-semibold hover:text-white transition-colors duration-200">Hospital</Link>
  <Link to="/about-us" className="font-semibold hover:text-white transition-colors duration-200">About Us</Link>
  <Link to="/contact" className="font-semibold hover:text-white transition-colors duration-200">Contact</Link>
</div>



            <Link
              to="/login"
              className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-blue-100 ml-auto"
            >
              Login
            </Link>
          </div>
        )}

        {/* Logged-in user profile dropdown */}
        {isAuthenticated && (
  <div className="ml-auto relative flex items-center gap-2" ref={dropdownRef}>
    <span className="text-black font-medium hidden sm:block">
      Dr. {user?.name || ""}
    </span>

    <div
      onClick={toggleDropdown}
      className="cursor-pointer bg-white text-green-700 font-semibold rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 shadow-md transition"
    >
      {(user?.name || "A").charAt(0).toUpperCase()}
    </div>

    {showDropdown && (
      <div className="absolute top-12 right-0 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="font-semibold text-green-700 text-sm">Dr. {user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}


        {/* Mobile Menu Toggle (only when NOT logged in) */}
        {!isAuthenticated && !isHome && (
          <div className="md:hidden ml-auto">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu (only when NOT logged in) */}
      {menuOpen && !isAuthenticated && !isHome && (
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
