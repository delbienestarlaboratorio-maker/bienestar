'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Play, Pause, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface GeneratorStatus {
    total: number;
    completed: number;
    current: string;
    status: 'idle' | 'running' | 'paused' | 'error';
    error: string | null;
    startedAt: string | null;
    lastUpdate: string | null;
    pendingTotal: number;
    isGenerating: boolean;
}

export default function ContentGeneratorPage() {
    const [status, setStatus] = useState<GeneratorStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/admin/content-generator');
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            console.error('Error fetching status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();

        // Actualizar cada 2 segundos si está generando
        const interval = setInterval(() => {
            if (status?.isGenerating) {
                fetchStatus();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [status?.isGenerating]);

    const handleStart = async () => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/content-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'start' }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Error al iniciar generación');
                return;
            }

            await fetchStatus();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al iniciar generación');
        } finally {
            setActionLoading(false);
        }
    };

    const handleStop = async () => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/content-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'stop' }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Error al detener generación');
                return;
            }

            await fetchStatus();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al detener generación');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <AdminHeader />
                <div className="p-8 flex items-center justify-center">
                    <RefreshCw className="animate-spin text-green-600" size={32} />
                </div>
            </div>
        );
    }

    const progress = status ? (status.completed / status.total) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <AdminHeader />

            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Generador de Contenido
                        </h1>
                        <p className="text-gray-600">
                            Genera descripciones para estudios usando IA
                        </p>
                    </div>

                    {/* Estado y Controles */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    Estado del Generador
                                </h2>
                                <div className="flex items-center space-x-2">
                                    {status?.status === 'running' && (
                                        <>
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-green-600 font-medium">Generando</span>
                                        </>
                                    )}
                                    {status?.status === 'idle' && (
                                        <>
                                            <div className="w-3 h-3 bg-gray-400 rounded-full" />
                                            <span className="text-gray-600 font-medium">Detenido</span>
                                        </>
                                    )}
                                    {status?.status === 'paused' && (
                                        <>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                            <span className="text-yellow-600 font-medium">Pausado</span>
                                        </>
                                    )}
                                    {status?.status === 'error' && (
                                        <>
                                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                                            <span className="text-red-600 font-medium">Error</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                {!status?.isGenerating ? (
                                    <button
                                        onClick={handleStart}
                                        disabled={actionLoading || status?.pendingTotal === 0}
                                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Play size={20} />
                                        <span>Iniciar Generación</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleStop}
                                        disabled={actionLoading}
                                        className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                    >
                                        <Pause size={20} />
                                        <span>Detener</span>
                                    </button>
                                )}

                                <button
                                    onClick={fetchStatus}
                                    disabled={actionLoading}
                                    className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    <RefreshCw size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Progreso */}
                        {status && status.total > 0 && (
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Progreso</span>
                                        <span className="font-semibold text-gray-900">
                                            {status.completed} / {status.total} ({Math.round(progress)}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {status.current && status.isGenerating && (
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-start space-x-3">
                                            <Clock className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                                            <div>
                                                <div className="text-sm text-green-800 font-medium mb-1">
                                                    Generando ahora:
                                                </div>
                                                <div className="text-green-900 font-semibold">
                                                    {status.current}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error */}
                        {status?.error && (
                            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                                    <div>
                                        <div className="text-sm text-red-800 font-medium mb-1">Error:</div>
                                        <div className="text-red-900">{status.error}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-gray-600 text-sm mb-1">Estudios Pendientes</div>
                            <div className="text-3xl font-bold text-yellow-600">
                                {status?.pendingTotal || 0}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-gray-600 text-sm mb-1">Completados</div>
                            <div className="text-3xl font-bold text-green-600">
                                {status?.completed || 0}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-gray-600 text-sm mb-1">Total en Sesión</div>
                            <div className="text-3xl font-bold text-blue-600">
                                {status?.total || 0}
                            </div>
                        </div>
                    </div>

                    {/* Información */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                            <CheckCircle size={20} />
                            <span>Información Importante</span>
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li>• Las descripciones se guardan <strong>inmediatamente</strong> en la base de datos</li>
                            <li>• Los cambios aparecen en el sitio web <strong>en tiempo real</strong></li>
                            <li>• Puedes detener la generación en cualquier momento</li>
                            <li>• El progreso se mantiene al detener y reanudar</li>
                            <li>• Velocidad promedio: <strong>10-15 segundos</strong> por estudio</li>
                            <li>• <strong>Asegúrate de tener Ollama corriendo:</strong> <code className="bg-blue-100 px-2 py-1 rounded">ollama serve</code></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
