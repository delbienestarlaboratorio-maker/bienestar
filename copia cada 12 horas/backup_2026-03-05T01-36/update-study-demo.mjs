/**
 * Demo: Actualizar la BIOMETRÍA HEMÁTICA con descripción médica profesional
 * Ejecutar: node update-study-demo.mjs "<DATABASE_URL>"
 */

const DATABASE_URL = process.argv[2];
if (!DATABASE_URL) { console.error('❌ Falta DATABASE_URL'); process.exit(1); }

const STUDY_ID = '2'; // BIOMETRÍA HEMÁTICA

// ═══════════════════════════════════════════════════
// CONTENIDO MÉDICO PROFESIONAL — BIOMETRÍA HEMÁTICA
// ═══════════════════════════════════════════════════

// DESCRIPTION (text) — Párrafo principal que aparece en la página
const description = `La Biometría Hemática, también llamada hemograma completo o CBC (Complete Blood Count), es el estudio de sangre más solicitado en medicina. Analiza las tres líneas celulares fundamentales de tu sangre: glóbulos rojos (eritrocitos) que transportan oxígeno, glóbulos blancos (leucocitos) que son tu sistema de defensa, y plaquetas (trombocitos) que controlan la coagulación.

En total se reportan más de 20 parámetros en un solo estudio, incluyendo hemoglobina, hematocrito, índices eritrocitarios (VCM, HCM, CMHC), cuenta total y diferencial de leucocitos, y cuenta de plaquetas. Esto permite al médico tener un panorama integral de tu salud con una sola muestra de sangre.

Es la primera prueba que solicita cualquier médico porque funciona como un "chequeo general" del estado de tu sangre y puede revelar desde una simple anemia por deficiencia de hierro hasta condiciones más serias como leucemia, infecciones activas o problemas de coagulación. También es fundamental para monitorear el efecto de tratamientos como quimioterapia o medicamentos que afectan la médula ósea.`;

// WHAT IS IT (text) — Definición técnica accesible
const whatIsIt = `Es un análisis completo de las células de tu sangre obtenido con una sola muestra de sangre venosa (del brazo). El laboratorio procesa tu muestra en un equipo automatizado de hematología que cuenta y clasifica cada tipo de célula con precisión.

El reporte incluye: hemoglobina (la proteína que transporta oxígeno), hematocrito (porcentaje de glóbulos rojos en tu sangre), cuenta de eritrocitos, índices eritrocitarios (VCM, HCM, CMHC, ADE), cuenta total y diferencial de leucocitos desglosada en neutrófilos, linfocitos, monocitos, eosinófilos y basófilos, cuenta de plaquetas y volumen plaquetario medio (VPM).

Es rápido, económico y ofrece información diagnóstica invaluable — razón por la que es el estudio de laboratorio más realizado en el mundo.`;

// WHAT DOES IT DETECT (jsonb) — Array de condiciones/enfermedades
const whatDoesItDetect = JSON.stringify([
    "Anemia por deficiencia de hierro — la causa más común de anemia, especialmente en mujeres en edad reproductiva y niños",
    "Anemia megaloblástica por falta de vitamina B12 o ácido fólico — común en adultos mayores y vegetarianos estrictos",
    "Infecciones bacterianas activas — se manifiestan con neutrófilos elevados y bandas (leucocitos inmaduros)",
    "Infecciones virales como dengue, COVID-19 o mononucleosis — se observan linfocitos alterados o atípicos",
    "Leucemia y otros cánceres de la sangre — presencia de células blásticas o conteos extremadamente anormales",
    "Policitemia — exceso de glóbulos rojos que espesa la sangre y aumenta riesgo cardiovascular",
    "Trombocitopenia — plaquetas bajas con riesgo de sangrado espontáneo, moretones fáciles y petequias",
    "Reacciones alérgicas severas o parasitosis intestinal — eosinófilos notablemente elevados",
    "Deshidratación — hematocrito elevado sin anemia real, indica concentración de la sangre",
    "Efectos de quimioterapia, radioterapia o medicamentos inmunosupresores en la médula ósea"
]);

// DETAILED PREPARATION (jsonb) — Array de instrucciones
const detailedPreparation = JSON.stringify([
    "Ayuno de 8 a 12 horas antes de la toma — solo agua simple está permitida, no jugos ni café",
    "No fumar al menos 2 horas antes de la toma — el tabaco altera la cuenta de leucocitos temporalmente",
    "Informar al laboratorista TODOS los medicamentos que toma actualmente, especialmente anticoagulantes (warfarina, heparina), antiinflamatorios (ibuprofeno, naproxeno) y antibióticos",
    "Evitar ejercicio intenso las 24 horas previas — el ejercicio modifica temporalmente los leucocitos y puede dar resultados falsos",
    "Presentarse preferentemente en la mañana entre 7:00 y 10:00 am para obtener los valores más representativos",
    "Si le han realizado una transfusión de sangre reciente, informar la fecha exacta al personal del laboratorio"
]);

