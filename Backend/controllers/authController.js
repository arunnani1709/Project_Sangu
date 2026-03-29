import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import db from "../models/index.js";

// ─── Seed initial admin & doctor accounts ───────────────────────────────────
export const seedUsers = async () => {
  const users = [
    { username: "Admin",  name: "Admin",  email: "drpatilnavajeevanahospital@gmail.com",  password: "Admin123",   role: "admin"  },
    { username: "Doctor", name: "Doctor", email: "drpatilnavajeevanahospital@gmail.com",  password: "doctor123",  role: "doctor" },
  ];

  for (const u of users) {
    const existing = await db.User.findOne({ where: { username: u.username } });
    if (!existing) {
      const hashed = await bcrypt.hash(u.password, 10);
      await db.User.create({ ...u, password: hashed });
      console.log(`✅ Seeded user: ${u.username}`);
    } else {
      // Update email if it changed
      await existing.update({ email: u.email });
      console.log(`✅ Updated user: ${u.username}`);
    }
  }
};

// ─── Login (username + password) ────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = "token-" + crypto.randomBytes(16).toString("hex");

    return res.status(200).json({
      token,
      user: { id: user.id, username: user.username, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

// ─── Register ────────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;

    if (!username || !name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await db.User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.User.create({ username, name, email, password: hashed, role });

    return res.status(201).json({ message: "User registered successfully", user: { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

// ─── Forgot Password (send OTP by role + email) ──────────────────────────────
export const forgotPassword = async (req, res) => {
  try {
    const { role, email } = req.body;

    if (!role || !email) {
      return res.status(400).json({ message: "Role and email are required" });
    }

    const user = await db.User.findOne({ where: { role, email } });
    if (!user) {
      return res.status(404).json({ message: "No account found with that role and email" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({ resetOtp: otp, resetOtpExpiry: expiry });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
      },
    });

    await transporter.sendMail({
      from: `"Dr. Patil's Hospital" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <p>Hello ${user.name},</p>
        <p>Your OTP for password reset is:</p>
        <h2 style="letter-spacing:4px;">${otp}</h2>
        <p>This OTP is valid for <strong>10 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err.message || err);
    return res.status(500).json({ message: "Failed to send OTP", detail: err.message });
  }
};

// ─── Reset Password ──────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { role, email, otp, newPassword } = req.body;

    if (!role || !email || !otp || !newPassword) {
      return res.status(400).json({ message: "Role, email, OTP, and new password are required" });
    }

    const user = await db.User.findOne({ where: { role, email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.resetOtpExpiry)) {
      await user.update({ resetOtp: null, resetOtpExpiry: null });
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed, resetOtp: null, resetOtpExpiry: null });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};
