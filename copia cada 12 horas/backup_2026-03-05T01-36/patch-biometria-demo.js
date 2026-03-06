const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/studies.json', 'utf-8'));
const idx = data.findIndex(s => s.name === 'BIOMETRÍA HEMÁTICA');
if (idx < 0) { console.log('NOT FOUND'); process.exit(1); }

// ═══════════════════════════════════════════════════════════════════
// DESCRIPCIÓN PROFUNDA — NIVEL ENCICLOPEDIA MÉDICA PARA PACIENTES
// ═══════════════════════════════════════════════════════════════════

data[idx].description = `La Biometría Hemática, conocida también como hemograma completo, conteo sanguíneo completo o CBC (Complete Blood Count), es el estudio de laboratorio más importante y más solicitado en toda la medicina moderna. Con una sola muestra de sangre venosa se obtiene un análisis exhaustivo de los tres tipos de células que circulan por tu cuerpo, y cada una de ellas cuenta una historia diferente sobre tu salud.

GLÓBULOS ROJOS (ERITROCITOS) — El transporte de oxígeno
Los glóbulos rojos son las células más abundantes de tu sangre. Su trabajo principal es llevar oxígeno desde tus pulmones hasta cada órgano, músculo y tejido de tu cuerpo, y traer de regreso el dióxido de carbono para que lo exhales. La Biometría Hemática no solo cuenta cuántos tienes, sino que analiza su tamaño (Volumen Corpuscular Medio o VCM), cuánta hemoglobina carga cada uno (HCM), la concentración de hemoglobina en ellos (CMHC), y qué tan variados son en tamaño (Amplitud de Distribución Eritrocitaria o ADE). ¿Por qué importa todo esto? Porque el tamaño y la carga de hemoglobina de tus glóbulos rojos le dicen al médico exactamente QUÉ TIPO de anemia tienes: si son pequeños y pálidos, probablemente te falta hierro; si son grandes e hinchados, puede ser deficiencia de vitamina B12 o ácido fólico. Esto cambia completamente el tratamiento.

GLÓBULOS BLANCOS (LEUCOCITOS) — Tu ejército de defensa
Los glóbulos blancos son el sistema inmunológico de tu sangre. La Biometría Hemática no solo cuenta el total, sino que los desglosa en cinco tipos diferentes, cada uno con una función específica:
• Neutrófilos (50-70% normalmente): Son los soldados de primera línea. Atacan bacterias. Si están muy elevados, casi siempre significa infección bacteriana, apendicitis, neumonía o absceso. Si están muy bajos (neutropenia), tienes alto riesgo de infecciones graves.
• Linfocitos (20-40%): Son los estrategas del sistema inmune. Suben en infecciones virales como gripe, COVID-19, mononucleosis, hepatitis y dengue. También son las células que se alteran en leucemia linfocítica.
• Monocitos (2-8%): Son los encargados de limpieza — fagocitan restos celulares y patógenos. Suben en infecciones crónicas como tuberculosis y en enfermedades autoinmunes.
• Eosinófilos (1-4%): Son los especialistas en parásitos y alergias. Si están elevados, el médico investiga parasitosis intestinal, asma severa o reacciones alérgicas sistémicas.
• Basófilos (0-1%): Los menos comunes. Participan en reacciones alérgicas severas y pueden estar elevados en ciertas leucemias crónicas.

PLAQUETAS (TROMBOCITOS) — El control del sangrado
Las plaquetas son fragmentos celulares diminutos responsables de detener los sangrados. Cuando te cortas, las plaquetas se agrupan y forman un tapón para sellar la herida. La Biometría Hemática mide cuántas tienes y su tamaño promedio (VPM). Plaquetas bajas (trombocitopenia, menos de 150,000) significan riesgo de sangrados nasales, moretones sin causa, petequias (puntos rojos en la piel) y en casos severos, hemorragias internas. Plaquetas altas (trombocitosis, más de 400,000) pueden indicar inflamación crónica, deficiencia de hierro, o en casos raros, una enfermedad de la médula ósea. El VPM elevado sugiere que tu médula ósea está produciendo plaquetas nuevas aceleradamente, lo cual puede indicar destrucción periférica.

EN CONJUNTO — Por eso es el estudio más importante
Ningún otro estudio de laboratorio ofrece tanta información con una sola muestra. Un médico experimentado puede sospechar decenas de diagnósticos diferentes con solo analizar tu Biometría Hemática: desde una anemia nutricional que se resuelve con suplementos, hasta una leucemia que requiere tratamiento urgente. Es la primera prueba que se solicita en urgencias, en consultas de rutina, en embarazos, en chequeos anuales y antes de cualquier cirugía. Si solo pudieras hacerte un estudio de sangre en tu vida, este sería el indicado.`;

