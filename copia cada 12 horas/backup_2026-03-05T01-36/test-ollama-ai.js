const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://192.168.20.70:11434' });

const schemaExample = {
    "slug": "sintoma-ejemplo",
    "name": "Nombre Común",
    "medicalName": "Nombre Médico Técnico",
    "cie10": "A00.0",
    "intro": "Párrafo de introducción SEO médico estricto de unas 80 a 150 palabras explicándolo clínicamente pero entendible.",
    "causes": [
        { "name": "Causa 1", "desc": "Descripción detallada de la causa 1." }
    ],
    "redFlags": [
        "Bandera roja 1 grave (cuándo ir a urgencias)"
    ],
    "tests": [
        { "name": "Nombre de Prueba Clínica Recomendada 1", "url": "/estudios/analisis-clinicos/biometria-hematica" }
    ],
    "tools": [
        { "name": "Título de Relacionado 1", "url": "/busqueda" }
    ]
};

async function testModel() {
    const symptomName = "Reflujo Gastroesofágico";
    const prompt = `
Eres un editor médico experto y director clínico riguroso escribiendo para Clínica Mayo.
Tu tarea es generar la documentación clínica estructurada para el siguiente padecimiento o síntoma: "${symptomName}".

REGLAS ESTRICTAS:
1. NO escribas introducciones, charlas o texto fuera del JSON. 
2. Retorna ÚNICAMENTE un objeto JSON válido, puro y minificado.
3. El JSON debe seguir EXACTAMENTE esta estructura y llaves:
${JSON.stringify(schemaExample, null, 2)}

4. "slug" debe ser el nombre del síntoma en minúsculas, sin acentos y separado por guiones.
5. "cie10" debe ser el código CIE-10 (o CIE-11) real para este padecimiento.
6. En "tests" y "tools", inventa URLs lógicas que comiencen con "/estudios/" o "/herramientas/" y títulos enfocados a conversiones médicas locales en México.
7. Las "redFlags" deben ser claras advertencias vitales.
    `;

    console.log(`🧠 Consultando a Ollama Externo (qwen2.5) para: ${symptomName}...\\n`);

    try {
        const response = await ollama.chat({
            model: 'qwen2.5:7b',
            messages: [{ role: 'user', content: prompt }],
            format: 'json',
            options: { temperature: 0.1 }
        });

        require('fs').writeFileSync('test_result.json', response.message.content, 'utf8');
        console.log("================ RESPUESTA GUARDADA EN test_result.json ================");
    } catch (e) {
        console.error("❌ Error:", e);
    }
}

testModel();
