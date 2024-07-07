const fs = require('fs');

const startTime = Date.now();
fs.writeFileSync('build-start-time.txt', startTime.toString());
