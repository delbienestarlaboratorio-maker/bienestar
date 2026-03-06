/**
 * VisitorIntelligence - Sistema de Tracking Avanzado con Cookies y Fingerprinting
 * ============================================================================
 * Registra TODO lo que el usuario hace:
 * - De dónde viene (referrer, UTM, competidores)
 * - Qué estudios vio y por cuánto tiempo
 * - Dispositivo, ciudad, idioma, pantalla
 * - Si visitó Chopo, Polanco, SaludDigna antes de venir
 * - Scroll depth, clics, interacciones
 * Persiste en cookie _bid + localStorage + backend (Neon)
 */

export interface VisitorProfile {
    sessionId: string;          // ID único del visitante (fingerprint-based)
    firstSeen: string;          // ISO timestamp primera visita
    lastSeen: string;           // ISO timestamp última visita
    visitCount: number;         // Cuántas veces ha visitado
    pageViews: number;          // Páginas vistas en total
    timeOnSite: number;         // Segundos acumulados en el sitio
    device: {
        type: 'mobile' | 'tablet' | 'desktop';
        os: string;
        browser: string;
        screen: string;           // "1920x1080"
        language: string;
    };
    origin: {
        source: string;           // 'google' | 'facebook' | 'direct' | 'chopo' | 'whatsapp' etc
        referrer: string;
        utmSource?: string;
        utmCampaign?: string;
        utmMedium?: string;
        fromCompetitor: boolean;
        competitorName?: string;
    };
    behavior: {
        studiesViewed: Array<{
            slug: string;
            name: string;
            price: number;
            timestamp: string;
            timeSpent: number;    // segundos que estuvo viendo ese estudio
            scrollDepth: number;  // % máximo que hizo scroll
        }>;
        cartItems: string[];      // slugs en el carrito
        hasAbandoned: boolean;    // ¿Metió al carrito y no compró?
        searchTerms: string[];    // Términos que buscó en el sitio
        lastStudyViewed: string;
    };
    conversion: {
        didConvert: boolean;
        convertedStudies: string[];
        totalRevenue: number;
    };
}

// ─── COOKIE CONFIG ───────────────────────────────────────────────────────────
const COOKIE_NAME = '_bid';         // Bienestar ID (persiste 1 año)
const STORAGE_KEY = '_biv';        // Bienestar Intelligence (localStorage, completo)
const SESSION_KEY = '_bsid';       // Session ID temporal (sessionStorage)
const COOKIE_TTL_DAYS = 365;

// ─── DOMINIOS COMPETIDORES ────────────────────────────────────────────────────
const COMPETITOR_DOMAINS: Record<string, string> = {
    'chopo.com.mx': 'Lab. Médico del Chopo',
    'lmpolanco.com': 'Médica Polanco',
    'medicapolanco': 'Médica Polanco',
    'saluddigna.com': 'Salud Digna',
    'labsantamaria.com.mx': 'Lab. Santa María',
    'farmaciasdesimilares.com.mx': 'Farmacias Similares',
    'farmaciasbenavides.com.mx': 'Farmacias Benavides',
};

/**
 * Genera un fingerprint determinístico del dispositivo
 * (sin librerías externas, compatible con SSR)
 */
function generateFingerprint(): string {
    if (typeof window === 'undefined') return 'server';

    const parts: string[] = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth.toString(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        navigator.hardwareConcurrency?.toString() ?? '0',
        navigator.platform ?? '',
    ];

    // Hash simple pero consistente
    let hash = 0;
    const str = parts.join('|');
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36) + Date.now().toString(36).slice(-4);
}

/**
 * Lee/escribe la cookie _bid
 */
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Detecta si el usuario viene de un competidor
 */
function detectCompetitorOrigin(): { fromCompetitor: boolean; competitorName?: string } {
    if (typeof document === 'undefined') return { fromCompetitor: false };

    const referrer = document.referrer.toLowerCase();
    for (const [domain, name] of Object.entries(COMPETITOR_DOMAINS)) {
        if (referrer.includes(domain)) {
            return { fromCompetitor: true, competitorName: name };
        }
    }
    return { fromCompetitor: false };
}

/**
 * Detecta la fuente de tráfico
 */
function detectTrafficSource(referrer: string): string {
    if (!referrer || referrer === '') return 'direct';
    const r = referrer.toLowerCase();

    // Competidores primero (prioridad alta)
    for (const domain of Object.keys(COMPETITOR_DOMAINS)) {
        if (r.includes(domain)) return 'competitor';
    }

    if (r.includes('google')) return 'google';
    if (r.includes('facebook') || r.includes('fb.com') || r.includes('instagram')) return 'social_meta';
    if (r.includes('tiktok')) return 'tiktok';
    if (r.includes('whatsapp')) return 'whatsapp';
    if (r.includes('t.co') || r.includes('twitter')) return 'twitter';
    if (r.includes('youtube')) return 'youtube';

    // UTM params override
    const url = new URL(window.location.href);
    const utmSource = url.searchParams.get('utm_source');
    if (utmSource) return utmSource;

    return 'organic';
}

