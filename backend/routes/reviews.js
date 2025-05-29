"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
console.log("Loaded Environment Variables:", {
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
});
const pool = new pg_1.default.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});
router.post("/submit-review", upload.none(), // ← cast here
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Raw req.body:", req.body);
        const { ratings, title, experience, reviewer_id, event_id, image_urls, // comma-separated string or null
         } = req.body;
        if (!ratings) {
            console.error("Missing ratings field in request body");
            res.status(400).json({ error: "Missing ratings field" });
            return;
        }
        let parsedRatings;
        try {
            parsedRatings =
                typeof ratings === "string" ? JSON.parse(ratings) : ratings;
        }
        catch (parseError) {
            console.error("Failed to parse ratings JSON:", parseError);
            res.status(400).json({ error: "Invalid ratings JSON" });
            return;
        }
        console.log("Parsed ratings:", parsedRatings);
        const { communication, preparedness, professional, perceived_value, } = parsedRatings;
        if (communication === undefined ||
            preparedness === undefined ||
            professional === undefined ||
            perceived_value === undefined) {
            console.error("Parsed ratings missing required properties");
            res
                .status(400)
                .json({ error: "Ratings missing required properties" });
            return;
        }
        const result = yield pool.query(`INSERT INTO Review (
           Reviewer_ID, Event_ID, Communication, Preparedness, Professional,
           Perceived_Value, Review_Text, Review_Images, Review_Title,
           Review_Date, Receiving_Vendor_ID
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING Review_ID`, [
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
        ]);
        res.status(200).json({
            message: "Success",
            reviewId: result.rows[0].review_id,
        });
        return;
    }
    catch (err) {
        console.error("Error submitting review:", err);
        next(err);
    }
}));
exports.default = router;
