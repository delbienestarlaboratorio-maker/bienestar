import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowLeft } from 'lucide-react';

export default function SucursalesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Sucursales</h1>
                    <p className="text-xl text-gray-600">Estamos cerca de ti para brindarte la mejor atención.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder Sucursal 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-full h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                            <MapPin size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sucursal Central</h2>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-green-600 shrink-0 mt-1" />
                                <p>Av. Principal #123, Col. Centro, Ciudad de México</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-green-600 shrink-0" />
                                <p>55 1234 5678</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-green-600 shrink-0" />
                                <p>Lun - Vie: 7:00 - 19:00 | Sáb: 7:00 - 14:00</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors">
                            Ver en el mapa
                        </button>
                    </div>

                    {/* Placeholder Sucursal 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-full h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                            <MapPin size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sucursal Norte</h2>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-green-600 shrink-0 mt-1" />
                                <p>Calzada del Norte #456, Col. Industrial, Ciudad de México</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-green-600 shrink-0" />
                                <p>55 8765 4321</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-green-600 shrink-0" />
                                <p>Lun - Vie: 7:00 - 18:00 | Sáb: 8:00 - 13:00</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors">
                            Ver en el mapa
                        </button>
                    </div>

                    {/* Placeholder Sucursal 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-full h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                            <MapPin size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sucursal Sur</h2>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-green-600 shrink-0 mt-1" />
                                <p>Av. Insurgentes Sur #789, Col. Del Valle, Ciudad de México</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-green-600 shrink-0" />
                                <p>55 5555 5555</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-green-600 shrink-0" />
                                <p>Lun - Dom: 7:00 - 20:00</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors">
                            Ver en el mapa
                        </button>
                    </div>
                </div>

                <div className="mt-16 bg-green-900 rounded-3xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">¿No encuentras una sucursal cerca?</h2>
                    <p className="text-xl text-green-100 mb-8">Ofrecemos servicio a domicilio en toda el área metropolitana.</p>
                    <button className="bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors">
                        Agendar servicio a domicilio
                    </button>
                </div>
            </div>
        </div>
    );
}
