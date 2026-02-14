'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const method = searchParams.get('method') || 'efectivo';
    const name = searchParams.get('name') || 'Cliente';

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-4">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl mb-6 animate-bounce">
                        <CheckCircle className="w-16 h-16 text-white" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        ¡Orden Confirmada!
                    </h1>

                    <p className="text-xl text-gray-600">
                        Gracias, <span className="font-semibold text-gray-900">{name}</span>
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
                    {method === 'clip' ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Tu pago está siendo procesado
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Recibirás un correo electrónico con la confirmación de tu pago y los detalles de tu cita en breve.
                            </p>
                        </>
                    ) : method === 'whatsapp' ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                ¡Nos pondremos en contacto contigo!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Te hemos redirigido a WhatsApp para confirmar tu orden. Uno de nuestros asesores te contactará pronto para coordinar tu cita.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Tu cita ha sido reservada
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Podrás realizar tu pago en efectivo al llegar a la sucursal en la fecha acordada.
                            </p>
                        </>
                    )}

                    {/* Next Steps */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                        <h3 className="font-bold text-gray-900 mb-4">📋 Próximos Pasos:</h3>
                        <ul className="space-y-3 text-gray-700">
                            {method === 'clip' ? (
                                <>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                                        <span>Recibirás un email de confirmación</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                        <span>Te contactaremos para agendar tu cita</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                        <span>Resultados en 24-48 horas después de tu visita</span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                                        <span>Confirmación por WhatsApp/Llamada</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                        <span>Acude a tu cita en la fecha acordada</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                        <span>Realiza tu pago y toma de muestra</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                                        <span>Resultados en 24-48 horas</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <a
                            href="tel:7716854026"
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-6 h-6 text-green-600" />
                            <div>
                                <div className="text-sm text-gray-600">Teléfono</div>
                                <div className="font-semibold text-gray-900">771 685 4026</div>
                            </div>
                        </a>
                        <a
                            href="mailto:contacto@laboratoriobienestar.com"
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Mail className="w-6 h-6 text-purple-600" />
                            <div>
                                <div className="text-sm text-gray-600">Email</div>
                                <div className="font-semibold text-gray-900 text-sm">contacto@...</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/estudios/analisis-clinicos"
                        className="flex-1 text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <span>Explorar Más Estudios</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                        href="/"
                        className="flex-1 text-center border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold hover:border-gray-400 transition-all"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}

