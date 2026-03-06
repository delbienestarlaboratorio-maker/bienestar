'use client';

import { useState, useEffect } from 'react';
import { Settings, Server, Check, X, RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';

interface APIConfig {
    id: string;
    name: string;
    displayName: string;
    baseUrl: string;
    port: number | null;
    isActive: boolean;
    testStatus: 'online' | 'offline' | 'unknown';
    lastTested: Date | null;
}

export default function SettingsPage() {
    const [apis, setApis] = useState<APIConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [testing, setTesting] = useState<string | null>(null);

    useEffect(() => {
        loadAPIConfigs();
    }, []);

    const loadAPIConfigs = async () => {
        try {
            const response = await fetch('/api/admin/settings/apis');
            const data = await response.json();
            setApis(data);
        } catch (error) {
            console.error('Error loading API configs:', error);
        } finally {
            setLoading(false);
        }
    };

    const testConnection = async (apiId: string) => {
        setTesting(apiId);
        try {
            const response = await fetch(`/api/admin/settings/apis/${apiId}/test`, {
                method: 'POST',
            });
            const result = await response.json();

            // Update local state
            setApis(apis.map(api =>
                api.id === apiId
                    ? { ...api, testStatus: result.status, lastTested: new Date() }
                    : api
            ));
        } catch (error) {
            console.error('Error testing API:', error);
        } finally {
            setTesting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
                    <p className="text-gray-600 mt-2">Administra las integraciones y configuración de APIs</p>
                </div>

                {/* APIs Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Server size={24} />
                            APIs Integradas
                        </h2>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                            <Plus size={20} />
                            Nueva API
                        </button>
                    </div>

                    <div className="space-y-4">
                        {apis.map((api) => (
                            <div
                                key={api.id}
                                className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{api.displayName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${api.testStatus === 'online'
                                                    ? 'bg-green-100 text-green-800'
                                                    : api.testStatus === 'offline'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {api.testStatus === 'online' && <Check size={12} className="inline mr-1" />}
                                                {api.testStatus === 'offline' && <X size={12} className="inline mr-1" />}
                                                {api.testStatus === 'online' ? 'En línea' : api.testStatus === 'offline' ? 'Fuera de línea' : 'Sin probar'}
                                            </span>
                                        </div>

                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><span className="font-medium">URL:</span> {api.baseUrl}{api.port ? `:${api.port}` : ''}</p>
                                            <p><span className="font-medium">Última prueba:</span> {api.lastTested ? new Date(api.lastTested).toLocaleString('es-MX') : 'Nunca'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => testConnection(api.id)}
                                            disabled={testing === api.id}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <RefreshCw size={16} className={testing === api.id ? 'animate-spin' : ''} />
                                            {testing === api.id ? 'Probando...' : 'Probar'}
                                        </button>
                                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {apis.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No hay APIs configuradas. Haz clic en "Nueva API" para agregar una.
                        </div>
                    )}
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Configuración de Seguridad</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-gray-900">Rate Limiting</h3>
                                <p className="text-sm text-gray-600">Límite de intentos de login</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    defaultValue={5}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <span className="text-sm text-gray-600">intentos/min</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-gray-900">Duración de Sesión</h3>
                                <p className="text-sm text-gray-600">Tiempo antes de requerir re-autenticación</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    defaultValue={24}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <span className="text-sm text-gray-600">horas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
