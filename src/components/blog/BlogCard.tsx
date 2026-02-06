'use client';

import { BlogPost } from '@/data/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
    const date = new Date(post.publishDate);
    const formattedDate = date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
                    <div className="relative h-80overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-900'}`}>
                                {post.category}
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
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{post.readTime} min</span>
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
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${categoryColors[post.category] || 'bg-gray-100 text-gray-900'}`}>
                        {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-900 transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
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
                                <span>{post.readTime} min</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-green-900 font-semibold group-hover:gap-2 transition-all">
                            Leer <ArrowRight size={14} />
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
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
