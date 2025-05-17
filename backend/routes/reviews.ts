import express from "express";
import pg from "pg";
import multer from "multer";
const upload = multer();

const router = express.Router();

console.log("Loaded Environment Variables:", {
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
});

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

router.post("/submit-review", upload.none(), async (req, res) => {
  try {
    console.log("Raw req.body:", req.body);

    const {
      ratings,
      title,
      experience,
      reviewer_id,
      event_id,
      image_urls, // comma-separated string or null
    } = req.body;

    if (!ratings) {
      console.error("Missing ratings field in request body");
      return res.status(400).json({ error: "Missing ratings field" });
    }

    let parsedRatings;
    try {
      parsedRatings =
        typeof ratings === "string" ? JSON.parse(ratings) : ratings;
    } catch (parseError) {
      console.error("Failed to parse ratings JSON:", parseError);
      return res.status(400).json({ error: "Invalid ratings JSON" });
    }

    console.log("Parsed ratings:", parsedRatings);

    // Validate parsedRatings has expected fields to avoid errors:
    const { communication, preparedness, professional, perceived_value } =
      parsedRatings;

    if (
      communication === undefined ||
      preparedness === undefined ||
      professional === undefined ||
      perceived_value === undefined
    ) {
      console.error("Parsed ratings missing required properties");
      return res
        .status(400)
        .json({ error: "Ratings missing required properties" });
    }

    const result = await pool.query(
      `INSERT INTO Review (
        Reviewer_ID, Event_ID, Communication, Preparedness, Professional,
        Perceived_Value, Review_Text, Review_Images, Review_Title, Review_Date, Receiving_Vendor_ID
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING Review_ID`,
      [
        reviewer_id,
        event_id,
        communication,
        preparedness,
        professional,
        perceived_value,
        experience || null,
        image_urls || null,
        title || null,
        new Date(),
        null,
      ]
    );

    res.status(200).json({
      message: "Success",
      reviewId: result.rows[0].review_id,
    });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

export default router;
