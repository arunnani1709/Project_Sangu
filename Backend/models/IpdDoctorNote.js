import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const IpdDoctorNote = sequelize.define(
  "IpdDoctorNote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key to ipd_admissions table",
    },
    ipNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "IP Number for quick reference",
    },
    clinicId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "NJ Number (clinic ID) of the patient",
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    freshComplaints: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    improvementsOrProgress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vitals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "ipd_doctor_notes",
    timestamps: true,
  }
);

export default IpdDoctorNote;
