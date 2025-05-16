import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Initialize PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, contactNumber, organization, gender, eventId } = req.body;

    // Validate required fields
    if (!fullName || !email || !contactNumber || !organization || !gender || !eventId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate a unique registration ID
    const registrationId = `REG-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Current timestamp for registration date
    const registrationDate = new Date().toISOString();

    // Insert the guest registration into the database
    const query = `
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

    const result = await pool.query(query, values);
    
    // Send success response with the created record
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: result.rows[0]
    });
    
  } catch (error: any) {
    console.error('Error registering guest:', error);
    
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
}