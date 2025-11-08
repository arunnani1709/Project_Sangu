import db from "../models/index.js";

// Create a new OPD doctor note
export const createOpdDoctorNote = async (req, res) => {
  try {
    const { patientId, visitDate, notes, medicines } = req.body;
    console.log("Received payload:", req.body);

    if (!patientId || !visitDate) {
      return res
        .status(400)
        .json({ message: "patientId and visitDate are required" });
    }

    const note = await db.OpdDoctorNote.create({
      patientId,
      visitDate,
      notes,
      medicines,
    });
    console.log("Created note:", note);
    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating OPD note:", err);
    res.status(500).json({ message: err.message, error: err.toString() });
  }
};

// Get all notes for a patient (optionally by date)
export const getOpdDoctorNotes = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { visitDate } = req.query;
    const where = { patientId };
    if (visitDate) where.visitDate = visitDate;
    const notes = await db.OpdDoctorNote.findAll({
      where,
      order: [["visitDate", "DESC"]],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing OPD doctor note
export const updateOpdDoctorNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, visitDate, notes, medicines } = req.body;

    console.log("Updating note with ID:", id);
    console.log("Update payload:", req.body);

    // Find the note
    const note = await db.OpdDoctorNote.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the note
    note.patientId = patientId || note.patientId;
    note.visitDate = visitDate || note.visitDate;
    note.notes = notes !== undefined ? notes : note.notes;
    note.medicines = medicines !== undefined ? medicines : note.medicines;

    await note.save();

    console.log("Updated note:", note);
    res.json(note);
  } catch (err) {
    console.error("Error updating OPD note:", err);
    res.status(500).json({ message: err.message, error: err.toString() });
  }
};
