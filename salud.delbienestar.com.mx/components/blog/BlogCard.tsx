'use client';

import { BlogPost } from '@/data/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

// Category-themed gradients and emojis for placeholder images
const categoryThemes: Record<string, { gradient: string; emoji: string }> = {
    'Análisis Clínicos': { gradient: 'from-blue-600 to-blue-800', emoji: '🔬' },
    'Hormonas y Metabolismo': { gradient: 'from-purple-600 to-purple-800', emoji: '⚗️' },
    'Salud Cardiovascular': { gradient: 'from-red-500 to-red-700', emoji: '❤️' },
    'Salud de la Mujer': { gradient: 'from-pink-500 to-pink-700', emoji: '👩‍⚕️' },
    'Salud del Hombre': { gradient: 'from-indigo-600 to-indigo-800', emoji: '👨‍⚕️' },
    'Nutrición y Vitaminas': { gradient: 'from-green-500 to-green-700', emoji: '🥗' },
    'Prevención y Check-ups': { gradient: 'from-teal-500 to-teal-700', emoji: '🩺' },
    'Enfermedades Crónicas': { gradient: 'from-orange-500 to-orange-700', emoji: '💊' },
    'Interpretación de Resultados': { gradient: 'from-cyan-500 to-cyan-700', emoji: '📊' },
    'Salud General': { gradient: 'from-emerald-500 to-emerald-700', emoji: '🏥' },
};

const PlaceholderImage = ({ category, title }: { category: string; title: string }) => {
    const theme = categoryThemes[category] || { gradient: 'from-gray-500 to-gray-700', emoji: '📋' };
    return (
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
            <div className="text-center opacity-80">
                <div className="text-5xl mb-2">{theme.emoji}</div>
                <p className="text-white/60 text-xs font-medium px-4 line-clamp-2 max-w-[200px]">{title}</p>
            </div>
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-8 h-8 border border-white rounded-full" />
            </div>
        </div>
    );
};

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
    const date = new Date(post.publishDate || (post as any).date);
    const formattedDate = date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const hasValidImage = post.image && !post.image.includes('/blog/') && post.image.startsWith('/');
    const category = post.category || 'Salud General';

    const categoryColors: Record<string, string> = {
        'Análisis Clínicos': 'bg-blue-100 text-blue-900',
        'Hormonas y Metabolismo': 'bg-purple-100 text-purple-900',
        'Salud Cardiovascular': 'bg-red-100 text-red-900',
        'Salud de la Mujer': 'bg-pink-100 text-pink-900',
        'Salud del Hombre': 'bg-indigo-100 text-indigo-900',
        'Nutrición y Vitaminas': 'bg-green-100 text-green-900',
        'Prevención y Check-ups': 'bg-teal-100 text-teal-900',
        'Enfermedades Crónicas': 'bg-orange-100 text-orange-900',
        'Interpretación de Resultados': 'bg-cyan-100 text-cyan-900',
        'Salud General': 'bg-gray-100 text-gray-900',
    };

    if (featured) {
        return (
            <Link href={`/blog/${post.slug}`}>
                <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-80 overflow-hidden">
                        {hasValidImage ? (
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <PlaceholderImage category={category} title={post.title} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryColors[category] || 'bg-gray-100 text-gray-900'}`}>
                                {category}
                            </span>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            ⭐ DESTACADO
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-3xl font-bold mb-3 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-lg opacity-90 line-clamp-2 mb-4">
                                {post.excerpt || `Artículo sobre ${post.title}`}
                            </p>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{post.readTime || 5} min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    {hasValidImage ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <PlaceholderImage category={category} title={post.title} />
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${categoryColors[category] || 'bg-gray-100 text-gray-900'}`}>
                        {category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-900 transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt || `Artículo sobre ${post.title}`}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{post.readTime || 5} min</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-green-900 font-semibold group-hover:gap-2 transition-all">
                            Leer <ArrowRight size={14} />
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <Tag size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
