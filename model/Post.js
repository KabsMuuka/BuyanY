import DataTypes from "sequelize";
import sequelize from "../config/db.js";

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // MIME type (e.g., 'image/png')
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Post;
