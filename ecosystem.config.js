/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  LABORATORIO BIENESTAR - PM2 Configuration                  ║
 * ║                                                              ║
 * ║  ⚠️  PUERTO EXCLUSIVO: 30200                                ║
 * ║  Este sistema SOLO usa el puerto 30200.                      ║
 * ║  NO tocar el puerto 3000 ni ningún otro puerto local.        ║
 * ║  El puerto 3000 pertenece a OTRO sistema en esta máquina.    ║
 * ║                                                              ║
 * ║  Dev:  npm run dev       → localhost:30200                   ║
 * ║  Prod: pm2 start         → localhost:30200                   ║
 * ║  Build: npm run build    → genera .next/ (sin puerto)        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
module.exports = {
    apps: [
        {
            name: 'bienestar',
            cwd: 'd:\\Paginas_web\\pagina\\laboratorio-bienestar',
            script: 'd:\\Paginas_web\\pagina\\laboratorio-bienestar\\node_modules\\.bin\\next',
            // ⚠️ PUERTO 30200 — NO CAMBIAR. NO usar 3000.
            args: 'start -p 30200',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'cloudflare-tunnel',
            script: 'C:\\Users\\Administrador\\AppData\\Local\\Microsoft\\WinGet\\Links\\cloudflared.exe',
            args: 'tunnel run',
            interpreter: 'none',
            autorestart: true,
            watch: false,
        }
    ]
};
