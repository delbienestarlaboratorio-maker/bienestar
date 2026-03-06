# 📋 Plan Maestro Completo: laboratorio.delbienestar.com.mx

**Fecha**: Enero 2026  
**Objetivo**: Desplegar plataforma de laboratorio clínico con IA, pagos Clip, hosting local redundante.

---

## 🎯 Resumen Ejecutivo

### Decisiones Técnicas Confirmadas
- ✅ **Dominio**: `laboratorio.delbienestar.com.mx`
- ✅ **Pasarela de Pago**: Clip API (México)
- ✅ **Hosting**: Servidores locales con HA (Alta Disponibilidad)
- ✅ **DNS**: GoDaddy + No-IP (IP dinámica)
- ✅ **Contenido**: Imágenes únicas (IA generativa) + Textos reescritos
- ✅ **Agenda**: Sistema integrado de citas

---

## 🏗️ FASE 1: Infraestructura Base

### 1.1 Configuración de Red y DNS

#### A. No-IP (DDNS)
**Propósito**: Resolver IP dinámica a nombre de host estático.

**Pasos**:
```bash
# 1. Crear cuenta en No-IP.com
# 2. Crear hostname: bienestar-lab.hopto.org

# 3. Instalar cliente No-IP en pfSense
# (pfSense > Services > Dynamic DNS)
Service: No-IP
Hostname: bienestar-lab.hopto.org
Username: tu_usuario_noip
Password: tu_password_noip
```

**Resultado**: `bienestar-lab.hopto.org` siempre apuntará a tu IP actual.

---

#### B. GoDaddy DNS (Dominio Principal)
**Propósito**: Redirigir `laboratorio.delbienestar.com.mx` al servidor local.

**Configuración en GoDaddy**:
```
Tipo: CNAME
Host: laboratorio
Apunta a: bienestar-lab.hopto.org
TTL: 600 (10 minutos para cambios rápidos)
```

**Flujo DNS**:
```
Usuario escribe: laboratorio.delbienestar.com.mx
     ↓
GoDaddy DNS resuelve: CNAME → bienestar-lab.hopto.org
     ↓
No-IP resuelve: bienestar-lab.hopto.org → Tu_IP_Actual
     ↓
Petición llega a pfSense (Puerto 443)
```

---

#### C. pfSense (Firewall/Router)
**Configuración de Port Forwarding**:

```
# Puerto 443 (HTTPS)
WAN Interface: *
External Port: 443
Internal IP: 192.168.1.100 (Servidor Primario Next.js)
Internal Port: 443

# Puerto 80 (HTTP → HTTPS redirect)
WAN Interface: *
External Port: 80
Internal IP: 192.168.1.100
Internal Port: 80
```

**Reglas de Firewall**:
```
WAN → Allow HTTPS (443) → 192.168.1.100
WAN → Allow HTTP (80) → 192.168.1.100
LAN → Allow All (para sincronización entre servidores)
```

---

### 1.2 Arquitectura de Alta Disponibilidad (HA)

```
┌─────────────────────────────────────────────┐
│          INTERNET (Usuarios)                │
└────────────┬────────────────────────────────┘
             │
             ▼
    ┌────────────────┐
    │  GoDaddy DNS   │ → laboratorio.delbienestar.com.mx
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │  No-IP DDNS    │ → bienestar-lab.hopto.org → IP Actual
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │    pfSense     │ (Firewall + Port Forward)
    └────────┬───────┘
             │
         ┌───┴────┐
         │        │
    ┌────▼─────┐ ┌────▼─────┐
    │ Servidor │ │ Servidor │
    │ Primario │ │ Respaldo │
    │  (Loc A) │ │  (Loc B) │
    └──────────┘ └──────────┘
         │            │
         └─────┬──────┘
               │
       ┌───────▼────────┐
       │ PostgreSQL DB  │ (Replicación Master-Slave)
       └────────────────┘
```

#### Servidor Primario (Ubicación A)
- **IP LAN**: 192.168.1.100
- **Stack**: Next.js + Node.js + PostgreSQL
- **Rol**: Activo (recibe tráfico)

#### Servidor Respaldo (Ubicación B - Otra ubicación física)
- **IP LAN**: 192.168.2.100 (red diferente vía VPN)
- **Stack**: Réplica exacta del primario
- **Rol**: Standby (toma control si primario falla)

