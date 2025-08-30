import express from "express";
import {
  addPatient,
  getPatients,
  searchPatients,
} from "../controllers/swarnaprashanaPatientController.js";

const router = express.Router();

router.post("/", addPatient);
router.get("/", getPatients);
router.get("/search", searchPatients);

export default router;
