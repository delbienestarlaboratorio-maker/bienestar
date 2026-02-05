import { NextResponse } from 'next/server';
import { studies } from '@/data/studies';

// GET: Obtener todos los estudios con su estado
export async function GET() {
    try {
        // Retornamos los estudios reales con su estado
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

        // Aquí deberías guardar en la base de datos
        // Por ahora solo retornamos el estudio creado
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
