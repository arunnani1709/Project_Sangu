import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Certificate from "../models/Certificate.js";

const router = express.Router();

const uploadDir = path.resolve("uploads/certificates");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created upload directory: ${uploadDir}`);
} else {
  console.log(`Upload directory exists: ${uploadDir}`);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /api/certificate - Upload a certificate PDF
router.post("/certificate", upload.single("certificate"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Received file:", req.file);

    // Construct the file URL relative to server
    const fileUrl = `/uploads/certificates/${req.file.filename}`;

    // Save certificate record in DB
    const cert = await Certificate.create({
      filename: req.file.originalname,
      storedName: req.file.filename,
      url: fileUrl,
      uploadTime: new Date(), // make sure your model supports this or set default
    });

    res.status(201).json(cert);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to save certificate" });
  }
});

// GET /api/certificates - Get all certificates with full URL
router.get("/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.findAll({
      order: [["uploadTime", "DESC"]],
    });

    // Construct full URL for each certificate file
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const certificatesWithFullUrl = certificates.map((cert) => ({
      id: cert.id,
      filename: cert.filename,
      uploadTime: cert.uploadTime,
      url: baseUrl + cert.url, // full URL to access file
    }));

    res.json(certificatesWithFullUrl);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

export default router;
