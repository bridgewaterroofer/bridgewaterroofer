/**
 * BRIDGEWATER ROOFER — GLOBAL LAYOUT SYNC UTILITY
 * 
 * Synchronizes the master global header and master global footer across all
 * HTML pages in the website so header & footer stay 100% identical.
 * 
 * Master Components:
 * - components/site-header.html (Header + Mobile Drawer Backdrop + Mobile Drawer)
 * - components/site-footer.html (5-Col Footer + Desktop Phone Pill + Mobile Sticky Bar + Legal Dialog)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const headerPath = path.join(rootDir, 'components', 'site-header.html');
const footerPath = path.join(rootDir, 'components', 'site-footer.html');

if (!fs.existsSync(headerPath) || !fs.existsSync(footerPath)) {
  console.error('Error: Master component files missing in components/');
  process.exit(1);
}

const headerContent = fs.readFileSync(headerPath, 'utf8').trim();
const footerContent = fs.readFileSync(footerPath, 'utf8').trim();

function applyGlobalLayout(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Locate end of scroll-progress-bar
  const progressPattern = /<div class="scroll-progress-bar"[^>]*><\/div>/i;
  const progressMatch = content.match(progressPattern);
  if (!progressMatch) {
    console.error(`[SKIP] Could not find scroll-progress-bar in ${filePath}`);
    return;
  }
  const topCut = progressMatch.index + progressMatch[0].length;
  const topPart = content.substring(0, topCut);

  // 2. Locate main content
  const mainStartMatch = content.match(/<main id="main-content">/i);
  const mainEndMatch = content.match(/<\/main>/i);
  if (!mainStartMatch || !mainEndMatch) {
    console.error(`[SKIP] Could not find <main> in ${filePath}`);
    return;
  }
  const mainContent = content.substring(mainStartMatch.index, mainEndMatch.index + mainEndMatch[0].length);

  // 3. Locate bottom script tag
  const scriptPattern = /<script\s+type="module"\s+src="[^"]+"><\/script>/i;
  const scriptMatch = content.match(scriptPattern);
  let scriptTag = '<script type="module" src="js/main.js"></script>';
  if (scriptMatch) {
    scriptTag = scriptMatch[0];
  }

  // 4. Reconstruct document
  const finalDoc = `${topPart}\n\n${headerContent}\n\n  ${mainContent}\n\n${footerContent}\n\n  ${scriptTag}\n</body>\n</html>\n`;

  fs.writeFileSync(filePath, finalDoc, 'utf8');
  console.log(`[SUCCESS] Synced global header & footer in ${path.relative(rootDir, filePath)}`);
}

function findHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'components') {
        files.push(...findHtmlFiles(fullPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlPages = findHtmlFiles(rootDir);
console.log(`Found ${htmlPages.length} HTML pages to sync.`);

htmlPages.forEach(applyGlobalLayout);

console.log('Global layout sync complete.');
