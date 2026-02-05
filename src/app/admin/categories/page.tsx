'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Trash2, Plus } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    order: number;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            const data = await res.json();
            setCategories(data.sort((a: Category, b: Category) => a.order - b.order));
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await fetch('/api/admin/categories', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isActive: !currentStatus }),
            });
            fetchCategories();
        } catch (error) {
            console.error('Error toggling category:', error);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

        try {
            await fetch(`/api/admin/categories?id=${id}`, {
                method: 'DELETE',
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
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
                        <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
                        <p className="text-gray-500 mt-2">Activa, pausa o elimina categorías del sitio web</p>
                    </div>
                    <Link
                        href="/admin"
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Volver al Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoría</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Descripción</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Estado</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className={!category.isActive ? 'bg-gray-50 opacity-60' : ''}>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{category.name}</div>
                                        <div className="text-sm text-gray-500">ID: {category.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {category.description || 'Sin descripción'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${category.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {category.isActive ? 'Activa' : 'Pausada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => toggleActive(category.id, category.isActive)}
                                                className={`p-2 rounded-lg transition-colors ${category.isActive
                                                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                    }`}
                                                title={category.isActive ? 'Pausar' : 'Activar'}
                                            >
                                                {category.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(category.id)}
                                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