#### Failover Automático
**Método 1: Keepalived (Recomendado para Linux)**
```bash
# Instalar en ambos servidores
apt install keepalived

# /etc/keepalived/keepalived.conf (Servidor Primario)
vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 100  # Primario tiene prioridad mayor
    advert_int 1
    
    virtual_ipaddress {
        192.168.1.200  # IP Virtual
    }
}

# Servidor Respaldo tiene priority 90
```

**Método 2: HAProxy (Si necesitas balanceo también)**
```yaml
# haproxy.cfg
frontend http-in
    bind *:80
    bind *:443 ssl crt /etc/ssl/certs/laboratorio.pem
    default_backend nextjs_servers

backend nextjs_servers
    balance roundrobin
    option httpchk GET /api/health
    server primary 192.168.1.100:3000 check inter 2000 rise 2 fall 3
    server backup 192.168.2.100:3000 check inter 2000 rise 2 fall 3 backup
```

---

### 1.3 Base de Datos PostgreSQL con Replicación

#### Configuración Master (Servidor Primario)
```sql
-- postgresql.conf
wal_level = replica
max_wal_senders = 3
wal_keep_size = 64

-- pg_hba.conf (permitir réplica desde servidor backup)
host replication replicator 192.168.2.100/32 md5
```

#### Configuración Slave (Servidor Respaldo)
```bash
# Crear réplica inicial
pg_basebackup -h 192.168.1.100 -D /var/lib/postgresql/14/main -U replicator -P

# recovery.conf (PostgreSQL 14+: postgresql.auto.conf)
primary_conninfo = 'host=192.168.1.100 port=5432 user=replicator password=XXX'
standby_mode = on
```

**Resultado**: Servidor Respaldo tiene copia en tiempo real de la BD.

---

## 💳 FASE 2: Integración de Clip (Pagos)

### 2.1 Configuración de Cuenta Clip

**Pasos Preliminares**:
1. Crear cuenta comercial en [clip.mx](https://clip.mx)
2. Activar "Clip Pro" o plan con API
3. Obtener credenciales en Developer Portal:
   - **API Key**: `pk_live_XXXXXXXX` (pública)
   - **Secret Key**: `sk_live_XXXXXXXX` (privada, NUNCA exponer)

---

### 2.2 Arquitectura de Integración Clip

**Opción Recomendada: API de Checkout Redireccionado**

**Flujo**:
```
1. Usuario agrega estudios al carrito
2. Frontend envía request a tu backend → /api/crear-pago-clip
3. Backend llama a Clip API → Genera payment_link
4. Redirect usuario a Clip → checkout.payclip.com/XXXXX
5. Usuario paga con tarjeta en servidor de Clip
6. Clip notifica vía Webhook → /api/clip-webhook
7. Backend verifica pago → Actualiza orden a "PAGADO"
8. Redirect usuario a → /confirmacion?orden=12345
```

---

### 2.3 Implementación Backend (Next.js API Routes)

#### Crear Pago (Checkout Link)
```typescript
// /app/api/crear-pago-clip/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { total, orden_id, estudios } = await request.json();
    
    const clipResponse = await fetch('https://api-gw.payclip.com/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CLIP_SECRET_KEY!
        },
        body: JSON.stringify({
            amount: total * 100, // Clip espera centavos
            currency: 'MXN',
            description: `Orden #${orden_id} - Laboratorio Del Bienestar`,
            redirect_url: `https://laboratorio.delbienestar.com.mx/confirmacion?orden=${orden_id}`,
            metadata: {
                orden_id: orden_id,
                estudios: estudios.map(e => e.nombre).join(', ')
            }
        })
    });
    
    const data = await clipResponse.json();
    
    // Guardar payment_id en BD
    await db.ordenes.update({
        where: { id: orden_id },
        data: { clip_payment_id: data.id }
    });
    
    return NextResponse.json({ 
        payment_url: data.payment_url // Redirigir usuario aquí
    });
}
```

#### Webhook de Confirmación
```typescript
// /app/api/clip-webhook/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get('x-clip-signature');
    
    // Verificar autenticidad del webhook
    const expectedSignature = crypto
        .createHmac('sha256', process.env.CLIP_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex');
    
    if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const event = JSON.parse(body);
    
    if (event.type === 'charge.paid') {
        const orden_id = event.data.metadata.orden_id;
        
        // Marcar orden como pagada
        await db.ordenes.update({
            where: { id: orden_id },
            data: { 
                status: 'PAGADO',
                fecha_pago: new Date(),
                metodo_pago: 'Clip',
                referencia_pago: event.data.id
            }
        });
        
        // Trigger: Generar boleta, enviar email, WhatsApp, etc.
        await enviarConfirmacionPago(orden_id);
    }
    
    return NextResponse.json({ received: true });
}
```

---

### 2.4 Variables de Entorno (.env.local)
```bash
# Clip API
CLIP_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXX
CLIP_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXX
CLIP_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX

