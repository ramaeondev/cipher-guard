const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const envPath = path.join(__dirname, 'src/environments/environment.ts');
const envProdPath = path.join(__dirname, 'src/environments/environment.prod.ts');

const version = packageJson.version;
const timestamp = new Date().toISOString();

const envContent = `export const environment = {
  production: false,
  version: '${version}',
  lastBuild: '${timestamp}'
};`;

const envProdContent = `export const environment = {
  production: true,
  version: '${version}',
  lastBuild: '${timestamp}'
};`;

fs.writeFileSync(envPath, envContent);
fs.writeFileSync(envProdPath, envProdContent);

console.log(`Updated environment files with version ${version} and build timestamp.`);
