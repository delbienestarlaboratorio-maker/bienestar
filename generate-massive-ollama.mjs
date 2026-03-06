import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURACION ENDPOINT MAESTRO (OpenAI Compatible)
const OLLAMA_URL = 'http://127.0.0.1:10106/v1/chat/completions';
const MODEL_NAME = 'qwen2.5:14b';
const API_KEY = 'sk-1234';

const schemaExample = {
    "slug": "dolor-abdominal",
    "name": "Dolor Abdominal",
    "medicalName": "Dolor Abdominal Agudo / Crónico",
    "cie10": "R10",
    "intro": "AQUÍ DEBES ESCRIBIR UN ENSAYO MÉDICO MEGA EXTENSO (MÍNIMO 800 a 1000 PALABRAS). Debe incluir: 1) Definición clínica profunda. 2) Historia médica del padecimiento (quién lo descubrió o cómos se trataba en la antigüedad). 3) Datos curiosos o estadísticas sorprendentes. 4) Fisiopatología detallada (qué pasa en el cuerpo a nivel celular). 5) Explicación para el paciente en tono empático. DEBE SER TEXTO MUY LARGO Y RICO EN VALOR SEO, dividido en varios párrafos usando etiquetas <br><br> para separar ideas.",
    "causes": [
        { "name": "Causa 1", "desc": "Descripción muy detallada de la causa 1, explicando el por qué anatómico." },
        { "name": "Causa 2", "desc": "Descripción muy detallada de la causa 2." }
    ],
    "redFlags": [
        "Bandera roja 1 grave detallada (por qué es una urgencia vital y qué riesgo inminente existe)"
    ],
    "tests": [
        { "name": "Prueba Clínica Recomendada", "url": "/estudios/analisis-clinicos/biometria-hematica" }
    ],
    "tools": [
        { "name": "Herramienta Relacionada", "url": "/herramientas/riesgo" }
    ]
};

async function askOllama(prompt) {
    try {
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [{ role: 'user', content: prompt }],
                stream: false,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            console.error('HTTP Error: ' + response.status, await response.text());
            return null;
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (e) {
        console.error('Error conectando a Ollama:', e.message);
        return null;
    }
}

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
    console.log('\\n🧠 Evaluando 50 padecimientos para la especialidad: ' + specialty + '...');
    const prompt = 'Eres un Director Médico Universitario. Tu tarea es listar 50 síntomas clínicos, síndromes o padecimientos comunes de la especialidad de ' + specialty + '. Deben ser términos buscados en Google (ej. "Dolor de pecho", "Reflujo"). Devuelve ÚNICAMENTE un arreglo JSON plano de strings. Nada más.\n\nEjemplo: ["Dolor de pecho", "Palpitaciones", "Hipertensión"]';

    // Podemos usar un modelo más rápido o el mismo para la semilla
    const resultText = await askOllama(prompt);
    if (!resultText) return [];

    try {
        const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
        const lista = JSON.parse(cleanedText);
        return Array.isArray(lista) ? lista : [];
    } catch (e) {
        console.error('❌ Error generando semillas para ' + specialty + ':', e.message);
        return [];
    }
}

async function generateClinicalDetailForSymptom(symptomName) {
    const prompt = "Eres un historiador médico, editor clínico experto y director de un importante Laboratorio Clínico.\n" +
        "Tu tarea es generar documentación SUPER EXTENSA, enciclopédica y fascinante (más de 1,000 palabras) sobre el síntoma o padecimiento: \"" + symptomName + "\".\n\n" +
        "REGLAS ESTRICTAS:\n" +
        "1. Retorna ÚNICAMENTE un objeto JSON válido. NO MD. NO TICK MARKS. SÓLO JSON PURO.\n" +
        "2. Sigue EXACTAMENTE esta estructura y llaves:\n" +
        JSON.stringify(schemaExample, null, 2) + "\n\n" +
        "3. \"intro\": ¡ESTA ES LA PARTE MÁS IMPORTANTE! Escribe un texto inmenso (al menos 800 - 1000 palabras). Incluye la historia del síntoma, cómo lo trataban antiguas civilizaciones o quién lo descubrió, estadísticas mundiales, datos curiosos, y la ciencia médica profunda (fisiopatología) explicada de manera atrapante. Usa HTML <br><br> para separar ideas. ¡No seas breve, quiero un mega-artículo enciclopédico!\n" +
        "4. \"slug\": el nombre en minúsculas, sin acentos y guiones (ej. dolor-cabeza).\n" +
        "5. \"cie10\": código CIE-10 real.\n" +
        "6. En \"tests\" inventa URLs lógicas (/estudios/analisis-clinicos/... o /estudios/imagenologia/...).\n" +
        "7. Las \"redFlags\" deben ser súper detalladas explicando el por qué fisiológico de la urgencia.";

    console.log('\\n⏳ [Ollama ' + MODEL_NAME + '] Generando Mega-Artículo para: ' + symptomName + '...');
    const resultText = await askOllama(prompt);

    console.log('Result Text:\n', resultText?.substring(0, 500)); if (!resultText) return null;

    try {
        // Enforce JSON parsing
        const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error('❌ JSON inválido devuelto por Ollama para ' + symptomName + ':', e.message);
        return null;
    }
}

async function main() {
    const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-ollama-batch.json');
    let massiveDB = [];

    if (fs.existsSync(dbPath)) {
        try {
            massiveDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            console.log('📂 Base de datos cargada. Contiene ' + massiveDB.length + ' padecimientos.');
        } catch (e) { }
    }

    let newlyGenerated = 0;

    for (const specialty of specialties) {
        console.log('\n=============================================================');
        console.log('🏥 INICIANDO FASE: ' + specialty);
        console.log('=============================================================');

        const symptomsList = await generateSeedListForSpecialty(specialty);
        console.log('✅ Obtenidos ' + symptomsList.length + ' padecimientos para analizar.');

        for (const symptom of symptomsList) {
            // Detener si llegamos a un tope grande
            if (massiveDB.length >= 1000) {
                console.log('\n🎉 ¡MISIÓN CUMPLIDA! Se han alcanzado 1000 artículos.');
                return;
            }

            // Validar que no exista ya, soportando reanudación
            const exists = massiveDB.find(s => s.name && s.name.toLowerCase() === symptom.toLowerCase());
            if (exists) {
                console.log('⏭️ ' + symptom + ' ya existe. Saltando.');
                continue;
            }

            const data = await generateClinicalDetailForSymptom(symptom);

            if (data) {
                massiveDB.push(data);
                // AUTO-GUARDADO DE ESTADO - Guarda en cada paso para poder detener y reanudar sin perder nada
                fs.writeFileSync(dbPath, JSON.stringify(massiveDB, null, 2));
                console.log('✅ [EXITO] Guardado ' + symptom + ' - Intro length: ' + (data.intro ? data.intro.length : 0) + ' caracteres.');

                // Fragmento Individual
                const fragPath = path.join(__dirname, 'src', 'data', 'symptoms-fragments', data.slug + '.json');
                fs.writeFileSync(fragPath, JSON.stringify(data, null, 2));
                newlyGenerated++;
            } else {
                console.log('⚠️ Falló la generación para ' + symptom + '. Ollama se saltará y continuará con el siguiente.');
            }
        }
    }

    console.log('\\n🎉 Pipeline de prueba Finalizado con Ollama local. Revisa symptoms-ollama-batch.json');
}

main().catch(console.error);
