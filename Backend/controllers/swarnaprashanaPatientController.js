import SwarnaprashanaPatient from "../models/SwarnaprashanaPatient.js";
import { Op } from "sequelize";

export const addPatient = async (req, res) => {
  try {
    const { name, phone, age, sex, address, visitDate } = req.body;

    // Generate uniqueId like NJSP0001
    const last = await SwarnaprashanaPatient.findOne({
      order: [["id", "DESC"]],
    });
    const nextId = last ? last.id + 1 : 1;
    const uniqueId = `NJSP${String(nextId).padStart(4, "0")}`;

    const patient = await SwarnaprashanaPatient.create({
      uniqueId,
      name,
      phone,
      age,
      sex,
      address,
      visitDate,
    });

    res.status(201).json(patient);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error adding patient", details: err.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await SwarnaprashanaPatient.findAll({
      order: [["visitDate", "DESC"]],
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Error fetching patients" });
  }
};

export const searchPatients = async (req, res) => {
  try {
    const { query } = req.query;
    const patients = await SwarnaprashanaPatient.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { phone: { [Op.iLike]: `%${query}%` } },
          { uniqueId: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Error searching patients" });
  }
};
