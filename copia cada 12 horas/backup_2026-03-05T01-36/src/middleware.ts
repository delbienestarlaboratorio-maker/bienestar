import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Obtener token de sesión usando JWT (compatible con Node.js runtime)
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
    });

    const isLoggedIn = !!token;
    const userRole = token?.role as string | undefined;

    // Rutas públicas
    const isPublicRoute = ['/login', '/api/auth'].some(route => pathname.startsWith(route));

    // Rutas admin que requieren autenticación
    const isAdminRoute = pathname.startsWith('/admin');

    // Si no está logueado y trata de acceder a ruta admin, redirigir a login
    if (isAdminRoute && !isLoggedIn) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Protección por roles
    if (isLoggedIn && isAdminRoute) {
        // Solo Super Admin puede acceder a gestión de usuarios
        if (pathname.startsWith('/admin/users') && userRole !== 'super_admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        // Solo Super Admin y Admin pueden acceder a Settings
        if (pathname.startsWith('/admin/settings') && !['super_admin', 'admin'].includes(userRole as string)) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        // Viewers no pueden editar nada, solo ver estudios
        if (userRole === 'viewer' && !pathname.startsWith('/admin/studies')) {
            return NextResponse.redirect(new URL('/admin/studies', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
