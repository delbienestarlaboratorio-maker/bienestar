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

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow p-8 mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {study.name || 'Estudio'}
                        </h1>

                        {/* Price */}
                        <div className="text-3xl font-bold text-blue-600 mb-6">
                            ${formattedPrice} MXN
                        </div>

                        {/* Description */}
                        {study.description && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Descripción</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {study.description}
                                </p>
                            </div>
                        )}

                        {/* Preparation */}
                        {study.preparation && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Preparación</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {study.preparation}
                                </p>
                            </div>
                        )}

                        {/* Turnaround Time */}
                        {study.turnaroundTime && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tiempo de Entrega</h2>
                                <p className="text-gray-700">
                                    {study.turnaroundTime}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex gap-4 mt-8">
                            <a
                                href="https://wa.me/527716854026"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Agendar por WhatsApp
                            </a>
                            <a
                                href="tel:7716854026"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Llamar Ahora
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
