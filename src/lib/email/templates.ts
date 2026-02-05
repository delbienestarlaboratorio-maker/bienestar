// Email templates for remarketing campaigns
// Used for cart abandonment recovery and follow-ups

export interface EmailTemplateData {
  customerName?: string;
  cartItems: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalValue: number;
  discount?: number;
  recoveryUrl: string;
  expiresIn?: string; // e.g. "24 horas"
}

/**
 * Cart Abandonment Recovery Email (HTML)
 */
export function generateCartAbandonmentEmail(data: EmailTemplateData): string {
  const { customerName, cartItems, totalValue, discount = 10, recoveryUrl, expiresIn = "24 horas" } = data;

  const discountedTotal = totalValue * (1 - discount / 100);
  const savings = totalValue - discountedTotal;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡No te vayas sin tus estudios!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
    }
    h1 {
      color: #1f2937;
      font-size: 24px;
      margin: 0 0 10px 0;
    }
    .subtitle {
      color: #6b7280;
      font-size: 16px;
    }
    .discount-badge {
      background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
    .cart-items {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .cart-item:last-child {
      border-bottom: none;
    }
    .item-name {
      font-weight: 500;
      color: #374151;
    }
    .item-price {
      font-weight: bold;
      color: #2563eb;
    }
    .total-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      font-size: 16px;
    }
    .total-row.final {
      font-size: 24px;
      font-weight: bold;
      color: #059669;
      margin-top: 12px;
    }
    .savings {
      color: #059669;
      font-size: 14px;
    }
    .cta-button {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: white;
      text-align: center;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      margin: 30px 0 20px 0;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: scale(1.02);
    }
    .urgency {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .urgency-text {
      color: #92400e;
      font-weight: 500;
      margin: 0;
    }
    .benefits {
      margin: 30px 0;
    }
    .benefit {
      display: flex;
      align-items: center;
      margin: 12px 0;
    }
    .benefit-icon {
      color: #059669;
      margin-right: 12px;
      font-size: 20px;
    }
    .footer {
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">🏥 Laboratorio Bienestar</div>
      <h1>${customerName ? `¡Hola ${customerName}!` : '¡Hola!'}</h1>
      <p class="subtitle">Notamos que dejaste algo en tu carrito</p>
    </div>

    <!-- Discount Badge -->
    <div style="text-align: center;">
      <div class="discount-badge">
        🎉 ¡${discount}% DE DESCUENTO ESPECIAL!
      </div>
    </div>

    <!-- Cart Items -->
    <div class="cart-items">
      <h3 style="margin-top: 0; color: #1f2937;">Tus estudios pendientes:</h3>
      ${cartItems.map(item => `
        <div class="cart-item">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${item.price.toFixed(2)} MXN</span>
        </div>
      `).join('')}
      
      <!-- Totals -->
      <div class="total-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>$${totalValue.toFixed(2)} MXN</span>
        </div>
        <div class="total-row savings">
          <span>Descuento exclusivo (${discount}%):</span>
          <span>-$${savings.toFixed(2)} MXN</span>
        </div>
        <div class="total-row final">
          <span>Total con descuento:</span>
          <span>$${discountedTotal.toFixed(2)} MXN</span>
        </div>
      </div>
    </div>

    <!-- Urgency Banner -->
    <div class="urgency">
      <p class="urgency-text">
        ⏰ <strong>Oferta temporal:</strong> Este descuento expira en ${expiresIn}
      </p>
    </div>

    <!-- CTA Button -->
    <a href="${recoveryUrl}" class="cta-button">
      COMPLETAR MI PEDIDO AHORA
    </a>

    <!-- Benefits -->
    <div class="benefits">
      <div class="benefit">
        <span class="benefit-icon">✓</span>
        <span>Resultados en 24-48 horas</span>
      </div>
      <div class="benefit">
        <span class="benefit-icon">✓</span>
        <span>Equipo de última generación</span>
      </div>
      <div class="benefit">
        <span class="benefit-icon">✓</span>
        <span>Personal certificado y profesional</span>
      </div>
      <div class="benefit">
        <span class="benefit-icon">✓</span>
        <span>Precios más bajos garantizados</span>
      </div>
    </div>

    <!-- Social Proof -->
    <div style="background-color: #ecfdf5; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #065f46; text-align: center;">
        ⭐⭐⭐⭐⭐<br>
        <strong>Más de 10,000 clientes satisfechos</strong><br>
        <small>"Excelente servicio y precios accesibles"</small>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        ¿Necesitas ayuda? <a href="tel:+527716854026">Llámanos</a> o 
        <a href="https://wa.me/527716854026">escríbenos por WhatsApp</a>
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
        Laboratorio Bienestar<br>
        Ignacio Galvan 10 interior 11 Plaza Bonanza, Tizayuca Hidalgo (Junto a BBVA)<br>
        <a href="{unsubscribe_url}">Cancelar suscripción</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Follow-up Email (After purchase)
 */
export function generateFollowUpEmail(data: {
  customerName: string;
  studiesCompleted: string[];
  resultUrl?: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gracias por confiar en nosotros</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
    <h1 style="color: #2563eb;">¡Gracias ${data.customerName}!</h1>
    <p>Hemos recibido tus muestras y estamos procesando tus estudios.</p>
    
    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>Estudios realizados:</h3>
      <ul>
        ${data.studiesCompleted.map(study => `<li>${study}</li>`).join('')}
      </ul>
    </div>

    <p><strong>Recibirás tus resultados en las próximas 24-48 horas.</strong></p>

    ${data.resultUrl ? `
      <a href="${data.resultUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
        Ver Estado de Resultados
      </a>
    ` : ''}

    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
      Si tienes alguna pregunta, no dudes en contactarnos.
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Plain text version for email clients that don't support HTML
 */
export function generateCartAbandonmentTextEmail(data: EmailTemplateData): string {
  const { customerName, cartItems, totalValue, discount = 10, recoveryUrl } = data;
  const discountedTotal = totalValue * (1 - discount / 100);

  return `
${customerName ? `Hola ${customerName},` : 'Hola,'}

Notamos que dejaste algunos estudios en tu carrito.

TUS ESTUDIOS PENDIENTES:
${cartItems.map(item => `- ${item.name}: $${item.price.toFixed(2)} MXN`).join('\n')}

OFERTA ESPECIAL: ¡${discount}% DE DESCUENTO!
Subtotal: $${totalValue.toFixed(2)} MXN
Descuento: -$${(totalValue - discountedTotal).toFixed(2)} MXN
TOTAL: $${discountedTotal.toFixed(2)} MXN

Completa tu pedido ahora: ${recoveryUrl}

Esta oferta expira en 24 horas.

--
Laboratorio Bienestar
Tel: +52 771 685 4026
WhatsApp: +52 771 685 4026
Dirección: Ignacio Galvan 10 interior 11 Plaza Bonanza, Tizayuca Hidalgo (Junto a BBVA)
  `.trim();
}
