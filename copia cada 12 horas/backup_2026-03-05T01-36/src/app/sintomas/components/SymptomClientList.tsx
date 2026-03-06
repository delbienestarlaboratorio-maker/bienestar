"use client"
import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';

// Map CIE-10 letter codes to specialty info
const specialtyIcons: Record<string, { name: string, color: string, icon: string }> = {
    'A': { name: 'Infecciosas', color: 'bg-red-500', icon: '🦠' },
    'B': { name: 'Parasitarias', color: 'bg-red-400', icon: '🔬' },
    'C': { name: 'Oncología', color: 'bg-purple-600', icon: '🎗️' },
    'D': { name: 'Hematología', color: 'bg-rose-500', icon: '🩸' },
    'E': { name: 'Endocrinología', color: 'bg-amber-500', icon: '⚗️' },
    'F': { name: 'Psiquiatría', color: 'bg-violet-500', icon: '🧠' },
    'G': { name: 'Neurología', color: 'bg-indigo-500', icon: '🧬' },
    'H': { name: 'Ojos y Oídos', color: 'bg-cyan-500', icon: '👁️' },
    'I': { name: 'Cardiología', color: 'bg-red-600', icon: '❤️' },
    'J': { name: 'Neumología', color: 'bg-sky-500', icon: '🫁' },
    'K': { name: 'Gastroenterología', color: 'bg-orange-500', icon: '🏥' },
    'L': { name: 'Dermatología', color: 'bg-pink-400', icon: '🧴' },
    'M': { name: 'Reumatología', color: 'bg-blue-600', icon: '🦴' },
    'N': { name: 'Nefrología', color: 'bg-teal-500', icon: '💧' },
    'O': { name: 'Obstetricia', color: 'bg-pink-500', icon: '🤰' },
    'P': { name: 'Neonatología', color: 'bg-yellow-500', icon: '👶' },
    'Q': { name: 'Genética', color: 'bg-emerald-500', icon: '🧬' },
    'R': { name: 'Síntomas Generales', color: 'bg-gray-500', icon: '🩺' },
    'S': { name: 'Traumatología', color: 'bg-stone-500', icon: '🦽' },
    'T': { name: 'Toxicología', color: 'bg-lime-600', icon: '☣️' },
    'V': { name: 'Causas Externas', color: 'bg-slate-500', icon: '⚠️' },
    'W': { name: 'Causas Externas', color: 'bg-slate-400', icon: '⚠️' },
    'X': { name: 'Causas Externas', color: 'bg-slate-600', icon: '⚠️' },
    'Y': { name: 'Complicaciones', color: 'bg-stone-600', icon: '🏨' },
    'Z': { name: 'Preventiva', color: 'bg-green-500', icon: '✅' },
};

interface QualitySymptom {
    slug: string;
    name: string;
    medicalName?: string;
    cie10?: string;
    intro?: string;
}

interface CIE10Entry {
    code: string;
    description: string;
    category?: string;
}

interface Props {
    qualitySymptoms: QualitySymptom[];
    cie10Catalog: CIE10Entry[];
}

