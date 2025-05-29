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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // set in .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const multerArray = (req, res, next) => upload.array("files", 10)(req, res, next);
router.post("/upload-images", multerArray, // ← and here
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !Array.isArray(req.files)) {
            res.status(400).json({ error: "No files uploaded" });
            return;
        }
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_S3_BUCKET_NAME environment variable is not set");
        }
        const uploadedUrls = [];
        for (const file of req.files) {
            const uploadParams = {
                Bucket: bucketName,
                Key: `reviews/${(0, uuid_1.v4)()}_${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read",
            };
            const data = yield s3.upload(uploadParams).promise();
            uploadedUrls.push(data.Location);
        }
        res.json({ imageUrls: uploadedUrls });
        return;
    }
    catch (err) {
        console.error("S3 Upload Failed:", err);
        next(err);
    }
}));
exports.default = router;
