const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, 'calculators-catalog.json');
const SAFELIST_PATH = path.join(__dirname, 'src', 'app', 'tailwind-safelist.txt');

// Same color mapping from massive generator
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

function main() {
    const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    const classes = new Set();

    for (const spec of catalog) {
        for (const calc of spec.calculators) {
            const colors = SPECIALTY_COLORS[calc.specialty] || SPECIALTY_COLORS['Cardiología'];

            // Extract the generated dynamic classes based on generate-calculators-massive.js string templates
            classes.add(`from-${colors.from}`);
            classes.add(`to-${colors.to}`);
            classes.add(`text-${colors.accent}-200`);
            classes.add(`text-${colors.accent}-100`);
            classes.add(`bg-${colors.accent}-700`);
            classes.add(`hover:bg-${colors.accent}-800`);
            classes.add(`focus:border-${colors.accent}-500`);
            classes.add(`focus:ring-${colors.accent}-100`);

            // Also add generic dynamic styles that might be outputted from the math logic logic results
            const baseColors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'sky', 'indigo', 'zinc', 'neutral', 'stone', 'gray', 'emerald', 'teal', 'cyan', 'rose', 'pink', 'fuchsia'];
            const intensities = ['100', '200', '400', '500', '600', '700', '800', '900'];

            for (let bc of baseColors) {
                for (let i of intensities) {
                    classes.add(`text-${bc}-${i}`);
                    classes.add(`bg-${bc}-${i}`);
                }
            }
        }
    }

    const content = `/* AUTO-GENERATED TAILWIND SAFELIST FOR DYNAMIC JS CLASSES */\n// This file guarantees NextJS compiler picks up all colors\n\nconst safelist = [\n${Array.from(classes)
        .sort()
        .map((c) => `  "${c}",`)
        .join('\n')}\n];\n`;

    fs.writeFileSync(SAFELIST_PATH, content, 'utf8');
    console.log(`✅ Safelist escrita en ${SAFELIST_PATH} con ${classes.size} clases únicas para forzar la compilación.`);
}

main();
