import { Metadata } from 'next';
import { Droplets, Sparkles, Shield, Zap, Leaf, Heart, Brain, Sun, Activity, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sueroterapia - Tratamientos IV | Laboratorio Del Bienestar Tizayuca',
    description: 'Descubre nuestros 10 tratamientos de sueroterapia intravenosa: energizantes, antioxidantes, detox, deportivos y más. Resultados inmediatos en Tizayuca, Hidalgo.',
    keywords: 'sueroterapia tizayuca, sueros vitamínicos, iv therapy hidalgo, glutatión, vitamina c intravenosa, suero energizante',
    openGraph: {
        title: 'Sueroterapia IV - 10 Tratamientos Especializados',
        description: 'Tratamientos intravenosos de vitaminas, minerales y antioxidantes en Tizayuca',
        type: 'website',
    },
};

const treatments = [
    {
        id: 1,
        name: 'Suero Energizante',
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        price: 650,
        duration: '30-45 min',
        description: 'Combate la fatiga crónica y recupera tu energía natural con nuestro suero enriquecido con complejo B.',
        benefits: [
            'Aumenta niveles de energía en 24 horas',
            'Mejora concentración y claridad mental',
            'Combate fatiga crónica y agotamiento',
            'Fortalece sistema nervioso',
            'No produce nerviosismo ni ansiedad',
        ],
        ingredients: 'Vitamina B12 (1000mcg), Complejo B (B1, B2, B3, B5, B6), Ácido Fólico, Magnesio',
        recommended: 'Ideal para personas con cansancio crónico, estrés laboral, deportistas o estudiantes en época de exámenes.',
    },
    {
        id: 2,
        name: 'Suero Antioxidante',
        icon: Shield,
        color: 'from-purple-500 to-pink-500',
        price: 850,
        duration: '45-60 min',
        description: 'Protege tus células del daño oxidativo con nuestro potente suero de glutatión y vitamina C.',
        benefits: [
            'Potente acción anti-envejecimiento',
            'Aclara y unifica el tono de piel',
            'Desintoxica el hígado naturalmente',
            'Fortalece sistema inmunológico',
            'Mejora apariencia de piel y cabello',
        ],
        ingredients: 'Glutatión (1200mg), Vitamina C (2000mg), Vitamina E, Selenio, Alfa Lipoico',
        recommended: 'Perfecto para quienes buscan efectos anti-aging, aclarar manchas o fortalecer defensas.',
    },
    {
        id: 3,
        name: 'Suero Hidratante',
        icon: Droplets,
        color: 'from-blue-400 to-cyan-500',
        price: 450,
        duration: '30 min',
        description: 'Rehidrata tu cuerpo rápidamente con electrolitos esenciales y suero fisiológico balanceado.',
        benefits: [
            'Hidratación profunda e inmediata',
            'Restaura electrolitos perdidos',
            'Alivia síntomas de resaca',
            'Mejora función renal',
            'Recuperación post-ejercicio',
        ],
        ingredients: 'Suero Fisiológico (500ml), Sodio, Potasio, Cloruro, Calcio, Magnesio',
        recommended: 'Ideal después de ejercicio intenso, deshidratación, resaca o exposición prolongada al sol.',
    },
    {
        id: 4,
        name: 'Suero Deportivo',
        icon: Activity,
        color: 'from-green-500 to-emerald-600',
        price: 750,
        duration: '45 min',
        description: 'Maximiza tu rendimiento y acelera la recuperación muscular con aminoácidos esenciales.',
        benefits: [
            'Acelera recuperación muscular',
            'Reduce dolor post-entrenamiento',
            'Aumenta resistencia física',
            'Mejora síntesis proteica',
            'Previene catabolismo muscular',
        ],
        ingredients: 'Aminoácidos Esenciales (BCAAs), L-Carnitina, Taurina, Vitaminas B6 y B12, Magnesio',
        recommended: 'Para atletas, gym-goers o cualquier persona con actividad física intensa.',
    },
    {
        id: 5,
        name: 'Suero Detox',
        icon: Leaf,
        color: 'from-lime-500 to-green-600',
        price: 900,
        duration: '60 min',
        description: 'Limpia tu organismo de toxinas acumuladas con nuestro suero desintoxicante premium.',
        benefits: [
            'Limpia hígado y riñones',
            'Elimina metales pesados',
            'Mejora digestión y metabolismo',
            'Aumenta claridad mental',
            'Promueve pérdida de peso saludable',
        ],
        ingredients: 'Glutatión (1500mg), N-Acetilcisteína (NAC), Ácido Alfa Lipoico, Vitamina C, Complejo B',
        recommended: 'Ideal después de excesos alimenticios, consumo de alcohol o para iniciar un estilo de vida saludable.',
    },
    {
        id: 6,
        name: 'Suero Inmune',
        icon: Heart,
        color: 'from-red-500 to-rose-600',
        price: 700,
        duration: '40 min',
        description: 'Fortalece tus defensas naturales con altas dosis de vitamina C y zinc para prevenir enfermedades.',
        benefits: [
            'Refuerza sistema inmunológico',
            'Previene resfriados y gripes',
            'Reduce duración de infecciones',
            'Combate radicales libres',
            'Acelera recuperación de enfermedades',
        ],
        ingredients: 'Vitamina C (5000mg), Zinc (50mg), Selenio, Vitamina D3, Complejo B',
        recommended: 'Para prevención en temporada de gripes o cuando sientes que vas a enfermarte.',
    },
    {
        id: 7,
        name: 'Suero Anti-Aging',
        icon: Star,
        color: 'from-pink-500 to-purple-600',
        price: 1200,
        duration: '60 min',
        description: 'Rejuvenece desde dentro con nuestro suero premium de colágeno y antioxidantes de última generación.',
        benefits: [
            'Estimula producción de colágeno',
            'Reduce líneas de expresión',
            'Mejora elasticidad de la piel',
            'Efecto lifting natural',
            'Cabello y uñas más fuertes',
        ],
        ingredients: 'Colágeno Hidrolizado, Ácido Hialurónico, Glutatión, Vitamina C, Biotina, Silicio',
        recommended: 'Para quienes buscan tratamiento anti-envejecimiento premium y resultados visibles.',
    },
    {
        id: 8,
        name: 'Suero Migraña',
        icon: Brain,
        color: 'from-indigo-500 to-blue-600',
        price: 600,
        duration: '30 min',
        description: 'Alivia dolores de cabeza severos y migrañas con nuestro suero especializado de magnesio.',
        benefits: [
            'Alivio rápido de migraña',
            'Reduce frecuencia de dolores',
            'Relaja tensión muscular',
            'Mejora calidad del sueño',
            'Sin efectos secundarios',
        ],
        ingredients: 'Magnesio (2000mg), Complejo B (B2, B6, B12), Riboflavina, CoQ10',
        recommended: 'Para personas con migrañas crónicas, cefaleas tensionales o dolores de cabeza frecuentes.',
    },
    {
        id: 9,
        name: 'Suero Post-COVID',
        icon: Sun,
        color: 'from-orange-500 to-amber-600',
        price: 950,
        duration: '60 min',
        description: 'Recupera tu vitalidad después de COVID-19 con nuestro suero especializado multivitamínico.',
        benefits: [
            'Combate fatiga post-COVID',
            'Mejora función pulmonar',
            'Recupera sentidos (gusto/olfato)',
            'Fortalece sistema inmune',
            'Reduce inflamación sistémica',
        ],
        ingredients: 'Vitamina C (3000mg), Zinc, Vitamina D3, NAC, Complejo B, Glutatión, Quercetina',
        recommended: 'Para personas en recuperación de COVID-19 o con síntomas de COVID largo.',
    },
    {
        id: 10,
        name: 'Suero Belleza',
        icon: Sparkles,
        color: 'from-fuchsia-500 to-purple-600',
        price: 850,
        duration: '45 min',
        description: 'Realza tu belleza natural con biotina, ácido hialurónico y vitaminas esenciales para piel radiante.',
        benefits: [
            'Piel luminosa y radiante',
            'Cabello brillante y fuerte',
            'Uñas más resistentes',
            'Hidratación profunda',
            'Efecto glow instantáneo',
        ],
        ingredients: 'Biotina (5000mcg), Ácido Hialurónico, Vitamina C, Vitamina E, Colágeno, Zinc',
        recommended: 'Perfecto antes de eventos importantes o para mantenimiento de belleza mensual.',
    },
];

