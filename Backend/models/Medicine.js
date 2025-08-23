import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Medicine = sequelize.define(
  "Medicine",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["code", "type"], // ✅ ensure no duplicate medicine-type entries
      },
    ],
  }
);

export default Medicine;
