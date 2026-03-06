export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET - Obtener detalle de una cita específica
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [appointment] = await db
            .select()
            .from(appointments)
            .where(eq(appointments.id, id));

        if (!appointment) {
            return NextResponse.json(
                { error: 'Cita no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            appointment
        });

    } catch (error) {
        console.error('Error fetching appointment:', error);
        return NextResponse.json(
            { error: 'Error al obtener la cita' },
            { status: 500 }
        );
    }
}

// PATCH - Actualizar estado de una cita
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, adminNotes } = body;

        // Validar estado
        if (status && !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            return NextResponse.json(
                { error: 'Estado inválido' },
                { status: 400 }
            );
        }

        const updateData: any = {
            updatedAt: new Date()
        };

        if (status) updateData.status = status;
        if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

        // Agregar timestamps específicos según el estado
        if (status === 'confirmed') {
            updateData.confirmedAt = new Date();
        } else if (status === 'cancelled') {
            updateData.cancelledAt = new Date();
        }

        const [updatedAppointment] = await db
            .update(appointments)
            .set(updateData)
            .where(eq(appointments.id, id))
            .returning();

        if (!updatedAppointment) {
            return NextResponse.json(
                { error: 'Cita no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error('Error updating appointment:', error);
        return NextResponse.json(
            { error: 'Error al actualizar la cita' },
            { status: 500 }
        );
    }
}

// DELETE - Cancelar una cita
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [cancelledAppointment] = await db
            .update(appointments)
            .set({
                status: 'cancelled',
                cancelledAt: new Date(),
                updatedAt: new Date()
            })
            .where(eq(appointments.id, id))
            .returning();

        if (!cancelledAppointment) {
            return NextResponse.json(
                { error: 'Cita no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Cita cancelada exitosamente',
            appointment: cancelledAppointment
        });

    } catch (error) {
        console.error('Error deleting appointment:', error);
        return NextResponse.json(
            { error: 'Error al cancelar la cita' },
            { status: 500 }
        );
    }
}
