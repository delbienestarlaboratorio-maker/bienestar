import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
    Pill, ArrowLeft, Building2, FlaskConical, Stethoscope, AlertTriangle,
    Package, Phone, Shield, Activity, Baby, Heart, Syringe, BookOpen,
    Clock, Beaker, FileWarning, Thermometer, Eye, ChevronRight, Info, Sparkles,
    Zap, HeartPulse, TestTubes, Calculator, ExternalLink, ArrowUpRight, HelpCircle
} from 'lucide-react';
import type { Metadata } from 'next';

/* ─── Types ──────────────────────────────────────────── */
type Medication = {
    name: string; category: string; categoryId?: string;
    brands?: string[]; source?: string; fdaPharmClasses?: string[];
};
type MedDetail = {
    name: string; summary?: string;
    pharmacology?: {
        mechanismOfAction?: string; pharmacologicClass?: string; therapeuticClass?: string;
        absorption?: string; distribution?: string; metabolism?: string;
        elimination?: string; onsetOfAction?: string; durationOfAction?: string;
    };
    indications?: { approved?: string[]; offLabel?: string[] };
    dosage?: {
        adults?: string; pediatric?: string; elderly?: string;
        renalImpairment?: string; hepaticImpairment?: string; maxDose?: string;
    };
    dosageForms?: { form: string; strengths: string[]; route: string }[];
    contraindications?: { absolute?: string[]; relative?: string[] };
    sideEffects?: {
        veryCommon?: string[]; common?: string[]; uncommon?: string[];
        rare?: string[]; blackBoxWarning?: string | null;
    };
    interactions?: {
        major?: { drug: string; effect: string; severity: string }[];
        withFood?: string; withSupplements?: string;
    };
    specialPopulations?: {
        pregnancy?: { category?: string; recommendation?: string; crossesPlacenta?: boolean };
        breastfeeding?: string; pediatric?: string; geriatric?: string;
    };
    administration?: { howToTake?: string; storage?: string; specialInstructions?: string };
    monitoring?: { labTests?: string[]; frequency?: string; signsToWatch?: string[] };
    overdose?: { symptoms?: string[]; treatment?: string; antidote?: string };
    regulatoryStatus?: { otcOrRx?: string; scheduleMexico?: string; fdaApprovalYear?: string };
    brandsMexico?: string[];
    clinicalPearls?: string[];
    patientCounseling?: string;
    crossLinks?: {
        symptomsTreated?: { name: string; slug: string }[];
        diseasesTreated?: { name: string; slug: string }[];
        diseasesRisk?: { name: string; slug: string }[];
        biomarkersAffected?: { name: string; slug: string; effect: string }[];
        recommendedStudies?: { name: string; slug: string; reason: string }[];
        relatedCalculators?: { name: string; slug: string }[];
    };
    faq?: { q: string; a: string }[];
};

const BASE_URL = 'https://laboratorio.delbienestar.com.mx';

