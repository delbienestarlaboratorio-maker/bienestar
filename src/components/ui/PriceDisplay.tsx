'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Clock } from 'lucide-react';

interface PriceDisplayProps {
    basePrice: number;
    promotionalPrice?: number;
    studyName: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ basePrice, promotionalPrice, studyName }) => {
    const [finalPrice, setFinalPrice] = useState(basePrice);
    const [discountReason, setDiscountReason] = useState<string | null>(null);
    const [isDynamic, setIsDynamic] = useState(false);

    useEffect(() => {
        // Simulación de lógica de Agente Strategist
        let price = promotionalPrice || basePrice;
        let reason = promotionalPrice ? 'Precio Promocional' : null;

        const hour = new Date().getHours();

        // Regla: Descuento vespertino (simulando Polanco)
        if (hour >= 13) {
            const timeDiscount = price * 0.05; // 5% extra
            price -= timeDiscount;
            reason = 'Descuento Vespertino (5% extra)';
            setIsDynamic(true);
        }

        // Regla: Igualar competencia en estudios clave
        if (studyName.includes('Química') && price > 1199) {
            price = 1199;
            reason = 'Mejor Precio Garantizado';
            setIsDynamic(true);
        }

        setFinalPrice(Math.round(price));
        setDiscountReason(reason);
    }, [basePrice, promotionalPrice, studyName]);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-900">
                    ${finalPrice.toLocaleString('es-MX')}
                </span>
                {basePrice > finalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                        ${basePrice.toLocaleString('es-MX')}
                    </span>
                )}
            </div>

            {discountReason && (
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isDynamic ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {isDynamic ? <Clock size={12} /> : <Tag size={12} />}
                    {discountReason}
                </div>
            )}

            {isDynamic && (
                <p className="text-xs text-gray-500 mt-2 italic">
                    * Precio optimizado por IA Strategist
                </p>
            )}
        </div>
    );
};
