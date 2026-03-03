module.exports = {
    apps: [
        {
            name: 'laboratorio-bienestar',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 30200 -H 127.0.0.1',
            interpreter: 'node',
            cwd: 'd:/Paginas_web/pagina/laboratorio-bienestar',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 30200
            },
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            min_uptime: '10s',
            max_restarts: 10,
            restart_delay: 4000,
            kill_timeout: 5000,
            listen_timeout: 3000,
            shutdown_with_message: false
        },
        {
            name: 'auto-documentation',
            script: 'services/auto-documentation/server.js',
            interpreter: 'node',
            cwd: 'd:/Paginas_web/pagina/laboratorio-bienestar',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'production',
                PORT: 30210
            },
            error_file: './logs/auto-doc-error.log',
            out_file: './logs/auto-doc-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            min_uptime: '10s',
            max_restarts: 10,
            restart_delay: 4000,
            kill_timeout: 5000,
            listen_timeout: 3000,
            shutdown_with_message: false
        },
        {
            name: 'system-backup',
            script: 'services/system-backup/index.js',
            interpreter: 'node',
            cwd: 'd:/Paginas_web/pagina/laboratorio-bienestar',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production'
            },
            error_file: './logs/backup-error.log',
            out_file: './logs/backup-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true
        }
    ]
};
