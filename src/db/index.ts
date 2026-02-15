import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Use Neon serverless driver for Vercel Edge/Serverless compatibility
// This works in both Vercel serverless AND local development

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:SecurePass2026!@localhost:5432/laboratorio_bienestar';

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
