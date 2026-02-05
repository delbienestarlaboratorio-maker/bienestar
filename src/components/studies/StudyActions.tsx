'use client';

import { ShoppingCart, Zap } from 'lucide-react';
import { Study } from '@/data/studies';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface StudyActionsProps {
    study: Study;
}

export const StudyActions = ({ study }: StudyActionsProps) => {
    const { addItem } = useCart();
    const router = useRouter();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        setAdding(true);
        addItem({
            id: study.id,
            name: study.name,
            price: study.price.regular,
            promotionalPrice: study.price.promotional,
            category: study.category,
            slug: study.slug
        });

        setTimeout(() => {
            setAdding(false);
            alert(`✅ ${study.name} agregado al carrito`);
        }, 500);
    };

    const handleBuyNow = () => {
        addItem({
            id: study.id,
            name: study.name,
            price: study.price.regular,
            promotionalPrice: study.price.promotional,
            category: study.category,
            slug: study.slug
        });
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col gap-3 mt-6">
            <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-white border-2 border-green-900 text-green-900 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <ShoppingCart size={20} />
                {adding ? 'Agregando...' : 'Agregar al carrito'}
            </button>
            <button
                onClick={handleBuyNow}
                className="w-full bg-green-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                <Zap size={20} />
                Comprar ahora
            </button>
        </div>
    );
};
