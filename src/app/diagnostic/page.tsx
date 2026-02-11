import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function DiagnosticPage() {
    let dbStatus = 'Unknown';
    let dbError = '';
    let dbErrorStack = '';
    let studyCount = 0;
    let connectionTest = 'Not tested';
    let envVars: any = {};

    // Check environment variables
    envVars.DATABASE_URL_EXISTS = !!process.env.DATABASE_URL;
    envVars.DATABASE_URL_PREFIX = process.env.DATABASE_URL?.substring(0, 30) || 'NOT SET';
    envVars.NODE_ENV = process.env.NODE_ENV;
    envVars.VERCEL = process.env.VERCEL;

    // Try direct connection
    try {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.DATABASE_URL?.includes('neon.tech')
                ? { rejectUnauthorized: false }
                : false,
        });

        connectionTest = 'Attempting...';

        const testQuery = await pool.query('SELECT NOW()');
        connectionTest = 'Success - ' + testQuery.rows[0].now;

        const studiesResult = await pool.query('SELECT COUNT(*) FROM studies');
        studyCount = parseInt(studiesResult.rows[0].count);
        dbStatus = 'Connected';

        await pool.end();
    } catch (error: any) {
        dbStatus = 'Failed';
        dbError = error?.message || String(error);
        dbErrorStack = error?.stack || '';
        connectionTest = 'Failed';
    }

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh', fontSize: '14px' }}>
            <h1>🔍 Vercel Diagnostic Report v2</h1>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Environment Variables</h2>
                <pre>{JSON.stringify(envVars, null, 2)}</pre>
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Connection Test</h2>
                <p><strong>Status:</strong> <span style={{ color: connectionTest.includes('Success') ? '#0f0' : '#f00' }}>{connectionTest}</span></p>
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Database Status</h2>
                <p><strong>Status:</strong> <span style={{ color: dbStatus === 'Connected' ? '#0f0' : '#f00' }}>{dbStatus}</span></p>
                <p><strong>Study Count:</strong> {studyCount}</p>
                {dbError && (
                    <>
                        <p><strong>Error:</strong></p>
                        <pre style={{ background: '#222', padding: '10px', overflow: 'auto', maxHeight: '200px', whiteSpace: 'pre-wrap' }}>{dbError}</pre>
                    </>
                )}
                {dbErrorStack && (
                    <>
                        <p><strong>Stack Trace:</strong></p>
                        <pre style={{ background: '#222', padding: '10px', overflow: 'auto', maxHeight: '300px', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{dbErrorStack}</pre>
                    </>
                )}
            </div>
        </div>
    );
}
