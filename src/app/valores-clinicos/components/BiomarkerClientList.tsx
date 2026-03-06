'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Beaker, ChevronDown, ChevronUp } from 'lucide-react';

interface Biomarker {
    slug: string;
    name: string;
    panel: string;
    unit: string;
    rangeM: string;
    rangeF: string;
    rangeK: string;
}

interface Props {
    biomarkers: Biomarker[];
}

const panelIcons: Record<string, string> = {
    'Biometría Hemática - Serie Roja': '🩸',
    'Biometría Hemática - Serie Blanca': '🦠',
    'Biometría Hemática - Plaquetas': '🔬',
    'Coagulación': '💉',
    'Química Sanguínea - Glucosa y Diabetes': '🍬',
    'Química Sanguínea - Función Renal': '💧',
    'Perfil de Lípidos': '❤️',
    'Perfil Hepático': '🫁',
    'Electrolitos y Minerales': '⚡',
    'Enzimas Cardíacas y Musculares': '💪',
    'EGO - Examen Físico-Químico': '🧪',
    'EGO - Sedimento Urinario': '🔬',
    'Perfil Tiroideo': '🦋',
    'Hormonas Reproductivas Femeninas': '♀️',
    'Hormonas Masculinas y Andrógenos': '♂️',
    'Hormonas Adrenales y Estrés': '😰',
    'Metabolismo Óseo': '🦴',
    'Marcadores de Inflamación': '🔥',
    'Inmunología y Reumatología': '🛡️',
    'Marcadores Tumorales': '🎗️',
    'Serología Infecciosa': '🧫',
    'Análisis de Heces (Coprológico)': '💩',
    'Toxicología y Antidoping': '☣️',
    'Vitaminas': '💊',
    'Gases Arteriales y Equilibrio Ácido-Base': '🫧',
};

const panelColors: Record<string, string> = {
    'Biometría Hemática - Serie Roja': 'from-red-500 to-red-600',
    'Biometría Hemática - Serie Blanca': 'from-blue-500 to-blue-600',
    'Biometría Hemática - Plaquetas': 'from-pink-500 to-pink-600',
    'Coagulación': 'from-rose-500 to-rose-600',
    'Química Sanguínea - Glucosa y Diabetes': 'from-amber-500 to-amber-600',
    'Química Sanguínea - Función Renal': 'from-teal-500 to-teal-600',
    'Perfil de Lípidos': 'from-red-600 to-red-700',
    'Perfil Hepático': 'from-orange-500 to-orange-600',
    'Electrolitos y Minerales': 'from-yellow-500 to-yellow-600',
    'Enzimas Cardíacas y Musculares': 'from-indigo-500 to-indigo-600',
    'EGO - Examen Físico-Químico': 'from-cyan-500 to-cyan-600',
    'EGO - Sedimento Urinario': 'from-sky-500 to-sky-600',
    'Perfil Tiroideo': 'from-purple-500 to-purple-600',
    'Hormonas Reproductivas Femeninas': 'from-pink-400 to-pink-500',
    'Hormonas Masculinas y Andrógenos': 'from-blue-600 to-blue-700',
    'Hormonas Adrenales y Estrés': 'from-violet-500 to-violet-600',
    'Metabolismo Óseo': 'from-stone-500 to-stone-600',
    'Marcadores de Inflamación': 'from-orange-600 to-red-600',
    'Inmunología y Reumatología': 'from-emerald-500 to-emerald-600',
    'Marcadores Tumorales': 'from-purple-600 to-purple-700',
    'Serología Infecciosa': 'from-lime-500 to-lime-600',
    'Análisis de Heces (Coprológico)': 'from-amber-600 to-amber-700',
    'Toxicología y Antidoping': 'from-gray-600 to-gray-700',
    'Vitaminas': 'from-green-500 to-green-600',
    'Gases Arteriales y Equilibrio Ácido-Base': 'from-sky-600 to-sky-700',
};

