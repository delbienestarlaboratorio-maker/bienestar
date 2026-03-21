/**
 * Custom Next.js Production Server
 * 
 * Workaround for Next.js 16 bug where page-specific CSS chunks
 * are generated and referenced in SSG HTML but not served by
 * the built-in production server.
 * 
 * This server intercepts requests for _next/static/* files and
 * serves them directly from the .next/static/ directory if they
 * exist on disk, even if Next.js's internal routing doesn't
 * recognize them.
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const port = parseInt(process.env.PORT || '30200', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// MIME types for static files
const MIME_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.map': 'application/json',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
};

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            // Intercept _next/static/* requests
            if (pathname && pathname.startsWith('/_next/static/')) {
                const relativePath = pathname.replace('/_next/static/', '');
                const filePath = path.join(__dirname, '.next', 'static', relativePath);

                // Check if the file exists on disk
                if (fs.existsSync(filePath)) {
                    const ext = path.extname(filePath);
                    const mime = MIME_TYPES[ext] || 'application/octet-stream';
                    const stat = fs.statSync(filePath);

                    res.setHeader('Content-Type', mime);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                    res.setHeader('CDN-Cache-Control', 'no-store');
                    res.setHeader('Cloudflare-CDN-Cache-Control', 'no-store');
                    res.statusCode = 200;

                    const stream = fs.createReadStream(filePath);
                    stream.pipe(res);
                    return;
                }
            }

            // Default: let Next.js handle the request
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
