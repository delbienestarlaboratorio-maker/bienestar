import Link from 'next/link';
import type { Metadata } from 'next';
import { AdBanner } from '@/components/ui/AdBanner';

export const metadata: Metadata = {
    title: 'Herramientas de Salud Gratuitas | Calculadoras Médicas | Laboratorio Bienestar',
    description: 'Calculadoras de salud gratuitas: IMC, grasa corporal, agua diaria, riesgo cardiovascular, diabetes, embarazo y más. Herramientas médicas validadas científicamente.',
    keywords: ['calculadora IMC', 'calculadora grasa corporal', 'calculadora agua diaria', 'herramientas salud', 'calculadora médica', 'riesgo cardiovascular', 'fecha de parto', 'test depresión'],
};

const calculators = [
    // Salud General
    { slug: 'calculadora-imc', name: 'Calculadora de IMC', desc: 'Calcula tu Índice de Masa Corporal', icon: '⚖️', category: 'Salud General', color: 'bg-green-500' },
    { slug: 'calculadora-grasa-corporal', name: 'Grasa Corporal', desc: 'Porcentaje de grasa con el método Navy', icon: '🏋️', category: 'Salud General', color: 'bg-green-500' },
    { slug: 'calculadora-agua', name: 'Agua Diaria', desc: 'Cuánta agua necesitas tomar al día', icon: '💧', category: 'Salud General', color: 'bg-green-500' },
    { slug: 'calculadora-metabolismo', name: 'Metabolismo Basal (TMB)', desc: 'Calorías que tu cuerpo necesita en reposo', icon: '🔥', category: 'Salud General', color: 'bg-green-500' },
    { slug: 'calculadora-calorias', name: 'Calorías Diarias (TDEE)', desc: 'Total de calorías según tu actividad', icon: '🍽️', category: 'Salud General', color: 'bg-green-500' },
    { slug: 'calculadora-peso-ideal', name: 'Peso Ideal', desc: 'Calcula tu peso ideal según tu altura', icon: '🎯', category: 'Salud General', color: 'bg-green-500' },
    // Cardiología
    { slug: 'riesgo-cardiovascular', name: 'Riesgo Cardiovascular', desc: 'Score de Framingham a 10 años', icon: '🫀', category: 'Cardiología', color: 'bg-red-500' },
    { slug: 'calculadora-colesterol-ldl', name: 'Colesterol LDL', desc: 'Calcula tu colesterol LDL (Friedewald)', icon: '🩸', category: 'Cardiología', color: 'bg-red-500' },
    { slug: 'clasificador-presion-arterial', name: 'Presión Arterial', desc: 'Clasifica tu nivel de presión arterial', icon: '💓', category: 'Cardiología', color: 'bg-red-500' },
    { slug: 'score-framingham', name: 'Score de Riesgo Framingham', desc: 'Riesgo infarto a 10 años', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'score-heart', name: 'HEART Score', desc: 'Riesgo cardíaco MACE', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'escala-killip', name: 'Clasificación de Killip', desc: 'Mortalidad en IAM', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'score-has-bled', name: 'Score HAS-BLED', desc: 'Riesgo de hemorragia', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'presion-arterial-media', name: 'Presión Arterial Media (PAM)', desc: 'Cálculo de la PAM', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'score-timi-stemi', name: 'Score TIMI (STE-MI)', desc: 'Riesgo en Infarto (ST+)', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'intervalo-qt-corregido', name: 'Intervalo QT Corregido (QTc) - Bazett', desc: 'Electrocardiograma QTc', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'score-nyha', name: 'Clasificación Cardíaca NYHA', desc: 'Capacidad Funcional NYHA', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'frecuencia-cardiaca-objetivo', name: 'Frecuencia Cardíaca Objetivo', desc: 'Zonas de esfuerzo', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'doble-producto-cardiaco', name: 'Doble Producto Cardíaco (RPP)', desc: 'Demanda de Oxígeno EKG', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'riesgo-fibrilacion-auricular', name: 'Score de Fibrilación Auricular', desc: 'Probabilidad de AF', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    { slug: 'score-timi-nstemi', name: 'Score TIMI (NSTE-ACS)', desc: 'Riesgo de Isquemia o Muerte', icon: '❤️', category: 'Cardiología', color: 'bg-red-600' },
    // Diabetes
    { slug: 'riesgo-diabetes', name: 'Riesgo de Diabetes', desc: 'Test FINDRISC de riesgo a 10 años', icon: '🩺', category: 'Diabetes', color: 'bg-orange-500' },
    { slug: 'convertidor-hba1c', name: 'Convertidor HbA1c', desc: 'Convierte entre HbA1c y glucosa promedio', icon: '🔄', category: 'Diabetes', color: 'bg-orange-500' },
    // Nefrología
    { slug: 'calculadora-egfr', name: 'Filtración Glomerular', desc: 'Calcula tu tasa de filtración renal', icon: '🫘', category: 'Nefrología', color: 'bg-yellow-600' },
    { slug: 'sodio-corregido', name: 'Sodio Corregido', desc: 'Corrección de sodio por glucosa', icon: '🧂', category: 'Nefrología', color: 'bg-yellow-600' },
    { slug: 'calcio-corregido', name: 'Calcio Corregido', desc: 'Corrección de calcio por albúmina', icon: '🦴', category: 'Nefrología', color: 'bg-yellow-600' },
    { slug: 'depuracion-creatinina-cockcroft', name: 'Depuración de Creatinina (Cockcroft-Gault)', desc: 'Clearance Cockcroft-Gault', icon: '🧪', category: 'Nefrología', color: 'bg-teal-600' },
    { slug: 'fena-fraccion-excrecion-sodio', name: 'Fracción Excreción de Sodio (FENa)', desc: 'FENa Insuficiencia Aguda LRA', icon: '🧂', category: 'Nefrología', color: 'bg-teal-600' },
    { slug: 'brecha-anionica-gap', name: 'Anión GAP (Brecha Aniónica con Delta)', desc: 'Anión GAP Acidosis M', icon: '⚖️', category: 'Nefrología', color: 'bg-teal-600' },

    // Radiología y Ecos (Batch 2)
    { slug: 'calculadora-exposicion-rayosx-avanzada', name: 'Calculadora de Exposición de Rayos X', desc: 'Generador de Técnicas RX', icon: '🩻', category: 'Radiología y Rayos X', color: 'bg-zinc-600' },
    { slug: 'indice-cardo-toracico-rx', name: 'Índice Cardiotorácico (ICT)', desc: 'Detector de Cardiomegalia', icon: '🫀', category: 'Radiología y Rayos X', color: 'bg-zinc-600' },
    { slug: 'angulo-cobb-escoliosis', name: 'Ángulo de Cobb', desc: 'Medición de Escoliosis', icon: '🦴', category: 'Radiología y Rayos X', color: 'bg-zinc-600' },
    { slug: 'escala-kellgren-lawrence-osteoartritis', name: 'Escala de Kellgren-Lawrence', desc: 'Grados de Osteoartritis', icon: '🦵', category: 'Radiología y Rayos X', color: 'bg-zinc-600' },
    { slug: 'score-aspetto-tomografia-ictus', name: 'Score ASPECTS para Ictus', desc: 'Evaluación TC de Ictus', icon: '🧠', category: 'Radiología y Rayos X', color: 'bg-zinc-600' },
    { slug: 'peso-fetal-estimado-hadlock', name: 'Peso Fetal Estimado (Fórmula de Hadlock)', desc: 'Calculador de Biometría Fetal', icon: '🌊', category: 'Ultrasonografía y Ecos', color: 'bg-sky-600' },
    { slug: 'indice-liquido-amniotico-usg', name: 'Índice de Líquido Amniótico (ILA/AFI)', desc: 'Medición de Bolsones', icon: '🌊', category: 'Ultrasonografía y Ecos', color: 'bg-sky-600' },

    // Neumología
    { slug: 'score-curb65-neumonia', name: 'Score CURB-65 para Neumonía', desc: 'Riesgo Neumonía CURB-65', icon: '🌬️', category: 'Neumología', color: 'bg-sky-600' },
    { slug: 'score-wells-tep-embolia', name: 'Score WELLS Embolismo Pulmonar', desc: 'Riesgo TEP Embolia Wells', icon: '🩸', category: 'Neumología', color: 'bg-sky-600' },

    // Embarazo
    { slug: 'fecha-parto', name: 'Fecha de Parto', desc: 'Calcula tu fecha probable de parto', icon: '🤰', category: 'Embarazo', color: 'bg-pink-500' },
    { slug: 'semanas-embarazo', name: 'Semanas de Embarazo', desc: 'En qué semana y trimestre estás', icon: '📅', category: 'Embarazo', color: 'bg-pink-500' },
    // Oncología y Hematología
    { slug: 'indice-roma-ovario', name: 'Índice de Malignidad Ovárica ROMA', desc: 'Ca Ovárico Cáncer ROMA', icon: '🩸', category: 'Oncología', color: 'bg-purple-600' },
    { slug: 'score-mascc-oncologia', name: 'Score MASCC de Oncológico Riesgo Neutropénico Febril y Muerte Severo', desc: 'Riesgo Neutropénico MASCC', icon: '☢️', category: 'Oncología', color: 'bg-purple-600' },
    { slug: 'dias-fertiles', name: 'Días Fértiles', desc: 'Calcula tu ventana fértil y ovulación', icon: '🌸', category: 'Embarazo', color: 'bg-pink-500' },
    // Pediatría
    { slug: 'percentil-crecimiento', name: 'Percentil de Crecimiento', desc: 'Tablas OMS para peso y talla infantil', icon: '👶', category: 'Pediatría', color: 'bg-cyan-500' },
    // Hígado
    { slug: 'indice-fib4', name: 'Índice FIB-4', desc: 'Evalúa riesgo de fibrosis hepática', icon: '🫁', category: 'Hígado', color: 'bg-amber-600' },
    { slug: 'meld-score', name: 'MELD Score', desc: 'Severidad de enfermedad hepática', icon: '📊', category: 'Hígado', color: 'bg-amber-600' },
    // Salud Mental
    { slug: 'test-depresion-phq9', name: 'Test de Depresión', desc: 'Cuestionario PHQ-9 validado', icon: '🧠', category: 'Salud Mental', color: 'bg-indigo-500' },
    { slug: 'test-ansiedad-gad7', name: 'Test de Ansiedad', desc: 'Cuestionario GAD-7 validado', icon: '😰', category: 'Salud Mental', color: 'bg-indigo-500' },
    // Nutrición
    { slug: 'calculadora-macronutrientes', name: 'Macronutrientes', desc: 'Distribución de carbos/proteínas/grasas', icon: '🥗', category: 'Nutrición', color: 'bg-lime-600' },
    { slug: 'indice-cintura-cadera', name: 'Cintura-Cadera', desc: 'Índice de riesgo abdominal', icon: '📏', category: 'Nutrición', color: 'bg-lime-600' },
    // Hematología
    { slug: 'riesgo-anemia', name: 'Riesgo de Anemia', desc: 'Evalúa tu riesgo de anemia', icon: '🩸', category: 'Hematología', color: 'bg-rose-600' },

    // Reumatología e Inmunología (Fase 4)
    { slug: 'sospecha-autoinmune', name: 'Alerta Inmunológica', desc: 'Riesgo de Artritis y Lupus', icon: '🛡️', category: 'Inmunología', color: 'bg-violet-600' },
    { slug: 'actividad-ar-das28', name: 'Puntaje DAS28', desc: 'Evalúa actividad de Artritis', icon: '🖐️', category: 'Reumatología', color: 'bg-emerald-600' },
    // Dermatología e Infectología (Fase 4)
    { slug: 'evaluador-alopecia', name: 'Caída de Cabello', desc: 'Detección Hormonal de Alopecia', icon: '💇‍♀️', category: 'Dermatología', color: 'bg-slate-700' },
    { slug: 'riesgo-ets', name: 'Riesgo Infeccioso', desc: 'Test anónimo de ETS / Venéreas', icon: '🦠', category: 'Infectología', color: 'bg-rose-700' },
    // Oncología (Fase 4)
    { slug: 'riesgo-malignidad-ovarica', name: 'ROMA Score', desc: 'Riesgo de Malignidad Ovárica', icon: '🩸', category: 'Oncología', color: 'bg-fuchsia-800' },
    { slug: 'indice-psa', name: 'Índice PSA Libre', desc: 'Patología prostática', icon: '🚹', category: 'Oncología', color: 'bg-blue-800' },
    // Toxicología y Deporte (Fase 4)
    { slug: 'salud-ocupacional-toxicologia', name: 'Riesgo Toxicológico', desc: 'Certificado Antidoping', icon: '🏭', category: 'Toxicología', color: 'bg-gray-800' },
    { slug: 'test-sobreentrenamiento', name: 'Daño Muscular', desc: 'Nivel de sobreentrenamiento', icon: '🏋️‍♂️', category: 'Medicina del Deporte', color: 'bg-orange-700' },
    // Ginecología (Fase 4)
    { slug: 'evaluador-sop', name: 'Criterios SOP', desc: 'Síndrome de Ovario Poliquístico', icon: '🌸', category: 'Ginecología', color: 'bg-pink-600' },
    { slug: 'riesgo-preeclampsia', name: 'Riesgo Preeclampsia', desc: 'Evaluador clínico gestacional', icon: '🤰', category: 'Ginecología', color: 'bg-rose-700' },
    // Gastroenterología (Fase 4)
    { slug: 'riesgo-ulcera-gastritis', name: 'Gastritis / Úlcera', desc: 'Sospecha Helicobacter', icon: '🔥', category: 'Gastroenterología', color: 'bg-red-700' },
    { slug: 'riesgo-celiaquia-gastrica', name: 'Enfermedad Celíaca', desc: 'Riesgo intolerancia al gluten', icon: '🌾', category: 'Gastroenterología', color: 'bg-orange-500' },
    { slug: "clasificacion-child-pugh", name: "Clasificación Child-Pugh", desc: "Severidad Cirrosis Child-Pugh", icon: "🧬", category: "Gastroenterología", color: "bg-orange-600" },
    { slug: "indice-apri", name: "Índice APRI (Fibrosis Hepática)", desc: "Índice APRI Fibrosis", icon: "🩸", category: "Gastroenterología", color: "bg-orange-600" },
    { slug: "score-meld-na", name: "Score MELD-Na", desc: "Mortalidad Hepática MELD-Na", icon: "⚖️", category: "Gastroenterología", color: "bg-orange-600" },
    { slug: "criterios-alvarado-apendicitis", name: "Criterios de Alvarado para Apendicitis", desc: "Riesgo Apendicitis Alvarado", icon: "💥", category: "Gastroenterología", color: "bg-orange-600" },
    { slug: "score-blatchford-sangrado", name: "Score de Riesgo Glasgow-Blatchford (GBS)", desc: "Riesgo Hemorragia Alta GBS", icon: "🩸", category: "Gastroenterología", color: "bg-orange-600" },
    // Endocrinología y Urología (Fase 4)
    { slug: 'score-ipss-prostata', name: 'Score IPSS Próstata', desc: 'Hiperplasia prostática', icon: '💧', category: 'Urología', color: 'bg-indigo-600' },
    { slug: 'riesgo-hipotiroidismo', name: 'Riesgo Hipotiroidismo', desc: 'Disfunción Glánula Tiroides', icon: '🦋', category: 'Endocrinología', color: 'bg-purple-600' },
    { slug: 'dosis-insulina-basal', name: 'Dosis de Insulina Basal Inicial', desc: 'Insulina basal T2DM', icon: '💉', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'factor-sensibilidad-insulina', name: 'Factor de Sensibilidad a la Insulina (ISF)', desc: 'Factor Sensibilidad (ISF)', icon: '📉', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'ratio-insulina-carbohidratos', name: 'Ratio Insulina-Carbohidratos (ICR)', desc: 'Ratio Insulina/Carbo', icon: '🍞', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'calcio-ionizado-corregido', name: 'Calcio Sérico Corregido', desc: 'Ca2+ Corregido x Albúmina', icon: '🦴', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'indice-quicki', name: 'Índice QUICKI (Insulino-resistencia)', desc: 'Sensibilidad Insulina QUICKI', icon: '🧬', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'clasificacion-cushing', name: 'Probabilidad Síndrome de Cushing', desc: 'Síndrome de Cushing', icon: '⚖️', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'score-tirads', name: 'ACR TI-RADS', desc: 'Riesgo Nódulo Tiroides', icon: '🦋', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'osmolaridad-serica', name: 'Osmolaridad Sérica Efectiva', desc: 'Tonicidad Sérica Efectiva', icon: '💧', category: 'Endocrinología', color: 'bg-amber-600' },
    { slug: 'score-findrisc', name: 'Score FINDRISC Diabetes', desc: 'Test Diabetes FINDRISC', icon: '🔍', category: 'Endocrinología', color: 'bg-amber-600' },

    // --- NUEVAS HERRAMIENTAS VIRALES DE TRÁFICO MASIVO (FASE 5) ---
    { slug: 'riesgo-toxicidad-paracetamol', name: 'Riesgo Paracetamol', desc: 'Peligro de Falla Hepática', icon: '☠️', category: 'Virales y Curiosidades', color: 'bg-red-700' },
    { slug: 'compatibilidad-sanguinea', name: 'Genética Sanguínea', desc: 'Tipos ABO/Rh en el Embarazo', icon: '🩸', category: 'Virales y Curiosidades', color: 'bg-red-700' },
    { slug: 'calculadora-edad-vascular', name: 'Edad Vascular', desc: 'Envejecimiento de Arterias', icon: '🫀', category: 'Virales y Curiosidades', color: 'bg-slate-800' },
    { slug: 'prediccion-sexo-bebe', name: 'Sexo del Bebé', desc: 'Método Fértil de Shettles', icon: '👶', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'edad-mental', name: 'Tu Edad Mental', desc: 'Test de madurez psicológica', icon: '🧠', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-narcisismo', name: 'Espectro Narcisista', desc: 'Test de Personalidad y Ego', icon: '🪞', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-daltonismo-astigmatismo', name: 'Test Visual Básico', desc: 'Averigua si necesitas lentes', icon: '👁️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'sindrome-burnout', name: 'Nivel Burnout Laboral', desc: 'Test estrés laboral crónico', icon: '💼', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-calorias-peso-ideal', name: 'Calculadora de Déficit', desc: 'Tu cuerpo de verano', icon: '⚖️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-lenguaje-amor', name: 'Lenguaje del Amor', desc: 'Test Parejas', icon: '❤️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-tipo-piel', name: 'Rutina Skincare', desc: 'Descubre tu rutina ideal', icon: '🧴', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'limpiador-antidoping', name: 'Calculadora Antidoping', desc: 'Limpieza toxicológica rápida', icon: '⏱️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'cuanto-medira', name: 'Estatura Futura', desc: 'Pronóstico para tu bebé', icon: '📏', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-tdah-adultos', name: 'Test TDAH Adultos', desc: 'Evaluador atencional visual', icon: '🌪️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-ayuno-intermitente', name: 'Ayuno Intermitente', desc: 'Tu ventana quema-grasa ideal', icon: '🥗', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'toxicidad-religiosa', name: 'Test Sensibilidad PAS', desc: 'Averigua si eres PAS', icon: '✨', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'identificador-heces-bristol', name: 'Escala de Bristol', desc: 'Análisis de tu Digestión', icon: '💩', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-tipo-pisada', name: 'Riesgo de Rodilla', desc: 'Daño Articular y Gota', icon: '🦵', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-apego-emocional', name: 'Apego Emocional', desc: 'Test Tóxico vs Seguro', icon: '🔗', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-desarrollo-embarazo', name: 'El Feto en Frutas', desc: 'Tu bebé semana a semana', icon: '🍉', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-alcohol', name: 'Alcoholímetro Web', desc: 'Nivel etílico actual', icon: '🍻', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-pasivos-agresivos', name: 'Comunicación Tóxica', desc: 'Eres Pasivo-Agresivo?', icon: '💬', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'test-cafeina-corazon', name: 'Sobredosis Cafeína', desc: 'Taquicardia vs Ansiedad', icon: '☕', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-reserva-ovarica', name: 'Reloj Biológico', desc: 'Óvulos y fertilidad por edad', icon: '🥚', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'ansiedad-social', name: 'Fobia Social', desc: 'Introversión vs Ataques pánico', icon: '🫣', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-imc-infantil', name: 'IMC Pediátrico', desc: 'Riesgo de obesidad infantil', icon: '🧸', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'dependencia-celular-dopamina', name: 'Dopamina / Celular', desc: 'Adicción a Redes Sociales', icon: '📱', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'proteina-muscular-diaria', name: 'Calculadora Muscular', desc: 'Tu gramaje exacto recomendado', icon: '🥩', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'fototipo-piel-cancer', name: 'Riesgo Cáncer Solar', desc: 'Tu escudo natural Fitzpatrick', icon: '☀️', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'hipocondria-ansiedad', name: 'Test Cibercondría', desc: 'Obsesión por leer en Google', icon: '🩺', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'depresion-sonriente', name: 'Depresión Sonriente', desc: 'Tristeza oculta y alto estrés', icon: '🎭', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'asimetria-facial', name: 'Malestar Dental', desc: 'Asimetría del cuello y bruxismo', icon: '🦷', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' },
    { slug: 'presion-arterial-virtual', name: 'Asesino Silencioso', desc: 'Tensión vascular y ACV', icon: '❤️‍🔥', category: 'Virales y Curiosidades', color: 'bg-fuchsia-600' }
];

const categories = [...new Set(calculators.map(c => c.category))];

export default function HerramientasPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-teal-800 to-blue-900" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-5xl mx-auto text-center py-16 md:py-24 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🧮 Herramientas de Salud <span className="text-green-400">Gratuitas</span>
                    </h1>
                    <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                        25 calculadoras médicas validadas científicamente. Evalúa tu salud, conoce tus valores y descubre qué estudios necesitas.
                    </p>
                </div>
            </div>

            {/* Ad Banner */}
            <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
                <AdBanner variant="horizontal" />
            </div>

            {/* Calculators by Category */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                {categories.map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${calculators.find(c => c.category === category)?.color}`} />
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {calculators.filter(c => c.category === category).map((calc) => (
                                <Link
                                    key={calc.slug}
                                    href={`/herramientas/${calc.slug}`}
                                    className="group bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all p-6 flex items-start gap-4"
                                >
                                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{calc.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-green-800 transition-colors">{calc.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{calc.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Ad Banner */}
            <div className="max-w-5xl mx-auto px-4 pb-12">
                <AdBanner variant="horizontal" />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-800 to-blue-800 py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas hacerte estudios?</h2>
                    <p className="text-lg text-green-100 mb-8">Contamos con más de 2,000 estudios clínicos. Agenda tu cita o contáctanos.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/estudios/analisis-clinicos" className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg">
                            Ver Estudios
                        </Link>
                        <a href="https://wa.me/527716854026?text=Hola,%20necesito%20información" target="_blank" rel="noopener noreferrer"
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg border border-green-400">
                            📱 WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
