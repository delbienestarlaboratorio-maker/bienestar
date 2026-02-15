import Link from 'next/link';
import { Construction, MessageCircle, ArrowLeft } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppLink } from '@/lib/branches';

export const metadata = {
    title: 'Resultados en Línea | Laboratorio Del Bienestar',
    description: 'Próximamente podrás consultar tus resultados de laboratorio en línea. Mientras tanto, contáctanos por WhatsApp.',
};

export default function ResultadosPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-center">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-10 text-white">
                        <div className="bg-white/20 w-fit p-5 rounded-2xl mx-auto mb-6">
                            <Construction size={56} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Resultados en Línea
                        </h1>
                        <p className="text-amber-100 text-lg">
                            Próximamente disponible
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-12">
                        <div className="max-w-md mx-auto">
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Estamos trabajando para que puedas consultar y descargar tus resultados de laboratorio directamente desde aquí.
                            </p>

                            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-8">
                                <h2 className="font-bold text-green-900 text-lg mb-2">
                                    ¿Necesitas tus resultados ahora?
                                </h2>
                                <p className="text-green-800 text-sm mb-4">
                                    Contáctanos por WhatsApp o teléfono y te los enviaremos a tu correo electrónico.
                                </p>
                                <a
                                    href={getWhatsAppLink('Hola, necesito consultar mis resultados de laboratorio')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl text-lg"
                                >
                                    <MessageCircle size={24} />
                                    WhatsApp: {CONTACT_INFO.mainPhoneFormatted}
                                </a>
                            </div>

                            <p className="text-sm text-gray-500">
                                ¿Prefieres llamar?{' '}
                                <a href={`tel:${CONTACT_INFO.mainPhone}`} className="text-green-700 font-bold hover:underline">
                                    {CONTACT_INFO.mainPhoneFormatted}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
