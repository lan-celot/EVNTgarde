import express, { Request, Response } from 'express';
import pool from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Manual Guest Entry
router.post('/createGuestList', async (req: Request, res: Response): Promise<void> => {
  const { eventId, guests } = req.body;

  if (!eventId || !Array.isArray(guests)) {
    res.status(400).json({ success: false, message: 'Invalid payload' });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const query = `
      INSERT INTO event_guests (
        event_id, registration_id, full_name, email, contact_number, organization, gender, registration_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    for (const g of guests) {
      const registrationId = `REG-${uuidv4().substring(0, 8).toUpperCase()}`;
      const registrationDate = new Date().toISOString();

      await client.query(query, [
        eventId,
        registrationId,
        g.fullName,
        g.email,
        g.contactNumber || null,
        g.organization || null,
        g.gender,
        registrationDate
      ]);
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, message: 'Guests successfully created' });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('Error inserting guest list:', err);
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
});

export default router;
