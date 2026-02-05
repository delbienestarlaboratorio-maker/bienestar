'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Package,
    TrendingDown,
    Check,
    ShoppingCart,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react';
import { pixelTracker } from '@/lib/tracking/pixels';

interface PanelStudy {
    id: string;
    name: string;
    slug: string;
    price: string;
    category: string;
    displayOrder: number;
    isRequired: boolean;
}

interface StudyPanel {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    panelPrice: number;
    individualPrice: number;
    savings: number;
    savingsPercentage: number;
    studies: PanelStudy[];
    studyCount: number;
    viewCount: number;
    purchaseCount: number;
    isFeatured: boolean;
}

interface RecommendedPanelsProps {
    studyId: string;
    limit?: number;
}

export function RecommendedPanels({ studyId, limit = 3 }: RecommendedPanelsProps) {
    const [panels, setPanels] = useState<StudyPanel[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchPanels();
    }, [studyId]);

    const fetchPanels = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/studies/${studyId}/panels?limit=${limit}`);

            if (!response.ok) throw new Error('Failed to fetch panels');

            const data = await response.json();
            setPanels(data.panels || []);

            // Track panel impressions
            if (data.panels && data.panels.length > 0) {
                pixelTracker.trackCustomEvent('PanelsViewed', {
                    study_id: studyId,
                    panel_count: data.panels.length,
                    panel_ids: data.panels.map((p: StudyPanel) => p.id)
                });
            }
        } catch (error) {
            console.error('[RecommendedPanels] Error:', error);
            setPanels([]);
        } finally {
            setLoading(false);
        }
    };

    const togglePanel = (panelId: string) => {
        setExpandedPanels(prev => {
            const newSet = new Set(prev);
            if (newSet.has(panelId)) {
                newSet.delete(panelId);
            } else {
                newSet.add(panelId);
                // Track expansion
                pixelTracker.trackCustomEvent('PanelExpanded', {
                    panel_id: panelId,
                    study_id: studyId
                });
            }
            return newSet;
        });
    };

    const handleAddToCart = (panel: StudyPanel) => {
        // Track add to cart event
        pixelTracker.trackCustomEvent('PanelAddedToCart', {
            panel_id: panel.id,
            panel_name: panel.name,
            panel_price: panel.panelPrice,
            savings: panel.savings,
            study_count: panel.studyCount
        });

        // TODO: Integrate with cart context
        console.log('Add panel to cart:', panel);
    };

    if (loading) {
        return (
            <div className="recommended-panels-skeleton py-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!panels || panels.length === 0) {
        return null;
    }

    return (
        <section className="recommended-panels py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        💡 Ahorra con nuestros Paneles
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Agrupa estudios relacionados y ahorra hasta {Math.max(...panels.map(p => p.savingsPercentage))}%
                    </p>
                </div>
            </div>

            {/* Panels Grid */}
            <div className="space-y-4">
                {panels.map((panel) => {
                    const isExpanded = expandedPanels.has(panel.id);

                    return (
                        <div
                            key={panel.id}
                            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 border-2 border-purple-200 dark:border-purple-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Panel Header */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    {/* Panel Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {panel.name}
                                            </h4>
                                            {panel.isFeatured && (
                                                <span className="flex items-center gap-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                                                    <Sparkles className="w-3 h-3" />
                                                    Destacado
                                                </span>
                                            )}
                                        </div>

                                        {panel.description && (
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {panel.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Package className="w-4 h-4" />
                                                {panel.studyCount} estudios incluidos
                                            </span>
                                            {panel.purchaseCount > 0 && (
                                                <span>
                                                    {panel.purchaseCount} personas lo han comprado
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing Box */}
                                    <div className="flex-shrink-0 text-right">
                                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700 min-w-[200px]">
                                            {/* Individual Price */}
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Precio individual:
                                                </p>
                                                <p className="text-lg line-through text-gray-400 dark:text-gray-600">
                                                    ${panel.individualPrice.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Panel Price */}
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    En panel:
                                                </p>
                                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                                    ${panel.panelPrice.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Savings */}
                                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg">
                                                <div className="flex items-center justify-center gap-1 text-sm font-semibold">
                                                    <TrendingDown className="w-4 h-4" />
                                                    Ahorras ${panel.savings.toFixed(2)}
                                                </div>
                                                <p className="text-xs text-center mt-1">
                                                    ({panel.savingsPercentage}% OFF)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle Studies Button */}
                                <button
                                    onClick={() => togglePanel(panel.id)}
                                    className="mt-4 w-full flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp className="w-4 h-4" />
                                            Ocultar estudios incluidos
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" />
                                            Ver estudios incluidos ({panel.studyCount})
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Expanded Studies List */}
                            {isExpanded && (
                                <div className="border-t border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 p-6">
                                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                        Estudios incluidos en este panel:
                                    </h5>

                                    <div className="space-y-2 mb-6">
                                        {panel.studies
                                            .sort((a, b) => a.displayOrder - b.displayOrder)
                                            .map((study) => (
                                                <div
                                                    key={study.id}
                                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                                        <Link
                                                            href={`/estudios/${study.category}/${study.slug}`}
                                                            className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                                        >
                                                            {study.name}
                                                        </Link>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                                                            ${parseFloat(study.price).toFixed(2)}
                                                        </span>
                                                        <Link
                                                            href={`/estudios/${study.category}/${study.slug}`}
                                                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                                            aria-label={`Ver ${study.name}`}
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Comparison Summary */}
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Total individual
                                                </p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    ${panel.individualPrice.toFixed(2)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Precio panel
                                                </p>
                                                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                                    ${panel.panelPrice.toFixed(2)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Tu ahorro
                                                </p>
                                                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                                    ${panel.savings.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="border-t border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleAddToCart(panel)}
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Agregar Panel Completo
                                    </button>
                                    <Link
                                        href={`/paneles/${panel.slug}`}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-purple-600 dark:text-purple-400 font-semibold py-3 px-6 rounded-lg border border-purple-300 dark:border-purple-700 transition-colors"
                                    >
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
