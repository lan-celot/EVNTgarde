// src/api/loginCustomer.ts
import type { NextApiRequest, NextApiResponse } from 'next'; // or your framework's type
import { query } from '../functions/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password } = req.body;

  try {
    // Find user by email (search all user types in the unified table)
    const result = await query(
      `SELECT * FROM Customer_Account_Data WHERE Customer_Email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.customer_password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Return user info (omit password)
    return res.status(200).json({
      success: true,
      user: {
        id: user.customer_id,
        email: user.customer_email,
        userType: user.customer_type, // "customer", "organizer", "vendor"
        firstName: user.customer_first_name,
        lastName: user.customer_last_name,
        // ...add other fields as needed
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}