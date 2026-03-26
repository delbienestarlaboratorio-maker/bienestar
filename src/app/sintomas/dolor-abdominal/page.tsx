import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Stethoscope, ArrowRight, TestTube, Hospital } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dolor Abdominal - Causas, Síntomas y Riesgos Clínicos",
    description: "Conoce todo sobre el origen, las señales de alarma roja, opciones médicas y tratamientos para dolor abdominal. Clínica Mayo Virtual.",
    openGraph: {
        title: "Guía Médica: Dolor Abdominal",
        description: "Todo lo que necesitas saber antes de ir de urgencias sobre dolor abdominal."
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/sintomas/dolor-abdominal',
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
                        <span className="text-white font-medium">Dolor Abdominal</span>
                    </nav>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">Dolor Abdominal</h1>
                    <p className="text-xl text-blue-100 font-light mb-6">
                        Concepto Clínico: <span className="font-semibold text-white">Dolor Abdominal Agudo / Crónico</span> (CIE-10 / CIE-11: R10)
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
                                El dolor abdominal, comúnmente llamado dolor de estómago o de vientre, es una manifestación clínica que ocurre en la región comprendida entre el pecho y la ingle. Dado que el abdomen alberga órganos vitales de múltiples sistemas (digestivo, urinario, reproductivo, cardiovascular), la localización exacta, el tipo de dolor (punzante, sordo, tipo cólico) y los síntomas acompañantes son fundamentales para un diagnóstico preciso. Aunque muchas veces obedece a causas benignas como indigestión o gases, un dolor abdominal intenso y repentino puede ser la primera señal de una emergencia médica que requiera cirugía inmediata.
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
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">1. Gastroenteritis Infecciosa</h3>
                                    <p className="text-gray-700 leading-relaxed">Inflamación del tracto digestivo causado por virus, bacterias o parásitos (como rotavirus, norovirus, o salmonella). Provoca dolor tipo cólico, diarrea aguda, náuseas y vómitos.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">2. Apendicitis Aguda</h3>
                                    <p className="text-gray-700 leading-relaxed">Inflamación del apéndice. Típicamente comienza como un dolor sordo alrededor del ombligo que se desplaza hacia la parte inferior derecha del abdomen, volviéndose agudo y constante. Requiere cirugía de urgencia.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">3. Colecistitis (Piedras en la vesícula)</h3>
                                    <p className="text-gray-700 leading-relaxed">Inflamación de la vesícula biliar, casi siempre por cálculos. El dolor es agudo en la parte superior derecha del abdomen y suele empeorar bruscamente después de ingerir alimentos ricos en grasas. Puede irradiarse al hombro derecho.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">4. Cólico Nefrítico (Piedras en el riñón)</h3>
                                    <p className="text-gray-700 leading-relaxed">Dolor extremadamente intenso y repentino, a menudo descrito como 'el peor dolor de la vida'. En la zona baja de la espalda que irradia hacia la ingle o los genitales.</p>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">5. Enfermedad Úlcero-Péptica</h3>
                                    <p className="text-gray-700 leading-relaxed">Úlceras en el estómago o duodeno, comúnmente por infección de Helicobacter pylori o uso prolongado de AINEs (ibuprofeno, aspirina). El dolor típicamente es un ardor en la boca del estómago que mejora temporalmente al comer.</p>
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
                                <p className="text-rose-800 font-medium mb-4">No ignore las señales del cuerpo. Solicite asistencia médica inmediata o diríjase al hospital más cercano si experimenta dolor abdominal acompañado de cualquiera de las siguientes banderas rojas:</p>
                                <ul className="space-y-3">
                                    
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Dolor repentino y de máxima intensidad (sensación de desgarro interno).</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Fiebre superior a 39°C o escalofríos incontrolables.</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Abdomen rígido o duro al tacto (como una tabla), que duele al soltar la presión.</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Presencia de sangre en el vómito (hematemesis) o heces de color negro alquitrán (melena).</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-rose-900 leading-relaxed font-semibold">Piel y ojos de color amarillento (ictericia).</span>
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
                                                <Link href="/estudios/analisis-clinicos/biometria-hematica" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Biometría Hemática Completa</span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link href="/estudios/analisis-clinicos/quimica-sanguinea" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Química Sanguínea Integral</span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link href="/estudios/analisis-clinicos/examen-general-de-orina-ego" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Examen General de Orina (EGO)</span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link href="/estudios/analisis-clinicos/reacciones-febriles" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                    <TestTube className="w-5 h-5 text-teal-300" />
                                                    <span className="font-medium text-white">Reacciones Febriles</span>
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
                                
                                <Link href="/herramientas/riesgo-ulcera-gastritis" className="p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                                    <span className="font-semibold text-blue-900">Calculadora de Riesgo de Gastritis / Úlcera</span>
                                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link href="/herramientas/riesgo-celiaquia-gastrica" className="p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                                    <span className="font-semibold text-blue-900">Calculadora de Riesgo Celíaco</span>
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