/* ─── Data Loading ───────────────────────────────────── */
function getAllMedications(): Medication[] {
    try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'medication-master-list.json'), 'utf8')); }
    catch { return []; }
}
function slugify(t: string) { return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function findMedication(slug: string) { return getAllMedications().find(m => slugify(m.name) === slug); }
function getRelatedMedications(med: Medication) { return getAllMedications().filter(m => m.category === med.category && m.name !== med.name).slice(0, 6); }

function loadDetail(slug: string): MedDetail | null {
    const detailPath = path.join(process.cwd(), 'scripts', 'medication-details', `${slug}.json`);
    try {
        const raw = JSON.parse(fs.readFileSync(detailPath, 'utf8'));
        return sanitizeDetail(raw);
    } catch { return null; }
}

/* ─── Safety: ensure all array fields are actually arrays ─── */
function safeArr<T>(v: unknown): T[] { return Array.isArray(v) ? v : []; }
function sanitizeDetail(d: MedDetail): MedDetail {
    if (d.indications) {
        d.indications.approved = safeArr(d.indications.approved);
        d.indications.offLabel = safeArr(d.indications.offLabel);
    }
    if (d.dosageForms) d.dosageForms = safeArr(d.dosageForms);
    if (d.contraindications) {
        d.contraindications.absolute = safeArr(d.contraindications.absolute);
        d.contraindications.relative = safeArr(d.contraindications.relative);
    }
    if (d.sideEffects) {
        d.sideEffects.veryCommon = safeArr(d.sideEffects.veryCommon);
        d.sideEffects.common = safeArr(d.sideEffects.common);
        d.sideEffects.uncommon = safeArr(d.sideEffects.uncommon);
        d.sideEffects.rare = safeArr(d.sideEffects.rare);
    }
    if (d.interactions) d.interactions.major = safeArr(d.interactions.major);
    if (d.monitoring) {
        d.monitoring.labTests = safeArr(d.monitoring.labTests);
        d.monitoring.signsToWatch = safeArr(d.monitoring.signsToWatch);
    }
    if (d.overdose) d.overdose.symptoms = safeArr(d.overdose.symptoms);
    d.brandsMexico = safeArr(d.brandsMexico);
    d.clinicalPearls = safeArr(d.clinicalPearls);
    d.faq = safeArr(d.faq);
    if (d.crossLinks) {
        d.crossLinks.symptomsTreated = safeArr(d.crossLinks.symptomsTreated);
        d.crossLinks.diseasesTreated = safeArr(d.crossLinks.diseasesTreated);
        d.crossLinks.diseasesRisk = safeArr(d.crossLinks.diseasesRisk);
        d.crossLinks.biomarkersAffected = safeArr(d.crossLinks.biomarkersAffected);
        d.crossLinks.recommendedStudies = safeArr(d.crossLinks.recommendedStudies);
        d.crossLinks.relatedCalculators = safeArr(d.crossLinks.relatedCalculators);
    }
    return d;
}

/* ─── SSG ────────────────────────────────────────────── */
export const dynamicParams = false;
export async function generateStaticParams() {
    // Generate pages for all medications that have detail JSON files
    const detailsDir = path.join(process.cwd(), 'scripts', 'medication-details');
    try {
        const files = fs.readdirSync(detailsDir).filter(f => f.endsWith('.json'));
        return files.map(f => ({ slug: f.replace('.json', '') }));
    } catch {
        return [{ slug: 'ibuprofeno' }];
    }
}

/* ─── SEO ────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const med = findMedication(slug);
    const detail = loadDetail(slug);
    if (!med) return { title: 'Medicamento no encontrado' };
    const brandText = med.brands?.length ? ` (${med.brands.slice(0, 3).join(', ')})` : '';
    return {
        title: `${med.name}${brandText} — Para qué sirve, Dosis, Efectos Secundarios`,
        description: detail?.summary || `Información completa sobre ${med.name}. Categoría: ${med.category}.`,
        openGraph: { title: `${med.name} — Guía Completa del Medicamento`, type: 'article' },
    };
}

/* ─── Reusable Components ────────────────────────────── */
function Section({ icon: Icon, title, color, id, children }: { icon: React.ComponentType<{ className?: string }>; title: string; color: string; id?: string; children: React.ReactNode }) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600', purple: 'bg-purple-100 text-purple-600',
        green: 'bg-green-100 text-green-600', red: 'bg-red-100 text-red-600',
        amber: 'bg-amber-100 text-amber-600', cyan: 'bg-cyan-100 text-cyan-600',
        pink: 'bg-pink-100 text-pink-600', indigo: 'bg-indigo-100 text-indigo-600',
        teal: 'bg-teal-100 text-teal-600', orange: 'bg-orange-100 text-orange-600',
    };
    return (
        <div id={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl ${colors[color] || colors.blue} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function Bullet({ items, color = 'blue' }: { items: string[]; color?: string }) {
    const dotColors: Record<string, string> = { blue: 'bg-blue-400', red: 'bg-red-400', amber: 'bg-amber-500', green: 'bg-green-400', purple: 'bg-purple-400' };
    return <ul className="space-y-2">{items.map((it, i) => (
        <li key={i} className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full ${dotColors[color] || dotColors.blue} mt-2 shrink-0`}></div><span className="text-sm text-gray-700 leading-relaxed">{it}</span></li>
    ))}</ul>;
}

/* ─── Page Component ─────────────────────────────────── */
export default async function MedicationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const med = findMedication(slug);
    if (!med) return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle className="h-10 w-10 text-red-500" /></div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Medicamento no encontrado</h1>
                <p className="text-gray-500 mb-8">No pudimos encontrar &ldquo;{slug}&rdquo;.</p>
                <Link href="/" className="inline-flex items-center gap-2 text-white bg-[#002855] px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors"><ArrowLeft className="h-5 w-5" />Volver al catálogo</Link>
            </div>
        </main>
    );

    const detail = loadDetail(slug);
    const related = getRelatedMedications(med);
    const d = detail; // shorthand
    const ph = d?.pharmacology;

    return (
        <>
            <main className="min-h-screen bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
                {/* ── Hero ──────────────────────────────── */}
                <div className="bg-gradient-to-br from-[#002855] to-blue-900 text-white pt-24 pb-16 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 rounded-full bg-green-500/10 blur-3xl pointer-events-none"></div>
                    <div className="max-w-5xl mx-auto relative z-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 text-sm font-medium transition-colors group">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Volver al catálogo
                        </Link>
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0"><Pill className="h-7 w-7 text-green-400" /></div>
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight capitalize">{med.name}</h1>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur text-blue-100"><FlaskConical className="h-3.5 w-3.5" />{med.category}</span>
                                    {med.source === 'FDA-NDC' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200">✓ Registrado FDA</span>}
                                    {d?.regulatoryStatus?.otcOrRx && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200">{d.regulatoryStatus.otcOrRx}</span>}
                                </div>
                            </div>
                        </div>
                        {d?.summary && <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">{d.summary}</p>}
                    </div>
                </div>

                {/* ── Quick Nav (Table of Contents) ───────── */}
                {d && (
                    <div className="sticky top-[64px] z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
                        <div className="max-w-5xl mx-auto px-6">
                            <nav className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                                {ph && <a href="#farmacologia" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors">🧬 Farmacología</a>}
                                {d.indications && <a href="#indicaciones" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 transition-colors">🩺 Indicaciones</a>}
                                {d.dosage && <a href="#dosis" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition-colors">💊 Dosis</a>}
                                {d.contraindications && <a href="#contraindicaciones" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors">🚫 Contraindicaciones</a>}
                                {d.sideEffects && <a href="#efectos" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">⚡ Efectos</a>}
                                {d.interactions && <a href="#interacciones" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors">⚠️ Interacciones</a>}
                                {d.specialPopulations && <a href="#poblaciones" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 transition-colors">👶 Poblaciones</a>}
                                {d.monitoring && <a href="#monitoreo" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors">🔬 Monitoreo</a>}
                                {d.overdose && <a href="#sobredosis" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors">🆘 Sobredosis</a>}
                                {d.crossLinks && <span className="shrink-0 w-px h-5 bg-gray-300"></span>}
                                {d.crossLinks?.symptomsTreated && <a href="#sintomas" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors">🩺 Síntomas</a>}
                                {d.crossLinks?.diseasesTreated && <a href="#enfermedades" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">🏥 Enfermedades</a>}
                                {d.crossLinks?.biomarkersAffected && <a href="#biomarcadores" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors">🔬 Biomarcadores</a>}
                                {d.crossLinks?.recommendedStudies && <a href="#estudios" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-lime-700 bg-lime-50 hover:bg-lime-100 transition-colors">🧪 Estudios</a>}
                                {d.faq && d.faq.length > 0 && <a href="#faq" className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors">❓ FAQ</a>}
                            </nav>
                        </div>
                    </div>
                )}

                {/* ── Content ───────────────────────────── */}
                <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 pb-20" style={{ scrollBehavior: 'smooth' }}>

                    {/* Black Box Warning */}
                    {d?.sideEffects?.blackBoxWarning && (
                        <div className="bg-black text-white rounded-2xl p-6 mb-6 border-2 border-yellow-500 shadow-lg">
                            <div className="flex gap-4">
                                <FileWarning className="h-8 w-8 text-yellow-400 shrink-0" />
                                <div>
                                    <h2 className="font-black text-yellow-400 text-lg mb-2">⚠️ ADVERTENCIA DE CAJA NEGRA (FDA)</h2>
                                    <p className="text-gray-200 text-sm leading-relaxed">{d.sideEffects.blackBoxWarning.replace('⚠️ ADVERTENCIA FDA: ', '')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* ── Main (2 cols) ────────────── */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Pharmacology */}
                            {ph && (
                                <Section icon={Beaker} title="Farmacología" color="purple" id="farmacologia">
                                    {ph.mechanismOfAction && <><h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">Mecanismo de Acción</h3><p className="text-sm text-gray-700 leading-relaxed mb-4">{ph.mechanismOfAction}</p></>}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {ph.pharmacologicClass && <div className="p-3 bg-purple-50 rounded-xl"><p className="text-xs text-purple-600 font-semibold uppercase">Clase Farmacológica</p><p className="text-sm text-gray-800 font-medium mt-1">{ph.pharmacologicClass}</p></div>}
                                        {ph.therapeuticClass && <div className="p-3 bg-purple-50 rounded-xl"><p className="text-xs text-purple-600 font-semibold uppercase">Clase Terapéutica</p><p className="text-sm text-gray-800 font-medium mt-1">{ph.therapeuticClass}</p></div>}
                                        {ph.onsetOfAction && <div className="p-3 bg-blue-50 rounded-xl"><p className="text-xs text-blue-600 font-semibold uppercase">Inicio de Acción</p><p className="text-sm text-gray-800 mt-1">{ph.onsetOfAction}</p></div>}
                                        {ph.durationOfAction && <div className="p-3 bg-blue-50 rounded-xl"><p className="text-xs text-blue-600 font-semibold uppercase">Duración del Efecto</p><p className="text-sm text-gray-800 mt-1">{ph.durationOfAction}</p></div>}
                                    </div>
                                    {(ph.absorption || ph.distribution || ph.metabolism || ph.elimination) && (
                                        <details className="mt-4 group">
                                            <summary className="cursor-pointer text-sm font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"><ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />Farmacocinética detallada (ADME)</summary>
                                            <div className="mt-3 space-y-3 pl-5 border-l-2 border-purple-200">
                                                {ph.absorption && <div><p className="text-xs font-bold text-gray-500 uppercase">Absorción</p><p className="text-sm text-gray-700">{ph.absorption}</p></div>}
                                                {ph.distribution && <div><p className="text-xs font-bold text-gray-500 uppercase">Distribución</p><p className="text-sm text-gray-700">{ph.distribution}</p></div>}
                                                {ph.metabolism && <div><p className="text-xs font-bold text-gray-500 uppercase">Metabolismo</p><p className="text-sm text-gray-700">{ph.metabolism}</p></div>}
                                                {ph.elimination && <div><p className="text-xs font-bold text-gray-500 uppercase">Eliminación</p><p className="text-sm text-gray-700">{ph.elimination}</p></div>}
                                            </div>
                                        </details>
                                    )}
                                </Section>
                            )}

                            {/* Indications */}
                            {d?.indications && (
                                <Section icon={Stethoscope} title="¿Para Qué Sirve?" color="green" id="indicaciones">
                                    {d.indications.approved && <><h3 className="text-sm font-bold text-green-700 mb-2">Indicaciones Aprobadas</h3><Bullet items={d.indications.approved} color="green" /></>}
                                    {d.indications.offLabel && d.indications.offLabel.length > 0 && (
                                        <details className="mt-4 group"><summary className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1"><ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />Usos Off-Label (fuera de indicación)</summary>
                                            <div className="mt-2 pl-5"><Bullet items={d.indications.offLabel} color="purple" /></div>
                                        </details>
                                    )}
                                </Section>
                            )}

                            {/* Dosage */}
                            {d?.dosage && (
                                <Section icon={Syringe} title="Dosis y Administración" color="cyan" id="dosis">
                                    <div className="space-y-3">
                                        {d.dosage.adults && <div className="p-3 bg-cyan-50 rounded-xl"><p className="text-xs font-bold text-cyan-700 uppercase">Adultos</p><p className="text-sm text-gray-700 mt-1">{d.dosage.adults}</p></div>}
                                        {d.dosage.pediatric && <div className="p-3 bg-pink-50 rounded-xl"><p className="text-xs font-bold text-pink-700 uppercase">Pediátrico</p><p className="text-sm text-gray-700 mt-1">{d.dosage.pediatric}</p></div>}
                                        {d.dosage.elderly && <div className="p-3 bg-amber-50 rounded-xl"><p className="text-xs font-bold text-amber-700 uppercase">Adultos Mayores</p><p className="text-sm text-gray-700 mt-1">{d.dosage.elderly}</p></div>}
                                        {d.dosage.maxDose && <div className="p-3 bg-red-50 rounded-xl border border-red-100"><p className="text-xs font-bold text-red-700 uppercase">Dosis Máxima</p><p className="text-sm text-gray-700 mt-1 font-medium">{d.dosage.maxDose}</p></div>}
                                    </div>
                                    {(d.dosage.renalImpairment || d.dosage.hepaticImpairment) && (
                                        <details className="mt-4 group"><summary className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1"><ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />Ajustes en insuficiencia renal/hepática</summary>
                                            <div className="mt-3 space-y-3 pl-5 border-l-2 border-cyan-200">
                                                {d.dosage.renalImpairment && <div><p className="text-xs font-bold text-gray-500 uppercase">Insuficiencia Renal</p><p className="text-sm text-gray-700">{d.dosage.renalImpairment}</p></div>}
                                                {d.dosage.hepaticImpairment && <div><p className="text-xs font-bold text-gray-500 uppercase">Insuficiencia Hepática</p><p className="text-sm text-gray-700">{d.dosage.hepaticImpairment}</p></div>}
                                            </div>
                                        </details>
                                    )}
                                    {d.dosageForms && d.dosageForms.length > 0 && (
                                        <div className="mt-5"><h3 className="text-sm font-bold text-gray-700 mb-3">Presentaciones Disponibles</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{d.dosageForms.map((df, i) => (
                                                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100"><p className="font-semibold text-sm text-gray-800">{df.form}</p><p className="text-xs text-gray-500 mt-1">Vía: {df.route}</p><div className="flex flex-wrap gap-1 mt-2">{df.strengths.map((s, j) => <span key={j} className="text-xs px-2 py-0.5 bg-white border rounded-md text-gray-600">{s}</span>)}</div></div>
                                            ))}</div>
                                        </div>
                                    )}
                                </Section>
                            )}

                            {/* Contraindications */}
                            {d?.contraindications && (
                                <Section icon={Shield} title="Contraindicaciones" color="red" id="contraindicaciones">
                                    {d.contraindications.absolute && <><h3 className="text-sm font-bold text-red-700 mb-2">🚫 Absolutas (NUNCA usar)</h3><Bullet items={d.contraindications.absolute} color="red" /></>}
                                    {d.contraindications.relative && <><h3 className="text-sm font-bold text-amber-700 mt-4 mb-2">⚡ Relativas (usar con precaución)</h3><Bullet items={d.contraindications.relative} color="amber" /></>}
                                </Section>
                            )}

                            {/* Side Effects */}
                            {d?.sideEffects && (
                                <Section icon={Activity} title="Efectos Secundarios" color="amber" id="efectos">
                                    {d.sideEffects.veryCommon && <><h3 className="text-sm font-bold text-red-600 mb-2">Muy Frecuentes (&gt;10%)</h3><Bullet items={d.sideEffects.veryCommon} color="red" /></>}
                                    {d.sideEffects.common && <><h3 className="text-sm font-bold text-amber-600 mt-4 mb-2">Frecuentes (1-10%)</h3><Bullet items={d.sideEffects.common} color="amber" /></>}
                                    {(d.sideEffects.uncommon || d.sideEffects.rare) && (
                                        <details className="mt-4 group"><summary className="cursor-pointer text-sm font-semibold text-gray-500 flex items-center gap-1"><ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />Poco frecuentes y raros</summary>
                                            <div className="mt-3 space-y-3">
                                                {d.sideEffects.uncommon && <><h4 className="text-xs font-bold text-gray-500 uppercase">Poco frecuentes (0.1-1%)</h4><Bullet items={d.sideEffects.uncommon} color="blue" /></>}
                                                {d.sideEffects.rare && <><h4 className="text-xs font-bold text-gray-500 uppercase mt-3">Raros (&lt;0.1%) — Graves</h4><Bullet items={d.sideEffects.rare} color="red" /></>}
                                            </div>
                                        </details>
                                    )}
                                </Section>
                            )}

                            {/* Interactions */}
                            {d?.interactions && (
                                <Section icon={AlertTriangle} title="Interacciones" color="orange" id="interacciones">
                                    {d.interactions.major && d.interactions.major.map((int, i) => (
                                        <div key={i} className={`p-4 rounded-xl mb-3 ${int.severity === 'Grave' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                                            <div className="flex items-center gap-2 mb-1"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${int.severity === 'Grave' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'}`}>{int.severity}</span><p className="font-bold text-sm text-gray-900">{int.drug}</p></div>
                                            <p className="text-sm text-gray-700 ml-0">{int.effect}</p>
                                        </div>
                                    ))}
                                    {d.interactions.withFood && <div className="mt-3 p-3 bg-green-50 rounded-xl"><p className="text-xs font-bold text-green-700 uppercase mb-1">Con Alimentos y Alcohol</p><p className="text-sm text-gray-700">{d.interactions.withFood}</p></div>}
                                    {d.interactions.withSupplements && <div className="mt-2 p-3 bg-indigo-50 rounded-xl"><p className="text-xs font-bold text-indigo-700 uppercase mb-1">Con Suplementos Naturales</p><p className="text-sm text-gray-700">{d.interactions.withSupplements}</p></div>}
                                </Section>
                            )}

                            {/* Special Populations */}
                            {d?.specialPopulations && (
                                <Section icon={Baby} title="Poblaciones Especiales" color="pink" id="poblaciones">
                                    <div className="space-y-4">
                                        {d.specialPopulations.pregnancy && (
                                            <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                                                <h3 className="font-bold text-sm text-pink-800 flex items-center gap-2">🤰 Embarazo {d.specialPopulations.pregnancy.category && <span className="text-xs px-2 py-0.5 bg-pink-200 rounded-full">{d.specialPopulations.pregnancy.category}</span>}</h3>
                                                <p className="text-sm text-gray-700 mt-2">{d.specialPopulations.pregnancy.recommendation}</p>
                                                {d.specialPopulations.pregnancy.crossesPlacenta && <p className="text-xs text-pink-600 mt-1 font-medium">⚠ Cruza la barrera placentaria</p>}
                                            </div>
                                        )}
                                        {d.specialPopulations.breastfeeding && <div className="p-4 bg-purple-50 rounded-xl"><h3 className="font-bold text-sm text-purple-800">🤱 Lactancia</h3><p className="text-sm text-gray-700 mt-2">{d.specialPopulations.breastfeeding}</p></div>}
                                        {d.specialPopulations.pediatric && <div className="p-4 bg-blue-50 rounded-xl"><h3 className="font-bold text-sm text-blue-800">👶 Pediatría</h3><p className="text-sm text-gray-700 mt-2">{d.specialPopulations.pediatric}</p></div>}
                                        {d.specialPopulations.geriatric && <div className="p-4 bg-amber-50 rounded-xl"><h3 className="font-bold text-sm text-amber-800">👴 Adultos Mayores</h3><p className="text-sm text-gray-700 mt-2">{d.specialPopulations.geriatric}</p></div>}
                                    </div>
                                </Section>
                            )}

                            {/* Monitoring */}
                            {d?.monitoring && (
                                <Section icon={Eye} title="Monitoreo Durante el Tratamiento" color="teal" id="monitoreo">
                                    {d.monitoring.labTests && <><h3 className="text-sm font-bold text-teal-700 mb-2">Estudios de Laboratorio Recomendados</h3><Bullet items={d.monitoring.labTests} color="blue" /></>}
                                    {d.monitoring.frequency && <p className="text-sm text-gray-600 mt-3 italic">📅 {d.monitoring.frequency}</p>}
                                    {d.monitoring.signsToWatch && <><h3 className="text-sm font-bold text-red-600 mt-4 mb-2">🚨 Signos de Alarma (acudir al médico de inmediato)</h3><Bullet items={d.monitoring.signsToWatch} color="red" /></>}
                                </Section>
                            )}

                            {/* Overdose */}
                            {d?.overdose && (
                                <Section icon={Thermometer} title="Sobredosis" color="red" id="sobredosis">
                                    {d.overdose.symptoms && <><h3 className="text-sm font-bold text-gray-700 mb-2">Síntomas de Sobredosis</h3><Bullet items={d.overdose.symptoms} color="red" /></>}
                                    {d.overdose.treatment && <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200"><h3 className="text-sm font-bold text-red-800 mb-1">Tratamiento</h3><p className="text-sm text-gray-700">{d.overdose.treatment}</p></div>}
                                    {d.overdose.antidote && <p className="mt-2 text-sm font-semibold text-gray-700">💊 Antídoto: {d.overdose.antidote}</p>}
                                </Section>
                            )}

                            {/* Clinical Pearls */}
                            {d?.clinicalPearls && d.clinicalPearls.length > 0 && (
                                <Section icon={Sparkles} title="Datos Interesantes" color="indigo">
                                    <div className="space-y-3">{d.clinicalPearls.map((pearl, i) => (
                                        <div key={i} className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex gap-3">
                                            <span className="text-indigo-500 font-bold text-lg shrink-0">💡</span>
                                            <p className="text-sm text-gray-700 leading-relaxed">{pearl}</p>
                                        </div>
                                    ))}</div>
                                </Section>
                            )}

                            {/* ═══════ CROSS-LINKS ═══════ */}

                            {/* Symptoms Treated */}
                            {d?.crossLinks?.symptomsTreated && d.crossLinks.symptomsTreated.length > 0 && (
                                <div id="sintomas" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center"><Zap className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Síntomas que Trata</h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Este medicamento se usa para aliviar los siguientes síntomas. Haz clic para más información:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {d.crossLinks.symptomsTreated.map((s, i) => (
                                            <a key={i} href={`${BASE_URL}/sintomas/${s.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl bg-violet-50/50 border border-violet-100 hover:border-violet-300 hover:bg-violet-50 hover:shadow-sm transition-all">
                                                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors"><HeartPulse className="h-4 w-4" /></div>
                                                <span className="text-sm font-medium text-gray-800 group-hover:text-violet-700 transition-colors flex-1">{s.name}</span>
                                                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-violet-500 transition-colors shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Diseases Treated + Risk */}
                            {d?.crossLinks && (d.crossLinks.diseasesTreated || d.crossLinks.diseasesRisk) && (
                                <div id="enfermedades" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Stethoscope className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Enfermedades Relacionadas</h2>
                                    </div>
                                    {d.crossLinks.diseasesTreated && d.crossLinks.diseasesTreated.length > 0 && (
                                        <div className="mb-5">
                                            <h3 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">✅ Enfermedades que TRATA</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {d.crossLinks.diseasesTreated.map((dis, i) => (
                                                    <a key={i} href={`${BASE_URL}/enfermedades/${dis.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                                                        <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors flex-1">{dis.name}</span>
                                                        <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {d.crossLinks.diseasesRisk && d.crossLinks.diseasesRisk.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">⚠️ Enfermedades que PUEDE CAUSAR</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {d.crossLinks.diseasesRisk.map((dis, i) => (
                                                    <a key={i} href={`${BASE_URL}/enfermedades/${dis.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-300 hover:shadow-sm transition-all">
                                                        <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                                                        <span className="text-sm font-medium text-gray-800 group-hover:text-red-700 transition-colors flex-1">{dis.name}</span>
                                                        <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-500 transition-colors shrink-0" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Biomarkers Affected */}
                            {d?.crossLinks?.biomarkersAffected && d.crossLinks.biomarkersAffected.length > 0 && (
                                <div id="biomarcadores" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center"><TestTubes className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Impacto en Biomarcadores</h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Este medicamento puede alterar los siguientes valores en tus análisis de laboratorio:</p>
                                    <div className="space-y-2">
                                        {d.crossLinks.biomarkersAffected.map((bio, i) => (
                                            <a key={i} href={`${BASE_URL}/biomarcadores/${bio.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl bg-sky-50/50 border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all">
                                                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-200 transition-colors"><Beaker className="h-5 w-5" /></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">{bio.name}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{bio.effect}</p>
                                                </div>
                                                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-sky-500 transition-colors shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommended Lab Studies */}
                            {d?.crossLinks?.recommendedStudies && d.crossLinks.recommendedStudies.length > 0 && (
                                <div id="estudios" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-600 flex items-center justify-center"><FlaskConical className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Estudios de Laboratorio Recomendados</h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Si tomas este medicamento de forma prolongada, estos estudios te ayudarán a vigilar tu salud:</p>
                                    <div className="space-y-3">
                                        {d.crossLinks.recommendedStudies.map((study, i) => (
                                            <a key={i} href={`${BASE_URL}/estudios/${study.slug}`} target="_blank" rel="noopener noreferrer" className="group block p-4 rounded-xl bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 hover:border-lime-400 hover:shadow-md transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-lime-200 text-lime-700 flex items-center justify-center shrink-0 group-hover:bg-lime-300 transition-colors"><FlaskConical className="h-4 w-4" /></div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-gray-900 group-hover:text-lime-800 transition-colors">{study.name}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{study.reason}</p>
                                                    </div>
                                                    <span className="text-xs font-semibold text-lime-600 bg-lime-100 px-2.5 py-1 rounded-full group-hover:bg-lime-200 transition-colors shrink-0">Ver estudio →</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Calculators */}
                            {d?.crossLinks?.relatedCalculators && d.crossLinks.relatedCalculators.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center"><Calculator className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Herramientas Relacionadas</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {d.crossLinks.relatedCalculators.map((calc, i) => (
                                            <a key={i} href={`${BASE_URL}/herramientas/${calc.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-fuchsia-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50 transition-all">
                                                <div className="w-10 h-10 rounded-lg bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-200 transition-colors"><Calculator className="h-5 w-5" /></div>
                                                <span className="text-sm font-bold text-gray-800 group-hover:text-fuchsia-700 transition-colors flex-1">{calc.name}</span>
                                                <span className="text-xs font-semibold text-fuchsia-600 bg-fuchsia-100 px-2.5 py-1 rounded-full group-hover:bg-fuchsia-200 transition-colors shrink-0">Usar →</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Patient Counseling */}
                            {d?.patientCounseling && (
                                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white">
                                    <div className="flex items-center gap-3 mb-4"><Heart className="h-6 w-6" /><h2 className="text-xl font-bold">Lo Que Tu Farmacéutico Te Diría</h2></div>
                                    <p className="text-green-50 leading-relaxed">{d.patientCounseling}</p>
                                </div>
                            )}

                            {/* FAQ Section */}
                            {d?.faq && d.faq.length > 0 && (
                                <div id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center"><HelpCircle className="h-5 w-5" /></div>
                                        <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-5 ml-[52px]">Las {d.faq.length} dudas más comunes sobre {med.name}, respondidas en lenguaje simple.</p>
                                    <div className="space-y-2">
                                        {d.faq.map((item, i) => (
                                            <details key={i} className="group border border-gray-100 rounded-xl hover:border-rose-200 transition-colors">
                                                <summary className="cursor-pointer flex items-center gap-3 p-4 text-sm font-semibold text-gray-800 hover:text-rose-700 transition-colors">
                                                    <span className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 text-xs font-bold group-open:bg-rose-500 group-open:text-white transition-colors">{i + 1}</span>
                                                    <span className="flex-1">{item.q}</span>
                                                    <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                                                </summary>
                                                <div className="px-4 pb-4 pl-14">
                                                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── Sidebar ─────────────────── */}
                        <div className="space-y-6">
                            {/* Brands */}
                            {(d?.brandsMexico || med.brands) && (
                                <Section icon={Building2} title="Marcas en México" color="blue">
                                    <div className="flex flex-wrap gap-2">{(d?.brandsMexico || med.brands || []).map((b, i) => (
                                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border border-blue-100 shadow-sm">{b}</span>
                                    ))}</div>
                                </Section>
                            )}

                            {/* Administration */}
                            {d?.administration && (
                                <Section icon={BookOpen} title="Cómo Tomarlo" color="green">
                                    {d.administration.howToTake && <p className="text-sm text-gray-700 leading-relaxed mb-3">{d.administration.howToTake}</p>}
                                    {d.administration.storage && <div className="p-3 bg-gray-50 rounded-xl mt-2"><p className="text-xs font-bold text-gray-500 uppercase">Almacenamiento</p><p className="text-sm text-gray-700 mt-1">{d.administration.storage}</p></div>}
                                    {d.administration.specialInstructions && <div className="p-3 bg-amber-50 rounded-xl mt-2"><p className="text-xs font-bold text-amber-700 uppercase">Instrucciones Especiales</p><p className="text-sm text-gray-700 mt-1">{d.administration.specialInstructions}</p></div>}
                                </Section>
                            )}

                            {/* Quick Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Datos Rápidos</h3>
                                <dl className="space-y-3">
                                    <div><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Principio Activo</dt><dd className="text-sm font-semibold text-gray-900 capitalize mt-0.5">{med.name}</dd></div>
                                    <div className="border-t border-gray-100 pt-3"><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</dt><dd className="text-sm font-semibold text-gray-900 mt-0.5">{med.category}</dd></div>
                                    {d?.regulatoryStatus?.otcOrRx && <div className="border-t border-gray-100 pt-3"><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Venta</dt><dd className="text-sm font-semibold text-gray-900 mt-0.5">{d.regulatoryStatus.otcOrRx}</dd></div>}
                                    {d?.regulatoryStatus?.scheduleMexico && <div className="border-t border-gray-100 pt-3"><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">COFEPRIS</dt><dd className="text-sm font-semibold text-gray-900 mt-0.5">{d.regulatoryStatus.scheduleMexico}</dd></div>}
                                    {d?.regulatoryStatus?.fdaApprovalYear && <div className="border-t border-gray-100 pt-3"><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Aprobación FDA</dt><dd className="text-sm font-semibold text-gray-900 mt-0.5">{d.regulatoryStatus.fdaApprovalYear}</dd></div>}
                                    <div className="border-t border-gray-100 pt-3"><dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fuente</dt><dd className="text-sm font-semibold text-gray-900 mt-0.5">{med.source === 'FDA-NDC' ? 'FDA (EE.UU.)' : 'Base curada'}</dd></div>
                                </dl>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center gap-3 mb-4"><Package className="h-6 w-6" /><h3 className="font-bold text-lg">¿Necesitas este medicamento?</h3></div>
                                <p className="text-green-100 text-sm mb-5">Contáctanos por WhatsApp para cotización y disponibilidad.</p>
                                <a href={`https://wa.me/528000000000?text=${encodeURIComponent(`Hola, me interesa información sobre ${med.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-white text-green-700 font-bold py-3 px-4 rounded-xl hover:bg-green-50 transition-colors"><Phone className="h-5 w-5" />Consultar por WhatsApp</a>
                            </div>

                            {/* Legal notice */}
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                                <div className="flex gap-3"><Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" /><p className="text-xs text-amber-800 leading-relaxed"><strong>Aviso:</strong> Esta información es de referencia. Consulte a un profesional de la salud antes de iniciar o modificar cualquier tratamiento.</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Otros medicamentos en <span className="text-blue-600">{med.category}</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{related.map((rel, i) => (
                                <Link key={i} href={`/medicamentos/${slugify(rel.name)}`} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><Pill className="h-4 w-4" /></div><h3 className="font-bold text-gray-900 capitalize group-hover:text-green-700 transition-colors text-sm leading-tight">{rel.name}</h3></div>
                                    {rel.brands && rel.brands.length > 0 && <div className="flex flex-wrap gap-1.5">{rel.brands.slice(0, 3).map((b, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">{b}</span>)}</div>}
                                </Link>
                            ))}</div>
                        </section>
                    )}
                </div>
            </main>

            {/* JSON-LD FAQPage Schema */}
            {d?.faq && d.faq.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: d.faq.map(item => ({
                                '@type': 'Question',
                                name: item.q,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: item.a,
                                },
                            })),
                        }),
                    }}
                />
            )}
        </>
    );
}
