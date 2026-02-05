'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    ¡Pago Exitoso!
                </h1>

                <p className="text-slate-600 mb-8">
                    Tu orden ha sido confirmada. Hemos enviado los detalles y tu comprobante a tu correo electrónico.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        Volver al Inicio
                    </Link>
                    <button className="block w-full text-slate-500 font-medium py-3 hover:text-slate-700">
                        Descargar Comprobante
                    </button>
                </div>
            </div>
        </div>
    );
}
