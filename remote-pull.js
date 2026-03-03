const http = require('http');

const options = {
    hostname: '192.168.20.70',
    port: 11434,
    path: '/api/pull',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');

    let lastLog = 0;
    res.on('data', (chunk) => {
        try {
            const data = JSON.parse(chunk.trim());
            const now = Date.now();

            // Log progress every 2 seconds to avoid console spam
            if (data.status && data.total && (now - lastLog > 2000)) {
                const percent = ((data.completed / data.total) * 100).toFixed(1);
                console.log(`[OLLAMA EXTERNO] Descargando qwen2.5:7b -> ${percent}% (${(data.completed / 1024 / 1024 / 1024).toFixed(2)}GB / ${(data.total / 1024 / 1024 / 1024).toFixed(2)}GB)`);
                lastLog = now;
            } else if (data.status && !data.total && (now - lastLog > 2000)) {
                console.log(`[OLLAMA EXTERNO] Estado: ${data.status}`);
                lastLog = now;
            }
        } catch (e) {
            // Some chunks might be split, ignore parsing errors for streaming logs
        }
    });

    res.on('end', () => {
        console.log('✅ Descarga en servidor remoto terminada.');
    });
});

req.on('error', (e) => {
    console.error(`❌ Problema con la petición al servidor remoto: ${e.message}`);
});

// Escribir el payload para jalar el modelo
req.write(JSON.stringify({
    name: 'qwen2.5:7b',
    stream: true
}));
req.end();
