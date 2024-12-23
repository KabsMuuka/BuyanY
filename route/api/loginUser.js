import express from "express";
const router = express.Router();
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../model/User.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/helpers.js";

//login
router.post("/", async (req, res) => {
  const { phoneNumber, password } = req.body;

  // console.log(req.body);
  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);

    // Store refresh token in HTTP-only cookie
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Make sure the cookie is HTTP-only
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // Refresh token validity (30 days)
    });

    // Send the access token in the response
    res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
