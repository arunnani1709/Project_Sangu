import db from "../models/index.js";

const Medicine = db.Medicine;

// GET all medicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({
      order: [["name", "ASC"]],
    });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// POST add/update medicine
export const addMedicine = async (req, res) => {
  try {
    const { name, code, type, quantity } = req.body;

    if (!name || !code || !type || quantity === undefined || quantity === null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check existing
    const existingMed = await Medicine.findOne({ where: { code, type } });

    if (existingMed) {
      existingMed.quantity += parseInt(quantity);
      await existingMed.save();
      return res.json({
        message: "Medicine updated successfully",
        medicine: existingMed,
      });
    }

    const newMed = await Medicine.create({
      name,
      code,
      type,
      quantity: parseInt(quantity),
    });

    res
      .status(201)
      .json({ message: "Medicine saved successfully", medicine: newMed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save medicine" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    // validate param
    if (!id || Number.isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid medicine id" });
    }

    const med = await Medicine.findByPk(id);
    if (!med) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    await med.destroy();
    return res.status(204).send(); // No Content
  } catch (err) {
    console.error("Delete medicine error:", err);
    return res.status(500).json({ error: "Failed to delete medicine" });
  }
};
