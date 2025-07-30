import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBars,
  FaSearch,
  FaTh,
  FaUser,
  FaCommentDots,
  FaChartPie,
  FaFileAlt,
  FaShoppingCart,
  FaHeart,
  FaCog,
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Read initial collapsed state from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  // Save to localStorage whenever collapsed changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const menuItems = [
    { icon: <FaSearch />, label: "Search", path: "/search" },
    { icon: <FaTh />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, label: "Profile", path: "/profile" },
    { icon: <FaCommentDots />, label: "Messages", path: "/messages" },
    { icon: <FaChartPie />, label: "Analytics", path: "/analytics" },
    { icon: <FaFileAlt />, label: "Reports", path: "/reports" },
    { icon: <FaShoppingCart />, label: "Cart", path: "/cart" },
    { icon: <FaHeart />, label: "Favorites", path: "/favorites" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  if (!isAuthenticated) return null;

  return (
    <div
      className={`bg-green-100 text-black h-full p-2 flex flex-col border-r shadow-md transition-all duration-300 rounded-md ${
        collapsed ? 'w-16' : 'w-48'
      }`}
    >
      <div className="p-2 flex flex-col gap-2">
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 text-xl self-left"
        >
          <FaBars />
        </button>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-green-400 rounded"
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
