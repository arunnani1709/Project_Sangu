import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "doctor"),
    allowNull: false,
    defaultValue: "doctor",
  },
  resetOtp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetOtpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default User;
