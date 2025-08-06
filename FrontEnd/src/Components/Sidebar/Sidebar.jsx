import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaHome,
  FaBars,
  FaUserPlus,
  FaUsers,
  FaPills,
  FaListAlt,
  FaFileMedical,
  FaFileMedicalAlt,
  FaNewspaper,
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed);
  }, [collapsed]);

  const menuItems = [
    { icon: <FaHome />, label: 'Home', path: '/home' },
    { icon: <FaUserPlus />, label: 'Add Patient', path: '/add-patient' },
    { icon: <FaUsers />, label: 'Patient List', path: '/patient-list' },
    { icon: <FaPills />, label: 'Add Medicine', path: '/add-medicine' },
    { icon: <FaListAlt />, label: 'Medicine List', path: '/medicine-list' },
    { icon: <FaFileMedical />, label: 'Medical Certificate', path: '/medical-certificate' },
    { icon: <FaFileMedicalAlt />, label: 'Medical Certificate List', path: '/medical-certificate-list' },
  ];
  // Conditionally add Admin Blog item for admin only
  if (user?.role === 'admin') {
    menuItems.push({
      icon: <FaNewspaper />,
      label: 'Admin Blog Update',
      path: '/admin-blog',
    });
  }

  if (!isAuthenticated) return null;

 return (
  <div
    className={`bg-green-100 text-black border-r shadow-md rounded-md 
      flex flex-col transition-all duration-500 ease-in-out 
      ${collapsed ? 'w-16' : 'w-52'} h-screen overflow-hidden`}
  >
    {/* Scrollable content */}
    <div className="overflow-y-auto flex-1">
      <div className="p-2 flex flex-col gap-y-2">
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-2 mt-2 self-start text-xl text-gray-700 hover:text-green-900 transition-transform duration-300 ease-in-out hover:scale-110"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <FaBars className={`${collapsed ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
        </button>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300
              hover:bg-green-300 group ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <div className="text-lg group-hover:scale-110 transition-transform">{item.icon}</div>
            <span
              className={`whitespace-pre-wrap text-sm transition-opacity duration-300 
                ${collapsed ? 'opacity-0 scale-95 w-0 overflow-hidden' : 'opacity-100 scale-100 w-auto'} 
                md:whitespace-nowrap`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Sidebar;