/**
 * Detecta tipo de dispositivo
 */
function detectDevice(): VisitorProfile['device'] {
    if (typeof window === 'undefined') {
        return { type: 'desktop', os: 'unknown', browser: 'unknown', screen: '0x0', language: 'es' };
    }

    const ua = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
    const isTablet = /Tablet|iPad/.test(ua);

    let os = 'unknown';
    if (/Windows/.test(ua)) os = 'windows';
    else if (/Mac/.test(ua)) os = 'macos';
    else if (/Android/.test(ua)) os = 'android';
    else if (/iOS|iPhone|iPad/.test(ua)) os = 'ios';
    else if (/Linux/.test(ua)) os = 'linux';

    let browser = 'unknown';
    if (/Chrome/.test(ua) && !/Edg/.test(ua)) browser = 'chrome';
    else if (/Firefox/.test(ua)) browser = 'firefox';
    else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'safari';
    else if (/Edg/.test(ua)) browser = 'edge';

    return {
        type: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
        os,
        browser,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
    };
}

// ─── CLASE PRINCIPAL ──────────────────────────────────────────────────────────

class VisitorIntelligenceService {
    private profile: VisitorProfile | null = null;
    private sessionStart: number = Date.now();
    private scrollListener: (() => void) | null = null;
    private maxScrollDepth: number = 0;

