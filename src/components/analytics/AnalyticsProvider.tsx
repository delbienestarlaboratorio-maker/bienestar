'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initFacebookPixel, initGoogleAnalytics, analytics } from '@/lib/analytics';
import { visitorIntelligence } from '@/lib/tracking/visitor-intelligence';

export function AnalyticsProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize tracking pixels on mount
        initFacebookPixel();
        initGoogleAnalytics();

        // Initialize visitor intelligence globally
        visitorIntelligence?.initialize();
    }, []);

    useEffect(() => {
        // Track page views on route change
        if (pathname) {
            analytics.pageView(pathname);
        }
    }, [pathname]);

    return null;
}
