import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUp, ArrowDown, Beaker, ArrowRight, TestTube, ShieldCheck, Star } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// fs and path are used only at build time via dynamic require()
import rawManifest from '@/data/biomarkers.json';
import { checkUpPackages, type CheckUpPackage } from '@/data/checkups-data';

// ═══════════════════════════════════════════════════════════════
// MOTOR DE VENTA CRUZADA: Mapea el "panel" del biomarcador al CheckUp ideal
// ═══════════════════════════════════════════════════════════════
function getRecommendedCheckUps(panel: string, biomarkerName: string): CheckUpPackage[] {
    const p = (panel || '').toLowerCase();
    const n = (biomarkerName || '').toLowerCase();
    const ids: string[] = [];

    // Endocrinología Femenina
    if (p.includes('hormonal femenin') || n.includes('estradiol') || n.includes('fsh') || n.includes('lh') || n.includes('progesterona') || n.includes('prolactina') || p.includes('ginecolog'))
        ids.push('mujer-integral');
    // Endocrinología Masculina
    if (n.includes('testosterona') || n.includes('psa') || n.includes('prostát') || n.includes('prostat') || p.includes('hormonal masculin'))
        ids.push('hombre-plus');
    // Tiroides
    if (p.includes('tiroide') || n.includes('tsh') || n.includes('t3') || n.includes('t4') || n.includes('tiroglobulina'))
        ids.push('mujer-integral', 'ejecutivo');
    // Diabetes / Glucosa
    if (n.includes('glucosa') || n.includes('hba1c') || n.includes('hemoglobina glucosilada') || n.includes('insulina') || p.includes('diabetes'))
        ids.push('diabetes', 'ejecutivo');
    // Lípidos / Cardiovascular
    if (p.includes('lípido') || p.includes('lipido') || n.includes('colesterol') || n.includes('triglicérid') || n.includes('triglicerid') || n.includes('hdl') || n.includes('ldl') || n.includes('vldl'))
        ids.push('corazon', 'ejecutivo');
    // Hematología
    if (p.includes('biometr') || p.includes('hematolog') || n.includes('hemoglobina') || n.includes('hematocrit') || n.includes('leucocit') || n.includes('plaqueta') || n.includes('eritrocit'))
        ids.push('basico', 'deportista');
    // Hepático
    if (p.includes('hepátic') || p.includes('hepatic') || n.includes('alt') || n.includes('ast') || n.includes('bilirrubina') || n.includes('albúmina') || n.includes('albumina') || n.includes('ggt'))
        ids.push('ejecutivo');
    // Renal
    if (n.includes('creatinina') || n.includes('urea') || n.includes('bun') || n.includes('ácido úrico') || n.includes('acido urico') || p.includes('renal'))
        ids.push('ejecutivo', 'senior-60');
    // Vitaminas
    if (n.includes('vitamina') || n.includes('ferritina') || n.includes('hierro') || n.includes('folato') || n.includes('ácido fólico'))
        ids.push('deportista', 'senior-60');
    // Oncología
    if (p.includes('oncolog') || n.includes('ca 125') || n.includes('ca125') || n.includes('ca 19') || n.includes('cea') || n.includes('afp'))
        ids.push('mujer-integral', 'ejecutivo');
    // Inflamación
    if (n.includes('pcr') || n.includes('proteína c reactiva') || n.includes('velocidad de sedimentación') || n.includes('vsg'))
        ids.push('corazon', 'senior-60');

    // Fallback: si no matchea nada, recomendar Básico y Ejecutivo
    if (ids.length === 0) ids.push('basico', 'ejecutivo');

    // Deduplicate y buscar en catálogo real
    const unique = [...new Set(ids)];
    return unique
        .map(id => checkUpPackages.find(c => c.id === id))
        .filter((c): c is CheckUpPackage => !!c)
        .slice(0, 2); // Máximo 2 recomendaciones
}

const manifest: any[] = Array.isArray(rawManifest) ? rawManifest : [];

function loadBiomarkerData(slug: string): any | null {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const fs = require('fs') as typeof import('fs');
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const path = require('path') as typeof import('path');
        const candidates = [
            path.join(process.cwd(), 'src', 'data', 'biomarkers-fragments', `${slug}.json`),
            path.join(process.cwd(), '..', 'src', 'data', 'biomarkers-fragments', `${slug}.json`),
        ];
        for (const p of candidates) {
            try {
                if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
            } catch { /* try next */ }
        }
    } catch { /* fs not available in edge runtime */ }
    return null;
}

