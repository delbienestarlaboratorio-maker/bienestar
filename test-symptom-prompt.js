const https = require('https');
const fs = require('fs');

const API_KEY = 'sk-c2a2f25fc2764f1f9e1cd76f76d84254';

const PROMPT = `Eres un médico internista mexicano con 20 años de experiencia, redactando contenido clínico de alta calidad para el portal de salud más grande de México. Tu objetivo es explicar síntomas de forma que el paciente los entienda perfectamente, sin jerga médica innecesaria.

Genera la ficha clínica COMPLETA Y EXTENSA para el síntoma: **Fiebre Alta**

Responde SOLO con JSON válido (sin markdown, sin backticks). Estructura:

{
  "slug": "fiebre-alta",
  "name": "Fiebre Alta",
  "medicalName": "Nombre médico/científico formal",
  "cie10": "Código CIE-10 más específico posible",
  "intro": "Introducción de 200-300 palabras en español claro para el paciente. Explica: qué es este síntoma, por qué ocurre, qué tan común es en México, por qué es importante atenderlo. Usa lenguaje simple, sin tecnicismos innecesarios.",
  "description": "Descripción DETALLADA de 300-400 palabras. Explica cómo se siente este síntoma, cómo se diferencia de otros parecidos, cuándo aparece, cómo evoluciona, qué lo empeora o mejora. Escrito para que el paciente entienda perfectamente su padecimiento.",
  "causes": [
    "Causa principal — la más frecuente en México, con explicación en 1-2 oraciones",
    "Segunda causa más frecuente — con explicación",
    "Tercera causa — con explicación",
    "Cuarta causa — con explicación",
    "Quinta causa — con explicación",
    "Sexta causa — factores de riesgo importantes en la población mexicana"
  ],
  "symptoms": [
    "Manifestación 1 que acompaña a este síntoma",
    "Manifestación 2",
    "Manifestación 3",
    "Manifestación 4",
    "Manifestación 5"
  ],
  "redFlags": [
    "Señal de alarma 1 — cuándo ir URGENTE a urgencias (descripción clara)",
    "Señal de alarma 2",
    "Señal de alarma 3",
    "Señal de alarma 4"
  ],
  "whenToSeek": "Párrafo de 100-150 palabras explicando en qué momento el paciente debe buscar atención médica.",
  "diagnosis": "Párrafo de 150-200 palabras explicando cómo el médico diagnostica este síntoma.",
  "tests": [
    "Estudio de laboratorio 1 (nombre completo, para qué sirve)",
    "Estudio 2",
    "Estudio 3",
    "Estudio 4",
    "Estudio 5"
  ],
  "treatments": [
    "Tratamiento o medida 1 — explicación en 1-2 oraciones para el paciente",
    "Tratamiento 2",
    "Tratamiento 3",
    "Tratamiento 4"
  ],
  "homeRemedies": [
    "Medida casera 1 (segura y respaldada)",
    "Medida casera 2",
    "Medida casera 3"
  ],
  "prevention": [
    "Medida preventiva 1",
    "Medida preventiva 2",
    "Medida preventiva 3",
    "Medida preventiva 4"
  ],
  "faqs": [
    { "q": "¿Desde qué temperatura se considera fiebre alta?", "a": "Respuesta de 50-80 palabras." },
    { "q": "¿Cuándo debo ir urgencias y no esperar?", "a": "Respuesta" },
    { "q": "¿Puedo bajar la fiebre en casa?", "a": "Respuesta" },
    { "q": "¿Qué estudios necesito hacerme?", "a": "Respuesta" },
    { "q": "¿Cuántos días puede durar la fiebre?", "a": "Respuesta" }
  ],
  "tools": []
}`;

const payload = JSON.stringify({
    model: 'deepseek-chat',
    messages: [
        { role: 'system', content: 'Eres médico internista mexicano experto. Responde SOLO con JSON válido, sin markdown ni backticks.' },
        { role: 'user', content: PROMPT }
    ],
    temperature: 0.3,
    max_tokens: 4000,
});

console.log('Generando síntoma de prueba: Fiebre Alta...');

const req = https.request({
    hostname: 'api.deepseek.com',
    path: '/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
    },
    timeout: 120000,
}, (res) => {
    const chunks = [];
    res.on('data', c => chunks.push(c));
    res.on('end', () => {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        const content = body.choices?.[0]?.message?.content || '';
        try {
            const json = JSON.parse(content);
            const keys = Object.keys(json);
            console.log('\n=== RESULTADO ===');
            console.log('Campos generados:', keys.join(', '));
            console.log('Tamaño total JSON:', JSON.stringify(json).length, 'caracteres');
            console.log('intro:', json.intro?.length || 0, 'chars');
            console.log('description:', json.description?.length || 0, 'chars');
            console.log('causes:', json.causes?.length || 0, 'items');
            console.log('symptoms:', json.symptoms?.length || 0, 'items');
            console.log('tests:', json.tests?.length || 0, 'items');
            console.log('treatments:', json.treatments?.length || 0, 'items');
            console.log('faqs:', json.faqs?.length || 0, 'items');
            console.log('\n--- intro ---');
            console.log(json.intro);
            console.log('\n--- whenToSeek ---');
            console.log(json.whenToSeek);
            console.log('\n--- faqs[0] ---');
            console.log(JSON.stringify(json.faqs?.[0], null, 2));
            console.log('\n--- treatments ---');
            json.treatments?.forEach(t => console.log(' •', t));
            fs.writeFileSync('test-symptom-fiebre.json', JSON.stringify(json, null, 2), 'utf8');
            console.log('\n✅ Guardado: test-symptom-fiebre.json');
        } catch (e) {
            console.log('❌ Parse error:', e.message);
            console.log(content.substring(0, 500));
        }
    });
});
req.on('error', e => console.log('Error:', e.message));
req.write(payload);
req.end();
