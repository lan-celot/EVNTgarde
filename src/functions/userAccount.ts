import { query } from '../functions/db';
import bcrypt from 'bcryptjs';
import { CustomerRegistrationData } from './types'; // adjust import path as needed

export async function registerCustomer(data: CustomerRegistrationData) {
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 2. Insert into DB
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

  try {
    const result = await query(insertQuery, values);
    return { success: true, customerId: result.rows[0].customer_id };
  } catch (error: any) {
    // Handle duplicate email, etc.
    if (error.code === '23505') { // unique_violation
      return { success: false, message: 'Email already registered.' };
    }
    return { success: false, message: error.message };
  }
}

export interface UserAccount {
  userType: string
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  companyName?: string
  businessName?: string
  businessType?: string
  industry?: string
  services?: string
  preferences: string[]
}

export const createUserAccount = (
  userType: string,
  email: string,
  additionalData: Record<string, any> = {},
): UserAccount => {
  return {
    userType,
    email,
    preferences: [],
    ...additionalData,
  }
}

export const updateUserType = (user: UserAccount, type: string): UserAccount => {
  return { ...user, userType: type }
}

export const updateContactInfo = (user: UserAccount, email: string, phone?: string): UserAccount => {
  return { ...user, email, phone }
}

export const updateBusinessInfo = (
  user: UserAccount,
  companyName?: string,
  businessName?: string,
  businessType?: string,
): UserAccount => {
  return { ...user, companyName, businessName, businessType }
}

export const updateIndustry = (user: UserAccount, industry: string): UserAccount => {
  return { ...user, industry }
}

export const updateServices = (user: UserAccount, services: string): UserAccount => {
  return { ...user, services }
}

export const updatePreferences = (user: UserAccount, preference: string): UserAccount => {
  const updatedPreferences = user.preferences.includes(preference)
    ? user.preferences.filter((p) => p !== preference)
    : [...user.preferences, preference]

  return { ...user, preferences: updatedPreferences }
}

