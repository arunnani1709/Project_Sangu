import SwarnaprashanaNote from "../models/SwarnaprashanaNote.js";

export const addNote = async (req, res) => {
  try {
    const { clinicId, patientId, visitDate, dose, complaints } = req.body;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    if (!visitDate) {
      return res.status(400).json({ error: "Visit date is required" });
    }

    const newNote = await SwarnaprashanaNote.create({
      clinicId,
      patientId,
      visitDate,
      dose,
      complaints,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Failed to save note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const [count, updated] = await SwarnaprashanaNote.update(req.body, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updated[0]); // return updated row
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Error updating note" });
  }
};

export const getNotesByClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const notes = await SwarnaprashanaNote.findAll({
      where: { clinicId },
      order: [["visitDate", "DESC"]],
    });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching clinic notes:", err);
    res.status(500).json({ error: "Error fetching notes" });
  }
};

export const getNotesByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const notes = await SwarnaprashanaNote.findAll({
      where: { patientId },
      order: [["visitDate", "DESC"]],
    });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching patient notes:", err);
    res.status(500).json({ error: "Error fetching notes" });
  }
};
