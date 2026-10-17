const fs = require('fs');
const path = require('path');

const NEW_STICKY_CTA = `  <!-- ====================================================================
       MOBILE STICKY CALL CTA (Global)
       ==================================================================== -->
  <div class="mobile-sticky-bar" id="mobileStickyBar" aria-label="Mobile Call Action">
    <a href="tel:+19084659944" class="mobile-sticky-call-btn cta-phone" data-call-source="sticky-mobile">
      <div class="sticky-call-pulse-wrap" aria-hidden="true">
        <span class="sticky-call-pulse-ring"></span>
        <span class="sticky-call-icon-bg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </span>
      </div>
      <div class="sticky-call-details">
        <span class="sticky-call-action">Tap to Call Roofer Direct</span>
        <strong class="sticky-call-phone">(908) 465-9944</strong>
      </div>
      <div class="sticky-call-status">
        <span class="status-live-dot"></span>
        <span>24/7 Live</span>
      </div>
    </a>
  </div>`;

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html') && !dir.includes('scratch') && !file.includes('site-header')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getHtmlFiles('.');
console.log(`Processing ${files.length} HTML files...`);

let updatedCount = 0;
let alreadyCount = 0;
let noBarCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match existing mobile-sticky-bar
  const oldRegex = /<!--\s*={5,}\s*MOBILE STICKY CALL BAR[^\n]*\s*={5,}\s*-->[\s\S]*?<div class="mobile-sticky-bar"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i;
  const genericRegex = /<div class="mobile-sticky-bar"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i;

  if (content.includes('mobile-sticky-call-btn')) {
    alreadyCount++;
    continue;
  }

  if (oldRegex.test(content)) {
    content = content.replace(oldRegex, NEW_STICKY_CTA);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated (old comment pattern): ${filePath}`);
  } else if (genericRegex.test(content)) {
    content = content.replace(genericRegex, NEW_STICKY_CTA);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated (generic pattern): ${filePath}`);
  } else {
    noBarCount++;
    console.log(`No match found in: ${filePath}`);
  }
}

console.log(`\nSummary:`);
console.log(`- Updated: ${updatedCount}`);
console.log(`- Already using new CTA: ${alreadyCount}`);
console.log(`- No bar found: ${noBarCount}`);
