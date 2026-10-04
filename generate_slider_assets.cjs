const fs = require('fs');
const path = require('path');
const imgDir = path.join(__dirname, 'assets', 'images');

// 1. BEFORE ROOF (Realistic Aged Colonial Home)
const beforeRoof = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506" width="900" height="506">
  <defs>
    <linearGradient id="sky_overcast" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="60%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <pattern id="aged_shingles" width="36" height="16" patternUnits="userSpaceOnUse">
      <rect width="36" height="16" fill="#334155"/>
      <line x1="0" y1="16" x2="36" y2="16" stroke="#1E293B" stroke-width="2"/>
      <line x1="12" y1="0" x2="12" y2="16" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="28" y1="0" x2="28" y2="16" stroke="#0F172A" stroke-width="1.5"/>
      <!-- Curling tabs and missing granules -->
      <circle cx="8" cy="12" r="3" fill="#1E293B" opacity="0.8"/>
      <circle cx="22" cy="6" r="4" fill="#4D7C0F" opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Sky -->
  <rect width="900" height="506" fill="url(#sky_overcast)"/>

  <!-- Background Trees -->
  <path d="M0,320 Q60,240 120,300 Q180,220 240,290 L900,290 L900,420 L0,420 Z" fill="#2D4A3E" opacity="0.7"/>

  <!-- Two-Story Colonial House Structure -->
  <polygon points="140,240 760,240 760,490 140,490" fill="#E2E8F0"/>
  <!-- Clapboard Siding Lines -->
  <g stroke="#CBD5E1" stroke-width="1">
    <line x1="140" y1="260" x2="760" y2="260"/>
    <line x1="140" y1="280" x2="760" y2="280"/>
    <line x1="140" y1="300" x2="760" y2="300"/>
    <line x1="140" y1="320" x2="760" y2="320"/>
    <line x1="140" y1="340" x2="760" y2="340"/>
    <line x1="140" y1="360" x2="760" y2="360"/>
    <line x1="140" y1="380" x2="760" y2="380"/>
    <line x1="140" y1="400" x2="760" y2="400"/>
    <line x1="140" y1="420" x2="760" y2="420"/>
    <line x1="140" y1="440" x2="760" y2="440"/>
    <line x1="140" y1="460" x2="760" y2="460"/>
  </g>

  <!-- Windows with Shutters -->
  <g fill="#1E293B">
    <!-- Upper Floor -->
    <rect x="200" y="270" width="60" height="80" rx="2"/>
    <rect x="320" y="270" width="60" height="80" rx="2"/>
    <rect x="520" y="270" width="60" height="80" rx="2"/>
    <rect x="640" y="270" width="60" height="80" rx="2"/>
    <!-- Lower Floor -->
    <rect x="200" y="380" width="60" height="90" rx="2"/>
    <rect x="320" y="380" width="60" height="90" rx="2"/>
    <rect x="520" y="380" width="60" height="90" rx="2"/>
    <rect x="640" y="380" width="60" height="90" rx="2"/>
    <!-- Front Door -->
    <rect x="420" y="380" width="60" height="110" rx="2" fill="#0F172A"/>
  </g>

  <!-- Brick Chimney with Stained Mortar -->
  <rect x="640" y="70" width="70" height="180" fill="#7F1D1D" stroke="#991B1B" stroke-width="2"/>
  <rect x="635" y="60" width="80" height="15" fill="#475569" rx="2"/>

  <!-- Aged Steep Gable Roof Plane -->
  <polygon points="90,250 450,80 810,250" fill="url(#aged_shingles)"/>
  
  <!-- Weathered Dormers -->
  <polygon points="260,210 320,150 380,210" fill="#1E293B"/>
  <polygon points="520,210 580,150 640,210" fill="#1E293B"/>

  <!-- Visible Shingle Distress / Patches -->
  <!-- Moss patch on north valley -->
  <ellipse cx="320" cy="180" rx="25" ry="12" fill="#4D7C0F" opacity="0.75"/>
  <ellipse cx="480" cy="160" rx="35" ry="16" fill="#365314" opacity="0.7"/>
  <!-- Blown off tab spot -->
  <rect x="380" y="190" width="30" height="18" fill="#0B1320" stroke="#EF4444" stroke-width="1.5"/>

  <!-- Front Lawn -->
  <rect x="0" y="475" width="900" height="31" fill="#3B5A45"/>

  <!-- Badge -->
  <rect x="30" y="30" width="260" height="42" rx="8" fill="rgba(7,19,31,0.92)" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="50" cy="51" r="7" fill="#EF4444"/>
  <text x="68" y="56" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="800">BEFORE: 22-YR AGED SHINGLES</text>
