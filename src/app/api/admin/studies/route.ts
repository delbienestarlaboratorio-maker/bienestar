export const runtime = 'edge';
import { NextResponse } from 'next/server';

// Build-time only: prevent bundler from including 884KB studies array
function safeRequire(mod: string) { try { return eval('require')(mod); } catch { return null; } }

function getStudies(): any[] {
    const m = safeRequire('@/data/studies') || safeRequire(require('path').join(process.cwd(), 'src', 'data', 'studies'));
    return m?.studies || m?.default || [];
}

// GET: Obtener todos los estudios con su estado
export async function GET() {
    try {
        const studies = getStudies();
        const studiesWithStatus = studies.map(study => ({
            ...study,
            hasAIContent: study.hasAIContent || false
        }));

        return NextResponse.json(studiesWithStatus);
    } catch (error) {
        console.error('Error fetching studies:', error);
        return NextResponse.json({ error: 'Error al cargar estudios' }, { status: 500 });
    }
}

// POST: Crear nuevo estudio
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validar datos requeridos
        if (!body.name || !body.category || !body.price) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const studies = getStudies();
        const newStudy = {
            id: String(studies.length + 1),
            slug: body.name.toLowerCase().replace(/\s+/g, '-'),
            ...body,
            status: 'active',
            hasAIContent: false
        };

        return NextResponse.json(newStudy, { status: 201 });
    } catch (error) {
        console.error('Error creating study:', error);
        return NextResponse.json({ error: 'Error al crear estudio' }, { status: 500 });
    }
}
