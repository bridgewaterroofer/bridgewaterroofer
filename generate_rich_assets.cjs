const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

// 1. service_leak.svg - Realistic Chimney Flashing & Valley Diagnostic
const serviceLeak = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
  <defs>
    <linearGradient id="sky_leak" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <linearGradient id="shingle_pat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="copper_flashing" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B45309"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <pattern id="shingle_rows" width="40" height="18" patternUnits="userSpaceOnUse">
      <rect width="40" height="18" fill="#1E293B"/>
      <line x1="0" y1="18" x2="40" y2="18" stroke="#0F172A" stroke-width="2"/>
      <line x1="15" y1="0" x2="15" y2="18" stroke="#334155" stroke-width="1.5"/>
      <line x1="35" y1="0" x2="35" y2="18" stroke="#334155" stroke-width="1.5"/>
    </pattern>
  </defs>
  <!-- Background / Sky -->
  <rect width="600" height="380" fill="url(#sky_leak)"/>
  
  <!-- Steep Roof Plane -->
  <polygon points="0,380 600,380 600,120 0,220" fill="url(#shingle_rows)"/>
  
  <!-- Brick Chimney -->
  <rect x="360" y="40" width="160" height="240" fill="#7F1D1D" stroke="#991B1B" stroke-width="2"/>
  <!-- Mortar lines -->
  <g stroke="#991B1B" stroke-width="2" opacity="0.6">
    <line x1="360" y1="70" x2="520" y2="70"/>
    <line x1="360" y1="100" x2="520" y2="100"/>
    <line x1="360" y1="130" x2="520" y2="130"/>
    <line x1="360" y1="160" x2="520" y2="160"/>
    <line x1="360" y1="190" x2="520" y2="190"/>
    <line x1="360" y1="220" x2="520" y2="220"/>
  </g>
  <rect x="350" y="30" width="180" height="16" fill="#475569" rx="3"/>

  <!-- Copper Step Flashing along roof-chimney intersection -->
  <polygon points="340,240 370,180 370,150 340,210" fill="url(#copper_flashing)"/>
  <polygon points="370,180 400,140 400,110 370,150" fill="url(#copper_flashing)"/>
  <polygon points="340,270 520,220 520,205 340,255" fill="url(#copper_flashing)"/>

  <!-- Roof Valley Seam -->
  <line x1="180" y1="180" x2="280" y2="380" stroke="#F59E0B" stroke-width="6"/>

  <!-- Precision Inspection Crosshair Target -->
  <circle cx="360" cy="220" r="45" fill="rgba(244,122,36,0.15)" stroke="#F47A24" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="360" cy="220" r="6" fill="#F47A24"/>
  <line x1="360" y1="165" x2="360" y2="275" stroke="#F47A24" stroke-width="1.5" stroke-dasharray="4 2"/>
  <line x1="305" y1="220" x2="415" y2="220" stroke="#F47A24" stroke-width="1.5" stroke-dasharray="4 2"/>

  <!-- Badge Tag -->
  <rect x="20" y="20" width="230" height="34" rx="17" fill="rgba(7,19,31,0.9)" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="38" cy="37" r="6" fill="#F47A24"/>
  <text x="54" y="42" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700">PRECISION LEAK DETECTION</text>
</svg>`;

// 2. service_emergency.svg - Rapid Emergency Roof Tarping & Protection
const serviceEmergency = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
  <defs>
    <linearGradient id="sky_emerg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="tarp_blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1D4ED8"/>
      <stop offset="50%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#1E40AF"/>
    </linearGradient>
  </defs>
  <rect width="600" height="380" fill="url(#sky_emerg)"/>

  <!-- Roof Peak & Rafters -->
  <polygon points="50,380 300,100 550,380" fill="#0F172A"/>
  
  <!-- Shingle details -->
  <g stroke="#1E293B" stroke-width="2">
    <line x1="120" y1="300" x2="480" y2="300"/>
    <line x1="180" y1="230" x2="420" y2="230"/>
    <line x1="230" y1="170" x2="370" y2="170"/>
  </g>

  <!-- Heavy Duty Industrial Blue Tarp over breached slope -->
  <polygon points="200,200 340,110 460,240 380,360 160,340" fill="url(#tarp_blue)" opacity="0.95"/>
  <!-- Tarp Weave Grid Texture -->
  <g stroke="#60A5FA" stroke-width="1" opacity="0.3">
    <line x1="200" y1="200" x2="380" y2="360"/>
    <line x1="240" y1="180" x2="420" y2="330"/>
    <line x1="170" y1="270" x2="430" y2="180"/>
    <line x1="190" y1="310" x2="450" y2="220"/>
  </g>

  <!-- Anchoring Wood 2x4 Furring Strips -->
  <line x1="220" y1="180" x2="280" y2="340" stroke="#D97706" stroke-width="8" stroke-linecap="round"/>
  <line x1="380" y1="160" x2="420" y2="320" stroke="#D97706" stroke-width="8" stroke-linecap="round"/>
  <line x1="230" y1="320" x2="410" y2="300" stroke="#D97706" stroke-width="8" stroke-linecap="round"/>

  <!-- Fastener Screws on batten -->
  <circle cx="230" cy="210" r="3" fill="#F8FAFC"/>
  <circle cx="250" cy="260" r="3" fill="#F8FAFC"/>
  <circle cx="270" cy="310" r="3" fill="#F8FAFC"/>
  <circle cx="390" cy="200" r="3" fill="#F8FAFC"/>
  <circle cx="410" cy="270" r="3" fill="#F8FAFC"/>

  <!-- Emergency Response Badge -->
  <rect x="20" y="20" width="220" height="34" rx="17" fill="rgba(7,19,31,0.9)" stroke="rgba(244,122,36,0.5)"/>
  <circle cx="38" cy="37" r="6" fill="#F47A24"/>
  <text x="54" y="42" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700">RAPID EMERGENCY TARPING</text>
</svg>`;

