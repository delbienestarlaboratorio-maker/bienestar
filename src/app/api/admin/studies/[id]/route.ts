import { NextResponse } from 'next/server';

// PATCH: Actualizar estado del estudio
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;

        // Aquí deberías actualizar en la base de datos
        // Por ahora solo retornamos éxito
        return NextResponse.json({
            success: true,
            id,
            ...body
        });
    } catch (error) {
        console.error('Error updating study:', error);
        return NextResponse.json({ error: 'Error al actualizar estudio' }, { status: 500 });
    }
}

// DELETE: Eliminar estudio
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Aquí deberías eliminar de la base de datos
        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error deleting study:', error);
        return NextResponse.json({ error: 'Error al eliminar estudio' }, { status: 500 });
    }
}