data[idx].whatIsIt = `La Biometría Hemática es un análisis automatizado de todas las células circulantes en tu sangre. Se obtiene con una muestra de sangre venosa (generalmente del pliegue del codo) de aproximadamente 3-5 mL en un tubo con anticoagulante EDTA (tapa morada).

Tu muestra se procesa en un analizador hematológico automatizado que utiliza impedancia eléctrica, dispersión de luz láser y tinción fluorescente para contar, clasificar y medir cada célula individual. En menos de 60 segundos, el equipo analiza miles de células y genera más de 20 parámetros:

SERIE ROJA: Eritrocitos totales, hemoglobina (Hb), hematocrito (Hto), Volumen Corpuscular Medio (VCM), Hemoglobina Corpuscular Media (HCM), Concentración de Hemoglobina Corpuscular Media (CMHC), Amplitud de Distribución Eritrocitaria (ADE/RDW).

SERIE BLANCA: Leucocitos totales, neutrófilos (absolutos y %), linfocitos, monocitos, eosinófilos, basófilos. En casos anormales, el equipo alerta sobre células inmaduras (bandas, metamielocitos, blastos).

SERIE PLAQUETARIA: Plaquetas totales, Volumen Plaquetario Medio (VPM), Amplitud de Distribución Plaquetaria (ADP).

Valores de referencia generales:
• Hemoglobina: Hombres 13.5-17.5 g/dL | Mujeres 12.0-16.0 g/dL
• Leucocitos: 4,500-11,000/μL
• Plaquetas: 150,000-400,000/μL

Cada resultado fuera de rango se marca automáticamente y es interpretado por el químico responsable antes de liberarte el reporte.`;

data[idx].whatDoesItDetect = [
    "Anemia ferropénica (por deficiencia de hierro) — la más frecuente en México, especialmente en mujeres con menstruación abundante, embarazadas y niños en crecimiento. Se ve con hemoglobina baja, VCM bajo y HCM baja (microcítica hipocrómica)",
    "Anemia megaloblástica por deficiencia de vitamina B12 o ácido fólico — frecuente en adultos mayores, vegetarianos estrictos y personas con gastritis atrófica. Los glóbulos rojos salen grandes (VCM >100 fL)",
    "Anemia hemolítica — destrucción acelerada de glóbulos rojos, puede ser autoinmune, por medicamentos o por defectos hereditarios como esferocitosis",
    "Infecciones bacterianas agudas (neumonía, apendicitis, infección urinaria complicada) — se manifiestan con leucocitosis y neutrofilia, a veces con bandas (deviación a la izquierda)",
    "Infecciones virales (dengue, COVID-19, mononucleosis, hepatitis) — típicamente muestran linfocitosis o leucopenia con linfocitos atípicos",
    "Leucemia aguda y crónica — se sospecha por conteos de leucocitos extremadamente altos o bajos, presencia de blastos, o citopenias inexplicables en dos o tres líneas celulares",
    "Trombocitopenia (plaquetas bajas) — causa moretones fáciles, sangrado de encías, petequias. Puede ser por dengue, púrpura trombocitopénica, medicamentos o enfermedad hepática",
    "Policitemia vera — exceso de glóbulos rojos que espesa la sangre, aumenta riesgo de trombosis cerebral y cardíaca. Se sospecha con hemoglobina >18 en hombres o >16.5 en mujeres",
    "Parasitosis intestinal severa y alergias sistémicas — sospechada por eosinofilia persistente (>500 eosinófilos absolutos)",
    "Pancitopenia (baja de las tres líneas celulares) — alerta roja que puede indicar falla de médula ósea, aplasia medular, leucemia o efecto grave de medicamentos/quimioterapia",
    "Síndrome mielodisplásico — alteraciones en la forma y maduración de las células sanguíneas, más común en adultos mayores",
    "Monitoreo de quimioterapia y radioterapia — permite saber cuándo es seguro dar el siguiente ciclo de tratamiento según la recuperación de leucocitos y plaquetas"
];

data[idx].detailedPreparation = [
    "Ayuno de 8 a 12 horas antes de la toma de muestra — puedes tomar agua simple, pero NO jugos, café, leche ni alimentos sólidos. El ayuno evita que la grasa de los alimentos interfiera con los analizadores",
    "No fumar al menos 2 horas antes — la nicotina provoca una elevación temporal de leucocitos y puede alterar la cuenta diferencial, dando un resultado falsamente elevado",
    "Informar TODOS los medicamentos que toma actualmente al momento de la toma: anticoagulantes (warfarina, clopidogrel, rivaroxabán), antiinflamatorios (ibuprofeno, naproxeno, aspirina), antibióticos, quimioterapia y suplementos de hierro — todos pueden afectar los resultados",
    "Evitar ejercicio intenso las 24 horas previas — correr, ir al gimnasio o actividad física intensa puede elevar temporalmente los leucocitos hasta un 50% y alterar la fórmula diferencial",
    "Presentarse preferentemente en la mañana entre 7:00 y 10:00 am — los valores hematológicos tienen variación circadiana (cambian durante el día), y los rangos de referencia están calibrados para muestras matutinas",
    "Si ha recibido una transfusión de sangre en los últimos 7 días, informar la fecha exacta — los glóbulos rojos transfundidos alteran los conteos y los índices eritrocitarios durante semanas",
    "Mujeres: informar si están en período menstrual — la menstruación puede causar una disminución leve de hemoglobina que es fisiológica y no patológica"
];

