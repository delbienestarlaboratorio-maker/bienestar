import Link from 'next/link';
import { Tag, Zap, Clock, ArrowLeft, Gift } from 'lucide-react';

export default function PromocionesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Promociones y Descuentos</h1>
                    <p className="text-xl text-gray-600">Aprovecha nuestras ofertas especiales para cuidar tu salud.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Promo 1 */}
                    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-fit p-3 rounded-2xl mb-6">
                                <Zap size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Lunes de Salud</h2>
                            <p className="text-xl text-green-100 mb-6 font-medium">20% de descuento en todos los análisis clínicos cada lunes.</p>
                            <div className="flex items-center gap-2 text-sm bg-black/20 w-fit px-4 py-2 rounded-full mb-8">
                                <Clock size={16} />
                                Válido todos los lunes de 2026
                            </div>
                            <button className="bg-white text-green-900 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                                Ver estudios incluidos
                            </button>
                        </div>
                    </div>

                    {/* Promo 2 */}
                    <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-fit p-3 rounded-2xl mb-6">
                                <Gift size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Mes de la Mujer</h2>
                            <p className="text-xl text-pink-100 mb-6 font-medium">Paquetes preventivos con hasta 35% de descuento.</p>
                            <div className="flex items-center gap-2 text-sm bg-black/20 w-fit px-4 py-2 rounded-full mb-8">
                                <Tag size={16} />
                                Válido durante todo el mes de Marzo
                            </div>
                            <button className="bg-white text-pink-700 px-8 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors">
                                Ver paquetes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Eres cliente frecuente?</h2>
                    <p className="text-gray-600 mb-8">Únete a nuestro programa de lealtad y obtén beneficios exclusivos en cada visita.</p>
                    <button className="border-2 border-green-900 text-green-900 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                        Saber más sobre el programa
                    </button>
                </div>
            </div>
        </div>
    );
}
