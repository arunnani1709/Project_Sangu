import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OpdDoctorNote = sequelize.define(
  "OpdDoctorNote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicines: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "opd_doctor_notes",
    timestamps: true,
  }
);

export default OpdDoctorNote;
