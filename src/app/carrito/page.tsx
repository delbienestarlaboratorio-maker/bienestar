'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CarritoPage() {
    const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    {/* Empty State */}
                    <div className="bg-white rounded-3xl shadow-xl p-16 border border-gray-100">
                        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-16 h-16 text-purple-500" />
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Tu carrito está vacío
                        </h1>

                        <p className="text-xl text-gray-600 mb-8">
                            Explora nuestros estudios y agrega los que necesites
                        </p>

                        <Link
                            href="/estudios/analisis-clinicos"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Ver Estudios
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/estudios/analisis-clinicos"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Continuar comprando</span>
                    </Link>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            🛒 Mi Carrito
                        </h1>

                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro de vaciar el carrito?')) {
                                    clearCart();
                                }
                            }}
                            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                            Vaciar carrito
                        </button>
                    </div>

                    <p className="text-gray-600 mt-2">
                        {itemCount} estudio{itemCount > 1 ? 's' : ''} en tu carrito
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
                            >
                                <div className="flex gap-6">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
                                            🔬
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title & Category */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 mb-3">
                                            Categoría: {item.category}
                                        </p>

                                        {/* Info Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.turnaroundTime && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                                    ⏱️ {item.turnaroundTime}
                                                </span>
                                            )}
                                            {item.preparation && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm">
                                                    📋 {item.preparation}
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom Row: Quantity + Price + Remove */}
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                    aria-label="Disminuir cantidad"
                                                >
                                                    <Minus className="w-5 h-5 text-gray-700" />
                                                </button>

                                                <span className="text-xl font-bold text-gray-900 min-w-[3ch] text-center">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all shadow-md"
                                                    aria-label="Aumentar cantidad"
                                                >
                                                    <Plus className="w-5 h-5 text-white" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ${item.price.toFixed(2)} c/u
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label="Eliminar estudio"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Resumen
                            </h2>

                            {/* Subtotal */}
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'estudio' : 'estudios'})</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mb-8">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">MXN</p>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                href="/checkout"
                                className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-center px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-4"
                            >
                                Proceder al Pago →
                            </Link>

                            {/* Trust Badges */}
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✅</span>
                                    <span>Pago seguro con Clip</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">⏱️</span>
                                    <span>Resultados en 24-48 hrs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-purple-500">🔒</span>
                                    <span>Información protegida</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
