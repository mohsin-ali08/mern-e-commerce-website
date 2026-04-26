const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

// 🌤️ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🧠 Multer Setup (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 Route: Upload Image to Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded!",
      });
    }

    // Stream upload function
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads", // optional folder name
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        // Convert buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload the image
    const result = await streamUpload(req.file.buffer);

    // ✅ Success Response
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error! Unable to upload image.",
      error: error.message,
    });
  }
});

module.exports = router;