</svg>`;

// 2. AFTER ROOF (Pristine Architectural Shingle Replacement)
const afterRoof = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506" width="900" height="506">
  <defs>
    <linearGradient id="sky_sunny" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="60%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#BAE6FD"/>
    </linearGradient>
    <pattern id="new_arch_shingles" width="32" height="15" patternUnits="userSpaceOnUse">
      <rect width="32" height="15" fill="#0F172A"/>
      <line x1="0" y1="15" x2="32" y2="15" stroke="#1E293B" stroke-width="2"/>
      <line x1="10" y1="0" x2="10" y2="15" stroke="#334155" stroke-width="1.5"/>
      <line x1="24" y1="0" x2="24" y2="15" stroke="#334155" stroke-width="1.5"/>
      <!-- Shadow band -->
      <line x1="0" y1="3" x2="32" y2="3" stroke="#475569" stroke-width="1.2"/>
    </pattern>
    <linearGradient id="copper_trim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B45309"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
  </defs>

  <!-- Clear Sky with Sun Flare -->
  <rect width="900" height="506" fill="url(#sky_sunny)"/>
  <circle cx="820" cy="70" r="120" fill="#FEF08A" opacity="0.4"/>

  <!-- Lush Green Background Trees -->
  <path d="M0,320 Q60,230 120,290 Q180,210 240,280 L900,280 L900,420 L0,420 Z" fill="#15803D" opacity="0.85"/>

  <!-- Two-Story Colonial House Structure (Refreshed) -->
  <polygon points="140,240 760,240 760,490 140,490" fill="#F8FAFC"/>
  <!-- Crisp Siding Lines -->
  <g stroke="#E2E8F0" stroke-width="1">
    <line x1="140" y1="260" x2="760" y2="260"/>
    <line x1="140" y1="280" x2="760" y2="280"/>
    <line x1="140" y1="300" x2="760" y2="300"/>
    <line x1="140" y1="320" x2="760" y2="320"/>
    <line x1="140" y1="340" x2="760" y2="340"/>
    <line x1="140" y1="360" x2="760" y2="360"/>
    <line x1="140" y1="380" x2="760" y2="380"/>
    <line x1="140" y1="400" x2="760" y2="400"/>
    <line x1="140" y1="420" x2="760" y2="420"/>
    <line x1="140" y1="440" x2="760" y2="440"/>
    <line x1="140" y1="460" x2="760" y2="460"/>
  </g>

  <!-- Crisp Black Windows & Architectural Trim -->
  <g fill="#0F172A">
    <rect x="200" y="270" width="60" height="80" rx="2"/>
    <rect x="320" y="270" width="60" height="80" rx="2"/>
    <rect x="520" y="270" width="60" height="80" rx="2"/>
    <rect x="640" y="270" width="60" height="80" rx="2"/>
    <rect x="200" y="380" width="60" height="90" rx="2"/>
    <rect x="320" y="380" width="60" height="90" rx="2"/>
    <rect x="520" y="380" width="60" height="90" rx="2"/>
    <rect x="640" y="380" width="60" height="90" rx="2"/>
    <rect x="420" y="380" width="60" height="110" rx="2" fill="#1E293B"/>
  </g>

  <!-- Re-pointed Brick Chimney with Copper Flashing -->
  <rect x="640" y="70" width="70" height="180" fill="#991B1B" stroke="#B91C1C" stroke-width="2"/>
  <rect x="635" y="60" width="80" height="15" fill="#334155" rx="2"/>
  <polygon points="630,230 720,230 710,210 635,210" fill="url(#copper_trim)"/>

  <!-- Brand New Pristine Steep Dimensional Architectural Shingle Roof -->
  <polygon points="90,250 450,80 810,250" fill="url(#new_arch_shingles)"/>

  <!-- Continuous Ridge Cap Vent along Ridge Line -->
  <polygon points="435,74 465,74 468,84 432,84" fill="#020617"/>
  <line x1="435" y1="76" x2="465" y2="76" stroke="#F47A24" stroke-width="2"/>

  <!-- New Seamless White Aluminum Eaves & Gutters -->
  <line x1="85" y1="250" x2="815" y2="250" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
  <line x1="90" y1="250" x2="450" y2="80" stroke="#F47A24" stroke-width="2.5"/>
  <line x1="450" y1="80" x2="810" y2="250" stroke="#F47A24" stroke-width="2.5"/>

  <!-- Fresh Manicured Lawn -->
  <rect x="0" y="475" width="900" height="31" fill="#15803D"/>

  <!-- Badge -->
  <rect x="580" y="30" width="290" height="42" rx="8" fill="#F47A24" stroke="rgba(255,255,255,0.3)"/>
  <circle cx="600" cy="51" r="7" fill="#FFFFFF"/>
  <text x="618" y="56" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="800">AFTER: COMPLETE REPLACEMENT ✓</text>
</svg>`;

