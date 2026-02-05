'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle, TrendingUp, Users, Flame, Zap } from 'lucide-react';

interface UrgencyIndicatorsProps {
    // Timer settings
    showTimer?: boolean;
    timerDuration?: number; // seconds
    timerMessage?: string;

    // Scarcity settings
    showScarcity?: boolean;
    spotsLeft?: number;
    totalSpots?: number;

    // Social proof
    showSocialProof?: boolean;
    recentPurchases?: number;
    viewingNow?: number;

    // Demand indicator
    showDemand?: boolean;
    demandLevel?: 'low' | 'medium' | 'high';
}

export function UrgencyIndicators({
    showTimer = true,
    timerDuration = 2 * 60 * 60, // 2 hours default
    timerMessage = 'Este precio especial expira en:',
    showScarcity = true,
    spotsLeft = 5,
    totalSpots = 20,
    showSocialProof = true,
    recentPurchases = 12,
    viewingNow = 3,
    showDemand = true,
    demandLevel = 'medium'
}: UrgencyIndicatorsProps) {
    const [timeLeft, setTimeLeft] = useState(timerDuration);

    useEffect(() => {
        if (!showTimer || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [showTimer, timeLeft]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const spotsPercentage = (spotsLeft / totalSpots) * 100;
    const isLowAvailability = spotsPercentage < 30;

    return (
        <div className="urgency-indicators space-y-3">
            {/* Timer Urgency */}
            {showTimer && timeLeft > 0 && (
                <div className="timer-urgency bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center animate-pulse">
                            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                                {timerMessage}
                            </p>

                            {/* Countdown Display */}
                            <div className="flex items-center gap-2">
                                <div className="timer-digit bg-amber-600 dark:bg-amber-700 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[3rem] text-center">
                                    {String(hours).padStart(2, '0')}
                                </div>
                                <span className="text-amber-600 dark:text-amber-400 font-bold">:</span>
                                <div className="timer-digit bg-amber-600 dark:bg-amber-700 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[3rem] text-center">
                                    {String(minutes).padStart(2, '0')}
                                </div>
                                <span className="text-amber-600 dark:text-amber-400 font-bold">:</span>
                                <div className="timer-digit bg-amber-600 dark:bg-amber-700 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[3rem] text-center">
                                    {String(seconds).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Scarcity Indicator */}
            {showScarcity && (
                <div className={`scarcity-indicator ${isLowAvailability ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'} border-2 rounded-lg p-4`}>
                    <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 ${isLowAvailability ? 'bg-red-100 dark:bg-red-900/40' : 'bg-blue-100 dark:bg-blue-900/40'} rounded-full flex items-center justify-center`}>
                            <AlertCircle className={`w-5 h-5 ${isLowAvailability ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} />
                        </div>

                        <div className="flex-1">
                            <p className={`text-sm font-semibold ${isLowAvailability ? 'text-red-900 dark:text-red-100' : 'text-blue-900 dark:text-blue-100'} mb-2`}>
                                {isLowAvailability ? '¡Últimas disponibilidades!' : 'Disponibilidad limitada'}
                            </p>

                            {/* Availability Bar */}
                            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`absolute inset-y-0 left-0 ${isLowAvailability ? 'bg-red-500' : 'bg-blue-500'} rounded-full transition-all duration-500`}
                                    style={{ width: `${spotsPercentage}%` }}
                                />
                            </div>

                            <p className={`text-xs ${isLowAvailability ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'} mt-1`}>
                                Solo quedan <strong>{spotsLeft}</strong> espacios disponibles hoy
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Proof */}
            {showSocialProof && (
                <div className="social-proof bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300 dark:border-green-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Recent Purchases */}
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs text-green-700 dark:text-green-300">
                                    Últimas 24 horas
                                </p>
                                <p className="text-sm font-bold text-green-900 dark:text-green-100">
                                    {recentPurchases} personas lo compraron
                                </p>
                            </div>
                        </div>

                        {/* Viewing Now */}
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs text-green-700 dark:text-green-300">
                                    Viendo ahora
                                </p>
                                <p className="text-sm font-bold text-green-900 dark:text-green-100 flex items-center gap-1">
                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    {viewingNow} personas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Demand Indicator */}
            {showDemand && (
                <div className={`demand-indicator ${demandLevel === 'high'
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-300 dark:border-red-700'
                        : demandLevel === 'medium'
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300 dark:border-yellow-700'
                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-300 dark:border-blue-700'
                    } border rounded-lg p-3`}>
                    <div className="flex items-center gap-2">
                        {demandLevel === 'high' ? (
                            <Flame className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
                        ) : (
                            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}

                        <p className={`text-sm font-semibold ${demandLevel === 'high'
                                ? 'text-red-900 dark:text-red-100'
                                : demandLevel === 'medium'
                                    ? 'text-yellow-900 dark:text-yellow-100'
                                    : 'text-blue-900 dark:text-blue-100'
                            }`}>
                            {demandLevel === 'high' && '🔥 Muy Alta Demanda - ¡Reserva ahora!'}
                            {demandLevel === 'medium' && '⚡ Demanda Moderada - ¡No esperes más!'}
                            {demandLevel === 'low' && '✨ Buena Disponibilidad'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Compact version for smaller spaces
 */
export function UrgencyBadge({
    type = 'timer',
    value
}: {
    type: 'timer' | 'spots' | 'demand';
    value?: any;
}) {
    if (type === 'timer' && value > 0) {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);

        return (
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>{hours}h {minutes}m restantes</span>
            </div>
        );
    }

    if (type === 'spots' && value) {
        return (
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>Solo {value} disponibles</span>
            </div>
        );
    }

    if (type === 'demand') {
        return (
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Flame className="w-4 h-4" />
                <span>Alta demanda</span>
            </div>
        );
    }

    return null;
}
