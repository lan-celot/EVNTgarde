// backend/routes/customer.ts
import bcrypt from 'bcryptjs/umd/types';
import { v4 as uuidv4 } from 'uuid'; // Install with: npm install uuid
import router from './auth';
import { query } from '../db';
import { Request, Response } from 'express';

// backend/routes/customer.ts
router.post('/registerCustomer', async (req, res) => {
    const data = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);
  
      // Insert into DB (Customer_ID will be auto-generated)
      const insertQuery = `
        INSERT INTO Customer_Account_Data
          (Customer_First_Name, Customer_Middle_Name, Customer_Last_Name, Customer_Email, Customer_Phone_No, Customer_Location, Customer_Password, Customer_Type)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING Customer_ID
      `;
  
      const values = [
        data.firstName,
        data.middleName || null,
        data.lastName,
        data.email,
        data.phoneNo || null,
        data.location || null,
        hashedPassword,
        data.customerType,
      ];
  
      const result = await query(insertQuery, values);
      res.json({ success: true, customerId: result.rows[0].customer_id });
    } catch (error: any) {
      if (error.code === '23505') { // unique_violation
        res.json({ success: false, message: 'Email already registered.' });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  });