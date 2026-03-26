'use client';

import { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '@/data/blog-posts';
import { Search, X } from 'lucide-react';

interface BlogFiltersProps {
    posts: BlogPost[];
    onFilterChange: (filtered: BlogPost[]) => void;
}

export const BlogFilters = ({ posts, onFilterChange }: BlogFiltersProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(posts.map(p => p.category)));
        return cats.sort();
    }, [posts]);

    // Get unique years
    const years = useMemo(() => {
        const yrs = Array.from(new Set(posts.map(p =>
            new Date(p.publishDate).getFullYear()
        )));
        return yrs.sort((a, b) => b - a); // Newest first
    }, [posts]);

    // Count posts per category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        posts.forEach(post => {
            counts[post.category] = (counts[post.category] || 0) + 1;
        });
        return counts;
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        let filtered = posts;

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term) ||
                post.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        // Year filter
        if (selectedYear !== 'all') {
            filtered = filtered.filter(post =>
                new Date(post.publishDate).getFullYear() === selectedYear
            );
        }

        return filtered;
    }, [posts, searchTerm, selectedCategory, selectedYear]);

    // Update parent component
    useMemo(() => {
        onFilterChange(filteredPosts);
    }, [filteredPosts, onFilterChange]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedYear('all');
    };

    const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedYear !== 'all';

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Buscar artículos por título, contenido o etiquetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Filters Row */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Categoría
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as BlogCategory | 'all')}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-gray-900"
                    >
                        <option value="all">Todas ({posts.length})</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat} ({categoryCounts[cat] || 0})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Año
                    </label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-gray-900"
                    >
                        <option value="all">Todos los años</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Limpiar Filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
                Mostrando <strong className="text-green-900">{filteredPosts.length}</strong> de {posts.length} artículos
            </div>
        </div>
    );
};
