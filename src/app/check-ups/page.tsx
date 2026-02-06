import Link from 'next/link';
import { ArrowLeft, Heart, Users, TrendingUp, Shield } from 'lucide-react';
import { checkUpPackages } from '@/data/checkups-data';
import { PackageCard } from '@/components/checkups/PackageCard';

export const metadata = {
    title: 'Check-Ups y Paquetes Médicos | Laboratorio Del Bienestar',
    description: 'Check-ups integrales y paquetes médicos especializados. Cuida tu salud con estudios preventivos completos a precios accesibles.',
};

export default function CheckUpsPage() {
    // Separate featured packages
    const featuredPackages = checkUpPackages.filter(pkg => pkg.featured);
    const regularPackages = checkUpPackages.filter(pkg => !pkg.featured);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>

                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Check-Ups Médicos
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                            Evaluaciones completas de salud diseñadas para cada etapa de tu vida
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mt-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Shield className="text-green-900" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2">Prevención</h3>
                            <p className="text-green-100 text-sm">Detecta problemas antes de que aparezcan</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="text-blue-900" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2">Integral</h3>
                            <p className="text-green-100 text-sm">Evaluación completa de tu salud</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="text-purple-900" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2">Especializado</h3>
                            <p className="text-green-100 text-sm">Paquetes por edad y género</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="text-amber-900" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2">Ahorros</h3>
                            <p className="text-green-100 text-sm">Hasta 30% de descuento</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Featured Packages */}
                {featuredPackages.length > 0 && (
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                🌟 Paquetes Más Populares
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Los check-ups más completos y solicitados por nuestros pacientes
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {featuredPackages.map(pkg => (
                                <PackageCard key={pkg.id} package={pkg} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Packages Grid */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Todos los Check-Ups
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Encuentra el paquete perfecto para tus necesidades de salud
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPackages.map(pkg => (
                            <PackageCard key={pkg.id} package={pkg} />
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mt-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        ¿Por qué elegir nuestros Check-Ups?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🔬</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Tecnología de Punta
                            </h3>
                            <p className="text-gray-700">
                                Equipos automatizados de última generación para resultados precisos y confiables
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-5xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Personal Certificado
                            </h3>
                            <p className="text-gray-700">
                                Químicos y técnicos certificados con años de experiencia en análisis clínicos
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-5xl mb-4">⏱️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Resultados Rápidos
                            </h3>
                            <p className="text-gray-700">
                                Entrega de resultados en 24-48 horas, disponibles en línea y por correo
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ Quick */}
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Preguntas Frecuentes
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-4">
                        <details className="bg-white rounded-xl p-6 shadow-md group">
                            <summary className="font-semibold cursor-pointer text-gray-900 flex justify-between items-center">
                                ¿Qué incluye un check-up?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-700">
                                Cada check-up incluye un conjunto de estudios de laboratorio específicos diseñados para evaluar
                                tu salud de manera integral. Los estudios varían según el paquete, pero generalmente incluyen
                                biometría hemática, química sanguínea, perfil de lípidos y examen de orina, entre otros.
                            </p>
                        </details>

                        <details className="bg-white rounded-xl p-6 shadow-md group">
                            <summary className="font-semibold cursor-pointer text-gray-900 flex justify-between items-center">
                                ¿Necesito orden médica?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-700">
                                No, para los check-ups preventivos NO necesitas orden médica. Sin embargo, te recomendamos
                                consultar los resultados con tu médico de confianza para su interpretación adecuada.
                            </p>
                        </details>

                        <details className="bg-white rounded-xl p-6 shadow-md group">
                            <summary className="font-semibold cursor-pointer text-gray-900 flex justify-between items-center">
                                ¿Con qué frecuencia debo hacerme un check-up?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-700">
                                Se recomienda realizar un check-up anualmente si estás sano. Si tienes condiciones crónicas
                                como diabetes o hipertensión, tu médico puede recomendar hacerlo cada 6 meses.
                            </p>
                        </details>

                        <details className="bg-white rounded-xl p-6 shadow-md group">
                            <summary className="font-semibold cursor-pointer text-gray-900 flex justify-between items-center">
                                ¿Puedo personalizar mi check-up?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-700">
                                Sí, puedes agregar estudios adicionales a cualquier paquete o crear un paquete personalizado.
                                Contáctanos por WhatsApp o en sucursal para asesorarte.
                            </p>
                        </details>
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-2 text-green-900 font-semibold hover:underline"
                        >
                            Ver todas las preguntas frecuentes →
                        </Link>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="mt-20 bg-gradient-to-r from-green-900 to-green-700 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Listo para cuidar tu salud?
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        Agenda tu check-up hoy y obtén resultados confiables en 24-48 horas
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contacto"
                            className="px-8 py-4 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg"
                        >
                            Agendar Cita
                        </Link>
                        <Link
                            href="https://wa.me/527751234567"
                            target="_blank"
                            className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
                        >
                            WhatsApp
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
