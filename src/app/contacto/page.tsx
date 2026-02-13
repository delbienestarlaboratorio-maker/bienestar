import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
    title: 'Contacto | Laboratorio Bienestar',
    description: 'Contáctanos para agendar tu cita o resolver tus dudas. WhatsApp, teléfono y ubicación.',
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
                        href="https://wa.me/527716854026"
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
                        <p className="text-xl text-gray-700 mb-4">771 685 4026</p>
                        <p className="text-gray-600">Chatea con nosotros (más rápido)</p>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:7716854026"
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
                        <p className="text-xl text-gray-700 mb-4">771 685 4026</p>
                        <p className="text-gray-600">Llámanos directamente</p>
                    </a>
                </div>

                {/* Locations */}
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
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">🏥 Sucursal Centro</h3>
                            <p className="text-lg text-gray-700 flex items-start gap-3">
                                <MapPin className="text-purple-500 flex-shrink-0 mt-1" />
                                <span>Av. Juárez #123, Centro, Tizayuca, Hidalgo</span>
                            </p>
                            <p className="text-lg text-gray-700 flex items-start gap-3">
                                <Clock className="text-purple-500 flex-shrink-0 mt-1" />
                                <span>Lun-Vie: 7am-7pm | Sáb: 8am-2pm</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">🏥 Sucursal Norte</h3>
                            <p className="text-lg text-gray-700 flex items-start gap-3">
                                <MapPin className="text-pink-500 flex-shrink-0 mt-1" />
                                <span>Calle Reforma #456, Tizayuca, Hidalgo</span>
                            </p>
                            <p className="text-lg text-gray-700 flex items-start gap-3">
                                <Clock className="text-pink-500 flex-shrink-0 mt-1" />
                                <span>Lun-Vie: 7am-7pm | Sáb: 8am-2pm</span>
                            </p>
                        </div>
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
