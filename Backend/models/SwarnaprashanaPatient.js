import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SwarnaprashanaPatient = sequelize.define("SwarnaprashanaPatient", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clinicId: { type: DataTypes.STRING, allowNull: true },
  uniqueId: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  sex: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  visitDate: { type: DataTypes.DATEONLY, allowNull: false },
});

export default SwarnaprashanaPatient;
