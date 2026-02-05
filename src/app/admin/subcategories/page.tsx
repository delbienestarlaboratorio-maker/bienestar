'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface Subcategory {
    id: string;
    categoryId: string;
    name: string;
    description: string | null;
    isActive: boolean;
    order: number;
}

export default function AdminSubcategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [categoriesRes, subcategoriesRes] = await Promise.all([
                fetch('/api/admin/categories'),
                fetch('/api/admin/subcategories'),
            ]);

            const categoriesData = await categoriesRes.json();
            const subcategoriesData = await subcategoriesRes.json();

            setCategories(categoriesData);
            setSubcategories(subcategoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await fetch('/api/admin/subcategories', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isActive: !currentStatus }),
            });
            fetchData();
        } catch (error) {
            console.error('Error toggling subcategory:', error);
        }
    };

    const deleteSubcategory = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta subcategoría?')) return;

        try {
            await fetch(`/api/admin/subcategories?id=${id}`, {
                method: 'DELETE',
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    const getSubcategoriesForCategory = (categoryId: string) => {
        return subcategories
            .filter(sub => sub.categoryId === categoryId)
            .sort((a, b) => a.order - b.order);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gestión de Subcategorías</h1>
                        <p className="text-gray-500 mt-2">Organiza los estudios en subcategorías (ej. Rayos X, Ultrasonido)</p>
                    </div>
                    <Link
                        href="/admin"
                        className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        Volver al Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {categories.map((category) => {
                        const categorySubcategories = getSubcategoriesForCategory(category.id);
                        const isExpanded = expandedCategories.has(category.id);

                        return (
                            <div key={category.id} className="border-b border-gray-200 last:border-b-0">
                                {/* Category Header */}
                                <div
                                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        {isExpanded ? (
                                            <ChevronDown size={20} className="text-gray-400" />
                                        ) : (
                                            <ChevronRight size={20} className="text-gray-400" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-900">{category.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {categorySubcategories.length} subcategorías
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Add new subcategory modal
                                        }}
                                        className="bg-green-50 text-green-900 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Agregar Subcategoría
                                    </button>
                                </div>

                                {/* Subcategories List */}
                                {isExpanded && categorySubcategories.length > 0 && (
                                    <div className="bg-gray-50 px-6 pb-6">
                                        <table className="w-full">
                                            <thead className="border-b border-gray-200">
                                                <tr>
                                                    <th className="py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                                                    <th className="py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                                                    <th className="py-3 text-center text-sm font-semibold text-gray-700">Estado</th>
                                                    <th className="py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categorySubcategories.map((sub) => (
                                                    <tr key={sub.id} className={!sub.isActive ? 'opacity-60' : ''}>
                                                        <td className="py-3">
                                                            <div className="font-medium text-gray-900">{sub.name}</div>
                                                            <div className="text-xs text-gray-500">ID: {sub.id}</div>
                                                        </td>
                                                        <td className="py-3 text-sm text-gray-600">
                                                            {sub.description || 'Sin descripción'}
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span
                                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sub.isActive
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-gray-100 text-gray-800'
                                                                    }`}
                                                            >
                                                                {sub.isActive ? 'Activa' : 'Pausada'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    onClick={() => toggleActive(sub.id, sub.isActive)}
                                                                    className={`p-2 rounded-lg transition-colors ${sub.isActive
                                                                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                                                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                                        }`}
                                                                    title={sub.isActive ? 'Pausar' : 'Activar'}
                                                                >
                                                                    {sub.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteSubcategory(sub.id)}
                                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                                    title="Eliminar"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {isExpanded && categorySubcategories.length === 0 && (
                                    <div className="bg-gray-50 px-6 py-8 text-center text-gray-500">
                                        No hay subcategorías para esta categoría
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
