import db from "../models/index.js";

const IpdCaseSheet = db.IpdCaseSheet;
const IpdAdmission = db.IpdAdmission;

// Create or update a case sheet
export const saveCaseSheet = async (req, res) => {
  try {
    const {
      admissionId,
      ipNumber,
      chiefComplaints,
      associateComplaints,
      historyOfPresentIllness,
      pastHistory,
      medicalSurgicalHistory,
      menstrualHistory,
      personalHistory,
      generalSpecialExamination,
      investigation,
      treatments,
    } = req.body;

    console.log("Received case sheet data:", req.body);

    if (!admissionId || !ipNumber) {
      return res.status(400).json({
        message: "admissionId and ipNumber are required",
      });
    }

    // Check if admission exists
    const admission = await IpdAdmission.findByPk(admissionId);
    if (!admission) {
      return res.status(404).json({
        message: "Admission not found",
      });
    }

    // Check if case sheet already exists for this admission
    let caseSheet = await IpdCaseSheet.findOne({ where: { admissionId } });

    if (caseSheet) {
      // Update existing case sheet
      caseSheet.chiefComplaints = chiefComplaints;
      caseSheet.associateComplaints = associateComplaints;
      caseSheet.historyOfPresentIllness = historyOfPresentIllness;
      caseSheet.pastHistory = pastHistory;
      caseSheet.medicalSurgicalHistory = medicalSurgicalHistory;
      caseSheet.menstrualHistory = menstrualHistory;
      caseSheet.personalHistory = personalHistory;
      caseSheet.generalSpecialExamination = generalSpecialExamination;
      caseSheet.investigation = investigation;
      caseSheet.treatments = treatments;

      await caseSheet.save();

      console.log("Updated case sheet:", caseSheet);

      return res.json({
        message: "Case sheet updated successfully",
        caseSheet,
      });
    } else {
      // Create new case sheet
      caseSheet = await IpdCaseSheet.create({
        admissionId,
        ipNumber,
        chiefComplaints,
        associateComplaints,
        historyOfPresentIllness,
        pastHistory,
        medicalSurgicalHistory,
        menstrualHistory,
        personalHistory,
        generalSpecialExamination,
        investigation,
        treatments,
      });

      console.log("Created case sheet:", caseSheet);

      return res.status(201).json({
        message: "Case sheet created successfully",
        caseSheet,
      });
    }
  } catch (err) {
    console.error("Error saving case sheet:", err);
    res.status(500).json({
      message: err.message,
      error: err.toString(),
    });
  }
};

// Get case sheet by admission ID
export const getCaseSheetByAdmissionId = async (req, res) => {
  try {
    const { admissionId } = req.params;

    const caseSheet = await IpdCaseSheet.findOne({ where: { admissionId } });

    if (!caseSheet) {
      return res.status(404).json({
        message: "Case sheet not found",
      });
    }

    res.json(caseSheet);
  } catch (err) {
    console.error("Error fetching case sheet:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get case sheet by IP number
export const getCaseSheetByIpNumber = async (req, res) => {
  try {
    const { ipNumber } = req.params;

    const caseSheet = await IpdCaseSheet.findOne({ where: { ipNumber } });

    if (!caseSheet) {
      return res.status(404).json({
        message: "Case sheet not found",
      });
    }

    res.json(caseSheet);
  } catch (err) {
    console.error("Error fetching case sheet:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all case sheets (for admin)
export const getAllCaseSheets = async (req, res) => {
  try {
    const caseSheets = await IpdCaseSheet.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(caseSheets);
  } catch (err) {
    console.error("Error fetching case sheets:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete case sheet
export const deleteCaseSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const caseSheet = await IpdCaseSheet.findByPk(id);

    if (!caseSheet) {
      return res.status(404).json({
        message: "Case sheet not found",
      });
    }

    await caseSheet.destroy();

    res.json({
      message: "Case sheet deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting case sheet:", err);
    res.status(500).json({ message: err.message });
  }
};
