import { NextRequest, NextResponse } from 'next/server';

// ╔═══════════════════════════════════════════════════╗
// ║  POST /api/tracking/session                       ║
// ║  Persiste/actualiza una sesión de visitante       ║
// ║  Key: sessionId (fingerprint-based cookie _bid)   ║
// ╚═══════════════════════════════════════════════════╝

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            sessionId,
            visitCount,
            device,
            origin,
            behavior,
            conversion,
        } = body;

        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
        }

        // Extraer IP del request (para geo-localización básica)
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ??
            request.headers.get('x-real-ip') ??
            '0.0.0.0';

        // Persistir en Neon DB (tabla user_behavior)
        const db = await getDbConnection();

        if (db) {
            await db.query(`
        INSERT INTO user_behavior (
          session_id,
          visit_count,
          last_visit,
          cart_items,
          referrer,
          from_competitor,
          conversion,
          device_type,
          traffic_source,
          competitor_name,
          ip_address,
          raw_data
        ) VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (session_id) DO UPDATE SET
          visit_count = EXCLUDED.visit_count,
          last_visit = NOW(),
          cart_items = EXCLUDED.cart_items,
          from_competitor = EXCLUDED.from_competitor,
          conversion = EXCLUDED.conversion,
          device_type = EXCLUDED.device_type,
          raw_data = EXCLUDED.raw_data
      `, [
                sessionId,
                visitCount ?? 1,
                JSON.stringify(behavior?.cartItems ?? []),
                origin?.referrer ?? '',
                origin?.fromCompetitor ?? false,
                conversion?.didConvert ?? false,
                device?.type ?? 'desktop',
                origin?.source ?? 'direct',
                origin?.competitorName ?? null,
                ip,
                JSON.stringify({ device, origin, behavior, conversion }),
            ]);
        }

        return NextResponse.json({
            success: true,
            sessionId,
            tracked: true,
        });

    } catch (error) {
        console.error('[Tracking] Error:', error);
        // Non-critical endpoint — siempre 200 para no afectar UX
        return NextResponse.json({ success: false, error: 'tracking error' });
    }
}

// ╔═══════════════════════════════════════════════════╗
// ║  GET /api/tracking/session                        ║
// ║  Lee el perfil de un visitante por su _bid cookie ║
// ╚═══════════════════════════════════════════════════╝

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('_bid')?.value;

        if (!sessionId) {
            return NextResponse.json({ found: false });
        }

        const db = await getDbConnection();

        if (!db) {
            return NextResponse.json({ found: false });
        }

        const result = await db.query(
            'SELECT * FROM user_behavior WHERE session_id = $1',
            [sessionId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ found: false, sessionId });
        }

        const row = result.rows[0];
        return NextResponse.json({
            found: true,
            profile: {
                sessionId: row.session_id,
                visitCount: row.visit_count,
                lastVisit: row.last_visit,
                fromCompetitor: row.from_competitor,
                competitorName: row.competitor_name,
                deviceType: row.device_type,
                source: row.traffic_source,
                didConvert: row.conversion,
                rawData: row.raw_data,
            }
        });

    } catch (error) {
        console.error('[Tracking GET] Error:', error);
        return NextResponse.json({ found: false, error: 'db error' });
    }
}

// ─── DB Helper ───────────────────────────────────────────────────────────────
async function getDbConnection() {
    try {
        // Intentar conexión con el pool de Neon/Postgres existente
        const { Pool } = await import('pg');
        const connectionString = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL;

        if (!connectionString) {
            console.warn('[Tracking] No DATABASE_URL found, skipping DB persist');
            return null;
        }

        const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
        return pool;
    } catch {
        return null;
    }
}
