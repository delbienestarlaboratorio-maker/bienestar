// Script para inspeccionar la base de datos SQLite
import Database from 'better-sqlite3';

const SQLITE_DB_PATH = 'd:\\Paginas_web\\pagina\\del_bienestar.db';

try {
    const db = new Database(SQLITE_DB_PATH, { readonly: true });

    console.log('✅ Conectado a SQLite\n');

    // Obtener todas las tablas
    const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name
  `).all();

    console.log('📋 TABLAS ENCONTRADAS:\n');
    tables.forEach(table => {
        console.log(`  - ${table.name}`);
    });

    console.log('\n🔍 Buscando tablas relacionadas con estudios/precios...\n');

    const relevantTables = tables.filter(t =>
        t.name.toLowerCase().includes('estud') ||
        t.name.toLowerCase().includes('precio') ||
        t.name.toLowerCase().includes('lista') ||
        t.name.toLowerCase().includes('lab')
    );

    relevantTables.forEach(table => {
        console.log(`\n📊 Estructura de: ${table.name}`);
        const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();
        columns.forEach(col => {
            console.log(`   ${col.name} (${col.type})`);
        });

        // Mostrar 3 registros de ejemplo
        const sample = db.prepare(`SELECT * FROM ${table.name} LIMIT 3`).all();
        if (sample.length > 0) {
            console.log(`\n   Ejemplo de datos:`);
            console.log(JSON.stringify(sample[0], null, 2));
        }
    });

    db.close();

} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
}