# Database
DATABASE_URL=postgresql://user:pass@192.168.1.100:5432/laboratorio

# Ollama
OLLAMA_BASE_URL=http://192.168.1.101:11434
```

---

## 🎨 FASE 3: Contenido Único (Anti-Duplicado SEO)

### 3.1 Generación de Imágenes Únicas

**Herramienta**: Stable Diffusion / DALL-E / Midjourney API

**Estrategia**:
```python
# scripts/generar_imagenes_estudios.py

import replicate
import os

estudios = [
    {"nombre": "Química Sanguínea 45", "descripcion": "tubos de ensayo con sangre"},
    {"nombre": "Check-up Básico", "descripcion": "doctor revisando resultados"},
    # ... más estudios
]

for estudio in estudios:
    prompt = f"""
    Fotografía médica profesional de alta calidad mostrando {estudio['descripcion']}.
    Estilo: Clínico, moderno, iluminación suave.
    Ambiente: Laboratorio limpio y tecnológico.
    Sin texto, sin marcas de agua.
    """
    
    output = replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input={"prompt": prompt}
    )
    
    # Guardar imagen
    filename = f"public/images/estudios/{estudio['nombre'].lower().replace(' ', '-')}.webp"
    # ... descargar y optimizar
```

**Resultado**: Cada estudio tiene imagen única, generada por IA, optimizada en WebP.

---

### 3.2 Reescritura de Textos con IA (Anti-Plagio)

**Problema**: Los textos médicos de competencia son muy similares.

**Solución**: Ollama reescribe manteniendo precisión médica.

```python
# scripts/reescribir_descripciones.py

from ollama import Client

client = Client(host='http://192.168.1.101:11434')

texto_original = """
La Química Sanguínea de 45 elementos evalúa el funcionamiento 
de órganos vitales mediante análisis de sangre.
"""

prompt = f"""
Eres un médico especialista. Reescribe el siguiente texto médico 
manteniendo la precisión científica pero usando sinónimos y estructura diferente.
NO cambies términos médicos exactos (ej: "glucosa" sigue siendo "glucosa").

TEXTO ORIGINAL:
{texto_original}

TEXTO REESCRITO (diferente pero 100% preciso):
"""

response = client.generate(model='llama3.2', prompt=prompt)
texto_unico = response['response']

# Guardar en base de datos
```

**Verificación**: Usar herramientas como Copyscape o Grammarly Plagiarism Checker.

---

## 📅 FASE 4: Sistema de Agenda de Pacientes

### 4.1 Modelo de Datos

```sql
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    estudio_id INT REFERENCES estudios(id),
    sucursal_id INT REFERENCES sucursales(id),
    fecha_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDIENTE', -- PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE disponibilidad_sucursales (
    id SERIAL PRIMARY KEY,
    sucursal_id INT,
    dia_semana INT, -- 0=Domingo, 6=Sábado
    hora_inicio TIME,
    hora_fin TIME,
    capacidad_simultanea INT DEFAULT 5 -- Cuántos pacientes al mismo tiempo
);
```

---

### 4.2 Calendario Interactivo (Frontend)

**Librería**: React Big Calendar o FullCalendar

```tsx
// components/CalendarioAgenda.tsx

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

const localizer = momentLocalizer(moment);

