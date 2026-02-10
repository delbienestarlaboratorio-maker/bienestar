'use client';

import { useState, useEffect, useRef } from 'react';
import {
    TrendingDown,
    Info,
    Sparkles,
    Trophy,
    Clock,
    ChevronDown,
    ChevronUp,
    Check,
    Shield
} from 'lucide-react';
import { pricingEngine, DynamicPricingEngine, PriceCalculation } from '@/lib/pricing/dynamic-pricing';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { pixelTracker } from '@/lib/tracking/pixels';

interface DynamicPriceProps {
    studyId: string;
    studyName: string;
    basePrice: number;
    onPriceCalculated?: (calculation: PriceCalculation) => void;
}

export function DynamicPrice({
    studyId,
    studyName,
    basePrice,
    onPriceCalculated
}: DynamicPriceProps) {
    const [priceCalc, setPriceCalc] = useState<PriceCalculation | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const visitorData = useVisitorTracking();
    const visitorDataRef = useRef(visitorData);
    visitorDataRef.current = visitorData;
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialized) return;
        // Calculate personalized price only once on mount
        const factors = DynamicPricingEngine.fromVisitorData(visitorDataRef.current);
        const calculation = pricingEngine.calculatePrice(basePrice, factors);

        setPriceCalc(calculation);
        setInitialized(true);

        // Notify parent
        if (onPriceCalculated) {
            onPriceCalculated(calculation);
        }

        // Track personalized pricing
        if (calculation.discountPercentage < 0) {
            pixelTracker.trackCustomEvent('PersonalizedPricing', {
                study_id: studyId,
                study_name: studyName,
                base_price: basePrice,
                final_price: calculation.finalPrice,
                discount_percentage: Math.abs(calculation.discountPercentage),
                visited_competitor: visitorDataRef.current.visitedCompetitor,
                competitor_name: visitorDataRef.current.competitorName
            });
        }

        // Initialize urgency timer
        if (calculation.urgency.show && calculation.urgency.timeLeft) {
            setTimeLeft(calculation.urgency.timeLeft);
        }
    }, [basePrice, studyId, studyName, initialized, onPriceCalculated]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    if (!priceCalc) {
        return (
            <div className="price-display">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${basePrice.toFixed(2)}
                </span>
            </div>
        );
    }

    const hasDiscount = priceCalc.discountPercentage < 0;
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="dynamic-price-container space-y-4">
            {/* Precio Principal */}
            <div className="price-main">
                {hasDiscount && (
                    <div className="original-price mb-2">
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                            ${priceCalc.basePrice.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="current-price flex items-baseline gap-3">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$</span>
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                            {Math.floor(priceCalc.finalPrice)}
                        </span>
                        <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                            .{String(Math.round((priceCalc.finalPrice % 1) * 100)).padStart(2, '0')}
                        </span>
                    </div>

                    {hasDiscount && (
                        <div className="discount-badge inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full font-semibold">
                            <TrendingDown className="w-5 h-5" />
                            {Math.abs(priceCalc.discountPercentage)}% OFF
                        </div>
                    )}
                </div>
            </div>

            {/* Razón del descuento */}
            {hasDiscount && (
                <div className="discount-reason bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                    ¡Precio especial para ti!
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    Ahorras ${priceCalc.discount.toFixed(2)} MXN
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            <Info className="w-4 h-4" />
                            Ver por qué
                            {showDetails ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {/* Detalles del descuento */}
                    {showDetails && (
                        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                            <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                                Tu precio personalizado incluye:
                            </h5>
                            <ul className="space-y-2">
                                {priceCalc.adjustments
                                    .filter(adj => adj.adjustment < 0)
                                    .map((factor, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {factor.icon} {factor.name}
                                                    </span>
                                                    <span className="text-green-600 dark:text-green-400 font-semibold">
                                                        -{Math.abs(factor.adjustment)}%
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">
                                                    {factor.reason}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>

                            {/* Urgencia */}
                            {priceCalc.urgency.show && timeLeft > 0 && (
                                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                Este precio es válido por:
                                            </p>
                                            <div className="flex items-center gap-1 text-lg font-mono font-bold text-amber-600 dark:text-amber-400 mt-1">
                                                <span>{String(hours).padStart(2, '0')}</span>
                                                <span className="text-gray-400">:</span>
                                                <span>{String(minutes).padStart(2, '0')}</span>
                                                <span className="text-gray-400">:</span>
                                                <span>{String(seconds).padStart(2, '0')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Mensaje de competencia */}
            {priceCalc.competitorMessage?.show && (
                <div className="competitor-message bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                                Vimos que visitaste {priceCalc.competitorMessage.competitor}
                            </h4>
                            <p className="text-sm text-purple-700 dark:text-purple-300">
                                Te garantizamos el <strong>mejor precio del mercado</strong>.
                                {priceCalc.competitorMessage.savings && (
                                    <> Ahorras hasta <strong>${priceCalc.competitorMessage.savings.toFixed(2)}</strong> vs. ellos.</>
                                )}
                            </p>
                            <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-purple-900 dark:text-purple-100 bg-purple-100 dark:bg-purple-900/40 px-3 py-1.5 rounded-full">
                                <Shield className="w-3.5 h-3.5" />
                                Garantía de mejor precio
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Urgencia visual (sin detalles expandidos) */}
            {!showDetails && priceCalc.urgency.show && timeLeft > 0 && (
                <div className="urgency-compact bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">Precio especial válido por:</span>
                        </div>
                        <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
