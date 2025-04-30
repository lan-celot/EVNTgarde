import type { NextApiRequest, NextApiResponse } from 'next'; // or your framework's type
import { registerCustomer } from '../functions/userAccount';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = req.body;
  const result = await registerCustomer(data);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
}