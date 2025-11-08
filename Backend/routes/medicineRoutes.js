import express from "express";
import {
  getMedicines,
  addMedicine,
  deleteMedicine,
  deductMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", getMedicines);
router.post("/", addMedicine);
router.delete("/:id", deleteMedicine);
router.put("/:code/:type/deduct", deductMedicine); // Deduct medicine quantity

export default router;
