const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function validatePage(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Page not found: ${relPath}`);
    return false;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`\n=== Validating ${relPath} ===`);

  // 1. H1 count
  const h1Matches = content.match(/<h1[^>]*>/gi);
  console.log(`H1 count: ${h1Matches ? h1Matches.length : 0} (Expected: 1)`);

  // 2. Title & Meta description
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  console.log(`Meta description: ${descMatch ? descMatch[1].substring(0, 80) + '...' : 'MISSING'}`);

  // 3. Schema check
  const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (schemaMatch) {
    try {
      JSON.parse(schemaMatch[1]);
      console.log('Schema JSON-LD: VALID JSON');
    } catch(e) {
      console.error('Schema JSON-LD ERROR:', e.message);
    }
  } else {
    console.error('Schema JSON-LD: MISSING');
  }

  // 4. Image sources check
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let imgMatch;
  let missingImgs = 0;
  let totalImgs = 0;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    totalImgs++;
    const src = imgMatch[1];
    const resolved = path.resolve(path.dirname(fullPath), src);
    if (!fs.existsSync(resolved)) {
      console.warn(`  [MISSING IMAGE] ${src}`);
      missingImgs++;
    }
  }
  console.log(`Images: ${totalImgs - missingImgs}/${totalImgs} verified on disk.`);

  // 5. CSS files check
  const cssRegex = /<link[^>]+href=["']([^"']+\.css)["']/gi;
  let cssMatch;
  let missingCss = 0;
  let totalCss = 0;
  while ((cssMatch = cssRegex.exec(content)) !== null) {
    totalCss++;
    const href = cssMatch[1];
    const resolved = path.resolve(path.dirname(fullPath), href);
    if (!fs.existsSync(resolved)) {
      console.warn(`  [MISSING CSS] ${href}`);
      missingCss++;
    }
  }
  console.log(`CSS: ${totalCss - missingCss}/${totalCss} verified on disk.`);

  // 6. Check Phone CTA links
  const phoneLinks = content.match(/href="tel:\+19084659944"/g);
  console.log(`Phone CTAs: ${phoneLinks ? phoneLinks.length : 0} verified links.`);

  return true;
}

const pagesToCheck = process.argv.slice(2);
if (pagesToCheck.length === 0) {
  pagesToCheck.push(
    'roof-repair-bridgewater-nj/index.html',
    'roof-replacement-bridgewater-nj/index.html',
    'roof-leak-repair-bridgewater-nj/index.html'
  );
}

pagesToCheck.forEach(validatePage);
console.log('\nAudit complete.');
