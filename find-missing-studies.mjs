// Script para encontrar estudios en SQLite que NO están en la página web
import Database from 'better-sqlite3';
import pkg from 'pg';
const { Pool } = pkg;

const SQLITE_DB_PATH = 'D:\\Paginas_web\\pagina\\2026\\del_bienestar_backup_1768629790832.db';

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

async function findMissingStudies() {
    try {
        console.log('\n🔍 Buscando estudios en SQLite que NO están en la página web...\n');

        // Conectar a SQLite
        const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
        console.log('✅ Conectado a SQLite (Tilde Bienestar)\n');

        // Obtener todos los estudios de SQLite
        const sqliteStudies = sqlite.prepare(`
      SELECT 
        nombre_prueba,
        clave,
        precio_con_iva,
        precio_sin_iva,
        estado
      FROM lista_precios
      WHERE estado = 'Activo'
      ORDER BY precio_con_iva DESC
    `).all();

        console.log(`📊 Estudios en SQLite: ${sqliteStudies.length}\n`);

        // Obtener todos los estudios de PostgreSQL
        const pgResult = await pool.query(`
      SELECT name
      FROM studies
      WHERE is_active = true
    `);

        console.log(`📋 Estudios en PostgreSQL: ${pgResult.rows.length}\n`);

        // Crear set de nombres de PostgreSQL (normalizados)
        const pgNames = new Set();
        pgResult.rows.forEach(row => {
            pgNames.add(row.name.toUpperCase().trim());
        });

        // Encontrar estudios en SQLite que NO están en PostgreSQL
        const missing = [];
        sqliteStudies.forEach(study => {
            const nombreNormalizado = study.nombre_prueba.toUpperCase().trim();
            if (!pgNames.has(nombreNormalizado)) {
                missing.push({
                    nombre: study.nombre_prueba,
                    clave: study.clave,
                    precio: study.precio_con_iva
                });
            }
        });

        console.log(`\n⚠️  ESTUDIOS EN TILDE BIENESTAR QUE NO ESTÁN EN LA PÁGINA WEB: ${missing.length}\n`);

        if (missing.length > 0) {
            console.log('📋 TOP 30 ESTUDIOS FALTANTES (por precio):\n');

            missing
                .sort((a, b) => b.precio - a.precio)
                .slice(0, 30)
                .forEach((study, index) => {
                    console.log(`${index + 1}. ${study.nombre}`);
                    console.log(`   💰 Precio: $${study.precio.toFixed(2)} MXN`);
                    console.log(`   🔑 Clave: ${study.clave || 'N/A'}`);
                    console.log('');
                });

            // Estadísticas por rango de precio
            const rangos = {
                'Menos de $100': 0,
                '$100 - $300': 0,
                '$300 - $500': 0,
                '$500 - $1,000': 0,
                '$1,000 - $2,000': 0,
                'Más de $2,000': 0
            };

            missing.forEach(s => {
                const p = s.precio;
                if (p < 100) rangos['Menos de $100']++;
                else if (p < 300) rangos['$100 - $300']++;
                else if (p < 500) rangos['$300 - $500']++;
                else if (p < 1000) rangos['$500 - $1,000']++;
                else if (p < 2000) rangos['$1,000 - $2,000']++;
                else rangos['Más de $2,000']++;
            });

            console.log('\n📊 DISTRIBUCIÓN POR PRECIO:\n');
            Object.entries(rangos).forEach(([rango, count]) => {
                console.log(`   ${rango}: ${count} estudios`);
            });

            // Valor total no capturado
            const totalValue = missing.reduce((sum, s) => sum + s.precio, 0);
            const avgPrice = totalValue / missing.length;

            console.log('\n💰 ANÁLISIS ECONÓMICO:\n');
            console.log(`   Valor total de estudios faltantes: $${totalValue.toFixed(2)} MXN`);
            console.log(`   Precio promedio: $${avgPrice.toFixed(2)} MXN`);
            console.log(`   Precio más alto: $${missing[0].precio.toFixed(2)} MXN`);
            console.log(`   Precio más bajo: $${missing[missing.length - 1].precio.toFixed(2)} MXN`);

            // Guardar lista completa
            const fs = await import('fs');
            const lista = missing.map(s => `${s.nombre}\t$${s.precio.toFixed(2)}\t${s.clave || 'N/A'}`).join('\n');
            const reporte = `ESTUDIOS EN TILDE BIENESTAR QUE NO ESTÁN EN LA PÁGINA WEB
Total: ${missing.length} estudios
Fecha: ${new Date().toLocaleString('es-MX')}

LISTA COMPLETA (ordenada por precio):

Nombre\tPrecio\tClave
${lista}
`;

            const filename = `missing-studies-${Date.now()}.txt`;
            fs.writeFileSync(filename, reporte);
            console.log(`\n📄 Lista completa guardada en: ${filename}`);
        }

        sqlite.close();
        await pool.end();

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    }
}

findMissingStudies();
