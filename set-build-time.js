const fs = require('fs');
const path = 'dist/assets/build-info.json'; // Corrected path
const dir = 'dist/assets';

// Ensure the directory exists before writing
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Get the correct ISO-formatted build timestamp
const buildInfo = {
    buildTime: new Date().toISOString(), // ISO 8601 format
    version: process.env.GITHUB_REF_NAME || "local-dev" // Use GitHub branch/tag name if available
};

// Write the build info to JSON
fs.writeFileSync(path, JSON.stringify(buildInfo, null, 2));

console.log('✅ Build info saved:', buildInfo);
