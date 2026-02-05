'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Categories defined inline to avoid loading 1MB studies.ts file
const categories = [
    { id: 'analisis-clinicos', name: 'Análisis Clínicos' },
    { id: 'radiologia', name: 'Radiología' },
    { id: 'cardiologia', name: 'Cardiología' },
    { id: 'ultrasonido', name: 'Ultrasonido' },
    { id: 'otros', name: 'Otros Estudios' },
];

interface SearchResult {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: {
        regular: number;
        promotional?: number;
    };
    description: string;
}

interface SearchBarProps {
    placeholder?: string;
    showCategoryFilter?: boolean;
    className?: string;
}

export const SearchBar = ({
    placeholder = "Busca tu estudio: ego, biometría, rayos X...",
    showCategoryFilter = false,
    className = ""
}: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch results when query changes
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        setIsLoading(true);
        setShowResults(true);

        debounceTimeout.current = setTimeout(async () => {
            try {
                const params = new URLSearchParams({
                    q: query,
                    limit: '8'
                });

                if (selectedCategory !== 'all') {
                    params.append('category', selectedCategory);
                }

                const response = await fetch(`/api/search?${params.toString()}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms debounce

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [query, selectedCategory]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (results.length > 0) {
            window.location.href = `/estudios/${results[0].category}/${results[0].slug}`;
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query && setShowResults(true)}
                        placeholder={placeholder}
                        className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {showCategoryFilter && (
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-colors text-gray-800"
                    >
                        <option value="all">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                )}

                <button
                    type="submit"
                    className="bg-gradient-to-r from-green-900 to-green-700 hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg whitespace-nowrap"
                >
                    Buscar
                </button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
                            <Loader2 className="animate-spin" size={24} />
                            <span>Buscando...</span>
                        </div>
                    ) : results.length > 0 ? (
                        results.map((study) => (
                            <Link
                                key={study.id}
                                href={`/estudios/${study.category}/${study.slug}`}
                                onClick={() => {
                                    setShowResults(false);
                                    setQuery('');
                                }}
                                className="block p-4 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                            {study.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 line-clamp-1">
                                            {study.description || 'Sin descripción disponible'}
                                        </p>
                                        <span className="inline-block mt-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                                            {categories.find(c => c.id === study.category)?.name || study.category}
                                        </span>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-bold text-green-900">
                                            ${(study.price.promotional || study.price.regular).toLocaleString('es-MX')}
                                        </p>
                                        {study.price.promotional && (
                                            <p className="text-xs text-gray-400 line-through">
                                                ${study.price.regular.toLocaleString('es-MX')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-6 text-center">
                            <p className="text-gray-600">
                                No se encontraron estudios para "{query}"
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Intenta con: ego, bh, biometría, orina, rayos X
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
