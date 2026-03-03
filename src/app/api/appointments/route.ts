export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { notifyNewAppointment } from '@/lib/webhooks';
import { sendAppointmentNotificationEmail } from '@/lib/email-notifications';

// POST - Crear nueva cita
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            patientName,
            patientEmail,
            patientPhone,
            studyId,
            studyName,
            preferredDate,
            preferredTime,
            notes
        } = body;

        // Validación básica
        if (!patientName || !patientEmail || !patientPhone || !studyId || !studyName || !preferredDate || !preferredTime) {
            return NextResponse.json(
                { error: 'Todos los campos obligatorios deben ser proporcionados' },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(patientEmail)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Validar que la fecha sea futura
        const selectedDate = new Date(preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return NextResponse.json(
                { error: 'La fecha debe ser futura' },
                { status: 400 }
            );
        }

        // Crear la cita en PostgreSQL (fuente principal, 100% independiente del servidor local)
        const [newAppointment] = await db.insert(appointments).values({
            patientName,
            patientEmail,
            patientPhone,
            studyId,
            studyName,
            preferredDate: selectedDate,
            preferredTime,
            notes: notes || null,
            status: 'pending'
        }).returning();

        // 📧 Notificar por EMAIL al staff (sin servidor local, funciona aunque esté apagado)
        sendAppointmentNotificationEmail({
            patientName,
            patientEmail,
            patientPhone,
            studyName,
            preferredDate,
            preferredTime,
            notes: notes || null,
        }).catch(err => {
            console.error('⚠️ Email notification failed (non-critical):', err);
        });

        // 🔔 Webhook al servidor local como respaldo secundario (falla silenciosamente si está apagado)
        notifyNewAppointment({
            paciente_nombre: patientName,
            telefono: patientPhone,
            email: patientEmail,
            estudio_nombre: studyName,
            fecha: preferredDate,
            hora: preferredTime,
            notas: notes || `Cita agendada desde web el ${new Date().toISOString()}`
        }).catch(() => {
            // Servidor local apagado — no afecta nada, el email ya fue enviado
        });

        return NextResponse.json({
            success: true,
            appointment: newAppointment
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json(
            { error: 'Error al crear la cita' },
            { status: 500 }
        );
    }
}

// GET - Listar citas (admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        // Build query conditionally
        let query;
        if (status && ['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            query = db.select()
                .from(appointments)
                .where(eq(appointments.status, status as any))
                .orderBy(desc(appointments.createdAt))
                .limit(limit);
        } else {
            query = db.select()
                .from(appointments)
                .orderBy(desc(appointments.createdAt))
                .limit(limit);
        }

        const allAppointments = await query;

        return NextResponse.json({
            success: true,
            appointments: allAppointments,
            count: allAppointments.length
        });

    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json(
            { error: 'Error al obtener las citas' },
            { status: 500 }
        );
    }
}
