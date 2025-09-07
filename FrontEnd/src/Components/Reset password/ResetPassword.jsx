import React, { useState } from "react";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(""); // ✅ added role
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = () => {
    if (!role) {
      alert("⚠️ Please select a role before proceeding.");
      return;
    }
    if (!email) {
      alert("⚠️ Please enter an email.");
      return;
    }

    console.log("Send OTP to:", email, "for role:", role);
    // 👉 Call your backend like:
    // axios.post("/api/send-otp", { role, email })
    setStep(2);
  };

  const handleResetPassword = () => {
    console.log("Reset password for:", role, email, "OTP:", otp, "New Password:", newPassword);
    // 👉 Call backend:
    // axios.post("/api/reset-password", { role, email, otp, newPassword })

    alert(`✅ Password reset successful for ${role} (dummy)`);
    setStep(1);
    setRole("");
    setEmail("");
    setOtp("");
    setNewPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Reset Password
        </h2>

        {step === 1 && (
          <>
            {/* ✅ Role Dropdown */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
            </select>

            {/* Email Field */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* OTP */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* New Password */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Reset Password
            </button>
          </>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 hover:text-green-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
