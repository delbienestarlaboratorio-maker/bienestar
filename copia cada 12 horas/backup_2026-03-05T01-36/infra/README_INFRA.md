# 🛠️ Guía de Despliegue de Infraestructura (Fase 1)

Esta carpeta contiene las configuraciones listas para copiar/pegar en tus servidores Ubuntu.

## 1. Configuración de Nginx (Reverse Proxy)
**Archivo**: `nginx/laboratorio.conf`
**Ubicación en servidor**: `/etc/nginx/sites-available/laboratorio`

Pasos:
```bash
sudo apt install nginx
sudo cp nginx/laboratorio.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/laboratorio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 2. Alta Disponibilidad (Keepalived)
**Archivo Master**: `keepalived/master.conf` (Para Servidor Primario)
**Archivo Backup**: `keepalived/backup.conf` (Para Servidor Respaldo)
**Ubicación**: `/etc/keepalived/keepalived.conf`

Pasos:
```bash
sudo apt install keepalived
# Copiar el archivo correspondiente a /etc/keepalived/keepalived.conf
sudo systemctl enable keepalived
sudo systemctl start keepalived
```

## 3. Base de Datos (PostgreSQL Replication)
**Archivo**: `postgres/setup_replication.sql`
**Script**: `postgres/setup.sh`

Este script configura automáticamente el usuario replicator y los permisos.
