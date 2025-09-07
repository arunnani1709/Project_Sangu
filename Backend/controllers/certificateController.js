import db from "../models/index.js";
const { Certificate } = db;

export const uploadCertificate = async (req, res) => {
  try {
    const { filename } = req.file;

    const cert = await Certificate.create({ filename });

    res.status(201).json({ message: "Certificate uploaded", id: cert.id });
  } catch (err) {
    console.error("Error uploading certificate:", err);
    res.status(500).json({ error: "Failed to upload certificate." });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.findAll({
      order: [["uploadedAt", "DESC"]],
    });

    const baseUrl = `${req.protocol}://${req.get("host")}/certificates/`;

    const result = certificates.map((cert) => ({
      id: cert.id,
      filename: cert.filename,
      uploadTime: cert.uploadedAt,
      url: baseUrl + cert.filename,
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ error: "Failed to fetch certificates." });
  }
};
