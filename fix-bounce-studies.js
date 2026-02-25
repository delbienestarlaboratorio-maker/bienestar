const fs = require('fs');

const filePath = './src/data/studies.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// ─── Rich content for Coprocultivo ───────────────────────────────────────────
const coprSlug = 'cultivo-de-heces-coprocultivo';
const copro = data.find(s => s.slug === coprSlug);
if (copro) {
    copro.v2_description = `El Cultivo de Heces (Coprocultivo) es el estudio de referencia para identificar las bacterias que causan infecciones gastrointestinales. A diferencia de un examen general de heces, el coprocultivo aísla y cultiva los microorganismos presentes para identificar la bacteria exacta (como Salmonella, Shigella, Campylobacter o E. coli O157:H7) y determinar qué antibióticos son efectivos contra ella.

Este estudio es fundamental cuando la diarrea dura más de 3 días, cuando hay sangre o moco en las heces, o cuando varias personas del mismo entorno presentan síntomas simultáneos. También es indispensable en personas inmunocomprometidas, niños pequeños y adultos mayores, donde una infección bacteriana puede volverse grave rápidamente.

En Laboratorio Del Bienestar realizamos el coprocultivo con técnicas de cultivo enriquecido y medios selectivos para maximizar la sensibilidad de detección. Los resultados incluyen el antibiograma (sensibilidad a antibióticos) cuando se identifica algún patógeno.`;

    copro.what_does_it_detect = [
        'Salmonella spp. — causa de fiebre tifoidea y gastroenteritis severa',
        'Shigella spp. — disentería bacteriana con sangre y moco',
        'Campylobacter jejuni — la causa más común de diarrea bacteriana en México',
        'E. coli O157:H7 — productor de toxina que puede causar síndrome urémico hemolítico',
        'Yersinia enterocolitica — diarrea prolongada con dolor abdominal intenso',
        'Aeromonas y Plesiomonas — patógenos de agua contaminada',
        'Antibiograma: qué antibióticos eliminan la bacteria detectada'
    ];

    copro.benefits = [
        'Identifica la bacteria exacta causante de la infección (no todas dan el mismo antibiótico)',
        'Incluye antibiograma para que el médico recete el antibiótico más eficaz',
        'Evita el uso innecesario de antibióticos (resistencia antimicrobiana)',
        'Clave en brotes familiares o colectivos para identificar la fuente de contagio',
        'Fundamental para personas con sistema inmune comprometido',
        'Resultado en 3-5 días hábiles con reporte detallado'
    ];

    copro.detailedPreparation = [
        {
            title: '🚽 Recolección de muestra',
            description: 'Recolectar una pequeña cantidad de heces en el recipiente estéril provisto por el laboratorio. No mezclar con orina. La muestra debe ser de una deposición reciente (máx. 2 horas de recolectada).'
        },
        {
            title: '💊 Medicamentos a reportar',
            description: 'Informe si ha tomado antibióticos en los últimos 7-14 días. Los antibióticos pueden suprimir el crecimiento bacteriano y dar resultados falsos negativos.'
        },
        {
            title: '⏰ Horario de entrega',
            description: 'Entregar la muestra lo antes posible tras la recolección. Si no puede entregarla de inmediato, refrigerar (4°C) máximo 2 horas, nunca congelar.'
        },
        {
            title: '🍽️ Ayuno',
            description: 'No se requiere ayuno. Puede comer normalmente antes de tomar la muestra.'
        }
    ];

    console.log('✅ Coprocultivo actualizado');
} else {
    console.log('❌ No se encontró coprocultivo con slug:', coprSlug);
}

// ─── Rich content for Vitamina D ─────────────────────────────────────────────
const vitdSlug = 'vitamina-d-25-hidroxi-d3';
const vitd = data.find(s => s.slug === vitdSlug);
if (vitd) {
    vitd.v2_description = `La Vitamina D (25-hidroxi D3), también llamada 25(OH)D, es el análisis de referencia para evaluar el estado real de vitamina D en el organismo. Es la forma de almacenamiento de la vitamina D en la sangre y refleja fielmente la cantidad total disponible: la que obtenemos del sol y la que ingerimos en alimentos o suplementos.

La deficiencia de vitamina D es extremadamente frecuente en México, especialmente en personas que trabajan en interiores, adultos mayores y mujeres. Sus consecuencias van mucho más allá de los huesos: niveles bajos se asocian con fatiga crónica, depresión, mayor susceptibilidad a infecciones, dolor muscular difuso y mayor riesgo de enfermedades autoinmunes.

En Laboratorio Del Bienestar medimos la 25(OH)D total con técnica de quimioluminiscencia de alta precisión, con interpretación de resultados según los rangos óptimos (>40 ng/mL), no solo los rangos de referencia mínimos de laboratorio.`;

    vitd.what_does_it_detect = [
        'Deficiencia severa (<10 ng/mL) — riesgo de raquitismo en niños y osteomalacia en adultos',
        'Deficiencia moderada (10–20 ng/mL) — fatiga, dolor óseo-muscular, mayor riesgo de infecciones',
        'Insuficiencia (20–30 ng/mL) — nivel funcional mínimo, común en México',
        'Nivel óptimo (30–60 ng/mL) — protección inmune, densidad ósea adecuada',
        'Nivel elevado (>100 ng/mL) — toxicidad por suplementación excesiva',
        'Útil para monitorear eficacia del tratamiento con suplementos de Vitamina D'
    ];

    vitd.benefits = [
        'Detecta deficiencia que causa fatiga, dolor muscular y depresión frecuentemente mal diagnosticados',
        'Permite ajustar la dosis exacta de suplemento que necesitas (no todos necesitan la misma dosis)',
        'Fundamental para mujeres en menopausia, adultos mayores y personas con poca exposición solar',
        'Monitorea el tratamiento con vitamina D para evitar sobredosificación',
        'Asociado a función inmune: niveles bajos = más resfriados, gripes y enfermedades autoinmunes',
        'Resultado el mismo día — técnica de quimioluminiscencia de alta precisión'
    ];

    vitd.detailedPreparation = [
        {
            title: '🕐 Ayuno',
            description: 'Se recomienda ayuno de 4-8 horas antes de la toma. El agua simple está permitida.'
        },
        {
            title: '💊 Suplementos a reportar',
            description: 'Informe si toma suplementos de Vitamina D, Calcio o multivitamínicos. Si es para monitorear tratamiento, tome el suplemento con normalidad y mencione la dosis al personal.'
        },
        {
            title: '☀️ Sin restricción de sol',
            description: 'La exposición solar previa NO afecta el resultado del análisis. Puede salir a la calle normalmente.'
        }
    ];

    console.log('✅ Vitamina D actualizada');
} else {
    console.log('❌ No se encontró Vitamina D con slug:', vitdSlug);
}

// ─── Save ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n🎉 studies.json actualizado exitosamente');
