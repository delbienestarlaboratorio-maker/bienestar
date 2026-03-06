'use client';

import { useState, useEffect } from 'react';
import { Search, Pause, Play, Trash2, Sparkles, Upload, Download, Filter } from 'lucide-react';

interface Study {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: {
        regular: number;
        promotional?: number;
    };
    status: 'active' | 'paused';
    hasAIContent: boolean;
    description?: string;
}

export default function StudiesManagement() {
    const [studies, setStudies] = useState<Study[]>([]);
    const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
    const [loading, setLoading] = useState(true);
    const [selectedStudies, setSelectedStudies] = useState<Set<string>>(new Set());

    useEffect(() => {
        loadStudies();
    }, []);

    useEffect(() => {
        filterStudies();
    }, [searchTerm, statusFilter, studies]);

    const loadStudies = async () => {
        try {
            const response = await fetch('/api/admin/studies');
            const data = await response.json();
            setStudies(data);
        } catch (error) {
            console.error('Error loading studies:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterStudies = () => {
        let filtered = studies;

        if (searchTerm) {
            filtered = filtered.filter(study =>
                study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                study.slug.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(study => study.status === statusFilter);
        }

        setFilteredStudies(filtered);
    };

    const toggleStudyStatus = async (studyId: string) => {
        try {
            const study = studies.find(s => s.id === studyId);
            if (!study) return;

            const newStatus = study.status === 'active' ? 'paused' : 'active';

            await fetch(`/api/admin/studies/${studyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            setStudies(studies.map(s =>
                s.id === studyId ? { ...s, status: newStatus } : s
            ));
        } catch (error) {
            console.error('Error updating study:', error);
        }
    };

    const deleteStudy = async (studyId: string) => {
        if (!confirm('¿Estás seguro de eliminar este estudio?')) return;

        try {
            await fetch(`/api/admin/studies/${studyId}`, {
                method: 'DELETE'
            });

            setStudies(studies.filter(s => s.id !== studyId));
        } catch (error) {
            console.error('Error deleting study:', error);
        }
    };

    const enrichWithAI = async (studyId: string) => {
        try {
            const response = await fetch(`/api/admin/studies/${studyId}/enrich`, {
                method: 'POST'
            });

            if (response.ok) {
                const updatedStudy = await response.json();
                setStudies(studies.map(s =>
                    s.id === studyId ? { ...s, ...updatedStudy, hasAIContent: true } : s
                ));
                alert('Contenido generado exitosamente con IA');
            }
        } catch (error) {
            console.error('Error enriching with AI:', error);
            alert('Error al generar contenido con IA');
        }
    };

    const bulkEnrichWithAI = async () => {
        if (selectedStudies.size === 0) {
            alert('Selecciona al menos un estudio');
            return;
        }

        if (!confirm(`¿Generar contenido con IA para ${selectedStudies.size} estudios?`)) return;

        try {
            await fetch('/api/admin/studies/bulk-enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studyIds: Array.from(selectedStudies) })
            });

            alert('Proceso de enriquecimiento iniciado');
            setSelectedStudies(new Set());
            loadStudies();
        } catch (error) {
            console.error('Error in bulk enrichment:', error);
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Nombre', 'Categoría', 'Precio Regular', 'Precio Promo', 'Estado', 'Contenido IA'].join(','),
            ...filteredStudies.map(s => [
                s.id,
                `"${s.name}"`,
                s.category,
                s.price.regular,
                s.price.promotional || '',
                s.status,
                s.hasAIContent ? 'Sí' : 'No'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `estudios_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const stats = {
        total: studies.length,
        active: studies.filter(s => s.status === 'active').length,
        paused: studies.filter(s => s.status === 'paused').length,
        withAI: studies.filter(s => s.hasAIContent).length
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando estudios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Estudios</h1>
                    <p className="text-gray-600">Administra el catálogo completo de estudios médicos</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Estudios</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
                        <div className="text-2xl font-bold text-green-900">{stats.active}</div>
                        <div className="text-sm text-green-700">Activos</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 shadow-sm border border-orange-200">
                        <div className="text-2xl font-bold text-orange-900">{stats.paused}</div>
                        <div className="text-sm text-orange-700">Pausados</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 shadow-sm border border-purple-200">
                        <div className="text-2xl font-bold text-purple-900">{stats.withAI}</div>
                        <div className="text-sm text-purple-700">Con IA</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar estudios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Solo activos</option>
                            <option value="paused">Solo pausados</option>
                        </select>

                        {/* Actions */}
                        <button
                            onClick={bulkEnrichWithAI}
                            disabled={selectedStudies.size === 0}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Sparkles size={20} />
                            Enriquecer con IA ({selectedStudies.size})
                        </button>

                        <button
                            onClick={exportToCSV}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                            <Download size={20} />
                            Exportar CSV
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedStudies(new Set(filteredStudies.map(s => s.id)));
                                                } else {
                                                    setSelectedStudies(new Set());
                                                }
                                            }}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Precio</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IA</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredStudies.map((study) => (
                                    <tr key={study.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudies.has(study.id)}
                                                onChange={(e) => {
                                                    const newSelected = new Set(selectedStudies);
                                                    if (e.target.checked) {
                                                        newSelected.add(study.id);
                                                    } else {
                                                        newSelected.delete(study.id);
                                                    }
                                                    setSelectedStudies(newSelected);
                                                }}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{study.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">{study.name}</div>
                                            <div className="text-xs text-gray-500">{study.slug}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{study.category}</td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-medium text-gray-900">${study.price.regular}</div>
                                            {study.price.promotional && (
                                                <div className="text-xs text-green-600">${study.price.promotional}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${study.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                {study.status === 'active' ? 'Activo' : 'Pausado'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {study.hasAIContent ? (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                                    ✓ IA
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleStudyStatus(study.id)}
                                                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title={study.status === 'active' ? 'Pausar' : 'Activar'}
                                                >
                                                    {study.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => enrichWithAI(study.id)}
                                                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Enriquecer con IA"
                                                >
                                                    <Sparkles size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteStudy(study.id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

                    {filteredStudies.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No se encontraron estudios</p>
                        </div>
                    )}
                </div>

                {/* Pagination info */}
                <div className="mt-4 text-sm text-gray-600 text-center">
                    Mostrando {filteredStudies.length} de {studies.length} estudios
                </div>
            </div>
        </div>
    );
}
