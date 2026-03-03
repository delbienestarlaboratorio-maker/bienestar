/**
 * Servicio de notificaciones por email para citas nuevas.
 * Usa Resend (resend.com) - gratuito hasta 3,000 emails/mes.
 * 
 * Esto reemplaza la dependencia del servidor local para notificaciones de citas.
 * Si RESEND_API_KEY no está configurada, se omite silenciosamente (no falla).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.APPOINTMENT_NOTIFY_EMAIL || 'laboratorio@delbienestar.com.mx';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'citas@laboratorio.delbienestar.com.mx';

export interface AppointmentEmailData {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    studyName: string;
    preferredDate: string;
    preferredTime: string;
    notes?: string | null;
}

/**
 * Envía un email de notificación al staff del laboratorio cuando llega una nueva cita.
 * Esta operación es completamente independiente del servidor local.
 * Si falla, no bloquea ni rompe el flujo principal.
 */
export async function sendAppointmentNotificationEmail(data: AppointmentEmailData): Promise<void> {
    if (!RESEND_API_KEY) {
        // Si no está configurada la API key, omitir silenciosamente
        console.log('ℹ️ RESEND_API_KEY no configurada — notificación de email omitida.');
        return;
    }

    const fechaFormateada = new Date(data.preferredDate).toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Cita - Laboratorio Del Bienestar</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e3a8a, #3730a3); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🗓️ Nueva Cita Agendada</h1>
      <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 14px;">Laboratorio Del Bienestar</p>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">
      <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">
        Se ha agendado una nueva cita desde el sitio web. Aquí están los detalles:
      </p>

      <!-- Details Table -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
        
        <div style="display: flex; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Paciente</div>
          <div style="flex: 1; color: #111827; font-size: 15px; font-weight: 700;">${data.patientName}</div>
        </div>

        <div style="display: flex; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Teléfono</div>
          <div style="flex: 1; color: #111827; font-size: 15px;">
            <a href="tel:${data.patientPhone}" style="color: #1d4ed8; text-decoration: none;">${data.patientPhone}</a>
          </div>
        </div>

        <div style="display: flex; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Email</div>
          <div style="flex: 1; color: #111827; font-size: 15px;">
            <a href="mailto:${data.patientEmail}" style="color: #1d4ed8; text-decoration: none;">${data.patientEmail}</a>
          </div>
        </div>

        <div style="display: flex; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Estudio</div>
          <div style="flex: 1; color: #111827; font-size: 15px; font-weight: 600;">${data.studyName}</div>
        </div>

        <div style="display: flex; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Fecha</div>
          <div style="flex: 1; color: #111827; font-size: 15px;">${fechaFormateada}</div>
        </div>

        <div style="display: flex; ${data.notes ? 'margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;' : ''}">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Hora</div>
          <div style="flex: 1; color: #111827; font-size: 15px; font-weight: 700;">${data.preferredTime} hrs</div>
        </div>

        ${data.notes ? `
        <div style="display: flex;">
          <div style="width: 140px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 2px;">Notas</div>
          <div style="flex: 1; color: #374151; font-size: 14px; font-style: italic;">${data.notes}</div>
        </div>
        ` : ''}
      </div>

      <!-- WhatsApp CTA -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://wa.me/52${data.patientPhone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(data.patientName)}%2C%20le%20confirmamos%20su%20cita%20en%20Laboratorio%20Del%20Bienestar%20para%20el%20${encodeURIComponent(fechaFormateada)}%20a%20las%20${data.preferredTime}%20hrs%20para%20${encodeURIComponent(data.studyName)}." 
           style="background: #25D366; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px; display: inline-block;">
          📱 Confirmar por WhatsApp
        </a>
      </div>

      <!-- Admin Link -->
      <div style="background: #eff6ff; border-radius: 10px; padding: 16px; text-align: center;">
        <p style="color: #1e40af; margin: 0; font-size: 13px;">
          Ver todas las citas en el 
          <a href="https://laboratorio.delbienestar.com.mx/admin/appointments" style="color: #1d4ed8; font-weight: bold;">panel de administración →</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
        Laboratorio Del Bienestar • Notificación automática del sistema web
      </p>
    </div>
  </div>
</body>
</html>`;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [NOTIFY_EMAIL],
                subject: `🗓️ Nueva cita: ${data.patientName} — ${data.studyName} el ${fechaFormateada}`,
                html: emailHtml,
            }),
        });

        if (response.ok) {
            console.log('✅ Email de notificación de cita enviado correctamente.');
        } else {
            const error = await response.text();
            console.error('⚠️ Error enviando email de notificación (no crítico):', error);
        }
    } catch (error) {
        // No bloqueamos el flujo principal si el email falla
        console.error('⚠️ Error en servicio de email (no crítico):', error);
    }
}
