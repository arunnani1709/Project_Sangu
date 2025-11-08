import express from "express";
import {
  saveCaseSheet,
  getCaseSheetByAdmissionId,
  getCaseSheetByIpNumber,
  getAllCaseSheets,
  deleteCaseSheet,
} from "../controllers/ipdCaseSheetController.js";

const router = express.Router();

// POST /api/ipd-case-sheets - create or update a case sheet
router.post("/", saveCaseSheet);

// GET /api/ipd-case-sheets/admission/:admissionId - get case sheet by admission ID
router.get("/admission/:admissionId", getCaseSheetByAdmissionId);

// GET /api/ipd-case-sheets/ip/:ipNumber - get case sheet by IP number
router.get("/ip/:ipNumber", getCaseSheetByIpNumber);

// GET /api/ipd-case-sheets - get all case sheets
router.get("/", getAllCaseSheets);

// DELETE /api/ipd-case-sheets/:id - delete a case sheet
router.delete("/:id", deleteCaseSheet);

export default router;
