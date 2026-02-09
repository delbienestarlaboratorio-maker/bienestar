'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    profileImage?: string;
}

// Extended mock reviews for carousel
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
    {
        id: '4',
        author: 'Roberto Sánchez',
        rating: 5,
        text: 'Instalaciones modernas, atención rápida y precios accesibles. Lo recomiendo ampliamente para cualquier estudio.',
        date: '2024-01-20',
    },
    {
        id: '5',
        author: 'Laura Hernández',
        rating: 5,
        text: 'El mejor laboratorio de Tizayuca. Resultados confiables y el personal siempre está dispuesto a ayudar.',
        date: '2024-01-18',
    },
    {
        id: '6',
        author: 'Jorge Pérez',
        rating: 5,
        text: 'Muy profesionales. Me explicaron todo el proceso y los resultados fueron entregados a tiempo. Excelente.',
        date: '2024-01-12',
    },
];

interface TestimonialsCarouselProps {
    itemsToShow?: number;
    autoPlay?: boolean;
    interval?: number;
}

export function TestimonialsCarousel({
    itemsToShow = 3,
    autoPlay = true,
    interval = 5000
}: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    const totalSlides = Math.ceil(mockReviews.length / itemsToShow);

    useEffect(() => {
        const avg = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;
        setAverageRating(avg);
    }, []);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, totalSlides]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const getCurrentReviews = () => {
        const start = currentIndex * itemsToShow;
        return mockReviews.slice(start, start + itemsToShow);
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-8 relative">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Lo que dicen nuestros clientes
                </h2>
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
                <a
                    href="https://g.page/r/YOUR_GOOGLE_ID/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-900 hover:text-green-700 underline text-sm"
                >
                    Deja tu reseña en Google →
                </a>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Reviews Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {getCurrentReviews().map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
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

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={24} className="text-gray-900" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Siguiente"
                >
                    <ChevronRight size={24} className="text-gray-900" />
                </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
                {[...Array(totalSlides)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-green-900 w-8'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
                <a
                    href="https://www.google.com/search?q=Laboratorio+Clínico+Del+Bienestar+Tizayuca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                    <span>Ver todas las reseñas en Google →</span>
                </a>
            </div>
        </div>
    );
}

// Compact carousel for sidebars (1 at a time)
export function TestimonialsCarouselCompact() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % mockReviews.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const review = mockReviews[currentIndex];

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                    ))}
                </div>
            </div>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                "{review.text}"
            </p>
            <p className="text-xs text-gray-600 font-medium">- {review.author}</p>

            {/* Dots */}
            <div className="flex justify-center gap-1 mt-4">
                {mockReviews.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-green-900' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
