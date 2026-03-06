# 🚀 Generador de Contenido - Versión Segura

Generador de descripciones para estudios médicos con sistema de checkpoint y validaciones de seguridad.

## ✨ Características Principales

### 🛡️ Seguridad
- **Validación de escape automática**: Verifica que no haya newlines reales en el output
- **Backup automático**: Crea backup antes de modificar archivos
- **Guardado incremental**: Guarda después de CADA estudio (no cada 10)
- **Manejo de errores**: Continúa si un estudio falla, sin perder progreso

### 📊 Sistema de Checkpoint
- **Persistencia de progreso**: Guarda en `generation_checkpoint.json`
- **Continuar automáticamente**: Al reiniciar, continúa desde donde se quedó
- **No reprocesa**: Evita generar descripciones para estudios ya completados

### 🎯 Funcionalidades
- **Estadísticas en tiempo real**: Cada 10 estudios muestra progreso
- **Estimación de tiempo**: Calcula tiempo restante
- **Pausar con Ctrl+C**: Guarda progreso antes de salir
- **Modo de estado**: Ver progreso actual sin ejecutar

---

## 📝 Uso Básico

### Iniciar/Continuar Generación
```powershell
cd d:\Paginas_web\pagina\laboratorio-bienestar
.\run-generation-safe.ps1
```

### Ver Estado Actual
```powershell
.\run-generation-safe.ps1 -Status
```

### Reiniciar Desde Cero
```powershell
.\run-generation-safe.ps1 -Reset
```

### Ver Ayuda
```powershell
.\run-generation-safe.ps1 -Help
```

---

## 🔧 Requisitos Previos

### 1. Ollama
```powershell
# Iniciar Ollama
ollama serve

# Descargar modelo (si no lo tienes)
ollama pull qwen2.5:7b
```

### 2. Python
- Python 3.8 o superior
- Módulo `requests` (incluido en Python estándar)

---

## 📊 Ejemplo de Ejecución

### Primera Vez
```
🔍 Verificando requisitos...
✅ Python: Python 3.11.5
✅ Archivo studies.ts encontrado
✅ Ollama está corriendo
✅ Modelo qwen2.5:7b disponible
✅ Script de generación encontrado

🚀 Iniciando generación...
   Presiona Ctrl+C para pausar y guardar

📝 Iniciando generación desde cero...
💾 Backup creado: src\data\studies.ts.backup.20260201_162500

📖 Leyendo src\data\studies.ts...
   Estudios pendientes: 2351
   Ya completados: 0

🚀 [1/2351] QUÍMICA INTEGRAL DE 45 ELEMENTOS
   Categoría: analisis-clinicos
   ✅ Generado en 12.3s (142 palabras)
   💾 Guardado automático

🚀 [2/2351] PERFIL LIPÍDICO
   Categoría: analisis-clinicos
   ✅ Generado en 10.8s (138 palabras)
   💾 Guardado automático
```

### Pausar con Ctrl+C
```
🚀 [42/2351] HEMOGLOBINA GLUCOSILADA
   Categoría: analisis-clinicos
   ✅ Generado en 11.2s (145 palabras)
   💾 Guardado automático

[Presionas Ctrl+C]

⏸️  PAUSANDO...
💾 Guardando progreso antes de salir...
💾 Guardando checkpoint final...
✅ Progreso guardado. Ejecuta de nuevo para continuar.
```

### Continuar Después
```
🔍 Verificando requisitos...
✅ Todos los requisitos cumplidos

📊 Checkpoint cargado:
   Último procesado: 42
   Total completados: 42

📖 Leyendo src\data\studies.ts...
   Estudios pendientes: 2309  ← Salta los primeros 42
   Ya completados: 42

🚀 [43/2309] GLUCOSA EN AYUNAS  ← Continúa aquí
```

### Estadísticas Cada 10 Estudios
```
📊 Estadísticas:
   Completados: 50/2351 (2.1%)
   Velocidad promedio: 11.2s/estudio
   Tiempo restante estimado: 7.3 horas
```

---

## 📁 Archivos Generados

### `generation_checkpoint.json`
Contiene el estado actual de la generación:
```json
{
  "last_processed_index": 42,
  "processed_ids": ["1", "2", "3", ..., "42"],
  "total_processed": 42,
  "started_at": "2026-02-01T16:25:00",
  "last_save": "2026-02-01T16:30:45"
}
```

### `src\data\studies.ts.backup.YYYYMMDD_HHMMSS`
Backup automático creado antes de iniciar la generación.

---

## 🛡️ Validaciones de Seguridad

