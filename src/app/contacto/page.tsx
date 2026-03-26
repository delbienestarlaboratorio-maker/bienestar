import Link from 'next/link';
import { MapPin, Clock, Phone } from 'lucide-react';
import { CONTACT_INFO, BRANCHES, getWhatsAppLink } from '@/lib/branches';

export const metadata = {
    title: 'Contacto | Laboratorio Del Bienestar — Tizayuca, Hidalgo',
    description: 'Contáctanos por WhatsApp al 771-685-4026 o visítanos en nuestras 2 sucursales en Tizayuca, Hidalgo. Atención personalizada.',,
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/contacto',
    },
};

export default function ContactoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Contáctanos</h1>
                    <p className="text-xl text-blue-100">Estamos para ayudarte</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* WhatsApp */}
                    <a
                        href={getWhatsAppLink('Hola, necesito información')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border border-gray-100 hover:border-green-200 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                                📱
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    WhatsApp
                                </h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <p className="text-xl text-gray-700 mb-4">{CONTACT_INFO.mainPhoneFormatted}</p>
                        <p className="text-gray-600">Chatea con nosotros (más rápido)</p>
                    </a>

                    {/* Phone */}
                    <a
                        href={`tel:${CONTACT_INFO.mainPhone}`}
                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border border-gray-100 hover:border-blue-200 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                                📞
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    Teléfono
                                </h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <p className="text-xl text-gray-700 mb-4">{CONTACT_INFO.mainPhoneFormatted}</p>
                        <p className="text-gray-600">Llámanos directamente</p>
                    </a>
                </div>

                {/* Locations - from centralized config */}
                <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
                            📍
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Nuestras Sucursales
                            </h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {BRANCHES.map((branch, index) => (
                            <div key={branch.id} className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    🏥 {branch.name} {branch.isPrimary && <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Principal</span>}
                                </h3>
                                <p className="text-lg text-gray-700 flex items-start gap-3">
                                    <MapPin className={`${index === 0 ? 'text-purple-500' : 'text-pink-500'} flex-shrink-0 mt-1`} />
                                    <span>{branch.address}</span>
                                </p>
                                <p className="text-lg text-gray-700 flex items-start gap-3">
                                    <Clock className={`${index === 0 ? 'text-purple-500' : 'text-pink-500'} flex-shrink-0 mt-1`} />
                                    <span>{branch.hours}</span>
                                </p>
                                <p className="text-lg text-gray-700 flex items-start gap-3">
                                    <Phone className={`${index === 0 ? 'text-purple-500' : 'text-pink-500'} flex-shrink-0 mt-1`} />
                                    <a href={`tel:${branch.phone}`} className="hover:underline">{branch.phoneFormatted}</a>
                                </p>
                                <div className="flex gap-3">
                                    <a
                                        href={branch.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
                                    >
                                        📍 Ver en Google Maps
                                    </a>
                                    <a
                                        href={getWhatsAppLink(`Hola, me gustaría agendar una cita en ${branch.name}`, branch.whatsapp)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors"
                                    >
                                        💬 WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/agendar"
                        className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                    >
                        Agendar Cita Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}
