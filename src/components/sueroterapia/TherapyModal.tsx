'use client';

import { X, Clock, CheckCircle, ShoppingCart, Calendar, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { TherapyDetails } from '@/data/sueroterapia/therapies-detailed';
import Image from 'next/image';

interface TherapyModalProps {
    therapy: TherapyDetails | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TherapyModal({ therapy, isOpen, onClose }: TherapyModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setTimeout(() => setIsVisible(false), 200);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!therapy || !isVisible) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const whatsappMessage = `Hola, me interesa agendar el ${therapy.name} - $${therapy.price.toLocaleString('es-MX')} MXN`;
    const whatsappUrl = `https://wa.me/5217757371811?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={handleBackdropClick}
        >
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter;
                        margin: 0.5in;
                    }
                    
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    
                    /* Hide everything except modal */
                    body > *:not(#therapy-modal-root) {
                        display: none !important;
                    }
                    
                    #therapy-modal-root > div:first-child {
                        display: none !important; /* Hide backdrop */
                    }
                    
                    /* Show modal */
                    .therapy-modal-container {
                        position: static !important;
                        max-height: none !important;
                        overflow: visible !important;
                        box-shadow:none !important;
                        border-radius: 0 !important;
                    }
                    
                    .print-header {
                        display: flex !important;
                    }
                    
                    .print-only {
                        display: block !important;
                    }
                    
                    .print\\:hidden {
                        display: none !important;
                    }
                    
                    .print\\:text-lg { font-size: 18px !important; }
                    .print\\:text-sm { font-size: 14px !important; }
                    .print\\:text-xs { font-size: 11px !important; }
                    .print\\:mb-2 { margin-bottom: 8px !important; }
                    .print\\:mb-3 { margin-bottom: 12px !important; }
                    .print\\:p-1 { padding: 4px !important; }
                    .print\\:p-3 { padding: 12px !important; }
                    
                    /* Benefits 2 columns */
                    .print-benefits {
                        column-count: 2;
                        column-gap: 16px;
                    }
                    
                    .print-benefit-item {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
                
                @media screen {
                    .print-only {
                        display: none;
                    }
                }
            `}</style>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                id="therapy-modal-root"
                className={`relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 therapy-modal-container ${isOpen ? 'scale-100' : 'scale-95'
                    }`}
            >
                {/* Print Header (only visible when printing) */}
                <div className="print-only print-header hidden justify-between items-center border-b-4 border-purple-600 pb-3 mb-4 px-8 pt-6">
                    <div className="text-xl font-black text-purple-600">
                        🧬 LABORATORIO DEL BIENESTAR
                    </div>
                    <div className="text-right text-xs text-gray-600">
                        <div>📞 775 737 1811</div>
                        <div>📍 Tizayuca, Hidalgo</div>
                        <div>🌐 laboratorio.delbienestar.com.mx</div>
                    </div>
                </div>

                {/* Screen Buttons (hidden when printing) */}
                <div className="absolute top-4 right-4 z-10 flex gap-2 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                        aria-label="Imprimir hoja informativa"
                        title="Imprimir"
                    >
                        <Printer size={24} />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                        aria-label="Cerrar"
                    >
                        <X size={24} className="text-gray-700" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh]">
                    {/* Header with Image */}
                    <div className={`relative h-64 bg-gradient-to-r ${therapy.color} print:h-16 print:flex print:items-center print:justify-center`}>
                        {therapy.image ? (
                            <Image
                                src={therapy.image}
                                alt={therapy.name}
                                fill
                                className="object-cover print:hidden"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4 print:text-4xl print:mb-0">💉</div>
                                    <h3 className="text-3xl font-bold print:hidden">{therapy.name}</h3>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 print:p-6">
                        {/* Title & Price */}
                        <div className="flex items-start justify-between mb-6 print:mb-3">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 print:text-2xl">
                                    {therapy.name}
                                </h2>
                                <p className="text-gray-600 flex items-center gap-2 print:text-sm">
                                    <Clock size={18} className="print:hidden" />
                                    <span className="print-only">⏱️ </span>
                                    {therapy.duration}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl md:text-6xl font-bold text-purple-600 print:text-4xl">
                                    ${therapy.price.toLocaleString('es-MX')}
                                </div>
                                <div className="text-sm text-gray-500 mt-1 print:text-xs">MXN</div>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 print:p-3 print:mb-3 print:text-sm">
                            <p className="text-lg text-gray-700 leading-relaxed print:text-sm">
                                {therapy.shortDesc}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="mb-8 print:mb-3">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 print:text-lg print:mb-2">
                                <CheckCircle className="text-green-600 print:hidden" size={28} />
                                <span className="print-only">✓ </span>
                                Beneficios
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3 print-benefits">
                                {therapy.benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors print-benefit-item print:border-0 print:p-1"
                                    >
                                        <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5 print:w-3 print:h-3" />
                                        <span className="text-gray-700 print:text-xs">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="mb-8 print:mb-3">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 print:text-lg print:mb-2">
                                ¿Cómo funciona?
                            </h3>
                            <div className="prose prose-lg max-w-none text-gray-700 print:text-xs">
                                {therapy.longDesc.split('\n\n').slice(0, 4).map((paragraph, idx) => {
                                    // Handle bold text
                                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                        const text = paragraph.slice(2, -2);
                                        return (
                                            <h4 key={idx} className="text-xl font-semibold text-gray-900 mt-6 mb-3 print:text-sm print:mt-2 print:mb-1">
                                                {text}
                                            </h4>
                                        );
                                    }
                                    return (
                                        <p key={idx} className="mb-4 leading-relaxed print:mb-1 print:text-xs">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-8 print:mb-3">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 print:text-lg print:mb-2">
                                Ingredientes Activos
                            </h3>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 print:bg-gray-50 print:p-3">
                                <div className="grid md:grid-cols-2 gap-4 print:gap-1 print:text-xs">
                                    {therapy.ingredients.map((ingredient, idx) => (
                                        <div key={idx} className="flex justify-between items-center print-benefit-item">
                                            <span className="font-medium text-gray-900">{ingredient.name}</span>
                                            {ingredient.amount && (
                                                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full print:px-2 print:py-0.5 print:text-xs">
                                                    {ingredient.amount}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommended For */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8 print:bg-gray-50 print:p-3 print:mb-3 print:text-xs">
                            <h4 className="font-bold text-gray-900 mb-2 print:text-sm">Recomendado para:</h4>
                            <p className="text-gray-700">{therapy.recommended}</p>
                        </div>

                        {/* Print Footer (only visible when printing) */}
                        <div className="print-only hidden border-t-2 border-gray-200 pt-3 mt-4 text-center text-xs text-gray-600">
                            <div className="font-bold text-purple-600 mb-1">🧬 LABORATORIO DEL BIENESTAR</div>
                            <div>📞 Llámanos: 775 737 1811 | 📍 Tizayuca, Hidalgo</div>
                            <div>💻 laboratorio.delbienestar.com.mx | 📧 info@delbienestar.com.mx</div>
                            <div className="mt-2 text-[10px]">
                                ¡Agenda tu cita por WhatsApp o visita nuestra sucursal! • Atención personalizada • Resultados garantizados
                            </div>
                        </div>

                        {/* CTA Buttons (hidden when printing) */}
                        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white pt-6 border-t border-gray-200 print:hidden">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${therapy.color} text-white py-4 px-6 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg`}
                            >
                                <Calendar size={24} />
                                Agendar Ahora
                            </a>
                            <a
                                href={`/checkout?therapy=${therapy.slug}&price=${therapy.price}`}
                                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
                            >
                                <ShoppingCart size={24} />
                                Comprar Online
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
