import React from 'react';
import { BookOpen } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { SymptomClientList } from './components/SymptomClientList';
import rawSymptoms from '@/data/symptoms.json';

// This is a Server Component. 
export default async function SintomasHub() {
    let symptoms = Array.isArray(rawSymptoms) ? [...rawSymptoms] : [];

    // Sort alphabetically
    symptoms.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white pt-24 pb-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                        <BookOpen className="w-5 h-5 text-blue-300" />
                        <span className="text-sm font-medium tracking-wide">Enciclopedia Médica de Síntomas</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Directorio de Síntomas A-Z
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-12">
                        Investigación clínica sobre el origen, las señales de alarma roja y los estudios de laboratorio necesarios para interpretar lo que tu cuerpo intenta decirte.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-8">
                <SymptomClientList initialSymptoms={symptoms} />
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8 relative z-20 mb-12">
                <AdBanner variant="horizontal" />
            </div>

            {/* Medical Disclaimer Container */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="bg-gray-100 rounded-3xl p-8 text-sm text-gray-600 text-center">
                    Glosario médico autorizado por Chispito.mx Laboratorio México. Todo el contenido redactado es orientativo.
                    En caso de emergencia clínica (Red Flags presentadas en los artículos) debe presentarse en el hospital civil o particular más cercano inmediatamente.
                </div>
            </div>
        </main>
    );
}
