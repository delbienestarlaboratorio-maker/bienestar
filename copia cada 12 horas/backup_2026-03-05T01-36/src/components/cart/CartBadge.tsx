'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export function CartBadge() {
    const { itemCount, subtotal } = useCart();

    return (
        <Link
            href="/carrito"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
            aria-label={`Carrito con ${itemCount} estudios`}
        >
            {/* Cart Icon */}
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />

            {/* Badge with item count */}
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
                    {itemCount}
                </span>
            )}

            {/* Tooltip on hover (desktop only) */}
            {itemCount > 0 && (
                <div className="hidden lg:block absolute top-full right-0 mt-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {itemCount} estudio{itemCount > 1 ? 's' : ''} · ${subtotal.toFixed(2)} MXN
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
            )}
        </Link>
    );
}
