const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'service-area/index.html',
  'privacy-policy/index.html',
  'terms/index.html',
  'editorial-policy/index.html',
  'roof-repair-bridgewater-nj/index.html',
  'roof-replacement-bridgewater-nj/index.html',
  'roof-leak-repair-bridgewater-nj/index.html',
  'emergency-roof-repair-bridgewater-nj/index.html',
  'storm-damage-roof-repair-bridgewater-nj/index.html',
  'residential-roofing-bridgewater-nj/index.html',
  'commercial-roofing-bridgewater-nj/index.html',
  'roof-inspection-bridgewater-nj/index.html',
  'metal-roofing-bridgewater-nj/index.html',
  'flat-roofing-bridgewater-nj/index.html',
  'service-area/roofer-somerville-nj/index.html',
  'service-area/roofer-raritan-nj/index.html',
  'service-area/roofer-martinsville-nj/index.html',
  'service-area/roofer-bound-brook-nj/index.html',
  'service-area/roofer-hillsborough-nj/index.html',
  'service-area/roofer-warren-nj/index.html',
  'service-area/roofer-basking-ridge-nj/index.html',
  'service-area/roofer-branchburg-nj/index.html',
  'service-area/roofer-bedminster-nj/index.html',
  'service-area/roofer-manville-nj/index.html',
  'blog/index.html',
  'blog/roof-repair-vs-replacement/index.html',
  'blog/what-causes-roof-leaks/index.html',
  'blog/roof-replacement-cost-bridgewater-nj/index.html',
  'blog/bridgewater-roofing-permit-guide/index.html',
  'blog/asphalt-shingles-vs-metal-roofing/index.html',
  'blog/what-to-check-after-a-nj-storm/index.html',
  'blog/how-long-does-a-roof-last-in-nj/index.html',
  'blog/tpo-vs-epdm-roofing/index.html',
  'roofing-services/index.html',
  'roofing-materials/index.html',
  'projects/index.html',
  'reviews/index.html',
  'roofing-cost/index.html',
  'authors/mark-henderson/index.html',
  '404.html',
  '404/index.html',
  'thank-you/index.html'
];

let brokenCount = 0;

pages.forEach(sourceFile => {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const regex = /href=["']([^"'#]+)["']/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    if (
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    let targetPath;
    if (href.startsWith('/')) {
      targetPath = '.' + href;
    } else {
      targetPath = path.join(path.dirname(sourceFile), href);
    }

    if (targetPath.endsWith('/')) {
      targetPath += 'index.html';
    } else if (!path.extname(targetPath)) {
      targetPath += '/index.html';
    }

    // Replace backslashes
    targetPath = targetPath.replace(/\\/g, '/');

    if (!fs.existsSync(targetPath)) {
      console.error(`[BROKEN LINK] in ${sourceFile} -> href="${href}" (resolved to: ${targetPath})`);
      brokenCount++;
    }
  }
});

if (brokenCount === 0) {
  console.log(`INTERNAL LINK AUDIT: 100% CLEAN. All internal links across all ${pages.length} pages are valid!`);
} else {
  console.log(`INTERNAL LINK AUDIT: Found ${brokenCount} broken link(s).`);
}
