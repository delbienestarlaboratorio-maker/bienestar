/**
 * Webhooks para notificar al backend local de Laboratorio Manager
 * sobre nuevos pacientes y citas desde laboratorio.delbienestar.com.mx
 */

const LABORATORIO_BACKEND_URL = process.env.LABORATORIO_BACKEND_URL || 'http://localhost:10120';
const WEBHOOK_KEY = process.env.LABORATORIO_WEBHOOK_KEY || 'laboratorio_webhook_secret_2024';

export interface NewPatientData {
    nombre: string;
    apellidos: string;
    telefono?: string;
    email?: string;
    fecha_nacimiento?: string;
    genero?: string;
}

export interface NewAppointmentData {
    paciente_nombre: string;
    telefono?: string;
    email?: string;
    estudio_nombre: string;
    fecha: string; // YYYY-MM-DD
    hora: string;  // HH:MM
    notas?: string;
}

/**
 * Notificar al backend local sobre un nuevo paciente
 */
export async function notifyNewPatient(patientData: NewPatientData) {
    try {
        const response = await fetch(`${LABORATORIO_BACKEND_URL}/api/laboratorio/webhook/nuevo-paciente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Key': WEBHOOK_KEY
            },
            body: JSON.stringify(patientData)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('❌ Error notificando nuevo paciente al backend local:', error);
            return null;
        }

        const result = await response.json();
        console.log('✅ Paciente registrado en backend local:', result);
        return result;
    } catch (error) {
        console.error('❌ Error en webhook nuevo paciente:', error);
        // No fallar la operación principal si el webhook falla
        return null;
    }
}

/**
 * Notificar al backend local sobre una nueva cita
 */
export async function notifyNewAppointment(appointmentData: NewAppointmentData) {
    try {
        const response = await fetch(`${LABORATORIO_BACKEND_URL}/api/laboratorio/webhook/nueva-cita`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Key': WEBHOOK_KEY
            },
            body: JSON.stringify(appointmentData)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('❌ Error notificando nueva cita al backend local:', error);
            return null;
        }

        const result = await response.json();
        console.log('✅ Cita registrada en backend local:', result);
        return result;
    } catch (error) {
        console.error('❌ Error en webhook nueva cita:', error);
        // No fallar la operación principal si el webhook falla
        return null;
    }
}

/**
 * Consultar estudios y precios desde el backend local (opcional)
 */
export async function fetchStudiesFromBackend() {
    try {
        const response = await fetch(`${LABORATORIO_BACKEND_URL}/api/laboratorio/public/estudios`, {
            headers: {
                'X-API-Key': process.env.LABORATORIO_API_KEY || 'laboratorio_secret_key_123'
            }
        });

        if (!response.ok) {
            console.error('❌ Error consultando estudios del backend local');
            return null;
        }

        const result = await response.json();
        return result.estudios;
    } catch (error) {
        console.error('❌ Error consultando estudios:', error);
        return null;
    }
}

/**
 * Consultar disponibilidad de horarios desde el backend local (opcional)
 */
export async function fetchAvailability(fecha: string) {
    try {
        const response = await fetch(
            `${LABORATORIO_BACKEND_URL}/api/laboratorio/public/disponibilidad?fecha=${fecha}`,
            {
                headers: {
                    'X-API-Key': process.env.LABORATORIO_API_KEY || 'laboratorio_secret_key_123'
                }
            }
        );

        if (!response.ok) {
            console.error('❌ Error consultando disponibilidad del backend local');
            return null;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('❌ Error consultando disponibilidad:', error);
        return null;
    }
}
