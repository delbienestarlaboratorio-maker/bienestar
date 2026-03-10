/**
 * ═══════════════════════════════════════════════════════════════
 * GENERADOR MASIVO DE CALCULADORAS MÉDICAS
 * Meta: 20 especialidades × 20 calculadoras = 400 herramientas
 * ═══════════════════════════════════════════════════════════════
 * 
 * Uso: node generate-calculators-massive.js [--batch N] [--dry-run]
 * 
 * Lee: calculators-catalog.json
 * Produce: src/app/herramientas/{slug}/page.tsx
 */

const fs = require('fs');
const path = require('path');

// ── Config ──
const CATALOG_PATH = process.argv.length > 2 && !process.argv[2].startsWith('--')
    ? path.join(__dirname, process.argv[2])
    : path.join(__dirname, 'calculators-catalog.json');
const OUTPUT_DIR = path.join(__dirname, 'src', 'app', 'herramientas');
const BATCH_SIZE = parseInt(process.argv.find(a => a.startsWith('--batch='))?.split('=')[1] || '999');
const DRY_RUN = process.argv.includes('--dry-run');

// ── Color helpers for specialty gradients ──
const SPECIALTY_COLORS = {
    'Cardiología': { from: 'red-700', to: 'rose-800', accent: 'red' },
    'Endocrinología': { from: 'amber-700', to: 'orange-800', accent: 'amber' },
    'Gastroenterología': { from: 'orange-700', to: 'yellow-800', accent: 'orange' },
    'Nefrología': { from: 'teal-700', to: 'cyan-800', accent: 'teal' },
    'Neumología': { from: 'sky-700', to: 'blue-800', accent: 'sky' },
    'Neurología': { from: 'indigo-700', to: 'violet-800', accent: 'indigo' },
    'Hematología': { from: 'rose-700', to: 'red-800', accent: 'rose' },
    'Oncología': { from: 'purple-700', to: 'fuchsia-800', accent: 'purple' },
    'Reumatología': { from: 'blue-700', to: 'indigo-800', accent: 'blue' },
    'Dermatología': { from: 'pink-600', to: 'rose-700', accent: 'pink' },
    'Ginecología': { from: 'pink-700', to: 'fuchsia-800', accent: 'pink' },
    'Urología': { from: 'indigo-700', to: 'blue-800', accent: 'indigo' },
    'Psiquiatría': { from: 'violet-700', to: 'purple-800', accent: 'violet' },
    'Geriatría': { from: 'amber-700', to: 'yellow-800', accent: 'amber' },
    'Pediatría': { from: 'emerald-600', to: 'teal-700', accent: 'emerald' },
    'Infectología': { from: 'red-600', to: 'orange-700', accent: 'red' },
    'Toxicología': { from: 'lime-700', to: 'green-800', accent: 'lime' },
    'Traumatología': { from: 'stone-700', to: 'gray-800', accent: 'stone' },
    'Oftalmología y Optometría': { from: 'cyan-700', to: 'teal-800', accent: 'cyan' },
    'Otorrinolaringología': { from: 'slate-700', to: 'gray-800', accent: 'slate' },
    'Cirugía': { from: 'gray-700', to: 'slate-800', accent: 'gray' },
    'Radiología y Rayos X': { from: 'zinc-700', to: 'neutral-800', accent: 'zinc' },
    'Ultrasonografía y Ecos': { from: 'cyan-600', to: 'blue-700', accent: 'sky' },
    'Química Clínica y Laboratorio': { from: 'indigo-800', to: 'blue-900', accent: 'indigo' },
    'Biología y Microbiología': { from: 'emerald-700', to: 'green-800', accent: 'emerald' },
    'Patología e Histología': { from: 'purple-800', to: 'fuchsia-900', accent: 'purple' },
    'Medicina Deportiva': { from: 'green-600', to: 'emerald-700', accent: 'green' },
    'Virales y Curiosidades': { from: 'fuchsia-600', to: 'pink-700', accent: 'fuchsia' },
};

/**
 * Generate a complete page.tsx for a calculator entry
 */
function generatePageTSX(calc) {
    const colors = SPECIALTY_COLORS[calc.specialty] || SPECIALTY_COLORS['Cardiología'];
    const inputsCode = generateInputsCode(calc);
    const logicCode = generateLogicCode(calc);
    const resultsCode = generateResultsCode(calc);

    return `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ${toPascalCase(calc.slug)}Page() {
${inputsCode.stateDeclarations}
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
${logicCode}
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-${colors.from} to-${colors.to} py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-${colors.accent}-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">${calc.icon} ${calc.name}</h1>
                    <p className="text-${colors.accent}-100 mt-2">${calc.subtitle}</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{${JSON.stringify(calc.formTitle || 'Ingresa tus datos')}}</h2>
${inputsCode.jsx}

                    <button onClick={calcular} className="w-full bg-${colors.accent}-700 hover:bg-${colors.accent}-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>

${resultsCode}
                </div>

                <StudyCTA
                    title="${calc.ctaTitle || '¿Necesitas confirmar tus resultados?'}"
                    description="${calc.ctaDesc || 'Los estudios de laboratorio confirman lo que las calculadoras sugieren. Cotiza tu estudio ahora.'}"
                    actionText="${calc.ctaAction || 'Cotizar Estudio'}"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20${encodeURIComponent(calc.ctaStudy || calc.name)}"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{${JSON.stringify('📚 ' + (calc.seoTitle || '¿Qué es ' + calc.name + '?'))}}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
${calc.seoContent.map(p => `                        <p dangerouslySetInnerHTML={{ __html: ${JSON.stringify(p)} }} />`).join('\n')}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
`;
}

