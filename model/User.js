import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Mark this column as the primary key
      autoIncrement: true, // Enable auto-increment
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure this field is not null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure this field is not null
    },
  },
  {
    timestamps: false,
  }
);

export default User;
