'use client';

import { Suspense } from 'react';
import PriceComparisonWidget from './PriceComparisonWidget';
import StudyTracker from './StudyTracker';

interface StudyClientSectionProps {
    slug: string;
    name: string;
    price: number;
}

/**
 * Sección client-side de la página de estudio.
 * Encapsula el comparador de precios y el tracker de visita.
 * Se usa desde un Server Component sin restricciones.
 */
export default function StudyClientSection({ slug, name, price }: StudyClientSectionProps) {
    return (
        <>
            <Suspense fallback={
                <div className="rounded-2xl border border-emerald-200 bg-white shadow-lg overflow-hidden animate-pulse">
                    <div className="h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                        <div className="h-4 bg-gray-100 rounded w-3/5" />
                    </div>
                </div>
            }>
                <PriceComparisonWidget
                    slug={slug}
                    nombreEstudio={name}
                    precioNuestro={price}
                />
            </Suspense>
            <StudyTracker slug={slug} name={name} price={price} />
        </>
    );
}
