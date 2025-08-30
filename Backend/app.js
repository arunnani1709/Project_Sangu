import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import db from "./models/index.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import swarnaprashanaPatientRoutes from "./routes/swarnaprashanaPatientRoutes.js";
import swarnaprashanaNoteRoutes from "./routes/swarnaprashanaNoteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/swarnaprashana/patients", swarnaprashanaPatientRoutes);
app.use("/api/notes", swarnaprashanaNoteRoutes);

import path from "path";
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Sync DB
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Error syncing DB:", err);
  });

export default app;
