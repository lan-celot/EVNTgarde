import express from 'express';
import bcrypt from 'bcryptjs';
import  pool  from '../db';   
import { CustomRequest, CustomResponse } from '../types/express';
import { query } from '../db';
import { v4 as uuidv4 } from 'uuid'; // Install with: npm install uuid

const router = express.Router();

interface RequestBody {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  phoneNo?: string;
  preferences?: any;
  customerType: string;
}

interface VendorRequestBody {
  vendorBusinessName: string;
  vendorEmail: string;
  vendorPassword: string;
  vendorType: string;
  vendorPhoneNo?: string;
  services: string;
  preferences?: string[]; // Stored as JSON string in DB
}

// Registration endpoint

// Register a new customer
router.post('/registerCustomer', async (req: CustomRequest<RequestBody>, res: CustomResponse) => {
  const { firstName, middleName, lastName, email, password, phoneNo, preferences, customerType } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO Customer_Account_Data
        (Customer_First_Name, Customer_Middle_Name, Customer_Last_Name, Customer_Email, Customer_Phone_No, Customer_Password, Customer_Type)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING Customer_ID`,
      [firstName, middleName || null, lastName, email, phoneNo || null, hashedPassword, customerType]
    );
    res.status(201).json({ success: true, customerId: result.rows[0].customer_id });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ success: false, message: 'Email already registered.' });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

// Register a new vendor
router.post('/registerVendor', async (req: CustomRequest<VendorRequestBody>, res: CustomResponse) => {
  const {
    vendorBusinessName,
    vendorEmail,
    vendorPassword,
    vendorType,
    vendorPhoneNo,
    services,
    preferences,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(vendorPassword, 10);
    const result = await pool.query(
      `INSERT INTO Vendor_Account_Data 
        (vendor_business_name, vendor_email, vendor_password, vendor_type, vendor_phone_no, services, preferences)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING vendor_id`,
      [
        vendorBusinessName,
        vendorEmail,
        hashedPassword,
        vendorType,
        vendorPhoneNo || null,
        services,
        JSON.stringify(preferences || []),
      ]
    );
    res.status(201).json({ success: true, vendorId: result.rows[0].vendor_id });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ success: false, message: 'Email already registered.' });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

interface LoginRequestBody {
  email: string;
  password: string;
}

interface VendorLoginRequestBody {
  vendorEmail: string;
  vendorPassword: string;
}

// Login endpoint
// Login for customer
router.post('/loginCustomer', async (req: CustomRequest<LoginRequestBody>, res: CustomResponse) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM Customer_Account_Data WHERE Customer_Email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.customer_password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user.customer_id,
        email: user.customer_email,
        userType: user.customer_type,
        firstName: user.customer_first_name,
        lastName: user.customer_last_name,
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login for vendor
router.post('/loginVendor', async (req: CustomRequest<VendorLoginRequestBody>, res: CustomResponse) => {
  const { vendorEmail, vendorPassword } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM Vendor_Account_Data WHERE vendor_email = $1`,
      [vendorEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const vendor = result.rows[0];
    const isMatch = await bcrypt.compare(vendorPassword, vendor.vendor_password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.status(200).json({
      success: true,
      vendor: {
        id: vendor.vendor_id,
        email: vendor.vendor_email,
        name: vendor.vendor_business_name,
        type: vendor.vendor_type,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;