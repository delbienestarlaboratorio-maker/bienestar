import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Stethoscope, ArrowRight, TestTube, Hospital } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { GoogleAd } from '@/components/ui/GoogleAd';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rawManifest from '@/data/diseases.json';
import { loadDiseaseData } from '@/lib/data-loader';

const manifest: any[] = Array.isArray(rawManifest) ? rawManifest : [];

// SSG - empty for Cloudflare Workers (SSR on-demand)
export const dynamicParams = true;

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const disease = await loadDiseaseData(resolvedParams.slug);
    if (!disease) {
        const fallback = manifest.find(d => d.slug === resolvedParams.slug);
        return { title: fallback ? `${fallback.name} (${fallback.code}) - Guía Médica` : 'Enfermedad no encontrada' };
    }

    return {
        title: `${disease.name} (${disease.cie10}) - Causas, Síntomas y Estudios | Laboratorio del Bienestar`,
        description: disease.shortDescription || `Guía clínica completa sobre ${disease.name}. Causas, señales de alarma, estudios de laboratorio recomendados. Código CIE-10: ${disease.cie10}.`,
        openGraph: {
            title: `${disease.name} - Guía Médica CIE-10`,
            description: `Todo sobre ${disease.name}: causas, diagnóstico y estudios recomendados.`
        }
    };
}

export default async function DiseasePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const disease = await loadDiseaseData(resolvedParams.slug);

    if (!disease) {
        // Try to show basic info from manifest
        const basic = manifest.find(d => d.slug === resolvedParams.slug);
        if (!basic) notFound();

        // Minimal page with just the name and code
        return (
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white pt-24 pb-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <nav className="flex items-center text-sm text-emerald-200 mb-6" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <Link href="/enfermedades" className="hover:text-white transition-colors">Enfermedades A-Z</Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-white font-medium">{basic.name}</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{basic.name}</h1>
                        <p className="text-xl text-emerald-100">Código CIE-10: <span className="font-bold text-white">{basic.code}</span></p>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
                        <p className="text-gray-600 text-lg mb-6">La guía clínica detallada para esta enfermedad está siendo generada por nuestro equipo médico.</p>
                        <Link href="/enfermedades" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                            ← Regresar al Directorio
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    <nav className="flex items-center text-sm text-emerald-200 mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/enfermedades" className="hover:text-white transition-colors">Enfermedades A-Z</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">{disease.name}</span>
                    </nav>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{disease.name}</h1>
                    <p className="text-xl text-emerald-100 font-light mb-2">
                        Código CIE-10: <span className="font-semibold text-white">{disease.cie10}</span>
                        {disease.category && <span className="ml-3 text-emerald-300">| Capítulo: {disease.category}</span>}
                    </p>
                    {disease.shortDescription && (
                        <p className="text-lg text-emerald-200 font-light max-w-3xl">{disease.shortDescription}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm font-medium bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20 mt-4">
                        <span className="flex items-center justify-center bg-emerald-500 w-2 h-2 rounded-full"></span>
                        Revisión Médica | Tiempo de lectura: 3 min
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8 lg:p-12">

                        {/* Intro */}
                        <section className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
                            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3">
                                {disease.intro}
                            </p>
                        </section>

                        <div className="mb-10">
                            <AdBanner variant="horizontal" />
                        </div>

                        {/* Google AdSense — In-Article Ad */}
                        <GoogleAd slot="1234567890" format="fluid" layout="in-article" />

                        {/* Causes */}
                        {disease.causes && disease.causes.length > 0 && (
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <Stethoscope className="w-8 h-8 text-emerald-700" />
                                    <h2 className="text-3xl font-bold text-gray-900">Causas Principales</h2>
                                </div>
                                <div className="space-y-4">
                                    {disease.causes.map((cause: any, idx: number) => (
                                        <div key={idx} className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                                            <p className="text-gray-700 leading-relaxed">
                                                <span className="font-bold text-emerald-800 mr-2">{idx + 1}.</span>
                                                {typeof cause === 'string' ? cause : cause.desc || cause.name || 'Causa por determinar'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Symptoms */}
                        {disease.symptoms && disease.symptoms.length > 0 && (
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <Hospital className="w-8 h-8 text-blue-700" />
                                    <h2 className="text-3xl font-bold text-gray-900">Síntomas Característicos</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {disease.symptoms.map((sym: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
                                            <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">{sym}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Red Flags */}
                        {disease.redFlags && disease.redFlags.length > 0 && (
                            <section className="mb-12">
                                <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-8 shadow-inner">
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertTriangle className="w-8 h-8 text-rose-600" />
                                        <h2 className="text-2xl font-bold text-rose-900">🚨 Señales de Alarma — Acuda a Urgencias</h2>
                                    </div>
                                    <ul className="space-y-3">
                                        {disease.redFlags.map((flag: string, idx: number) => (
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

                        {/* Lab Tests CTA */}
                        <section className="mb-12">
                            <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold mb-4">Estudios de Laboratorio Recomendados</h2>
                                        <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
                                            Para diagnosticar correctamente este padecimiento, los médicos suelen solicitar los siguientes estudios clínicos:
                                        </p>
                                        <ul className="space-y-3 mb-2">
                                            {disease.tests && disease.tests.map((t: any, idx: number) => (
                                                <li key={idx}>
                                                    <Link href="/estudios" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                        <TestTube className="w-5 h-5 text-teal-300" />
                                                        <span className="font-medium text-white">{typeof t === 'string' ? t : t.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                            {(!disease.tests || disease.tests.length === 0) && (
                                                <li>
                                                    <Link href="/estudios" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                                        <TestTube className="w-5 h-5 text-teal-300" />
                                                        <span className="font-medium text-white">Consultar estudios disponibles</span>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                                        <a href={`https://wa.me/527716854026?text=${encodeURIComponent(`Hola, me diagnosticaron ${disease.name} y quisiera cotizar los estudios recomendados`)}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-3">
                                            Cotizar de Inmediato <ArrowRight className="w-6 h-6" />
                                        </a>
                                        <p className="text-emerald-200 text-sm mt-4 text-center">Respuesta en 2 minutos (WhatsApp)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Related Symptoms */}
                        {disease.relatedSymptoms && disease.relatedSymptoms.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Síntomas Relacionados</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {disease.relatedSymptoms.map((sym: any, idx: number) => (
                                        <Link key={idx} href={`/sintomas/${typeof sym === 'string' ? sym : sym.slug}`}
                                            className="p-4 rounded-2xl border-2 border-dashed border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-between group">
                                            <span className="font-semibold text-emerald-900">{typeof sym === 'string' ? sym : sym.name}</span>
                                            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
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
                    <p className="mb-2">⚠️ <strong>Descargo de responsabilidad médica:</strong></p>
                    <p>
                        El contenido aquí presentado es estrictamente informativo y educacional. No sustituye el diagnóstico médico profesional.
                        Si experimenta síntomas graves o señales de alarma descritas, acuda de inmediato a urgencias o marque al 911 en México.
                    </p>
                </div>
            </div>
        </main>
    );
}
