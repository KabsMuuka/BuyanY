import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

import http from "http";

const server = http.createServer(app);
// const path = require("path");
import { Server } from "socket.io";

import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./config/db.js";

import User from "./model/User.js";
import Messages from "./model/Messages.js";
//route/api
import refreshToken from "./route/api/refreshToken.js";
import registerUser from "./route/api/register.js";
import loginUser from "./route/api/loginUser.js";
import savePost from "./route/api/savePost.js";
import fetchPost from "./route/api/fetchPost.js";
import me from "./route/api/me.js";
import messages from "./route/api/websocket/fetchMessages.js";
import users from "./route/api/users.js";
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
app.use("/public", express.static("public"));

// Routes/api
app.use("/api/refresh-token", refreshToken);
app.use("/api/me", me);
app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/savePost", savePost);
app.use("/api/fetchPost", fetchPost);
app.use("/api/users", users);

//messages
app.use("/api/messages", messages);

// Root endpoint
// Sync models (optional, usually done once during setup)
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database:", err));

//Websockets messages
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // Join a room
  socket.on("joinRoom", (conversationID) => {
    if (conversationID) {
      console.log(`buyer joined room: ${conversationID}`);
      socket.join(conversationID);
    } else {
      console.log(`Invalid roomId`);
    }
  });

  // Handle messages
  socket.on("sendMessage", async (data) => {
    const {
      buyerID,
      sellerID,
      conversationID,
      senderID,
      message,
      currentTime,
      todaysDate,
    } = data;
    const roomId = `${conversationID}`;
    console.log(`Message to ${conversationID}:`, message);

    // Broadcast to the room
    io.to(roomId).emit("chat", data);
    //save into messages table
    console.log(data);
    if (
      !buyerID ||
      !sellerID ||
      !conversationID ||
      !senderID ||
      !message ||
      !currentTime ||
      !todaysDate
    ) {
      return console.log("missing required fields");
    }

    await Messages.create({
      buyerID: buyerID,
      sellerID: sellerID,
      conversationID: conversationID,
      senderID: senderID,
      message: message,
      currentTime: currentTime,
      todaysDate: todaysDate,
    });
  });
});

// return;

//ENCRYPTING DATA.
// //message we have
// const algorithm = "aes-256-cbc";
// const password = "password";
//aes-256-ccm requires a 32 bit length and a random 12 bit for it to securly encrypt data
// const iv = randomBytes(16);

// scrypt(password, "salt", 32, async (err, key) => {
//   if (err) throw err;

//create cipher and append to encryptedMessage
// const cipher = createCipheriv(algorithm, key, iv);
// const encryptedMessage =
//   cipher.update(message, "utf8", "hex") + cipher.final("hex");
// //convert it to hex strings
// const ivHex = iv.toString("hex");
// //insert encrypted message into the database
// });

// Server setup
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
