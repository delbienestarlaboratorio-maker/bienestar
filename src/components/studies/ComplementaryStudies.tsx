'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Plus, Check } from 'lucide-react';

interface ComplementaryStudy {
    study: {
        id: string;
        name: string;
        slug: string;
        categoryId: string;
        priceRegular: number;
        pricePromotional?: number;
        description?: string;
        image?: string;
    };
    correlation: {
        relationType: string;
        medicalReason: string;
        clinicalValue: string;
        priority: number;
        bundleDiscount: number;
    };
    pricing: {
        individualPrice: number;
        bundlePrice: number;
        savings: number;
    };
}

interface Props {
    studyId: string;
    studyName: string;
    onAddToCart?: (studyId: string) => void;
}

export function ComplementaryStudies({ studyId, studyName, onAddToCart }: Props) {
    const [studies, setStudies] = useState<ComplementaryStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [addedStudies, setAddedStudies] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch(`/api/studies/${studyId}/complementary`)
            .then(res => res.json())
            .then(data => {
                if (data.complementaryStudies) {
                    setStudies(data.complementaryStudies);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [studyId]);

    const handleAddToCart = (study: ComplementaryStudy) => {
        if (onAddToCart) {
            onAddToCart(study.study.id);
            setAddedStudies(prev => new Set([...prev, study.study.id]));
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (studies.length === 0) {
        return null;
    }

    const getRelationIcon = (type: string) => {
        switch (type) {
            case 'upgrade':
                return <TrendingUp className="w-5 h-5 text-purple-600" />;
            case 'complements':
                return <Sparkles className="w-5 h-5 text-blue-600" />;
            default:
                return <Plus className="w-5 h-5 text-green-600" />;
        }
    };

    const getRelationLabel = (type: string) => {
        switch (type) {
            case 'upgrade':
                return 'Opción Mejorada';
            case 'complements':
                return 'Complemento Recomendado';
            default:
                return 'Alternativa';
        }
    };

    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Análisis más completo
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Recomendaciones médicas profesionales
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {studies.map((item) => {
                    const isAdded = addedStudies.has(item.study.id);

                    return (
                        <div
                            key={item.study.id}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 flex-1">
                                    {getRelationIcon(item.correlation.relationType)}
                                    <div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            {getRelationLabel(item.correlation.relationType)}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                                            {item.study.name}
                                        </h3>
                                    </div>
                                </div>

                                {item.correlation.bundleDiscount > 0 && (
                                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                                        {item.correlation.bundleDiscount}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Medical Reason */}
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-700 mb-1">
                                    💊 {item.correlation.medicalReason}
                                </p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.correlation.clinicalValue}
                                </p>
                            </div>

                            {/* Pricing & CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${item.pricing.bundlePrice.toFixed(2)}
                                    </span>
                                    {item.correlation.bundleDiscount > 0 && (
                                        <>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${item.pricing.individualPrice.toFixed(2)}
                                            </span>
                                            <span className="text-sm text-green-600 font-semibold">
                                                Ahorras ${item.pricing.savings.toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/estudios/${item.study.categoryId}/${item.study.slug}`}
                                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        Ver detalles
                                    </Link>

                                    {onAddToCart && (
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            disabled={isAdded}
                                            className={`
                        px-6 py-2 text-sm font-semibold rounded-lg transition-all
                        ${isAdded
                                                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                                                }
                      `}
                                        >
                                            {isAdded ? (
                                                <span className="flex items-center gap-2">
                                                    <Check className="w-4 h-4" />
                                                    Agregado
                                                </span>
                                            ) : (
                                                'Agregar'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-gray-600 text-center">
                    💡 <strong>Recomendación profesional:</strong> Estos estudios complementan tu análisis basándose en criterios médicos establecidos.
                    Consulta con tu médico si tienes dudas.
                </p>
            </div>
        </section>
    );
}
