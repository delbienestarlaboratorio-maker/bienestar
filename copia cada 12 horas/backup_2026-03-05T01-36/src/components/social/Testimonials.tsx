'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    profileImage?: string;
}

// Mock reviews - Replace with real Google Reviews API later
const mockReviews: Review[] = [
    {
        id: '1',
        author: 'María González',
        rating: 5,
        text: 'Excelente servicio, resultados rápidos y personal muy profesional. El laboratorio está muy limpio y bien equipado.',
        date: '2024-01-15',
    },
    {
        id: '2',
        author: 'Carlos Ramírez',
        rating: 5,
        text: 'Me atendieron muy bien, los precios son justos y los resultados llegaron en menos de 24 horas. Muy recomendable.',
        date: '2024-01-10',
    },
    {
        id: '3',
        author: 'Ana Martínez',
        rating: 5,
        text: 'Siempre vengo aquí para mis análisis. El personal es amable y los estudios son muy precisos. ¡5 estrellas!',
        date: '2024-01-05',
    },
];

interface TestimonialsProps {
    limit?: number;
    showRating?: boolean;
}

export function Testimonials({ limit = 3, showRating = true }: TestimonialsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // For now, use mock data
        // TODO: Integrate with Google My Business API
        const displayReviews = mockReviews.slice(0, limit);
        setReviews(displayReviews);

        const avg = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;
        setAverageRating(avg);
    }, [limit]);

    if (reviews.length === 0) return null;

    return (
        <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Lo que dicen nuestros clientes
                </h2>
                {showRating && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={24}
                                    className={i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                />
                            ))}
                        </div>
                        <span className="text-xl font-semibold text-gray-900">
                            {averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-600">
                            ({mockReviews.length} reseñas)
                        </span>
                    </div>
                )}
                <a
                    href="https://g.page/r/YOUR_GOOGLE_ID/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-900 hover:text-green-700 underline text-sm"
                >
                    Deja tu reseña en Google →
                </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-900 font-semibold text-lg">
                                    {review.author.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{review.author}</h3>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                            {review.text}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <a
                    href="https://www.google.com/search?q=Laboratorio+Clínico+Del+Bienestar+Tizayuca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <span>Ver todas las reseñas en</span>
                    <svg className="w-20 h-auto" viewBox="0 0 272 92" fill="none">
                        <text x="0" y="60" fontSize="60" fontWeight="bold" fill="currentColor">Google</text>
                    </svg>
                </a>
            </div>
        </div>
    );
}

// Compact version for sidebars
export function TestimonialsCompact() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <span className="font-semibold text-gray-900">4.9</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
                "Excelente servicio, resultados rápidos y personal muy profesional."
            </p>
            <p className="text-xs text-gray-600 mb-4">- María G.</p>
            <a
                href="https://g.page/r/YOUR_GOOGLE_ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-900 hover:text-green-700 font-medium"
            >
                Leer más reseñas →
            </a>
        </div>
    );
}
