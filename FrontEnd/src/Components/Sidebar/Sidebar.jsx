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
  FaEyeDropper,
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed);
  }, [collapsed]);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* ✅ Toggle Button OUTSIDE Sidebar (for mobile open) */}
      {!mobileOpen && (
        <div className="md:hidden fixed top-29 left-1 z-40">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-2xl text-gray-700 hover:text-green-900 bg-green-100 p-2 rounded shadow"
            title="Open Sidebar"
          >
            <FaBars />
          </button>
        </div>
      )}

      {/* ✅ Optional Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 opacity-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
  className={`
    relative md:relative top-0 left-0 z-10
    bg-green-100 text-black border-r shadow-md rounded-md
    flex flex-col overflow-hidden transition-all duration-500 ease-in-out
    ${mobileOpen ? (collapsed ? 'w-24' : 'w-52') : 'w-0'}
    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
    md:w-auto md:translate-x-0
  `}
  style={{ height: "100%" }} // ✅ match parent container height
>

        <div className="overflow-y-auto flex-1">
          {/* ✅ Sidebar Header / Toggle Area */}
          <div className="flex justify-between items-center p-2 mb-2">
            {/* Collapse toggle (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xl text-gray-700 hover:text-green-900 transition-transform duration-300 ease-in-out hover:scale-110 hidden md:block"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <FaBars
                className={`${
                  collapsed ? 'rotate-180' : 'rotate-0'
                } transition-transform duration-300`}
              />
            </button>

            {/* Close toggle (mobile) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-xl text-gray-700 hover:text-green-900 bg-green-200 p-2 rounded shadow"
              title="Close Sidebar"
            >
              <FaBars className="rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* ✅ Menu List */}
          <div className="p-2 flex flex-col gap-y-2">
            {/* Home */}
            <div
              onClick={() => {
                navigate('/home');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Home' : ''}
            >
              <FaHome />
              {!collapsed && <span>Home</span>}
            </div>

            {/* Add Patient */}
            <div
              onClick={() => {
                navigate('/add-patient');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Add Patient' : ''}
            >
              <FaUserPlus />
              {!collapsed && <span>Add Patient</span>}
            </div>

            {/* Patient List */}
            <div
              onClick={() => {
                navigate('/patient-list');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Patient List' : ''}
            >
              <FaUsers />
              {!collapsed && <span>Patient List</span>}
            </div>

            {/* Add Medicine */}
            <div
              onClick={() => {
                navigate('/add-medicine');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Add Medicine' : ''}
            >
              <FaPills />
              {!collapsed && <span>Add Medicine</span>}
            </div>

            {/* Medicine List */}
            <div
              onClick={() => {
                navigate('/medicine-list');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Medicine List' : ''}
            >
              <FaListAlt />
              {!collapsed && <span>Medicine List</span>}
            </div>

            {/* Medical Certificate */}
            <div
              onClick={() => {
                navigate('/medical-certificate');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Medical Certificate' : ''}
            >
              <FaFileMedical />
              {!collapsed && <span>Medical Certificate</span>}
            </div>

            {/* Uploaded Certificates */}
            <div
              onClick={() => {
                navigate('/medical-certificate-list');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Uploaded Certificates' : ''}
            >
              <FaFileMedicalAlt />
              {!collapsed && <span>Uploaded Certificates</span>}
            </div>

            {/* Admin only */}
            {user?.role === 'admin' && (
              <div
                onClick={() => {
                  navigate('/admin-blog');
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-4 p-2 cursor-pointer rounded transition-all duration-300 hover:bg-green-300 group ${
                  collapsed ? 'justify-center' : ''
                }`}
                title={collapsed ? 'Admin Blog Update' : ''}
              >
                <FaNewspaper />
                {!collapsed && <span>Admin Blog Update</span>}
              </div>
            )}
             <div
              onClick={() => {
                navigate('/swarna-parasana');
                setMobileOpen(false);
              }}
              className={`flex items-center  gap-4 p-2 bg-green-300 cursor-pointer rounded transition-all duration-300 hover:bg-green-700 group ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Swarna Pprachana' : ''}
            >
              <FaEyeDropper />
              {!collapsed && <span>Swarna Pprachana</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
