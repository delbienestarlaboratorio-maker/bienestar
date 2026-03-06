const fs = require('fs');
const file = 'src/app/herramientas/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const payload = fs.readFileSync('payload.txt', 'utf8');
const viralSectionRegex = /\{\/\* SECCIÓN VIRALES Y ESTILO DE VIDA \*\/\}(.|\n)*$/m;

content = content.replace(viralSectionRegex, payload);
fs.writeFileSync(file, content);
console.log('Hub tools fixed via payload');
