import React from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Stethoscope, ArrowRight, TestTube, Hospital, Award } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { GoogleAd } from '@/components/ui/GoogleAd';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadJsonData } from '@/lib/build-time-data';
import specialistsData from '@/data/specialists.json';
import { FeaturedSpecialistCard } from '@/components/ui/FeaturedSpecialistCard';
import { loadSymptomData } from '@/lib/data-loader';

// Slim manifest — loaded at build time only (not bundled)
function getManifest(): any[] {
    const raw = loadJsonData<any[]>('symptoms.json');
    return Array.isArray(raw) ? raw : [];
}

// ============================================================================
// SSG - empty for Cloudflare Workers (SSR on-demand), populated for local build
// ============================================================================
export const dynamicParams = true;

export async function generateStaticParams() {
    // On Cloudflare Workers: no pre-rendering, all pages are SSR on-demand
    // On local: also SSR on-demand (too many pages for SSG)
    // BUGFIX: Return at least one static param so Turbopack doesn't strip the CSS for this route!
    return [{ slug: 'dolor-cabeza-intenso' }];
}

// ============================================================================
// Dynamic SEO Metadata Generation
// ============================================================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const symptom = await loadSymptomData(resolvedParams.slug);
    if (!symptom) {
        const fallback = getManifest().find(s => s.slug === resolvedParams.slug);
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
        spec.targetSymptoms && spec.targetSymptoms.includes(resolvedParams.slug)
    );

    // Pick the highest tiered specialist (or first match) for primary display
    const featuredSpecialist = matchingSpecialists.length > 0 ? matchingSpecialists[0] : null;

    return (
        <main className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* --- HERO SECTION --- */}
            <div className="bg-[#002855] text-white pt-24 pb-20 relative overflow-hidden">
                {/* Decorative Graphic */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-blue-200/80 mb-8 font-medium tracking-wide" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
                        <Link href="/sintomas" className="hover:text-white transition-colors">Directorio Médico</Link>
                        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
                        <span className="text-white truncate max-w-[200px] md:max-w-none">{symptom.name}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                        {symptom.name}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg text-blue-100 mb-8">
                        {symptom.medicalName && (
                            <p className="flex md:items-center gap-2">
                                <span className="font-semibold text-white/70 text-sm uppercase tracking-wider">Concepto Clínico:</span>
                                <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg">{symptom.medicalName}</span>
                            </p>
                        )}
                        {symptom.cie10 && (
                            <p className="flex md:items-center gap-2">
                                <span className="font-semibold text-white/70 text-sm uppercase tracking-wider">CIE-10:</span>
                                <span className="font-mono bg-blue-800 px-2 py-1 rounded text-blue-100">{symptom.cie10}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT OVERLAP --- */}
            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">

                    {/* Intro Section */}
                    {symptom.intro && (
                        <div className="p-8 md:p-12 border-b border-gray-100">
                            <p className="text-xl leading-relaxed text-gray-700 font-medium">
                                <span className="float-left text-6xl font-black text-blue-800 pr-3 pt-2 leading-none">{symptom.intro.charAt(0)}</span>
                                {symptom.intro.slice(1)}
                            </p>
                        </div>
                    )}

                    <div className="p-8 md:p-12 space-y-16">
                        {/* Ads */}
                        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                            <AdBanner variant="horizontal" />
                        </div>

                        {/* Description */}
                        {symptom.description && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <Stethoscope className="w-6 h-6 text-blue-600" /> Descripción Detallada
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {symptom.description}
                                </p>
                            </section>
                        )}

                        {/* Red Flags / Urgencias */}
                        {symptom.redFlags && symptom.redFlags.length > 0 && (
                            <section>
                                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6 md:p-8">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-red-100 p-3 rounded-full shrink-0">
                                            <AlertTriangle className="w-8 h-8 text-red-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-red-900 mb-2">Banderas Rojas (Urgencia)</h2>
                                            <p className="text-red-800 font-medium leading-relaxed">
                                                Acuda a urgencias inmediatamente si {symptom.name.toLowerCase()} se presenta junto con alguno de estos signos:
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="mt-6 space-y-3 pl-2 md:pl-16">
                                        {symptom.redFlags.map((flag: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="text-red-500 font-bold mt-1">•</span>
                                                <span className="text-red-900 font-medium">{flag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {symptom.whenToSeek && (
                                        <div className="mt-8 pt-6 border-t border-red-200/50">
                                            <p className="text-red-800 italic">{symptom.whenToSeek}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Causas */}
                        {symptom.causes && symptom.causes.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Principales Causas</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {symptom.causes.map((cause: string | any, idx: number) => {
                                        const title = typeof cause === 'string' ? cause.split(':')[0] || cause.split('-')[0] || `Causa ${idx + 1}` : cause.name;
                                        const desc = typeof cause === 'string' ? cause.substring(title.length + 1).trim() || cause : cause.desc;

                                        return (
                                            <div key={idx} className="bg-blue-50/40 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                                                        {idx + 1}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-blue-900">{title}</h3>
                                                </div>
                                                {desc && <p className="text-gray-600 leading-relaxed pl-11">{desc}</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Síntomas Acompañantes */}
                        {symptom.symptoms && symptom.symptoms.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Síntomas Acompañantes Frecuentes</h2>
                                <div className="flex flex-wrap gap-3">
                                    {symptom.symptoms.map((symp: string, idx: number) => (
                                        <span key={idx} className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium border border-gray-200 shadow-sm">
                                            {symp}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Diagnóstico y Estudios */}
                        {(symptom.diagnosis || (symptom.tests && symptom.tests.length > 0)) && (
                            <section className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <TestTube className="w-6 h-6 text-indigo-600" /> Diagnóstico y Estudios
                                </h2>

                                {symptom.diagnosis && (
                                    <p className="text-gray-700 mb-8 leading-relaxed text-lg">{symptom.diagnosis}</p>
                                )}

                                {symptom.tests && symptom.tests.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Estudios comunes solicitados:</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {symptom.tests.map((test: string | any, idx: number) => {
                                                const testName = typeof test === 'string' ? test : test.name;
                                                return (
                                                    <li key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                                        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                                                        <span className="text-gray-700 font-medium">{testName}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Tratamientos y Prevención */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {symptom.treatments && symptom.treatments.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tratamientos Médicos</h3>
                                    <ul className="space-y-3">
                                        {symptom.treatments.map((t: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <ChevronRight className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-gray-600 leading-relaxed">{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {symptom.homeRemedies && symptom.homeRemedies.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Manejo en Casa (Si no hay Red Flags)</h3>
                                    <ul className="space-y-3">
                                        {symptom.homeRemedies.map((r: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                                                <span className="text-gray-600 leading-relaxed">{r}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {/* FAQs */}
                        {symptom.faqs && symptom.faqs.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Preguntas Frecuentes</h2>
                                <div className="space-y-6">
                                    {symptom.faqs.map((faq: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ELITE SPECIALIST DIRECTORY INJECTION */}
                        {featuredSpecialist && (
                            <section className="mt-12 pt-12 border-t-2 border-dashed border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 text-blue-800 p-3 rounded-2xl">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Especialista Recomendado</h2>
                                            <p className="text-gray-500 font-medium">Atención médica verificada para este cuadro clínico.</p>
                                        </div>
                                    </div>
                                </div>
                                <FeaturedSpecialistCard specialist={featuredSpecialist} />
                            </section>
                        )}

                        {/* BOTTOM CTA - Laboratorio */}
                        <section className="bg-gradient-to-br from-[#002855] to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mt-12">
                            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Obtén un diagnóstico preciso hoy mismo</h2>
                                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                                    El diagnóstico guiado por análisis de laboratorio salva vidas. Nuestro equipo clínico está listo para recomendarte el check-up ideal.
                                </p>
                                <a href="https://wa.me/527716854026?text=Hola,%20me%20gustaría%20cotizar%20estudios%20de%20laboratorio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1">
                                    Contactar por WhatsApp <ArrowRight className="w-6 h-6" />
                                </a>
                                <p className="text-blue-200/60 text-sm mt-6">Laboratorio del Bienestar - Atención inmediata</p>
                            </div>
                        </section>

                    </div>
                </div>

                {/* Bottom Ad */}
                <div className="mt-8">
                    <GoogleAd slot="0987654321" format="auto" />
                </div>

                {/* Disclaimer */}
                <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto">
                    <p className="mb-2 font-semibold">⚠️ OMD - Aviso Médico Legal:</p>
                    <p className="leading-relaxed">
                        El contenido sobre <span className="font-semibold">{symptom.name}</span> generado en esta página tiene fines estrictamente informativos apoyados en algoritmos y bases de datos clínicas. No sustituye de ninguna forma la consulta presencial o telemédica con un médico certificado. Laboratorio del Bienestar no se hace responsable por diagnósticos o autotratamientos basados en esta plataforma educacional.
                    </p>
                </div>
            </div>
        </main>
    );
}
