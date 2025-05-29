"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
// filepath: c:\Users\Liam-Laptop\Documents\GitHub\EVNTgarde\backend\db.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
console.log('Loaded Environment Variables:', {
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
});
// Ensure environment variables are properly set
if (!process.env.PGPASSWORD || typeof process.env.PGPASSWORD !== 'string') {
    throw new Error('Database password (PGPASSWORD) must be set and must be a string.');
}
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true, // Enable SSL
});
const query = (text, params) => {
    console.log('Executing SQL:', text);
    console.log('With parameters:', params);
    return pool.query(text, params);
};
exports.query = query;
exports.default = pool;
