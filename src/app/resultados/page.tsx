import Link from 'next/link';
import { FileText, Search, ShieldCheck, ArrowLeft, Download } from 'lucide-react';

export default function ResultadosPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-green-900 p-8 text-center text-white">
                        <div className="bg-white/20 w-fit p-4 rounded-2xl mx-auto mb-6">
                            <FileText size={48} />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Consulta de Resultados</h1>
                        <p className="text-green-100">Ingresa tus datos para descargar tus estudios.</p>
                    </div>

                    <div className="p-8 sm:p-12">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Orden / Folio
                                </label>
                                <div className="relative">
                                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        id="orderId"
                                        placeholder="Ej: BJ-123456"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 transition-all shadow-lg flex items-center justify-center gap-3"
                            >
                                <Download size={24} />
                                Consultar Resultados
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <ShieldCheck size={24} className="text-blue-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-1 text-sm">Tus datos están seguros</h3>
                                    <p className="text-blue-800 text-xs leading-relaxed">
                                        Cumplimos con los más altos estándares de seguridad y privacidad para proteger tu información médica confidencial.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>¿Tienes problemas para consultar tus resultados?</p>
                            <a href="tel:5512345678" className="text-green-700 font-bold hover:underline">Contáctanos al 55 1234 5678</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
