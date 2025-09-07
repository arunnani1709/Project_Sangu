import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Certificate = sequelize.define("Certificate", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storedName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadTime: {  // consistent naming here
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Certificate;
