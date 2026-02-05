'use client';

import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
    const { items, itemCount, subtotal, total, removeItem, updateQuantity, clearCart } = useCart();
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        setIsProcessing(true);

        try {
            // Llamar a la API de checkout que integra con Clip
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    customerInfo
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar el pago');
            }

            // Redirigir al usuario a Clip para completion del pago
            if (data.paymentLink) {
                window.location.href = data.paymentLink;
            } else {
                throw new Error('No se recibió link de pago');
            }

        } catch (error: any) {
            console.error('Checkout error:', error);
            alert(`Error: ${error.message || 'No se pudo procesar el pago. Intenta nuevamente.'}`);
            setIsProcessing(false);
        }
    };

    if (itemCount === 0) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Package className="mx-auto text-gray-300 mb-6" size={80} />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Tu carrito está vacío
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Agrega algunos estudios médicos para continuar
                    </p>
                    <Link
                        href="/estudios"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-colors"
                    >
                        Ver Estudios
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <ShoppingBag size={36} />
                        Carrito de Compras
                    </h1>
                    <p className="text-gray-600">
                        {itemCount} {itemCount === 1 ? 'estudio' : 'estudios'} en tu carrito
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Categoría: {item.category}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-12 text-center font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-sm"
                                            >
                                                <Trash2 size={16} />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        {item.promotionalPrice ? (
                                            <>
                                                <p className="text-sm text-gray-400 line-through">
                                                    ${item.price.toLocaleString('es-MX')}
                                                </p>
                                                <p className="text-2xl font-bold text-green-900">
                                                    ${(item.promotionalPrice * item.quantity).toLocaleString('es-MX')}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-2xl font-bold text-green-900">
                                                ${(item.price * item.quantity).toLocaleString('es-MX')}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            ${(item.promotionalPrice || item.price).toLocaleString('es-MX')} c/u
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                        >
                            Vaciar carrito
                        </button>
                    </div>

                    {/* Summary & Checkout */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-100 p-8 sticky top-4 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Resumen del Pedido
                            </h2>

                            {/* Price Breakdown */}
                            <div className="space-y-3 pb-6 border-b-2 border-gray-100">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'estudio' : 'estudios'})</span>
                                    <span className="font-semibold">${subtotal.toLocaleString('es-MX')}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-green-900">
                                    <span>Total</span>
                                    <span>${total.toLocaleString('es-MX')}</span>
                                </div>
                            </div>

                            {/* Important Lab Information */}
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 space-y-2">
                                <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                                    📋 Información Importante
                                </h3>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• <strong>Resultados:</strong> 24-48 horas hábiles</li>
                                    <li>• <strong>Entrega:</strong> Email y portal web</li>
                                    <li>• <strong>Ayuno:</strong> Verificar preparación por estudio</li>
                                    <li>• <strong>Horario:</strong> Lun-Sáb 7:00am - 6:00pm</li>
                                </ul>
                            </div>

                            {/* Preparation Reminders */}
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                                <h3 className="font-bold text-yellow-900 text-sm mb-2">
                                    ⚠️ Antes de tu cita
                                </h3>
                                <ul className="text-xs text-yellow-800 space-y-1">
                                    <li>✓ Verifica ayuno requerido</li>
                                    <li>✓ Trae identificación oficial</li>
                                    <li>✓ Lleva receta médica (si aplica)</li>
                                    <li>✓ Suspende medicamentos según indicación</li>
                                </ul>
                            </div>

                            {/* Customer Info Form */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900">Información de Contacto</h3>

                                <input
                                    type="text"
                                    placeholder="Nombre completo *"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email *"
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Teléfono *"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    required
                                />

                                <textarea
                                    placeholder="Notas adicionales (alergias, medicamentos, etc.)"
                                    value={customerInfo.notes}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none resize-none"
                                />
                            </div>

                            {/* Benefits/Guarantees */}
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                                <h3 className="font-bold text-green-900 text-sm mb-2">
                                    ✓ Garantías
                                </h3>
                                <ul className="text-xs text-green-800 space-y-1">
                                    <li>• Equipos de última generación</li>
                                    <li>• Personal altamente calificado</li>
                                    <li>• Resultados certificados</li>
                                    <li>• Precios transparentes</li>
                                </ul>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        Procesar Pago con Clip
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Serás redirigido a Clip para completar tu pago de forma segura.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
