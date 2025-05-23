import express, { NextFunction } from "express";
import { query } from "../db";

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

// Fetch all event types
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
        location,
        eventTypeId,
        attire,
        services,
        additionalServices,
        budget,
        customerId,
        organizerId,
        vendorId,
        venueId,
        isPackage,
      } = req.body;

      // Validate customerId
      if (!customerId) {
        console.log("Customer ID validation failed:", customerId);
        res.status(400).json({
          error: "Valid Customer ID is required",
          receivedCustomerId: customerId,
        });
        return;
      }

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
          organizer_id, vendor_id, customer_id, event_status,
          start_date, end_date, start_time, end_time,
          guests, attire, additional_services, services,
          location, ispackage, budget, event_type
        ) VALUES (
          DEFAULT, $1,$2,$3,$4,$5,$6,$7,'pending',
          $8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
        ) RETURNING *
      `;
      const vals = [
        eventName,
        +eventTypeId,
        eventOverview || "",
        venueId || null,
        organizerId || null,
        vendorId || null,
        customerId,
        startDate,
        endDate,
        startTime,
        endTime,
        +guests,
        attire || "",
        additionalServices || "",
        Array.isArray(services) ? services.join(",") : "",
        location || "",
        isPackage || false,
        +budget,
        +eventTypeId,
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
