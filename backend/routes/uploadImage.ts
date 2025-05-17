import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // set in .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-images", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("AWS_S3_BUCKET_NAME environment variable is not set");
    }

    const uploadedUrls: string[] = [];

    for (const file of req.files) {
      const uploadParams = {
        Bucket: bucketName,
        Key: `reviews/${uuidv4()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      const data = await s3.upload(uploadParams).promise();
      uploadedUrls.push(data.Location);
    }

    res.json({ imageUrls: uploadedUrls });
  } catch (err) {
    console.error("S3 Upload Failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
