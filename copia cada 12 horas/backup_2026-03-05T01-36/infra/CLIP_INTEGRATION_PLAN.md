# Plan de Integración de Pagos (Clip API)

## 🎯 Objetivo
Implementar pasarela de pagos segura y confiable utilizando la API de Clip, permitiendo cobros de estudios médicos en línea.

## 🏗️ Arquitectura de Pagos

### 1. Flujo de Transacción
1. **Frontend**: Usuario selecciona estudios -> Carrito -> Checkout.
2. **Backend**: 
   - Genera `payment_request` a Clip API.
   - Recibe URL de pago.
3. **Usuario**: Redirigido a pasarela Clip.
4. **Webhook**: Clip notifica a nuestro servidor (`/api/webhooks/clip`) el éxito/fallo.
5. **Backend**: Actualiza estado de orden en DB + Envía confirmación (WhatsApp/Email).

### 2. Endpoints Requeridos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/pagos/crear` | Inicia transacción con Clip |
| POST | `/api/webhooks/clip` | Recibe notificaciones de estado (Webhook) |
| GET | `/api/pagos/estado/:id` | Consulta estado para frontend |

## 🔑 Configuración de Seguridad
- **Variables de Entorno**:
  - `CLIP_API_KEY`: Llave privada de producción/sandbox.
  - `CLIP_API_SECRET`: Secreto para firmar peticiones (si aplica).
  - `CLIP_WEBHOOK_SECRET`: Para validar firma de webhooks.
- **Validación**: Verificar firma HMAC en todos los webhooks recibidos.

## 📦 Modelo de Datos (PostgreSQL)

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    clip_payment_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MXN',
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, refunded
    metadata JSONB, -- Datos extra de Clip
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🛠️ Pasos de Implementación
1. [ ] Configurar variables de entorno (`.env.local`).
2. [ ] Crear servicio `ClipService.ts` (lógica de negocio).
3. [ ] Implementar API Routes Next.js.
4. [ ] Crear Webhook Handler con validación de seguridad.
5. [ ] Integrar con componente de Checkout en Frontend.
