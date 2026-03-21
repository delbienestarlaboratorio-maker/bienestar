import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Honeypot API Route - Trampa para bots
// Ningún humano debe llegar a esta ruta. Si lo hacen, es un bot haciendo scraping ignorando CSS.
export async function GET(req: NextRequest) {
    // Obtenemos la IP del cliente intentando entrar a la trampa
    const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
    const userAgent = req.headers.get('user-agent') || 'Unknown Agent';

    // Registramos la intrusión con un formato altamente visible en los logs del servidor
    // Estos logs pueden ser parseados por utilidades como fail2ban para bloquearlos en el firewall si se desea
    console.warn(`[SECURITY ALERT - BOT TRAP TRIGGERED] Target IP: ${ip} | User-Agent: ${userAgent} | Timestamp: ${new Date().toISOString()}`);

    // Devolvemos una respuesta vacía o engañosa para no darle pistas al bot
    // Simulamos que es una página legítima o devolvemos 200 OK para que siga cayendo si intenta de nuevo.
    return NextResponse.json({
        status: "success",
        message: "Terms accepted"
    }, { status: 200 });
}
