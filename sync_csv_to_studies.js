/**
 * Add missing studies from the official CSV to studies.json
 * Reads "PRECIOS PARA PROGRAMATILDE.csv" and adds any study not already in studies.json
 */
const fs = require('fs');
const path = require('path');

const csvPath = 'Z:/BIENESTAR/CILAB PRECIOS Y OFERTAS/tilde/PRECIOS PARA PROGRAMATILDE.csv';
const studiesPath = path.join(__dirname, 'src', 'data', 'studies.json');

// Backup first
fs.writeFileSync(studiesPath + '.backup_' + Date.now(), fs.readFileSync(studiesPath, 'utf-8'));

const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const csvLines = csvContent.split('\n').slice(1).filter(l => l.trim());

// Build lookup of existing studies by normalized name
const existingNames = new Set(studies.map(s => s.name.trim().toUpperCase()));

// Get next ID
let maxId = Math.max(...studies.map(s => Number(s.id) || 0));

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 80);
}

let added = 0;
let skipped = 0;

for (const line of csvLines) {
    // Parse CSV: CLAVE, NOMBRE, PRECIO
    const match = line.match(/^\s*([^,]+)\s*,\s*(.+?)\s*,\s*([\d.]+)\s*$/);
    if (!match) {
        // Try alternative parsing
        const parts = line.split(',');
        if (parts.length < 3) continue;
        const clave = parts[0].trim();
        const nombre = parts.slice(1, -1).join(',').trim();
        const precio = parseFloat(parts[parts.length - 1].trim());

        if (!nombre || isNaN(precio)) continue;

        if (existingNames.has(nombre.toUpperCase())) { skipped++; continue; }

        maxId++;
        const slug = slugify(nombre);

        studies.push({
            id: maxId,
            name: nombre,
            slug: slug,
            price: precio,
            category: 'analisis-clinicos',
            subcategoryId: 1,
            preparation: 'Consulte con el laboratorio las indicaciones específicas para este estudio.',
            turnaroundTime: '1-3 días hábiles',
            sampleType: 'Según indicación',
            isActive: true,
            clave: clave,
            description: '',
            whatIsIt: '',
            whatDoesItDetect: [],
            faqs: [],
            benefits: [],
            detailedPreparation: []
        });

        existingNames.add(nombre.toUpperCase());
        added++;
        console.log(`✅ Added [${maxId}]: ${nombre} - $${precio}`);
        continue;
    }

    const [, clave, nombre, precioStr] = match;
    const precio = parseFloat(precioStr);

    if (existingNames.has(nombre.trim().toUpperCase())) { skipped++; continue; }

    maxId++;
    const slug = slugify(nombre.trim());

    studies.push({
        id: maxId,
        name: nombre.trim(),
        slug: slug,
        price: precio,
        category: 'analisis-clinicos',
        subcategoryId: 1,
        preparation: 'Consulte con el laboratorio las indicaciones específicas para este estudio.',
        turnaroundTime: '1-3 días hábiles',
        sampleType: 'Según indicación',
        isActive: true,
        clave: clave.trim(),
        description: '',
        whatIsIt: '',
        whatDoesItDetect: [],
        faqs: [],
        benefits: [],
        detailedPreparation: []
    });

    existingNames.add(nombre.trim().toUpperCase());
    added++;
    console.log(`✅ Added [${maxId}]: ${nombre.trim()} - $${precio}`);
}

// Save
fs.writeFileSync(studiesPath, JSON.stringify(studies, null, 2), 'utf-8');

console.log('\n=== RESUMEN ===');
console.log('CSV total:', csvLines.length);
console.log('Ya existían:', skipped);
console.log('Nuevos agregados:', added);
console.log('Total estudios ahora:', studies.length);
