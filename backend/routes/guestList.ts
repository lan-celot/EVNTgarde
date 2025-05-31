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
  const { guests } = req.body;

  if (!Array.isArray(guests)) {
    res.status(400).json({ success: false, message: 'Invalid payload' });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const query = `
      INSERT INTO event_guests (
        first_name, last_name, email_address, contact_number, gender,
        rsvp_status, reference_code, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    for (const g of guests) {
      const referenceCode = `REG-${uuidv4().substring(0, 8).toUpperCase()}`;
      await client.query(query, [
        g.firstName,
        g.lastName,
        g.email,
        g.contactNumber || null,
        g.gender || null,
        'pending',
        referenceCode,
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

// CSV Upload Guest Entry
router.post('/uploadGuestCSV', (req: Request, res: Response, next: NextFunction) => {
  uploadHandler(req as any, res as any, (err: any) => {
    if (err) return next(err);

    const typedReq = req as MulterRequest;
    const filePath = typedReq.file?.path;

    if (!filePath) {
      res.status(400).json({ success: false, message: 'Missing file' });
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
              first_name, last_name, email_address, contact_number, gender,
              rsvp_status, reference_code, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `;

          for (const g of guests) {
            const referenceCode = `REG-${uuidv4().substring(0, 8).toUpperCase()}`;
            await client.query(query, [
              g['First Name'],
              g['Last Name'],
              g['Email'],
              g['Contact Number'] || null,
              g['Gender'] || null,
              'pending',
              referenceCode,
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
