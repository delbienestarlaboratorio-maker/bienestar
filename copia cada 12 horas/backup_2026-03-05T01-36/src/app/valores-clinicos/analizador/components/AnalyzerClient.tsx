'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Trash2, Beaker, Sparkles, AlertCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Biomarker {
    slug: string;
    name: string;
    panel: string;
    unit: string;
    rangeM: string;
    rangeF: string;
    rangeK: string;
}

interface SelectedBiomarker extends Biomarker {
    userValue: string;
}

interface Props {
    availableBiomarkers: Biomarker[];
}

export function AnalyzerClient({ availableBiomarkers }: Props) {
    const [search, setSearch] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<SelectedBiomarker[]>([]);

    // AI State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter logic
    const filteredSearch = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return [];
        return availableBiomarkers
            .filter(b =>
                !selectedItems.some(s => s.slug === b.slug) &&
                (b.name.toLowerCase().includes(q) || b.panel.toLowerCase().includes(q))
            )
            .slice(0, 15); // Show top 15 results
    }, [search, availableBiomarkers, selectedItems]);

    // Actions
    const handleSelect = (bm: Biomarker) => {
        setSelectedItems(prev => [...prev, { ...bm, userValue: '' }]);
        setSearch('');
        setIsDropdownOpen(false);
    };

    const handleRemove = (slug: string) => {
        setSelectedItems(prev => prev.filter(i => i.slug !== slug));
    };

    const handleValueChange = (slug: string, val: string) => {
        // Allow numbers and decimal points
        if (!/^[0-9.]*$/.test(val)) return;
        setSelectedItems(prev => prev.map(i => i.slug === slug ? { ...i, userValue: val } : i));
    };

    const handleAnalyze = async () => {
        const incomplete = selectedItems.filter(i => !i.userValue.trim());
        if (incomplete.length > 0) {
            setError(`Por favor ingresa un valor numérico para: ${incomplete.map(i => i.name).join(', ')}`);
            return;
        }

        setError(null);
        setIsAnalyzing(true);
        setAnalysisResult(null);

        try {
            const bodyPayload = {
                biomarkers: selectedItems.map(item => ({
                    name: item.name,
                    value: item.userValue,
                    unit: item.unit,
                    referenceMale: item.rangeM,
                    referenceFemale: item.rangeF
                }))
            };

            const response = await fetch('/api/analyze-results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'Error al conectar con la IA de salud.');
            }

            const data = await response.json();
            setAnalysisResult(data.analysis);

            // Scroll to results smoothly
            setTimeout(() => {
                document.getElementById('analysis-result-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);

        } catch (err: any) {
            console.error("Analyze Error:", err);
            setError(err.message || 'Ocurrió un error inesperado al procesar tus resultados.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 -mt-20 relative z-20">
            {/* LEFT COLUMN: Input form */}
            <div className="flex-1 w-full max-w-2xl mx-auto space-y-6">

                {/* Search Box */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 relative" ref={searchRef}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Search className="text-teal-600" />
                        1. Selecciona tus biomarcadores
                    </h2>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ej. Glucosa, Creatinina, Colesterol..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="w-full pl-5 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none text-lg transition-all"
                        />

                        {/* Dropdown Results */}
                        {isDropdownOpen && search.trim().length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                                {filteredSearch.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">No se encontraron biomarcadores, intenta con otro nombre.</div>
                                ) : (
                                    <ul className="divide-y divide-gray-100">
                                        {filteredSearch.map(bm => (
                                            <li key={bm.slug}>
                                                <button
                                                    onClick={() => handleSelect(bm)}
                                                    className="w-full text-left px-5 py-3 hover:bg-teal-50 flex items-center justify-between transition-colors group"
                                                >
                                                    <div>
                                                        <span className="font-semibold text-gray-800 group-hover:text-teal-700">{bm.name}</span>
                                                        <span className="block text-xs text-gray-400">{bm.panel}</span>
                                                    </div>
                                                    <Plus className="text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Biomarkers List */}
                {selectedItems.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Beaker className="text-emerald-600" />
                            2. Ingresa tus resultados
                        </h2>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {selectedItems.map((item) => (
                                    <motion.div
                                        key={item.slug}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Normal (Hombre): {item.rangeM}</p>
                                        </div>

                                        <div className="relative w-32 shrink-0">
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={item.userValue}
                                                onChange={(e) => handleValueChange(item.slug, e.target.value)}
                                                placeholder="0.0"
                                                className="w-full pl-3 pr-12 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none text-xl font-mono text-center transition-all bg-white"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">
                                                {item.unit}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.slug)}
                                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {error && (
                            <div className="mt-6 flex items-start gap-2 text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || selectedItems.length === 0}
                            className="mt-8 w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Generando Análisis Médico...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    Analizar mis Resultados ({selectedItems.length})
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>

            {/* RIGHT COLUMN: Results View (Sticky) */}
            <div className="flex-1 w-full max-w-2xl mx-auto lg:sticky lg:top-24 h-fit">
                {analysisResult ? (
                    <motion.div
                        id="analysis-result-box"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-[#0a2f35] to-[#124b52] rounded-3xl p-[2px] shadow-2xl relative"
                    >
                        <div className="bg-white rounded-[22px] overflow-hidden h-full flex flex-col">
                            <div className="bg-teal-50 p-6 border-b border-teal-100 flex items-center gap-3">
                                <div className="bg-teal-600 text-white p-2 rounded-xl">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl">Interpretación de IA Completada</h3>
                                    <p className="text-sm text-teal-700">Analizado exitosamente según guías clínicas poblacionales.</p>
                                </div>
                            </div>

                            <div className="p-8 prose prose-teal max-w-none text-gray-700 h-[500px] overflow-y-auto">
                                <ReactMarkdown>{analysisResult}</ReactMarkdown>
                            </div>

                            <div className="bg-gray-50 p-6 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center mb-4">
                                    Esta es una interpretación automatizada y no sustituye una consulta médica. Si hay valores alterados, consulta a tu médico.
                                </p>
                                <a href="https://wa.me/527716854026?text=Hola,%20hice%20un%20análisis%20con%20su%20IA%20y%20quiero%20agendar%20una%20revisión." target="_blank" rel="noopener noreferrer" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Agendar con un Médico <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-[400px] lg:h-[600px] border-2 border-dashed border-teal-200/50 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-teal-50/30">
                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="w-10 h-10 text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Tu Análisis Aparecerá Aquí</h3>
                        <p className="text-gray-400 max-w-md">
                            Agrega los estudios de tu orden, escribe su resultado numérico exacto y presiona "Analizar".
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
