'use client';

import { X, Clock, CheckCircle, ShoppingCart, Calendar } from 'lucide-react';
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

    const whatsappMessage = `Hola, me interesa agendar el ${therapy.name} - $${therapy.price.toLocaleString('es-MX')} MXN`;
    const whatsappUrl = `https://wa.me/5217757371811?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 ${isOpen ? 'scale-100' : 'scale-95'
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    aria-label="Cerrar"
                >
                    <X size={24} className="text-gray-700" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh]">
                    {/* Header with Image */}
                    <div className={`relative h-64 bg-gradient-to-r ${therapy.color}`}>
                        {therapy.image ? (
                            <Image
                                src={therapy.image}
                                alt={therapy.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">💉</div>
                                    <h3 className="text-3xl font-bold">{therapy.name}</h3>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Title & Price */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {therapy.name}
                                </h2>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Clock size={18} />
                                    {therapy.duration}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r ${therapy.color} bg-clip-text text-transparent">
                                    ${therapy.price.toLocaleString('es-MX')}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">MXN</div>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {therapy.shortDesc}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={28} />
                                Beneficios
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {therapy.benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                                    >
                                        <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                ¿Cómo funciona?
                            </h3>
                            <div className="prose prose-lg max-w-none text-gray-700">
                                {therapy.longDesc.split('\n\n').map((paragraph, idx) => {
                                    // Handle bold text
                                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                        const text = paragraph.slice(2, -2);
                                        return (
                                            <h4 key={idx} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                                                {text}
                                            </h4>
                                        );
                                    }
                                    return (
                                        <p key={idx} className="mb-4 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Ingredientes Activos
                            </h3>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {therapy.ingredients.map((ingredient, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900">{ingredient.name}</span>
                                            {ingredient.amount && (
                                                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                                                    {ingredient.amount}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommended For */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
                            <h4 className="font-bold text-gray-900 mb-2">Recomendado para:</h4>
                            <p className="text-gray-700">{therapy.recommended}</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white pt-6 border-t border-gray-200">
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
