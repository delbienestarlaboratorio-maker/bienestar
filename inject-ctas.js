const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'app', 'herramientas');

// Diccionario médico de 41 calculadoras mapeadas a su estudio ideal, explicación y CTA
const ctaDictionary = {
    'calculadora-imc': {
        title: '¿Tu IMC está fuera de rango?',
        description: 'El Índice de Masa Corporal es un indicador básico. Para conocer tu salud metabólica real, incluyendo posibles hígados grasos o riesgo de diabetes, se sugiere un Check-Up Metabólico o una Química Sanguínea Completa.',
        actionText: 'Cotizar Check-Up Metabólico',
        type: 'checkup'
    },
    'calculadora-grasa-corporal': {
        title: 'Mide tu salud desde adentro',
        description: 'La grasa corporal es mejor indicador que el peso. Un Perfil Lipídico (colesterol y triglicéridos) te dirá si esa grasa está afectando tus arterias y corazón.',
        actionText: 'Cotizar Perfil de Lípidos',
        type: 'estudio'
    },
    'calculadora-agua': {
        title: 'Evalúa tu función renal',
        description: 'Si tienes problemas para mantenerte hidratado o retienes líquidos, es vital evaluar cómo están filtrando tus riñones con una Química Sanguínea (Urea, Creatinina y Ácido Úrico).',
        actionText: 'Cotizar Examen Renal',
        type: 'estudio'
    },
    'calculadora-metabolismo': {
        title: '¿Problemas con tu metabolismo?',
        description: 'El metabolismo lento a menudo está ligado a la glándula tiroides. Un Perfil Tiroideo (TSH, T3, T4) ayuda a descartar hipotiroidismo como causa de fatiga o aumento de peso.',
        actionText: 'Cotizar Perfil Tiroideo',
        type: 'estudio'
    },
    'calculadora-calorias': {
        title: 'Optimiza tu nutrición',
        description: 'Conocer tus calorías es el primer paso. Si vas a iniciar un régimen, asegúrate de que no haya desbalances básicos con una Biometría Hemática y Glucosa.',
        actionText: 'Cotizar Biometría y Glucosa',
        type: 'estudio'
    },
    'calculadora-peso-ideal': {
        title: 'Logra tu peso con salud',
        description: 'No persigas un número en la báscula a ciegas. Un Check-Up Nutricional te da la fotografía exacta de cómo está asimilando tu cuerpo los nutrientes y macronutrientes.',
        actionText: 'Ver Paquete Nutricional',
        type: 'checkup'
    },
    'riesgo-cardiovascular': {
        title: 'Protege tu corazón a tiempo',
        description: 'El riesgo cardiovascular no avisa con dolor. Un Electrocardiograma y un Perfil de Lípidos Completo son los estudios estándar de oro para prevenir paros cardíacos silentes.',
        actionText: 'Cotizar Check-Up Cardiológico',
        type: 'checkup',
        link: '/paquetes'
    },
    'calculadora-colesterol-ldl': {
        title: '¿Colesterol LDL elevado?',
        description: 'El LDL es conocido como "colesterol malo" porque forma placas que tapan las arterias. Si tus niveles son altos, necesitas un Perfil Lipídico avanzado para iniciar tratamiento urgente.',
        actionText: 'Cotizar Perfil Clínico de Lípidos',
        type: 'estudio'
    },
    'clasificador-presion-arterial': {
        title: 'Monitoreo de Hipertensión',
        description: 'La presión alta daña los riñones y el corazón a lo largo de los años. Una Química Analítica y un Electrocardiograma son esenciales en el paciente hipertenso.',
        actionText: 'Estudios de Hipertensión',
        type: 'estudio'
    },
    'riesgo-acv-cha2ds2-vasc': {
        title: 'Prevención de Embolias y Trombos',
        description: 'Este score evalúa el riesgo clínico. Pruebas como Tiempos de Coagulación (TP, TTP) y el Dímero-D, revelan la tendencia de tu sangre a formar coágulos que podrían ir al cerebro.',
        actionText: 'Cotizar Perfil de Coagulación',
        type: 'estudio'
    },
    'indice-aterogenico': {
        title: 'No dejes que el colesterol tape tus venas',
        description: 'El índice aterogénico alto señala que hay grasa pegada a tus arterias. El Perfil Clínico Lipídico completo es la herramienta necesaria para que tu cardiólogo asigne el medicamento correcto.',
        actionText: 'Cotizar Perfil Lipídico',
        type: 'estudio'
    },
    'riesgo-osteoporosis-ost': {
        title: 'Fortalece tus huesos antes que se quiebren',
        description: 'La osteoporosis debilita los huesos. Medir el Calcio Sérico y la Vitamina D es el primer paso biométrico, complementado después con una densitometría ósea.',
        actionText: 'Cotizar Calcio y Vit. D3',
        type: 'estudio'
    },
    'actividad-ar-das28': {
        title: 'Controla el dolor articular',
        description: 'La artritis reumatoide no se mide solo con el dolor. Estudios como Proteína C Reactiva (PCR) y Velocidad de Sedimentación Globular (VSG) miden la inflamación real de tu cuerpo.',
        actionText: 'Cotizar Reactantes (PCR y VSG)',
        type: 'estudio'
    },
    'riesgo-malignidad-ovarica': {
        title: 'Tranquilidad Oncológica',
        description: 'Ante la duda de quistes o tumores, los Marcadores Tumorales CA-125 y HE4, junto con un ultrasonido pélvico, son el protocolo ginecológico para detectar malignidad temprana.',
        actionText: 'Cotizar Marcador CA-125',
        type: 'estudio'
    },
    'indice-psa': {
        title: 'Cuida tu próstata hoy',
        description: 'El Cáncer de Próstata es silente. El Antígeno Prostático Específico (PSA) Total y Libre es un simple test de sangre que salva miles de vidas anualmente. Hazlo una vez al año.',
        actionText: 'Cotizar Prueba de PSA',
        type: 'estudio'
    },
    'evaluador-sop': {
        title: 'Diagnóstico Hormonal Femenino',
        description: 'Si presentas acné, caída de cabello o ciclos irregulares, el SOP es probable. Un Perfil Hormonal Ginecológico (LH, FSH, Prolactina, Testosterona) confirmará el diagnóstico.',
        actionText: 'Cotizar Perfil Femenino',
        type: 'estudio'
    },
    'riesgo-preeclampsia': {
        title: 'Monitoreo Perinatal Seguro',
        description: 'La presión alta en el embarazo es riesgosa. Deben llevarse rutinariamente Examen General de Orina (EGO) y Química Sanguínea para detectar proteínas que indiquen preeclampsia.',
        actionText: 'Cotizar Control Prenatal',
        type: 'checkup'
    },
    'severidad-neumonia-curb65': {
        title: 'Evaluación Respiratoria Crítica',
        description: 'Un paciente pulmonar comprometido necesita una Radiografía de Tórax inmediata para evaluar consolidación y Biometría Hemática para medir la carga de la infección bacteriana.',
        actionText: 'Cotizar Rx y Biometría',
        type: 'estudio'
    },
    'riesgo-alergico': {
        title: 'Descubre a qué eres alérgico',
        description: 'Rinitis constantes o asma están dictados por hipersensibilidad. El Panel de Alergenos o IgE Específica y la Citometría Hemática determinan si el problema es alérgico o infeccioso.',
        actionText: 'Cotizar Panel Alérgico (IgE)',
        type: 'estudio'
    },
    'aclaramiento-creatinina': {
        title: 'Evaluación Absoluta del Riñón',
        description: 'Si tienes sospecha de insuficiencia, se necesita el Aclaramiento de Creatinina (sanguínea y en orina de 24h) y depuración de urea integral.',
        actionText: 'Prueba Renal GFR / Aclaramiento',
        type: 'estudio'
    },
    'test-infeccion-urinaria': {
        title: 'Alivio rápido para cistitis y dolor',
        description: 'El dolor al orinar obedece a bacterias. Un Urocultivo con Antibiograma identifica qué bacteria es y CÚAL antibiótico la aniquila, evitando que gaste en medicinas incorrectas.',
        actionText: 'Cotizar EGO / Urocultivo',
        type: 'estudio'
    },
    'deficit-hierro-ganzoni': {
        title: 'Mide la severidad de tu Anemia',
        description: 'El cansancio profundo puede ser falta de hierro (anemia ferropénica). Una Biometría Hemática Completa revela si requieres donaciones, suplementos o hasta hierro intravenoso.',
        actionText: 'Cotizar Biometría Hemática',
        type: 'estudio'
    },
    'riesgo-diabetes': {
        title: 'Detén la diabetes antes que empiece',
        description: 'Sentir mucha sed o ir al baño frecuentemente son alertas. La Prueba de Hemoglobina Glicosilada (HbA1c) marca un promedio del nivel de glucosa en tu sangre durante los últimos 3 meses.',
        actionText: 'Cotizar Hemoglobina Glicosilada',
        type: 'estudio'
    },
    'convertidor-hba1c': {
        title: 'El estándar de oro en glucosa',
        description: 'La Glucosa en ayuno mide solo ese segundo, pero la HbA1c evalúa 90 días atrás. Es el estudio oficial para confirmar diabetes o prediabetes.',
        actionText: 'Cotizar Hemoglobina A1c',
        type: 'estudio'
    },
    'calculadora-egfr': {
        title: 'La medida crucial del riñón',
        description: 'Conocer cómo están tus riñones no debe posponerse si eres hipertenso o diabético. Una prueba de Creatinina Sérica con Tasa de Filtrado Glomerular previene diálisis futuras.',
        actionText: 'Cotizar Química Analítica (Glomerular)',
        type: 'estudio'
    },
    'sodio-corregido': {
        title: 'Desequilibrio Electrolítico',
        description: 'Subidas extremas de glucosa distorsionan el sodio y causan calambres y confusión. Es vital evaluar Sodio, Potasio y Cloro con un test de Electrolitos Séricos.',
        actionText: 'Electrolitos Séricos 6 e.',
        type: 'estudio'
    },
    'calcio-corregido': {
        title: 'Importancia del Calcio y Albúmina',
        description: 'Si tu albúmina o proteínas están bajas, el calcio activo del cuerpo también decrece. Una Química Integral revela todos estos componentes minerales vitales juntos.',
        actionText: 'Química Sanguínea Clínica',
        type: 'estudio'
    },
    'fecha-parto': {
        title: 'Control Prenatal Essencial',
        description: 'La salud de tu bebé arranca desde el inicio. El Paquete de Control Perinatal abarca química sanguínea, tipo de sangre materno y examen toxoplasmótico, protegiéndolos a ambos.',
        actionText: 'Ver Check-Up Prenatal',
        type: 'checkup',
        link: '/paquetes'
    },
    'semanas-embarazo': {
        title: 'Verifica la integridad fetal',
        description: 'Dependiendo del trimestre, sugerimos análisis de orina rutinarios para evitar infecciones, o un tamiz neonatal ampliado cuando el bebé nazca.',
        actionText: 'Estudios por Trimestre',
        type: 'estudio'
    },
    'dias-fertiles': {
        title: 'Acompañamiento en Fertilidad',
        description: 'Si buscas un embarazo activo, un Perfil Ginecológico (que mide estrógenos, FSH, prolactina) ayudará a detectar posibles desórdenes de ovulación o endocrinos.',
        actionText: 'Cotizar Perfil Hormonal Femenino',
        type: 'estudio'
    },
    'percentil-crecimiento': {
        title: 'Asegura el sano desarrollo infantil',
        description: 'Bajo peso o talla lenta pueden deberse a parásitos o anemias silentes infantiles. El Estudio Coproparasitoscópico (Heces) detecta invasiones indeseadas.',
        actionText: 'Check-up Pediátrico Escolar',
        type: 'checkup',
        link: '/paquetes'
    },
    'indice-fib4': {
        title: 'Salva tu Hígado Hoy',
        description: 'Un FIB4 elevado apunta a fibrosis o cirrosis inminente. Estudios urgentes de Perfil Hepático o Pruebas de Función Hepática (AST, ALT, Bilirrubinas) te indicarán el camino clínico a seguir.',
        actionText: 'Cotizar Prueba Hepática',
        type: 'estudio'
    },
    'meld-score': {
        title: 'Urgencia Gastroenterológica',
        description: 'En Scores elevados de MELD, los tiempos de coagulación y las bilirrubinas (junto con Creatinina) dictan la urgencia de recibir soporte hepático avanzado.',
        actionText: 'Cotizar Bilirrubina y TP',
        type: 'estudio'
    },
    'test-depresion-phq9': {
        title: 'Salud Mental y Fisiológica',
        description: 'Curiosamente, depresión y cansancio a menudo esconden causas orgánicas no diagnosticadas, como Hipotiroidismo Severo o Anemia. Evaluar el Perfil Tiroideo descarta estos gatillos físicos.',
        actionText: 'Cotizar Check-up General',
        type: 'checkup'
    },
    'test-ansiedad-gad7': {
        title: 'Tranquilidad Nerviosa Global',
        description: 'La clínica señala que faltantes crónicos de B12 y Vitamina D empeoran drásticamente los cuadros de ansiedad patológica y ataques de pánico.',
        actionText: 'Verificar Test de Vitaminas',
        type: 'estudio'
    },
    'indice-homa-ir': {
        title: 'Diagnostica tu Resistencia a la Insulina',
        description: 'Tener glucosa "normal" engaña. Si el cuerpo segrega demasiada Insulina Basal, subirás de peso. Determinar este índice requiere medir Insulina y Glucosa simultáneamente en ayuno.',
        actionText: 'Cotizar Insulina y Glucosa (HOMA)',
        type: 'estudio'
    },
    'score-must': {
        title: 'Desnutrición Hospitalaria',
        description: 'Para corroborar la desnutrición detectada, es imperativo obtener niveles sanguíneos de Albúmina y Proteínas Totales (marcadores de reservas musculares).',
        actionText: 'Cotizar Albúmina en Sangre',
        type: 'estudio'
    },
    'tmb-ajustada': {
        title: 'Equilibrio Energético Integral',
        description: 'Para lograr el balance de esta calculadora en dietas prolongadas, vigilar los perfiles de Sodio, Potasio y Magnesio asegura que evites caídas en tu desempeño y calambres.',
        actionText: 'Consulta Nutricional y Panel',
        type: 'doctor'
    },
    'calculadora-macronutrientes': {
        title: 'Maximiza el desempeño deportivo',
        description: 'Modificar drásticamente tus "macros" impacta el ácido úrico y urea (por exceso de proteína). Un chequeo trimestral previene daños a los riñones.',
        actionText: 'Cotizar Urea y Creatinina',
        type: 'estudio'
    },
    'indice-cintura-cadera': {
        title: 'Alerta de Riesgo Metabólico',
        description: 'Un índice cintura-cadera tipo "manzana" eleva fuertemente el riesgo de isquemia. Realizar Análisis Completos de Lípidos descarta formaciones de placa coronaria oculta.',
        actionText: 'Checkup Mujer / Hombre',
        type: 'checkup',
        link: '/paquetes'
    },
    'riesgo-nutricional-nri': {
        title: 'Déficits Nutricionales Críticos',
        description: 'Un riesgo moderado o grave obliga a vigilar la deficiente absorción visceral de micronutrientes, destacando la Biometría para descartar depleción de tejido.',
        actionText: 'Check-Up Completo de Rutina',
        type: 'checkup',
        link: '/paquetes'
    },
    'indice-glucemico': {
        title: 'Control Total de Azúcar',
        description: 'La gestión de alimentos afecta picos de azúcar ocultos en la noche. Monitorear tu metabolismo general con HbA1c certifica los hábitos a largo plazo.',
        actionText: 'Prueba de Glucosa',
        type: 'estudio'
    },
    'riesgo-anemia-megaloblastica': {
        title: 'Resuelve tu problema neurológico hoy',
        description: 'Retrasar el diagnóstico de falta de Vitamina B12 provoca daños irreversibles al sistema nervioso. Mide los niveles de Ácido Fólico y B12 en suero hoy mismo.',
        actionText: 'Cotizar Ácido Fólico y B12',
        type: 'estudio'
    },
    'riesgo-anemia': {
        title: 'Clarifica tu Fatiga Constante',
        description: 'Hay más de 5 tipos de Anemias distintas. La Citometría Hemática con Recuento de Reticulocitos define si es falta de hierro, hemorragia o un problema genético.',
        actionText: 'Cotizar Citometría Hemática (Biometría)',
        type: 'estudio'
    }
};