export default function CalendarioAgenda({ sucursal_id }) {
    const [citas, setCitas] = useState([]);
    
    useEffect(() => {
        fetch(`/api/disponibilidad?sucursal=${sucursal_id}`)
            .then(res => res.json())
            .then(data => setCitas(data));
    }, [sucursal_id]);
    
    const handleSelectSlot = async ({ start, end }) => {
        // Usuario seleccionó un horario
        const confirmed = confirm(`¿Agendar cita para ${moment(start).format('LLL')}?`);
        
        if (confirmed) {
            await fetch('/api/agendar-cita', {
                method: 'POST',
                body: JSON.stringify({
                    fecha_hora: start,
                    sucursal_id,
                    paciente_id: session.user.id,
                    estudio_id: selectedEstudio
                })
            });
            
            // Refresh calendario
        }
    };
    
    return (
        <Calendar
            localizer={localizer}
            events={citas}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ height: 600 }}
        />
    );
}
```

---

### 4.3 Lógica de Disponibilidad (Backend)

```typescript
// /app/api/disponibilidad/route.ts

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sucursal_id = searchParams.get('sucursal');
    const fecha = searchParams.get('fecha') || new Date().toISOString().split('T')[0];
    
    // Obtener horarios laborales de la sucursal
    const horarios = await db.disponibilidad_sucursales.findMany({
        where: { sucursal_id: parseInt(sucursal_id!) }
    });
    
    // Generar slots de 30 minutos
    const slots = [];
    for (const horario of horarios) {
        let hora_actual = moment(horario.hora_inicio, 'HH:mm');
        const hora_limite = moment(horario.hora_fin, 'HH:mm');
        
        while (hora_actual < hora_limite) {
            // Verificar si ya hay citas en este horario
            const citasEnHora = await db.citas.count({
                where: {
                    sucursal_id: parseInt(sucursal_id!),
                    fecha_hora: hora_actual.toDate()
                }
            });
            
            if (citasEnHora < horario.capacidad_simultanea) {
                slots.push({
                    start: hora_actual.toDate(),
                    end: hora_actual.clone().add(30, 'minutes').toDate(),
                    available: true
                });
            }
            
            hora_actual.add(30, 'minutes');
        }
    }
    
    return NextResponse.json(slots);
}
```

---

### 4.4 Recordatorios Automáticos

**Integración con WhatsApp Bot Closer**:

```typescript
// cron/recordatorios.ts

import cron from 'node-cron';

// Ejecutar diario a las 9 AM
cron.schedule('0 9 * * *', async () => {
    // Buscar citas para mañana
    const citasManana = await db.citas.findMany({
        where: {
            fecha_hora: {
                gte: moment().add(1, 'day').startOf('day').toDate(),
                lte: moment().add(1, 'day').endOf('day').toDate()
            },
            status: 'CONFIRMADA'
        },
        include: { paciente: true, estudio: true, sucursal: true }
    });
    
    for (const cita of citasManana) {
        const mensaje = `
Hola ${cita.paciente.nombre}! 👋

Te recordamos tu cita para *${cita.estudio.nombre}*:
📅 Fecha: ${moment(cita.fecha_hora).format('DD/MM/YYYY')}
🕐 Hora: ${moment(cita.fecha_hora).format('HH:mm')}
📍 Sucursal: ${cita.sucursal.nombre}

Preparación: ${cita.estudio.preparacion}

¿Confirmas tu asistencia? Responde SÍ o NO.
        `;
        
        await enviarWhatsApp(cita.paciente.telefono, mensaje);
    }
});
```

---

## 🔒 FASE 5: Seguridad y SSL

### 5.1 Certificado SSL (Let's Encrypt)

**Opción A: Certificado Local (Servidor maneja SSL)**
```bash
# Instalar Certbot en servidor
apt install certbot

# Generar certificado (requiere puerto 80 abierto)
certbot certonly --standalone -d laboratorio.delbienestar.com.mx

# Certificados en: /etc/letsencrypt/live/laboratorio.delbienestar.com.mx/
# fullchain.pem (certificado)
# privkey.pem (llave privada)
```

**Configurar Next.js para HTTPS**:
```javascript
// server.js (Custom Next.js server)

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/laboratorio.delbienestar.com.mx/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/laboratorio.delbienestar.com.mx/fullchain.pem')
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(443, (err) => {
        if (err) throw err;
        console.log('> Ready on https://laboratorio.delbienestar.com.mx');
    });
});
```

**Auto-renovación**:
```bash
# Cron job para renovar cada 60 días
0 0 1 */2 * certbot renew --quiet && systemctl restart nextjs
```

---

**Opción B: Cloudflare Tunnel (Recomendado si quieres WAF gratis)**
```bash
# No requiere abrir puerto 443 en pfSense
cloudflared tunnel create bienestar-lab
cloudflared tunnel route dns bienestar-lab laboratorio.delbienestar.com.mx
cloudflared tunnel run bienestar-lab
```

**Ventaja**: SSL automático, DDoS protection, cache CDN gratis.

---

## 📊 FASE 6: Monitoring y Logs

### 6.1 Health Check Endpoint

```typescript
// /app/api/health/route.ts

