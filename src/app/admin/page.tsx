'use client';

import Link from 'next/link';
import { LayoutDashboard, FolderTree, FileText, BarChart3, Settings, Layers, Sparkles, Calendar, Users } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminDashboard() {
    const modules = [
        {
            title: 'Agenda de Citas',
            description: 'Gestiona las citas médicas',
            icon: Calendar,
            href: '/admin/appointments',
            color: 'bg-pink-600',
        },
        {
            title: 'Generador IA',
            description: 'Genera descripciones con IA',
            icon: Sparkles,
            href: '/admin/content-generator',
            color: 'bg-purple-600',
        },
        {
            title: 'Categorías',
            description: 'Gestiona las categorías de estudios',
            icon: FolderTree,
            href: '/admin/categories',
            color: 'bg-green-900',
        },
        {
            title: 'Subcategorías',
            description: 'Organiza estudios por subcategorías',
            icon: Layers,
            href: '/admin/subcategories',
            color: 'bg-green-700',
        },
        {
            title: 'Estudios',
            description: 'Administra los estudios médicos',
            icon: FileText,
            href: '/admin/studies',
            color: 'bg-blue-900',
        },
        {
            title: 'Analytics',
            description: 'Métricas y estadísticas',
            icon: BarChart3,
            href: '/admin/analytics',
            color: 'bg-green-600',
        },
        {
            title: 'Configuración',
            description: 'Ajustes generales del sistema',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-gray-600',
        },
        {
            title: 'Visitantes / Inteligencia',
            description: 'Rastreo de sesiones y espionaje de competencia',
            icon: Users,
            href: '/admin/visitantes',
            color: 'bg-teal-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <AdminHeader />

            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
                        <p className="text-gray-600">Laboratorio Bienestar - Sistema de Gestión</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <Link
                                    key={module.href}
                                    href={module.href}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className={`${module.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                                    <p className="text-gray-600 text-sm">{module.description}</p>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceso Rápido</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-green-50 rounded-xl">
                                <div className="text-3xl font-bold text-green-900 mb-1">5</div>
                                <div className="text-sm text-gray-600">Categorías Activas</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl">
                                <div className="text-3xl font-bold text-green-900 mb-1">15</div>
                                <div className="text-sm text-gray-600">Subcategorías</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <div className="text-3xl font-bold text-blue-900 mb-1">2,351</div>
                                <div className="text-sm text-gray-600">Estudios Disponibles</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                                <div className="text-sm text-gray-600">Estudios Pausados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
