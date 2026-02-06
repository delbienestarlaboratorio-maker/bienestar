'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckUpPackage } from '@/data/checkups-data';
import { Check, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface PackageCardProps {
    package: CheckUpPackage;
}

export const PackageCard = ({ package: pkg }: PackageCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const colorClasses = {
        blue: 'from-blue-600 to-blue-700 border-blue-200',
        purple: 'from-purple-600 to-purple-700 border-purple-200',
        pink: 'from-pink-600 to-pink-700 border-pink-200',
        indigo: 'from-indigo-600 to-indigo-700 border-indigo-200',
        amber: 'from-amber-600 to-amber-700 border-amber-200',
        green: 'from-green-600 to-green-700 border-green-200',
        red: 'from-red-600 to-red-700 border-red-200',
        rose: 'from-rose-600 to-rose-700 border-rose-200',
    };

    const gradient = colorClasses[pkg.color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${pkg.featured ? 'ring-4 ring-green-400 ring-offset-4' : ''
            } hover:shadow-2xl hover:scale-[1.02]`}>
            {/* Featured Badge */}
            {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <Sparkles size={16} />
                        MÁS POPULAR
                    </div>
                </div>
            )}

            {/* Discount Badge */}
            {pkg.discount && (
                <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-center">
                            <div className="text-xs font-bold">-{pkg.discount}%</div>
                            <div className="text-[10px]">AHORRO</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Card Content */}
            <div className="p-8">
                {/* Header */}
                <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-xl mb-6 -mt-2 -mx-2`}>
                    <div className="text-5xl mb-3">{pkg.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm opacity-90">{pkg.subtitle}</p>
                </div>

                {/* Target Audience */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 text-center">
                        <span className="font-semibold">Ideal para:</span> {pkg.targetAudience}
                    </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                    {pkg.originalPrice && (
                        <p className="text-gray-400 line-through text-lg mb-1">
                            ${pkg.originalPrice.toLocaleString()} MXN
                        </p>
                    )}
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-5xl font-bold text-green-900">
                            ${pkg.price.toLocaleString()}
                        </span>
                        <span className="text-gray-600 text-lg">MXN</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm">Entrega: {pkg.deliveryTime}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 text-center">
                    {pkg.description}
                </p>

                {/* Benefits Preview */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">✨ Beneficios Principales:</h4>
                    <ul className="space-y-2">
                        {pkg.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                        {pkg.benefits.length > 3 && !isExpanded && (
                            <li className="text-sm text-green-900 font-semibold">
                                +{pkg.benefits.length - 3} beneficios más...
                            </li>
                        )}
                    </ul>
                </div>

                {/* Expand/Collapse Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-2 text-green-900 font-semibold text-sm hover:bg-green-50 rounded-lg transition-colors mb-4"
                >
                    {isExpanded ? '▲ Ver menos' : '▼ Ver detalles completos'}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="space-y-6 mb-6 border-t pt-6">
                        {/* All Benefits */}
                        {pkg.benefits.length > 3 && (
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Todos los Beneficios:</h4>
                                <ul className="space-y-2">
                                    {pkg.benefits.slice(3).map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Studies Included */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                                📋 Estudios Incluidos ({pkg.studies.length}):
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                                <ul className="space-y-2">
                                    {pkg.studies.map((study, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                            <span className="text-green-600 font-bold">•</span>
                                            <div>
                                                <span className="font-medium">{study.name}</span>
                                                <span className="text-gray-500 text-xs ml-2">({study.category})</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Ideal For */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">👤 ¿Para quién es ideal?</h4>
                            <ul className="space-y-2">
                                {pkg.idealFor.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Preparation */}
                        {pkg.preparationNote && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-sm text-gray-800">
                                    <strong className="text-yellow-900">⚠️ Preparación:</strong> {pkg.preparationNote}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <Link
                        href={`/contacto?paquete=${encodeURIComponent(pkg.name)}`}
                        className="block w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-center rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Agendar Cita
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="https://wa.me/527751234567"
                        target="_blank"
                        className="block w-full py-3 border-2 border-green-900 text-green-900 font-semibold text-center rounded-xl hover:bg-green-50 transition-colors"
                    >
                        Consultar por WhatsApp
                    </Link>
                </div>
            </div>
        </div>
    );
};
