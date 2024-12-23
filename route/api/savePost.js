import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Post from "../../model/Post.js";

// Setting up Multer Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save uploaded files to 'uploads' dir
    // Get the current directory of the file using import.meta.url
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Corrected directory name to 'uploads'
    const uploadDir = path.join(__dirname, "../../public/images");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create 'uploads' folder if it doesn't exist
    }
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    // Use original file name with a unique timestamp to avoid conflicts
    // Remove the unwanted space from the filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer middleware with file size limit and allowed file types
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    // Allow only image files (JPEG, PNG, GIF)
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    if (allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Image upload endpoint
router.post("/", upload.single("image"), async (req, res) => {
  const { filename, mimetype, size } = req.file;
  const { userNumber, title, price, description, location } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (
      !userNumber ||
      !mimetype ||
      !filename ||
      !size ||
      !title ||
      !price ||
      !description ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "Missing required file metadata" });
    }

    const image = await Post.create({
      userNumber: userNumber,
      title: title,
      price: price,
      description: description,
      location: location,
      filename: filename,
      mimetype: mimetype,
      size: size,
      url: `http://localhost:4000/public/images/${filename}`, // URL to access the image
    });

    res.status(200).json({
      message: "File uploaded successfully",
      image,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
});

export default router;