// Write Before / After files
fs.writeFileSync(path.join(imgDir, 'before_roof.svg'), beforeRoof);
fs.writeFileSync(path.join(imgDir, 'after_roof.svg'), afterRoof);

// 3. Realistic Editorial Blog SVG Headers
const blog1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" height="320">
  <defs>
    <linearGradient id="bg_b1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="600" height="320" fill="url(#bg_b1)"/>
  <polygon points="120,260 220,120 320,260" fill="#1E293B" stroke="#334552" stroke-width="2"/>
  <polygon points="280,260 380,100 480,260" fill="#0A1118" stroke="#F47A24" stroke-width="2"/>
  <!-- Scale / Divider Balance -->
  <line x1="50" y1="260" x2="550" y2="260" stroke="#475569" stroke-width="2"/>
  <circle cx="220" cy="180" r="30" fill="rgba(45,155,98,0.2)" stroke="#2D9B62" stroke-width="2"/>
  <text x="220" y="185" text-anchor="middle" fill="#2D9B62" font-family="system-ui, sans-serif" font-size="12" font-weight="800">REPAIR</text>
  <circle cx="380" cy="180" r="30" fill="rgba(244,122,36,0.2)" stroke="#F47A24" stroke-width="2"/>
  <text x="380" y="185" text-anchor="middle" fill="#F47A24" font-family="system-ui, sans-serif" font-size="11" font-weight="800">REPLACE</text>
</svg>`;

const blog2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" height="320">
  <defs>
    <linearGradient id="bg_b2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07131F"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="600" height="320" fill="url(#bg_b2)"/>
  <!-- Rain droplets and flashing detail -->
  <path d="M300 70 C300 70, 220 180, 220 220 A80 80 0 1 0 380 220 C380 180, 300 70, 300 70 Z" fill="rgba(56,189,248,0.15)" stroke="#38BDF8" stroke-width="3"/>
  <polygon points="270,180 330,180 315,220 285,220" fill="#F59E0B"/>
  <circle cx="300" cy="230" r="12" fill="#38BDF8"/>
  <text x="300" y="280" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="13" font-weight="700">HIDDEN PENETRATION LEAK TRACING</text>
</svg>`;

const blog3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" height="320">
  <defs>
    <linearGradient id="bg_b3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="600" height="320" fill="url(#bg_b3)"/>
  <rect x="180" y="40" width="240" height="230" rx="8" fill="#1E293B" stroke="#F47A24" stroke-width="2"/>
  <rect x="210" y="70" width="180" height="12" fill="#F47A24" rx="2"/>
  <rect x="210" y="95" width="130" height="8" fill="#64748B" rx="2"/>
  <line x1="210" y1="125" x2="390" y2="125" stroke="#334155" stroke-width="2"/>
  <line x1="210" y1="145" x2="390" y2="145" stroke="#334155" stroke-width="2"/>
  <line x1="210" y1="165" x2="360" y2="165" stroke="#334155" stroke-width="2"/>
  <!-- Official Seal Stamp -->
  <circle cx="340" cy="215" r="30" fill="rgba(244,122,36,0.15)" stroke="#F47A24" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="340" y="219" text-anchor="middle" fill="#FBBF24" font-family="system-ui, sans-serif" font-size="9" font-weight="800">UCC COMPLIANT</text>
  <text x="300" y="295" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="13" font-weight="700">TOWNSHIP OF BRIDGEWATER PERMIT GUIDE</text>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'blog_repair_replacement.svg'), blog1);
fs.writeFileSync(path.join(imgDir, 'blog_causes_leaks.svg'), blog2);
fs.writeFileSync(path.join(imgDir, 'blog_permit_guide.svg'), blog3);

console.log('Successfully upgraded Before/After and Blog SVGs!');
