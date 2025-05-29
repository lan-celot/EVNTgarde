import express, { NextFunction, Request, Response } from "express";
import { query } from "../db";

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

// Get all RSVPs for an event
router.get("/rsvps/event/:eventId", async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    console.log("Fetching RSVPs for event:", eventId);

    const result = await query(
      `SELECT r.*, c.first_name, c.last_name, c.email 
       FROM rsvp r
       JOIN customer_account_data c ON r.customer_id = c.customer_id
       WHERE r.event_id = $1
       ORDER BY r.created_at DESC`,
      [eventId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    res.status(500).json({ 
      error: "Failed to fetch RSVPs",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Create a new RSVP
router.post("/rsvp", async (req: Request, res: Response) => {
  try {
    const { eventId, customerId, status, additionalGuests, dietaryRestrictions } = req.body;

    // Validate required fields
    if (!eventId || !customerId || !status) {
      res.status(400).json({ error: "Event ID, Customer ID, and status are required" });
      return;
    }

    const result = await query(
      `INSERT INTO rsvp (
        event_id, customer_id, status, additional_guests, 
        dietary_restrictions, created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *`,
      [eventId, customerId, status, additionalGuests || 0, dietaryRestrictions || null]
    );

    res.status(201).json({
      success: true,
      message: "RSVP created successfully",
      rsvp: result.rows[0]
    });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    res.status(500).json({ 
      error: "Failed to create RSVP",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Update an RSVP
router.put("/rsvp/:rsvpId", async (req: Request, res: Response) => {
  try {
    const rsvpId = req.params.rsvpId;
    const { status, additionalGuests, dietaryRestrictions } = req.body;

    const result = await query(
      `UPDATE rsvp 
       SET status = $1, 
           additional_guests = $2, 
           dietary_restrictions = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE rsvp_id = $4
       RETURNING *`,
      [status, additionalGuests || 0, dietaryRestrictions || null, rsvpId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "RSVP not found" });
      return;
    }

    res.json({
      success: true,
      message: "RSVP updated successfully",
      rsvp: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating RSVP:", error);
    res.status(500).json({ 
      error: "Failed to update RSVP",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Delete an RSVP
router.delete("/rsvp/:rsvpId", async (req: Request, res: Response) => {
  try {
    const rsvpId = req.params.rsvpId;

    const result = await query(
      "DELETE FROM rsvp WHERE rsvp_id = $1 RETURNING *",
      [rsvpId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "RSVP not found" });
      return;
    }

    res.json({
      success: true,
      message: "RSVP deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    res.status(500).json({ 
      error: "Failed to delete RSVP",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router; 