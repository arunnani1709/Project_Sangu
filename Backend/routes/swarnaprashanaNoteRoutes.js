import express from "express";
import {
  addNote,
  updateNote,
  getNotesByClinic,
  getNotesByPatient, // <-- import controller
} from "../controllers/swarnaprashanaNoteController.js";

const router = express.Router();

// Add a new note
router.post("/", addNote);

// Update an existing note
router.put("/:id", updateNote);

// Get notes by clinic
router.get("/clinic/:clinicId", getNotesByClinic);

// ✅ Get notes by patient
router.get("/patient/:patientId", getNotesByPatient);

export default router;
