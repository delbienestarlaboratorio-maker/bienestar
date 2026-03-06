'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingCart, Zap, Grid3x3, List, Search } from 'lucide-react';
import { StudyImageCard } from './StudyImageCard';
import { getStudyVisualType } from '@/lib/studyTypeClassifier';

interface Study {
    id: string;
    slug: string;
    name: string;
    categoryId: string;
    subcategoryId: string | null;
    description: string | null;
    priceRegular: number;
    pricePromotional: number | null;
    image: string | null;
}

interface Subcategory {
    id: string;
    name: string;
}

interface CategoryStudyListProps {
    initialStudies: Study[];
    subcategories: Subcategory[];
    categoria: string;
}

const studyEmojis = [
    '🔬', '💉', '🩺', '🧬', '💊', '🩸', '🫀', '🧪',
    '🔍', '🩹', '🧫'
];

export const CategoryStudyList = ({ initialStudies, subcategories, categoria }: CategoryStudyListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [subcategoryFilter, setSubcategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const itemsPerPage = 15;

    const filteredStudies = useMemo(() => {
        let filtered = [...initialStudies];

        // Búsqueda
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(lowerSearch) ||
                (s.description && s.description.toLowerCase().includes(lowerSearch))
            );
        }

        // Filtro de precio
        if (priceFilter === 'discount') {
            filtered = filtered.filter(s => s.pricePromotional);
        } else if (priceFilter === 'low') {
            filtered = filtered.filter(s => (s.pricePromotional || s.priceRegular) < 500);
        } else if (priceFilter === 'medium') {
            filtered = filtered.filter(s => {
                const price = s.pricePromotional || s.priceRegular;
                return price >= 500 && price < 1500;
            });
        } else if (priceFilter === 'high') {
            filtered = filtered.filter(s => (s.pricePromotional || s.priceRegular) >= 1500);
        }

        // Filtro de subcategoría
        if (subcategoryFilter !== 'all') {
            filtered = filtered.filter(s => s.subcategoryId === subcategoryFilter);
        }

        // Ordenar
        if (sortBy === 'price-asc') {
            filtered.sort((a, b) => (a.pricePromotional || a.priceRegular) - (b.pricePromotional || b.priceRegular));
        } else if (sortBy === 'price-desc') {
            filtered.sort((a, b) => (b.pricePromotional || b.priceRegular) - (a.pricePromotional || a.priceRegular));
        } else {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    }, [initialStudies, searchTerm, priceFilter, subcategoryFilter, sortBy]);

    const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);
    const currentStudies = filteredStudies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const calculateDiscount = (regular: number, promotional: number | null) => {
        if (!promotional) return 0;
        return Math.round(((regular - promotional) / regular) * 100);
    };

    return (
        <div className="px-4 py-8">
            {/* Filters Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Search size={20} className="text-green-900" />
                        Filtrar Estudios
                    </h2>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 rounded-md transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-green-900 shadow-sm font-semibold' : 'text-gray-600'}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-2 rounded-md transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-white text-green-900 shadow-sm font-semibold' : 'text-gray-600'}`}
                        >
                            <Grid3x3 size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            placeholder="Buscar estudio..."
                            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                        />
                    </div>

                    <select
                        value={priceFilter}
                        onChange={(e) => { setPriceFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    >
                        <option value="all">Todos los precios</option>
                        <option value="discount">Con descuento</option>
                        <option value="low">Menos de $500</option>
                        <option value="medium">$500 - $1,500</option>
                        <option value="high">Más de $1,500</option>
                    </select>

                    {subcategories.length > 0 && (
                        <select
                            value={subcategoryFilter}
                            onChange={(e) => { setSubcategoryFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                        >
                            <option value="all">Todos los tipos</option>
                            {subcategories.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    )}

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    >
                        <option value="name">Nombre (A-Z)</option>
                        <option value="price-asc">Precio (menor a mayor)</option>
                        <option value="price-desc">Precio (mayor a menor)</option>
                    </select>
                </div>
            </div>

            {/* Studies List/Grid */}
            {viewMode === 'list' ? (
                <div className="space-y-4 mb-8">
                    {currentStudies.map((study, idx) => (
                        <div key={study.id} className="bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition-all overflow-hidden">
                            <div className="flex items-start gap-6 p-6">
                                {/* Professional Image Card */}
                                <Link href={`/estudios/${categoria}/${study.slug}`} className="flex-shrink-0 w-32 h-32 block cursor-pointer">
                                    <StudyImageCard
                                        studyName={study.name}
                                        studyType={getStudyVisualType(study.name)}
                                        className="w-full h-full"
                                    />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/estudios/${categoria}/${study.slug}`}>
                                        <h3 className="text-xl font-bold text-gray-900 hover:text-green-900 transition-colors mb-2">{study.name}</h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{study.description}</p>
                                    <div className="flex items-end justify-between">
                                        <Link href={`/estudios/${categoria}/${study.slug}`} className="block cursor-pointer hover:opacity-80 transition-opacity">
                                            {study.pricePromotional ? (
                                                <div className="flex flex-col">
                                                    <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-1">-{calculateDiscount(study.priceRegular, study.pricePromotional)}% OFF</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-gray-400 line-through text-sm">${study.priceRegular.toLocaleString('es-MX')}</span>
                                                        <span className="text-3xl font-bold text-green-900">${study.pricePromotional.toLocaleString('es-MX')}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-3xl font-bold text-green-900">${study.priceRegular.toLocaleString('es-MX')}</span>
                                            )}
                                        </Link>
                                        <div className="flex gap-2">
                                            <button className="bg-white border-2 border-green-900 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-green-50 transition-colors text-sm">Agregar</button>
                                            <button className="bg-green-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-800 transition-colors text-sm shadow-md">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {currentStudies.map((study, idx) => (
                        <div key={study.id} className="bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition-all overflow-hidden flex flex-col">
                            {/* Professional Image Card */}
                            <Link href={`/estudios/${categoria}/${study.slug}`}>
                                <StudyImageCard
                                    studyName={study.name}
                                    studyType={getStudyVisualType(study.name)}
                                    className="w-full aspect-square"
                                />
                            </Link>
                            <div className="p-6 flex flex-col flex-1">
                                <Link href={`/estudios/${categoria}/${study.slug}`} className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 hover:text-green-900 transition-colors mb-2 line-clamp-2">{study.name}</h3>
                                </Link>
                                <div className="mt-4 text-center">
                                    {study.pricePromotional ? (
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-400 line-through text-xs">${study.priceRegular.toLocaleString('es-MX')}</span>
                                            <span className="text-2xl font-bold text-green-900">${study.pricePromotional.toLocaleString('es-MX')}</span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold text-green-900">${study.priceRegular.toLocaleString('es-MX')}</span>
                                    )}
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <button className="w-full bg-white border-2 border-green-900 text-green-900 py-2 rounded-lg font-bold text-xs">Agregar</button>
                                    <button className="w-full bg-green-900 text-white py-2 rounded-lg font-bold text-xs">Comprar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 text-gray-700"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-600 font-medium">Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 text-gray-700"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};
