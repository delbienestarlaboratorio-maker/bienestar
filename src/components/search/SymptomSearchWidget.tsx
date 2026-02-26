'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Info, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { visitorIntelligence } from '@/lib/tracking/visitor-intelligence';

interface Study {
    id: number;
    name: string;
    description: string | null;
    price: number;
    slug: string;
    categoryId: number;
    turnaroundTime: string | null;
}

interface SearchResponse {
    message: string;
    recommendedStudies: Study[];
    category?: string;
    confidence?: number;
}

export function SymptomSearchWidget() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SearchResponse | null>(null);

    const exampleSearches = ['me duele la panza', 'estoy muy cansado', 'tengo tos'];

    const handleSearch = async (searchTerm?: string) => {
        const term = searchTerm || input;
        if (!term.trim() || term.trim().length < 3) return;

        setLoading(true);
        setResult(null);

        // Track search in visitor intelligence
        visitorIntelligence?.trackSearch(term.trim());

        try {
            const response = await fetch('/api/symptom-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptom: term })
            });

            if (response.ok) {
                const data: SearchResponse = await response.json();
                setResult(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-search with debounce (buscar automáticamente mientras escribes)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (input.trim().length >= 3) {
                handleSearch(input);
            }
        }, 800); // Espera 800ms después de que el usuario deja de escribir

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        🆕 Nueva Herramienta
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        ¿No sabes qué estudio necesitas?
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Describe tus síntomas y te ayudaremos a encontrar los estudios correctos
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Escribe tu síntoma... (mínimo 3 letras)"
                                className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={() => handleSearch()}
                            disabled={!input.trim() || input.trim().length < 3 || loading}
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <Search size={18} />
                                    Buscar ahora
                                </>
                            )}
                        </button>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-500">💡 Ejemplos:</span>
                        {exampleSearches.map((example, idx) => (
                            <button
                                key={idx}
                                onClick={() => setInput(example)}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-4">
                        {/* Info Message */}
                        <div className="bg-white rounded-xl p-5 shadow-lg">
                            <div className="flex gap-3">
                                <Info className="text-blue-600 shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">
                                        {result.recommendedStudies.length > 0
                                            ? `✅ Encontramos ${result.recommendedStudies.length} estudios`
                                            : 'No se encontraron coincidencias'}
                                    </h3>
                                    <p className="text-gray-700">{result.message}</p>
                                    {result.confidence && result.confidence >= 70 && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <CheckCircle className="text-green-600" size={16} />
                                            <span className="text-sm text-green-700 font-medium">
                                                Coincidencia alta ({result.confidence}%)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Study Cards */}
                        {result.recommendedStudies.length > 0 && (
                            <div className="grid gap-3">
                                {result.recommendedStudies.map((study) => (
                                    <div
                                        key={study.id}
                                        className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-blue-600 mb-1">
                                                    {study.name}
                                                </h3>
                                                {study.description && (
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                        {study.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="text-xl font-bold text-green-600">
                                                        ${study.price.toLocaleString('es-MX')} MXN
                                                    </span>
                                                    {study.turnaroundTime && (
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <Clock size={14} />
                                                            <span className="text-xs">{study.turnaroundTime}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/estudios/${study.categoryId}/${study.slug}`}
                                                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shrink-0 text-sm"
                                            >
                                                Ver
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Disclaimer */}
                        <div className="bg-white/90 rounded-xl p-4">
                            <p className="text-xs text-gray-600 text-center">
                                ⚠️ <strong>Aviso:</strong> Esta herramienta es solo informativa.
                                NO reemplaza el diagnóstico médico profesional.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
