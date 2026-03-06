module.exports = {
    apps: [
        {
            name: 'bienestar',
            script: 'node_modules/next/dist/bin/next',
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
