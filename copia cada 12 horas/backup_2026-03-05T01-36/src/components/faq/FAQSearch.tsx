'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface FAQSearchProps {
    onSearch: (query: string) => void;
    totalResults: number;
}

export const FAQSearch = ({ onSearch, totalResults }: FAQSearchProps) => {
    const [query, setQuery] = useState('');

    const handleChange = (value: string) => {
        setQuery(value);
        // Debounce de 300ms
        const timeout = setTimeout(() => {
            onSearch(value);
        }, 300);
        return () => clearTimeout(timeout);
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative mb-8">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Busca tu pregunta: ayuno, café, precio, resultados..."
                    className="w-full pl-14 pr-12 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>
            {query && (
                <p className="mt-2 text-sm text-gray-600">
                    Encontrados: <span className="font-semibold text-green-900">{totalResults}</span> resultados
                </p>
            )}
        </div>
    );
};
