import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, TestTube } from 'lucide-react';
import { getRelatedPosts } from '@/data/blog-posts';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blog'; // Import new helpers
import { BlogCard } from '@/components/blog/BlogCard';
import ReactMarkdown from 'react-markdown';
import { getBlogContent } from '@/data/blog/content-map';

// Allow on-demand rendering for slugs not pre-built
export const dynamicParams = true;

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    let description = `Artículo sobre ${post.title} - Laboratorio Del Bienestar`;

    // Try to get dynamic description from content
    if (!post.isManual) {
        const content = getPostContent(post.slug);

        if (content) {
            // Try to extract Resumen
            const summaryMatch = content.match(/\*\*Resumen\*\*:\s*([^\n]+)/);
            if (summaryMatch && summaryMatch[1]) {
                description = summaryMatch[1].trim();
            } else {
                // Fallback: Strip markdown and take first 160 chars
                const plainText = content
                    .replace(/#+\s/g, '') // Remove headers
                    .replace(/\*\*/g, '') // Remove bold
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
                    .replace(/\n+/g, ' ') // Collapse newlines
                    .slice(0, 160)
                    .trim();
                description = `${plainText}...`;
            }
        }
    } else if (post.manualContent?.excerpt) {
        description = post.manualContent.excerpt;
    }

    return {
        title: `${post.title} | Blog de Salud`,
        description: description,
        openGraph: {
            title: post.title,
            description: description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.manualContent?.author || 'Dr. Carlos M.'],
            images: [post.manualContent?.image || '/images/blog/lab-generic.jpg'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: description,
        }
    };
}

// Get blog content from the pre-built content map (works on Vercel)
function getPostContent(slug: string): string | null {
    return getBlogContent(slug);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    let content = "";
    let excerpt = "";
    let author = { name: "Dr. Carlos M.", role: "Director Médico", avatar: "/images/blog/authors/dr-carlos.jpg" };
    let image = "/images/blog/default-medical.jpg"; // Default image
    let readTime = 5; // Default read time

    const categoryImages: Record<string, string> = {
        'Salud Cardiovascular': '/images/blog/cardio-default.jpg',
        'Salud de la Mujer': '/images/blog/mujer-default.jpg',
        'Salud del Hombre': '/images/blog/hombre-default.jpg',
        'Nutrición y Vitaminas': '/images/blog/nutricion-default.jpg',
        'Análisis Clínicos': '/images/blog/microscope-default.jpg',
    };

    if (post.isManual && post.manualContent) {
        content = post.manualContent.content;
        excerpt = post.manualContent.excerpt;
        author = {
            name: post.manualContent.author,
            role: "Colaborador Médico", // Default role for manual posts
            avatar: "/images/blog/authors/default-doctor.jpg"
        };
        image = post.manualContent.image;
        readTime = post.manualContent.readTime;
    } else {
        // Load from content map
        const fsContent = getPostContent(post.slug);

        if (fsContent) {
            content = fsContent;
            excerpt = `Descubre todo sobre ${post.title}. ${post.category} - Laboratorio Del Bienestar.`;
        } else {
            // Fallback if file not generated yet
            content = `## Próximamente\n\nEstamos preparando este artículo sobre **${post.title}** para ti. ¡Vuelve pronto!`;
            excerpt = `Próximamente: Artículo sobre ${post.title}.`;
        }

        // Select image based on category
        if (categoryImages[post.category]) {
            image = categoryImages[post.category];
        } else {
            image = '/images/blog/lab-generic.jpg';
        }
    }

    const relatedPosts = getRelatedPosts(post.id, 3);

    const date = new Date(post.date); // Use 'date' property from calendar
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
                    src={image}
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
                                <span>{readTime} minutos de lectura</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} />
                                <span>{author.name}</span>
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
                        {excerpt}
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
                        {content}
                    </ReactMarkdown>
                </article>

                {/* Tags */}
                {/* Fallback tags if not present in calendar but present in manual */}
                {(post.isManual && post.manualContent?.tags?.length > 0) && (
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Tag size={20} />
                            Etiquetas
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {post.manualContent.tags.map(tag => (
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
                {(post as any).relatedStudies?.length > 0 && (
                    <div className="mb-12 bg-green-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TestTube className="text-green-900" size={24} />
                            Estudios Relacionados
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Estos análisis de laboratorio están directamente relacionados con el tema:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {(post as any).relatedStudies?.map((studySlug: string) => (
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
                            {/* JSON-LD Schema */}
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{
                                    __html: JSON.stringify({
                                        '@context': 'https://schema.org',
                                        '@type': 'Article',
                                        headline: post.title,
                                        description: excerpt,
                                        image: [image],
                                        author: {
                                            '@type': 'Person',
                                            name: author.name,
                                        },
                                        publisher: {
                                            '@type': 'Organization',
                                            name: 'Laboratorio Del Bienestar',
                                            logo: {
                                                '@type': 'ImageObject',
                                                url: 'https://laboratorio.delbienestar.com.mx/images/logo.png', // Ensure this path is correct or generic
                                            },
                                        },
                                        datePublished: post.date,
                                        dateModified: post.date, // Assuming modify date is same as publish for now
                                        mainEntityOfPage: {
                                            '@type': 'WebPage',
                                            '@id': `https://laboratorio.delbienestar.com.mx/blog/${post.slug}`,
                                        },
                                    }),
                                }}
                            />
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
        </div >
    );
}
