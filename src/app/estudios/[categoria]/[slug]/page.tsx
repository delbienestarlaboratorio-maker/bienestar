import { notFound } from 'next/navigation';
import studiesData from '@/data/studies.json';
import BuyButton from '@/components/BuyButton';

// Use ISR - pages generated on-demand and cached
export const dynamic = 'force-dynamic';
export const revalidate = false; // Cache permanently

interface PageProps {
    params: Promise<{
        categoria: string;
        slug: string;
    }>;
}

export default async function StudyDetailPage({ params }: PageProps) {
    try {
        const { categoria, slug } = await params;

        // Find study from static JSON data
        const studyData: any = studiesData.find((s: any) =>
            s.slug === slug && s.categoryId === categoria
        );

        if (!studyData) {
            notFound();
        }

        const study = studyData;
        const price = study.pricePromotional || study.priceRegular || 0;
        const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';


        // Parse FAQs, Reviews, and Benefits if they're JSON strings or arrays
        let faqs: any[] = [];
        let reviews: any[] = [];
        let benefits: any[] = [];
        try {
            faqs = typeof study.faqs === 'string' ? JSON.parse(study.faqs) : (Array.isArray(study.faqs) ? study.faqs : []);
            reviews = typeof study.reviews === 'string' ? JSON.parse(study.reviews) : (Array.isArray(study.reviews) ? study.reviews : []);
            benefits = typeof study.benefits === 'string' ? JSON.parse(study.benefits) : (Array.isArray(study.benefits) ? study.benefits : []);
        } catch (e) {
            // If parsing fails, use empty arrays
            console.error('Error parsing study data:', e);
        }

        // Get benefits text (could be array with single text or just array of strings)
        const benefitsText = Array.isArray(benefits) && benefits.length > 0
            ? (typeof benefits[0] === 'string' ? benefits[0] : benefits.join(' '))
            : '';

        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
                {/* Hero Section with Premium Gradient */}
                <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white py-16 mb-12 overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative max-w-6xl mx-auto px-4">
                        <div className="flex items-start gap-5 mb-8">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-2xl ring-2 ring-white/30">
                                🔬
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                                        {study.categoryId}
                                    </span>
                                    {study.turnaroundTime && (
                                        <span className="px-4 py-1.5 bg-emerald-500/40 backdrop-blur-md rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                                            <span className="text-lg">⏱️</span> {study.turnaroundTime}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                                    {study.name || 'Estudio'}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mt-8">
                            <div className="bg-white/15 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl ring-2 ring-white/20">
                                <div className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-1">Precio</div>
                                <div className="text-5xl font-extrabold">
                                    ${formattedPrice} <span className="text-2xl font-semibold text-white/90">MXN</span>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-1 flex-wrap">
                                <BuyButton studyName={study.name} price={price} />
                                <a
                                    href="https://wa.me/527716854026"
                                    className="flex-1 min-w-[150px] bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                                >
                                    <span className="text-xl">📱</span>
                                    <span>WhatsApp</span>
                                </a>
                                <a
                                    href="tel:7716854026"
                                    className="flex-1 min-w-[150px] bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                                >
                                    <span className="text-xl">📞</span>
                                    <span>Llamar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 pb-12">

                    {/* What Is It / Description */}
                    {(study.whatIsIt || study.description) && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                                    ℹ️
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    ¿Qué es este estudio?
                                </h2>
                            </div>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                    {study.whatIsIt || study.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* What Does It Detect */}
                    {study.whatDoesItDetect && (
                        <div className="mb-16 group">
                            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 border border-gray-100 hover:border-purple-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        🔍
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                                            ¿Qué detecta?
                                        </h2>
                                        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <div className="text-lg text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
                                    {study.whatDoesItDetect}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Benefits - Visual Cards if available */}
                    {benefitsText && (
                        <div className="mb-16 group">
                            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 border border-gray-100 hover:border-emerald-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        ✨
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            Beneficios
                                        </h2>
                                        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <div className="text-lg text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
                                    {benefitsText}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preparation with Icons */}
                    {(study.detailedPreparation || study.preparation) && (
                        <div className="mb-16 group">
                            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 border border-gray-100 hover:border-amber-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        📋
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                            Preparación
                                        </h2>
                                        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {(study.detailedPreparation || study.preparation).split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4 bg-amber-50/50 rounded-xl p-4 hover:bg-amber-50 transition-colors">
                                            <span className="text-amber-600 text-2xl mt-0.5">•</span>
                                            <span className="text-lg text-gray-700 flex-1">{line.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* What's Included */}
                    {study.included && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                                    📦
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    ¿Qué incluye?
                                </h2>
                            </div>
                            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                {study.included}
                            </div>
                        </div>
                    )}

                    {/* FAQs - Enhanced Accordion */}
                    {faqs.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">
                                    💬
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Preguntas Frecuentes
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq: any, index: number) => (
                                    <details key={index} className="group border-l-4 border-blue-500 bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                                        <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <span className="text-blue-600">Q{index + 1}:</span>
                                                <span>{faq.question || faq.q}</span>
                                            </span>
                                            <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="mt-3 text-gray-700 leading-relaxed pl-8">
                                            {faq.answer || faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {reviews.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">
                                    ⭐
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Opiniones de Pacientes
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {reviews.map((review: any, index: number) => (
                                    <div key={index} className="border-l-4 border-yellow-400 bg-yellow-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        {/* Stars */}
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-2xl ${i < (review.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-3 italic">"{review.text || review.comment}"</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {(review.author || 'A')[0].toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-900">{review.author || 'Anónimo'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Floating CTA Button */}
                    <div className="fixed bottom-6 right-6 z-50">
                        <a
                            href="https://wa.me/527716854026"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                        >
                            <span className="text-2xl">📱</span>
                            <span className="hidden md:inline">Agendar Ahora</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error rendering study page:', error);
        notFound();
    }
}
