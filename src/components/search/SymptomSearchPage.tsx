'use client';

import { useState } from 'react';
import { Search, Loader2, Info, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

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
    suggestions?: string[];
}

export function SymptomSearchPage() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SearchResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const exampleSearches = [
        'me duele la panza',
        'estoy muy cansado',
        'dolor de cabeza',
        'tos con flema',
        'orino mucho',
        'tengo fiebre'
    ];

    const handleSearch = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/symptom-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptom: input })
            });

            if (!response.ok) {
                throw new Error('Error en la búsqueda');
            }

            const data: SearchResponse = await response.json();
            setResult(data);
        } catch (err) {
            setError('Hubo un error al buscar. Por favor intenta de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ¿Qué estudio necesitas?
                    </h1>
                    <p className="text-xl text-gray-600">
                        Describe tus síntomas y te ayudaremos a encontrar los estudios adecuados
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe tus síntomas... (ej: me duele la panza)"
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={!input.trim() || loading}
                            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Buscando...
                                </>
                            ) : (
                                'Buscar'
                            )}
                        </button>
                    </div>

                    {/* Example Searches */}
                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-3">💡 Ejemplos de búsqueda:</p>
                        <div className="flex flex-wrap gap-2">
                            {exampleSearches.map((example, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInput(example)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8 flex gap-3">
                        <AlertCircle className="text-red-600 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-red-900 mb-1">Error</h3>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="space-y-6">
                        {/* Info Box */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                            <div className="flex gap-3 mb-4">
                                <Info className="text-blue-600 shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-2">
                                        {result.recommendedStudies.length > 0
                                            ? `Encontramos ${result.recommendedStudies.length} estudios relacionados`
                                            : 'No se encontraron coincidencias exactas'}
                                    </h3>
                                    <p className="text-blue-800 whitespace-pre-line">{result.message}</p>
                                    {result.confidence && result.confidence >= 70 && (
                                        <div className="mt-3 flex items-center gap-2">
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
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    🔬 Estudios Recomendados
                                </h2>

                                <div className="grid gap-4">
                                    {result.recommendedStudies.map((study) => (
                                        <div
                                            key={study.id}
                                            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-blue-600 mb-2">
                                                        {study.name}
                                                    </h3>
                                                    {study.description && (
                                                        <p className="text-gray-600 mb-4">
                                                            {study.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-semibold">💰 Precio:</span>
                                                            <span className="text-xl font-bold text-green-600">
                                                                ${study.price.toLocaleString('es-MX')} MXN
                                                            </span>
                                                        </div>
                                                        {study.turnaroundTime && (
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={16} />
                                                                <span>{study.turnaroundTime}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/estudios/${study.categoryId}/${study.slug}`}
                                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                                                >
                                                    Ver estudio
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions if no results */}
                        {result.suggestions && result.suggestions.length > 0 && (
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                                <h3 className="font-bold text-yellow-900 mb-3">
                                    💡 Sugerencias para mejorar tu búsqueda:
                                </h3>
                                <ul className="space-y-2">
                                    {result.suggestions.map((suggestion, idx) => (
                                        <li key={idx} className="text-yellow-800 flex gap-2">
                                            <span>•</span>
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Disclaimer */}
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                            <p className="text-sm text-gray-600 text-center">
                                ⚠️ <strong>Aviso Importante:</strong> Esta herramienta es solo informativa.
                                NO reemplaza el diagnóstico médico profesional. Siempre consulta con tu médico
                                antes de realizarte estudios de laboratorio.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
