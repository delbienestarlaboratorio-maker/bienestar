'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getVariedReviews, StudyCategory } from '@/data/testimonials/reviews-pool';
import type { Review } from '@/data/testimonials/reviews-pool';

interface StudyTestimonialsProps {
    studyCategory: StudyCategory;
    studyName?: string;
}

export function StudyTestimonials({ studyCategory, studyName }: StudyTestimonialsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Get 5-6 varied reviews for this study
        const studyReviews = getVariedReviews(studyCategory, 6);
        setReviews(studyReviews);
    }, [studyCategory]);

    if (reviews.length === 0) return null;

    const currentReview = reviews[currentIndex];

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    // Auto-rotate every 6 seconds
    useEffect(() => {
        const timer = setInterval(nextReview, 6000);
        return () => clearInterval(timer);
    }, [currentIndex, reviews.length]);

    return (
        <div className="bg-green-50 rounded-xl p-6 shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Lo que dicen nuestros pacientes
                </h3>
                <div className="flex gap-1">
                    {reviews.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-green-900 w-4' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Review Card */}
            <div className="relative min-h-[180px]">
                <div key={currentReview.id} className="animate-fade-in">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                        {[...Array(currentReview.rating)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        "{currentReview.text}"
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {currentReview.author.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {currentReview.author}
                                </p>
                                <p className="text-xs text-gray-500" suppressHydrationWarning>
                                    {new Date(currentReview.date).toLocaleDateString('es-MX', {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-2">
                            <button
                                onClick={prevReview}
                                className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Anterior reseña"
                            >
                                <ChevronLeft size={16} className="text-gray-700" />
                            </button>
                            <button
                                onClick={nextReview}
                                className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Siguiente reseña"
                            >
                                <ChevronRight size={16} className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Counter */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">
                    Reseña {currentIndex + 1} de {reviews.length}
                </p>
            </div>

            {/* Google Reviews Link */}
            <div className="mt-4 pt-4 border-t border-green-200">
                <a
                    href="https://www.google.com/search?q=Laboratorio+Clínico+Del+Bienestar+Tizayuca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-900 hover:text-green-700 font-medium block text-center"
                >
                    Ver todas las reseñas en Google →
                </a>
            </div>
        </div>
    );
}

// Compact version for inline placement
export function StudyTestimonialsCompact({ studyCategory }: StudyTestimonialsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const studyReviews = getVariedReviews(studyCategory, 3);
        setReviews(studyReviews);
    }, [studyCategory]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    if (reviews.length === 0) return null;

    const review = reviews[currentIndex];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>
                <span className="text-xs text-gray-600">
                    {review.author}
                </span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
                "{review.text}"
            </p>
        </div>
    );
}
