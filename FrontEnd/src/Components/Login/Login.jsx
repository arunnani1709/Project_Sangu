import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coverlogo from "../Photos/Coverlogin.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logout()); // clear session on load
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login successful!");
      navigate("/Home");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: 'calc(100vh - 79px)' }}>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0 opacity-90"
    style={{
      backgroundImage: `url(${Coverlogo})`,
    }}
  ></div>


      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">
            Dr. Patil's Navajeevana Chikitsalaya
          </h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
