'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp } from 'lucide-react';
import { getAllBlogPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogFilters } from '@/components/blog/BlogFilters';

export default function BlogPage() {
    const allPosts = getAllBlogPosts();
    // Normalize posts for compatibility (mapping 'date' to 'publishDate' if needed)
    const normalizedPosts = allPosts.map(post => ({
        ...post,
        publishDate: post.date || (post as any).publishDate, // Handle both key names
        excerpt: (post as any).excerpt || `Artículo sobre ${post.title}`,
        image: (post as any).image || '/images/blog/lab-generic.jpg',
        author: (post as any).author || 'Dr. Carlos M.',
        readTime: (post as any).readTime || 5,
        tags: (post as any).tags || [],
        featured: (post as any).featured || false
    }));

    const [filteredPosts, setFilteredPosts] = useState(normalizedPosts);

    // Get featured posts
    const featuredPosts = normalizedPosts.filter(post => post.featured).slice(0, 2);

    // Get recent posts (excluding featured)
    const recentPosts = filteredPosts
        .filter(post => !post.featured)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                            <BookOpen className="text-green-300" size={24} />
                            <span className="text-green-100 font-semibold">Blog de Salud</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Centro de Educación en Salud
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                            Más de 200 artículos sobre análisis clínicos, prevención y bienestar
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                                {normalizedPosts.length}+
                            </div>
                            <p className="text-green-100">Artículos Publicados</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                                10
                            </div>
                            <p className="text-green-100">Categorías</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                                Desde 2022
                            </div>
                            <p className="text-green-100">Contenido Nuevo Semanal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Featured Articles */}
                {featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="text-green-900" size={28} />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Artículos Destacados
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post: any) => (
                                <BlogCard key={post.id} post={post} featured />
                            ))}
                        </div>
                    </section>
                )}

                {/* Filters */}
                <BlogFilters
                    posts={normalizedPosts as any}
                    onFilterChange={setFilteredPosts}
                />

                {/* All Articles Grid */}
                <section>
                    {recentPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentPosts.map((post: any) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                No se encontraron artículos
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Intenta ajustar tus filtros de búsqueda
                            </p>
                        </div>
                    )}
                </section>

                {/* CTA Section */}
                <section className="mt-20 bg-gradient-to-r from-green-900 to-green-700 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Tienes Dudas sobre tu Salud?
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        Nuestros especialistas están listos para ayudarte con cualquier pregunta sobre tus estudios
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contacto"
                            className="px-8 py-4 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg"
                        >
                            Agendar Consulta
                        </Link>
                        <Link
                            href="/faq"
                            className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
                        >
                            Ver Preguntas Frecuentes
                        </Link>
                    </div>
                </section>

                {/* Categories Quick Links */}
                <section className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Explora por Categoría
                    </h3>
                    <div className="grid md:grid-cols-5 gap-4">
                        {Array.from(new Set(normalizedPosts.map(p => p.category))).sort().map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    const filtered = normalizedPosts.filter(p => p.category === category);
                                    setFilteredPosts(filtered);
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-center"
                            >
                                <div className="font-semibold text-gray-900 mb-1">{category}</div>
                                <div className="text-sm text-gray-600">
                                    {normalizedPosts.filter(p => p.category === category).length} artículos
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
