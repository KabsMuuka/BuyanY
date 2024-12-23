import express from "express";
const router = express.Router();
import Post from "../../model/Post.js";

router.get("/", async (req, res) => {
  //by id next time
  try {
    // const imageId = req.params.imageId;
    const image = await Post.findAll();

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image found",
      image,
    });
  } catch (error) {
    console.error("Error querying image:", error);
    res.status(500).json({ message: "Server error during image retrieval" });
  }
});

export default router;
