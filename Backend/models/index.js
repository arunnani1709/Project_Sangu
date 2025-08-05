import sequelize from "../config/db.js";
import User from "./User.js";

// Associate models here if needed in the future

const db = {
  sequelize,
  User,
};

export default db;
