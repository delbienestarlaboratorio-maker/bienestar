'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { searchTherapies, type TherapyDetails } from '@/data/sueroterapia/therapies-detailed';

interface TherapySearchProps {
    onTherapySelect?: (therapy: TherapyDetails) => void;
    onResultsChange?: (results: TherapyDetails[]) => void;
}

export function TherapySearch({ onTherapySelect, onResultsChange }: TherapySearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<TherapyDetails[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length >= 2) {
            const searchResults = searchTherapies(query);
            setResults(searchResults);
            setIsOpen(searchResults.length > 0);
            onResultsChange?.(searchResults);
        } else {
            setResults([]);
            setIsOpen(false);
            onResultsChange?.([]);
        }
    }, [query, onResultsChange]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
        onResultsChange?.([]);
    };

    const handleSelectTherapy = (therapy: TherapyDetails) => {
        onTherapySelect?.(therapy);
        setQuery('');
        setIsOpen(false);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, idx) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={idx} className="bg-yellow-200 font-semibold">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={24} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por beneficio... ej: antienvejecimiento, energía, inmunidad"
                    className="w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-purple-500 focus:outline-none transition-colors shadow-lg"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Limpiar búsqueda"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="p-2">
                        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                            {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                        </div>
                        {results.map((therapy) => (
                            <button
                                key={therapy.id}
                                onClick={() => handleSelectTherapy(therapy)}
                                className="w-full text-left p-4 hover:bg-purple-50 rounded-xl transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            {highlightMatch(therapy.name, query)}
                                        </h4>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {highlightMatch(therapy.shortDesc, query)}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            {therapy.searchTerms
                                                .filter(term => term.toLowerCase().includes(query.toLowerCase()))
                                                .slice(0, 3)
                                                .map((term, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                                                    >
                                                        {term}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-2xl font-bold text-purple-600">
                                            ${therapy.price}
                                        </div>
                                        <div className="text-xs text-gray-500">{therapy.duration}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results */}
            {isOpen && query.length >= 2 && results.length === 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 text-center">
                    <p className="text-gray-600">
                        No encontramos sueros que coincidan con "<span className="font-semibold">{query}</span>"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Intenta buscar: energía, antienvejecimiento, inmunidad, detox, deportivo
                    </p>
                </div>
            )}

            {/* Popular Searches (when empty) */}
            {!query && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-gray-500">Búsquedas populares:</span>
                    {['antienvejecimiento', 'energía', 'inmunidad', 'detox', 'belleza'].map((term) => (
                        <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
