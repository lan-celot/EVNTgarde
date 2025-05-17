import express from "express";
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

router.post("/events", async (req, res) => {
  try {
    console.log("Starting event creation process...");
    const {
      eventName,
      eventOverview,
      startDate,
      endDate,
      startTime,
      endTime,
      startDateTime,
      endDateTime,
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

    console.log("Validating customer ID...");
    if (!customerId) {
      console.log("Customer ID validation failed:", customerId);
      return res.status(400).json({
        error: "Valid Customer ID is required",
        receivedCustomerId: customerId,
      });
    }

    console.log("Checking customer in database...");
    const customerCheck = await query(
      "SELECT customer_id FROM Customer_Account_Data WHERE customer_id = $1",
      [customerId]
    );

    if (customerCheck.rows.length === 0) {
      console.log("Customer not found:", customerId);
      return res.status(400).json({
        error: "Customer not found in database",
      });
    }

    // Quick validation of required fields
    const requiredFields = {
      eventName,
      startDate,
      endDate,
      startTime,
      endTime,
      guests: Number(guests),
      budget: Number(budget),
      eventTypeId: Number(eventTypeId),
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    console.log("Preparing database insertion...");
    const insertQuery = `
      INSERT INTO events (
        event_id,
        event_name,
        event_type_id,
        event_desc,
        venue_id,
        organizer_id,
        vendor_id,
        customer_id,
        event_status,
        start_date,
        end_date,
        start_time,
        end_time,
        guests,
        attire,
        additional_services,
        services,
        location,
        ispackage,
        budget,
        event_type
      ) 
      VALUES (
        DEFAULT,
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      )
      RETURNING *
    `;

    const values = [
      eventName,
      Number(eventTypeId),
      eventOverview || "",
      venueId || null,
      organizerId || null,
      vendorId || null,
      customerId,
      "pending", // default event_status
      startDate,
      endDate,
      startTime,
      endTime,
      Number(guests),
      attire || "",
      additionalServices || "",
      Array.isArray(services) ? services.join(",") : "",
      location,
      isPackage || false,
      Number(budget),
      Number(eventTypeId),
    ];

    console.log("Executing database insertion...");
    const result = await query(insertQuery, values);

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to insert event data");
    }

    console.log("Event created successfully:", result.rows[0].event_id);
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return res.status(500).json({
      error: "Failed to create event",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
