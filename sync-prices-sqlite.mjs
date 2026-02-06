// Script para sincronizar precios desde SQLite (Tilde Bienestar) a PostgreSQL (Neon)
import Database from 'better-sqlite3';
import pkg from 'pg';
const { Pool } = pkg;

// Base de datos SQLite (Sistema Tilde Bienestar) - usando backup del 16/01/2026
const SQLITE_DB_PATH = 'D:\\Paginas_web\\pagina\\2026\\del_bienestar_backup_1768629790832.db';

// Base de datos PostgreSQL LOCAL
const LOCAL_POOL = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

// Base de datos PostgreSQL PRODUCTION (Neon)
const PRODUCTION_POOL = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

async function syncPricesFromSQLite(targetEnvironment = 'local') {
    const db = targetEnvironment === 'local' ? LOCAL_POOL : PRODUCTION_POOL;

    console.log(`\n🔄 Sincronizando precios desde Tilde Bienestar a ${targetEnvironment.toUpperCase()}...\n`);

    try {
        // Conectar a SQLite
        const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
        console.log('✅ Conectado a SQLite (Tilde Bienestar)\n');

        // Obtener todos los estudios con precios desde SQLite
        const sqliteStudies = sqlite.prepare(`
      SELECT 
        nombre_prueba,
        clave,
        precio_con_iva,
        precio_sin_iva
      FROM lista_precios
      WHERE estado = 'Activo'
      ORDER BY nombre_prueba
    `).all();

        console.log(`📊 Estudios encontrados en SQLite: ${sqliteStudies.length}\n`);

        // Crear mapa de precios por nombre normalizado
        const preciosMap = new Map();
        sqliteStudies.forEach(study => {
            const nombreNormalizado = study.nombre_prueba.toUpperCase().trim();
            preciosMap.set(nombreNormalizado, {
                nombre_original: study.nombre_prueba,
                clave: study.clave,
                precio_con_iva: study.precio_con_iva,
                precio_sin_iva: study.precio_sin_iva
            });
        });

        // Obtener estudios de PostgreSQL
        const pgResult = await db.query(`
      SELECT id, name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true
      ORDER BY name
    `);

        console.log(`📋 Estudios activos en PostgreSQL: ${pgResult.rows.length}\n`);

        // Iniciar transacción
        await db.query('BEGIN');

        let actualizados = 0;
        let noEncontrados = 0;
        let cambiosRealizados = [];

        console.log('🔄 Actualizando precios...\n');

        for (const estudio of pgResult.rows) {
            const nombreNormalizado = estudio.name.toUpperCase().trim();
            const precioInfo = preciosMap.get(nombreNormalizado);

            if (precioInfo && precioInfo.precio_con_iva > 0) {
                const precioAnterior = parseFloat(estudio.price_regular);
                const precioNuevo = precioInfo.precio_con_iva;
                const precioPromo = Math.round(precioNuevo * 0.9 * 100) / 100; // 10% descuento

                // Solo actualizar si el precio cambió
                if (Math.abs(precioAnterior - precioNuevo) > 0.01) {
                    await db.query(`
            UPDATE studies
            SET price_regular = $1,
                price_promotional = $2,
                updated_at = NOW()
            WHERE id = $3
          `, [precioNuevo, precioPromo, estudio.id]);

                    actualizados++;
                    const cambio = ((precioNuevo - precioAnterior) / precioAnterior * 100).toFixed(1);

                    cambiosRealizados.push({
                        nombre: estudio.name,
                        anterior: precioAnterior,
                        nuevo: precioNuevo,
                        cambio: cambio
                    });

                    if (actualizados <= 20) {
                        console.log(`✅ ${estudio.name}`);
                        console.log(`   $${precioAnterior.toFixed(2)} → $${precioNuevo.toFixed(2)} (${cambio > 0 ? '+' : ''}${cambio}%)`);
                    }
                }
            } else {
                noEncontrados++;
            }
        }

        await db.query('COMMIT');

        console.log(`\n✅ SINCRONIZACIÓN COMPLETADA!`);
        console.log(`📊 Estudios actualizados: ${actualizados}`);
        console.log(`⚠️  Estudios no encontrados en SQLite: ${noEncontrados}`);
        console.log(`📈 Porcentaje sincronizado: ${((actualizados / pgResult.rows.length) * 100).toFixed(1)}%`);

        // Guardar reporte
        const fs = await import('fs');
        const reporte = `REPORTE DE SINCRONIZACIÓN DE PRECIOS
Ambiente: ${targetEnvironment.toUpperCase()}
Fecha: ${new Date().toLocaleString('es-MX')}
Origen: SQLite (Tilde Bienestar)
Destino: PostgreSQL (${targetEnvironment === 'local' ? 'Local' : 'Neon Production'})

ESTADÍSTICAS:
- Estudios en SQLite: ${sqliteStudies.length}
- Estudios en PostgreSQL: ${pgResult.rows.length}
- Actualizados: ${actualizados}
- No encontrados: ${noEncontrados}
- Porcentaje: ${((actualizados / pgResult.rows.length) * 100).toFixed(1)}%

CAMBIOS REALIZADOS (${cambiosRealizados.length}):
${cambiosRealizados.map(c =>
            `${c.nombre}: $${c.anterior.toFixed(2)} → $${c.nuevo.toFixed(2)} (${c.cambio > 0 ? '+' : ''}${c.cambio}%)`
        ).join('\n')}
`;

        const filename = `price-sync-${targetEnvironment}-${Date.now()}.txt`;
        fs.writeFileSync(filename, reporte);
        console.log(`\n📄 Reporte guardado: ${filename}`);

        sqlite.close();

    } catch (error) {
        await db.query('ROLLBACK');
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await db.end();
    }
}

// Ejecutar
const environment = process.argv[2] || 'local';
if (!['local', 'production'].includes(environment)) {
    console.error('❌ Uso: node sync-prices-sqlite.mjs [local|production]');
    process.exit(1);
}

console.log(`\n⚠️  Sincronizando a: ${environment.toUpperCase()}`);
if (environment === 'production') {
    console.log('⚠️  ADVERTENCIA: Esto actualizará la base de datos de PRODUCCIÓN en Neon');
}

syncPricesFromSQLite(environment);
