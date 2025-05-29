import express, { Request, Response, NextFunction } from 'express';
import pool from '../db';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const uploadHandler = upload.single('file');

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

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
      const fullName = `${g.firstName} ${g.lastName}`;

      await client.query(query, [
        eventId,
        registrationId,
        fullName,
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

router.post('/uploadGuestCSV', (req: Request, res: Response, next: NextFunction) => {
  uploadHandler(req as any, res as any, (err: any) => {
    if (err) return next(err);

    const typedReq = req as MulterRequest;
    const eventId = parseInt(typedReq.body.eventId, 10);
    const filePath = typedReq.file?.path;

    if (!eventId || !filePath) {
      res.status(400).json({ success: false, message: 'Missing eventId or file' });
      return;
    }

    const guests: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => guests.push(row))
      .on('end', async () => {
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
            const fullName = `${g['First Name']} ${g['Last Name']}`;

            await client.query(query, [
              eventId,
              registrationId,
              fullName,
              g['Email'],
              g['Contact Number'] || null,
              g['Organization'] || null,
              g['Gender'],
              registrationDate
            ]);
          }

          await client.query('COMMIT');
          res.json({ success: true, message: 'CSV guests added' });
        } catch (err: any) {
          await client.query('ROLLBACK');
          console.error('CSV error:', err);
          res.status(500).json({ success: false, message: err.message });
        } finally {
          client.release();
          if (filePath) fs.unlinkSync(filePath);
        }
      });
  });
});

export default router;
