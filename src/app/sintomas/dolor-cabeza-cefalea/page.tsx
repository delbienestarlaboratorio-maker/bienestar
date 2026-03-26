import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Stethoscope, ArrowRight, TestTube, Hospital } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dolor de Cabeza (Cefalea) - Causas, Síntomas y Riesgos Clínicos",
    description: "Conoce todo sobre el origen, las señales de alarma roja, opciones médicas y tratamientos para dolor de cabeza (cefalea). Clínica Mayo Virtual.",
    openGraph: {
        title: "Guía Médica: Dolor de Cabeza (Cefalea)",
        description: "Todo lo que necesitas saber antes de ir de urgencias sobre dolor de cabeza (cefalea)."
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/sintomas/dolor-cabeza-cefalea',
    },
};

export default function SymptomPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-blue-200 mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/sintomas" className="hover:text-white transition-colors">Directorio Médico A-Z</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Dolor de Cabeza (Cefalea)</span>
                    </nav>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">Dolor de Cabeza (Cefalea)</h1>
                    <p className="text-xl text-blue-100 font-light mb-6">
                        Concepto Clínico: <span className="font-semibold text-white">Cefalea Tensional / Migraña</span> (CIE-10 / CIE-11: R51)
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
                        <span className="flex items-center justify-center bg-blue-500 w-2 h-2 rounded-full"></span>
                        Revisión Médica Exhaustiva | Tiempo de lectura: 4 min
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8 lg:p-12">
                        
                        {/* Intro Paragraph SEO 150 words */}
                        <section className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
                            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-900 first-letter:float-left first-letter:mr-3">
                                El dolor de cabeza o cefalea es tal vez una de las molestias físicas más comunes y universales en el ser humano, pero también una de las más frustrantes. A nivel anatómico, el tejido cerebral en sí mismo no posee receptores de dolor. Sin embargo, la vasta red de nervios que recorren el cuero cabelludo, los vasos sanguíneos pericraneales y las membranas gruesas (meninges) que envuelven el cerebro sí son extremadamente sensibles. La inmensa mayoría de las cefaleas son catalogadas como 'primarias', es decir, el dolor es la enfermedad misma y no existe una lesión anatómica subyacente que lo explique. A pesar de esto, una molestia que se desvía del patrón normal puede representar urgencias vitales críticas.
                            </p>
                        </section>

                        <div className="mb-10">
                            <AdBanner variant="horizontal" />
                        </div>

                        {/* Principales Causas - Listado Médico Riguroso */}
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Stethoscope className="w-8 h-8 text-blue-700" />
                                <h2 className="text-3xl font-bold text-gray-900">¿Cuáles son las Causas más Frecuentes?</h2>
                            </div>
                            <div className="space-y-6">
                                
                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">1. Cefalea Tensional</h3>
                                    <p className="text-gray-700 leading-relaxed">Constituye hasta el 80% de los dolores de cabeza en adultos. Suele manifestarse como una venda o banda de presión sorda alrededor de la frente y las sienes. El causante directo es la tensión muscular de los músculos del cuello y el cuero cabelludo asociada al estrés, la mala postura o el cansancio visual.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">2. Migraña</h3>
                                    <p className="text-gray-700 leading-relaxed">Un trastorno neurovascular crónico. Provoca un dolor pulsátil e intenso, generalmente en un solo lado de la cabeza (unilateral). Frecuentemente se acompaña de náuseas graves, vómitos, gran sensibilidad a la luz potente (fotofobia) y a los sonidos altos.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">3. Cefalea en Racimos</h3>
                                    <p className="text-gray-700 leading-relaxed">Dolor punzante, súbito y extremadamente intenso localizado detrás o alrededor de un solo ojo. Ocurre a través de ataques agudos ('racimos') consecutivos, a menudo en el mismo momento del día, con lagrimeo del ojo afectado y congestión nasal.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">4. Hipertensión Arterial Grave (Crisis Hipertensiva)</h3>
                                    <p className="text-gray-700 leading-relaxed">Elevación crítica de la presión arterial, usualmente por encima de valores de 180/120 mmHg. Aumenta la presión de perfusión craneal, lo que distiende arterias cerebrales de forma violenta, provocando dolor occipital o pulsaciones fuertes.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">5. Meningitis o Infección de Sistema Nervioso</h3>
                                    <p className="text-gray-700 leading-relaxed">Proceso infeccioso agresivo en el revestimiento del cerebro y la médula. Genera dolor de alta intensidad combinado con rigidez en la nuca al intentar doblar el cuello hacia el pecho.</p>
                                </div>
                            </div>
                        </section>

                        {/* RED FLAGS - Cuidado Médico Legal */}
                        <section className="mb-12">
                            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-8 shadow-inner">
                                <div className="flex items-center gap-3 mb-6">
                                    <AlertTriangle className="w-8 h-8 text-rose-600" />
                                    <h2 className="text-2xl font-bold text-rose-900">🚨 ¿Cuándo acudir a urgencias médicas?</h2>
                                </div>
                                <p className="text-rose-800 font-medium mb-4">No ignore las señales del cuerpo. Solicite asistencia médica inmediata o diríjase al hospital más cercano si experimenta dolor de cabeza (cefalea) acompañado de cualquiera de las siguientes banderas rojas:</p>
                                <ul className="space-y-3">
                                    
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Aparición súbita e instantánea de un dolor extremo irracional ('El peor dolor de cabeza de mi vida' en fracción de segundos - posible hemorragia intracraneal).</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Cefalea acompañada de debilidad repentina en la mitad del cuerpo, problemas para arrastrar palabras o pérdida de visión en un ojo (signos de AVC - Accidente Cerebrovascular).</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Cefalea junto a vómitos explosivos no producidos por náuseas (signo de hipertensión endocraneal).</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Dolor de cabeza severo con rigidez extrema en el cuello, incapacidad de mirar la luz o fiebre muy alta no explicada.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* CTA VENTA DE LABORATORIO */}
                        <section className="mb-12">
                            <div className="bg-gradient-to-br from-indigo-900 to-blue-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold mb-4">¿Te identificas con estos síntomas?</h2>
                                        <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                                            Los diagnósticos oportunos salvan vidas y evitan daños crónicos. Solicita el grupo de análisis clínicos recomendados para confirmar tu sospecha o descargar riesgos.
                                        </p>
                                        <ul className="space-y-4 mb-2">
                                            
                                            <li>
                                                <Link href="/estudios/checkups/check-up-integral" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Química Sanguínea Completea de 35 a 45 Elementos</span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link href="/estudios/analisis-clinicos/perfil-de-lipidos" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Perfil de Lípidos Sanguíneos</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                                        <a href="https://wa.me/527716854026?text=Hola,%20buscaba%20cotizar%20estudios%20clínicos" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-3">
                                            Cotizar de Inmediato <ArrowRight className="w-6 h-6" />
                                        </a>
                                        <p className="text-blue-200 text-sm mt-4 text-center">Respuesta en 2 minutos (WhatsApp)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Enlaces de Interés (Herramientas Relacionadas) */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Hospital className="w-6 h-6 text-gray-400" /> Auto-Test en Línea
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                <Link href="/herramientas/riesgo-cardiovascular" className="p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                                    <span className="font-semibold text-blue-900">Calculadora de Riesgo Cardiovascular</span>
                                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link href="/herramientas/clasificador-presion-arterial" className="p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                                    <span className="font-semibold text-blue-900">Clasificador de Presión Arterial</span>
                                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </section>

                    </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto pb-10">
                    <p className="mb-2">⚠️ <strong>Descargo de responsabilidad médica:</strong></p>
                    <p>
                        El contenido de este directorio de síntomas está diseñado estrictamente para propósitos educacionales e informativos en México. No debe interpretarse de ninguna manera como un consejo médico profesional, diagnóstico, ni recomendación de tratamiento. Si usted experimenta dolor inusual, hemorragia visible, o síntomas de aparición repentina como los descritos en las señales de alerta roja, acuda de forma inmediata con un médico en urgencias o marque al 911 en México. Chispito.mx Laboratorio no asume responsabilidad clínica derivada de decisiones autónomas del lector.
                    </p>
                </div>
            </div>
        </main>
    )
}
