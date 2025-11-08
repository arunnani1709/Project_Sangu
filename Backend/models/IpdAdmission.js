import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const IpdAdmission = sequelize.define(
  "IpdAdmission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ipNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clinicId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "NJ Number (clinic ID) of the patient",
    },
    opNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "OP Number of the patient",
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dischargeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("admitted", "discharged"),
      defaultValue: "admitted",
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bedNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "ipd_admissions",
    timestamps: true,
  }
);

export default IpdAdmission;
