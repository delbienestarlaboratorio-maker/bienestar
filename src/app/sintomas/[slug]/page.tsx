import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Stethoscope, ArrowRight, TestTube, Hospital, Award } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { GoogleAd } from '@/components/ui/GoogleAd';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rawManifest from '@/data/symptoms.json';
import specialistsData from '@/data/specialists.json';
import { FeaturedSpecialistCard } from '@/components/ui/FeaturedSpecialistCard';
import { loadSymptomData } from '@/lib/data-loader';

// Slim manifest — slug list only (statically imported, fast)
const manifest: any[] = Array.isArray(rawManifest) ? rawManifest : [];

// ============================================================================
// SSG - empty for Cloudflare Workers (SSR on-demand), populated for local build
// ============================================================================
export const dynamicParams = true;

export async function generateStaticParams() {
    // On Cloudflare Workers: no pre-rendering, all pages are SSR on-demand
    // On local: also SSR on-demand (too many pages for SSG)
    return [];
}

// ============================================================================
// Dynamic SEO Metadata Generation
// ============================================================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const symptom = await loadSymptomData(resolvedParams.slug);
    if (!symptom) {
        const fallback = manifest.find(s => s.slug === resolvedParams.slug);
        return { title: fallback ? `${fallback.name} - Guía Médica` : 'Síntoma no encontrado' };
    }

    return {
        title: `${symptom.name} - Causas, Síntomas y Riesgos Clínicos`,
        description: `Conoce todo sobre el origen, las señales de alarma roja, opciones médicas y estudios sugeridos para ${symptom.name.toLowerCase()}. Clínica Mayo Virtual.`,
        openGraph: {
            title: `Guía Médica: ${symptom.name}`,
            description: `Todo lo que necesitas saber antes de ir de urgencias sobre ${symptom.name.toLowerCase()}.`
        }
    };
}

