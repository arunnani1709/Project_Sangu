import React from "react";
import logo from "../../Components/Photos/Logo.jpg";

const Home = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <img
        src={logo}
        alt="Logo"
        className="w-95 md:w-100 opacity-50"
      />
    </div>
  );
};

export default Home;