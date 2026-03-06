const fs = require('fs');
const lines = fs.readFileSync('remaining_v2_work.txt', 'utf-8').split('\n').filter(l => l.trim().length > 0);
const start = 0;
const end = 29;
const slice = lines.slice(start, end);
console.log(`Slice from ${start} to ${end}:`);
slice.forEach((l, i) => console.log(`${start + i}: ${l}`));
fs.writeFileSync('current_batch_list.txt', slice.join('\n'));