data[idx].benefits = [
    "Panorama integral de tu salud en un solo estudio — con más de 20 parámetros analizados, ninguna otra prueba ofrece tanta información diagnóstica de una sola muestra",
    "Detecta simultáneamente anemia, infecciones, leucemia, problemas de coagulación, parasitosis, alergias y enfermedades de la médula ósea — ahorrándote múltiples estudios por separado",
    "Permite clasificar exactamente QUÉ TIPO de anemia tienes (ferropénica, megaloblástica, hemolítica) para que el tratamiento sea el correcto desde el primer día",
    "Es indispensable para monitorear tratamientos oncológicos — tu médico necesita esta información antes de cada ciclo de quimioterapia para decidir si es seguro continuar",
    "Resultados disponibles el mismo día en nuestro laboratorio — en muchos laboratorios tardan 24-48 horas, aquí los tienes antes de la consulta",
    "El estudio con mejor relación costo-beneficio en toda la medicina de laboratorio — económico, rápido y con poder diagnóstico que ningún otro estudio individual puede igualar"
];

data[idx].faqs = [
    { question: "¿Necesito ayuno para la Biometría Hemática?", answer: "Sí, se recomienda ayuno de 8 a 12 horas para obtener resultados óptimos. Aunque en casos de urgencia se puede realizar sin ayuno, el ayuno asegura que la grasa de los alimentos no interfiera con los analizadores automáticos y que los valores de leucocitos no estén alterados por la respuesta digestiva. Durante el ayuno SÍ puedes tomar agua simple." },
    { question: "¿Qué pasa si mis glóbulos blancos (leucocitos) salen altos?", answer: "Una elevación de leucocitos (leucocitosis) casi siempre significa que tu cuerpo está combatiendo algo. El tipo de glóbulo blanco elevado es clave para el diagnóstico: neutrófilos altos generalmente indican infección bacteriana (neumonía, infección urinaria, apendicitis); linfocitos altos sugieren infección viral (gripe, mononucleosis, COVID); eosinófilos altos apuntan a parásitos o alergias severas. En casos raros con conteos extremadamente altos (>50,000) y células inmaduras, se investiga leucemia. Siempre lleva tus resultados a tu médico para interpretación en contexto." },
    { question: "¿Cuál es la diferencia entre hemoglobina baja y hematocrito bajo? ¿Los dos significan anemia?", answer: "La hemoglobina es la proteína dentro del glóbulo rojo que carga el oxígeno — se mide en gramos por decilitro (g/dL). El hematocrito es el porcentaje de tu sangre que ocupan los glóbulos rojos. Ambos bajan en anemia, pero no siempre van de la mano: puedes tener hematocrito elevado por deshidratación (la sangre se concentra) sin tener anemia real. Por eso el médico siempre los interpreta juntos con el VCM y la HCM para determinar si realmente hay anemia y de qué tipo es." },
    { question: "¿Cada cuánto debo hacerme una Biometría Hemática?", answer: "Depende de tu situación: personas sanas sin síntomas, al menos una vez al año como parte de un chequeo general. Mujeres con menstruación abundante, cada 6 meses para vigilar anemia. Embarazadas, en cada trimestre (semanas 12, 24 y 36 aproximadamente). Pacientes con anemia en tratamiento con hierro, cada 4-8 semanas para medir respuesta. Pacientes en quimioterapia, antes de cada ciclo (puede ser semanal). Personas con enfermedades crónicas (diabetes, insuficiencia renal, VIH), cada 3-6 meses según indique tu médico." },
    { question: "¿La Biometría Hemática detecta cáncer?", answer: "No diagnostica cáncer por sí sola, pero puede dar señales de alarma muy importantes. Leucocitos extremadamente altos o bajos, presencia de células inmaduras (blastos), disminución simultánea de glóbulos rojos, blancos y plaquetas (pancitopenia), o morfología anormal de las células son hallazgos que llevan al médico a solicitar estudios más especializados como frotis de sangre periférica, biopsia de médula ósea o citometría de flujo. Muchas leucemias se sospechan inicialmente por una Biometría Hemática de rutina." }
];

const price = data[idx].pricePromotional || data[idx].priceRegular;
data[idx].metaDescription = `Biometría Hemática (hemograma completo) desde $${Math.round(price)} MXN en Laboratorio Del Bienestar, Tizayuca. Analiza glóbulos rojos, blancos y plaquetas. Detecta anemia, infecciones, leucemia y problemas de coagulación. Resultados el mismo día.`;

fs.writeFileSync('./src/data/studies.json', JSON.stringify(data));
console.log('✅ studies.json actualizado — BIOMETRÍA HEMÁTICA V2 (profunda)');
console.log('Descripción:', data[idx].description.length, 'chars');
console.log('¿Qué es?:', data[idx].whatIsIt.length, 'chars');
console.log('¿Qué detecta?:', data[idx].whatDoesItDetect.length, 'items');
console.log('Preparación:', data[idx].detailedPreparation.length, 'items');
console.log('Beneficios:', data[idx].benefits.length, 'items');
console.log('FAQs:', data[idx].faqs.length, 'items');
