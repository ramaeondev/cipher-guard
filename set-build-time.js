const fs = require('fs');
const filePath = 'dist/browser/assets/build-info.json';

const buildInfo = {
  version: '10.0.0',
  lastBuild: new Date().toISOString(),
};

fs.writeFileSync(filePath, JSON.stringify(buildInfo, null, 2));
console.log('✅ Build info generated:', buildInfo);
