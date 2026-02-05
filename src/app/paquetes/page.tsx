import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Check, ArrowRight, Star } from 'lucide-react';
import { studyPackages, packageCategories } from '@/data/studyPackages';

export const metadata: Metadata = {
    title: 'Paquetes de Estudios Médicos | Laboratorio del Bienestar',
    description: '14 paquetes diseñados para tu salud con hasta 30% de descuento. Check-ups para ella, él, por edad y condición. Prevención, fertilidad, diabetes y más en Tizayuca.',
    keywords: ['paquetes médicos', 'check-up mujer', 'check-up hombre', 'análisis clínicos paquete', 'estudios médicos descuento', 'tizayuca']
};

export default function PaquetesPage() {
    const featuredPackages = studyPackages.filter(p => p.featured);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                        <Package size={20} />
                        <span className="font-semibold">Ahorra hasta 30%</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Paquetes Diseñados para Tu Salud
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Estudios médicos completos a precios especiales. Prevención inteligente para toda la familia.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {packageCategories.map((cat) => (
                            <button
                                key={cat.id}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 whitespace-nowrap transition-all"
                            >
                                <span className="text-xl">{cat.icon}</span>
                                <span className="font-medium text-gray-700">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Packages */}
            {featuredPackages.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="text-yellow-500" fill="currentColor" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">Más Populares</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {featuredPackages.map((pkg) => (
                            <PackageCard key={pkg.id} package={pkg} featured />
                        ))}
                    </div>
                </div>
            )}

            {/* All Packages by Category */}
            {packageCategories.slice(1).map((category) => {
                const packages = studyPackages.filter(p => p.category === category.id);
                if (packages.length === 0) return null;

                return (
                    <div key={category.id} className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-3xl">{category.icon}</span>
                            <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg) => (
                                <PackageCard key={pkg.id} package={pkg} />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* CTA */}
            <div className="bg-blue-600 text-white py-16 px-4 mt-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Contáctanos y diseñamos un paquete personalizado para ti
                    </p>
                    <a
                        href="https://wa.me/5217757371811?text=Hola, quiero información sobre paquetes personalizados"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </div>
        </main>
    );
}

function PackageCard({ package: pkg, featured = false }: { package: any; featured?: boolean }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-2 ${featured ? 'border-yellow-400' : 'border-gray-100'} overflow-hidden`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{pkg.icon}</span>
                    {featured && (
                        <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                            POPULAR
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-blue-100">{pkg.categoryLabel}</p>
            </div>

            {/* Pricing */}
            <div className="p-6 bg-blue-50">
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-gray-500 line-through text-lg">
                        ${pkg.priceRegular.toLocaleString('es-MX')}
                    </span>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        -{pkg.savingsPercent}%
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600">
                        ${pkg.pricePackage.toLocaleString('es-MX')}
                    </span>
                    <span className="text-gray-600">MXN</span>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-2">
                    Ahorras ${pkg.savings.toLocaleString('es-MX')}
                </p>
            </div>

            {/* Studies List */}
            <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Incluye:</p>
                <ul className="space-y-2 mb-4">
                    {pkg.studies.slice(0, 5).map((study: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{study}</span>
                        </li>
                    ))}
                    {pkg.studies.length > 5 && (
                        <li className="text-sm text-blue-600 font-medium">
                            + {pkg.studies.length - 5} estudios más
                        </li>
                    )}
                </ul>

                {/* Ideal For */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Ideal para:</p>
                    <p className="text-sm text-gray-700">{pkg.idealFor}</p>
                </div>

                {/* CTA */}
                <Link
                    href={`/agendar?package=${pkg.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-all group"
                >
                    <span className="flex items-center justify-center gap-2">
                        Comprar Paquete
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