// BENEFITS (jsonb) — Array de ventajas
const benefits = JSON.stringify([
    "Panorama completo de tu salud con una sola toma de sangre — más de 20 parámetros en un solo reporte",
    "Es la primera línea de diagnóstico para la mayoría de enfermedades: detecta anemia, infecciones, leucemia y problemas de coagulación",
    "Permite monitorear la respuesta a tratamientos de anemia, quimioterapia e infecciones para verificar si están funcionando correctamente",
    "Resultados disponibles el mismo día — sin esperas de días como en otros laboratorios",
    "Estudio económico con altísimo valor diagnóstico — la mejor relación costo-beneficio en análisis clínicos"
]);

// FAQS (jsonb) — Array de objetos {question, answer}
const faqs = JSON.stringify([
    {
        question: "¿Necesito ayuno para la Biometría Hemática?",
        answer: "Sí, se recomienda ayuno de 8 a 12 horas. Aunque algunos médicos la solicitan sin ayuno para urgencias, el ayuno asegura resultados más precisos, especialmente en los índices eritrocitarios y la cuenta de plaquetas."
    },
    {
        question: "¿Qué pasa si mis glóbulos blancos están altos?",
        answer: "Un conteo elevado de leucocitos (leucocitosis) generalmente indica que tu cuerpo está combatiendo una infección. Dependiendo de qué tipo de glóbulo blanco esté elevado, tu médico puede distinguir entre infección bacteriana (neutrófilos altos), viral (linfocitos altos) o reacción alérgica/parasitaria (eosinófilos altos). En casos raros, niveles muy altos pueden indicar leucemia."
    },
    {
        question: "¿Cuál es la diferencia entre hemoglobina y hematocrito?",
        answer: "La hemoglobina es la proteína dentro de los glóbulos rojos que transporta el oxígeno — se mide en g/dL. El hematocrito es el porcentaje del volumen total de sangre que ocupan los glóbulos rojos. Ambos bajan en anemia, pero el hematocrito también puede subir por deshidratación sin que exista una enfermedad real de la sangre."
    },
    {
        question: "¿Cada cuánto debo hacerme una Biometría Hemática?",
        answer: "Para personas sanas, se recomienda al menos una vez al año como parte de un chequeo general. Si tienes anemia en tratamiento, tu médico puede solicitarla cada 1 a 3 meses. Mujeres embarazadas la realizan en cada trimestre. Pacientes con enfermedades crónicas o en quimioterapia pueden necesitarla semanalmente."
    }
]);

async function main() {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    console.log('📝 Actualizando BIOMETRÍA HEMÁTICA (ID: 2)...\n');

    await sql`
        UPDATE studies SET
            description = ${description},
            what_is_it = ${whatIsIt},
            what_does_it_detect = ${whatDoesItDetect}::jsonb,
            detailed_preparation = ${detailedPreparation}::jsonb,
            benefits = ${benefits}::jsonb,
            faqs = ${faqs}::jsonb
        WHERE id = ${STUDY_ID}
    `;

    console.log('✅ Actualizado en base de datos\n');

    // Verificar leyendo de vuelta
    const [updated] = await sql`SELECT name, description, what_is_it, what_does_it_detect, benefits, detailed_preparation, faqs FROM studies WHERE id = ${STUDY_ID}`;

    console.log('═══════════════════════════════════════════');
    console.log('  BIOMETRÍA HEMÁTICA — CONTENIDO NUEVO');
    console.log('═══════════════════════════════════════════');

    console.log('\n📌 DESCRIPCIÓN:');
    console.log(updated.description);

    console.log('\n📌 ¿QUÉ ES?:');
    console.log(updated.what_is_it);

    console.log('\n📌 ¿QUÉ DETECTA?:');
    const detects = typeof updated.what_does_it_detect === 'string'
        ? JSON.parse(updated.what_does_it_detect)
        : updated.what_does_it_detect;
    detects.forEach(d => console.log('  •', d));

    console.log('\n📌 PREPARACIÓN:');
    const prep = typeof updated.detailed_preparation === 'string'
        ? JSON.parse(updated.detailed_preparation)
        : updated.detailed_preparation;
    prep.forEach(p => console.log('  ✓', p));

    console.log('\n📌 BENEFICIOS:');
    const bens = typeof updated.benefits === 'string'
        ? JSON.parse(updated.benefits)
        : updated.benefits;
    bens.forEach(b => console.log('  ★', b));

    console.log('\n📌 FAQs:');
    const faqsParsed = typeof updated.faqs === 'string'
        ? JSON.parse(updated.faqs)
        : updated.faqs;
    faqsParsed.forEach((f, i) => {
        console.log(`  Q${i + 1}: ${f.question}`);
        console.log(`  A${i + 1}: ${f.answer}\n`);
    });

    console.log('═══════════════════════════════════════════');
    console.log('✅ Listo — ejecuta export-studies-json.mjs para ver en el sitio');
}

main().catch(err => { console.error('💥', err.message); process.exit(1); });
