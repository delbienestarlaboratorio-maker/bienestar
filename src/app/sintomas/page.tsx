import React from 'react';
import { BookOpen } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { SymptomClientList } from './components/SymptomClientList';
import rawQuality from '@/data/symptoms.json';
import rawCIE10 from '@/data/todas-enfermedades-cie10.json';
import { Metadata } from 'next';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
    title: 'Directorio Médico A-Z | 14,000+ Enfermedades CIE-10 | Laboratorio del Bienestar',
    description: 'Consulta el directorio médico más completo de México con más de 14,000 enfermedades clasificadas por la OMS (CIE-10). Guías clínicas detalladas con causas, síntomas, señales de alarma y estudios recomendados.',
    openGraph: {
        title: 'Directorio Médico A-Z | 14,000+ Enfermedades CIE-10',
        description: 'El directorio médico más completo de México: 14,000+ enfermedades con código CIE-10 oficial de la OMS.',
    }
};

export default async function SintomasHub() {
    // Quality symptoms with full clinical data (links to individual pages)
    const qualitySymptoms = Array.isArray(rawQuality) ? [...rawQuality].sort((a, b) => a.name.localeCompare(b.name)) : [];

    // Full CIE-10 catalog for the directory (no individual pages, just reference)
    const cie10Catalog = Array.isArray(rawCIE10) ? rawCIE10 : [];

    // ═══ PERFORMANCE: Strip heavy fields from props to reduce RSC payload ═══
    // Quality: solo slug + name + medicalName + cie10 + intro corto (max 100 chars)
    const slimQuality = qualitySymptoms.map(s => ({
        slug: s.slug,
        name: s.name,
        medicalName: s.medicalName || undefined,
        cie10: s.cie10 || undefined,
        intro: s.intro ? String(s.intro).replace(/<[^>]*>/g, '').substring(0, 100) : undefined,
    }));

    // CIE-10: solo code + description (eliminar category para ahorrar ~30% payload)
    const slimCIE10 = cie10Catalog.map(e => ({
        code: e.code,
        description: e.description,
    }));

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white pt-24 pb-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                        <BookOpen className="w-5 h-5 text-blue-300" />
                        <span className="text-sm font-medium tracking-wide">Enciclopedia Médica Internacional</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Directorio Médico A-Z
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-4">
                        Más de <span className="font-bold text-white">14,000 enfermedades</span> catalogadas por la OMS con código CIE-10 oficial.
                    </p>
                    <p className="text-lg text-blue-200 font-light max-w-2xl mx-auto mb-12">
                        Guías clínicas detalladas con causas, señales de alarma roja y estudios de laboratorio recomendados.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-8">
                <SymptomClientList
                    qualitySymptoms={slimQuality}
                    cie10Catalog={slimCIE10}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8 relative z-20 mb-12">

                <RelatedTools currentPath="/sintomas" className="mb-8" />
                <AdBanner variant="horizontal" />
            </div>

            {/* Medical Disclaimer + SEO Text */}
            <div className="max-w-6xl mx-auto px-4 mt-12 space-y-8">
                {/* SEO Content Block */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Qué es la Clasificación CIE-10?</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        La <strong>Clasificación Internacional de Enfermedades (CIE-10)</strong> es el estándar mundial utilizado por la
                        <strong> Organización Mundial de la Salud (OMS)</strong> para codificar y clasificar diagnósticos médicos.
                        Cada código alfanumérico identifica de manera única una enfermedad, trastorno, lesión o causa de consulta médica.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Los médicos, hospitales, laboratorios clínicos y aseguradoras de todo México y el mundo utilizan estos códigos
                        para documentar diagnósticos, solicitar estudios de laboratorio, prescribir tratamientos y procesar reclamaciones.
                        En <strong>Laboratorio del Bienestar</strong>, utilizamos la clasificación CIE-10 para vincular cada padecimiento
                        con los estudios diagnósticos más pertinentes.
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">¿Cómo se organiza?</h3>
                    <p className="text-gray-600 leading-relaxed">
                        El catálogo está organizado en 22 capítulos principales, desde enfermedades infecciosas (Capítulo A-B)
                        hasta factores de salud preventiva (Capítulo Z). Cada capítulo se subdivide en bloques, categorías de 3 caracteres
                        y subcategorías de 4 caracteres, permitiendo una especificidad diagnóstica sin precedentes.
                        Nuestro directorio incluye <strong>más de 14,000 códigos diagnósticos</strong> disponibles para consulta inmediata.
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
