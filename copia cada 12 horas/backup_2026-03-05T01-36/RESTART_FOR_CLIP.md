# 🔄 Instrucciones de Reinicio

El servidor Next.js necesita reiniciarse para cargar las nuevas credenciales de Clip.

## ⚡ Pasos:

1. En la terminal donde corre `npm run dev`:
   - Presiona `Ctrl + C`
   - Espera a que termine
   
2. Vuelve a iniciar:
   ```bash
   npm run dev
   ```

3. Espera el mensaje:
   ```
   ✓ Ready in Xms
   ○ Local: http://localhost:30200
   ```

4. Ejecuta la prueba nuevamente:
   ```bash
   node test-clip.js
   ```

## 🎯 Resultado Esperado:

```
🔧 [ClipService] Initialized withOAuth:
🔑 [ClipService] Requesting new access token...
✅ [ClipService] Access token obtained
📊 [ClipService] Response status: 200 OK
✅ [ClipService] Payment link created successfully!
```

**El cambio a OAuth ya está implementado, solo falta que Next.js recargue las variables de entorno.**
