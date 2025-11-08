import express from "express";
import {
  createOpdDoctorNote,
  getOpdDoctorNotes,
  updateOpdDoctorNote,
} from "../controllers/opdDoctorNoteController.js";

const router = express.Router();

// POST /api/opd-notes - create a new OPD doctor note
router.post("/", createOpdDoctorNote);

// GET /api/opd-notes/patient/:patientId - get all notes for a patient (optionally by date)
router.get("/patient/:patientId", getOpdDoctorNotes);

// PUT /api/opd-notes/:id - update an existing OPD doctor note
router.put("/:id", updateOpdDoctorNote);

export default router;
