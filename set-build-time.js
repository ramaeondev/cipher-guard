const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
const envContent = `export const environment = {
  production: true,
  lastBuild: '${new Date().toISOString()}',
  version: '2'
};`;

fs.writeFileSync(envPath, envContent);