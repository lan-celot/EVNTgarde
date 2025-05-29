import express, { NextFunction, Request, Response } from "express";
import { query } from "../db";

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

// Fetch all event types
router.get("/event-types", async (req, res) => {
  try {
    console.log("Fetching event types...");
    const result = await query(
      "SELECT event_type_id, event_type_name FROM event_type"
    );
    console.log("Event types fetched:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching event types:", error);
    res.status(500).json({ error: "Failed to fetch event types" });
  }
});

// Fetch events for a specific user
router.get("/events/user/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching events for user:", userId);
    
    if (!userId) {
      console.error("No userId provided");
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    // First check if the user exists in the customer_account_data table
    console.log("Checking if user exists in customer_account_data...");
    const userCheck = await query(
      "SELECT customer_id FROM customer_account_data WHERE customer_id = $1",
      [userId]
    );
    console.log("User check result:", userCheck.rows);

    if (userCheck.rows.length === 0) {
      console.log("User not found in database:", userId);
      res.status(404).json({ error: "User not found" });
      return;
    }

    console.log("Fetching events for user...");
    const result = await query(
      `SELECT 
        event_id, event_name, event_desc, start_date, end_date, 
        start_datetime, end_datetime, guests, attire, budget, event_type_id,
        event_status
      FROM events 
      WHERE customer_id = $1
      ORDER BY start_date DESC`,
      [userId]
    );
    
    console.log(`Found ${result.rows.length} events for user ${userId}`);
    console.log("Events data:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ 
      error: "Failed to fetch user events",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

router.post(
  "/events",
  async (req, res, next): Promise<void> => {
    try {
      console.log("Starting event creation process...");
      const {
        eventName,
        eventOverview,
        startDate,
        endDate,
        startTime,
        endTime,
        guests,
        eventTypeId,
        eventTypeName,
        services,
        attire,
        budget,
        customerId,
        organizerId,
        vendorId,
        venueId,
        likingScore,
      } = req.body;

    // Check customer exists
    const customerCheck = await query(
      "SELECT customer_id FROM Customer_Account_Data WHERE customer_id = $1",
      [customerId]
    );
    if (customerCheck.rows.length === 0) {
      console.log("Customer not found:", customerId);
      res.status(400).json({ error: "Customer not found in database" });
      return;
    }

      // Validate customerId
      if (!customerId) {
        console.log("Customer ID validation failed:", customerId);
        res.status(400).json({
          error: "Valid Customer ID is required",
          receivedCustomerId: customerId,
        });
        return;
      }

  

      // Quick validation of required fields (use unary + to coerce)
      const requiredFields = {
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        guests: +guests,
        budget: +budget,
        eventTypeId: +eventTypeId,
      };
      const missing = Object.entries(requiredFields)
        .filter(([_, v]) => !v && v !== 0)
        .map(([k]) => k);
      if (missing.length) {
        console.log("Missing required fields:", missing);
        res.status(400).json({ error: "Missing required fields", fields: missing });
        return;
      }

      // Prepare & execute insert
      console.log("Preparing database insertion...");
      const insertSQL = `
        INSERT INTO events (
          event_id, event_name, event_type_id, event_desc, venue_id,
          organizer_id, vendor_id, customer_id, liking_score,
          start_date, end_date, start_datetime, end_datetime,
          guests, attire, budget, event_status, services
        ) VALUES (
          DEFAULT, $1,$2,$3,$4,$5,$6,$7,
          $8,$9,$10,$11,$12,$13,$14,$15,$16,$17
        ) RETURNING *
      `;
      
      const startDatetime = `${startDate} ${startTime}`;  // '2025-05-30 22:05'
      const endDatetime = `${endDate} ${endTime}`;        // '2025-05-31 23:05'

      const vals = [
        eventName,              // $1
        +eventTypeId,           // $2
        eventOverview || "",    // $3
        venueId || null,        // $4
        organizerId || null,    // $5
        vendorId || null,       // $6
        customerId,             // $7
        likingScore || null,  // $8
        startDate,              // $9
        endDate,                // $10
        startDatetime,              // $11
        endDatetime,                // $12
        +guests,                // $13
        attire || "",           // $14
        +budget,                // $15
        eventTypeName,          // $16
        services,               // $17 
      ];
      console.log("Executing database insertion...");
      const result = await query(insertSQL, vals);
      if (!result.rows?.length) {
        throw new Error("Failed to insert event data");
      }

      console.log("Event created:", result.rows[0].event_id);
      res.status(201).json({
        success: true,
        message: "Event created successfully",
        event: result.rows[0],
      });
      return;

    } catch (err: any) {
      console.error("Error details:", err);
      next(err);  // pass to your error handler
    }
  }
);


export default router;