// 3. service_storm.svg - High Wind & Hail Storm Restoration
const serviceStorm = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
  <defs>
    <linearGradient id="storm_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="600" height="380" fill="url(#storm_sky)"/>

  <!-- Roof slope -->
  <polygon points="0,380 600,380 600,140 0,260" fill="#1E293B"/>
  
  <!-- Shingle courses -->
  <g stroke="#334552" stroke-width="2">
    <line x1="0" y1="280" x2="600" y2="160"/>
    <line x1="0" y1="310" x2="600" y2="190"/>
    <line x1="0" y1="340" x2="600" y2="220"/>
  </g>

  <!-- Exposed Underlayment Deck Area from Wind Uplift -->
  <polygon points="180,290 320,260 300,340 160,360" fill="#0A0F1D" stroke="#F47A24" stroke-width="2"/>
  <text x="235" y="325" fill="#F47A24" font-family="system-ui, sans-serif" font-size="11" font-weight="700">EXPOSED UNDERLAYMENT</text>

  <!-- Creased and lifted shingle tab -->
  <polygon points="310,260 440,230 460,200 330,225" fill="#334155" stroke="#FBBF24" stroke-width="3"/>
  <line x1="330" y1="225" x2="460" y2="200" stroke="#EF4444" stroke-width="3" stroke-dasharray="4 2"/>
  
  <!-- Hail impact markers -->
  <circle cx="120" cy="300" r="14" fill="rgba(239,68,68,0.2)" stroke="#EF4444" stroke-width="2"/>
  <circle cx="120" cy="300" r="3" fill="#EF4444"/>
  <circle cx="480" cy="270" r="16" fill="rgba(239,68,68,0.2)" stroke="#EF4444" stroke-width="2"/>
  <circle cx="480" cy="270" r="3" fill="#EF4444"/>

  <!-- Wind vectors -->
  <path d="M50 100 Q 150 80 300 110 T 550 90" stroke="#38BDF8" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M80 140 Q 200 120 380 150 T 580 120" stroke="#38BDF8" stroke-width="2" fill="none" opacity="0.4"/>

  <!-- Badge -->
  <rect x="20" y="20" width="230" height="34" rx="17" fill="rgba(7,19,31,0.9)" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="38" cy="37" r="6" fill="#FBBF24"/>
  <text x="54" y="42" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700">STORM RESTORATION AUDIT</text>
</svg>`;

// 4. service_commercial.svg - Commercial TPO & Flat Membrane System
const serviceCommercial = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
  <defs>
    <linearGradient id="sky_comm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#93C5FD"/>
    </linearGradient>
  </defs>
  <rect width="600" height="380" fill="url(#sky_comm)"/>

  <!-- Parapet Wall & Low-Slope Deck Perspective -->
  <polygon points="40,160 560,160 600,380 0,380" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  
  <!-- Heat Welded TPO Membrane Seams -->
  <g stroke="#94A3B8" stroke-width="3">
    <line x1="160" y1="160" x2="130" y2="380"/>
    <line x1="300" y1="160" x2="290" y2="380"/>
    <line x1="440" y1="160" x2="450" y2="380"/>
    <line x1="20" y1="260" x2="580" y2="260" stroke="#F47A24" stroke-width="2"/>
  </g>

  <!-- Parapet Coping Cap (Metal Trim) -->
  <polygon points="30,150 570,150 560,165 40,165" fill="#334155"/>
  <line x1="30" y1="150" x2="570" y2="150" stroke="#0F172A" stroke-width="2"/>

  <!-- Commercial Rooftop HVAC Curb -->
  <rect x="340" y="190" width="130" height="85" fill="#64748B" rx="4" stroke="#475569" stroke-width="2"/>
  <rect x="350" y="175" width="110" height="20" fill="#475569" rx="2"/>
  <!-- Curb Flashing Corner Wrap -->
  <polygon points="330,275 480,275 470,265 340,265" fill="#E2E8F0" stroke="#F47A24" stroke-width="2"/>

  <!-- Internal Commercial Roof Drain -->
  <circle cx="210" cy="310" r="22" fill="#334155" stroke="#0F172A" stroke-width="2"/>
  <circle cx="210" cy="310" r="12" fill="#0F172A"/>
  <line x1="210" y1="288" x2="210" y2="332" stroke="#64748B" stroke-width="2"/>
  <line x1="188" y1="310" x2="232" y2="310" stroke="#64748B" stroke-width="2"/>

  <!-- Badge -->
  <rect x="20" y="20" width="220" height="34" rx="17" fill="rgba(7,19,31,0.9)" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="38" cy="37" r="6" fill="#38BDF8"/>
  <text x="54" y="42" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700">COMMERCIAL FLAT &amp; TPO</text>
</svg>`;

// Write services SVGs
fs.writeFileSync(path.join(imgDir, 'service_leak.svg'), serviceLeak);
fs.writeFileSync(path.join(imgDir, 'service_emergency.svg'), serviceEmergency);
fs.writeFileSync(path.join(imgDir, 'service_storm.svg'), serviceStorm);
fs.writeFileSync(path.join(imgDir, 'service_commercial.svg'), serviceCommercial);

console.log('Successfully upgraded service card SVGs!');
