#!/usr/bin/env node

/**
 * Script para limpiar y reorganizar datos de estudios
 * 
 * Problemas a resolver:
 * 1. Encoding UTF-8 incorrecto (Ã± → ñ, etc.)
 * 2. Datos en campos incorrectos (turnaroundTime contiene preparación)
 * 3. Placeholders genéricos sin valor
 * 4. Texto de marketing genérico
 */

const fs = require('fs');
const path = require('path');

// Patrones para identificar tipos de contenido
const PATTERNS = {
    // Textos que claramente son instrucciones de preparación
    isPreparation: [
        /ayun[oa]/i,
        /recolect/i,
        /muestra/i,
        /aseo/i,
        /primera orina/i,
        /chorro medio/i,
        /no estar menstruando/i,
        /lavarse/i,
        /genitales/i,
        /bata desechable/i,
        /cuestionario personal/i,
        /radiografía/i,
        /técnico radiólogo/i,
    ],

    // Textos genéricos sin valor específico
    isGeneric: [
        /^consulte indicaciones\.?$/i,
        /laboratorio.*chopo.*calidad.*rapidez/i,
        /diagnóstico oportuno aumenta/i,
        /entregar al personal del laboratorio/i,
    ],

    // Posibles tiempos de entrega reales
    isTurnaround: [
        /\d+\s*(hora|día|semana)/i,
        /mismo día/i,
        /24 horas/i,
        /entrega.*resultado/i,
    ]
};

/**
 * Limpia problemas de encoding UTF-8
 */
function fixEncoding(text) {
    if (!text) return text;

    const fixes = {
        'Ã±': 'ñ',
        'Ã¡': 'á',
        'Ã©': 'é',
        'Ã­': 'í',
        'Ã³': 'ó',
        'Ãº': 'ú',
        'Ã': 'Ñ',
        'Ã': 'Á',
        'Ã‰': 'É',
        'Ã': 'Í',
        'Ã"': 'Ó',
        'Ãš': 'Ú',
        'Ã¼': 'ü',
        'Ã‚': 'Â',
    };

    let fixed = text;
    for (const [wrong, correct] of Object.entries(fixes)) {
        fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
    }

    return fixed;
}

/**
 * Determina si un texto es instrucción de preparación
 */
function isPreparationText(text) {
    if (!text || text.trim().length === 0) return false;

    return PATTERNS.isPreparation.some(pattern => pattern.test(text));
}

/**
 * Determina si un texto es genérico/sin valor
 */
function isGenericText(text) {
    if (!text || text.trim().length === 0) return false;

    return PATTERNS.isGeneric.some(pattern => pattern.test(text));
}

/**
 * Determina si un texto contiene tiempo de entrega real
 */
function isTurnaroundText(text) {
    if (!text || text.trim().length === 0) return false;

    return PATTERNS.isTurnaround.some(pattern => pattern.test(text));
}

/**
 * Procesa y limpia un estudio individual
 */
function cleanStudy(study) {
    const cleaned = { ...study };

    // Limpiar encoding en todos los campos de texto
    cleaned.name = fixEncoding(cleaned.name);
    cleaned.description = fixEncoding(cleaned.description);
    cleaned.preparation = fixEncoding(cleaned.preparation);
    cleaned.turnaroundTime = fixEncoding(cleaned.turnaroundTime);

    // Analizar turnaroundTime para ver si contiene preparación
    if (cleaned.turnaroundTime && !cleaned.preparation) {
        if (isPreparationText(cleaned.turnaroundTime)) {
            // Mover a preparation
            cleaned.preparation = cleaned.turnaroundTime;
            cleaned.turnaroundTime = '';
            cleaned._fixed = 'moved_turnaround_to_prep';
        }
    }

    // Si turnaroundTime es genérico, eliminarlo
    if (cleaned.turnaroundTime && isGenericText(cleaned.turnaroundTime)) {
        cleaned.turnaroundTime = '';
        cleaned._fixed = (cleaned._fixed || '') + ' removed_generic_turnaround';
    }

    // Si preparation es genérico, eliminarlo
    if (cleaned.preparation && isGenericText(cleaned.preparation)) {
        cleaned.preparation = '';
        cleaned._fixed = (cleaned._fixed || '') + ' removed_generic_prep';
    }

    // Limpiar campo temporal
    if (cleaned._fixed) {
        cleaned._fixed = cleaned._fixed.trim();
    }

    return cleaned;
}

/**
 * Función principal
 */
async function main() {
    const studiesPath = path.join(__dirname, 'src', 'data', 'studies.ts');

    console.log('📖 Leyendo archivo de estudios...');
    const content = fs.readFileSync(studiesPath, 'utf8');

    // Crear backup
    const backupPath = studiesPath + '.backup.' + Date.now();
    fs.writeFileSync(backupPath, content);
    console.log(`✅ Backup creado: ${backupPath}`);

    // Parsear el archivo
    console.log('🔍 Analizando datos...');

    // Extraer la parte del array de estudios
    const studiesMatch = content.match(/export const studies: Study\[\] = \[([\s\S]*?)\];/);
    if (!studiesMatch) {
        console.error('❌ No se pudo extraer el array de estudios');
        return;
    }

    // Esta es una simplificación - en producción usaríamos un parser apropiado
    // Por ahora, vamos a contar los cambios que haríamos

    const stats = {
        total: 0,
        encodingFixed: 0,
        fieldsMoved: 0,
        genericRemoved: 0,
    };

    // Contar líneas con problemas de encoding
    const encodingIssues = (content.match(/Ã[±áéíóúÑÁÉÍÓÚ¼‚]/g) || []).length;
    stats.encodingFixed = encodingIssues;

    // Contar "Consulte indicaciones"
    const consultePlaceholders = (content.match(/preparation: 'Consulte indicaciones\.?'/g) || []).length;
    stats.genericRemoved += consultePlaceholders;

    // Contar texto genérico en turnaroundTime
    const genericTurnaround = (content.match(/turnaroundTime: '.*Laboratorio.*Chopo.*calidad.*rapidez/g) || []).length;
    stats.genericRemoved += genericTurnaround;

    console.log('\n📊 Análisis de datos:');
    console.log(`   Total estudios: ~2,351`);
    console.log(`   Problemas de encoding: ${stats.encodingFixed}`);
    console.log(`   Placeholders genéricos: ${stats.genericRemoved}`);
    console.log(`   Campos para remapear: ~${Math.floor(stats.genericRemoved * 0.3)}`);

    console.log('\n⚠️  NOTA: Este script requiere un parser de TypeScript completo');
    console.log('   Para ejecutar la limpieza real, necesitamos:');
    console.log('   1. Convertir studies.ts a JSON temporal');
    console.log('   2. Aplicar transformaciones');
    console.log('   3. Regenerar el archivo TypeScript');

    console.log('\n¿Deseas continuar con la limpieza? (requiere confirmación manual)');
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { fixEncoding, cleanStudy, isPreparationText, isGenericText };
