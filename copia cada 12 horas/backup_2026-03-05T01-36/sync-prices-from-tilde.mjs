import { delBienestarAPI } from '../src/services/DelBienestarAPI';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

// Base de datos local
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

const db = drizzle(pool);

async function syncPricesFromTildeBienestar() {
    try {
        console.log('🔄 Conectando con API de Tilde Bienestar...\n');

        // Verificar si el backend está disponible
        const isHealthy = await delBienestarAPI.checkHealth();
        if (!isHealthy) {
            console.error('❌ El backend de Tilde Bienestar NO está disponible en http://localhost:3000');
            console.log('\n⚠️  Por favor, asegúrate de que el servidor de Tilde Bienestar esté corriendo.');
            console.log('   Comando para iniciar: npm run dev (en el proyecto tilde-bienestar)');
            return;
        }

        console.log('✅ Backend de Tilde Bienestar disponible\n');
        console.log('📥 Obteniendo estudios desde Tilde Bienestar...\n');

        // Obtener todos los estudios desde el backend
        const response = await delBienestarAPI.getEstudios();

        if (!response.success || !response.data) {
            console.error('❌ No se pudieron obtener los estudios del backend');
            return;
        }

        const estudiosTilde = response.data;
        console.log(`📊 Total de estudios en Tilde Bienestar: ${estudiosTilde.length}\n`);

        // Mapear estudios por nombre para matching
        const preciosMap = new Map();
        estudiosTilde.forEach(estudio => {
            preciosMap.set(estudio.nombre.toUpperCase().trim(), {
                precio_base: estudio.precio_base,
                nombre_original: estudio.nombre
            });
        });

        console.log('🔄 Sincronizando precios con base de datos local...\n');

        let actualizados = 0;
        let noEncontrados = 0;
        const reporteNoEncontrados = [];

        // Obtener estudios de la base de datos actual
        const estudiosLocal = await db.execute(
            sql`SELECT id, name FROM studies WHERE is_active = true`
        );

        // Usar transacción
        await db.execute(sql`BEGIN`);

        try {
            for (const estudio of estudiosLocal.rows) {
                const nombreNormalizado = estudio.name.toUpperCase().trim();
                const precioInfo = preciosMap.get(nombreNormalizado);

                if (precioInfo) {
                    // Actualizar precio
                    await db.execute(
                        sql`UPDATE studies 
             SET price_regular = ${precioInfo.precio_base},
                 price_promotional = ${precioInfo.precio_base * 0.7},
                 updated_at = NOW()
             WHERE id = ${estudio.id}`
                    );
                    actualizados++;
                    console.log(`✅ ${estudio.name}: $${precioInfo.precio_base}`);
                } else {
                    noEncontrados++;
                    reporteNoEncontrados.push(estudio.name);
                }
            }

            await db.execute(sql`COMMIT`);

            console.log(`\n✅ SINCRONIZACIÓN COMPLETADA!`);
            console.log(`📊 Estudios actualizados: ${actualizados}`);
            console.log(`⚠️  Estudios no encontrados en Tilde: ${noEncontrados}`);

            if (reporteNoEncontrados.length > 0 && reporteNoEncontrados.length <= 20) {
                console.log('\n📝 Estudios no encontrados:');
                reporteNoEncontrados.forEach(nombre => {
                    console.log(`   - ${nombre}`);
                });
            } else if (reporteNoEncontrados.length > 20) {
                console.log(`\n📝 Hay ${reporteNoEncontrados.length} estudios no encontrados.`);
                console.log('   Ver archivo sync-report.txt para el listado completo.');

                // Guardar reporte
                const fs = await import('fs');
                fs.writeFileSync('sync-report.txt', reporteNoEncontrados.join('\n'));
            }

        } catch (error) {
            await db.execute(sql`ROLLBACK`);
            throw error;
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

// Ejecutar sincronización
syncPricesFromTildeBienestar();
