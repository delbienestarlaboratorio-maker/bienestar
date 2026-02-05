'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { X, Cookie, Shield, Info } from 'lucide-react';
import { pixelTracker } from '@/lib/tracking/pixels';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Verificar si ya dio consentimiento
        const consent = Cookies.get('cookie_consent');

        if (!consent) {
            // Mostrar banner después de 1 segundo
            setTimeout(() => setShowBanner(true), 1000);
        } else if (consent === 'accepted') {
            // Ya aceptó - inicializar tracking
            pixelTracker.initialize();
        }
    }, []);

    const acceptAll = () => {
        Cookies.set('cookie_consent', 'accepted', { expires: 365 });
        Cookies.set('analytics_consent', 'true', { expires: 365 });
        Cookies.set('marketing_consent', 'true', { expires: 365 });

        // Inicializar tracking
        pixelTracker.initialize();

        setShowBanner(false);

        // Track consentimiento
        pixelTracker.trackCustomEvent('CookieConsent', {
            action: 'accepted',
            timestamp: Date.now()
        });
    };

    const acceptEssential = () => {
        Cookies.set('cookie_consent', 'essential', { expires: 365 });
        Cookies.set('analytics_consent', 'false', { expires: 365 });
        Cookies.set('marketing_consent', 'false', { expires: 365 });

        setShowBanner(false);
    };

    const rejectAll = () => {
        Cookies.set('cookie_consent', 'rejected', { expires: 365 });
        Cookies.set('analytics_consent', 'false', { expires: 365 });
        Cookies.set('marketing_consent', 'false', { expires: 365 });

        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />

            {/* Banner principal */}
            <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
                <div className="max-w-7xl mx-auto p-4 sm:p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                        <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            🍪 Utilizamos cookies
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Para mejorar tu experiencia y ofrecerte precios personalizados
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={rejectAll}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Descripción */}
                            <div className="mb-6">
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    Utilizamos cookies y tecnologías similares para personalizar tu experiencia,
                                    mostrarte <strong>precios especiales basados en tu navegación</strong>, y
                                    analizar nuestro tráfico. También detectamos si visitaste otros laboratorios
                                    para ofrecerte mejores precios.
                                </p>
                            </div>

                            {/* Beneficios */}
                            {!showDetails && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span>Precios personalizados</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span>Descuentos especiales</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span>Mejor experiencia</span>
                                    </div>
                                </div>
                            )}

                            {/* Detalles expandibles */}
                            {showDetails && (
                                <div className="mb-6 space-y-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Cookies Esenciales
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            Cookies de Análisis
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Nos ayudan a entender cómo usas el sitio para mejorarlo. Incluye Google Analytics.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Cookie className="w-4 h-4" />
                                            Cookies de Marketing
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Permiten mostrarte precios personalizados y ofertas relevantes. Incluye Facebook Pixel.
                                            Si visitaste otros laboratorios, detectamos esto para ofrecerte mejores descuentos.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Acciones */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={acceptAll}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
                                >
                                    Aceptar todo
                                </button>
                                <button
                                    onClick={acceptEssential}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Solo esenciales
                                </button>
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
                                >
                                    {showDetails ? 'Ver menos' : 'Personalizar'}
                                </button>
                            </div>

                            {/* Links legales */}
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                <a
                                    href="/privacidad"
                                    className="hover:text-gray-700 dark:hover:text-gray-300 underline"
                                >
                                    Política de Privacidad
                                </a>
                                <span>•</span>
                                <a
                                    href="/cookies"
                                    className="hover:text-gray-700 dark:hover:text-gray-300 underline"
                                >
                                    Política de Cookies
                                </a>
                                <span>•</span>
                                <a
                                    href="/terminos"
                                    className="hover:text-gray-700 dark:hover:text-gray-300 underline"
                                >
                                    Términos y Condiciones
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
