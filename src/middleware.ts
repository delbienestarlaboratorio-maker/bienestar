import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter (Fallback al WAF de Cloudflare)
// Previene scraping masivo limitando peticiones por IP en un margen de tiempo
const ipMap = new Map<string, { count: number, resetTime: number }>();

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // RATE LIMITING PARA EVITAR SCRAPING DE LA BASE DE DATOS MÉDICA
    if (pathname.startsWith('/sintomas') || pathname.startsWith('/valores-clinicos') || pathname.startsWith('/enfermedades')) {
        const ip = (req as any).ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';

        if (ip !== 'Unknown IP') {
            const now = Date.now();
            let record = ipMap.get(ip);

            if (!record || now > record.resetTime) {
                record = { count: 1, resetTime: now + 60000 }; // 60 segundos
            } else {
                record.count++;
            }
            ipMap.set(ip, record);

            // Hard limit: 60 requests per minute
            if (record.count > 60) {
                console.warn(`[RATE LIMIT BLOCKED] Malicious scraping detected from IP: ${ip} on path ${pathname}`);
                return new NextResponse('Too Many Requests. Anti-Scraping protection active.', { status: 429 });
            }

            // Lazy cleanup para evitar fugas de memoria
            if (Math.random() < 0.05) {
                for (const [key, val] of ipMap.entries()) {
                    if (now > val.resetTime) ipMap.delete(key);
                }
            }
        }
    }

    // Admin route protection via cookie check (Edge-compatible)
    // Full auth validation happens at the page/API level
    if (pathname.startsWith('/admin')) {
        const sessionCookie = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
        if (!sessionCookie) {
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/login',
        '/sintomas/:path*',
        '/enfermedades/:path*',
        '/valores-clinicos/:path*'
    ],
};
