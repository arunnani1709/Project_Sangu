import db from "../models/index.js";
import { Op } from "sequelize";

export const getPatients = async (req, res) => {
  try {
    const patients = await db.Patient.findAll();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, phone, age, sex, address, visitDate } = req.body;

    // 1️⃣ Check if patient already exists (case-insensitive name match)
    const existingPatient = await db.Patient.findOne({
      where: {
        name: { [Op.iLike]: name }, // Case-insensitive name
        phone: phone, // Phone match exact
      },
    });

    if (existingPatient) {
      return res.status(409).json({
        message: "Patient already exists",
        clinicId: existingPatient.clinicId,
        opNumber: existingPatient.opNumber,
      });
    }

    // 2️⃣ Get last patient to generate next numbers
    const lastPatient = await db.Patient.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["clinicId", "opNumber"],
    });

    let newClinicId = "NJ00001";
    let newOpNumber = "OP00001";

    if (lastPatient) {
      const lastNjNum = parseInt(lastPatient.clinicId.replace("NJ", ""), 10);
      const lastOpNum = parseInt(lastPatient.opNumber.replace("OP", ""), 10);

      newClinicId = `NJ${String(lastNjNum + 1).padStart(5, "0")}`;
      newOpNumber = `OP${String(lastOpNum + 1).padStart(5, "0")}`;
    }

    // 3️⃣ Create new patient
    const newPatient = await db.Patient.create({
      name,
      phone,
      age,
      sex,
      address,
      visitDate,
      clinicId: newClinicId,
      opNumber: newOpNumber,
    });

    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating patient" });
  }
};
