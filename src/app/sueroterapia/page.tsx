'use client';

import { Metadata } from 'next';
import { Droplets, Sparkles, Shield, Zap, Leaf, Heart, Brain, Sun, Activity, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { TherapyModal } from '@/components/sueroterapia/TherapyModal';
import { TherapySearch } from '@/components/sueroterapia/TherapySearch';
import { therapiesDatabase, type TherapyDetails } from '@/data/sueroterapia/therapies-detailed';

const treatments = [
    {
        id: 1,
        slug: 'suero-energizante',
        name: 'Suero Energizante',
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        price: 650,
        duration: '30-45 min',
        description: 'Combate la fatiga crónica y recupera tu energía natural con nuestro suero enriquecido con complejo B.',
    },
    {
        id: 2,
        slug: 'suero-antioxidante',
        name: 'Suero Antioxidante',
        icon: Shield,
        color: 'from-purple-500 to-pink-500',
        price: 850,
        duration: '45-60 min',
        description: 'Protege tus células del daño oxidativo con nuestro potente suero de glutatión y vitamina C.',
    },
    {
        id: 3,
        slug: 'suero-hidratante',
        name: 'Suero Hidratante',
        icon: Droplets,
        color: 'from-blue-400 to-cyan-500',
        price: 450,
        duration: '30 min',
        description: 'Rehidrata tu cuerpo rápidamente con electrolitos esenciales y suero fisiológico balanceado.',
    },
    {
        id: 4,
        slug: 'suero-deportivo',
        name: 'Suero Deportivo',
        icon: Activity,
        color: 'from-green-500 to-emerald-600',
        price: 750,
        duration: '45 min',
        description: 'Maximiza tu rendimiento y acelera la recuperación muscular con aminoácidos esenciales.',
    },
    {
        id: 5,
        slug: 'suero-detox',
        name: 'Suero Detox',
        icon: Leaf,
        color: 'from-lime-500 to-green-600',
        price: 900,
        duration: '60 min',
        description: 'Limpia tu organismo de toxinas acumuladas con nuestro suero desintoxicante premium.',
    },
    {
        id: 6,
        slug: 'suero-inmune',
        name: 'Suero Inmune',
        icon: Heart,
        color: 'from-red-500 to-rose-600',
        price: 700,
        duration: '40 min',
        description: 'Fortalece tus defensas naturales con altas dosis de vitamina C y zinc para prevenir enfermedades.',
    },
    {
        id: 7,
        slug: 'suero-anti-aging',
        name: 'Suero Anti-Aging',
        icon: Star,
        color: 'from-pink-500 to-purple-600',
        price: 1200,
        duration: '60 min',
        description: 'Rejuvenece desde dentro con nuestro suero premium de colágeno y antioxidantes de última generación.',
    },
    {
        id: 8,
        slug: 'suero-migraña',
        name: 'Suero Migraña',
        icon: Brain,
        color: 'from-indigo-500 to-blue-600',
        price: 600,
        duration: '30 min',
        description: 'Alivia dolores de cabeza severos y migrañas con nuestro suero especializado de magnesio.',
    },
    {
        id: 9,
        slug: 'suero-post-covid',
        name: 'Suero Post-COVID',
        icon: Sun,
        color: 'from-orange-500 to-amber-600',
        price: 950,
        duration: '60 min',
        description: 'Recupera tu vitalidad después de COVID-19 con nuestro suero especializado multivitamínico.',
    },
    {
        id: 10,
        slug: 'suero-belleza',
        name: 'Suero Belleza',
        icon: Sparkles,
        color: 'from-fuchsia-500 to-purple-600',
        price: 850,
        duration: '45 min',
        description: 'Realza tu belleza natural con biotina, ácido hialurónico y vitaminas esenciales para piel radiante.',
    },
];

export default function SueroterapiaPage() {
    const [selectedTherapy, setSelectedTherapy] = useState<TherapyDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTherapyClick = (therapySlug: string) => {
        const therapy = therapiesDatabase.find(t => t.slug === therapySlug);
        if (therapy) {
            setSelectedTherapy(therapy);
            setIsModalOpen(true);
        }
    };

    const handleSearchSelect = (therapy: TherapyDetails) => {
        setSelectedTherapy(therapy);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero with Search */}
            <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Hero Hero Image - if available */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative w-full max-w-3xl h-64 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/C:/Users/Administrador/.gemini/antigravity/brain/ff97b6ab-1b07-4437-84f7-8a03783c8933/sueroterapia_hero_1770651489101.png"
                                    alt="Sueroterapia Profesional"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        // Fallback to gradient if image fails
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                            Sueroterapia Intravenosa
                        </h1>
                        <p className="text-2xl md:text-3xl text-purple-100 mb-4">
                            Nutrición celular directa para resultados inmediatos
                        </p>
                        <p className="text-lg text-purple-50 mb-12">
                            10 tratamientos especializados diseñados para tu bienestar
                        </p>

                        {/* Search Bar */}
                        <TherapySearch onTherapySelect={handleSearchSelect} />
                    </div>
                </div>
            </section>

            {/* What is IV Therapy */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center mb-8">¿Qué es la Sueroterapia?</h2>
                    <div className="prose prose-lg mx-auto text-gray-700">
                        <p>
                            La sueroterapia, también conocida como terapia intr

                            avenosa (IV therapy), es un tratamiento médico que consiste en la administración de vitaminas, minerales, antioxidantes y otros nutrientes esenciales directamente al torrente sanguíneo a través de una vía intravenosa.
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

            {/* Treatments Grid - WITH 3X LARGER PRICES */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Nuestros Tratamientos</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Click en "Ver Detalles" para información completa de cada terapia
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {treatments.map((treatment) => {
                            const Icon = treatment.icon;
                            return (
                                <div
                                    key={treatment.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Header */}
                                    <div className={`bg-gradient-to-r ${treatment.color} p-6 text-white relative`}>
                                        <Icon className="w-16 h-16 mb-4" />
                                        <h3 className="text-2xl font-bold mb-3">{treatment.name}</h3>

                                        {/* PRICE 3X LARGER - Main User Request */}
                                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                                            <div className="text-xs uppercase tracking-wider mb-1 opacity-90">Precio</div>
                                            <div className="text-6xl font-black leading-none mb-2">
                                                ${treatment.price}
                                            </div>
                                            <div className="text-sm opacity-90">MXN • {treatment.duration}</div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-700 mb-6 min-h-[60px]">{treatment.description}</p>

                                        {/* CTA Buttons */}
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => handleTherapyClick(treatment.slug)}
                                                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                            >
                                                Ver Detalles Completos
                                            </button>
                                            <a
                                                href={`https://wa.me/5217757371811?text=Hola, me interesa el ${treatment.name} - $${treatment.price}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`block w-full bg-gradient-to-r ${treatment.color} text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity`}
                                            >
                                                Agendar por WhatsApp
                                            </a>
                                        </div>
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
                            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-xl"
                        >
                            Agendar por WhatsApp
                        </a>
                        <Link
                            href="/sucursales"
                            className="inline-block bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition-colors shadow-xl"
                        >
                            Ver Sucursales
                        </Link>
                    </div>
                </div>
            </section>

            {/* Therapy Modal */}
            <TherapyModal
                therapy={selectedTherapy}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
