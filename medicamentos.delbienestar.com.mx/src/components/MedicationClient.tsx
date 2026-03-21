'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Pill, ArrowRight } from 'lucide-react';

function slugify(text: string): string {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// ─── Fuzzy Search Engine (Spanish-optimized) ──────────────────────
// 1. Strip accents: "ibuprofén" → "ibuprofen"
function normalize(text: string): string {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

// 2. Spanish phonetic key: collapse sounds that Spanish speakers confuse
function phoneticKey(text: string): string {
    let s = normalize(text);
    // b/v confusion
    s = s.replace(/v/g, 'b');
    // c/s/z seseo
    s = s.replace(/z/g, 's');
    s = s.replace(/ce/g, 'se');
    s = s.replace(/ci/g, 'si');
    // h is silent
    s = s.replace(/h/g, '');
    // ll/y confusion
    s = s.replace(/ll/g, 'y');
    // qu → k
    s = s.replace(/qu/g, 'k');
    s = s.replace(/ck/g, 'k');
    s = s.replace(/c(?=[aou])/g, 'k');
    // gu → g before e/i
    s = s.replace(/gu(?=[ei])/g, 'g');
    // x → ks or s
    s = s.replace(/x/g, 'ks');
    // double letters
    s = s.replace(/(.)\1+/g, '$1');
    // ph → f
    s = s.replace(/ph/g, 'f');
    // th → t
    s = s.replace(/th/g, 't');
    return s;
}

// 3. Trigram similarity (Dice coefficient) for typo tolerance
function trigrams(s: string): Set<string> {
    const padded = `  ${s} `;
    const set = new Set<string>();
    for (let i = 0; i < padded.length - 2; i++) {
        set.add(padded.substring(i, i + 3));
    }
    return set;
}

function similarity(a: string, b: string): number {
    const tA = trigrams(a);
    const tB = trigrams(b);
    let intersection = 0;
    tA.forEach(t => { if (tB.has(t)) intersection++; });
    return (2 * intersection) / (tA.size + tB.size);
}

// 4. Score a medication against the search term
function scoreMedication(med: { name: string; category: string; brands?: string[] }, termNorm: string, termPhonetic: string): number {
    const nameNorm = normalize(med.name);
    const namePhonetic = phoneticKey(med.name);

    // Exact substring match (highest priority)
    if (nameNorm.includes(termNorm)) return 100;

    // Brand exact match
    if (med.brands?.some(b => normalize(b).includes(termNorm))) return 95;

    // Category exact match
    if (normalize(med.category).includes(termNorm)) return 90;

    // Phonetic match (handles b/v, c/s/z, h-dropping, etc.)
    if (namePhonetic.includes(termPhonetic)) return 85;
    if (med.brands?.some(b => phoneticKey(b).includes(termPhonetic))) return 80;
    if (phoneticKey(med.category).includes(termPhonetic)) return 75;

    // Fuzzy trigram similarity (handles typos)
    const nameSim = similarity(termNorm, nameNorm);
    if (nameSim > 0.35) return Math.round(nameSim * 70);

    // Fuzzy on brands
    const bestBrandSim = Math.max(0, ...(med.brands?.map(b => similarity(termNorm, normalize(b))) ?? [0]));
    if (bestBrandSim > 0.35) return Math.round(bestBrandSim * 65);

    // Phonetic trigram similarity (double fuzzy)
    const phoneticSim = similarity(termPhonetic, namePhonetic);
    if (phoneticSim > 0.3) return Math.round(phoneticSim * 60);

    return 0;
}

type Medication = {
    name: string;
    category: string;
    brands?: string[];
};

export default function MedicationClient({ initialMedications }: { initialMedications: Medication[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Pre-compute phonetic index for fast lookups
    const medsIndex = useMemo(() => initialMedications.map(med => ({
        med,
        nameNorm: normalize(med.name),
        namePhonetic: phoneticKey(med.name),
    })), [initialMedications]);

    // Live fuzzy filter logic
    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) {
            return groupByCategory(initialMedications).slice(0, 10);
        }

        const termNorm = normalize(searchTerm);
        const termPhonetic = phoneticKey(searchTerm);

        // Score all medications
        const scored: { med: Medication; score: number }[] = [];
        for (const { med } of medsIndex) {
            const score = scoreMedication(med, termNorm, termPhonetic);
            if (score > 0) scored.push({ med, score });
        }

        // Sort by score descending
        scored.sort((a, b) => b.score - a.score);

        // Take top 200 results (performance guard)
        const topMeds = scored.slice(0, 200).map(s => s.med);

        return groupByCategory(topMeds);
    }, [searchTerm, initialMedications, medsIndex]);

    // Transform flat list to grouped array
    function groupByCategory(meds: Medication[]) {
        const map = new Map<string, Medication[]>();
        meds.forEach(med => {
            if (!map.has(med.category)) map.set(med.category, []);
            map.get(med.category)!.push(med);
        });
        return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
    }

    return (
        <>
            {/* Hero & Search Section */}
            <div className="bg-[#002855] text-white py-16 px-6 relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Encuentra tu Medicamento
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mb-10 leading-relaxed">
                        Explora nuestro catálogo completo de sustancias activas y marcas comerciales en México. Base de datos con {initialMedications.length} principios activos.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-4 md:text-lg border-transparent rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:border-transparent target-shadow shadow-xl transition-all"
                            placeholder="Buscar sustancia activa, marca o categoría (Ej. Paracetamol, Flanax)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {initialMedications.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-2xl flex items-center gap-4">
                        <Pill className="h-8 w-8 text-yellow-600 shrink-0" />
                        <p className="font-medium text-lg">Aún no se han indexado los medicamentos. La base de datos está vacía.</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="text-center py-20 px-4 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No encontramos resultados</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            No hay coincidencias para "{searchTerm}". Prueba buscando por otra marca, principio activo o síntoma.
                        </p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-green-600 font-bold hover:text-green-700 underline underline-offset-4"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Header info indicating if it's a filtered view or top 10 */}
                        {!searchTerm && (
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Categorías Principales</h2>
                                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Mostrando 10 de {groupByCategory(initialMedications).length}</span>
                            </div>
                        )}

                        {searchTerm && (
                            <div className="mb-8 pb-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Resultados para "{searchTerm}"</h2>
                                <p className="text-gray-500 mt-1">Se encontraron coincidencias en {filteredCategories.length} categorías.</p>
                            </div>
                        )}

                        {filteredCategories.map((category, idx) => {
                            // If searching, show all matches in the category. Otherwise, limit to 6 for UX
                            const limit = searchTerm ? category.items.length : 6;
                            const displayedItems = category.items.slice(0, limit);
                            const extraCount = category.items.length - limit;

                            return (
                                <section key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="bg-gradient-to-r from-blue-50 to-white px-8 py-5 border-b border-blue-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-[#002855]">{category.name}</h3>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 shrink-0">
                                            {category.items.length} medicamentos
                                        </span>
                                    </div>

                                    <div className="px-8 py-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {displayedItems.map((med, mIdx) => (
                                                <Link key={mIdx} href={`/medicamentos/${slugify(med.name)}`} className="group relative bg-gray-50/50 p-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:bg-green-50/30 transition-all cursor-pointer block">
                                                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ArrowRight className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                                            <Pill className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-bold text-gray-900 capitalize leading-tight group-hover:text-green-700 transition-colors pr-6">{med.name}</h4>
                                                        </div>
                                                    </div>

                                                    {med.brands && med.brands.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {med.brands.map((brand, bIdx) => (
                                                                <span key={bIdx} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm">
                                                                    {brand}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm italic text-gray-400">Sin marcas listadas</span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>

                                        {extraCount > 0 && (
                                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                                <button className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-6 py-2.5 rounded-full hover:bg-blue-100">
                                                    Explorar {extraCount} sustancias más en {category.name}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
