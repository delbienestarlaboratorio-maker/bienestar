import React from 'react';
import { BookOpen } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { Metadata } from 'next';
import Link from 'next/link';
import { loadJsonData } from '@/lib/build-time-data';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
    title: 'Enfermedades A-Z | 14,000+ Padecimientos CIE-10 | Laboratorio del Bienestar',
    description: 'Directorio completo de enfermedades con código CIE-10 oficial de la OMS. Guías clínicas con causas, síntomas, señales de alarma y estudios de laboratorio recomendados para cada padecimiento.',
    openGraph: {
        title: 'Enfermedades A-Z | 14,000+ Padecimientos CIE-10',
        description: 'El directorio de enfermedades más completo de México: 14,000+ padecimientos con código CIE-10, causas, y estudios recomendados.',
    }
};

// Group diseases by first letter
function groupByLetter(items: any[]) {
    const groups: Record<string, any[]> = {};
    items.forEach(item => {
        const letter = item.name.charAt(0).toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(item);
    });
    return groups;
}

export default async function EnfermedadesHub() {
    const rawDiseases = loadJsonData<any[]>('diseases.json');
    const diseases: any[] = Array.isArray(rawDiseases) ? rawDiseases : [];
    const grouped = groupByLetter(diseases);
    const letters = Object.keys(grouped).sort();

    // Only pass slim data for the client
    const slimDiseases = diseases.map(d => ({
        slug: d.slug,
        name: d.name,
        code: d.code,
    }));

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 text-white pt-24 pb-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                        <BookOpen className="w-5 h-5 text-emerald-300" />
                        <span className="text-sm font-medium tracking-wide">Enciclopedia de Enfermedades</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Enfermedades A-Z
                    </h1>

                    <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-3xl mx-auto mb-4">
                        Más de <span className="font-bold text-white">14,000 enfermedades</span> con código CIE-10 oficial de la OMS.
                    </p>
                    <p className="text-lg text-emerald-200 font-light max-w-2xl mx-auto mb-12">
                        Cada padecimiento incluye causas, señales de alarma, estudios de laboratorio recomendados y guía clínica completa.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-8">
                {/* Letter Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {letters.map(letter => (
                            <a key={letter} href={`#letter-${letter}`}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-600 hover:text-white transition-all text-sm">
                                {letter}
                            </a>
                        ))}
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-4">
                        {diseases.length.toLocaleString()} enfermedades catalogadas
                    </p>
                </div>

                {/* Disease listing by letter */}
                <div className="space-y-8">
                    {letters.map(letter => (
                        <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    {letter}
                                </div>
                                <span className="text-gray-400 text-sm font-medium">
                                    {grouped[letter].length} padecimiento{grouped[letter].length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
                                {grouped[letter].slice(0, 100).map((disease: any, idx: number) => (
                                    <Link key={idx} href={`/enfermedades/${disease.slug}`}
                                        className="flex items-center justify-between px-6 py-3 hover:bg-emerald-50 transition-colors group">
                                        <div>
                                            <span className="text-gray-900 font-medium group-hover:text-emerald-700 transition-colors">
                                                {disease.name}
                                            </span>
                                            <span className="ml-3 text-xs text-gray-400 font-mono">
                                                {disease.code}
                                            </span>
                                        </div>
                                        <span className="text-emerald-400 group-hover:text-emerald-600 text-sm">→</span>
                                    </Link>
                                ))}
                                {grouped[letter].length > 100 && (
                                    <div className="px-6 py-3 text-sm text-gray-400 text-center">
                                        ... y {grouped[letter].length - 100} más
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8 relative z-20 mb-12">
                <RelatedTools currentPath="/enfermedades" className="mb-8" />
                <AdBanner variant="horizontal" />
            </div>

            {/* SEO Content + Disclaimer */}
            <div className="max-w-6xl mx-auto px-4 mt-12 space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Directorio de Enfermedades CIE-10</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Nuestro directorio incluye más de <strong>14,000 enfermedades y padecimientos</strong> clasificados según el estándar
                        internacional CIE-10 de la <strong>Organización Mundial de la Salud (OMS)</strong>. Cada entrada incluye una descripción
                        clínica detallada, las causas más frecuentes en la población mexicana, señales de alarma roja que requieren atención
                        urgente, y los estudios de laboratorio recomendados para su diagnóstico.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        En <strong>Laboratorio del Bienestar</strong>, vinculamos cada enfermedad con los estudios diagnósticos pertinentes,
                        facilitando que los pacientes comprendan qué análisis necesitan y puedan cotizarlos directamente con nuestro equipo.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-3xl p-8 text-sm text-gray-600 text-center">
                    Directorio médico proporcionado por Laboratorio del Bienestar. Todo el contenido es orientativo y no sustituye la consulta médica profesional.
                    En caso de emergencia clínica, acuda al hospital más cercano inmediatamente.
                </div>
            </div>
        </main>
    );
}
