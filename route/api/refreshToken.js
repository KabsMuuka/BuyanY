import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import { generateAccessToken } from "../../utils/helpers.js";

router.get("/", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token found" });
  }

  jwt.verify(refreshToken, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

export default router;
