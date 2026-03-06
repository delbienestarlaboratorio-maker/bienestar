import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Use Neon serverless driver for Vercel Edge/Serverless compatibility
// This works in both Vercel serverless AND local development

const connectionString = process.env.DATABASE_URL || 'postgresql://dummyuser:dummypass@localhost/placeholder_build_only';

// During build time (no real DB), use a lazy proxy to avoid spawn errors
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });

