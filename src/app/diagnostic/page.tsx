export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function DiagnosticPage() {
    let envVars: any = {};

    // Check environment variables
    envVars.DATABASE_URL_EXISTS = !!process.env.DATABASE_URL;
    envVars.DATABASE_URL_PREFIX = process.env.DATABASE_URL?.substring(0, 30) || 'NOT SET';
    envVars.NODE_ENV = process.env.NODE_ENV;
    envVars.VERCEL = process.env.VERCEL;

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh', fontSize: '14px' }}>
            <h1>🔍 Cloudflare Edge Diagnostic Report</h1>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Environment Variables</h2>
                <pre>{JSON.stringify(envVars, null, 2)}</pre>
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Database Status</h2>
                <p><strong>Status:</strong> <span style={{ color: '#ff0' }}>Skipped (Edge Compatible)</span></p>
            </div>
        </div>
    );
}
