import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";
import Medicine from "./Medicine.js";
import Certificate from "./Certificate.js"; // ✅ add this

const db = {
  sequelize,
  User,
  Patient,
  Medicine,
  Certificate,
};

export default db;
