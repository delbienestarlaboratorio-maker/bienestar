import { NextResponse } from 'next/server';

// POST: Enriquecer múltiples estudios con IA
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studyIds } = body;

        if (!studyIds || !Array.isArray(studyIds)) {
            return NextResponse.json(
                { error: 'Se requiere un array de IDs de estudios' },
                { status: 400 }
            );
        }

        // Aquí procesarías cada estudio con IA
        // Podrías usar un sistema de cola para procesar en background

        // Por ahora, simulamos el inicio del proceso
        const processId = `bulk-${Date.now()}`;

        // En producción, iniciarías un job en background aquí
        // y retornarías el ID del proceso para que el cliente pueda consultar el progreso

        return NextResponse.json({
            success: true,
            processId,
            studiesCount: studyIds.length,
            message: `Proceso de enriquecimiento iniciado para ${studyIds.length} estudios`
        });
    } catch (error) {
        console.error('Error in bulk enrichment:', error);
        return NextResponse.json({ error: 'Error al iniciar enriquecimiento masivo' }, { status: 500 });
    }
}
