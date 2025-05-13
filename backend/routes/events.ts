import express from 'express';
import { query } from '../db';

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

// Fetch all event types
router.get('/event-types', async (req, res) => {
  try {
    const result = await query('SELECT event_type_id, event_type_name FROM event_type');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({ error: 'Failed to fetch event types' });
  }
});

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
    } = req.body;

    // Validate customerId
    if (!customerId || isNaN(Number(customerId))) {
      return res.status(400).json({ error: 'Valid Customer ID is required' });
    }

    // Validate numeric fields
    if (isNaN(Number(guests)) || isNaN(Number(budget))) {
      return res.status(400).json({ error: 'Guests and budget must be numbers' });
    }

    // Validate eventTypeId
    if (!eventTypeId || isNaN(Number(eventTypeId))) {
      return res.status(400).json({ error: 'Valid event type ID is required' });
    }

    // Log validation checks
    console.log('Validation checks:', {
      customerId: !!customerId,
      eventName: !!eventName,
      startDate: !!startDate,
      endDate: !!endDate,
      startTime: !!startTime,
      endTime: !!endTime,
      startDateTime: !!startDateTime,
      endDateTime: !!endDateTime,
      guests: !!guests,
      location: !!location,
      eventTypeId: !!eventTypeId,
      attire: !!attire,
      services: !!services,
      budget: !!budget
    });

    // Basic validation
    if (!eventName || !startDate || !endDate || !startTime || !endTime || !startDateTime || !endDateTime) {
      console.log('Missing required fields:', {
        eventName: !eventName,
        startDate: !startDate,
        endDate: !endDate,
        startTime: !startTime,
        endTime: !endTime,
        startDateTime: !startDateTime,
        endDateTime: !endDateTime
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert into Events table
    const result = await query(
      `INSERT INTO events (
        customer_id,
        event_name,
        event_desc,
        date,
        end_date,
        start_time,
        end_time,
        start_datetime,
        end_datetime,
        guests,
        event_type,
        attire,
        additional_services,
        services,
        location,
        budget
      ) VALUES ($1::integer, $2, $3, $4, $5, $6, $7, $8, $9, $10::integer, $11::integer, $12, $13, $14, $15, $16::integer) RETURNING *`,
      [
        customerId,
        eventName,
        eventOverview,
        startDate,
        endDate,
        startTime,
        endTime,
        startDateTime,
        endDateTime,
        guests,
        eventTypeId,
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