export default async function SymptomDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const symptom = await loadSymptomData(resolvedParams.slug);

    if (!symptom) {
        notFound();
    }

    // MATCHING ALGORITHM: Filter specialists that target this specific symptom slug
    const matchingSpecialists = specialistsData.filter((spec: any) =>
        spec.targetSymptoms.includes(resolvedParams.slug)
    );

    // Pick the highest tiered specialist (or first match) for primary display
    const featuredSpecialist = matchingSpecialists.length > 0 ? matchingSpecialists[0] : null;

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
                        <span className="text-white font-medium">{symptom.name}</span>
                    </nav>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{symptom.name}</h1>
                    <p className="text-xl text-blue-100 font-light mb-6">
                        Concepto Clínico: <span className="font-semibold text-white">{symptom.medicalName}</span> (CIE-10: {symptom.cie10})
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
                                {symptom.intro}
                            </p>
                        </section>

                        <div className="mb-10">
                            <AdBanner variant="horizontal" />
                        </div>

                        {/* Google AdSense — In-Article Ad */}
                        <GoogleAd slot="1234567890" format="fluid" layout="in-article" />

                        {/* Principales Causas - Listado Médico Riguroso */}
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Stethoscope className="w-8 h-8 text-blue-700" />
                                <h2 className="text-3xl font-bold text-gray-900">¿Cuáles son las Causas Frecuentes y Letales?</h2>
                            </div>
                            <div className="space-y-6">
                                {symptom.causes.map((cause: any, idx: number) => (
                                    <div key={idx} className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                        <h3 className="text-xl font-bold text-blue-900 mb-2">{idx + 1}. {cause.name || "Causa Fisiológica Primaria"}</h3>
                                        <p className="text-gray-700 leading-relaxed">{cause.desc || cause}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* RED FLAGS - Cuidado Médico Legal */}
                        {symptom.redFlags && symptom.redFlags.length > 0 && (
                            <section className="mb-12">
                                <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-8 shadow-inner">
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertTriangle className="w-8 h-8 text-rose-600" />
                                        <h2 className="text-2xl font-bold text-rose-900">🚨 ¿Cuándo acudir a urgencias médicas (Red Flags)?</h2>
                                    </div>
                                    <p className="text-rose-800 font-medium mb-4">No ignore las señales graves del cuerpo. Solicite asistencia médica inmediata o diríjase al hospital más cercano si experimenta {symptom.name.toLowerCase()} acompañado de cualquiera de estas banderas rojas:</p>
                                    <ul className="space-y-3">
                                        {symptom.redFlags.map((flag: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 bg-rose-600 rounded-full p-1 shadow-sm shrink-0">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-rose-900 leading-relaxed font-semibold">{flag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* ELITE SPECIALIST DIRECTORY INJECTION */}
                        {featuredSpecialist && (
                            <section className="mb-12 mt-8 pt-8 border-t-2 border-dashed border-gray-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-blue-100 text-blue-800 p-2 rounded-xl">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        ¿Necesitas atención médica para este síntoma?
                                    </h2>
                                </div>
                                <p className="text-gray-600 mb-6 font-medium">
                                    Hemos verificado a los mejores médicos para tratar el caso clínico: <span className="font-bold">{symptom.name}</span>. Contacta directamente sin comisiones.
                                </p>
                                <FeaturedSpecialistCard specialist={featuredSpecialist} />
                            </section>
                        )}

                        {/* CTA VENTA DE LABORATORIO */}
                        <section className="mb-12">
                            <div className="bg-gradient-to-br from-indigo-900 to-blue-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold mb-4">¿Te identificas con estos síntomas?</h2>
                                        <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                                            Los diagnósticos oportunos salvan vidas y evitan daños crónicos metabólicos. Las Guías Internacionales Clínicas solicitan los siguientes grupos de análisis para descartar riesgos frente a este síntoma:
                                        </p>
                                        <ul className="space-y-4 mb-2">
                                            {symptom.tests && symptom.tests.map((t: any, idx: number) => (
                                                <li key={idx}>
                                                    <Link href={t.url || "/estudios"} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                        <TestTube className="w-5 h-5 text-teal-300" />
                                                        <span className="font-medium text-white">{t.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                            {(!symptom.tests || symptom.tests.length === 0) && (
                                                <li>
                                                    <Link href="/estudios/analisis-clinicos/quimica-sanguinea" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                        <TestTube className="w-5 h-5 text-teal-300" />
                                                        <span className="font-medium text-white">Química Sanguínea General Recomendada</span>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                                        <a href={`https://wa.me/527716854026?text=${encodeURIComponent(`Hola, tengo ${symptom.name.toLowerCase()} y quisiera cotizar los estudios recomendados`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-3">
                                            Cotizar de Inmediato <ArrowRight className="w-6 h-6" />
                                        </a>
                                        <p className="text-blue-200 text-sm mt-4 text-center">Respuesta en 2 minutos (WhatsApp)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Enlaces de Interés (Herramientas Relacionadas) */}
                        {symptom.tools && symptom.tools.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Hospital className="w-6 h-6 text-gray-400" /> Calculadoras Clínicas Derivadas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {symptom.tools.map((tl: any, idx: number) => (
                                        <Link key={idx} href={tl.url || "/herramientas"} className="p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                                            <span className="font-semibold text-blue-900">{tl.name}</span>
                                            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </div>

                {/* Google AdSense — After Content Ad */}
                <div className="max-w-4xl mx-auto px-4">
                    <GoogleAd slot="0987654321" format="auto" />
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto pb-10">
                    <p className="mb-2">⚠️ <strong>Descargo de responsabilidad médica para {symptom.name}:</strong></p>
                    <p>
                        El contenido de diagnóstico aquí presentado está diseñado estrictamente para propósitos educacionales e informativos en México dictados por inteligencia clínica computarizada. No debe interpretarse de ninguna manera como un consejo médico profesional, diagnóstico concluyente ni una recomendación de tratamiento irrestricta. Si usted experimenta dolores inusuales, hemorragias o síntomas de aparición repentina descritos en las señales de alerta roja (Red Flags), acuda de forma inmediata con su médico urgenciólogo o marque a emergencias al 911 en México.
                    </p>
                </div>
            </div>
        </main>
    )
}
