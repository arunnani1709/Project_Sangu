import express from "express";
import {
  createIpdAdmission,
  getAdmissionsByClinicId,
  getAllAdmissions,
  updateAdmission,
  getAdmissionByIpNumber,
} from "../controllers/ipdAdmissionController.js";

const router = express.Router();

// POST /api/ipd-admissions - create a new IPD admission
router.post("/", createIpdAdmission);

// GET /api/ipd-admissions/patient/:clinicId - get all admissions for a patient
router.get("/patient/:clinicId", getAdmissionsByClinicId);

// GET /api/ipd-admissions - get all admissions
router.get("/", getAllAdmissions);

// GET /api/ipd-admissions/ip/:ipNumber - get admission by IP number
router.get("/ip/:ipNumber", getAdmissionByIpNumber);

// PUT /api/ipd-admissions/:id - update an admission
router.put("/:id", updateAdmission);

export default router;
