import express from "express";
const router = express.Router();
import Messages from "../../../model/Messages.js";

router.get("/", async (req, res) => {
  const messages = await Messages.findAll();

  try {
    if (!messages) {
      return res.status(404).json({ err: "something went wrong" });
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json("server error", error);
  }
});

export default router;