export function SymptomClientList({ qualitySymptoms, cie10Catalog }: Props) {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'quality' | 'directory'>('quality');
    const [expandedLetter, setExpandedLetter] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const switchTab = (tab: 'quality' | 'directory') => {
        setActiveTab(tab);
        // Always scroll to content area so the user sees the list
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    // ── Quality symptoms grouped by first letter ──
    const groupedQuality = useMemo(() => {
        const q = search.toLowerCase();
        const filtered = qualitySymptoms.filter(s =>
            !q ||
            s.name.toLowerCase().includes(q) ||
            s.medicalName?.toLowerCase().includes(q) ||
            s.cie10?.toLowerCase().includes(q)
        );

        const groups: Record<string, QualitySymptom[]> = {};
        for (const s of filtered) {
            // Normalize first letter (remove accents: Á→A, É→E, etc.)
            const firstLetter = s.name
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .charAt(0)
                .toUpperCase();
            if (!groups[firstLetter]) groups[firstLetter] = [];
            groups[firstLetter].push(s);
        }
        return groups;
    }, [qualitySymptoms, search]);

    const qualityLetters = Object.keys(groupedQuality).sort();
    const totalQualityFiltered = qualityLetters.reduce((sum, l) => sum + groupedQuality[l].length, 0);

    // ── CIE-10 grouped by first letter ──
    const groupedCIE10 = useMemo(() => {
        const groups: Record<string, CIE10Entry[]> = {};
        const q = search.toLowerCase();
        for (const entry of cie10Catalog) {
            if (q && !entry.description.toLowerCase().includes(q) && !entry.code.toLowerCase().includes(q)) continue;
            const letter = entry.code.charAt(0);
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(entry);
        }
        return groups;
    }, [cie10Catalog, search]);

    const cie10Letters = Object.keys(groupedCIE10).sort();
    const totalCIE10 = cie10Letters.reduce((sum, l) => sum + groupedCIE10[l].length, 0);

    return (
        <div>
            {/* Search Bar */}
            <div className="relative mb-8 max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                    type="text"
                    placeholder="Buscar entre 14,000+ enfermedades (ej. Diabetes, Hipertensión, Lupus...)"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-transparent bg-white shadow-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 text-lg transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Stats Bar — clickeable para cambiar de tab */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                    onClick={() => switchTab('quality')}
                    className={`rounded-2xl shadow-sm border px-6 py-3 flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'quality'
                        ? 'bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-lg scale-105'
                        : 'bg-white border-gray-100 hover:border-blue-300 hover:bg-blue-50 text-gray-800'
                        }`}
                >
                    <Stethoscope className={`w-5 h-5 ${activeTab === 'quality' ? 'text-white' : 'text-blue-600'}`} />
                    <span className="text-sm font-bold">{qualitySymptoms.length} Guías Médicas Detalladas</span>
                </button>
                <button
                    onClick={() => switchTab('directory')}
                    className={`rounded-2xl shadow-sm border px-6 py-3 flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'directory'
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 shadow-lg scale-105'
                        : 'bg-white border-gray-100 hover:border-emerald-300 hover:bg-emerald-50 text-gray-800'
                        }`}
                >
                    <BookOpen className={`w-5 h-5 ${activeTab === 'directory' ? 'text-white' : 'text-emerald-600'}`} />
                    <span className="text-sm font-bold">{cie10Catalog.length.toLocaleString()} Enfermedades CIE-10</span>
                </button>
            </div>

            {/* Content anchor for scroll */}
            <div ref={contentRef} className="scroll-mt-24" />

            {/* ═══ QUALITY SYMPTOMS — A-Z ═══ */}
            {activeTab === 'quality' && (
                <>
                    {totalQualityFiltered === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No encontramos ningún síntoma con esa palabra. Prueba en el Directorio CIE-10.
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {/* Alphabet quick-jump bar */}
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {qualityLetters.map(letter => (
                                    <a
                                        key={letter}
                                        href={`#letra-${letter}`}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-extrabold hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        {letter}
                                    </a>
                                ))}
                            </div>

                            {/* Grouped sections */}
                            {qualityLetters.map(letter => (
                                <section key={letter} id={`letra-${letter}`} className="scroll-mt-28">
                                    {/* Letter divider */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg flex-shrink-0">
                                            {letter}
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
                                        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                            {groupedQuality[letter].length} {groupedQuality[letter].length === 1 ? 'padecimiento' : 'padecimientos'}
                                        </span>
                                    </div>

                                    {/* Cards grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {groupedQuality[letter].map((s, i) => (
                                            <Link
                                                key={i}
                                                href={`/sintomas/${s.slug}`}
                                                className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 p-6 flex flex-col group transition-all"
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-base font-bold text-blue-900 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                                                        {s.name}
                                                    </h3>
                                                    {s.cie10 && (
                                                        <span className="text-xs font-mono bg-blue-50 text-blue-500 px-2 py-0.5 rounded-md flex-shrink-0">
                                                            {s.cie10}
                                                        </span>
                                                    )}
                                                </div>
                                                {s.intro && (
                                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1 mb-3">
                                                        {s.intro}
                                                    </p>
                                                )}
                                                <span className="text-xs font-bold text-blue-500 group-hover:gap-2 flex items-center gap-1 transition-all mt-auto">
                                                    Ver guía completa →
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* ═══ CIE-10 DIRECTORY ═══ */}
            {activeTab === 'directory' && (
                <div className="space-y-4">
                    {/* Letter Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {cie10Letters.map(letter => {
                            const info = specialtyIcons[letter] || specialtyIcons['R'];
                            return (
                                <button
                                    key={letter}
                                    onClick={() => setExpandedLetter(expandedLetter === letter ? null : letter)}
                                    className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${expandedLetter === letter
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                                        }`}
                                    title={info.name}
                                >
                                    {info.icon} {letter} <span className="text-xs opacity-70">({groupedCIE10[letter]?.length})</span>
                                </button>
                            );
                        })}
                    </div>

                    {cie10Letters.map(letter => {
                        const diseases = groupedCIE10[letter] || [];
                        const info = specialtyIcons[letter] || specialtyIcons['R'];
                        const isExpanded = expandedLetter === letter || (search.length > 2);
                        if (!isExpanded) return null;

                        return (
                            <div key={letter} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setExpandedLetter(expandedLetter === letter ? null : letter)}
                                    className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-white transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`${info.color} text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-extrabold`}>
                                            {letter}
                                        </span>
                                        <div className="text-left">
                                            <h3 className="font-bold text-gray-800">{info.icon} {info.name}</h3>
                                            <p className="text-xs text-gray-500">{diseases.length} condiciones médicas registradas</p>
                                        </div>
                                    </div>
                                    {expandedLetter === letter ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>

                                <div className="px-6 pb-4 max-h-96 overflow-y-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        {diseases.map((d, idx) => (
                                            <div key={idx} className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group">
                                                <code className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded flex-shrink-0 mt-0.5 group-hover:bg-blue-100 group-hover:text-blue-700">
                                                    {d.code}
                                                </code>
                                                <span className="text-sm text-gray-700 group-hover:text-blue-900 leading-snug">
                                                    {d.description}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {!expandedLetter && !search && (
                        <div className="text-center py-8 text-gray-500">
                            <p className="mb-2">Selecciona una letra arriba para explorar las {cie10Catalog.length.toLocaleString()} enfermedades.</p>
                            <p className="text-sm">O escribe en el buscador para filtrar por nombre o código.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
