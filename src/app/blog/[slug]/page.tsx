import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, TestTube } from 'lucide-react';
import { blogPosts, getRelatedPosts } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/BlogCard';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map(post => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    return {
        title: `${post.title} | Blog de Salud`,
        description: post.excerpt,
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post.id, 3);

    const date = new Date(post.publishDate);
    const formattedDate = date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="relative h-96 bg-gray-900">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-4 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Volver al blog
                        </Link>

                        <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold mb-4">
                            {post.category}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{post.readTime} minutos de lectura</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} />
                                <span>{post.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Excerpt */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>

                {/* Main Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    <ReactMarkdown
                        components={{
                            h2: ({ children }) => (
                                <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">{children}</ul>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-bold text-gray-900">{children}</strong>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Tag size={20} />
                            Etiquetas
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Studies */}
                {post.relatedStudies.length > 0 && (
                    <div className="mb-12 bg-green-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TestTube className="text-green-900" size={24} />
                            Estudios Relacionados
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Estos análisis de laboratorio están directamente relacionados con el tema:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {post.relatedStudies.map(studySlug => (
                                <Link
                                    key={studySlug}
                                    href={`/estudios/${studySlug}`}
                                    className="block p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <TestTube className="text-green-900" size={24} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {studySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </div>
                                            <div className="text-sm text-green-900">Ver detalles →</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Artículos Relacionados
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">
                        ¿Este artículo te fue útil?
                    </h3>
                    <p className="text-green-100 mb-6">
                        Agenda tus análisis de laboratorio con nosotros y cuida tu salud
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-block px-8 py-4 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
                    >
                        Agendar Cita
                    </Link>
                </div>
            </div>
        </div>
    );
}
