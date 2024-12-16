import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth", "root", "code", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, // Default MySQL port
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
