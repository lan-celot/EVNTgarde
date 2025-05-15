import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';
import { CustomRequest, CustomResponse } from '../types/express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface RequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo?: string;
  customerType: string;
}

interface VendorRequestBody {
  vendorBusinessName: string;
  vendorEmail: string;
  vendorPassword: string;
  vendorType: string;
  vendorPhoneNo?: string;
  services: string;
  preferences?: string[];
}

interface OrganizerRequestBody {
  organizerCompanyName: string;
  organizerEmail: string;
  organizerPassword: string;
  organizerIndustry: string;
  organizerLocation: string;
  organizerType: string;
  organizerLogoUrl?: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface SyncUserRequestBody {
  firebaseUid: string;
  email: string;
  userType: string;
  vendorType?: string;
}

// Register Customer
router.post('/registerCustomer', async (req: CustomRequest<RequestBody>, res: CustomResponse) => {
  const { firstName, lastName, email, password, phoneNo, customerType } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO Customer_Account_Data
        (Customer_First_Name, Customer_Last_Name, Customer_Email, Customer_Phone_No, Customer_Password, Customer_Type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING Customer_ID`,
      [firstName, lastName, email, phoneNo || null, hashedPassword, customerType]
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

// Register Vendor
router.post('/registerVendor', async (req: CustomRequest<VendorRequestBody>, res: CustomResponse) => {
  const { vendorBusinessName, vendorEmail, vendorPassword, vendorType, vendorPhoneNo, services, preferences } = req.body;
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

// Register Organizer
router.post('/registerOrganizer', async (req: CustomRequest<OrganizerRequestBody>, res: CustomResponse) => {
  const {
    organizerCompanyName,
    organizerEmail,
    organizerPassword,
    organizerIndustry,
    organizerLocation,
    organizerType,
    organizerLogoUrl,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(organizerPassword, 10);
    const result = await pool.query(
      `INSERT INTO Event_Organizer_Account_Data 
        (Organizer_ID, Organizer_Company_Name, Organizer_Industry, Organizer_Location, Organizer_Email, Organizer_Review_Rating, Organizer_Password, Organizer_Logo_Url, Organizer_Type)
       VALUES ($1, $2, $3, $4, $5, NULL, $6, $7, $8)
       RETURNING Organizer_ID`,
      [
        uuidv4(),
        organizerCompanyName,
        organizerIndustry,
        organizerLocation || null,
        organizerEmail,
        hashedPassword,
        organizerLogoUrl || null,
        organizerType || null,
      ]
    );
    res.status(201).json({ success: true, organizerId: result.rows[0].organizer_id });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ success: false, message: 'Email already registered.' });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

// Login endpoint
router.post(
  '/loginCustomer',
  async (req: CustomRequest<LoginRequestBody>, res: CustomResponse): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Try Customer login
      const customerResult = await pool.query(`SELECT * FROM Customer_Account_Data WHERE Customer_Email = $1`, [email]);
      if (customerResult.rows.length > 0) {
        const customer = customerResult.rows[0];
        const isMatch = await bcrypt.compare(password, customer.customer_password);
        if (!isMatch) {
          res.status(401).json({ success: false, message: 'Invalid email or password.' });
          return;
        }
        res.status(200).json({
          success: true,
          user: {
            id: customer.customer_id,
            email: customer.customer_email,
            userType: customer.customer_type,
            firstName: customer.customer_first_name,
            lastName: customer.customer_last_name,
          },
        });
        return;
      }

      // Try Vendor login
      const vendorResult = await pool.query(`SELECT * FROM Vendor_Account_Data WHERE Vendor_Email = $1`, [email]);
      if (vendorResult.rows.length > 0) {
        const vendor = vendorResult.rows[0];
        const isMatch = await bcrypt.compare(password, vendor.vendor_password);
        if (!isMatch) {
          res.status(401).json({ success: false, message: 'Invalid email or password.' });
          return;
        }
        res.status(200).json({
          success: true,
          user: {
            id: vendor.vendor_id,
            email: vendor.vendor_email,
            userType: 'vendor',
            businessName: vendor.vendor_business_name,
            location: vendor.vendor_location,
            reviewRating: vendor.vendor_review_rating,
            logoUrl: vendor.vendor_logo_url,
          },
        });
        return;
      }

     // Try Organizer login
    const organizerResult = await pool.query(`SELECT * FROM Event_Organizer_Account_Data WHERE Organizer_Email = $1`, [email]);
    if (organizerResult.rows.length > 0) {
      const organizer = organizerResult.rows[0];
      const isMatch = await bcrypt.compare(password, organizer.organizer_password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: organizer.organizer_id,
          email: organizer.organizer_email,
          userType: organizer.organizer_type,
          companyName: organizer.organizer_company_name,
          location: organizer.organizer_location,
          industry: organizer.organizer_industry,
          logoUrl: organizer.organizer_logo_url,
          reviewRating: organizer.organizer_review_rating,
        },
      });
      return;
    }

      // If no match found
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Sync user data with PostgreSQL
router.post('/syncUser', async (req: CustomRequest<SyncUserRequestBody>, res: CustomResponse) => {
  console.log('Received sync request headers:', req.headers);
  console.log('Received sync request body:', req.body);

  const { firebaseUid, email, userType, vendorType } = req.body;

  console.log('Processing sync request:', { firebaseUid, email, userType, vendorType });

  try {
    if (!firebaseUid || !email || !userType) {
      console.log('Missing required fields:', { firebaseUid, email, userType });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firebaseUid, email, and userType are required'
      });
    }

    // Check if user exists in any of the account tables
    let userExists = false;
    let userId = null;

    try {
      // Check Customer_Account_Data
      console.log('Checking Customer_Account_Data for email:', email);
      const customerResult = await pool.query(
        'SELECT customer_id FROM Customer_Account_Data WHERE customer_email = $1',
        [email]
      );
      if (customerResult.rows.length > 0) {
        userExists = true;
        userId = customerResult.rows[0].customer_id;
        console.log('Found existing customer:', userId);
      }

      // Check Vendor_Account_Data
      console.log('Checking Vendor_Account_Data for email:', email);
      const vendorResult = await pool.query(
        'SELECT vendor_id FROM Vendor_Account_Data WHERE vendor_email = $1',
        [email]
      );
      if (vendorResult.rows.length > 0) {
        userExists = true;
        userId = vendorResult.rows[0].vendor_id;
        console.log('Found existing vendor:', userId);
      }

      // Check Event_Organizer_Account_Data
      console.log('Checking Event_Organizer_Account_Data for email:', email);
      const organizerResult = await pool.query(
        'SELECT organizer_id FROM Event_Organizer_Account_Data WHERE organizer_email = $1',
        [email]
      );
      if (organizerResult.rows.length > 0) {
        userExists = true;
        userId = organizerResult.rows[0].organizer_id;
        console.log('Found existing organizer:', userId);
      }

      if (!userExists) {
        console.log('Creating new user of type:', userType);
        // Create new user based on userType
        switch (userType) {
          case 'individual':
            console.log('Creating new individual user');
            await pool.query(
              `INSERT INTO Customer_Account_Data 
              (customer_id, customer_email, customer_type, customer_first_name, customer_last_name) 
              VALUES ($1, $2, $3, $4, $5)`,
              [firebaseUid, email, userType, 'New', 'User']
            );
            break;

          case 'vendor':
            console.log('Creating new vendor user');
            await pool.query(
              `INSERT INTO Vendor_Account_Data 
              (vendor_id, vendor_email, vendor_type, vendor_business_name) 
              VALUES ($1, $2, $3, $4)`,
              [firebaseUid, email, vendorType || 'general', 'New Business']
            );
            break;

          case 'organizer':
            console.log('Creating new organizer user');
            await pool.query(
              `INSERT INTO Event_Organizer_Account_Data 
              (organizer_id, organizer_email, organizer_type, organizer_company_name) 
              VALUES ($1, $2, $3, $4)`,
              [firebaseUid, email, userType, 'New Company']
            );
            break;

          default:
            console.log('Invalid user type:', userType);
            return res.status(400).json({
              success: false,
              message: `Invalid user type: ${userType}`
            });
        }
        console.log('Successfully created new user');
      }

      const response = {
        success: true,
        message: 'User data synced successfully',
        userId: firebaseUid
      };
      console.log('Sending success response:', response);
      return res.status(200).json(response);
    } catch (dbError: any) {
      console.error('Database error:', {
        message: dbError.message,
        code: dbError.code,
        detail: dbError.detail,
        stack: dbError.stack
      });

      if (dbError.code === '23505') { // Unique violation
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      } else if (dbError.code === '23502') { // Not null violation
        return res.status(400).json({
          success: false,
          message: 'Required fields are missing'
        });
      }

      throw dbError; // Re-throw to be caught by outer try-catch
    }
  } catch (error: any) {
    console.error('Error syncing user data:', {
      error: error.message,
      code: error.code,
      detail: error.detail,
      stack: error.stack
    });
    
    return res.status(500).json({
      success: false,
      message: `Failed to sync user data: ${error.message}`
    });
  }
});

export default router;
