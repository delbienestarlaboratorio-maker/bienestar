'use client';

import { Droplets, Sparkles, Shield, Zap, Leaf, Heart, Brain, Sun, Activity, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { TherapyModal } from '@/components/sueroterapia/TherapyModal';
import { TherapySearch } from '@/components/sueroterapia/TherapySearch';
import { therapiesDatabase, type TherapyDetails } from '@/data/sueroterapia/therapies-detailed';
import { RelatedTools } from '@/components/ui/RelatedTools';

const treatments = [
    {
        id: 1,
        slug: 'suero-energizante',
        name: 'Energizante',
        icon: Zap,
        color: 'from-amber-100 to-orange-100',
        price: 650,
        duration: '30-45 min',
        description: 'Combate la fatiga crónica y recupera tu energía natural.',
        image: '/images/sueroterapia/suero_energizante_1770683758902.png',
        ingredients: ['Vitamina B12', 'Complejo B', 'Magnesio', 'Taurina']
    },
    {
        id: 2,
        slug: 'suero-antioxidante',
        name: 'Antioxidante',
        icon: Shield,
        color: 'from-purple-100 to-pink-100',
        price: 850,
        duration: '45-60 min',
        description: 'Protección celular y piel radiante con glutatión.',
        image: '/images/sueroterapia/suero_antioxidante_1770683773076.png',
        ingredients: ['Glutatión', 'Vitamina C', 'Zinc', 'Selenio']
    },
    {
        id: 3,
        slug: 'suero-hidratante',
        name: 'Hidratante',
        icon: Droplets,
        color: 'from-blue-100 to-cyan-100',
        price: 450,
        duration: '30 min',
        description: 'Rehidratación profunda con electrolitos esenciales.',
        image: '/images/sueroterapia/suero_hidratante_1770683785747.png',
        ingredients: ['Suero Fisiológico', 'Electrolitos', 'Potasio', 'Sodio']
    },
    {
        id: 4,
        slug: 'suero-deportivo',
        name: 'Deportivo',
        icon: Activity,
        color: 'from-green-100 to-emerald-100',
        price: 750,
        duration: '45 min',
        description: 'Maximiza tu rendimiento y recuperación muscular.',
        image: '/images/sueroterapia/suero_deportivo_1770683799898.png',
        ingredients: ['Aminoácidos', 'L-Carnitina', 'Vitamina B', 'Magnesio']
    },
    {
        id: 5,
        slug: 'suero-detox',
        name: 'Detox',
        icon: Leaf,
        color: 'from-lime-100 to-green-100',
        price: 900,
        duration: '60 min',
        description: 'Limpieza profunda de toxinas y metales pesados.',
        image: '/images/sueroterapia/suero_detox_1770683814105.png',
        ingredients: ['Glutatión', 'Ácido Alfa Lipoico', 'Vitamina C', 'NAC']
    },
    {
        id: 6,
        slug: 'suero-inmune',
        name: 'Inmune',
        icon: Heart,
        color: 'from-red-100 to-rose-100',
        price: 700,
        duration: '40 min',
        description: 'Refuerza tus defensas con vitamina C y zinc.',
        image: '/images/sueroterapia/suero_inmune_1770683840821.png',
        ingredients: ['Vitamina C (5g)', 'Zinc', 'Selenio', 'Vitamina D3']
    },
    {
        id: 7,
        slug: 'suero-anti-aging',
        name: 'Anti-Aging',
        icon: Star,
        color: 'from-pink-100 to-purple-100',
        price: 1200,
        duration: '60 min',
        description: 'Rejuvenecimiento con colágeno y ácido hialurónico.',
        image: '/images/sueroterapia/suero_antiaging_1770683854924.png',
        ingredients: ['Colágeno', 'Ácido Hialurónico', 'Vitamina E', 'Coenzima Q10']
    },
    {
        id: 8,
        slug: 'suero-migraña',
        name: 'Migraña',
        icon: Brain,
        color: 'from-indigo-100 to-blue-100',
        price: 600,
        duration: '30 min',
        description: 'Alivio rápido de dolores de cabeza y migrañas.',
        image: '/images/sueroterapia/suero_migrana_1770683872522.png',
        ingredients: ['Magnesio', 'Vitamina B2', 'Coenzima Q10', 'Taurina']
    },
    {
        id: 9,
        slug: 'suero-post-covid',
        name: 'Post-COVID',
        icon: Sun,
        color: 'from-orange-100 to-amber-100',
        price: 950,
        duration: '60 min',
        description: 'Recuperación completa post-COVID con multivitamínicos.',
        image: '/images/sueroterapia/suero_postcovid_1770683885109.png',
        ingredients: ['Vitamina C', 'Zinc', 'Vitamina D', 'Glutatión']
    },
    {
        id: 10,
        slug: 'suero-belleza',
        name: 'Belleza',
        icon: Sparkles,
        color: 'from-fuchsia-100 to-purple-100',
        price: 850,
        duration: '45 min',
        description: 'Piel radiante con biotina y vitaminas esenciales.',
        image: '/images/sueroterapia/suero_belleza_1770683897795.png',
        ingredients: ['Biotina', 'Vitamina C', 'Glutatión', 'Ácido Hialurónico']
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
        <div className="min-h-screen bg-white">
            {/* Hero - CLEAN & PROFESSIONAL */}
            <section className="relative bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-6">
                            <Droplets size={16} className="text-purple-600" />
                            <span className="text-sm font-medium text-gray-700">Terapia Intravenosa Premium</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sueroterapia Intravenosa
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Nutrición celular directa con 100% de biodisponibilidad. Resultados visibles en 24-48 horas.
                        </p>

                        {/* Search Bar */}
                        <div className="mb-8">
                            <TherapySearch onTherapySelect={handleSearchSelect} />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-1">10</div>
                                <div className="text-sm text-gray-600">Tratamientos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                                <div className="text-sm text-gray-600">Absorción</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-1">24h</div>
                                <div className="text-sm text-gray-600">Resultados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ALL ITEMS - PROFESSIONAL GRID */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Nuestros Tratamientos
                            </h2>
                            <p className="text-lg text-gray-600">
                                Cada terapia está diseñada para necesidades específicas de salud y bienestar
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treatments.map((treatment) => {
                                const Icon = treatment.icon;
                                return (
                                    <div
                                        key={treatment.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                                            <Image
                                                src={treatment.image}
                                                alt={treatment.name}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${treatment.color}`}>
                                                    <Icon className="w-5 h-5 text-gray-700" />
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        ${treatment.price}
                                                    </div>
                                                    <div className="text-xs text-gray-500">MXN</div>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {treatment.name}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {treatment.description}
                                            </p>

                                            {/* INGREDIENTS - NEW */}
                                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                    Contiene:
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {treatment.ingredients.map((ing, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-gray-200"
                                                        >
                                                            {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center text-xs text-gray-500 mb-4">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {treatment.duration}
                                            </div>

                                            {/* CTAs */}
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => handleTherapyClick(treatment.slug)}
                                                    className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Ver Detalles Completos
                                                </button>
                                                <a
                                                    href={`https://wa.me/5217757371811?text=Hola, me interesa ${treatment.name} - $${treatment.price}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center"
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
                </div>
            </section>

            {/* benefit section - Professional */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    ¿Por qué Sueroterapia?
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    A diferencia de los suplementos orales que pierden hasta un 50% de efectividad, la terapia intravenosa garantiza absorción completa directa al torrente sanguíneo.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { title: 'Absorción 100%', desc: 'Nutrientes directos al torrente sanguíneo' },
                                        { title: 'Resultados Rápidos', desc: 'Efectos visibles en 24-48 horas' },
                                        { title: 'Personalizado', desc: 'Tratamientos adaptados a tus necesidades' },
                                        { title: 'Seguro y Profesional', desc: 'Aplicado por personal médico certificado' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/sueroterapia/suero_energizante_1770683758902.png"
                                        alt="Sueroterapia"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Tools */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <RelatedTools currentPath="/sueroterapia" className="mb-0" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Comienza tu transformación hoy
                        </h2>
                        <p className="text-xl text-purple-100 mb-8">
                            Agenda tu primera sesión y experimenta los beneficios de la sueroterapia
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/5217757371811?text=Hola, quiero ag endar una sueroterapia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Agendar por WhatsApp
                            </a>
                            <Link
                                href="/sucursales"
                                className="inline-block bg-purple-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors border border-white/20"
                            >
                                Ver Sucursales
                            </Link>
                        </div>
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
