import express from "express";
import {
  getMedicines,
  addMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", getMedicines);
router.post("/", addMedicine);
router.delete("/:id", deleteMedicine); // ✅ add this

export default router;