### 1. Escape de Caracteres
El script aplica estas transformaciones en ORDEN:
```python
# 1. Backslashes primero
text = text.replace('\\', '\\\\')

# 2. Newlines a literal \n
text = text.replace('\n', '\\n')

# 3. Eliminar carriage returns
text = text.replace('\r', '')

# 4. Comillas simples
text = text.replace("'", "\\'")

# 5. Tabs
text = text.replace('\t', '\\t')
```

### 2. Validación Post-Escape
```python
def validate_escaped_text(self, escaped_text: str) -> bool:
    # No debe tener saltos de línea REALES
    if '\n' in escaped_text or '\r' in escaped_text:
        return False
    return True
```

**Si la validación falla:**
```
❌ Error en escape para estudio 123: contiene newlines reales
⏭️  Continuando con siguiente estudio...
```

El error se reporta pero **NO se pierde progreso**. El estudio problemático se salta y continúa con el siguiente.

---

## 🔍 Comandos de Diagnóstico

### Ver Estado
```powershell
.\run-generation-safe.ps1 -Status
```

**Salida:**
```
📊 ESTADO DE LA GENERACIÓN
==================================================

✅ Checkpoint encontrado:
   Total procesados: 42
   IDs completados: 42
   Última actualización: 2026-02-01T16:30:45
   Iniciado: 2026-02-01T16:25:00

📚 Estudios:
   Total: 2351
   Con descripción: 42
   Pendientes: 2309

🤖 Estado de Ollama:
   ✅ Ollama está corriendo
   Modelos disponibles:
     - qwen2.5:7b
```

### Verificar Archivo Studies
```powershell
python -c "content = open('src/data/studies.ts', 'r', encoding='utf-8').read(); print(f'Total chars: {len(content)}')"
```

---

## ⚠️ Solución de Problemas

### Problema: "Ollama no está disponible"
**Solución:**
```powershell
ollama serve
```

### Problema: "Modelo no encontrado"
**Solución:**
```powershell
ollama pull qwen2.5:7b
```

### Problema: "Error en escape"
**Solución:**
- El script **automáticamente salta** el estudio problemático
- Revisa los logs para ver qué estudio falló
- El progreso se guarda de todas formas

### Problema: Página en blanco
**Causa:** Algún estudio tiene contenido corrupto

**Solución:**
```powershell
# 1. Detener cualquier proceso Python
Get-Process python | Stop-Process -Force

# 2. Eliminar checkpoint
Remove-Item generation_checkpoint.json -Force

# 3. Restaurar backup
copy "src\data\studies.ts.backup.YYYYMMDD_HHMMSS" "src\data\studies.ts" -Force

# 4. Reiniciar servidor
# Ctrl+C en terminal de npm
npm run dev
```

---

## 📈 Rendimiento Esperado

### Velocidad Promedio
- **10-15 segundos** por estudio
- **240-360 estudios** por hora
- **~7-10 horas** para 2,351 estudios

### Recursos
- **CPU**: Depende de Ollama (~30-50%)
- **RAM**: ~2-4 GB
- **Disco**: Backups ocupan ~1 MB cada uno

---

## ✅ Checklist de Ejecución

Antes de iniciar generación masiva:

- [ ] Ollama está corriendo (`ollama serve`)
- [ ] Modelo descargado (`ollama pull qwen2.5:7b`)
- [ ] Servidor dev detenido (libera recursos)
- [ ] Backup del archivo `studies.ts` existe
- [ ] Tienes tiempo suficiente (~7-10 horas)

**Opcional pero recomendado:**
- [ ] Crear backup manual: `copy src\data\studies.ts studies.ts.manual_backup`
- [ ] Ejecutar en modo background con log: `.\run-generation-safe.ps1 > generation.log 2>&1`

---

## 🎉 Al Completar

Cuando termine la generación:

1. **Verificar resultado:**
```powershell
.\run-generation-safe.ps1 -Status
```

2. **Reiniciar servidor:**
```powershell
npm run dev
```

3. **Probar sitio:**
```
http://localhost:30200/
```

4. **Eliminar checkpoint (opcional):**
```powershell
Remove-Item generation_checkpoint.json
```

---

## 📞 Soporte

Si encuentras problemas:

1. Ejecuta `.\run-generation-safe.ps1 -Status`
2. Verifica logs en terminal
3. Revisa backups en `src/data/studies.ts.backup.*`
4. El checkpoint siempre guarda tu progreso

**El sistema está diseñado para NO PERDER TRABAJO. Cada estudio se guarda inmediatamente.**
