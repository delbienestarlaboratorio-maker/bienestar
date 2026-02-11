import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Cargar .env.local solo en desarrollo (no disponible en Vercel)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env.local' });
}

// Configuración de conexión PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:SecurePass2026!@localhost:5432/laboratorio_bienestar';

const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_URL?.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

export const db = drizzle(pool, { schema });
