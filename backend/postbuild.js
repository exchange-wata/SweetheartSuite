const fs = require('fs');

const endTime = Date.now();
const startTime = parseInt(fs.readFileSync('build-start-time.txt').toString(), 10);
const buildTime = endTime - startTime;

console.log(`Build time: ${buildTime}ms`);
