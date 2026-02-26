'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';

/**
 * Componente flotante para pedir reseñas en Google
 * Aparece después de unos segundos o al hacer scroll
 */
export function GoogleReviewFloat() {
    const [isVisible, setIsVisible] = useState(true);

    // Reemplaza esto con tu enlace real de Google Mi Negocio
    const GOOGLE_REVIEW_LINK = "https://g.page/r/TU_CODIGO_AQUI/review";

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 z-50 animate-in slide-in-from-left-5 duration-500 max-w-xs">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 relative overflow-hidden group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X size={14} />
                </button>

                <div className="flex items-start gap-3">
                    <div className="bg-yellow-50 p-2 rounded-xl shrink-0 mt-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                            ¿Te gustó nuestro servicio?
                        </h4>
                        <p className="text-xs text-gray-600 mb-3">
                            Ayúdanos a seguir mejorando con una reseña de 5 estrellas en Google.
                        </p>
                        <a
                            href={GOOGLE_REVIEW_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsVisible(false)}
                            className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Calificarnos en Google
                            <Star className="w-3 h-3 fill-current" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
