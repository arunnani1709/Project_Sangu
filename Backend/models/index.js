import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";
import Medicine from "./Medicine.js";

const db = {
  sequelize,
  User,
  Patient,
  Medicine, // ✅ add medicine model
};

export default db;