export default function SueroterapiaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Sueroterapia Intravenosa
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-100 mb-4">
                            Nutrición celular directa para resultados inmediatos
                        </p>
                        <p className="text-lg text-purple-50">
                            10 tratamientos especializados diseñados para tu bienestar
                        </p>
                    </div>
                </div>
            </section>

            {/* What is IV Therapy */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-8">¿Qué es la Sueroterapia?</h2>
                    <div className="prose prose-lg mx-auto text-gray-700">
                        <p>
                            La sueroterapia, también conocida como terapia intravenosa (IV therapy), es un tratamiento médico que consiste en la administración de vitaminas, minerales, antioxidantes y otros nutrientes esenciales directamente al torrente sanguíneo a través de una vía intravenosa.
                        </p>
                        <p>
                            A diferencia de los suplementos orales, que deben pasar por el sistema digestivo y pueden perder hasta un 50% de su efectividad, la sueroterapia garantiza una biodisponibilidad del 100%, permitiendo que tu cuerpo absorba y utilice todos los nutrientes de manera inmediata.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Beneficios Generales</h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                            <li>✓ Absorción 100% efectiva</li>
                            <li>✓ Resultados inmediatos (24-48h)</li>
                            <li>✓ Hidratación profunda</li>
                            <li>✓ Fortalece sistema inmune</li>
                            <li>✓ Aumenta energía natural</li>
                            <li>✓ Mejora apariencia de piel</li>
                            <li>✓ Desintoxica el organismo</li>
                            <li>✓ Acelera recuperación</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Proceso de Aplicación</h3>
                        <div className="grid md:grid-cols-3 gap-6 not-prose">
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                                <h4 className="font-semibold mb-2">Consulta</h4>
                                <p className="text-sm text-gray-600">
                                    Evaluamos tu estado de salud y seleccionamos el tratamiento ideal
                                </p>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                                <h4 className="font-semibold mb-2">Aplicación</h4>
                                <p className="text-sm text-gray-600">
                                    Colocamos vía IV y administramos el suero (30-60 min)
                                </p>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                                <h4 className="font-semibold mb-2">Resultados</h4>
                                <p className="text-sm text-gray-600">
                                    Sientes los beneficios desde las primeras 24 horas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Treatments Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Nuestros Tratamientos</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {treatments.map((treatment) => {
                            const Icon = treatment.icon;
                            return (
                                <div
                                    key={treatment.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Header */}
                                    <div className={`bg-gradient-to-r ${treatment.color} p-6 text-white`}>
                                        <Icon className="w-12 h-12 mb-3" />
                                        <h3 className="text-2xl font-bold mb-2">{treatment.name}</h3>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="bg-white/20 px-3 py-1 rounded-full">
                                                ${treatment.price} MXN
                                            </span>
                                            <span className="bg-white/20 px-3 py-1 rounded-full">
                                                {treatment.duration}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-700 mb-4">{treatment.description}</p>

                                        <h4 className="font-semibold text-gray-900 mb-2">Beneficios:</h4>
                                        <ul className="space-y-1 mb-4">
                                            {treatment.benefits.slice(0, 3).map((benefit, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="border-t pt-4">
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Ingredientes:</h4>
                                            <p className="text-xs text-gray-600">{treatment.ingredients}</p>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="px-6 pb-6">
                                        <a
                                            href={`https://wa.me/5217757371811?text=Hola, me interesa el ${treatment.name} - $${treatment.price}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`block w-full bg-gradient-to-r ${treatment.color} text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity`}
                                        >
                                            Agendar Ahora
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Listo para sentirte mejor?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Agenda tu tratamiento de sueroterapia hoy y experimenta resultados inmediatos
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/5217757371811?text=Hola, quiero agendar una sueroterapia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
                        >
                            Agendar por WhatsApp
                        </a>
                        <Link
                            href="/sucursales"
                            className="inline-block bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition-colors"
                        >
                            Ver Sucursales
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
