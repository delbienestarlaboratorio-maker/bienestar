export const runtime = 'edge';
import { NextResponse } from 'next/server';

// Build-time only: prevent bundler from including 884KB studies array
function safeRequire(mod: string) { try { return eval('require')(mod); } catch { return null; } }

function getStudies(): any[] {
    const m = safeRequire('@/data/studies') || safeRequire(require('path').join(process.cwd(), 'src', 'data', 'studies'));
    return m?.studies || m?.default || [];
}

// POST: Enriquecer estudio con IA
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const studies = getStudies();
        const study = studies.find(s => s.id === id);
        if (!study) {
            return NextResponse.json({ error: 'Estudio no encontrado' }, { status: 404 });
        }

        // Llamar a la API de Tilde IA (Ollama Proxy)
        const response = await fetch('http://localhost:10008/api/generate-study-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ study_name: study.name })
        });

        if (!response.ok) {
            throw new Error('Error al comunicarse con Tilde IA');
        }

        const enrichedContent = await response.json();

        return NextResponse.json({
            ...enrichedContent,
            hasAIContent: true
        });
    } catch (error: any) {
        console.error('Error enriching study:', error);
        return NextResponse.json({ error: error.message || 'Error al enriquecer con IA' }, { status: 500 });
    }
}