/**
 * Generate state declarations and JSX for inputs
 */
function generateInputsCode(calc) {
    let stateLines = [];
    let jsxLines = [];

    for (const input of calc.inputs) {
        const varName = toCamelCase(input.id);

        if (input.type === 'number') {
            stateLines.push(`    const [${varName}, set${toPascalCase(input.id)}] = useState<string>('');`);
            jsxLines.push(`
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{${JSON.stringify(input.label + (input.unit ? ' (' + input.unit + ')' : ''))}}</label>
                        <input type="number" value={${varName}} onChange={(e) => set${toPascalCase(input.id)}(e.target.value)} placeholder="${input.placeholder || ''}" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-${SPECIALTY_COLORS[calc.specialty]?.accent || 'blue'}-500 focus:ring-2 focus:ring-${SPECIALTY_COLORS[calc.specialty]?.accent || 'blue'}-100 transition-all" />
                    </div>`);
        } else if (input.type === 'select') {
            stateLines.push(`    const [${varName}, set${toPascalCase(input.id)}] = useState<string>('');`);
            jsxLines.push(`
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{${JSON.stringify(input.label)}}</label>
                        <select value={${varName}} onChange={(e) => set${toPascalCase(input.id)}(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-${SPECIALTY_COLORS[calc.specialty]?.accent || 'blue'}-500 transition-all">
                            <option value="">Seleccionar...</option>
${input.options.map(o => `                            <option value="${o.value}">{${JSON.stringify(o.label)}}</option>`).join('\n')}
                        </select>
                    </div>`);
        } else if (input.type === 'boolean') {
            stateLines.push(`    const [${varName}, set${toPascalCase(input.id)}] = useState<boolean>(false);`);
            jsxLines.push(`
                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="${input.id}" checked={${varName}} onChange={(e) => set${toPascalCase(input.id)}(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="${input.id}" className="text-sm font-bold text-gray-700">{${JSON.stringify(input.label)}}</label>
                    </div>`);
        }
    }

    return {
        stateDeclarations: stateLines.join('\n'),
        jsx: jsxLines.join('\n'),
    };
}

/**
 * Generate the calculation logic
 */
function generateLogicCode(calc) {
    return `        ${calc.logic}`;
}

/**
 * Generate the results display JSX
 */
function generateResultsCode(calc) {
    if (calc.resultType === 'score') {
        return `
                {resultado !== null && (
                    <div className="mt-8">
                        <div className={\`rounded-2xl p-6 text-center mb-6 \${resultado.bg}\`}>
                            <p className="text-sm text-gray-600 mb-1">${calc.resultLabel || 'Resultado'}</p>
                            <p className={\`text-5xl font-black \${resultado.color}\`}>{resultado.value}</p>
                            <p className={\`text-xl font-bold \${resultado.color} mt-1\`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}`;
    }
    return `
                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">${calc.resultLabel || 'Resultado'}</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}`;
}

// ── Utility helpers ──
function toPascalCase(str) {
    return str.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}
function toCamelCase(str) {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// ═══ MAIN ═══
async function main() {
    if (!fs.existsSync(CATALOG_PATH)) {
        console.error('❌ No se encontró calculators-catalog.json. Crear primero.');
        process.exit(1);
    }

    const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    const allCalcs = catalog.flatMap(spec => spec.calculators || []);

    // Overwrite existing ones
    const pending = allCalcs;

    console.log(`\n═══════════════════════════════════════════════`);
    console.log(`  GENERADOR MASIVO DE CALCULADORAS MÉDICAS`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`  Total en catálogo: ${allCalcs.length}`);
    console.log(`  Ya existentes:     ${allCalcs.length - pending.length}`);
    console.log(`  Por generar:       ${pending.length}`);
    console.log(`  Batch size:        ${BATCH_SIZE}`);
    console.log(`  Dry run:           ${DRY_RUN}`);
    console.log(`═══════════════════════════════════════════════\n`);

    const batch = pending.slice(0, BATCH_SIZE);
    let created = 0;

    for (const calc of batch) {
        const dir = path.join(OUTPUT_DIR, calc.slug);
        const filePath = path.join(dir, 'page.tsx');

        try {
            const code = generatePageTSX(calc);

            if (DRY_RUN) {
                console.log(`  [DRY] ${calc.slug} (${calc.specialty})`);
            } else {
                fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(filePath, code, 'utf8');
                console.log(`  ✅ ${calc.slug} (${calc.specialty})`);
            }
            created++;
        } catch (err) {
            console.error(`  ❌ ${calc.slug}: ${err.message}`);
        }
    }

    console.log(`\n✅ Generadas: ${created}/${batch.length}`);

    // Generate the registry entries for herramientas/page.tsx
    if (!DRY_RUN && created > 0) {
        const registryLines = batch.map(c =>
            `    { slug: '${c.slug}', name: '${c.name}', desc: '${c.shortDesc}', icon: '${c.icon}', category: '${c.specialty}', color: 'bg-${SPECIALTY_COLORS[c.specialty]?.accent || 'blue'}-600' },`
        ).join('\n');

        const registryPath = path.join(__dirname, '_new-registry-entries.txt');
        fs.writeFileSync(registryPath, registryLines, 'utf8');
        console.log(`\n📋 Registry entries saved to: _new-registry-entries.txt`);
        console.log(`   Paste these into src/app/herramientas/page.tsx`);
    }
}

main().catch(console.error);
