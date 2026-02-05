import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Configuración de conexión PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/laboratorio_bienestar';

const pool = new Pool({
    connectionString,
    // Configuración adicional para producción
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });
