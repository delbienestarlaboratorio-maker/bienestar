import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, Star, Heart, Activity, Users, Shield, Sparkles } from 'lucide-react';
import { studyPackages, packageCategories } from '@/data/studyPackages';
import { AdBanner } from '@/components/ui/AdBanner';

export const metadata: Metadata = {
    title: 'Paquetes de Estudios Médicos | Laboratorio del Bienestar',
    description: '14 paquetes diseñados para tu salud con hasta 30% de descuento. Check-ups para ella, él, por edad y condición. Prevención, fertilidad, diabetes y más en Tizayuca.',
    keywords: ['paquetes médicos', 'check-up mujer', 'check-up hombre', 'análisis clínicos paquete', 'estudios médicos descuento', 'tizayuca']
};

// Mapeo de categorías a imágenes e íconos únicos
const categoryAssets: Record<string, { image: string; icon: any; color: string }> = {
    'para-ella': { image: '/images/packages/para-ella.png', icon: Heart, color: 'from-pink-600 to-rose-600' },
    'para-el': { image: '/images/packages/para-el.png', icon: Activity, color: 'from-blue-600 to-cyan-600' },
    'por-edad': { image: '/images/packages/por-edad.png', icon: Users, color: 'from-orange-600 to-amber-600' },
    'por-condicion': { image: '/images/packages/por-condicion.png', icon: Shield, color: 'from-green-600 to-emerald-600' },
    'especiales': { image: '/images/packages/especiales.png', icon: Sparkles, color: 'from-purple-600 to-violet-600' }
};

export default function PaquetesPage() {
    const featuredPackages = studyPackages.filter(p => p.featured);

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero - Diseño Mejorado */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4 overflow-hidden">
                {/* Patrón de fondo sutil */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-white/30">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        <span className="font-bold text-sm">Ahorra hasta 30% en paquetes</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Paquetes de Estudios<br />
                        <span className="text-blue-200">Diseñados para Ti</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Check-ups completos con descuentos especiales. Prevención inteligente para toda la familia.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Check className="text-green-300" size={18} />
                            <span>14 paquetes disponibles</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Check className="text-green-300" size={18} />
                            <span>Hasta 30% de descuento</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Check className="text-green-300" size={18} />
                            <span>Resultados en 24-48h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paquetes Destacados */}
            {featuredPackages.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Star className="text-yellow-500" fill="currentColor" size={32} />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Los Más Populares</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPackages.map((pkg) => (
                            <PackageCard key={pkg.id} package={pkg} featured />
                        ))}
                    </div>
                </section>
            )}

            {/* Categorías de Paquetes */}
            {packageCategories.slice(1).map((category) => {
                const packages = studyPackages.filter(p => p.category === category.id);
                if (packages.length === 0) return null;

                const assets = categoryAssets[category.id] || categoryAssets['especiales'];
                const Icon = assets.icon;

                return (
                    <section key={category.id} className="py-16 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Category Header con Imagen de Fondo */}
                            <div className="relative rounded-2xl overflow-hidden mb-12 h-48 md:h-56">
                                <Image
                                    src={assets.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    priority={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                                <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className={`p-3 bg-gradient-to-br ${assets.color} rounded-xl`}>
                                            <Icon className="text-white" size={32} />
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <p className="text-lg text-white/90 drop-shadow-md max-w-2xl">
                                        {getCategoryDescription(category.id)}
                                    </p>
                                </div>
                            </div>

                            {/* Paquetes Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {packages.map((pkg) => (
                                    <PackageCard key={pkg.id} package={pkg} />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Banner Publicitario */}
            <section className="bg-white py-12 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4">
                    <AdBanner />
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4 mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Necesitas un Paquete Personalizado?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Nuestro equipo médico puede diseñar un paquete de estudios específico para tus necesidades de salud
                    </p>
                    <a
                        href="https://wa.me/5217757371811?text=Hola, quiero información sobre paquetes personalizados"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>
        </main>
    );
}

function PackageCard({ package: pkg, featured = false }: { package: any; featured?: boolean }) {
    const categoryAsset = categoryAssets[pkg.category];
    const gradientColor = categoryAsset?.color || 'from-blue-500 to-blue-600';

    return (
        <article className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${featured ? 'border-yellow-400 ring-4 ring-yellow-100' : 'border-gray-100'} overflow-hidden group hover:-translate-y-1`}>
            {/* Header con Gradiente */}
            <div className={`relative bg-gradient-to-br ${gradientColor} text-white p-6`}>
                {featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1">
                        <Star size={14} fill="currentColor" />
                        Popular
                    </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold mb-2 pr-20">{pkg.name}</h3>
                <p className="text-sm text-white opacity-90">{pkg.categoryLabel}</p>
            </div>

            {/* Pricing Section - Mejorado */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b-2 border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-500 line-through text-lg">
                                ${pkg.priceRegular.toLocaleString('es-MX')}
                            </span>
                            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                -{pkg.savingsPercent}%
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                ${pkg.pricePackage.toLocaleString('es-MX')}
                            </span>
                            <span className="text-gray-600 font-medium">MXN</span>
                        </div>
                    </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 px-3 py-2 rounded">
                    <span className="text-sm text-green-700 font-bold">
                        ✓ Ahorras ${pkg.savings.toLocaleString('es-MX')} MXN
                    </span>
                </div>
            </div>

            {/* Studies List - Más Compacto */}
            <div className="p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Incluye {pkg.studies.length} estudios:</h4>
                <ul className="space-y-2.5 mb-5">
                    {pkg.studies.slice(0, 4).map((study: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span className="leading-snug">{study}</span>
                        </li>
                    ))}
                    {pkg.studies.length > 4 && (
                        <li className="text-sm text-blue-600 font-semibold pl-6">
                            + {pkg.studies.length - 4} estudios más
                        </li>
                    )}
                </ul>

                {/* Ideal For - Rediseñado */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-5">
                    <p className="text-xs font-bold text-blue-900 mb-1.5 uppercase tracking-wide">Ideal para</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{pkg.idealFor}</p>
                </div>

                {/* CTA Button -  Mejorado */}
                <Link
                    href={`/agendar?package=${pkg.id}`}
                    className={`block w-full bg-gradient-to-r ${gradientColor} text-white text-center py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Comprar Paquete
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            </div>
        </article>
    );
}

// Helper function para descripciones SEO
function getCategoryDescription(categoryId: string): string {
    const descriptions: Record<string, string> = {
        'para-ella': 'Paquetes diseñados específicamente para el cuidado de la salud femenina',
        'para-el': 'Check-ups completos enfocados en la prevención y salud masculina',
        'por-edad': 'Paquetes adaptados a cada etapa de la vida, desde niños hasta adultos mayores',
        'por-condicion': 'Estudios especializados para el control y prevención de condiciones específicas',
        'especiales': 'Paquetes únicos para necesidades de salud y bienestar particulares'
    };
    return descriptions[categoryId] || 'Paquetes de estudios médicos especializados';
}