export async function GET() {
    try {
        // Verificar DB
        await db.$queryRaw`SELECT 1`;
        
        // Verificar Ollama
        const ollamaStatus = await fetch('http://192.168.1.101:11434/api/tags');
        
        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {
                database: 'ok',
                ollama: ollamaStatus.ok ? 'ok' : 'down'
            }
        });
    } catch (error) {
        return NextResponse.json({ status: 'unhealthy', error: error.message }, { status: 500 });
    }
}
```

---

### 6.2 Dashboard de Monitoreo (Opcional: Grafana)

```bash
# Instalar Prometheus + Grafana en servidor
docker-compose up -d prometheus grafana

# Configurar métricas de Next.js
```

---

## ✅ CHECKLIST FINAL DE DESPLIEGUE

### Infraestructura
- [ ] No-IP configurado y actualizado
- [ ] GoDaddy CNAME apuntando a No-IP hostname
- [ ] pfSense Port Forwarding (80, 443) → Servidor Primario
- [ ] Servidor Respaldo en Ubicación B configurado
- [ ] Replicación PostgreSQL Master-Slave activa
- [ ] Failover automático (Keepalived/HAProxy) probado

### Aplicación
- [ ] Next.js desplegado en `/var/www/laboratorio`
- [ ] SSL (Let's Encrypt o Cloudflare) activo
- [ ] Variables de entorno (.env.local) configuradas
- [ ] Clip API credenciales válidas
- [ ] Webhook de Clip registrado
- [ ] Database migrations aplicadas

### Contenido
- [ ] Al menos 50 estudios con imágenes únicas generadas
- [ ] Textos reescritos por Ollama (anti-plagio)
- [ ] FAQs por estudio publicadas
- [ ] Blog con 5 artículos SEO

### Integraciones
- [ ] WhatsApp Business API (Bot Closer) conectada
- [ ] Sistema de agenda funcional
- [ ] Recordatorios automáticos configurados
- [ ] Google Analytics 4 instalado
- [ ] Google Search Console verificado

### Ollama Agents
- [ ] Sentinel (scraper automático) corriendo cada 6h
- [ ] Strategist (pricing dinámico) integrado en API
- [ ] Forecaster (predicción demanda) activo
- [ ] Closer (WhatsApp sales) operativo

### Testing
- [ ] Flujo completo de compra probado
- [ ] Pago con Clip exitoso (modo sandbox)
- [ ] Failover manual probado (apagar primario → respaldo toma control)
- [ ] Lighthouse score >90
- [ ] Schema.org validado

---

## 🚀 Orden de Ejecución Recomendado

### Semana 1: Fundamentos
1. Configurar No-IP + GoDaddy DNS
2. Configurar pfSense Port Forwarding
3. Instalar Next.js en Servidor Primario
4. Configurar PostgreSQL

### Semana 2: Aplicación Core
5. Desarrollar estructura base Next.js
6. Implementar Schema.org médico
7. Integrar Clip API (modo sandbox primero)
8. Crear sistema de carrito

### Semana 3: Contenido y IA
9. Generar imágenes únicas (100 estudios)
10. Reescribir textos con Ollama
11. Configurar Ollama Agents (Sentinel, Strategist)
12. Implementar pricing dinámico

### Semana 4: Agenda y Redundancia
13. Desarrollar sistema de citas
14. Integrar WhatsApp Bot (Closer)
15. Configurar Servidor Respaldo
16. Probar Failover

### Semana 5: Testing y Optimización
17. Lighthouse optimization
18. Pruebas de carga
19. Activar Clip PRODUCCIÓN
20. 🎉 **LANZAMIENTO**

---

**Próximo Paso**: ¿Iniciamos con la Semana 1 (configuración DNS y pfSense)?
