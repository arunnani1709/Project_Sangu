import db from "../models/index.js";

const IpdAdmission = db.IpdAdmission;
const Patient = db.Patient;

// Create a new IPD admission
export const createIpdAdmission = async (req, res) => {
  try {
    const { clinicId, admissionDate, ward, bedNumber, notes } = req.body;

    console.log("Received admission request:", req.body);

    if (!clinicId || !admissionDate) {
      return res.status(400).json({
        message: "clinicId and admissionDate are required",
      });
    }

    // Find the patient by clinicId to get the opNumber
    const patient = await Patient.findOne({ where: { clinicId } });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found with the provided clinicId",
      });
    }

    // Get the latest IP number to generate the next one
    const latestAdmission = await IpdAdmission.findOne({
      order: [["id", "DESC"]],
    });

    let nextIpNumber = 1;
    if (latestAdmission && latestAdmission.ipNumber) {
      // Extract the number from IP0001 format
      const lastNumber = parseInt(latestAdmission.ipNumber.replace("IP", ""));
      nextIpNumber = lastNumber + 1;
    }

    const ipNumber = "IP" + String(nextIpNumber).padStart(4, "0");

    // Create the admission
    const admission = await IpdAdmission.create({
      ipNumber,
      clinicId,
      opNumber: patient.opNumber,
      admissionDate,
      ward,
      bedNumber,
      notes,
      status: "admitted",
    });

    console.log("Created admission:", admission);

    res.status(201).json({
      message: "Patient admitted successfully",
      admission,
    });
  } catch (err) {
    console.error("Error creating IPD admission:", err);
    res.status(500).json({
      message: err.message,
      error: err.toString(),
    });
  }
};

// Get all admissions for a patient by clinicId
export const getAdmissionsByClinicId = async (req, res) => {
  try {
    const { clinicId } = req.params;

    const admissions = await IpdAdmission.findAll({
      where: { clinicId },
      order: [["admissionDate", "DESC"]],
    });

    res.json(admissions);
  } catch (err) {
    console.error("Error fetching admissions:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all admissions (for admin/reports)
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await IpdAdmission.findAll({
      order: [["admissionDate", "DESC"]],
    });

    res.json(admissions);
  } catch (err) {
    console.error("Error fetching all admissions:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update admission (e.g., discharge)
export const updateAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { dischargeDate, status, ward, bedNumber, notes } = req.body;

    const admission = await IpdAdmission.findByPk(id);

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    // Update fields
    if (dischargeDate) admission.dischargeDate = dischargeDate;
    if (status) admission.status = status;
    if (ward !== undefined) admission.ward = ward;
    if (bedNumber !== undefined) admission.bedNumber = bedNumber;
    if (notes !== undefined) admission.notes = notes;

    await admission.save();

    res.json({
      message: "Admission updated successfully",
      admission,
    });
  } catch (err) {
    console.error("Error updating admission:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get admission by IP number
export const getAdmissionByIpNumber = async (req, res) => {
  try {
    const { ipNumber } = req.params;

    const admission = await IpdAdmission.findOne({
      where: { ipNumber },
    });

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(admission);
  } catch (err) {
    console.error("Error fetching admission:", err);
    res.status(500).json({ message: err.message });
  }
};
