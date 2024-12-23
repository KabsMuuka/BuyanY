import DataTypes from "sequelize";
import sequelize from "../config/db.js";

const Messages = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    buyerID: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sellerID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversationID: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    senderID: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    currentTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todaysDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Messages;
