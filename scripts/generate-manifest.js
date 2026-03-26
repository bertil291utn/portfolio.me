const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, '../data/site.json');
const outPath = path.join(__dirname, '../public/assets/manifest.json');

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
if (!site.pwa) {
  console.error('site.json must include a "pwa" object');
  process.exit(1);
}

fs.writeFileSync(outPath, `${JSON.stringify(site.pwa, null, 2)}\n`);
