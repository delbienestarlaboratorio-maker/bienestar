'use client';

import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false MUST be in a client component
export const DynamicPrice = dynamic(
    () => import('@/components/pricing/DynamicPrice').then(mod => ({ default: mod.DynamicPrice })),
    {
        ssr: false,
        loading: () => (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="animate-pulse text-center">
                    <div className="h-12 bg-gray-200 rounded mb-2 mx-auto w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
            </div>
        )
    }
);

export const UrgencyIndicators = dynamic(
    () => import('@/components/pricing/UrgencyIndicators').then(mod => ({ default: mod.UrgencyIndicators })),
    { ssr: false }
);
