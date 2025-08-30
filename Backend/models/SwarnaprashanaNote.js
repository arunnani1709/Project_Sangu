import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import SwarnaprashanaPatient from "./SwarnaprashanaPatient.js";

const SwarnaprashanaNote = sequelize.define("SwarnaprashanaNote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complaints: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  patientId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: SwarnaprashanaPatient,
      key: "uniqueId", // Link notes to patient's uniqueId
    },
  },
  clinicId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// ✅ Define relations using uniqueId
SwarnaprashanaPatient.hasMany(SwarnaprashanaNote, {
  foreignKey: "patientId",
  sourceKey: "uniqueId",
});
SwarnaprashanaNote.belongsTo(SwarnaprashanaPatient, {
  foreignKey: "patientId",
  targetKey: "uniqueId",
});

export default SwarnaprashanaNote;
