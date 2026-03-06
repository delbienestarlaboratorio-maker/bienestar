// Facebook Pixel & Google Analytics Tracking System
// Detects competitor visits, tracks user behavior, and enables dynamic pricing

import Cookies from 'js-cookie';

declare global {
    interface Window {
        fbq: any;
        dataLayer: any;
        gtag: any;
    }
}

interface TrackingEvent {
    event: string;
    data?: Record<string, any>;
}

interface CompetitorVisit {
    competitor: string;
    domain: string;
    timestamp: string;
}

export class PixelTracker {
    private fbPixelId: string;
    private gaTrackingId: string;
    private initialized: boolean = false;

    // Competidores conocidos
    private competitorDomains = {
        'chopo.com.mx': 'Laboratorios Chopo',
        'medicapolanco.com': 'Médica Polanco',
        'saluddigna.com': 'Salud Digna',
        'similares.com.mx': 'Farmacias Similares',
        'labpolanco.com': 'Lab Polanco'
    };

    constructor() {
        this.fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
        this.gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
    }

    /**
     * Inicializar todos los sistemas de tracking
     */
    initialize(): void {
        if (this.initialized || typeof window === 'undefined') return;

        // Verificar consentimiento de cookies
        const consent = Cookies.get('cookie_consent');
        if (consent !== 'accepted') {
            console.log('[Tracking] Esperando consentimiento de cookies');
            return;
        }

        this.initFacebookPixel();
        this.initGoogleAnalytics();
        this.detectCompetitorVisit();
        this.trackPageView();

        this.initialized = true;
        console.log('[Tracking] Sistema inicializado correctamente');
    }

