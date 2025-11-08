import express from "express";
import {
  createIpdDoctorNote,
  getNotesByAdmissionId,
  getNotesByIpNumber,
  updateIpdDoctorNote,
  deleteIpdDoctorNote,
} from "../controllers/ipdDoctorNoteController.js";

const router = express.Router();

// POST /api/ipd-doctor-notes - create a new IPD doctor note
router.post("/", createIpdDoctorNote);

// GET /api/ipd-doctor-notes/admission/:admissionId - get notes by admission ID
router.get("/admission/:admissionId", getNotesByAdmissionId);

// GET /api/ipd-doctor-notes/ip/:ipNumber - get notes by IP number
router.get("/ip/:ipNumber", getNotesByIpNumber);

// PUT /api/ipd-doctor-notes/:id - update an IPD doctor note
router.put("/:id", updateIpdDoctorNote);

// DELETE /api/ipd-doctor-notes/:id - delete an IPD doctor note
router.delete("/:id", deleteIpdDoctorNote);

export default router;
