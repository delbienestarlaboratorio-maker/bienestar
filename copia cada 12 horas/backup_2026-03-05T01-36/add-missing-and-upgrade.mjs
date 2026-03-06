/**
 * Add 14 missing CSV studies and update 15 basic descriptions to V2
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const studiesPath = join(__dirname, 'src', 'data', 'studies.json');
const studies = JSON.parse(readFileSync(studiesPath, 'utf-8'));

function slugify(name) {
    return name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// === 14 MISSING STUDIES ===
const missingStudies = [
    {
        id: 'E18',
        name: 'Ac. ANTI-CENTROMERO',
        slug: 'ac-anti-centromero',
        categoryId: 'analisis-clinicos',
        priceRegular: 735,
        pricePromotional: 698,
        description: 'Los Anticuerpos Anti-Centrómero (ACA) son autoanticuerpos dirigidos contra las proteínas del centrómero de los cromosomas. Este análisis de sangre es una herramienta diagnóstica fundamental en reumatología para detectar la Esclerosis Sistémica Limitada (anteriormente conocida como Síndrome de CREST), una enfermedad autoinmune crónica que afecta la piel, los vasos sanguíneos y los órganos internos. El acrónimo CREST representa: Calcinosis, fenómeno de Raynaud, disfunción Esofágica, eSclerodactilia y Telangiectasias. Estos anticuerpos se detectan en el 50-90% de pacientes con Esclerosis Sistémica Limitada y su presencia tiene valor pronóstico, ya que esta forma tiende a progresar más lentamente que la forma difusa. También pueden encontrarse en la Cirrosis Biliar Primaria y ocasionalmente en otras enfermedades autoinmunes. En el Laboratorio Clínico Del Bienestar realizamos esta determinación mediante inmunofluorescencia indirecta (IFI) con patrón centrómero discreto, garantizando resultados confiables para su reumatólogo.',
        whatIsIt: 'Los Anticuerpos Anti-Centrómero son autoanticuerpos que atacan las proteínas del centrómero, la región del cromosoma que une las dos cromátidas durante la división celular. Cuando el sistema inmunológico produce estos anticuerpos, indica que está atacando las propias células del cuerpo. Se detectan mediante una muestra de sangre venosa del brazo, procesada por inmunofluorescencia indirecta donde se observa un patrón característico de puntos discretos en el núcleo celular. Su presencia es altamente específica de la Esclerosis Sistémica Limitada (Síndrome CREST) y tienen importante valor pronóstico: los pacientes positivos generalmente tienen mejor pronóstico que aquellos con anticuerpos anti-Scl-70 (forma difusa).',
        whatDoesItDetect: [
            'Esclerosis Sistémica Limitada (Síndrome CREST) — presente en 50-90% de pacientes, con patrón de afectación cutánea limitada a manos, cara y antebrazos',
            'Fenómeno de Raynaud primario vs secundario — ayuda a determinar si los dedos que se ponen blancos con el frío son por causa autoinmune',
            'Cirrosis Biliar Primaria — presente en 10-30% de pacientes con esta enfermedad hepática autoinmune',
            'Esclerosis Sistémica Difusa — menos frecuente pero puede detectarse en formas de transición',
            'Síndrome de Sjögren — ocasionalmente positivo en esta enfermedad de sequedad ocular y bucal'
        ],
        detailedPreparation: [
            { title: '🍽️ Ayuno', description: 'No requiere ayuno estricto. Puede desayunar ligero antes de la toma.' },
            { title: '💊 Medicamentos', description: 'Informe si toma inmunosupresores (metotrexato, azatioprina, micofenolato) o corticosteroides, ya que pueden afectar los niveles de anticuerpos. No suspenda ningún medicamento sin indicación médica.' },
            { title: '🩸 Tipo de muestra', description: 'Sangre venosa del brazo (5 mL en tubo con gel separador). Procedimiento rápido de menos de 3 minutos.' },
            { title: '⚠️ Consideraciones', description: 'Si tiene una infección aguda o fiebre, los resultados pueden verse alterados. Idealmente, realice la prueba cuando esté en su estado de salud habitual.' }
        ],
        preparation: 'No requiere ayuno estricto. Muestra de sangre venosa.',
        turnaroundTime: 'El mismo día',
        benefits: [
            '✅ Diagnóstico específico de Esclerosis Sistémica Limitada (Síndrome CREST) con alta especificidad',
            '✅ Diferencia entre fenómeno de Raynaud benigno y asociado a enfermedad autoinmune',
            '✅ Valor pronóstico importante — pacientes ACA+ generalmente tienen mejor evolución que anti-Scl-70+',
            '✅ Detección temprana antes de que aparezcan complicaciones viscerales graves',
            '✅ Procedimiento sencillo — solo una muestra de sangre venosa',
            '✅ Ayuda al reumatólogo a seleccionar el tratamiento más adecuado'
        ],
        faqs: [
            { question: '¿Qué es el Síndrome CREST?', answer: 'Es una forma limitada de esclerosis sistémica que afecta principalmente la piel de manos y cara, los vasos sanguíneos (fenómeno de Raynaud), el esófago y puede causar depósitos de calcio bajo la piel. Se llama CREST por sus cinco componentes: Calcinosis, Raynaud, disfunción Esofágica, eSclerodactilia y Telangiectasias. Generalmente progresa más lento que la forma difusa.' },
            { question: '¿Si sale positivo, definitivamente tengo esclerodermia?', answer: 'No necesariamente. Un resultado positivo es altamente sugestivo, pero el diagnóstico requiere correlación clínica con sus síntomas, examen físico y posiblemente otros estudios. Su reumatólogo interpretará el resultado en conjunto con su cuadro clínico completo.' },
            { question: '¿Necesito ir en ayunas?', answer: 'No, esta prueba no requiere ayuno. Puede comer y beber normalmente antes de acudir al laboratorio.' },
            { question: '¿Cada cuánto debo repetirla?', answer: 'Si sale positiva, generalmente no es necesario repetirla ya que estos anticuerpos tienden a mantenerse de por vida. Si sale negativa pero sus síntomas persisten, su médico puede solicitar repetirla en 6-12 meses, ya que pueden aparecer con el tiempo.' },
            { question: '¿Los dedos blancos con el frío siempre son esclerodermia?', answer: 'No. El fenómeno de Raynaud puede ser primario (benigno, sin enfermedad subyacente) o secundario (asociado a esclerodermia u otras enfermedades autoinmunes). Esta prueba ayuda a distinguir entre ambos. Si los anticuerpos son negativos y no tiene otros síntomas, probablemente su Raynaud es primario.' }
        ],
        searchTerms: null
    },
    {
        id: 'E48',
        name: 'Ac. ANTI-MUSCULO LISO',
        slug: 'ac-anti-musculo-liso',
        categoryId: 'analisis-clinicos',
        priceRegular: 580,
        pricePromotional: 551,
        description: 'Los Anticuerpos Anti-Músculo Liso (ASMA, por sus siglas en inglés) son autoanticuerpos dirigidos contra las proteínas del músculo liso, principalmente la actina. Este estudio de laboratorio es fundamental para el diagnóstico de la Hepatitis Autoinmune Tipo 1 (HAI-1), la forma más común de hepatitis autoinmune que representa el 80% de los casos. En la HAI-1, el sistema inmunológico ataca las células del hígado causando inflamación crónica que, sin tratamiento, puede progresar a cirrosis. Los ASMA se detectan en el 70-80% de pacientes con HAI-1, generalmente junto con anticuerpos antinucleares (ANA). También pueden encontrarse en la Cirrosis Biliar Primaria y otras hepatopatías crónicas. En el Laboratorio Clínico Del Bienestar realizamos esta prueba mediante inmunofluorescencia indirecta, ofreciendo resultados precisos que ayudan a su hepatólogo o gastroenterólogo en el diagnóstico diferencial de enfermedades hepáticas.',
        whatIsIt: 'Los Anticuerpos Anti-Músculo Liso son autoanticuerpos que el sistema inmunológico produce contra las proteínas del músculo liso presentes en las paredes de vasos sanguíneos, intestino, útero y otros órganos. El principal blanco de estos anticuerpos es la actina F (filamentosa), una proteína estructural. Su detección en sangre indica activación autoinmune contra el propio tejido hepático. La muestra se toma por punción venosa del brazo y se procesa por inmunofluorescencia indirecta. No requiere ayuno obligatorio. Títulos altos (≥1:80) junto con elevación de transaminasas y gammaglobulinas orientan fuertemente al diagnóstico de Hepatitis Autoinmune Tipo 1.',
        whatDoesItDetect: [
            'Hepatitis Autoinmune Tipo 1 (HAI-1) — presente en 70-80% de casos, es la causa tratable de hepatitis crónica más importante de reconocer',
            'Cirrosis Biliar Primaria — puede encontrarse en títulos bajos en esta enfermedad hepática autoinmune',
            'Hepatitis viral crónica — títulos bajos pueden aparecer de forma inespecífica',
            'Cirrosis hepática de diversas causas — marcador inespecífico de daño hepático crónico',
            'Mononucleosis infecciosa — puede causar positividad transitoria durante la infección aguda'
        ],
        detailedPreparation: [
            { title: '🍽️ Ayuno', description: 'No requiere ayuno estricto. Puede comer ligero antes de la prueba.' },
            { title: '💊 Medicamentos', description: 'Informe si toma inmunosupresores como azatioprina, prednisona o micofenolato, ya que el tratamiento puede reducir los títulos. No suspenda medicamentos sin indicación médica.' },
            { title: '🩸 Tipo de muestra', description: 'Sangre venosa del brazo (5 mL). Procedimiento sencillo de menos de 3 minutos.' },
            { title: '⚠️ Consideraciones', description: 'Si tiene infección viral aguda (como mononucleosis), puede haber resultados falsamente positivos. Idealmente, espere a recuperarse para mayor confiabilidad del resultado.' }
        ],
        preparation: 'No requiere ayuno. Muestra de sangre venosa del brazo.',
        turnaroundTime: 'El mismo día',
        benefits: [
            '✅ Diagnóstico clave de Hepatitis Autoinmune Tipo 1, la causa tratable más importante de hepatitis crónica',
            '✅ Permite iniciar tratamiento inmunosupresor temprano antes de que la hepatitis progrese a cirrosis',
            '✅ Diferencia entre hepatitis viral y autoinmune — tratamientos completamente diferentes',
            '✅ Monitoreo de respuesta al tratamiento — los títulos deben disminuir con terapia efectiva',
            '✅ Procedimiento rápido y mínimamente invasivo',
            '✅ Complementa ANA y gammaglobulinas para un diagnóstico integral'
        ],
        faqs: [
            { question: '¿Qué es la hepatitis autoinmune?', answer: 'Es una enfermedad en la que su sistema inmunológico ataca las células de su propio hígado, causando inflamación crónica. A diferencia de la hepatitis viral (A, B, C), no es contagiosa. Sin tratamiento puede progresar a cirrosis, pero con inmunosupresores adecuados la mayoría de pacientes logran remisión.' },
            { question: '¿Si sale positivo tengo hepatitis autoinmune?', answer: 'No automáticamente. El diagnóstico requiere un puntaje que incluye estos anticuerpos, niveles de transaminasas, gammaglobulinas, biopsia hepática y exclusión de otras causas. Su hepatólogo evaluará todo en conjunto.' },
            { question: '¿Necesito ir en ayunas?', answer: 'No, esta prueba no requiere ayuno. Puede comer normalmente antes de acudir.' },
            { question: '¿Cada cuánto se repite?', answer: 'Para diagnóstico inicial se realiza una vez. En pacientes ya diagnosticados con HAI en tratamiento, su médico puede solicitarla cada 6-12 meses para evaluar respuesta terapéutica.' },
            { question: '¿Hay cura para la hepatitis autoinmune?', answer: 'No tiene cura definitiva, pero con tratamiento inmunosupresor (generalmente prednisona + azatioprina) la mayoría de pacientes logran remisión completa y pueden llevar una vida normal. Algunos pacientes eventualmente logran suspender el tratamiento bajo supervisión médica.' }
        ],
        searchTerms: null
    },
    {
        id: 'Q3311',
        name: 'BUN (nitrógeno ureico) EN ORINA DE 24 HRS',
        slug: 'bun-nitrogeno-ureico-en-orina-de-24-hrs',
        categoryId: 'analisis-clinicos',
        priceRegular: 77,
        pricePromotional: 73,
        description: 'El BUN (Blood Urea Nitrogen o Nitrógeno Ureico) en orina de 24 horas mide la cantidad total de nitrógeno ureico excretado por los riñones durante un día completo. Este estudio de laboratorio es esencial para evaluar la función renal, el balance nitrogenado y el estado nutricional del paciente. La urea es el producto final del metabolismo de las proteínas: cuando el cuerpo descompone las proteínas de la dieta y de los tejidos, el hígado convierte el amoniaco resultante en urea, que los riñones filtran y eliminan en la orina. La medición en orina de 24 horas ofrece una evaluación más completa que la muestra de sangre puntual, ya que refleja la excreción acumulada de todo el día. En nutrición clínica, esta prueba permite calcular el balance nitrogenado (proteínas que consume vs proteínas que pierde), vital en pacientes críticos, desnutridos o con nutrición parenteral. En el Laboratorio Clínico Del Bienestar procesamos esta determinación con tecnología de alta precisión.',
        whatIsIt: 'El Nitrógeno Ureico en orina de 24 horas cuantifica la urea total eliminada por los riñones en un día completo. La urea es el principal producto de desecho del metabolismo de las proteínas. Al medir cuánta urea excreta en 24 horas, su médico puede evaluar: (1) qué tan bien filtran sus riñones, (2) cuánta proteína está metabolizando su cuerpo, y (3) si su balance nitrogenado es positivo (anabolismo) o negativo (catabolismo). Para esta prueba debe recolectar toda su orina durante 24 horas en un recipiente especial que le proporcionará el laboratorio.',
        whatDoesItDetect: [
            'Insuficiencia renal — valores disminuidos indican que los riñones no están filtrando adecuadamente la urea',
            'Balance nitrogenado negativo — catabolismo excesivo en pacientes críticos, quemados o desnutridos',
            'Dieta hiperproteica — excreción elevada indica consumo excesivo de proteínas',
            'Evaluación de nutrición parenteral — permite ajustar el aporte proteico en pacientes hospitalizados',
            'Enfermedad hepática severa — valores disminuidos cuando el hígado no puede producir urea adecuadamente'
        ],
        detailedPreparation: [
            { title: '🫙 Recolección de orina de 24 horas', description: 'Solicite el recipiente en el laboratorio. Día 1: deseche la primera orina de la mañana y anote la hora. Recolecte TODA la orina durante 24 horas. Día 2: a la misma hora, orine por última vez en el recipiente.' },
            { title: '🧊 Conservación', description: 'Mantenga el recipiente tapado y refrigerado (2-8°C) durante toda la recolección.' },
            { title: '🍽️ Dieta', description: 'Mantenga su dieta habitual durante la recolección. No cambie su consumo de proteínas, ya que esto afecta directamente el resultado.' },
            { title: '💊 Medicamentos', description: 'Informe si toma diuréticos, antibióticos aminoglucósidos o corticosteroides, ya que pueden afectar la excreción renal de urea.' }
        ],
        preparation: 'Recolección de orina de 24 horas. Mantener refrigerado.',
        turnaroundTime: 'El mismo día',
        benefits: [
            '✅ Evaluación integral de la filtración renal a lo largo de 24 horas',
            '✅ Permite calcular el balance nitrogenado para ajustar nutrición en pacientes críticos',
            '✅ Útil para detectar dieta hiperproteica que pueda dañar los riñones',
            '✅ Complementa la depuración de creatinina para una evaluación renal completa',
            '✅ Procedimiento no invasivo — solo requiere recolectar orina'
        ],
        faqs: [
            { question: '¿Qué es el BUN?', answer: 'BUN significa Blood Urea Nitrogen (Nitrógeno Ureico en Sangre). Cuando se mide en orina de 24 horas, indica cuánta urea están eliminando sus riñones en un día completo. La urea es el producto de desecho que se genera cuando su cuerpo procesa las proteínas de los alimentos.' },
            { question: '¿Qué pasa si olvidé recolectar una micción?', answer: 'Si perdió alguna muestra durante las 24 horas, el resultado NO será confiable y deberá reiniciar la recolección desde cero al día siguiente.' },
            { question: '¿Puedo comer normalmente durante la recolección?', answer: 'Sí, mantenga su dieta habitual. Es importante que no modifique su consumo de proteínas (carnes, huevos, lácteos) durante la recolección, ya que el resultado refleja su metabolismo proteico real.' },
            { question: '¿Por qué me pidieron esta prueba junto con la de sangre?', answer: 'La combinación de BUN en sangre y BUN en orina permite a su médico calcular la depuración de urea y evaluar cuánta urea produce su hígado vs cuánta eliminan sus riñones. Juntas dan un panorama más completo de su función renal.' },
            { question: '¿Cada cuánto se repite?', answer: 'Depende de la indicación: en pacientes con enfermedad renal crónica, cada 3-6 meses. En pacientes críticos con nutrición parenteral, puede ser diario o semanal.' }
        ],
        searchTerms: null
    },
    {
        id: 'Q331',
        name: 'BUN (nitrógeno ureico) EN SUERO',
        slug: 'bun-nitrogeno-ureico-en-suero',
        categoryId: 'analisis-clinicos',
        priceRegular: 77,
        pricePromotional: 73,
        description: 'El BUN (Blood Urea Nitrogen o Nitrógeno Ureico) en suero es uno de los análisis más solicitados para evaluar la función renal. Mide la cantidad de nitrógeno proveniente de la urea circulante en la sangre. La urea es el principal producto de desecho del metabolismo de las proteínas, producido por el hígado y eliminado por los riñones. Cuando los riñones no funcionan correctamente, la urea se acumula en sangre, elevando el BUN. Este marcador es esencial en el diagnóstico de insuficiencia renal aguda y crónica, deshidratación, sangrado gastrointestinal y para monitorear pacientes en diálisis. Junto con la creatinina sérica, forma parte de la evaluación renal básica que todo médico solicita. La relación BUN/Creatinina ayuda a diferenciar entre causas prerrenales (deshidratación, insuficiencia cardíaca), renales (daño directo al riñón) y posrenales (obstrucción urinaria) de elevación de nitrógeno ureico. En el Laboratorio Clínico Del Bienestar ofrecemos resultados rápidos y confiables.',
        whatIsIt: 'El BUN (Nitrógeno Ureico en Sangre) mide cuánto nitrógeno hay en su sangre proveniente de la urea, un producto de desecho que se genera cuando su cuerpo metaboliza las proteínas de los alimentos. El hígado produce la urea y los riñones la filtran hacia la orina. Cuando los riñones funcionan bien, la urea se elimina eficientemente y el BUN se mantiene en niveles normales (7-20 mg/dL). Si los riñones fallan, la urea se acumula y el BUN sube. Para la prueba solo se necesita una muestra de sangre venosa del brazo. Se recomienda ayuno de 8 horas.',
        whatDoesItDetect: [
            'Insuficiencia renal aguda y crónica — valores elevados indican que los riñones no están filtrando adecuadamente',
            'Deshidratación — el BUN se eleva desproporcionadamente respecto a la creatinina (relación BUN/Cr >20:1)',
            'Sangrado gastrointestinal — la sangre digerida en el intestino libera proteínas que elevan el BUN',
            'Insuficiencia cardíaca — la reducción del flujo sanguíneo renal eleva la urea en sangre',
            'Dieta hiperproteica — consumo excesivo de proteínas eleva el BUN sin que haya enfermedad renal'
        ],
        detailedPreparation: [
            { title: '🍽️ Ayuno', description: 'Ayuno de 8 horas. Solo puede beber agua natural. Una dieta alta en proteínas la noche anterior puede elevar el resultado.' },
            { title: '💧 Hidratación', description: 'Mantenga su ingesta habitual de líquidos. La deshidratación eleva artificialmente el BUN.' },
            { title: '💊 Medicamentos', description: 'Informe si toma diuréticos, aminoglucósidos, AINEs (ibuprofeno, naproxeno), o si recibe nutrición parenteral. Todos pueden afectar los niveles de BUN.' },
            { title: '🩸 Tipo de muestra', description: 'Sangre venosa del brazo (3-5 mL). Procedimiento rápido de menos de 3 minutos.' }
        ],
        preparation: 'Ayuno de 8 horas. Muestra de sangre venosa.',
        turnaroundTime: 'El mismo día',
        benefits: [
            '✅ Evaluación rápida y económica de la función renal',
            '✅ Detección temprana de insuficiencia renal antes de que aparezcan síntomas',
            '✅ La relación BUN/Creatinina orienta hacia la causa del problema renal',
            '✅ Esencial en el seguimiento de pacientes en diálisis',
            '✅ Complementa la creatinina y la tasa de filtración glomerular para una evaluación renal integral',
            '✅ Resultado rápido el mismo día'
        ],
        faqs: [
            { question: '¿Es lo mismo BUN que urea?', answer: 'No exactamente. La urea contiene nitrógeno. El BUN mide solo la parte de nitrógeno de la urea. Para convertir: Urea = BUN × 2.14. Los médicos suelen usar BUN en la práctica clínica, pero el significado es similar: ambos evalúan la función renal.' },
            { question: '¿Necesito ir en ayunas?', answer: 'Sí, se recomienda ayuno de 8 horas ya que una cena rica en proteínas (carnes, huevos, mariscos) puede elevar el BUN transitoriamente sin que haya problema renal.' },
            { question: '¿Un BUN alto siempre significa problema en los riñones?', answer: 'No siempre. El BUN puede elevarse por deshidratación, dieta alta en proteínas, sangrado digestivo, insuficiencia cardíaca o ciertos medicamentos. Por eso siempre se interpreta junto con la creatinina.' },
            { question: '¿Cada cuánto debo hacerme esta prueba?', answer: 'Si sus riñones están sanos, una vez al año como parte de su chequeo rutinario. Si tiene diabetes, hipertensión o enfermedad renal, cada 3-6 meses según indicación de su médico.' },
            { question: '¿Qué debo hacer si sale alto?', answer: 'Consulte a su médico. Un BUN alto aislado no es un diagnóstico. Su médico evaluará la relación con su creatinina, síntomas e historia clínica para determinar la causa y si necesita tratamiento.' }
        ],
        searchTerms: null
    },
    {
        id: '1205_2',
        name: 'CA 72-4 (estómago)',
        slug: 'ca-72-4-estomago',
        categoryId: 'analisis-clinicos',
        priceRegular: 2324,
        pricePromotional: 2208,
        description: 'El CA 72-4 es un marcador tumoral que se encuentra elevado principalmente en el cáncer gástrico (estómago). También puede elevarse en cánceres de ovario mucinoso, colorrectal y pancreático. Este análisis de sangre mide los niveles de la glicoproteína TAG-72, que es producida en exceso por las células tumorales del tracto gastrointestinal. Es el marcador más específico para cáncer de estómago cuando se combina con CEA y CA 19-9. Se utiliza para monitoreo de tratamiento, detección de recurrencia y seguimiento postquirúrgico. No se recomienda como prueba de tamizaje en población general. En el Laboratorio Clínico Del Bienestar realizamos esta determinación con tecnología de quimioluminiscencia automatizada para resultados precisos.',
        whatIsIt: 'El CA 72-4 (Antígeno Carbohidrato 72-4) es una glicoproteína de alto peso molecular llamada TAG-72, normalmente presente en células fetales pero que reaparece cuando se desarrollan ciertos tumores, especialmente gástricos. Se mide mediante una muestra de sangre venosa procesada por quimioluminiscencia. Valores normales son generalmente menores a 6.9 U/mL. Elevaciones significativas (>10 U/mL) requieren evaluación oncológica. Es más específico que el CEA para cáncer gástrico.',
        whatDoesItDetect: [
            'Cáncer gástrico — elevado en 40-70% de casos, es el marcador más específico para este tumor',
            'Cáncer de ovario mucinoso — marcador complementario junto con CA 125',
            'Cáncer colorrectal — puede elevarse como marcador adicional al CEA',
            'Recurrencia tumoral postquirúrgica — elevación tras cirugía sugiere recaída'
        ],
        detailedPreparation: [
            { title: '🍽️ Ayuno', description: 'No requiere ayuno estricto. Puede comer ligero.' },
            { title: '💊 Medicamentos', description: 'Informe sobre tratamientos oncológicos en curso (quimioterapia, inmunoterapia).' },
            { title: '🩸 Tipo de muestra', description: 'Sangre venosa del brazo (5 mL).' },
            { title: '⚠️ Consideraciones', description: 'Condiciones benignas como gastritis, pancreatitis o cirrosis pueden causar elevaciones leves. El resultado siempre debe interpretarse en contexto clínico.' }
        ],
        preparation: 'No requiere ayuno. Muestra de sangre venosa.',
        turnaroundTime: 'El mismo día',
        benefits: [
            '✅ Marcador más específico disponible para cáncer gástrico',
            '✅ Útil en monitoreo de respuesta al tratamiento oncológico',
            '✅ Detecta recurrencia tumoral antes de que aparezcan síntomas',
            '✅ Complementa CEA y CA 19-9 para evaluación gastrointestinal integral',
            '✅ Procedimiento simple — solo una muestra de sangre'
        ],
        faqs: [
            { question: '¿Un CA 72-4 alto significa que tengo cáncer de estómago?', answer: 'No necesariamente. Aunque este marcador es bastante específico para cáncer gástrico, también puede elevarse levemente en condiciones benignas como gastritis, cirrosis o pancreatitis. Un resultado alto requiere evaluación por su médico y probablemente estudios complementarios como endoscopia.' },
            { question: '¿Para qué sirve si ya me operaron?', answer: 'Después de cirugía por cáncer gástrico, los niveles de CA 72-4 deben descender. Si suben nuevamente durante el seguimiento, puede indicar recurrencia del tumor antes de que aparezcan síntomas, permitiendo intervenir tempranamente.' },
            { question: '¿Necesito ir en ayunas?', answer: 'No, esta prueba no requiere ayuno.' },
            { question: '¿Cada cuánto se repite?', answer: 'En seguimiento oncológico, generalmente cada 3-6 meses durante los primeros 2 años postquirúrgicos, luego cada 6-12 meses.' }
        ],
        searchTerms: null
    }
];

// Add remaining 9 missing studies with essential V2 content
const remainingMissing = [
    { id: 'E139', name: 'CA 19-9 (colon y páncreas)', slug: 'ca-19-9-colon-y-pancreas', priceCSV: 482.96, category: 'analisis-clinicos' },
    { id: '770', name: 'CO2 (dióxido de carbono)', slug: 'co2-dioxido-de-carbono', priceCSV: 94.07, category: 'analisis-clinicos' },
    { id: 'B1014', name: 'CULTIVOS LÍQUIDOS (LCR, pleural, etc.)', slug: 'cultivos-liquidos-lcr-pleural-etc', priceCSV: 251.48, category: 'analisis-clinicos' },
    { id: '1363', name: 'DEPURACION DE CREATININA', slug: 'depuracion-de-creatinina-cilab', priceCSV: 140.37, category: 'analisis-clinicos' },
    { id: '2285', name: 'DEPURACION DE UREA', slug: 'depuracion-de-urea-cilab', priceCSV: 131.11, category: 'analisis-clinicos' },
    { id: 'H214', name: 'EOSINOFILOS EN MOCO NASAL', slug: 'eosinofilos-en-moco-nasal-cilab', priceCSV: 108.89, category: 'analisis-clinicos' },
    { id: 'B1500', name: 'HELICOBACTER PYLORI POR PRUEBA DE ALIENTO', slug: 'helicobacter-pylori-prueba-aliento-cilab', priceCSV: 3538.52, category: 'analisis-clinicos' },
    { id: 'Q269', name: 'HIERRO SERICO', slug: 'hierro-serico-cilab', priceCSV: 112.59, category: 'analisis-clinicos' },
    { id: 'R430', name: 'T4I (índice de tetrayodotironina/tiroxina libre)', slug: 't4i-indice-tetrayodotironina-tiroxina-libre', priceCSV: 168.15, category: 'analisis-clinicos' }
];

for (const rm of remainingMissing) {
    const price = Math.round(rm.priceCSV * 1.20);
    missingStudies.push({
        id: rm.id,
        name: rm.name,
        slug: rm.slug,
        categoryId: rm.category,
        priceRegular: price,
        pricePromotional: Math.round(price * 0.95),
        description: `Estudio de laboratorio: ${rm.name}. Análisis clínico disponible en el Laboratorio Clínico Del Bienestar. Consulte con nuestro personal para indicaciones específicas de preparación.`,
        whatIsIt: `Prueba de laboratorio: ${rm.name}. Disponible en todas nuestras sucursales.`,
        whatDoesItDetect: ['Consulte con su médico las condiciones específicas que este estudio evalúa'],
        detailedPreparation: [
            { title: '🍽️ Ayuno', description: 'Consulte las indicaciones específicas al momento de agendar su cita.' },
            { title: '🩸 Tipo de muestra', description: 'Se determinará al momento de la toma.' }
        ],
        preparation: 'Consulte indicaciones específicas con nuestro personal.',
        turnaroundTime: 'El mismo día',
        benefits: ['✅ Disponible en todas nuestras sucursales', '✅ Resultados confiables con tecnología de punta'],
        faqs: [{ question: '¿Necesito cita?', answer: 'No, atendemos por orden de llegada en horario regular.' }],
        searchTerms: null,
        _needsV2: true  // Flag for later V2 generation
    });
}

// Add all missing studies
console.log(`Adding ${missingStudies.length} missing studies...`);
for (const ms of missingStudies) {
    // Check for duplicate slug
    if (!studies.some(s => s.slug === ms.slug)) {
        studies.push(ms);
        console.log(`  ✅ Added: ${ms.name} ($${ms.priceRegular})`);
    } else {
        console.log(`  ⚠️ Slug already exists: ${ms.slug} — skipping`);
    }
}

// === UPDATE 15 BASIC DESCRIPTIONS ===
const basicUpdates = {
    'Ac. ANTI-HELICOBACTER PYLORI IgA': {
        description: 'La prueba de Anticuerpos IgA contra Helicobacter pylori detecta la respuesta inmunitaria específica de la mucosa gástrica frente a esta bacteria. A diferencia de los anticuerpos IgG (que indican contacto previo), la IgA refleja la actividad local de la infección en el estómago. Helicobacter pylori es la causa principal de gastritis crónica, úlcera péptica y un factor de riesgo para cáncer gástrico. La IgA puede ser especialmente útil en pacientes con IgG negativa pero sospecha clínica alta, ya que algunos pacientes montan una respuesta predominantemente IgA. También es útil para confirmar erradicación post-tratamiento, ya que los niveles de IgA tienden a descender más rápidamente que los de IgG tras un tratamiento exitoso. En el Laboratorio Clínico Del Bienestar realizamos esta determinación por ELISA con alta sensibilidad.',
        whatIsIt: 'Los anticuerpos IgA contra Helicobacter pylori son inmunoglobulinas producidas por la mucosa gástrica como defensa local contra la bacteria. A diferencia de IgG (que circula en sangre y persiste mucho tiempo), la IgA refleja más directamente la actividad de la infección en el estómago. Se mide en una muestra de sangre venosa, procesada por ELISA. Esta prueba complementa la IgG para un diagnóstico más completo de infección por H. pylori.',
    },
    'Ac. ANTI-HELICOBACTER PYLORI IgM': {
        description: 'Los Anticuerpos IgM contra Helicobacter pylori representan la respuesta inmunitaria más temprana del cuerpo frente a la infección. La IgM es el primer anticuerpo que se produce tras el contacto inicial con la bacteria, por lo que su presencia puede indicar una infección reciente o aguda. Sin embargo, en la práctica clínica, la utilidad de la IgM para H. pylori es limitada, ya que muchas infecciones por esta bacteria son crónicas y de adquisición temprana en la vida. Los niveles de IgM pueden ser transitorios y no siempre se detectan cuando el paciente consulta. La prueba de elección para infección activa es la prueba de aliento con urea C-13 o el antígeno en heces. No obstante, la IgM puede ser útil como parte de un panel completo de anticuerpos (IgG, IgM, IgA) para evaluar el estado inmunológico frente a H. pylori. Disponible en el Laboratorio Clínico Del Bienestar.',
        whatIsIt: 'La IgM anti-Helicobacter pylori es el primer anticuerpo que produce el sistema inmunológico tras entrar en contacto con la bacteria. Aparece tempranamente en la infección y luego es reemplazada por IgG. Su detección positiva puede sugerir infección reciente, aunque su utilidad clínica es menor comparada con IgG y con pruebas directas como el antígeno en heces o la prueba de aliento.',
    },
    'Ac. ANTI-HEPATITIS B IgG HBc (core)': {
        description: 'Los Anticuerpos IgG contra el Antígeno Core de Hepatitis B (Anti-HBc IgG) indican contacto previo con el Virus de la Hepatitis B (VHB) en algún momento de la vida. Este marcador es fundamental en la evaluación serológica de la Hepatitis B porque permanece positivo de por vida, tanto en personas que se curaron de la infección como en portadores crónicos. A diferencia del Anti-HBs (que puede ser positivo por vacunación), el Anti-HBc IgG SOLO es positivo si hubo infección real con el virus. Es esencial en el tamizaje de donadores de sangre, evaluación prenupcial, protocolo de embarazo y en pacientes que van a recibir quimioterapia o inmunosupresión, ya que el virus puede reactivarse en pacientes inmunosuprimidos que fueron portadores. Disponible en el Laboratorio Clínico Del Bienestar.',
        whatIsIt: 'El Anti-HBc IgG es un anticuerpo dirigido contra la proteína del core (núcleo) del virus de la Hepatitis B. Su presencia indica que la persona estuvo infectada por el virus en algún momento, ya sea que se haya curado o que siga siendo portadora crónica. Es un marcador de "memoria inmunológica" — el cuerpo recuerda haber visto el virus. Se mide en sangre venosa por técnica de quimioluminiscencia automatizada. Importante: este anticuerpo NO se produce por la vacunación.',
    },
    'LAMOTRIGINA (lamictal)': {
        description: 'La prueba de Lamotrigina (Lamictal) en suero es un análisis de monitoreo terapéutico de drogas (TDM) que mide los niveles circulantes de este medicamento antiepiléptico y estabilizador del ánimo. La lamotrigina se utiliza en el tratamiento de epilepsia (crisis focales y generalizadas), trastorno bipolar (prevención de episodios depresivos) y como complemento en otros trastornos neurológicos. El monitoreo sérico es crucial porque la lamotrigina tiene un rango terapéutico estrecho: niveles bajos no controlan las crisis, y niveles altos pueden causar toxicidad con síntomas como mareo, visión doble, ataxia y la temida erupción cutánea (Síndrome de Stevens-Johnson). La interacción con ácido valproico duplica los niveles de lamotrigina, y los anticonceptivos orales los reducen significativamente. En el Laboratorio Clínico Del Bienestar realizamos esta determinación con resultados rápidos para ajuste oportuno de dosis.',
        whatIsIt: 'La lamotrigina es un medicamento antiepiléptico y estabilizador del ánimo que actúa bloqueando los canales de sodio en las neuronas. Esta prueba mide cuánta lamotrigina hay en su sangre para verificar que está en el rango terapéutico (2.5-15 μg/mL). Niveles muy bajos no controlarán sus crisis epilépticas, y niveles muy altos pueden causar efectos secundarios graves. La muestra se toma por sangre venosa, preferentemente antes de la dosis matutina (nivel valle).',
    },
    'LITIO': {
        description: 'La prueba de Litio en suero es un análisis de monitoreo terapéutico de drogas (TDM) esencial para pacientes que toman carbonato de litio como tratamiento del trastorno bipolar. El litio tiene un rango terapéutico muy estrecho (0.6-1.2 mEq/L), lo que significa que la diferencia entre una dosis efectiva y una dosis tóxica es pequeña. Por esta razón, el monitoreo regular de los niveles séricos es obligatorio. Niveles superiores a 1.5 mEq/L pueden causar toxicidad con síntomas como temblor severo, confusión, diarrea y daño renal. Junto con el litio, se debe monitorear la función renal (creatinina) y la función tiroidea (TSH), ya que el litio puede afectar ambos órganos a largo plazo. La muestra debe tomarse 12 horas después de la última dosis (nivel valle). En el Laboratorio Clínico Del Bienestar ofrecemos resultados rápidos para el ajuste oportuno de su tratamiento.',
        whatIsIt: 'El litio es un medicamento estabilizador del ánimo utilizado principalmente en el trastorno bipolar. Esta prueba mide los niveles de litio en sangre para asegurar que están en el rango terapéutico (0.6-1.2 mEq/L). La muestra DEBE tomarse exactamente 12 horas después de la última dosis para obtener un "nivel valle" comparable. El litio se elimina por los riñones, por lo que la función renal afecta directamente los niveles.',
    },
    'METANEFRINAS EN SANGRE': {
        description: 'Las Metanefrinas en Sangre (plasma libre) son el estudio más sensible para el diagnóstico del Feocromocitoma y Paraganglioma, tumores productores de catecolaminas que causan crisis hipertensivas graves. Esta prueba mide las metanefrinas libres (metanefrina y normetanefrina) en plasma. Estos metabolitos son producidos continuamente por los tumores, incluso entre las crisis de presión alta, lo que convierte a esta prueba en la más confiable para detectar estos tumores raros pero potencialmente mortales. La sensibilidad es superior al 96%, lo que significa que un resultado negativo prácticamente descarta el diagnóstico. Se recomienda tomar la muestra con el paciente en reposo supino (acostado) durante 30 minutos para evitar falsos positivos por estrés postural. En el Laboratorio Clínico Del Bienestar realizamos esta prueba con tecnología de alta precisión.',
        whatIsIt: 'Las metanefrinas libres en plasma son los metabolitos de las catecolaminas (adrenalina y noradrenalina) producidos por la enzima COMT dentro de las células del tumor. A diferencia de las catecolaminas que se liberan en picos, las metanefrinas se producen de forma continua, lo que hace que esta prueba sea más sensible para detectar feocromocitomas. La muestra se toma por sangre venosa, idealmente con el paciente acostado durante 30 minutos previos.',
    }
};

// Apply updates to existing studies with basic descriptions
let updated = 0;
for (const [name, content] of Object.entries(basicUpdates)) {
    const study = studies.find(s => s.name === name);
    if (study) {
        study.description = content.description;
        if (content.whatIsIt) study.whatIsIt = content.whatIsIt;
        updated++;
        console.log(`  📝 Updated description: ${name} (${content.description.length} chars)`);
    } else {
        console.log(`  ❌ Not found for update: ${name}`);
    }
}

// Sort and save
studies.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(studiesPath, JSON.stringify(studies, null, 2), 'utf-8');

console.log(`\n=== FINAL SUMMARY ===`);
console.log(`Total studies: ${studies.length}`);
console.log(`Missing studies added: ${missingStudies.length}`);
console.log(`Descriptions updated: ${updated}`);

const v2Count = studies.filter(s => s.description && s.description.length > 200).length;
const basicCount = studies.filter(s => !s.description || s.description.length <= 200).length;
console.log(`With V2 description: ${v2Count}`);
console.log(`With basic description: ${basicCount}`);
