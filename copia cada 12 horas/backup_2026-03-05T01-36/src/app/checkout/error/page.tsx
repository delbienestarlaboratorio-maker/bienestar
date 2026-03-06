import Link from 'next/link';
import { XCircle, Home, Phone, RotateCcw } from 'lucide-react';

export default function CheckoutErrorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-16">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="bg-white rounded-3xl shadow-xl p-12 border border-red-100">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                        <XCircle size={48} className="text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Error en el Pago
                    </h1>

                    <p className="text-lg text-gray-600 mb-8">
                        Hubo un problema al procesar tu pago. No se realizó ningún cargo a tu tarjeta.
                    </p>

                    <div className="bg-amber-50 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="font-bold text-amber-800 text-lg mb-3">Posibles causas:</h3>
                        <ul className="space-y-2 text-amber-800 text-sm">
                            <li>• Fondos insuficientes en la tarjeta</li>
                            <li>• La tarjeta fue rechazada por el banco</li>
                            <li>• Se agotó el tiempo de la sesión de pago</li>
                            <li>• Datos de tarjeta incorrectos</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/checkout"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all"
                        >
                            <RotateCcw size={20} />
                            Intentar de Nuevo
                        </Link>
                        <a
                            href="https://wa.me/527716854026?text=Hola, tuve un error al pagar en línea. ¿Pueden ayudarme?"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 px-6 py-4 rounded-xl font-bold hover:bg-green-50 transition-all"
                        >
                            <Phone size={20} />
                            Pedir Ayuda
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
