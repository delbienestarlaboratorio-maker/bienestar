# Carpeta CSV Bienestar

Esta carpeta es para gestionar los estudios que **realmente ofrece** Laboratorio Bienestar.

## 📋 Formato del CSV

Crea un archivo llamado `estudios_bienestar.csv` con el siguiente formato:

```csv
nombre,codigo,precio,categoria
BIOMETRÍA HEMÁTICA,BH001,250,analisis-clinicos
QUÍMICA SANGUÍNEA,QS001,350,analisis-clinicos
EXAMEN GENERAL DE ORINA,EGO001,150,analisis-clinicos
PERFIL TIROIDEO,PT001,800,check-ups
```

### Columnas:
- **nombre**: Nombre completo del estudio (tal como aparece en Chopo)
- **codigo**: Código interno de Bienestar (opcional)
- **precio**: Precio que cobra Bienestar
- **categoria**: Una de: `analisis-clinicos`, `check-ups`, `imagenologia`, `para-ella`, `para-el`

## 🚀 Cómo usar

1. **Coloca tu CSV aquí**: `csv_bienestar/estudios_bienestar.csv`

2. **Ejecuta el importador**:
   ```bash
   python csv_importer.py
   ```

3. **Revisa los archivos generados**:
   - `estudios_activos.json`: Lista de estudios que Bienestar ofrece
   - `update_status.json`: Script para actualizar el estado en la base de datos

4. **Actualiza en el panel de control**:
   - Ve a `http://localhost:30200/admin/studies`
   - Los estudios que NO estén en tu CSV se marcarán como "Pausados"
   - Los que SÍ estén se marcarán como "Activos"

## 📊 Ejemplo completo

Ver archivo: `ejemplo_estudios.csv`

## ⚠️ Importante

- Los nombres deben coincidir lo más posible con los de Chopo
- El script normaliza nombres (quita acentos, espacios extra, etc.) para mejor comparación
- Los estudios pausados NO aparecerán en el sitio web público
- Los estudios activos SIN contenido IA mostrarán descripciones genéricas

## 🤖 Enriquecimiento con IA

Una vez importados, puedes:
1. Ir al panel de control
2. Seleccionar estudios activos
3. Hacer clic en "Enriquecer con IA" para generar descripciones profesionales
