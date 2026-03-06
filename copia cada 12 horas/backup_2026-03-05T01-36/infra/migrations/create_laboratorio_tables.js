const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos Del Bienestar
const dbPath = path.join(__dirname, '..', 'del_bienestar.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Creando tablas de laboratorio en del_bienestar.db...\n');

db.serialize(() => {
    // Tabla: categorias_estudios
    db.run(`
        CREATE TABLE IF NOT EXISTS categorias_estudios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT,
            icono VARCHAR(50),
            orden INTEGER DEFAULT 0,
            activo BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('❌ Error creando categorias_estudios:', err);
        else console.log('✅ Tabla categorias_estudios creada');
    });

    // Tabla: estudios_laboratorio
    db.run(`
        CREATE TABLE IF NOT EXISTS estudios_laboratorio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            categoria_id INTEGER,
            precio_base DECIMAL(10,2) NOT NULL,
            tiempo_entrega VARCHAR(50),
            preparacion TEXT,
            imagen_url VARCHAR(500),
            activo BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (categoria_id) REFERENCES categorias_estudios(id)
        )
    `, (err) => {
        if (err) console.error('❌ Error creando estudios_laboratorio:', err);
        else console.log('✅ Tabla estudios_laboratorio creada');
    });

    // Tabla: sucursales_laboratorio
    db.run(`
        CREATE TABLE IF NOT EXISTS sucursales_laboratorio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            direccion TEXT NOT NULL,
            ciudad VARCHAR(100),
            telefono VARCHAR(20),
            horario_apertura TIME,
            horario_cierre TIME,
            latitud DECIMAL(10,8),
            longitud DECIMAL(11,8),
            activo BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('❌ Error creando sucursales_laboratorio:', err);
        else console.log('✅ Tabla sucursales_laboratorio creada');
    });

    // Tabla: pacientes_laboratorio
    db.run(`
        CREATE TABLE IF NOT EXISTS pacientes_laboratorio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            telefono VARCHAR(20),
            fecha_nacimiento DATE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('❌ Error creando pacientes_laboratorio:', err);
        else console.log('✅ Tabla pacientes_laboratorio creada');
    });

    // Tabla: citas_laboratorio
    db.run(`
        CREATE TABLE IF NOT EXISTS citas_laboratorio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_id INTEGER,
            sucursal_id INTEGER,
            fecha_hora DATETIME NOT NULL,
            estudios_ids TEXT NOT NULL,
            total DECIMAL(10,2) NOT NULL,
            estado VARCHAR(50) DEFAULT 'pendiente',
            pago_id VARCHAR(100),
            confirmacion VARCHAR(50),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (paciente_id) REFERENCES pacientes_laboratorio(id),
            FOREIGN KEY (sucursal_id) REFERENCES sucursales_laboratorio(id)
        )
    `, (err) => {
        if (err) console.error('❌ Error creando citas_laboratorio:', err);
        else console.log('✅ Tabla citas_laboratorio creada');
    });

    // Tabla: precios_historicos_competencia
    db.run(`
        CREATE TABLE IF NOT EXISTS precios_historicos_competencia (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            estudio_nombre VARCHAR(255),
            competidor VARCHAR(100),
            precio DECIMAL(10,2),
            fecha_scraping DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('❌ Error creando precios_historicos_competencia:', err);
        else console.log('✅ Tabla precios_historicos_competencia creada');
    });

    // Insertar categorías por defecto
    setTimeout(() => {
        const categorias = [
            ['Check-ups', 'Estudios de revisión general', '🩺', 1],
            ['Análisis Clínicos', 'Estudios de sangre y orina', '🔬', 2],
            ['Para Ella', 'Estudios específicos para mujeres', '👩‍⚕️', 3],
            ['Para Él', 'Estudios específicos para hombres', '👨‍⚕️', 4],
            ['Hormonal', 'Estudios de hormonas', '⚗️', 5],
            ['Imagenología', 'Ultrasonidos y rayos X', '📷', 6]
        ];

        const stmt = db.prepare(`
            INSERT OR IGNORE INTO categorias_estudios (nombre, descripcion, icono, orden)
            VALUES (?, ?, ?, ?)
        `);

        categorias.forEach(cat => {
            stmt.run(cat, (err) => {
                if (err) console.error(`❌ Error insertando categoría ${cat[0]}:`, err);
            });
        });

        stmt.finalize(() => {
            console.log('\n✅ Categorías por defecto insertadas');

            // Insertar estudios de ejemplo
            insertEstudiosEjemplo();
        });
    }, 500);
});

function insertEstudiosEjemplo() {
    const estudios = [
        ['Química Sanguínea 45 Elementos', 'Análisis completo para evaluar estado metabólico, función hepática y renal', 1, 850, '24 horas', 'Ayuno de 8 horas', '/images/quimica-45.jpg'],
        ['Biometría Hemática Completa', 'Conteo sanguíneo completo para detectar anemia, infecciones y leucemia', 2, 150, '4 horas', 'No requiere ayuno', '/images/biometria.jpg'],
        ['Perfil Tiroideo Completo', 'Evaluación funcional de la glándula tiroides (TSH, T3, T4)', 5, 680, '48 horas', 'Ayuno de 4 horas', '/images/tiroides.jpg'],
        ['Examen General de Orina', 'Análisis físico, químico y microscópico de orina', 2, 120, '2 horas', 'Primera orina de la mañana', '/images/orina.jpg'],
        ['Perfil Lipídico', 'Medición de colesterol y triglicéridos', 1, 280, '24 horas', 'Ayuno de 12 horas', '/images/lipidos.jpg']
    ];

    const stmt = db.prepare(`
        INSERT OR IGNORE INTO estudios_laboratorio 
        (nombre, descripcion, categoria_id, precio_base, tiempo_entrega, preparacion, imagen_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    estudios.forEach(est => {
        stmt.run(est, (err) => {
            if (err) console.error(`❌ Error insertando estudio ${est[0]}:`, err);
        });
    });

    stmt.finalize(() => {
        console.log('✅ Estudios de ejemplo insertados');

        // Insertar sucursales de ejemplo
        insertSucursalesEjemplo();
    });
}

function insertSucursalesEjemplo() {
    const sucursales = [
        ['Sucursal Centro', 'Av. Juárez 123, Centro Histórico', 'CDMX', '5512345678', '07:00', '20:00', 19.4326, -99.1332],
        ['Sucursal Polanco', 'Av. Presidente Masaryk 456', 'CDMX', '5512345679', '08:00', '19:00', 19.4363, -99.1942],
        ['Sucursal Santa Fe', 'Centro Comercial Santa Fe, Local 234', 'CDMX', '5512345680', '09:00', '21:00', 19.3598, -99.2598]
    ];

    const stmt = db.prepare(`
        INSERT OR IGNORE INTO sucursales_laboratorio 
        (nombre, direccion, ciudad, telefono, horario_apertura, horario_cierre, latitud, longitud)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    sucursales.forEach(suc => {
        stmt.run(suc, (err) => {
            if (err) console.error(`❌ Error insertando sucursal ${suc[0]}:`, err);
        });
    });

    stmt.finalize(() => {
        console.log('✅ Sucursales de ejemplo insertadas');
        console.log('\n🎉 ¡Migración completada exitosamente!');
        console.log('\n📊 Resumen:');
        console.log('   - 6 tablas creadas');
        console.log('   - 6 categorías insertadas');
        console.log('   - 5 estudios de ejemplo insertados');
        console.log('   - 3 sucursales insertadas');
        console.log('\n💡 Próximo paso: Ejecutar migrate_scraper_data.js');

        db.close();
    });
}
