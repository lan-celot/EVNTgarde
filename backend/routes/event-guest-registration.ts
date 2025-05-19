import express from 'express';
import { query } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Add JSON body parser middleware
router.use(express.json());

// Guest registration endpoint
router.post('/register', async (req, res) => {
  try {
    console.log('Processing guest registration request...');
    const { fullName, email, contactNumber, organization, gender, eventId } = req.body;

    // Validate required fields
    if (!fullName || !email || !contactNumber || !organization || !gender || !eventId) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Generate a unique registration ID
    const registrationId = `REG-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Current timestamp for registration date
    const registrationDate = new Date().toISOString();

    console.log('Inserting guest registration into database...');
    // Insert the guest registration into the database
    const insertQuery = `
      INSERT INTO event_guests (
        event_id, 
        registration_id, 
        full_name, 
        email, 
        contact_number, 
        organization, 
        gender, 
        registration_date
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `;

    const values = [
      eventId,
      registrationId,
      fullName,
      email,
      contactNumber,
      organization,
      gender,
      registrationDate
    ];

    const result = await query(insertQuery, values);
    
    console.log('Guest registration successful:', registrationId);
    // Send success response with the created record
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: result.rows[0]
    });
    
  } catch (error: any) {
    console.error('Error registering guest:', {
      message: error.message,
      code: error.code,
      constraint: error.constraint,
      stack: error.stack
    });
    
    // Check for duplicate registration_id error
    if (error.code === '23505' && error.constraint === 'event_guests_registration_id_key') {
      return res.status(409).json({
        success: false,
        message: 'A registration with this email already exists.'
      });
    }
    
    // Check for foreign key constraint error
    if (error.code === '23503' && error.constraint === 'event_guests_event_id_fkey') {
      return res.status(404).json({
        success: false,
        message: 'The specified event does not exist.'
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.'
    });
  }
});

// Get all registrations for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    if (!eventId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event ID is required' 
      });
    }
    
    const result = await query(
      'SELECT * FROM event_guests WHERE event_id = $1 ORDER BY registration_date DESC',
      [eventId]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error: any) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
});

// Get a specific registration by ID
router.get('/:registrationId', async (req, res) => {
  try {
    const registrationId = req.params.registrationId;
    
    const result = await query(
      'SELECT * FROM event_guests WHERE registration_id = $1',
      [registrationId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration'
    });
  }
});

export default router;