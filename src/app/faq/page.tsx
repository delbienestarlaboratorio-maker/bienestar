'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { faqs, faqCategories } from '@/data/FAQData_PART1';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQSearch } from '@/components/faq/FAQSearch';
import { FAQFilters } from '@/components/faq/FAQFilters';

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFAQId, setOpenFAQId] = useState<string | null>(null);

    // Filtrar FAQs
    const filteredFAQs = useMemo(() => {
        let filtered = faqs;

        // Filtro por categoría
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(faq => faq.category === selectedCategory);
        }

        // Filtro por búsqueda
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(faq =>
                faq.question.toLowerCase().includes(query) ||
                faq.shortAnswer.toLowerCase().includes(query) ||
                faq.longAnswer.toLowerCase().includes(query) ||
                faq.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [selectedCategory, searchQuery]);

    // Contar FAQs por categoría
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        faqCategories.forEach(cat => {
            counts[cat.id] = faqs.filter(faq => faq.category === cat.id).length;
        });
        return counts;
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-700 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <HelpCircle size={48} className="text-green-400" />
                        <h1 className="text-5xl font-bold text-white">
                            Preguntas Frecuentes
                        </h1>
                    </div>
                    <p className="text-xl text-green-100 max-w-3xl">
                        Resolvemos todas tus dudas sobre nuestros servicios de laboratorio clínico.
                        Busca tu pregunta o explora por categoría.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Search Bar */}
                <FAQSearch onSearch={setSearchQuery} totalResults={filteredFAQs.length} />

                {/* Category Filters */}
                <FAQFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categoryCounts={categoryCounts}
                />

                {/* FAQ List */}
                {filteredFAQs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredFAQs.map(faq => (
                            <FAQAccordion
                                key={faq.id}
                                faq={faq}
                                isOpen={openFAQId === faq.id}
                                onToggle={() => setOpenFAQId(openFAQId === faq.id ? null : faq.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <HelpCircle className="mx-auto mb-4 text-gray-300" size={64} />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            No encontramos preguntas que coincidan
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Intenta con otros términos o explora todas las categorías
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
                        >
                            Ver todas las preguntas
                        </button>
                    </div>
                )}

                {/* Footer help section */}
                <div className="mt-16 p-8 bg-green-50 rounded-xl border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        ¿No encontraste lo que buscabas?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Nuestro equipo está listo para ayudarte. Comunícate con nosotros directamente.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/contacto"
                            className="px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
                        >
                            Contactar por WhatsApp
                        </Link>
                        <Link
                            href="/sucursales"
                            className="px-6 py-3 bg-white border-2 border-green-900 text-green-900 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Ver Sucursales
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
