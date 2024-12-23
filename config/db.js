import { Sequelize } from "sequelize";

const sequelize = new Sequelize("buyany", "postgres", "code", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
