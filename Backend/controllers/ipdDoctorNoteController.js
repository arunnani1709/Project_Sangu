import db from "../models/index.js";

const IpdDoctorNote = db.IpdDoctorNote;
const IpdAdmission = db.IpdAdmission;

// Create a new IPD doctor note
export const createIpdDoctorNote = async (req, res) => {
  try {
    const {
      admissionId,
      ipNumber,
      clinicId,
      visitDate,
      freshComplaints,
      improvementsOrProgress,
      treatment,
      vitals,
      outcome,
    } = req.body;

    console.log("Received IPD doctor note:", req.body);

    if (!admissionId || !ipNumber || !visitDate) {
      return res.status(400).json({
        message: "admissionId, ipNumber, and visitDate are required",
      });
    }

    // Check if admission exists
    const admission = await IpdAdmission.findByPk(admissionId);
    if (!admission) {
      return res.status(404).json({
        message: "Admission not found",
      });
    }

    // Create the note
    const note = await IpdDoctorNote.create({
      admissionId,
      ipNumber,
      clinicId,
      visitDate,
      freshComplaints,
      improvementsOrProgress,
      treatment,
      vitals,
      outcome,
    });

    console.log("Created IPD doctor note:", note);

    res.status(201).json({
      message: "IPD doctor note created successfully",
      note,
    });
  } catch (err) {
    console.error("Error creating IPD doctor note:", err);
    res.status(500).json({
      message: err.message,
      error: err.toString(),
    });
  }
};

// Get all notes for a specific admission/IP number
export const getNotesByAdmissionId = async (req, res) => {
  try {
    const { admissionId } = req.params;

    const notes = await IpdDoctorNote.findAll({
      where: { admissionId },
      order: [["visitDate", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    console.error("Error fetching IPD doctor notes:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all notes for a specific IP number
export const getNotesByIpNumber = async (req, res) => {
  try {
    const { ipNumber } = req.params;

    const notes = await IpdDoctorNote.findAll({
      where: { ipNumber },
      order: [["visitDate", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    console.error("Error fetching IPD doctor notes:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update an existing IPD doctor note
export const updateIpdDoctorNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      visitDate,
      freshComplaints,
      improvementsOrProgress,
      treatment,
      vitals,
      outcome,
    } = req.body;

    console.log("Updating IPD doctor note:", id, req.body);

    const note = await IpdDoctorNote.findByPk(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Update fields
    if (visitDate) note.visitDate = visitDate;
    if (freshComplaints !== undefined) note.freshComplaints = freshComplaints;
    if (improvementsOrProgress !== undefined)
      note.improvementsOrProgress = improvementsOrProgress;
    if (treatment !== undefined) note.treatment = treatment;
    if (vitals !== undefined) note.vitals = vitals;
    if (outcome !== undefined) note.outcome = outcome;

    await note.save();

    console.log("Updated IPD doctor note:", note);

    res.json({
      message: "IPD doctor note updated successfully",
      note,
    });
  } catch (err) {
    console.error("Error updating IPD doctor note:", err);
    res.status(500).json({
      message: err.message,
      error: err.toString(),
    });
  }
};

// Delete an IPD doctor note
export const deleteIpdDoctorNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await IpdDoctorNote.findByPk(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.destroy();

    res.json({
      message: "IPD doctor note deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting IPD doctor note:", err);
    res.status(500).json({ message: err.message });
  }
};
