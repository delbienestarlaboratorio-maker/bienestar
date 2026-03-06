'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { visitorIntelligence } from '@/lib/tracking/visitor-intelligence';
import { ArrowLeft, ArrowRight, CreditCard, MessageCircle, Banknote, Check } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, itemCount, subtotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        sucursal: 'centro',
        paymentMethod: 'clip'
    });

    // Redirect if cart is empty
    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            No hay estudios en tu carrito
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Agrega estudios antes de proceder al checkout
                        </p>
                        <Link
                            href="/estudios/analisis-clinicos"
                            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Ver Estudios
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async () => {
        // Validate step 1
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.phone) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }

            if (!formData.email.includes('@')) {
                alert('Por favor ingresa un correo electrónico válido');
                return;
            }

            setStep(2);
            return;
        }

        // Process payment
        setIsProcessing(true);

        try {
            if (formData.paymentMethod === 'clip') {
                // Create Clip payment
                const response = await fetch('/api/pagos/crear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: items.map(item => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        })),
                        email: formData.email,
                        user_id: 'guest',
                        metadata: {
                            name: formData.name,
                            phone: formData.phone,
                            date: formData.date,
                            sucursal: formData.sucursal
                        }
                    }),
                });

                const data = await response.json();

                if (data.success && data.paymentUrl) {
                    // Track conversion
                    visitorIntelligence?.trackConversion(
                        items.map(i => i.slug),
                        subtotal
                    );
                    clearCart();
                    window.location.href = data.paymentUrl;
                } else {
                    throw new Error('Error al crear el pago');
                }
            } else if (formData.paymentMethod === 'whatsapp') {
                // WhatsApp confirmation
                const message = encodeURIComponent(
                    `Hola! Quiero agendar los siguientes estudios:\n\n` +
                    items.map(item => `• ${item.name} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n') +
                    `\n\nTotal: $${subtotal.toFixed(2)} MXN\n\n` +
                    `Nombre: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Teléfono: ${formData.phone}\n` +
                    `Fecha preferida: ${formData.date || 'Por confirmar'}\n` +
                    `Sucursal: ${formData.sucursal === 'centro' ? 'Centro' : 'Norte'}`
                );

                // Track conversion
                visitorIntelligence?.trackConversion(
                    items.map(i => i.slug),
                    subtotal
                );
                clearCart();
                window.location.href = `https://wa.me/527716854026?text=${message}`;
            } else {
                // Cash payment - just reserve
                visitorIntelligence?.trackConversion(
                    items.map(i => i.slug),
                    subtotal
                );
                clearCart();
                router.push(`/checkout/success?method=efectivo&name=${encodeURIComponent(formData.name)}`);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error al procesar el pago. Por favor intenta de nuevo.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <Link
                    href="/carrito"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver al carrito</span>
                </Link>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200'}`}>
                                {step > 1 ? <Check className="w-6 h-6" /> : '1'}
                            </div>
                            <span className="font-semibold hidden sm:inline">Tus Datos</span>
                        </div>

                        <div className="h-1 w-16 bg-gray-200 relative">
                            <div className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>

                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200'}`}>
                                2
                            </div>
                            <span className="font-semibold hidden sm:inline">Pago</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {step === 1 ? (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Paso 1: Información Personal
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nombre Completo *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                                placeholder="Juan Pérez"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Correo Electrónico *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                                placeholder="juan@ejemplo.com"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Recibirás tus resultados aquí</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Teléfono / WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                                placeholder="771 123 4567"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Para confirmar tu cita</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Fecha Preferida para Cita
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                                Sucursal de Preferencia
                                            </label>
                                            <div className="space-y-3">
                                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                                                    <input
                                                        type="radio"
                                                        name="sucursal"
                                                        value="centro"
                                                        checked={formData.sucursal === 'centro'}
                                                        onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                                                        className="w-5 h-5 text-purple-600"
                                                    />
                                                    <span className="ml-3 font-medium">🏥 Sucursal Centro</span>
                                                </label>
                                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                                                    <input
                                                        type="radio"
                                                        name="sucursal"
                                                        value="norte"
                                                        checked={formData.sucursal === 'norte'}
                                                        onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                                                        className="w-5 h-5 text-purple-600"
                                                    />
                                                    <span className="ml-3 font-medium">🏥 Sucursal Norte</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <span>Continuar</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Paso 2: Método de Pago
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        {/* Clip */}
                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'clip' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                                            <div className="flex items-start gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="clip"
                                                    checked={formData.paymentMethod === 'clip'}
                                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                    className="w-5 h-5 mt-1 text-purple-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CreditCard className="w-6 h-6 text-purple-600" />
                                                        <span className="font-bold text-lg">Pagar con Clip (Recomendado)</span>
                                                    </div>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        <li>• Pago en línea con tarjeta</li>
                                                        <li>• Seguro y rápido</li>
                                                        <li>• Confirmación inmediata</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </label>

                                        {/* WhatsApp */}
                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                            <div className="flex items-start gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="whatsapp"
                                                    checked={formData.paymentMethod === 'whatsapp'}
                                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                    className="w-5 h-5 mt-1 text-green-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MessageCircle className="w-6 h-6 text-green-600" />
                                                        <span className="font-bold text-lg">Confirmar por WhatsApp</span>
                                                    </div>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        <li>• Te contactamos para confirmar</li>
                                                        <li>• Pago en sucursal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </label>

                                        {/* Efectivo */}
                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'efectivo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                            <div className="flex items-start gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="efectivo"
                                                    checked={formData.paymentMethod === 'efectivo'}
                                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                    className="w-5 h-5 mt-1 text-blue-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Banknote className="w-6 h-6 text-blue-600" />
                                                        <span className="font-bold text-lg">Pago en Efectivo</span>
                                                    </div>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        <li>• Reserva sin pago</li>
                                                        <li>• Paga al llegar a sucursal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-gray-900 mb-4">Resumen de tu orden</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nombre</span>
                                                <span className="font-semibold">{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Email</span>
                                                <span className="font-semibold">{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Teléfono</span>
                                                <span className="font-semibold">{formData.phone}</span>
                                            </div>
                                            {formData.date && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Fecha</span>
                                                    <span className="font-semibold">{formData.date}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Sucursal</span>
                                                <span className="font-semibold">{formData.sucursal === 'centro' ? 'Centro' : 'Norte'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            disabled={isProcessing}
                                            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all disabled:opacity-50"
                                        >
                                            ← Volver
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isProcessing}
                                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? 'Procesando...' : 'Confirmar Orden →'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Tu Orden</h3>

                            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">{item.name}</span>
                                            <span className="font-semibold">x{item.quantity}</span>
                                        </div>
                                        <div className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        ${subtotal.toFixed(2)} MXN
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Pago seguro SSL</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Resultados 24-48hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
