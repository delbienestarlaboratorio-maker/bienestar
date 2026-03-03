const fs = require('fs');

const file = 'src/app/herramientas/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const injection = \`
    // Reumatología e Inmunología
    { slug: 'sospecha-autoinmune', name: 'Alerta Inmunológica', desc: 'Riesgo de Artritis y Lupus', icon: '🛡️', category: 'Inmunología', color: 'bg-violet-600' },
    { slug: 'actividad-ar-das28', name: 'Puntaje DAS28', desc: 'Evalúa actividad de Artritis', icon: '🖐️', category: 'Reumatología', color: 'bg-emerald-600' },
    // Dermatología e Infectología
    { slug: 'evaluador-alopecia', name: 'Caída de Cabello', desc: 'Detección Hormonal de Alopecia', icon: '💇‍♀️', category: 'Dermatología', color: 'bg-slate-700' },
    { slug: 'riesgo-ets', name: 'Riesgo Infeccioso', desc: 'Test anónimo de ETS / Venéreas', icon: '🦠', category: 'Infectología', color: 'bg-rose-700' },
    // Oncología
    { slug: 'riesgo-malignidad-ovarica', name: 'ROMA Score', desc: 'Riesgo de Malignidad Ovárica', icon: '🩸', category: 'Oncología', color: 'bg-fuchsia-800' },
    { slug: 'indice-psa', name: 'Índice PSA Libre', desc: 'Patología prostática', icon: '🚹', category: 'Oncología', color: 'bg-blue-800' },
    // Toxicología y Deporte
    { slug: 'salud-ocupacional-toxicologia', name: 'Riesgo Toxicológico', desc: 'Certificado Antidoping', icon: '🏭', category: 'Toxicología', color: 'bg-gray-800' },
    { slug: 'test-sobreentrenamiento', name: 'Daño Muscular', desc: 'Nivel de sobreentrenamiento', icon: '🏋️‍♂️', category: 'Medicina del Deporte', color: 'bg-orange-700' },
    // Ginecología
    { slug: 'evaluador-sop', name: 'Criterios SOP', desc: 'Síndrome de Ovario Poliquístico', icon: '🌸', category: 'Ginecología', color: 'bg-pink-600' },
    { slug: 'riesgo-preeclampsia', name: 'Riesgo Preeclampsia', desc: 'Evaluador clínico gestacional', icon: '🤰', category: 'Ginecología', color: 'bg-rose-700' },
    // Gastroenterología
    { slug: 'riesgo-ulcera-gastritis', name: 'Gastritis / Úlcera', desc: 'Sospecha Helicobacter', icon: '🔥', category: 'Gastroenterología', color: 'bg-red-700' },
    { slug: 'riesgo-celiaquia-gastrica', name: 'Enfermedad Celíaca', desc: 'Riesgo intolerancia al gluten', icon: '🌾', category: 'Gastroenterología', color: 'bg-orange-500' },
    // Urología
    { slug: 'score-ipss-prostata', name: 'Score IPSS Próstata', desc: 'Hiperplasia prostática', icon: '💧', category: 'Urología', color: 'bg-indigo-600' },
    // Endocrinología
    { slug: 'riesgo-hipotiroidismo', name: 'Riesgo Hipotiroidismo', desc: 'Glánula Tiroides', icon: '🦋', category: 'Endocrinología', color: 'bg-purple-600' },
    
    // --- NUEVAS HERRAMIENTAS VIRALES DE TRÁFICO MASIVO ---
    { slug: 'prediccion-sexo-bebe', name: 'Sexo del Bebé', desc: 'Tabla Predictiva China', icon: '👶', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'edad-mental', name: 'Tu Edad Mental', desc: 'Test psicológico de madurez', icon: '🧠', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-narcisismo', name: 'Espectro Narcisista', desc: 'Test de Personalidad y Ego', icon: '🪞', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-daltonismo-astigmatismo', name: 'Test Visual Básico', desc: 'Averigua si necesitas lentes', icon: '👁️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'sindrome-burnout', name: 'Nivel de Burnout', desc: 'Test de estrés laboral crónico', icon: '💼', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-calorias-peso-ideal', name: 'Calculadora Gym', desc: 'Calcula tu tiempo de progreso', icon: '⚖️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-lenguaje-amor', name: 'Lenguaje del Amor', desc: 'Test para Parejas', icon: '❤️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-tipo-piel', name: 'Rutina Skincare', desc: 'Descubre tu piel ideal', icon: '🧴', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'limpiador-antidoping', name: 'Calculadora Doping', desc: 'Limpieza corporal y toxicológica', icon: '⏱️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'cuanto-medira', name: 'Estatura Futura', desc: 'Pronóstico para tu bebé', icon: '📏', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-tdah-adultos', name: 'Test Visual TDAH', desc: 'Neurodivergencias rápidas', icon: '🌪️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-ayuno-intermitente', name: 'Ayuno Quema-Grasa', desc: 'Identifica tu hora metabólica', icon: '🥗', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'toxicidad-religiosa', name: 'Sensibilidad (PAS)', desc: 'Personas altamente sensibles', icon: '✨', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'identificador-heces-bristol', name: 'Escala de Bristol', desc: 'Rastreador de la Digestión', icon: '💩', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-tipo-pisada', name: 'Lesión Articular', desc: 'Daño en rodilla y meniscos', icon: '🦵', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-apego-emocional', name: 'Apego Emocional', desc: 'Mide toxicidad e independencia', icon: '🔗', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-desarrollo-embarazo', name: 'El Feto en Frutas', desc: 'Visualiza a tu bebé semana a semana', icon: '🍉', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-alcohol', name: 'Alcoholímetro Web', desc: 'Riesgos de intoxicación', icon: '🍻', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-pasivos-agresivos', name: 'Test Pasivo / Agresivo', desc: 'Comunicación Tóxica', icon: '💬', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'test-cafeina-corazon', name: 'Nivel Ansiedad / Cafeína', desc: 'Temblores y ataque cardíaco', icon: '☕', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-reserva-ovarica', name: 'Reloj Biológico', desc: 'Descubre cuántos óvulos te quedan', icon: '🥚', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'ansiedad-social', name: 'Fobia Social', desc: 'Introvertido o ataque de pánico', icon: '🫣', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'calculadora-imc-infantil', name: 'Riesgo Pediátrico', desc: 'Percentil obesidad de tu hijo', icon: '🧸', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'dependencia-celular-dopamina', name: 'Dopamina / Celular', desc: 'Sobrecarga y ceguera digital', icon: '📱', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'proteina-muscular-diaria', name: 'Calculadora Muscular', desc: 'Tu gramaje exacto de proteína', icon: '🥩', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'fototipo-piel-cancer', name: 'Riesgo Cáncer Solar', desc: 'Escudo Fitzpatrick del Sol', icon: '☀️', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'hipocondria-ansiedad', name: 'Test Cibercondría', desc: 'Obsesión por leer Google M.D.', icon: '🩺', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'depresion-sonriente', name: 'Depresión Sonriente', desc: 'Tristeza oculta en alto rendimiento', icon: '🎭', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'asimetria-facial', name: 'Dolor / Asimetría', desc: 'Estrés dental de un solo lado', icon: '🦷', category: 'Diversión Virales', color: 'bg-fuchsia-600' },
    { slug: 'presion-arterial-virtual', name: 'Asesino Silencioso', desc: 'Tensión vascular autoevaluada', icon: '❤️‍🔥', category: 'Diversión Virales', color: 'bg-fuchsia-600' }
];

const categories = [...new Set(calculators.map(c => c.category))];\`;

const targetRegex = /\];\n\nconst categories = \[\.\.\.new Set\(calculators\.map\(c => c\.category\)\)\];/;
const newContent = content.replace(targetRegex, injection);

fs.writeFileSync(file, newContent);
console.log("36 herramientas inyectadas nativamente al array.");
