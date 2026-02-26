'use client';

import { useState } from 'react';
import {
    Info,
    FileText,
    Beaker,
    MessageCircle,
    Star,
    Clock,
    AlertTriangle
} from 'lucide-react';

interface Study {
    id: string;
    name: string;
    description?: string;
    whatIsIt?: string;
    preparation?: string;
    turnaroundTime?: string;
    sampleType?: string;
    faq?: Array<{ question: string; answer: string }>;
}

interface StudyTabsProps {
    study: Study;
    showReviews?: boolean;
}

type Tab = 'summary' | 'details' | 'preparation' | 'faq' | 'reviews';

export function StudyTabs({ study, showReviews = true }: StudyTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('summary');

    const tabs: Array<{ id: Tab; label: string; icon: any }> = [
        { id: 'summary', label: 'Resumen', icon: Info },
        { id: 'details', label: 'Detalles', icon: FileText },
        { id: 'preparation', label: 'Preparación', icon: AlertTriangle },
        { id: 'faq', label: 'Preguntas', icon: MessageCircle },
    ];

    if (showReviews) {
        tabs.push({ id: 'reviews', label: 'Reseñas', icon: Star });
    }

    return (
        <div className="study-tabs">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex gap-2 overflow-x-auto pb-px" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors
                  ${isActive
                                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                                    }
                `}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {/* Summary Tab */}
                {activeTab === 'summary' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Descripción General
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {study.description || 'Información no disponible.'}
                            </p>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {study.turnaroundTime && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                            Tiempo de Entrega
                                        </h4>
                                    </div>
                                    <p className="text-blue-800 dark:text-blue-200">
                                        {study.turnaroundTime}
                                    </p>
                                </div>
                            )}

                            {study.sampleType && (
                                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Beaker className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                                            Tipo de Muestra
                                        </h4>
                                    </div>
                                    <p className="text-purple-800 dark:text-purple-200">
                                        {study.sampleType}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Details Tab */}
                {activeTab === 'details' && (
                    <div className="space-y-4 animate-fadeIn">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                ¿Qué es este estudio?
                            </h3>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {study.whatIsIt || study.description || 'Información detallada no disponible.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Preparation Tab */}
                {activeTab === 'preparation' && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                                        Instrucciones de Preparación
                                    </h3>
                                    <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                                        Sigue estas instrucciones cuidadosamente para obtener resultados precisos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none">
                            {study.preparation ? (
                                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {study.preparation}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400 italic">
                                    No se requiere preparación especial para este estudio.
                                </p>
                            )}
                        </div>

                        {/* General Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                                Consejos Generales:
                            </h4>
                            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>Lleva tu identificación oficial y orden médica</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>Si tienes dudas, llama antes de tu cita</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>Llega 15 minutos antes de tu cita</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <div className="space-y-4 animate-fadeIn">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Preguntas Frecuentes
                        </h3>

                        {study.faq && study.faq.length > 0 ? (
                            <div className="space-y-3">
                                {study.faq.map((item, index) => (
                                    <details
                                        key={index}
                                        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                            <span className="font-semibold text-gray-900 dark:text-white pr-4">
                                                {item.question}
                                            </span>
                                            <MessageCircle className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-4 pb-4 text-gray-700 dark:text-gray-300">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 italic">
                                No hay preguntas frecuentes disponibles aún.
                            </p>
                        )}

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                ¿Tienes más preguntas?
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Nuestro equipo está listo para ayudarte
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="tel:+527716854026"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    📞 Llamar Ahora
                                </a>
                                <a
                                    href={`https://wa.me/527716854026?text=${encodeURIComponent(`Hola, tengo una pregunta sobre el estudio ${study.name}. ¿Me pueden ayudar?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && showReviews && (
                    <div className="space-y-4 animate-fadeIn">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Reseñas de Clientes
                        </h3>

                        {/* TODO: Integrate with reviews system */}
                        <p className="text-gray-600 dark:text-gray-400 italic">
                            Sistema de reseñas próximamente...
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