    /**
     * Inicializar Facebook Pixel
     */
    private initFacebookPixel(): void {
        if (!this.fbPixelId) {
            console.warn('[FB Pixel] No pixel ID configured');
            return;
        }

        try {
            // Facebook Pixel base code
            (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod
                        ? n.callMethod.apply(n, arguments)
                        : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = true;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(
                window,
                document,
                'script',
                'https://connect.facebook.net/en_US/fbevents.js',
                undefined,
                undefined,
                undefined
            );

            window.fbq('init', this.fbPixelId);
            console.log('[FB Pixel] Inicializado correctamente');
        } catch (error) {
            console.error('[FB Pixel] Error al inicializar:', error);
        }
    }

    /**
     * Inicializar Google Analytics 4
     */
    private initGoogleAnalytics(): void {
        if (!this.gaTrackingId) {
            console.warn('[GA4] No tracking ID configured');
            return;
        }

        try {
            // Cargar script de GA4
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}`;
            script.async = true;
            document.head.appendChild(script);

            // Inicializar dataLayer
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', this.gaTrackingId, {
                send_page_view: false, // Lo haremos manualmente
                cookie_flags: 'SameSite=None;Secure'
            });

            console.log('[GA4] Inicializado correctamente');
        } catch (error) {
            console.error('[GA4] Error al inicializar:', error);
        }
    }

    /**
     * Detectar si el usuario viene de un competidor
     */
    private detectCompetitorVisit(): void {
        try {
            const referrer = document.referrer.toLowerCase();

            if (!referrer) return;

            // Buscar coincidencia con competidores
            for (const [domain, name] of Object.entries(this.competitorDomains)) {
                if (referrer.includes(domain)) {
                    this.handleCompetitorVisit(name, domain);
                    break;
                }
            }
        } catch (error) {
            console.error('[Tracking] Error detectando competidor:', error);
        }
    }

    /**
     * Manejar visita desde competidor
     */
    private handleCompetitorVisit(competitorName: string, domain: string): void {
        const visit: CompetitorVisit = {
            competitor: competitorName,
            domain: domain,
            timestamp: new Date().toISOString()
        };

        // Guardar en localStorage
        const visits = this.getCompetitorVisits();
        visits.push(visit);
        localStorage.setItem('competitor_visits', JSON.stringify(visits));

        // Track en Facebook
        if (window.fbq) {
            window.fbq('trackCustom', 'CompetitorVisit', {
                competitor_name: competitorName,
                competitor_domain: domain,
                timestamp: Date.now()
            });
        }

        // Track en Google Analytics
        if (window.gtag) {
            window.gtag('event', 'competitor_visit', {
                event_category: 'engagement',
                event_label: competitorName,
                competitor_domain: domain
            });
        }

        // Enviar a backend para análisis
        this.sendToBackend('/api/analytics/competitor-visit', {
            competitor: competitorName,
            domain: domain,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });

        console.log(`[Tracking] Visita detectada desde ${competitorName}`);
    }

    /**
     * Obtener visitas a competidores guardadas
     */
    getCompetitorVisits(): CompetitorVisit[] {
        try {
            const visits = localStorage.getItem('competitor_visits');
            return visits ? JSON.parse(visits) : [];
        } catch {
            return [];
        }
    }

    /**
     * Verificar si visitó competidor recientemente (últimas 24h)
     */
    hasRecentCompetitorVisit(): { visited: boolean; competitor?: string } {
        const visits = this.getCompetitorVisits();
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

        const recentVisit = visits.find(visit => {
            const visitTime = new Date(visit.timestamp).getTime();
            return visitTime > oneDayAgo;
        });

        return {
            visited: !!recentVisit,
            competitor: recentVisit?.competitor
        };
    }

    /**
     * Track vista de página
     */
    trackPageView(url?: string): void {
        const pageUrl = url || window.location.pathname + window.location.search;

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: pageUrl,
                page_title: document.title
            });
        }
    }

    /**
     * Track vista de estudio/producto
     */
    trackStudyView(study: {
        id: string;
        name: string;
        category: string;
        price: number;
    }): void {
        // Facebook Pixel - ViewContent
        if (window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: study.name,
                content_category: study.category,
                content_ids: [study.id],
                content_type: 'product',
                value: study.price,
                currency: 'MXN'
            });
        }

        // Google Analytics - view_item
        if (window.gtag) {
            window.gtag('event', 'view_item', {
                currency: 'MXN',
                value: study.price,
                items: [
                    {
                        item_id: study.id,
                        item_name: study.name,
                        item_category: study.category,
                        price: study.price
                    }
                ]
            });
        }
    }

    /**
     * Track agregar al carrito
     */
    trackAddToCart(study: {
        id: string;
        name: string;
        category: string;
        price: number;
        finalPrice?: number;
    }): void {
        const price = study.finalPrice || study.price;
        const discount = study.price - price;

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'AddToCart', {
                content_name: study.name,
                content_ids: [study.id],
                content_type: 'product',
                value: price,
                currency: 'MXN'
            });
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', 'add_to_cart', {
                currency: 'MXN',
                value: price,
                items: [
                    {
                        item_id: study.id,
                        item_name: study.name,
                        item_category: study.category,
                        price: price,
                        discount: discount
                    }
                ]
            });
        }
    }

    /**
     * Track inicio de checkout
     */
    trackInitiateCheckout(cartItems: any[], total: number): void {
        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'InitiateCheckout', {
                content_ids: cartItems.map(i => i.id),
                contents: cartItems.map(i => ({ id: i.id, quantity: 1 })),
                value: total,
                currency: 'MXN',
                num_items: cartItems.length
            });
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', 'begin_checkout', {
                currency: 'MXN',
                value: total,
                items: cartItems.map(i => ({
                    item_id: i.id,
                    item_name: i.name,
                    price: i.price
                }))
            });
        }
    }

    /**
     * Track compra completada
     */
    trackPurchase(orderId: string, items: any[], total: number): void {
        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'Purchase', {
                value: total,
                currency: 'MXN',
                content_ids: items.map(i => i.id),
                content_type: 'product',
                num_items: items.length
            });
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', 'purchase', {
                transaction_id: orderId,
                value: total,
                currency: 'MXN',
                tax: 0,
                shipping: 0,
                items: items.map(i => ({
                    item_id: i.id,
                    item_name: i.name,
                    price: i.price,
                    quantity: 1
                }))
            });
        }

        // Limpiar carrito abandonado
        localStorage.removeItem('cart_abandoned');
    }

    /**
     * Track evento personalizado
     */
    trackCustomEvent(eventName: string, data?: Record<string, any>): void {
        // Facebook Pixel
        if (window.fbq) {
            window.fbq('trackCustom', eventName, data);
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', eventName, data);
        }
    }

    /**
     * Enviar datos al backend
     */
    private async sendToBackend(endpoint: string, data: any): Promise<void> {
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('[Tracking] Error enviando al backend:', error);
        }
    }
}

// Singleton instance
export const pixelTracker = new PixelTracker();

// Auto-initialize en client-side
if (typeof window !== 'undefined') {
    // Esperar consentimiento de cookies
    window.addEventListener('load', () => {
        const consent = Cookies.get('cookie_consent');
        if (consent === 'accepted') {
            pixelTracker.initialize();
        }
    });
}
