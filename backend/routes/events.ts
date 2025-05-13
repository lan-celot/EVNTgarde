import express from 'express';
import { query } from '../db';

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

router.post('/events', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const {
      eventName,
      eventOverview,
      startDate,
      endDate,
      startTime,
      endTime,
      guests,
      location,
      attire,
      services,
      additionalServices,
      budget,
      customerId,
    } = req.body;

    // Validate customerId
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Validate numeric fields
    if (isNaN(Number(guests)) || isNaN(Number(budget))) {
      return res.status(400).json({ error: 'Guests and budget must be numbers' });
    }

    // Log validation checks
    console.log('Validation checks:', {
      customerId: !!customerId,
      eventName: !!eventName,
      startDate: !!startDate,
      endDate: !!endDate,
      startTime: !!startTime,
      endTime: !!endTime,
      guests: !!guests,
      location: !!location,
      attire: !!attire,
      services: !!services,
      budget: !!budget
    });

    // Basic validation
    if (!eventName || !startDate || !endDate || !startTime || !endTime) {
      console.log('Missing required fields:', {
        eventName: !eventName,
        startDate: !startDate,
        endDate: !endDate,
        startTime: !startTime,
        endTime: !endTime
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert into Events table (only fields we have data for)
    const result = await query(
      `INSERT INTO events (
        customer_id,
        event_name,
        event_desc,
        date,
        end_date,
        start_time,
        end_time,
        guests,
        attire,
        additional_services,
        services,
        location,
        budget
      ) VALUES ($1::integer, $2, $3, $4, $5, $6, $7, $8::integer, $9, $10, $11, $12, $13::integer) RETURNING *`,
      [
        customerId,
        eventName,
        eventOverview,
        startDate, // just the date part
        endDate,   // just the date part
        startTime, // just the time part
        endTime,   // just the time part
        guests,
        attire,
        additionalServices,
        Array.isArray(services) ? services.join(',') : services,
        location,
        budget
      ]
    );

    if (result.rows && result.rows[0]) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.error('Error creating event:', error);
    if (error instanceof Error && error.message) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
});

export default router; 