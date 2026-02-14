'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Check } from 'lucide-react';

interface BuyButtonProps {
    studyId: string;
    studyName: string;
    studySlug: string;
    category: string;
    price: number;
    priceRegular: number;
    pricePromotional?: number;
    turnaroundTime?: string;
    preparation?: string;
}

export default function BuyButton({
    studyId,
    studyName,
    studySlug,
    category,
    price,
    priceRegular,
    pricePromotional,
    turnaroundTime,
    preparation
}: BuyButtonProps) {
    const { addItem, isInCart } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const inCart = isInCart(studyId);

    const handleAddToCart = () => {
        addItem({
            id: studyId,
            name: studyName,
            slug: studySlug,
            category,
            price,
            priceRegular,
            promotionalPrice: pricePromotional,
            turnaroundTime,
            preparation
        });

        // Show "Added!" feedback
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    if (justAdded) {
        return (
            <button
                disabled
                className="flex-1 min-w-[200px] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 shadow-lg"
            >
                <Check className="w-5 h-5" />
                <span>¡Agregado!</span>
            </button>
        );
    }

    if (inCart) {
        return (
            <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
                <span className="text-xl">➕</span>
                <span>Agregar otro</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
        >
            <span className="text-xl">🛒</span>
            <span>Agregar al carrito</span>
        </button>
    );
}
