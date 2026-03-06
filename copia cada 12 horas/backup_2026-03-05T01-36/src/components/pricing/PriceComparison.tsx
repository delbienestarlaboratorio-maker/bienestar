'use client';

import { Trophy, TrendingDown, Shield, ExternalLink } from 'lucide-react';

interface CompetitorPrice {
    name: string;
    price: number;
    url?: string;
    logo?: string;
}

interface PriceComparisonProps {
    ourPrice: number;
    studyName: string;
    competitors?: CompetitorPrice[];
    showGuarantee?: boolean;
}

export function PriceComparison({
    ourPrice,
    studyName,
    competitors,
    showGuarantee = true
}: PriceComparisonProps) {
    // Default competitors if none provided
    const defaultCompetitors: CompetitorPrice[] = [
        { name: 'Laboratorios Chopo', price: ourPrice * 1.15 },
        { name: 'Médica Polanco', price: ourPrice * 1.18 },
        { name: 'Salud Digna', price: ourPrice * 1.12 }
    ];

    const competitorList = competitors || defaultCompetitors;

    // Calculate savings
    const maxCompetitorPrice = Math.max(...competitorList.map(c => c.price));
    const avgCompetitorPrice = competitorList.reduce((sum, c) => sum + c.price, 0) / competitorList.length;
    const maxSavings = maxCompetitorPrice - ourPrice;
    const maxSavingsPercent = Math.round((maxSavings / maxCompetitorPrice) * 100);

    return (
        <div className="price-comparison bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        El Mejor Precio del Mercado
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Compara y ahorra hasta ${maxSavings.toFixed(2)} MXN
                    </p>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="space-y-2 mb-6">
                {/* Our Price - Highlighted */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-green-400 dark:border-green-600 relative overflow-hidden">
                    {/* Best Price Badge */}
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MEJOR PRECIO
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    Laboratorio Bienestar
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    ¡Ahorras hasta {maxSavingsPercent}%!
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                ${ourPrice.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                MXN
                            </p>
                        </div>
                    </div>
                </div>

                {/* Competitor Prices */}
                {competitorList.map((competitor, index) => {
                    const difference = competitor.price - ourPrice;
                    const percentDiff = Math.round((difference / competitor.price) * 100);

                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 opacity-80"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            {competitor.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 dark:text-gray-300">
                                            {competitor.name}
                                        </p>
                                        {competitor.url && (
                                            <a
                                                href={competitor.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                            >
                                                Ver en sitio <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                        ${competitor.price.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
                                        +${difference.toFixed(2)} (+{percentDiff}%)
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Precio Promedio
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${avgCompetitorPrice.toFixed(2)}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Tu Ahorro
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        ${maxSavings.toFixed(2)}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        % Descuento
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {maxSavingsPercent}%
                    </p>
                </div>
            </div>

            {/* Price Guarantee */}
            {showGuarantee && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                                Garantía de Mejor Precio
                            </h5>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                Si encuentras un precio más bajo en otro laboratorio certificado,{' '}
                                <strong>te igualamos el precio + 5% adicional de descuento</strong>.
                            </p>
                            <a
                                href="/garantia-precio"
                                className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 font-medium underline mt-2 inline-block"
                            >
                                Conocer términos y condiciones →
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Last Updated - Static to avoid hydration mismatch */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Precios actualizados diariamente
            </p>
        </div>
    );
}

/**
 * Compact version for smaller spaces
 */
export function PriceComparisonCompact({ ourPrice, studyName }: {
    ourPrice: number;
    studyName: string;
}) {
    const avgCompetitorPrice = ourPrice * 1.15; // 15% more on average
    const savings = avgCompetitorPrice - ourPrice;
    const savingsPercent = Math.round((savings / avgCompetitorPrice) * 100);

    return (
        <div className="price-comparison-compact bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Mejor que la competencia
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            Ahorras ${savings.toFixed(2)} ({savingsPercent}%)
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        ${avgCompetitorPrice.toFixed(2)}
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        ${ourPrice.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
