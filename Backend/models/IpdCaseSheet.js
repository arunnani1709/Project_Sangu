import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const IpdCaseSheet = sequelize.define(
  "IpdCaseSheet",
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
    chiefComplaints: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    associateComplaints: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    historyOfPresentIllness: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pastHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalSurgicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    menstrualHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    personalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    generalSpecialExamination: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    investigation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    treatments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "ipd_case_sheets",
    timestamps: true,
  }
);

export default IpdCaseSheet;