const defaultTextMsg = '?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:';

async function injectCTAs() {
    let successCount = 0;

    // Iterar en los slugs de las carpetas de las calculadoras
    const files = fs.readdirSync(toolsDir);
    for (const file of files) {
        const fullPath = path.join(toolsDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const pagePath = path.join(fullPath, 'page.tsx');
            if (fs.existsSync(pagePath)) {
                let content = fs.readFileSync(pagePath, 'utf8');
                const slug = file;
                const ctaData = ctaDictionary[slug];

                if (ctaData) {
                    // Check si ya se inyectó el componente
                    if (!content.includes('import { StudyCTA }')) {
                        // 1. Agregar el import arriba, justo después del import de AdBanner o de use client
                        if (content.includes("import { AdBanner }")) {
                            content = content.replace(
                                "import { AdBanner } from '@/components/ui/AdBanner';",
                                "import { AdBanner } from '@/components/ui/AdBanner';\nimport { StudyCTA } from '@/components/ui/StudyCTA';"
                            );
                        } else if (content.includes("import Link")) {
                            content = content.replace(
                                "import Link",
                                "import { StudyCTA } from '@/components/ui/StudyCTA';\nimport Link"
                            );
                        } else {
                            content = "import { StudyCTA } from '@/components/ui/StudyCTA';\n" + content;
                        }

                        // 2. Inyectar el componente justo antes de AdBanner
                        // Ojo, AdBanner está como: <AdBanner variant="horizontal" className="mb-8" />
                        // o similares
                        const whatsAppMsg = ctaData.link || `https://wa.me/527757371811${defaultTextMsg}%20*${encodeURIComponent(ctaData.actionText)}*`;

                        const ctaComponentStr = `\n                <StudyCTA \n                    title="${ctaData.title}" \n                    description="${ctaData.description}" \n                    actionText="${ctaData.actionText}" \n                    link="${whatsAppMsg}" \n                    type="${ctaData.type}" \n                />\n                `;

                        if (content.includes('<AdBanner')) {
                            content = content.replace(/<AdBanner/g, ctaComponentStr + '<AdBanner');
                            fs.writeFileSync(pagePath, content, 'utf8');
                            successCount++;
                        } else {
                            console.log('No AdBanner found in:', pagePath);
                        }
                    }
                } else {
                    console.log('No dictionary entry for slug:', slug);
                }
            }
        }
    }
    console.log(`Successfully injected CTAs into ${successCount} calculators.`);
}

injectCTAs();