export function BiomarkerClientList({ biomarkers }: Props) {
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState<'panels' | 'az'>('panels');
    const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

    // Filter by search
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return biomarkers;
        return biomarkers.filter(b =>
            b.name.toLowerCase().includes(q) ||
            b.panel.toLowerCase().includes(q) ||
            b.unit.toLowerCase().includes(q)
        );
    }, [biomarkers, search]);

    // Group by panel
    const groupedByPanel = useMemo(() => {
        const groups: Record<string, Biomarker[]> = {};
        for (const b of filtered) {
            if (!groups[b.panel]) groups[b.panel] = [];
            groups[b.panel].push(b);
        }
        return groups;
    }, [filtered]);

    // Group A-Z 
    const groupedAZ = useMemo(() => {
        const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        const groups: Record<string, Biomarker[]> = {};
        for (const b of sorted) {
            const letter = b.name[0].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(b);
        }
        return groups;
    }, [filtered]);

    return (
        <div>
            {/* Search Bar */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar biomarcador... (ej. Hemoglobina, Glucosa, Nitritos)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none text-lg transition-all"
                    />
                </div>

                {/* View Toggle */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setViewMode('panels')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${viewMode === 'panels' ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        🧪 Por Panel Clínico
                    </button>
                    <button
                        onClick={() => setViewMode('az')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${viewMode === 'az' ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        🔤 Orden A-Z
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-3">
                    {filtered.length} biomarcadores encontrados de {biomarkers.length} totales
                </p>
            </div>

            {/* PANEL VIEW */}
            {viewMode === 'panels' && (
                <div className="space-y-4">
                    {Object.entries(groupedByPanel).map(([panel, items]) => (
                        <div key={panel} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setExpandedPanel(expandedPanel === panel ? null : panel)}
                                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{panelIcons[panel] || '🧬'}</span>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-900">{panel}</h3>
                                        <p className="text-sm text-gray-500">{items.length} parámetros</p>
                                    </div>
                                </div>
                                {expandedPanel === panel ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>

                            {expandedPanel === panel && (
                                <div className="border-t border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                        {items.map((bm) => (
                                            <Link
                                                key={bm.slug}
                                                href={`/valores/${bm.slug}`}
                                                className="flex items-center justify-between p-4 hover:bg-teal-50 transition-colors border-b border-gray-50 group"
                                            >
                                                <div>
                                                    <span className="font-semibold text-gray-800 group-hover:text-teal-700">{bm.name}</span>
                                                    {bm.unit && <span className="text-xs text-gray-400 ml-2">({bm.unit})</span>}
                                                </div>
                                                <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-mono shrink-0">{bm.rangeM}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* A-Z VIEW */}
            {viewMode === 'az' && (
                <div className="space-y-6">
                    {/* Letter quick nav */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {Object.keys(groupedAZ).sort().map(letter => (
                            <a key={letter} href={`#letter-${letter}`} className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold text-sm hover:bg-teal-600 hover:text-white transition-colors">
                                {letter}
                            </a>
                        ))}
                    </div>

                    {Object.entries(groupedAZ).sort(([a], [b]) => a.localeCompare(b)).map(([letter, items]) => (
                        <div key={letter} id={`letter-${letter}`} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3">
                                <h3 className="text-2xl font-extrabold text-white">{letter}</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {items.map(bm => (
                                    <Link
                                        key={bm.slug}
                                        href={`/valores/${bm.slug}`}
                                        className="flex items-center justify-between p-4 hover:bg-teal-50 transition-colors group"
                                    >
                                        <div>
                                            <span className="font-semibold text-gray-800 group-hover:text-teal-700">{bm.name}</span>
                                            <span className="text-xs text-gray-400 ml-2 block sm:inline">📋 {bm.panel}</span>
                                        </div>
                                        <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-mono shrink-0">{bm.rangeM}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
