const fs = require('fs');
const path = require('path');
const { Ollama } = require('ollama');

// Me conecto a tu servidor esclavo (.70) para no saturar Farmacia1
const ollama = new Ollama({ host: 'http://192.168.20.70:11434' });
const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-massive.json');

const schemaExample = {
    "slug": "dolor-abdominal",
    "name": "Dolor Abdominal",
    "medicalName": "Dolor Abdominal Agudo / Crónico",
    "cie10": "R10",
    "intro": "Párrafo clínico detallado (100 palabras) explicando el síntoma.",
    "causes": [
        { "name": "Causa 1", "desc": "Descripción detallada de la causa 1." },
        { "name": "Causa 2", "desc": "Descripción detallada de la causa 2." }
    ],
    "redFlags": [
        "Bandera roja grave (cuándo ir a urgencias)"
    ],
    "tests": [
        { "name": "Prueba Clínica (ej. Biometría Hemática)", "url": "/estudios/analisis-clinicos/biometria-hematica" }
    ],
    "tools": [
        { "name": "Herramienta Relacionada", "url": "/herramientas" }
    ]
};

const specialties = [
    'Medicina General y Urgencias', 'Cardiología', 'Gastroenterología',
    'Neurología', 'Dermatología', 'Pediatría y Neonatología',
    'Endocrinología y Metabolismo', 'Neumología y Vías Respiratorias',
    'Reumatología', 'Infectología y Enfermedades Tropicales',
    'Nefrología (Riñones)', 'Urología', 'Ginecología y Obstetricia',
    'Oftalmología', 'Otorrinolaringología (Oídos, Nariz y Garganta)',
    'Hematología (Sangre)', 'Oncología', 'Psiquiatría y Salud Mental',
    'Traumatología y Ortopedia', 'Cirugía General y Proctología',
    'Odontología', 'Nutrición Clínica'
];

async function getSeeds(specialty) {
    try {
        console.log(`🧠 [IA Gemini-Agent] Pensando 50 padecimientos para: ${specialty}...`);
        const prompt = `Actúa como Director Médico. Lista 50 síntomas/enfermedades comunes en ${specialty} que los pacientes busquen en Google (ej. Reflujo, Tos Seca, Infarto). Devuelve SOLO un arreglo JSON plano de strings ["Item 1", "Item 2"]. Nada de texto extra.`;

        const response = await ollama.chat({
            model: 'qwen2.5:7b',
            messages: [{ role: 'user', content: prompt }],
            format: 'json',
            options: { temperature: 0.2 }
        });

        const list = JSON.parse(response.message.content);
        return Array.isArray(list) ? list : [];
    } catch (e) {
        return [];
    }
}

async function getClinicalJson(symptom) {
    try {
        const prompt = `
Eres un editor médico experto escribiendo la enciclopedia clínica.
Genera la documentación clínica estructurada para el padecimiento: "${symptom}".

REGLAS ESTRICTAS:
1. Retorna ÚNICAMENTE JSON válido acorde al esquema.
2. Formato exacto:
${JSON.stringify(schemaExample, null, 2)}
3. "slug" debe ser el nombre del síntoma en minúsculas y guiones (ej. dolor-cabeza).
4. "tests" debe usar URLs inventadas como "/estudios/analisis-clinicos/nombre-de-prueba".
5. NO uses Spanglish. Escribe en español médico formal (de México). NO traduzcas "esfínter" como "estreñimiento".
`;
        const response = await ollama.chat({
            model: 'qwen2.5:7b',
            messages: [{ role: 'user', content: prompt }],
            format: 'json',
            options: { temperature: 0.1 }
        });

        return JSON.parse(response.message.content);
    } catch (e) {
        return null; // Salta en caso de error de parseo
    }
}

async function autoPilot() {
    console.log("===================================================================");
    console.log("🤖 IA ASISTENTE: INICIANDO GUARDIA NOCTURNA (GENERACIÓN MASIVA 1000+)");
    console.log("===================================================================");

    let massiveDB = [];
    if (fs.existsSync(dbPath)) {
        try {
            massiveDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            console.log(`📁 Base de datos recuperada con ${massiveDB.length} padecimientos.`);
        } catch (e) { }
    }

    for (let spec of specialties) {
        if (massiveDB.length >= 1000) break;

        const seeds = await getSeeds(spec);
        for (let symptom of seeds) {
            if (massiveDB.length >= 1000) break;

            const exists = massiveDB.find(s => s.name?.toLowerCase().includes(symptom.toLowerCase()));
            if (!exists) {
                console.log(`\n⏳ [${massiveDB.length + 1}/1000] Redactando artículo clínico para: ${symptom}...`);
                const article = await getClinicalJson(symptom);
                if (article && article.slug && article.cie10) {
                    massiveDB.push(article);
                    fs.writeFileSync(dbPath, JSON.stringify(massiveDB, null, 2));
                    console.log(`✅ OK: Guardado -> ${article.name} [CIE-10: ${article.cie10}]`);
                    // Pausa de 3 segundos
                    await new Promise(r => setTimeout(r, 3000));
                } else {
                    console.log(`⚠️ Falló formato JSON para ${symptom}, reintentaré en la próxima vuelta.`);
                }
            }
        }
    }

    console.log("\n🌞 EL GUARDIA TERMINÓ EL TURNO: 1000 SÍNTOMAS GENERADOS EXITOSAMENTE.");
}

autoPilot().catch(console.error);
