import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Patient = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  clinicId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  opNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Patient;
