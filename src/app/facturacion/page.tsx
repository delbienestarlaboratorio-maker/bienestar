import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Clock, CheckCircle } from 'lucide-react';
import { InvoiceForm } from '@/components/facturacion/InvoiceForm';

export const metadata = {
    title: 'Facturación Electrónica | Laboratorio Del Bienestar',
    description: 'Solicita tu factura electrónica CFDI 4.0. Proceso rápido y seguro. Recibe tu factura en 24-48 horas.',
};

export default function FacturacionPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-700 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <FileText size={48} className="text-green-400" />
                        <h1 className="text-5xl font-bold text-white">
                            Facturación Electrónica
                        </h1>
                    </div>
                    <p className="text-xl text-green-100 max-w-3xl">
                        Solicita tu factura electrónica (CFDI 4.0) de forma rápida y segura.
                        Solo necesitas tus datos fiscales.
                    </p>
                </div>
            </div>

            {/* Beneficios */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="text-green-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">100% Seguro</h3>
                        <p className="text-gray-600 text-sm">
                            Cumplimos con todas las normas del SAT. Tu información está protegida.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Clock className="text-blue-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Entrega Rápida</h3>
                        <p className="text-gray-600 text-sm">
                            Recibe tu factura electrónica en tu correo en 24-48 horas hábiles.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="text-purple-900" size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Válido Fiscalmente</h3>
                        <p className="text-gray-600 text-sm">
                            Factura electrónica (CFDI 4.0) con validez oficial ante el SAT.
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <InvoiceForm />

                {/* FAQ Rápido */}
                <div className="mt-16 bg-white p-8 rounded-xl border-2 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>

                    <div className="space-y-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-900 hover:text-green-900">
                                ¿Cuánto tiempo tarda mi factura?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Las facturas se emiten en 24-48 horas hábiles. Recibirás un correo electrónico con tu CFDI en formato PDF y XML.
                            </p>
                        </details>

                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-900 hover:text-green-900">
                                ¿Puedo facturar servicios de meses anteriores?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Solo se pueden facturar servicios del mes en curso, de acuerdo con las disposiciones fiscales vigentes.
                            </p>
                        </details>

                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-900 hover:text-green-900">
                                ¿Necesito mi número de folio?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-3 text-gray-600">
                                El número de folio es opcional pero recomendado para procesar tu solicitud más rápidamente. Lo encuentras en tu recibo de pago.
                            </p>
                        </details>

                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-900 hover:text-green-900">
                                ¿Qué es el Uso de CFDI?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Es la clave que indica para qué usarás la factura fiscalmente. Para análisis de laboratorio, generalmente se usa <strong>D01 - Honorarios médicos y gastos hospitalarios</strong>.
                            </p>
                        </details>

                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-900 hover:text-green-900">
                                ¿Puedo corregir datos después de enviar?
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Sí. Si detectas un error después de enviar, contáctanos inmediatamente por WhatsApp o teléfono antes de que se procese la factura.
                            </p>
                        </details>
                    </div>
                </div>

                {/* Contacto */}
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        ¿Necesitas ayuda?
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Si tienes problemas o dudas sobre el proceso de facturación, contáctanos:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/contacto"
                            className="px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
                        >
                            WhatsApp
                        </Link>
                        <Link
                            href="/faq"
                            className="px-6 py-3 bg-white border-2 border-green-900 text-green-900 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Ver más preguntas
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
