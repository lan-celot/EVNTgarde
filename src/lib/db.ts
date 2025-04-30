import { Pool } from 'pg';

// You can use environment variables for security and flexibility
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'eletest',
  password: process.env.PGPASSWORD || 'admin',
  port: Number(process.env.PGPORT) || 5433,
});

// Export a query helper for convenience
export const query = (text: string, params?: any[]) => pool.query(text, params);

// Optionally export the pool for advanced use
export default pool;
