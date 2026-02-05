'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initFacebookPixel, initGoogleAnalytics, analytics } from '@/lib/analytics';

export function AnalyticsProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize tracking pixels on mount
        initFacebookPixel();
        initGoogleAnalytics();
    }, []);

    useEffect(() => {
        // Track page views on route change
        if (pathname) {
            analytics.pageView(pathname);
        }
    }, [pathname]);

    return null;
}
