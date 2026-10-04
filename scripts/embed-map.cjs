const fs = require('fs');
const path = require('path');

const mapBlock = `      <!-- Footer Google Map Embed -->
      <div class="footer-map-wrapper">
        <div class="footer-map-header">
          <span class="footer-map-tag">Local Headquarters &amp; Service Territory</span>
          <h3 class="footer-map-title">Serving Bridgewater &amp; All Somerset County Communities</h3>
        </div>
        <div class="footer-map-frame">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96945.06681920284!2d-74.6000294!3d40.59605505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3eae1af7231f1%3A0x80bedb28bca3031c!2sBridgewater%2C%20NJ%2C%20USA!5e0!3m2!1sen!2s!4v1791047391403!5m2!1sen!2s" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Bridgewater Roofer Service Area Map"></iframe>
        </div>
      </div>

`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already embedded
  if (content.includes('footer-map-wrapper') || content.includes('1791047391403')) {
    console.log('[SKIPPED - Already has map]:', filePath);
    return;
  }

  // Skip files that use the placeholder component
  if (content.includes('id="site-footer-placeholder"')) {
    console.log('[SKIPPED - Uses component placeholder]:', filePath);
    return;
  }

  // Check for Pattern A: before <div class="footer-bottom-bar">
  if (content.includes('<!-- Footer Bottom Bar -->')) {
    content = content.replace('<!-- Footer Bottom Bar -->', mapBlock + '      <!-- Footer Bottom Bar -->');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS - Pattern A]: Embedded map in', filePath);
    return;
  } else if (content.includes('<div class="footer-bottom-bar">')) {
    content = content.replace('<div class="footer-bottom-bar">', mapBlock + '      <div class="footer-bottom-bar">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS - Pattern A2]: Embedded map in', filePath);
    return;
  }

  // Check for Pattern B: before <div class="footer-bottom">
  if (content.includes('<div class="footer-bottom">')) {
    content = content.replace('<div class="footer-bottom">', mapBlock + '    <div class="footer-bottom">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS - Pattern B]: Embedded map in', filePath);
    return;
  }

  console.warn('[WARNING - No footer hook found]:', filePath);
}

const allPages = [
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
  'blog/tpo-vs-epdm-roofing/index.html'
];

allPages.forEach(p => {
  if (fs.existsSync(p)) {
    processFile(p);
  }
});
