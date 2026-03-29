import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!role) { toast.warning("Please select a role."); return; }
    if (!email) { toast.warning("Please enter your email."); return; }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { role, email });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp) { toast.warning("Please enter the OTP."); return; }
    if (!newPassword || newPassword.length < 6) { toast.warning("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { toast.warning("Passwords do not match."); return; }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, { role, email, otp, newPassword });
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Reset Password</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          {step === 1 ? "Select your role and enter your registered email." : `OTP sent to ${email}`}
        </p>

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Role</label>
            <select
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-700">Registered Email</label>
            <input
              type="email"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              maxLength={6}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password (min. 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              onClick={() => { setStep(1); setOtp(""); setNewPassword(""); setConfirmPassword(""); }}
              className="w-full mt-2 text-sm text-gray-500 hover:text-green-600 hover:underline"
            >
              Resend OTP
            </button>
          </>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-600 hover:text-green-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;
