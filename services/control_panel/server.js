const http = require('http');

const PORT = 30205;

const server = http.createServer((req, res) => {
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/status' || req.url === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({
            service: 'System Control Center',
            status: 'active',
            port: PORT,
            features: [
                'Module Management (PM2)',
                'API Intelligence',
                'Scraping Control',
                'Pricing Strategy',
                'Global Metrics'
            ]
        }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`System Control Center (God Mode) running on port ${PORT}`);
});