export async function generateStaticParams() {
    return manifest.map((bm) => ({ slug: bm.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const bm = loadBiomarkerData(resolvedParams.slug);
    if (!bm) {
        const fallback = manifest.find(b => b.slug === resolvedParams.slug);
        return { title: fallback ? `${fallback.name} - Valores Normales` : 'Biomarcador no encontrado' };
    }

    return {
        title: `${bm.name} - Valores Normales, Altos y Bajos | Laboratorio del Bienestar`,
        description: `¿Qué es ${bm.name}? Conoce los rangos normales (${bm.rangeM} ${bm.unit}), qué significa tenerlo alto o bajo, y cuándo preocuparte. Guía médica completa.`,
        openGraph: {
            title: `${bm.name} - Rangos Normales y Significado Clínico`,
            description: `Todo sobre ${bm.name}: valores normales para hombres, mujeres y niños. Qué significa alto o bajo.`
        }
    };
}

export default async function BiomarkerPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const bm = loadBiomarkerData(resolvedParams.slug);

    if (!bm) notFound();

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    <nav className="flex items-center text-sm text-teal-200 mb-6 flex-wrap" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/valores" className="hover:text-white transition-colors">Valores de Referencia</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">{bm.name}</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-4 border border-white/20 text-sm">
                        <Beaker className="w-4 h-4 text-teal-300" />
                        <span>{bm.panel}</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{bm.name}</h1>
                    {bm.unit && (
                        <p className="text-xl text-teal-100 font-light mb-6">
                            Unidad de medida: <span className="font-semibold text-white">{bm.unit}</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Reference Ranges Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-5">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            📊 Rangos Normales de Referencia
                        </h2>
                    </div>
                    <div className="p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Male */}
                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                                <span className="text-4xl mb-3 block">👨</span>
                                <h3 className="font-bold text-blue-900 text-lg mb-2">Hombres</h3>
                                <p className="text-2xl font-mono font-bold text-blue-700">{bm.rangeM}</p>
                                {bm.unit && <p className="text-sm text-blue-500 mt-1">{bm.unit}</p>}
                            </div>
                            {/* Female */}
                            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 text-center">
                                <span className="text-4xl mb-3 block">👩</span>
                                <h3 className="font-bold text-pink-900 text-lg mb-2">Mujeres</h3>
                                <p className="text-2xl font-mono font-bold text-pink-700">{bm.rangeF}</p>
                                {bm.unit && <p className="text-sm text-pink-500 mt-1">{bm.unit}</p>}
                            </div>
                            {/* Kids */}
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-center">
                                <span className="text-4xl mb-3 block">👶</span>
                                <h3 className="font-bold text-amber-900 text-lg mb-2">Niños</h3>
                                <p className="text-2xl font-mono font-bold text-amber-700">{bm.rangeK}</p>
                                {bm.unit && <p className="text-sm text-amber-500 mt-1">{bm.unit}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intro / Explanation */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                    <div className="p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Beaker className="w-8 h-8 text-teal-600" />
                            ¿Qué es {bm.name}?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bm.intro || 'Contenido en proceso de generación.' }} />
                    </div>
                </div>

                <div className="mb-8">
                    <AdBanner variant="horizontal" />
                </div>

                {/* High Meaning */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 px-8 py-5">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ArrowUp className="w-6 h-6" /> ¿Qué significa {bm.name} ALTO?
                        </h2>
                    </div>
                    <div className="p-8 lg:p-12">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bm.highMeaning || 'Contenido en proceso de generación.' }} />
                    </div>
                </div>

                {/* ═══ MOTOR DE VENTA CRUZADA: CheckUp Recomendado ═══ */}
                {(() => {
                    const recommended = getRecommendedCheckUps(bm.panel, bm.name);
                    if (recommended.length === 0) return null;
                    return (
                        <div className="mb-8">
                            <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-emerald-700/30">
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-400 rounded-full blur-3xl" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldCheck className="w-7 h-7 text-emerald-300" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Recomendado para ti</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                                        ¿Necesitas evaluar tu {bm.name}?
                                    </h3>
                                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
                                        Estos paquetes de laboratorio incluyen el análisis de <strong className="text-white">{bm.name}</strong> junto con otros biomarcadores relacionados a un precio especial.
                                    </p>

                                    <div className={`grid grid-cols-1 ${recommended.length > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
                                        {recommended.map((pkg) => (
                                            <div key={pkg.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all group">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <span className="text-3xl mb-2 block">{pkg.icon}</span>
                                                        <h4 className="text-xl font-bold text-white">{pkg.name}</h4>
                                                        <p className="text-emerald-200 text-sm mt-1">{pkg.subtitle}</p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        {pkg.originalPrice && (
                                                            <p className="text-emerald-300/60 line-through text-sm">${pkg.originalPrice.toLocaleString()}</p>
                                                        )}
                                                        <p className="text-3xl font-black text-white">${pkg.price.toLocaleString()}</p>
                                                        {pkg.discount && (
                                                            <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                                                                -{pkg.discount}% OFF
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 mb-4">
                                                    <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-2">Incluye {pkg.studies.length} estudios:</p>
                                                    <ul className="space-y-1">
                                                        {pkg.studies.slice(0, 5).map((s, i) => (
                                                            <li key={i} className="text-emerald-100 text-sm flex items-center gap-2">
                                                                <Star className="w-3 h-3 text-yellow-400 shrink-0" />
                                                                {s.name}
                                                            </li>
                                                        ))}
                                                        {pkg.studies.length > 5 && (
                                                            <li className="text-emerald-300 text-xs font-medium mt-1">
                                                                + {pkg.studies.length - 5} estudios más
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>

                                                <a
                                                    href={`https://wa.me/527716854026?text=Hola,%20vi%20la%20página%20de%20${encodeURIComponent(bm.name)}%20y%20me%20interesa%20el%20${encodeURIComponent(pkg.name)}.%20¿Cuál%20es%20el%20proceso%20para%20agendarlo?`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all group-hover:-translate-y-0.5"
                                                >
                                                    Agendar {pkg.name} <ArrowRight className="w-5 h-5" />
                                                </a>
                                                <p className="text-center text-emerald-300 text-xs mt-2">Respuesta en 2 min · WhatsApp</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-center text-emerald-200/70 text-sm mt-6">
                                        <Link href="/check-ups" className="underline hover:text-white transition-colors">Ver todos los Check-Ups disponibles →</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Low Meaning */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-5">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ArrowDown className="w-6 h-6" /> ¿Qué significa {bm.name} BAJO?
                        </h2>
                    </div>
                    <div className="p-8 lg:p-12">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bm.lowMeaning || 'Contenido en proceso de generación.' }} />
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-teal-900 to-emerald-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4">¿Tus resultados de {bm.name} salieron fuera de rango?</h2>
                            <p className="text-teal-100 text-lg mb-6 leading-relaxed">
                                No te quedes con la duda. En <strong>Laboratorio del Bienestar</strong> puedes repetir tu estudio con resultados el mismo día y precios accesibles. Nuestros químicos revisan cada muestra personalmente.
                            </p>
                            <Link href={bm.relatedStudyUrl || "/estudios"} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/20">
                                <TestTube className="w-5 h-5 text-teal-300" />
                                <span className="font-medium text-white">Ver estudios relacionados</span>
                            </Link>
                        </div>
                        <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                            <a href="https://wa.me/527716854026?text=Hola,%20quisiera%20repetir%20mis%20análisis%20clínicos" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-3">
                                Cotizar Ahora <ArrowRight className="w-6 h-6" />
                            </a>
                            <p className="text-teal-200 text-sm mt-4 text-center">Respuesta en 2 minutos (WhatsApp)</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-sm text-gray-500 max-w-3xl mx-auto pb-10">
                    <p className="mb-2">⚠️ <strong>Información médica sobre {bm.name}:</strong></p>
                    <p>
                        Los valores de referencia y la información aquí presentada son orientativos. Cada laboratorio puede tener rangos ligeramente diferentes según su metodología. Los resultados deben ser interpretados siempre por un médico profesional en el contexto de su historial clínico completo.
                    </p>
                </div>
            </div>
        </main>
    );
}
