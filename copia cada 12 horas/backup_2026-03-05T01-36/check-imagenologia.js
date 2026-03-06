import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { studies } from './src/db/schema.js';
import { sql } from 'drizzle-orm';

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'laboratorio_bienestar',
    port: 5432,
});

const db = drizzle(pool);

async function getImagenologiaStudies() {
    // Buscar estudios que contengan palabras clave de imagenología
    const keywords = ['RX ', 'RAYOS', 'RADIOLOG', 'TAC ', 'TOMOGRAF', 'ULTRASON', 'MASTOGRAF', 'DENSITOMETR', 'RESONANCIA', 'ANGIOTOMOGRAF', 'DOPPLER'];

    for (const keyword of keywords) {
        console.log(`\n=== Estudios con "${keyword}" ===\n`);
        const result = await db.execute(
            sql`SELECT id, name, category FROM studies WHERE UPPER(name) LIKE ${`%${keyword}%`} ORDER BY name LIMIT 100`
        );

        if (result.rows && result.rows.length > 0) {
            result.rows.forEach(row => {
                console.log(`${row.id}. ${row.name} [${row.category}]`);
            });
        } else {
            console.log('(ninguno encontrado)');
        }
    }

    await pool.end();
}

getImagenologiaStudies();
