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
const db_1 = require("../db");
const router = express_1.default.Router();
// Add JSON body parser middleware
router.use(express_1.default.json());
// Get all RSVPs for an event
router.get("/rsvps/event/:eventId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        console.log("Fetching RSVPs for event:", eventId);
        const result = yield (0, db_1.query)(`SELECT r.*, c.first_name, c.last_name, c.email 
       FROM rsvp r
       JOIN customer_account_data c ON r.customer_id = c.customer_id
       WHERE r.event_id = $1
       ORDER BY r.created_at DESC`, [eventId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching RSVPs:", error);
        res.status(500).json({
            error: "Failed to fetch RSVPs",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
// Create a new RSVP
router.post("/rsvp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, customerId, status, additionalGuests, dietaryRestrictions } = req.body;
        // Validate required fields
        if (!eventId || !customerId || !status) {
            res.status(400).json({ error: "Event ID, Customer ID, and status are required" });
            return;
        }
        const result = yield (0, db_1.query)(`INSERT INTO rsvp (
        event_id, customer_id, status, additional_guests, 
        dietary_restrictions, created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *`, [eventId, customerId, status, additionalGuests || 0, dietaryRestrictions || null]);
        res.status(201).json({
            success: true,
            message: "RSVP created successfully",
            rsvp: result.rows[0]
        });
    }
    catch (error) {
        console.error("Error creating RSVP:", error);
        res.status(500).json({
            error: "Failed to create RSVP",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
// Update an RSVP
router.put("/rsvp/:rsvpId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rsvpId = req.params.rsvpId;
        const { status, additionalGuests, dietaryRestrictions } = req.body;
        const result = yield (0, db_1.query)(`UPDATE rsvp 
       SET status = $1, 
           additional_guests = $2, 
           dietary_restrictions = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE rsvp_id = $4
       RETURNING *`, [status, additionalGuests || 0, dietaryRestrictions || null, rsvpId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "RSVP not found" });
            return;
        }
        res.json({
            success: true,
            message: "RSVP updated successfully",
            rsvp: result.rows[0]
        });
    }
    catch (error) {
        console.error("Error updating RSVP:", error);
        res.status(500).json({
            error: "Failed to update RSVP",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
// Delete an RSVP
router.delete("/rsvp/:rsvpId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rsvpId = req.params.rsvpId;
        const result = yield (0, db_1.query)("DELETE FROM rsvp WHERE rsvp_id = $1 RETURNING *", [rsvpId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "RSVP not found" });
            return;
        }
        res.json({
            success: true,
            message: "RSVP deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting RSVP:", error);
        res.status(500).json({
            error: "Failed to delete RSVP",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
exports.default = router;
