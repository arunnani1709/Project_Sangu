import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";

const db = {
  sequelize,
  User,
  Patient,
};

export default db;
