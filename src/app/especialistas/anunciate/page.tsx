import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, TrendingUp, Users, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Anúnciate con Nosotros: Directorio Médico de Élite | Laboratorio Bienestar',
    description: 'Capta cientos de pacientes mensuales posicionando tu consulta directamente en nuestros artículos clínicos. Únete al Directorio de Especialistas.',,
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/especialistas/anunciate',
    },
};

export default function AdvertisePage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white pt-24 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 inline-block">
                        Para Especialistas Médicos
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Convierte a nuestros lectores en <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">tus pacientes privados</span>.
                    </h1>
                    <p className="text-xl text-blue-100 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
                        Laboratorio Bienestar recibe miles de visitas mensuales de personas con síntomas reales buscando respuestas. Posiciona tu perfil médico directamente en los artículos relacionados a tu especialidad y recibe mensajes directos en tu WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#planes" className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center gap-2 group">
                            Ver Planes de Posicionamiento <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-sm text-blue-200 sm:hidden">Sin comisiones por consulta</p>
                    </div>
                </div>
            </div>

            {/* Value Proposition */}
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué anunciarte aquí?</h2>
                    <p className="text-gray-600 text-lg">A diferencia de los directorios tradicionales, nosotros te conectamos en el momento exacto de la necesidad.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
                            title: "Tráfico Ultra-Segmentado",
                            desc: "Si eres especialista en diabetes, tu perfil aparecerá exclusivamente en páginas sobre 'Sed Excesiva' o 'Glucosa Alta'."
                        },
                        {
                            icon: <Smartphone className="w-8 h-8 text-emerald-500" />,
                            title: "Cero Comisiones",
                            desc: "Los pacientes te contactan directamente a tu número de WhatsApp. No cobramos porcentaje por tus consultas."
                        },
                        {
                            icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
                            title: "Reputación Respaldada",
                            desc: "Aparecer como 'Especialista Recomendado' dentro del portal clínico del laboratorio genera confianza inmediata."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform">
                            <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulated Live View */}
            <div className="bg-white border-y border-gray-100 py-20 overflow-hidden relative">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Así se verá tu Perfil Élite en nuestros artículos</h2>

                    {/* Mockup of a symptom page with the card */}
                    <div className="bg-gray-50 rounded-xl p-4 md:p-8 max-w-4xl mx-auto text-left shadow-2xl border border-gray-200 transform md:scale-105">
                        <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-5/6 h-4 bg-gray-200 rounded mb-8"></div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8 hidden md:block">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-blue-200 rounded-full shrink-0"></div>
                                <div className="flex-1 space-y-3">
                                    <div className="w-1/3 h-5 bg-blue-200 rounded"></div>
                                    <div className="w-full h-3 bg-blue-100 rounded"></div>
                                    <div className="w-4/5 h-3 bg-blue-100 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Specialist Card Mock */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 flex flex-col sm:flex-row gap-6 relative">
                            <div className="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                                Tu Perfil Aquí
                            </div>
                            <div className="w-24 h-24 bg-gray-200 rounded-full shrink-0 border-4 border-white shadow-md"></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">Dr. Nombre Apellido <CheckCircle2 className="w-4 h-4 text-blue-500" /></h3>
                                <p className="text-blue-600 font-medium">Tu Especialidad Médica</p>
                                <div className="flex gap-2 mt-3">
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Certificado</span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">5.0 ★</span>
                                </div>
                                <button className="mt-4 bg-[#25D366] text-white font-bold py-2 px-6 rounded-lg text-sm">
                                    Agendar por WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="planes" className="max-w-6xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Planes de Posicionamiento</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Selecciona el alcance que deseas tener dentro de nuestra red médica. Cancela cuando quieras.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Plan 1 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Básico</h3>
                        <p className="text-gray-500 mb-6 h-12">Perfecto para empezar a tener visibilidad local.</p>
                        <div className="text-4xl font-black text-gray-900 mb-6">
                            $499<span className="text-lg text-gray-500 font-medium tracking-normal">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-gray-600">Presencia en hasta 10 síntomas específicos</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-gray-600">Botón de WhatsApp directo</span></li>
                            <li className="flex items-start gap-3 opacity-40"><CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" /> <span className="text-gray-500">Insignia de 'Especialista Recomendado'</span></li>
                        </ul>
                        <a href="https://wa.me/527716854026?text=Hola,%20me%20interesa%20el%20Plan%20Básico%20para%20anunciarme" target="_blank" rel="noreferrer" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
                            Contratar Plan
                        </a>
                    </div>

                    {/* Plan 2 (Highlighted) */}
                    <div className="bg-gradient-to-b from-blue-900 to-indigo-900 rounded-3xl p-8 border border-blue-700 shadow-2xl flex flex-col relative transform md:-translate-y-4">
                        <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 text-teal-950 font-black text-xs uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                                Más Popular
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Élite</h3>
                        <p className="text-blue-200 mb-6 h-12">Cobertura total de tu especialidad clínica.</p>
                        <div className="text-4xl font-black text-white mb-6">
                            $999<span className="text-lg text-blue-300 font-medium tracking-normal">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-blue-50">
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span>Presencia en <strong>TODOS</strong> los síntomas de tu rama</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span>Botón de WhatsApp directo</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span>Insignia dorada de 'Especialista Recomendado'</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span>Prioridad sobre médicos Básicos</span></li>
                        </ul>
                        <a href="https://wa.me/527716854026?text=Hola,%20me%20interesa%20crear%20mi%20Perfil%20Élite" target="_blank" rel="noreferrer" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl text-center shadow-lg transition-all">
                            Adquirir Perfil Élite
                        </a>
                    </div>

                    {/* Plan 3 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusivo</h3>
                        <p className="text-gray-500 mb-6 h-12">Monopoliza los prospectos de tu ciudad.</p>
                        <div className="text-4xl font-black text-gray-900 mb-6">
                            $2,499<span className="text-lg text-gray-500 font-medium tracking-normal">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-gray-600">Eres el <strong>ÚNICO</strong> especialista mostrado en tu ciudad/estado</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-gray-600">Presencia en la Red Premium</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-gray-600">Mención en nuestro boletín a pacientes</span></li>
                        </ul>
                        <a href="https://wa.me/527716854026?text=Hola,%20me%20interesa%20la%20Exclusividad%20en%20mi%20ciudad" target="_blank" rel="noreferrer" className="w-full bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl text-center transition-colors">
                            Contactar Ventas
                        </a>
                    </div>

                </div>
            </div>

            {/* Footer Trust */}
            <div className="text-center pb-12 text-gray-500 text-sm">
                Respaldado por Laboratorio Clínico Bienestar — Más de 20 años de experiencia médica.
            </div>

        </main>
    );
}
