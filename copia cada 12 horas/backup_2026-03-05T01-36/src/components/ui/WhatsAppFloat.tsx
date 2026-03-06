'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a short delay for a nice entrance
        const timer = setTimeout(() => setIsVisible(true), 1500);
        // Show tooltip after 5 seconds
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
        // Hide tooltip after 10 seconds
        const hideTooltip = setTimeout(() => setShowTooltip(false), 12000);
        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
            clearTimeout(hideTooltip);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-end gap-3 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`}
        >
            {/* Tooltip */}
            {showTooltip && (
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[220px] animate-fade-in border border-gray-100">
                    <button
                        onClick={() => setShowTooltip(false)}
                        className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
                    >
                        <X size={12} />
                    </button>
                    <p className="text-sm text-gray-700 font-medium">
                        ¿Necesitas ayuda? 💬
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Chatea con nosotros por WhatsApp
                    </p>
                    {/* Arrow */}
                    <div className="absolute -right-2 bottom-4 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-[-45deg]" />
                </div>
            )}

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/527716854026?text=Hola,%20necesito%20información%20sobre%20estudios%20de%20laboratorio"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="Contactar por WhatsApp"
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />

                {/* Button */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300 cursor-pointer">
                    <MessageCircle size={28} className="text-white" fill="white" />
                </div>
            </a>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};
