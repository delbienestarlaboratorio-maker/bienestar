// NO SE PUEDE IMPORTAR DelBienestarAPI directamente en .mjs
// Vamos a hacer las llamadas HTTP manualmente

import pkg from 'pg';
const { Pool } = pkg;
import fetch from 'node-fetch';

// Base de datos local
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

const TILDE_API_URL = 'http://localhost:3001';

async function syncPricesFromTildeBienestar() {
    try {
        console.log('🔄 Conectando con API de Tilde Bienestar en puerto 3001...\n');

        // Verificar si el backend está disponible
        try {
            const healthResponse = await fetch(`${TILDE_API_URL}/api/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });

            if (!healthResponse.ok) {
                throw new Error('Backend no disponible');
            }

            console.log('✅ Backend de Tilde Bienestar disponible\n');
        } catch (error) {
            console.error(`❌ El backend de Tilde Bienestar NO está disponible en ${TILDE_API_URL}`);
            console.log('\n⚠️  Por favor, asegúrate de que el servidor de Tilde Bienestar esté corriendo en el puerto 3001.');
            console.log('   Error:', error.message);
            return;
        }

        console.log('📥 Obteniendo estudios desde Tilde Bienestar...\n');

        // Obtener todos los estudios desde el backend
        const response = await fetch(`${TILDE_API_URL}/api/laboratorio/estudios`);

        if (!response.ok) {
            console.error(`❌ Error al obtener estudios: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();

        if (!data.success || !data.data) {
            console.error('❌ No se pudieron obtener los estudios del backend');
            console.log('Respuesta:', data);
            return;
        }

        const estudiosTilde = data.data;
        console.log(`📊 Total de estudios en Tilde Bienestar: ${estudiosTilde.length}\n`);

        // Mapear estudios por nombre para matching
        const preciosMap = new Map();
        estudiosTilde.forEach(estudio => {
            const nombreLimpio = estudio.nombre.toUpperCase().trim();
            preciosMap.set(nombreLimpio, {
                precio_base: estudio.precio_base,
                nombre_original: estudio.nombre,
                categoria: estudio.categoria
            });
        });

        console.log('🔄 Sincronizando precios con base de datos local...\n');

        let actualizados = 0;
        let noEncontrados = 0;
        const reporteNoEncontrados = [];
        const reporteActualizados = [];

        // Obtener estudios de la base de datos actual
        const result = await pool.query(
            'SELECT id, name, price_regular FROM studies WHERE is_active = true ORDER BY name'
        );

        const estudiosLocal = result.rows;
        console.log(`📋 Total de estudios activos en BD local: ${estudiosLocal.length}\n`);

        // Iniciar transacción
        await pool.query('BEGIN');

        try {
            for (const estudio of estudiosLocal) {
                const nombreNormalizado = estudio.name.toUpperCase().trim();
                const precioInfo = preciosMap.get(nombreNormalizado);

                if (precioInfo && precioInfo.precio_base > 0) {
                    const precioAnterior = parseFloat(estudio.price_regular);
                    const precioNuevo = precioInfo.precio_base;
                    const precioPromo = Math.round(precioInfo.precio_base * 0.9 * 100) / 100; // 10% descuento

                    // Actualizar precio
                    await pool.query(
                        `UPDATE studies 
             SET price_regular = $1,
                 price_promotional = $2,
                 updated_at = NOW()
             WHERE id = $3`,
                        [precioNuevo, precioPromo, estudio.id]
                    );

                    actualizados++;
                    const cambio = ((precioNuevo - precioAnterior) / precioAnterior * 100).toFixed(0);
                    reporteActualizados.push({
                        nombre: estudio.name,
                        anterior: precioAnterior,
                        nuevo: precioNuevo,
                        cambio: cambio
                    });

                    if (actualizados <= 30) {
                        console.log(`✅ ${estudio.name}`);
                        console.log(`   Anterior: $${precioAnterior.toFixed(2)} → Nuevo: $${precioNuevo.toFixed(2)} (${cambio}%)`);
                    }
                } else {
                    noEncontrados++;
                    reporteNoEncontrados.push(estudio.name);
                }
            }

            await pool.query('COMMIT');

            console.log(`\n✅ SINCRONIZACIÓN COMPLETADA!`);
            console.log(`📊 Estudios actualizados: ${actualizados}`);
            console.log(`⚠️  Estudios no encontrados en Tilde: ${noEncontrados}`);
            console.log(`📈 Porcentaje de coincidencia: ${((actualizados / estudiosLocal.length) * 100).toFixed(1)}%`);

            // Guardar reporte completo
            const fs = await import('fs');
            const reporte = `REPORTE DE SINCRONIZACIÓN DE PRECIOS
Fecha: ${new Date().toLocaleString('es-MX')}
Total estudios locales: ${estudiosLocal.length}
Actualizados: ${actualizados}
No encontrados: ${noEncontrados}

=== ESTUDIOS ACTUALIZADOS ===
${reporteActualizados.map(r => `${r.nombre}: $${r.anterior.toFixed(2)} → $${r.nuevo.toFixed(2)} (${r.cambio}%)`).join('\n')}

=== ESTUDIOS NO ENCONTRADOS ===
${reporteNoEncontrados.join('\n')}
`;

            fs.writeFileSync('sync-prices-report.txt', reporte);
            console.log('\n📄 Reporte completo guardado en: sync-prices-report.txt');

        } catch (error) {
            await pool.query('ROLLBACK');
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
