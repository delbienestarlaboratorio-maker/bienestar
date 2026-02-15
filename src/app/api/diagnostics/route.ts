import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';

// Endpoint de diagnóstico para verificar conexión a DB
export async function GET(request: NextRequest) {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        env: {
            DATABASE_URL_configured: !!process.env.DATABASE_URL,
            DATABASE_URL_preview: process.env.DATABASE_URL?.substring(0, 30) + '...',
            NODE_ENV: process.env.NODE_ENV,
        },
        tests: {} as any
    };

    // Test 1: Variable de entorno
    if (!process.env.DATABASE_URL) {
        diagnostics.tests.database_url = {
            status: 'FAIL',
            error: 'DATABASE_URL not configured'
        };
        return NextResponse.json(diagnostics);
    }

    diagnostics.tests.database_url = {
        status: 'PASS',
        value: 'configured'
    };

    // Test 2: Conexión a base de datos
    try {
        const result = await db.execute(sql`SELECT COUNT(*) as count FROM studies`);
        diagnostics.tests.database_connection = {
            status: 'PASS',
            studies_count: result.rows[0]?.count || 0
        };
    } catch (error) {
        diagnostics.tests.database_connection = {
            status: 'FAIL',
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        };
        return NextResponse.json(diagnostics, { status: 500 });
    }

    // Test 3: Query específica de síntomas
    try {
        const result = await db.execute(sql`
            SELECT id, name 
            FROM studies 
            WHERE UPPER(name) LIKE '%COPROCULTIVO%' 
            LIMIT 3
        `);
        diagnostics.tests.symptom_query = {
            status: 'PASS',
            found: result.rows.length,
            samples: result.rows.map((r: any) => r.name)
        };
    } catch (error) {
        diagnostics.tests.symptom_query = {
            status: 'FAIL',
            error: error instanceof Error ? error.message : String(error)
        };
    }

    return NextResponse.json(diagnostics);
}
