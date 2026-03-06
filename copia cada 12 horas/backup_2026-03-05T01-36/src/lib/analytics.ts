// Analytics tracking library for Meta Pixel and Google Analytics
// This enables retargeting like Expedia/Booking.com

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Meta Pixel
export const initFacebookPixel = () => {
    if (typeof window !== 'undefined' && FB_PIXEL_ID) {
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        window.fbq!('init', FB_PIXEL_ID);
        window.fbq!('track', 'PageView');
    }
};

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
    if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer!.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);
    }
};

// Track events
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    // Meta Pixel
    if (window.fbq) {
        window.fbq('track', eventName, data);
    }

    // Google Analytics
    if (window.gtag) {
        window.gtag('event', eventName, data);
    }

    // Console log for debugging
    console.log('[Analytics]', eventName, data);
};

// Predefined events for laboratory website
export const analytics = {
    // Page view (automatic)
    pageView: (pageName: string) => {
        trackEvent('PageView', { page_name: pageName });
    },

    // Study detail view
    viewStudy: (studyName: string, category: string, price: number) => {
        trackEvent('ViewContent', {
            content_name: studyName,
            content_category: category,
            value: price,
            currency: 'MXN',
        });
    },

    // User clicks "Agendar Cita" button
    initiateAppointment: (studyName: string, price: number) => {
        trackEvent('InitiateCheckout', {
            content_name: studyName,
            value: price,
            currency: 'MXN',
        });
    },

    // User searches for a study
    search: (searchTerm: string) => {
        trackEvent('Search', {
            search_string: searchTerm,
        });
    },

    // User clicks WhatsApp button
    contactWhatsApp: (studyName?: string) => {
        trackEvent('Contact', {
            method: 'whatsapp',
            content_name: studyName || 'general',
        });
    },

    // User clicks phone number
    contactPhone: () => {
        trackEvent('Contact', {
            method: 'phone',
        });
    },

    // Conversion: User completes appointment booking
    completeAppointment: (studyName: string, price: number) => {
        trackEvent('Purchase', {
            content_name: studyName,
            value: price,
            currency: 'MXN',
        });
    },
};
