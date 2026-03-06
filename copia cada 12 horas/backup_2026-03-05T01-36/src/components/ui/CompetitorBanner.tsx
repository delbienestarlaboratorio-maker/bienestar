'use client';

import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * CompetitorBanner
 * ================
 * Escucha el evento 'bienestar:competitor_visit' que dispara visitor-intelligence
 * cuando el usuario viene de un competidor (Chopo, Salud Digna, etc.)
 * Muestra un banner de oferta especial para captar al visitante.
 */
export function CompetitorBanner() {
    const [visible, setVisible] = useState(false);
    const [competitorName, setCompetitorName] = useState('');

    useEffect(() => {
        // Escuchar evento de competencia
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.competitor) {
                setCompetitorName(detail.competitor);
                setVisible(true);
            }
        };
        window.addEventListener('bienestar:competitor_visit', handler);

        // También verificar localStorage por si ya se detectó antes
        try {
            const stored = localStorage.getItem('_biv');
            if (stored) {
                const profile = JSON.parse(stored);
                if (profile?.origin?.fromCompetitor && profile?.origin?.competitorName) {
                    // Solo mostrar si no lo ha cerrado esta sesión
                    const dismissed = sessionStorage.getItem('_competitor_dismissed');
                    if (!dismissed) {
                        setCompetitorName(profile.origin.competitorName);
                        setVisible(true);
                    }
                }
            }
        } catch {
            // Ignore parse errors
        }

        return () => window.removeEventListener('bienestar:competitor_visit', handler);
    }, []);

    const handleDismiss = () => {
        setVisible(false);
        sessionStorage.setItem('_competitor_dismissed', 'true');
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-2xl shadow-2xl p-5 text-white relative overflow-hidden">
                {/* Decoración */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-xl" />

                {/* Botón cerrar */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Contenido */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                            Oferta Exclusiva
                        </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1">
                        ¿Vienes de {competitorName}? 🎉
                    </h3>
                    <p className="text-sm text-white/90 mb-4">
                        ¡Bienvenido! En Laboratorio Bienestar te damos <strong>mejores precios</strong> y resultados más rápidos. Agenda hoy y obtén un <strong>precio especial</strong>.
                    </p>

                    <Link
                        href="/estudios/analisis-clinicos"
                        onClick={handleDismiss}
                        className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-sm shadow-lg"
                    >
                        Ver Nuestros Precios
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
