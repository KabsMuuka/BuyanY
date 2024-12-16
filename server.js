import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./config/db.js";

import User from "./model/User.js";
//route/api
import refreshToken from "./route/api/refreshToken.js";
import registerUser from "./route/api/register.js";
import loginUser from "./route/api/loginUser.js";
import me from "./route/api/me.js";
// Middleware

//CORS
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
};
// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes/api
app.use("/api/refresh-token", refreshToken);
app.use("/api/me", me);
app.use("/api/register", registerUser);
app.use("/api/login", loginUser);

// Root endpoint

// Sync models (optional, usually done once during setup)
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database:", err));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
