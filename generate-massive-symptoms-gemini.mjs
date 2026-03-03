import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules since we might run via tsx or node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY no está configurada en .env.local');
    process.exit(1);
}

// Inicializar la API de Gemini (Usamos 1.5-flash por su excelente manejo de JSON y velocidad masiva)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // Aseguramos formato JSON para evitar que invente markdown
    generationConfig: {
        temperature: 0.1, // Baja temperatura para precisión clínica
        responseMimeType: "application/json",
    }
});

const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-massive.json');

// El mismo esquema estricto validado
const schemaExample = {
    "slug": "dolor-abdominal",
    "name": "Dolor Abdominal",
    "medicalName": "Dolor Abdominal Agudo / Crónico",
    "cie10": "R10",
    "intro": "Párrafo de introducción SEO médico estricto de unas 80 a 150 palabras explicándolo clínicamente pero entendible.",
    "causes": [
        { "name": "Causa 1", "desc": "Descripción detallada de la causa 1." },
        { "name": "Causa 2", "desc": "Descripción detallada de la causa 2." }
    ],
    "redFlags": [
        "Bandera roja 1 grave (cuándo ir a urgencias)"
    ],
    "tests": [
        { "name": "Nombre de Prueba Clínica Recomendada", "url": "/estudios/analisis-clinicos/biometria-hematica" }
    ],
    "tools": [
        { "name": "Título de Relacionado", "url": "/busqueda" }
    ]
};

// 20 Especialidades Médicas para abarcar todo el cuerpo humano
const specialties = [
    'Medicina General y Urgencias', 'Cardiología', 'Gastroenterología',
    'Neurología', 'Dermatología', 'Pediatría y Neonatología',
    'Endocrinología y Metabolismo', 'Neumología y Vías Respiratorias',
    'Reumatología', 'Infectología y Enfermedades Tropicales',
    'Nefrología (Riñones)', 'Urología', 'Ginecología y Obstetricia',
    'Oftalmología', 'Otorrinolaringología (Oídos, Nariz y Garganta)',
    'Hematología (Sangre)', 'Oncología', 'Psiquiatría y Salud Mental',
    'Traumatología y Ortopedia', 'Cirugía General y Proctología'
];

async function generateSeedListForSpecialty(specialty) {
    console.log(`\n🧠 Pidiendo a Gemini 50 síntomas/padecimientos para la especialidad: ${specialty}...`);
    try {
        const prompt = `
Eres un Director Médico Universitario.
Tu tarea es listar 50 síntomas clínicos, síndromes o padecimientos muy comunes de la especialidad de ${specialty}.
Deben ser términos que los pacientes busquen frecuentemente en Google (ej. "Dolor de pecho", "Reflujo", "Sarpullido").
Devuelve ÚNICAMENTE un arreglo JSON plano de strings. Nada más.
Ejemplo de formato: ["Dolor de pecho", "Palpitaciones", "Hipertensión", "Soplo Cardíaco"]
        `;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const lista = JSON.parse(text);
        return Array.isArray(lista) ? lista : [];
    } catch (e) {
        console.error(`❌ Error generando semillas para ${specialty}:`, e.message);
        return [];
    }
}

async function generateClinicalDetailForSymptom(symptomName) {
    const prompt = `
Eres un editor médico experto y director clínico riguroso escribiendo para un importante Laboratorio Clínico y Clínica Mayo.
Tu tarea es generar la documentación clínica estructurada para el siguiente padecimiento o síntoma: "${symptomName}".

REGLAS ESTRICTAS:
1. Retorna ÚNICAMENTE un objeto JSON válido acorde al esquema.
2. Sigue EXACTAMENTE esta estructura y llaves:
${JSON.stringify(schemaExample, null, 2)}

3. "slug": el nombre del síntoma en minúsculas, sin acentos y separado por guiones (ej. dolor-cabeza).
4. "cie10": código CIE-10 (o CIE-11) real para este padecimiento (ej. R51).
5. En "tests" inventa URLs lógicas que comiencen exactamente con "/estudios/analisis-clinicos/" o "/estudios/imagenologia/" o "/estudios/checkups/" con pruebas de sangre, imagen u orina reales relacionadas.
6. En "tools" usa URLs que comiencen con "/herramientas/" inventando herramientas relacionadas (ej. /herramientas/riesgo-cardiovascular).
7. Las "redFlags" deben ser claras advertencias vitales donde el paciente debe ir a Urgencias Médicas.
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonData = JSON.parse(text);
        return jsonData;
    } catch (e) {
        console.error(`❌ Error clínico generando [${symptomName}]:`, e.message);
        return null; // Devolvemos null si falla para saltarlo
    }
}

async function runMassivePipeline() {
    let massiveDB = [];

    // Cargar si ya existe
    if (fs.existsSync(dbPath)) {
        try {
            massiveDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            console.log(`📂 Base de datos cargada. Contiene ${massiveDB.length} padecimientos actuales.`);
        } catch (e) { }
    }

    let newlyGenerated = 0;

    for (const specialty of specialties) {
        console.log(`\n=============================================================`);
        console.log(`🏥 INICIANDO FASE: ${specialty}`);
        console.log(`=============================================================`);

        // 1. Obtener los 50 padecimientos
        const sypmtomsList = await generateSeedListForSpecialty(specialty);
        console.log(`✅ Obtenidos ${sypmtomsList.length} padecimientos para analizar.`);

        // 2. Iterar sobre cada uno
        for (const symptom of sypmtomsList) {
            // Detener si llegamos al tope (ejemplo 1000)
            if (massiveDB.length >= 1000) {
                console.log(`\n🎉 ¡MISIÓN COMPLIDA! Se han alcanzado los 1000 padecimientos enciclopédicos.`);
                return;
            }

            // Validar que no exista ya en la DB (ignorando mayúsculas/minúsculas)
            const exists = massiveDB.find(s => s.name?.toLowerCase().includes(symptom.toLowerCase()));
            if (exists) {
                console.log(`⏭️ Saltando "${symptom}", ya existe en la enciclopedia.`);
                continue;
            }

            console.log(`⏳ Procesando: ${symptom} (${massiveDB.length + 1}/1000)...`);

            // Generar el detalle JSON médico
            const clinicalData = await generateClinicalDetailForSymptom(symptom);

            if (clinicalData && clinicalData.slug && clinicalData.cie10) {
                massiveDB.push(clinicalData);

                // GUARDADO AUTOMÁTICO por cada registro exitoso. ¡A prueba de caídas!
                fs.writeFileSync(dbPath, JSON.stringify(massiveDB, null, 2));
                console.log(`   ✅ Guardado: ${clinicalData.name} [CIE-10: ${clinicalData.cie10}]`);
                newlyGenerated++;

                // Pausa de 1.5 a 3 segundos para respetar Rate Limits de Gemini (15 RPM en free tier)
                // Usamos 4000ms = 4 segundos (15 rpm)
                await new Promise(r => setTimeout(r, 4000));
            } else {
                console.log(`   ⚠️ Descartado (Respuesta inválida)`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }

    console.log(`\n🏁 PIPELINE ININTERRUMPIDO FINALIZADO.`);
    console.log(`   Padecimientos nuevos generados: ${newlyGenerated}`);
    console.log(`   Total en Base de Datos: ${massiveDB.length}`);
}

runMassivePipeline();
