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
    // Diabetes
    { slug: 'riesgo-diabetes', name: 'Riesgo de Diabetes', desc: 'Test FINDRISC de riesgo a 10 años', icon: '🩺', category: 'Diabetes', color: 'bg-orange-500' },
    { slug: 'convertidor-hba1c', name: 'Convertidor HbA1c', desc: 'Convierte entre HbA1c y glucosa promedio', icon: '🔄', category: 'Diabetes', color: 'bg-orange-500' },
    // Nefrología
    { slug: 'calculadora-egfr', name: 'Filtración Glomerular', desc: 'Calcula tu tasa de filtración renal', icon: '🫘', category: 'Nefrología', color: 'bg-yellow-600' },
    { slug: 'sodio-corregido', name: 'Sodio Corregido', desc: 'Corrección de sodio por glucosa', icon: '🧂', category: 'Nefrología', color: 'bg-yellow-600' },
    { slug: 'calcio-corregido', name: 'Calcio Corregido', desc: 'Corrección de calcio por albúmina', icon: '🦴', category: 'Nefrología', color: 'bg-yellow-600' },
    // Embarazo
    { slug: 'fecha-parto', name: 'Fecha de Parto', desc: 'Calcula tu fecha probable de parto', icon: '🤰', category: 'Embarazo', color: 'bg-pink-500' },
    { slug: 'semanas-embarazo', name: 'Semanas de Embarazo', desc: 'En qué semana y trimestre estás', icon: '📅', category: 'Embarazo', color: 'bg-pink-500' },
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
