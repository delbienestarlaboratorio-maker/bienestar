import { notFound } from 'next/navigation';
import studiesData from '@/data/studies.json';

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
        const study = studiesData.find((s: any) =>
            s.slug === slug && s.categoryId === categoria
        );

        if (!study) {
            notFound();
        }

        const price = study.pricePromotional || study.priceRegular || 0;
        const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';

        // Parse FAQs and Reviews if they're JSON strings
        let faqs = [];
        let reviews = [];
        try {
            faqs = typeof study.faqs === 'string' ? JSON.parse(study.faqs) : (study.faqs || []);
            reviews = typeof study.reviews === 'string' ? JSON.parse(study.reviews) : (study.reviews || []);
        } catch (e) {
            // If parsing fails, use empty arrays
        }

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {study.name || 'Estudio'}
                        </h1>

                        {/* Price */}
                        <div className="text-3xl font-bold text-blue-600 mb-6">
                            ${formattedPrice} MXN
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <a
                                href="https://wa.me/527716854026"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                            >
                                📱 Agendar por WhatsApp
                            </a>
                            <a
                                href="tel:7716854026"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                            >
                                📞 Llamar Ahora
                            </a>
                        </div>
                    </div>

                    {/* What Is It */}
                    {study.whatIsIt && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                ¿Qué es?
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.whatIsIt}
                            </div>
                        </div>
                    )}

                    {/* Description (si no hay whatIsIt) */}
                    {!study.whatIsIt && study.description && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Descripción
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.description}
                            </div>
                        </div>
                    )}

                    {/* What Does It Detect */}
                    {study.whatDoesItDetect && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                ¿Qué detecta?
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.whatDoesItDetect}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {study.benefits && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Beneficios
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.benefits}
                            </div>
                        </div>
                    )}

                    {/* Preparation */}
                    {(study.detailedPreparation || study.preparation) && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Preparación
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.detailedPreparation || study.preparation}
                            </div>
                        </div>
                    )}

                    {/* What's Included */}
                    {study.included && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                ¿Qué incluye?
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.included}
                            </div>
                        </div>
                    )}

                    {/* Turnaround Time */}
                    {study.turnaroundTime && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Tiempo de Entrega
                            </h2>
                            <div className="text-gray-700">
                                {study.turnaroundTime}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {faqs.length > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Preguntas Frecuentes
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq: any, index: number) => (
                                    <details key={index} className="border-b border-gray-200 pb-4">
                                        <summary className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                                            {faq.question || faq.q}
                                        </summary>
                                        <div className="mt-3 text-gray-700 leading-relaxed pl-4">
                                            {faq.answer || faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {reviews.length > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Opiniones de Pacientes
                            </h2>
                            <div className="space-y-6">
                                {reviews.map((review: any, index: number) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        {/* Stars */}
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < (review.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        {/* Review text */}
                                        <p className="text-gray-700 italic mb-2">
                                            "{review.text || review.comment}"
                                        </p>
                                        {/* Author */}
                                        {review.author && (
                                            <p className="text-sm text-gray-600">
                                                — {review.author}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Final CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            ¿Listo para agendar tu {study.name}?
                        </h2>
                        <p className="text-xl mb-6">
                            Precio: ${formattedPrice} MXN
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/527716854026"
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-colors inline-block text-lg"
                            >
                                📱 Agendar por WhatsApp
                            </a>
                            <a
                                href="tel:7716854026"
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-colors inline-block text-lg"
                            >
                                📞 Llamar: 771 685 4026
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading study:', error);
        notFound();
    }
}
