import { db } from '@/db';
import { studies } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default async function DiagnosticPage() {
    let dbStatus = 'Unknown';
    let dbError = '';
    let studyCount = 0;
    let sampleStudy: any = null;

    try {
        const allStudies = await db.select().from(studies).limit(1);
        studyCount = allStudies.length;
        sampleStudy = allStudies[0];
        dbStatus = 'Connected';
    } catch (error: any) {
        dbStatus = 'Failed';
        dbError = error?.message || String(error);
    }

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh' }}>
            <h1>🔍 Vercel Diagnostic Report</h1>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Database Connection</h2>
                <p><strong>Status:</strong> <span style={{ color: dbStatus === 'Connected' ? '#0f0' : '#f00' }}>{dbStatus}</span></p>
                {dbError && <p><strong>Error:</strong> {dbError}</p>}
                <p><strong>Study Count:</strong> {studyCount}</p>
            </div>

            {sampleStudy && (
                <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                    <h2>Sample Study Data</h2>
                    <pre>{JSON.stringify(sampleStudy, null, 2)}</pre>
                </div>
            )}

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Environment</h2>
                <p><strong>Node Version:</strong> {process.version}</p>
                <p><strong>Platform:</strong> {process.platform}</p>
                <p><strong>Vercel:</strong> {process.env.VERCEL ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
}
