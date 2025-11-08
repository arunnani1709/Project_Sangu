import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";
import Medicine from "./Medicine.js";
import Certificate from "./Certificate.js";
import OpdDoctorNote from "./OpdDoctorNote.js";
import IpdAdmission from "./IpdAdmission.js";
import IpdCaseSheet from "./IpdCaseSheet.js";
import IpdDoctorNote from "./IpdDoctorNote.js";

const db = {
  sequelize,
  User,
  Patient,
  Medicine,
  Certificate,
  OpdDoctorNote,
  IpdAdmission,
  IpdCaseSheet,
  IpdDoctorNote,
};

export default db;
