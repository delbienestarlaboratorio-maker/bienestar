import { NextRequest, NextResponse } from 'next/server';
import { type InvoiceRequest } from '@/data/sat-catalogs';
import { validateRFC, validateCodigoPostal, validateEmail } from '@/lib/validation/rfc';

export async function POST(request: NextRequest) {
    try {
        const data: InvoiceRequest = await request.json();

        // Validación server-side
        const rfcValidation = validateRFC(data.rfc);
        if (!rfcValidation.valid) {
            return NextResponse.json(
                { error: rfcValidation.message },
                { status: 400 }
            );
        }

        const cpValidation = validateCodigoPostal(data.codigoPostal);
        if (!cpValidation.valid) {
            return NextResponse.json(
                { error: cpValidation.message },
                { status: 400 }
            );
        }

        const emailValidation = validateEmail(data.email);
        if (!emailValidation.valid) {
            return NextResponse.json(
                { error: emailValidation.message },
                { status: 400 }
            );
        }

        if (!data.razonSocial || !data.regimenFiscal || !data.usoCFDI) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        //TODO: Aquí puedes:
        // 1. Guardar en PostgreSQL (futuro)
        // 2. Enviar email a admin (próximo paso)
        // 3. Enviar confirmación al cliente

        // Por ahora, solo logueamos
        console.log('Nueva solicitud de facturación:', {
            rfc: data.rfc,
            razonSocial: data.razonSocial,
            email: data.email,
            folio: data.folio,
            monto: data.monto,
            timestamp: new Date().toISOString(),
        });

        // TODO: Implementar envío de email
        // await sendInvoiceRequestEmail(data);

        return NextResponse.json({
            success: true,
            message: 'Solicitud recibida correctamente. Recibirás tu factura en 24-48 horas.',
        });

    } catch (error) {
        console.error('Error procesando solicitud de factura:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}

// Función helper para envío de email (implementar después)
async function sendInvoiceRequestEmail(data: InvoiceRequest) {
    // Aquí integrarías con Resend, Nodemailer, o SendGrid
    const emailBody = `
Nueva Solicitud de Factura
==========================

DATOS FISCALES:
--------------
RFC: ${data.rfc}
Razón Social: ${data.razonSocial}
Código Postal: ${data.codigoPostal}
Régimen Fiscal: ${data.regimenFiscal}
Uso de CFDI: ${data.usoCFDI}
Email: ${data.email}

DATOS DEL SERVICIO:
------------------
Folio: ${data.folio || 'No proporcionado'}
Monto: ${data.monto ? `$${data.monto} MXN` : 'No proporcionado'}
Fecha Servicio: ${data.fechaServicio || 'No proporcionada'}
Teléfono: ${data.telefono || 'No proporcionado'}

Solicitud recibida: ${new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}
  `;

    console.log('Email a enviar:', emailBody);

    // TODO: Implementar envío real
    // await resend.emails.send({
    //   from: 'facturacion@laboratorio.delbienestar.com.mx',
    //   to: 'admin@laboratorio.delbienestar.com.mx',
    //   subject: `Nueva Solicitud de Factura - ${data.folio || 'Sin folio'}`,
    //   text: emailBody,
    // });
}
