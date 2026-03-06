'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
    const GA_MEASUREMENT_ID = 'G-K837C6WH09';

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    );
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
    }
}

// Predefined conversion events
export const GAEvents = {
    // Conversiones críticas
    clickWhatsApp: (source: string) => trackEvent('click_whatsapp', {
        event_category: 'conversion',
        event_label: source,
        value: 1
    }),

    clickPhone: (source: string) => trackEvent('click_phone', {
        event_category: 'conversion',
        event_label: source,
        value: 1
    }),

    // Búsqueda de estudios
    searchStudy: (searchTerm: string) => trackEvent('search', {
        search_term: searchTerm,
        event_category: 'engagement'
    }),

    // Visualización de paquetes
    viewPackage: (packageName: string) => trackEvent('view_package', {
        package_name: packageName,
        event_category: 'engagement'
    }),

    // Visualización de estudios
    viewStudy: (studyName: string) => trackEvent('view_study', {
        study_name: studyName,
        event_category: 'engagement'
    }),

    // Lectura de blog
    readBlogPost: (postTitle: string) => trackEvent('read_blog', {
        article_title: postTitle,
        event_category: 'engagement'
    }),

    // Navegación
    viewSucursal: (sucursalName: string) => trackEvent('view_sucursal', {
        sucursal: sucursalName,
        event_category: 'engagement'
    })
};
