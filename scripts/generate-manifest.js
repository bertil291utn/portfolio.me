const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, '../data/site.json');
const personPath = path.join(__dirname, '../data/person.json');
const outPath = path.join(__dirname, '../public/assets/manifest.json');

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
const person = JSON.parse(fs.readFileSync(personPath, 'utf8'));

if (!site.pwa) {
  console.error('site.json must include a "pwa" object');
  process.exit(1);
}

const pwa = { ...site.pwa, name: `${person.name} portfolio` };

fs.writeFileSync(outPath, `${JSON.stringify(pwa, null, 2)}\n`);
