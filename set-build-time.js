const fs = require('fs');
const path = 'dist/browser/assets/build-info.json';
const dir = 'dist/browser/assets';

// Ensure the directory exists
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Write build time info
fs.writeFileSync(path, JSON.stringify({ buildTime: new Date().toISOString() }, null, 2));

console.log('Build info saved to', path);