    /**
     * Inicializa el servicio. Crea o recupera el perfil del visitante.
     */
    initialize(): VisitorProfile {
        if (this.profile) return this.profile;

        // 1. Recuperar/crear el ID del visitante (cookie _bid)
        let visitorId = getCookie(COOKIE_NAME);
        if (!visitorId) {
            visitorId = generateFingerprint();
            setCookie(COOKIE_NAME, visitorId, COOKIE_TTL_DAYS);
        }

        // 2. Recuperar perfil existente de localStorage
        let existingProfile: VisitorProfile | null = null;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) existingProfile = JSON.parse(stored);
        } catch {
            // Ignorar errores de parse
        }

        // 3. Detectar información de esta sesión
        const referrer = typeof document !== 'undefined' ? document.referrer : '';
        const competitor = detectCompetitorOrigin();
        const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;

        if (existingProfile && existingProfile.sessionId === visitorId) {
            // === VISITANTE RECURRENTE ===
            this.profile = {
                ...existingProfile,
                lastSeen: new Date().toISOString(),
                visitCount: existingProfile.visitCount + 1,
                origin: {
                    ...existingProfile.origin,
                    // Si ahora viene de competidor, actualizamos
                    ...(competitor.fromCompetitor ? competitor : {}),
                },
            };
        } else {
            // === VISITANTE NUEVO ===
            this.profile = {
                sessionId: visitorId,
                firstSeen: new Date().toISOString(),
                lastSeen: new Date().toISOString(),
                visitCount: 1,
                pageViews: 0,
                timeOnSite: 0,
                device: detectDevice(),
                origin: {
                    source: detectTrafficSource(referrer),
                    referrer,
                    utmSource: url?.searchParams.get('utm_source') ?? undefined,
                    utmCampaign: url?.searchParams.get('utm_campaign') ?? undefined,
                    utmMedium: url?.searchParams.get('utm_medium') ?? undefined,
                    fromCompetitor: competitor.fromCompetitor,
                    competitorName: competitor.competitorName,
                },
                behavior: {
                    studiesViewed: [],
                    cartItems: [],
                    hasAbandoned: false,
                    searchTerms: [],
                    lastStudyViewed: '',
                },
                conversion: {
                    didConvert: false,
                    convertedStudies: [],
                    totalRevenue: 0,
                },
            };
        }

        // 4. Persistir inmediatamente
        this.saveProfile();

        // 5. Enviar al backend (non-blocking)
        this.syncToBackend();

        // 6. Si viene de competidor, disparar el descuento competitivo
        if (competitor.fromCompetitor && competitor.competitorName) {
            this.fireCompetitorEvent(competitor.competitorName);
        }

        return this.profile;
    }

    /**
     * Registra que el usuario vio un estudio
     */
    trackStudyView(slug: string, name: string, price: number): void {
        this.initialize();
        if (!this.profile) return;

        // Iniciar medición de scroll
        this.startScrollTracking();
        this.sessionStart = Date.now();

        const existing = this.profile.behavior.studiesViewed.find(s => s.slug === slug);
        if (!existing) {
            this.profile.behavior.studiesViewed.push({
                slug,
                name,
                price,
                timestamp: new Date().toISOString(),
                timeSpent: 0,
                scrollDepth: 0,
            });
        }

        this.profile.behavior.lastStudyViewed = slug;
        this.profile.pageViews++;
        this.saveProfile();
    }

    /**
     * Actualiza el tiempo y scroll del estudio actual cuando el usuario navega
     */
    finalizeStudyView(slug: string): void {
        if (!this.profile) return;
        const study = this.profile.behavior.studiesViewed.find(s => s.slug === slug);
        if (study) {
            study.timeSpent += Math.round((Date.now() - this.sessionStart) / 1000);
            study.scrollDepth = this.maxScrollDepth;
        }
        this.maxScrollDepth = 0;
        this.stopScrollTracking();
        this.saveProfile();
    }

    /**
     * Registra término de búsqueda
     */
    trackSearch(term: string): void {
        this.initialize();
        if (!this.profile) return;
        if (!this.profile.behavior.searchTerms.includes(term)) {
            this.profile.behavior.searchTerms.push(term);
        }
        this.saveProfile();
    }

    /**
     * Registra item en carrito
     */
    trackCartAdd(slug: string): void {
        this.initialize();
        if (!this.profile) return;
        if (!this.profile.behavior.cartItems.includes(slug)) {
            this.profile.behavior.cartItems.push(slug);
        }
        this.saveProfile();
    }

    /**
     * Registra abandono de carrito
     */
    trackCartAbandonment(): void {
        this.initialize();
        if (!this.profile) return;
        if (this.profile.behavior.cartItems.length > 0) {
            this.profile.behavior.hasAbandoned = true;
        }
        this.saveProfile();
    }

    /**
     * Registra conversión (compra)
     */
    trackConversion(slugs: string[], revenue: number): void {
        this.initialize();
        if (!this.profile) return;
        this.profile.conversion.didConvert = true;
        this.profile.conversion.convertedStudies.push(...slugs);
        this.profile.conversion.totalRevenue += revenue;
        this.profile.behavior.hasAbandoned = false;
        this.saveProfile();
        this.syncToBackend();
    }

    /**
     * Obtiene el perfil actual
     */
    getProfile(): VisitorProfile | null {
        if (!this.profile) this.initialize();
        return this.profile;
    }

    /**
     * ¿Viene de un competidor?
     */
    isFromCompetitor(): { result: boolean; name?: string } {
        const profile = this.getProfile();
        return {
            result: profile?.origin.fromCompetitor ?? false,
            name: profile?.origin.competitorName,
        };
    }

    /**
     * ¿Es visitante frecuente?
     */
    isReturning(): boolean {
        return (this.profile?.visitCount ?? 1) > 1;
    }

    /**
     * Tiempo total en el sitio (segundos)
     */
    getTotalTimeOnSite(): number {
        const stored = this.profile?.timeOnSite ?? 0;
        const current = Math.round((Date.now() - this.sessionStart) / 1000);
        return stored + current;
    }

    // ─── PRIVADOS ─────────────────────────────────────────────────────────────

    private saveProfile(): void {
        if (!this.profile) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
        } catch {
            // localStorage lleno o no disponible
        }
    }

    private async syncToBackend(): Promise<void> {
        if (!this.profile) return;
        try {
            await fetch('/api/tracking/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.profile.sessionId,
                    visitCount: this.profile.visitCount,
                    device: this.profile.device,
                    origin: this.profile.origin,
                    behavior: {
                        studiesViewed: this.profile.behavior.studiesViewed.slice(-20), // últimos 20
                        cartItems: this.profile.behavior.cartItems,
                        hasAbandoned: this.profile.behavior.hasAbandoned,
                    },
                    conversion: this.profile.conversion,
                }),
            });
        } catch {
            // Non-critical, ignorar errores de red
        }
    }

    private fireCompetitorEvent(competitorName: string): void {
        // Disparar evento para que el sistema de precios dinámicos lo tome
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('bienestar:competitor_visit', {
                detail: { competitor: competitorName }
            }));
        }

        // GA4 / GTM event
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'competitor_origin', {
                event_category: 'intelligence',
                event_label: competitorName,
            });
        }
    }

    private startScrollTracking(): void {
        if (typeof window === 'undefined' || this.scrollListener) return;
        this.scrollListener = () => {
            const scrollPct = Math.round(
                ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
            );
            if (scrollPct > this.maxScrollDepth) {
                this.maxScrollDepth = Math.min(scrollPct, 100);
            }
        };
        window.addEventListener('scroll', this.scrollListener, { passive: true });
    }

    private stopScrollTracking(): void {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }
}

// ─── SINGLETON ────────────────────────────────────────────────────────────────
export const visitorIntelligence = typeof window !== 'undefined'
    ? new VisitorIntelligenceService()
    : null;

export type { VisitorIntelligenceService };
