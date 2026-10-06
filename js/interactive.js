/**
 * BRIDGEWATER ROOFER — INTERACTIVE FEATURES MODULE
 * Pure Vanilla JavaScript
 */

export function initInteractiveFeatures() {
  initRoofDiagnosis();
  initMaterialExplorer();
  initBeforeAfterSlider();
  initCostGraphic();
  initReviewsCarousel();
  initFaqAccordion();
  initEstimateForm();
  initHighVolumeFormHandler();
  initLegalModal();
  initServiceAreaConsole();
  initServiceReviewsSlider();
}

/**
 * SECTION 5: INTERACTIVE ROOF PROBLEM DIAGNOSIS
 */
function initRoofDiagnosis() {
  const problemButtons = document.querySelectorAll('.problem-chip-btn');
  const hotspots = document.querySelectorAll('.roof-hotspot');
  const resultCard = document.querySelector('.diagnosis-result-card');
  const resultTitle = document.getElementById('diag-title');
  const resultDesc = document.getElementById('diag-desc');
  const resultLink = document.getElementById('diag-link');
  const resultTag = document.getElementById('diag-tag');

  const problemData = {
    'stains': {
      tag: 'Water Infiltration Alert',
      title: 'Interior Ceiling Stains & Attic Moisture',
      desc: 'Dark rings or moisture stains on ceilings typically indicate water traveling along rafters from a compromised valley, vent pipe boot, or damaged flashing above. Left unaddressed, moisture rapidly deteriorates insulation and drywall.',
      service: 'Roof Leak Repair',
      url: '#services',
      hotspotId: 'hotspot-ceiling'
    },
    'missing-shingles': {
      tag: 'Wind & Fastener Compromise',
      title: 'Missing or Blown-Off Shingles',
      desc: 'Wind uplift or aged seal strips expose the underlayment and plywood deck directly to rain and ice. Prompt shingle replacement prevents extensive water infiltration and decking rot.',
      service: 'Roof Repair Services',
      url: '#services',
      hotspotId: 'hotspot-shingles'
    },
    'active-leak': {
      tag: 'Urgent Attention Needed',
      title: 'Active Water Dripping or Inflow',
      desc: 'Active leaks during rainstorms require immediate emergency tarping or targeted leak mitigation to prevent ceiling collapse and structural frame damage.',
      service: 'Emergency Roofing & Leak Repair',
      url: '#services',
      hotspotId: 'hotspot-valley'
    },
    'flashing': {
      tag: 'Seam & Penetration Wear',
      title: 'Damaged Chimney or Wall Flashing',
      desc: 'Flashing seals joints where the roof meets vertical masonry or sidewalls. Cracked sealant or rusted step flashing is one of the top causes of persistent New Jersey roof leaks.',
      service: 'Precision Flashing Repair',
      url: '#services',
      hotspotId: 'hotspot-flashing'
    },
    'storm-damage': {
      tag: 'Severe Weather Impact',
      title: 'Hail, High Wind or Tree Limb Impact',
      desc: 'Nor’easters and severe summer thunderstorms in Somerset County can crease shingle tabs, dislodge ridge caps, or puncture roof sheathing.',
      service: 'Storm Damage Assessment',
      url: '#services',
      hotspotId: 'hotspot-vent'
    },
    'worn-roof': {
      tag: 'End of Useful Service Life',
      title: 'Granule Loss, Curling & Brittle Shingles',
      desc: 'When shingles reach 20–25 years old, UV oxidation causes curling edges and bald fiberglass spots. At this stage, localized repairs become temporary band-aids.',
      service: 'Roof Replacement Options',
      url: '#services',
      hotspotId: 'hotspot-shingles'
    },
    'sagging': {
      tag: 'Structural Caution',
      title: 'Visible Roofline Sagging or Dip',
      desc: 'A sagging roof plane indicates compromised structural rafters, saturated decking, or excessive load. Immediate professional evaluation is essential.',
      service: 'Comprehensive Roof Assessment',
      url: '#services',
      hotspotId: 'hotspot-gutter'
    }
  };

  function selectProblem(problemKey) {
    const data = problemData[problemKey];
    if (!data) return;

    // Update buttons state
    problemButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-problem') === problemKey;
      btn.classList.toggle('is-selected', isMatch);
      btn.setAttribute('aria-pressed', isMatch);
    });

    // Update hotspots state
    hotspots.forEach((hs) => {
      const isHotspot = hs.id === data.hotspotId;
      hs.classList.toggle('is-active', isHotspot);
    });

    // Animate Card Content Update
    if (resultCard) {
      resultCard.style.opacity = '0.4';
      resultCard.style.transform = 'translateY(6px)';

      setTimeout(() => {
        if (resultTag) resultTag.textContent = data.tag;
        if (resultTitle) resultTitle.textContent = data.title;
        if (resultDesc) resultDesc.textContent = data.desc;
        if (resultLink) {
          resultLink.textContent = `View ${data.service} →`;
          resultLink.setAttribute('href', data.url);
        }
        resultCard.style.opacity = '1';
        resultCard.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  // Button clicks
  problemButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-problem');
      selectProblem(key);
    });
  });

  // Hotspot clicks & keyboard accessibility
  hotspots.forEach((hs) => {
    hs.addEventListener('click', () => {
      const targetProblem = hs.getAttribute('data-linked-problem');
      if (targetProblem) {
        selectProblem(targetProblem);
      }
    });

    hs.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetProblem = hs.getAttribute('data-linked-problem');
        if (targetProblem) {
          selectProblem(targetProblem);
        }
      }
    });
  });
}

/**
 * SECTION 9: ROOFING MATERIAL EXPLORER
 */
function initMaterialExplorer() {
  const tabs = document.querySelectorAll('.material-tab-btn');
  const title = document.getElementById('mat-title');
  const desc = document.getElementById('mat-desc');
  const app = document.getElementById('mat-app');
  const dur = document.getElementById('mat-dur');
  const mnt = document.getElementById('mat-mnt');
  const link = document.getElementById('mat-link');
  const renderVisual = document.getElementById('mat-visual-svg');

  const materials = {
    'asphalt': {
      title: 'Architectural Asphalt Shingles',
      badge: 'Residential Gold Standard',
      desc: 'The gold standard for Somerset County residential roofs. Architectural dimensional shingles feature multi-layered fiberglass construction, excellent wind resistance up to 130 mph, and rich shadow lines that elevate suburban curb appeal.',
      specs: [
        { icon: '💨', label: 'Wind Resistance', val: 'Up to 130 MPH (Class H)' },
        { icon: '🛡️', label: 'Lifespan', val: '25–30+ Years' },
        { icon: '🔥', label: 'Fire Rating', val: 'Class A Non-Combustible' },
        { icon: '❄️', label: 'Ice Dam Defense', val: 'Self-Adhered Barrier' }
      ],
      repairs: [
        'Blown-off tabs & wind-creased shingle tab replacements',
        'Granule scouring & UV fiberglass deterioration repairs',
        'Valley transition, step flashing & pipe collar resealing'
      ],
      linkText: 'Explore Asphalt Shingle Roofing →',
      linkUrl: '/residential-roofing-bridgewater-nj/',
      accentColor: '#4A5568',
      patternType: 'asphalt',
      imageFile: '3d_material_asphalt.jpg',
      hudTop: { tier: 'Surface Course', title: 'Architectural Asphalt Shingles', detail: 'Class A Fire • 130 MPH Wind Warranty', pos: { top: '26%', left: '45%' } },
      hudMid: { tier: 'Secondary Shield', title: 'Synthetic Underlayment + Ice Barrier', detail: 'Self-Adhered Waterproof Membrane', pos: { top: '48%', left: '64%' } },
      hudBot: { tier: 'Substrate Base', title: '1/2" CDX Plywood & Structural Rafters', detail: 'Solid Engineered Roof Decking', pos: { top: '68%', left: '46%' } },
      cert: 'Factory Certified Replacement & Repair System'
    },
    'metal': {
      title: 'Standing Seam Metal Roofing',
      badge: 'Generational Longevity',
      desc: 'Engineered with concealed fasteners and vertical raised seams that interlock tightly against rain, heavy New Jersey snow, and ice damming. Exceptional thermal reflectivity keeps attic spaces cooler in humid summers.',
      specs: [
        { icon: '💨', label: 'Wind Resistance', val: 'Up to 150+ MPH Uplift' },
        { icon: '🛡️', label: 'Lifespan', val: '50+ Year Expected Life' },
        { icon: '☀️', label: 'Energy Finish', val: 'Kynar 500® Reflective' },
        { icon: '❄️', label: 'Snow Shedding', val: 'Rapid Shedding Surface' }
      ],
      repairs: [
        'Thermal expansion clip binding & oil-canning adjustments',
        'Transition sidewall counter-flashing resealing',
        'Valley debris clearing & ridge cap ventilation tuning'
      ],
      linkText: 'Explore Metal Roofing Solutions →',
      linkUrl: '/metal-roofing-bridgewater-nj/',
      accentColor: '#3182CE',
      patternType: 'metal',
      imageFile: '3d_material_metal.jpg',
      hudTop: { tier: 'Surface Course', title: 'Standing Seam Steel Panels', detail: 'Concealed Clips • Zero Exposed Fasteners', pos: { top: '30%', left: '60%' } },
      hudMid: { tier: 'Secondary Shield', title: 'High-Temp Self-Adhering Membrane', detail: '260°F+ Thermal Protection Underlayment', pos: { top: '48%', left: '36%' } },
      hudBot: { tier: 'Substrate Base', title: 'Solid Plywood Decking & Rafters', detail: 'Engineered Structural Roof Plane', pos: { top: '72%', left: '46%' } },
      cert: '50+ Year Expected Lifespan • Solar Reflective Kynar 500® Finish'
    },
    'flat': {
      title: 'Low-Slope & Flat Roofing Systems',
      badge: 'Commercial Monolithic Shield',
      desc: 'Purpose-engineered membrane systems for flat residential additions, sunrooms, second-story balconies, and commercial structures requiring 100% monolithic water-tightness and proper scupper drainage.',
      specs: [
        { icon: '🔥', label: 'Seam Bonding', val: 'Robotic Hot-Air Welded' },
        { icon: '☀️', label: 'Energy Star', val: 'High Solar Reflectance' },
        { icon: '💧', label: 'Water Sealing', val: 'Monolithic Membrane' },
        { icon: '🛡️', label: 'Core Insulation', val: 'R-30+ Rigid Polyiso' }
      ],
      repairs: [
        'Lap seam de-bonding inspection & robotic re-fusion',
        'Puncture patching & parapet wall flashing securing',
        'Drain bowl, scupper & pitch pan sealant maintenance'
      ],
      linkText: 'Explore Flat Roofing Systems →',
      linkUrl: '/flat-roofing-bridgewater-nj/',
      accentColor: '#2C5282',
      patternType: 'flat',
      imageFile: '3d_material_tpo.jpg',
      hudTop: { tier: 'Surface Membrane', title: '60-Mil Commercial Membrane', detail: 'Continuous Monolithic Watertight Shield', pos: { top: '24%', left: '46%' } },
      hudMid: { tier: 'Thermal Core', title: 'High-Density Polyiso Insulation', detail: 'R-30+ Code-Compliant Thermal Envelope', pos: { top: '52%', left: '54%' } },
      hudBot: { tier: 'Substrate Base', title: 'Commercial Substrate / Steel Deck', detail: 'Heavy-Duty Structural Foundation', pos: { top: '74%', left: '40%' } },
      cert: 'Factory Certified Commercial Flat Roof System'
    },
    'tpo': {
      title: 'TPO Single-Ply Membrane',
      badge: 'Commercial Cool Roof',
      desc: 'Thermoplastic Polyolefin (TPO) is a high-performance white reflective roofing membrane hot-air welded into a continuous watertight shield. Energy Star compliant, resisting UV degradation, ozone, and chemical exposure.',
      specs: [
        { icon: '🔥', label: 'Seam Bonding', val: 'Robotic Hot-Air Welded' },
        { icon: '☀️', label: 'Cool Roof', val: 'Energy Star Reflective' },
        { icon: '💧', label: 'Water Sealing', val: 'Monolithic Membrane' },
        { icon: '🛡️', label: 'Core Insulation', val: 'R-30+ Rigid Polyiso' }
      ],
      repairs: [
        'Lap seam de-bonding inspection & robotic re-fusion',
        'Puncture patching & parapet wall flashing securing',
        'Drain bowl, scupper & pitch pan sealant maintenance'
      ],
      linkText: 'Explore Commercial TPO Roofing →',
      linkUrl: '/flat-roofing-bridgewater-nj/',
      accentColor: '#E2E8F0',
      patternType: 'tpo',
      imageFile: '3d_material_tpo.jpg',
      hudTop: { tier: 'Surface Membrane', title: '60-Mil White TPO Single-Ply', detail: 'Robotic Hot-Air Welded Lap Seams', pos: { top: '24%', left: '46%' } },
      hudMid: { tier: 'Thermal Core', title: 'Rigid Polyiso Insulation (R-30+)', detail: 'High-Density Fastener Plates & Screws', pos: { top: '52%', left: '54%' } },
      hudBot: { tier: 'Substrate Base', title: 'Fluted Steel B-Decking / Heavy Deck', detail: 'Commercial Structural Foundation', pos: { top: '74%', left: '40%' } },
      cert: 'Energy Star Cool Roof Certified • Monolithic Chemical Fusion'
    },
    'epdm': {
      title: 'EPDM Synthetic Rubber Roofing',
      badge: 'Sub-Zero Freeze-Thaw',
      desc: 'Ethylene Propylene Diene Monomer is an extremely durable synthetic black rubber roofing membrane with decades of proven performance under severe freeze-thaw cycles and hail.',
      specs: [
        { icon: '❄️', label: 'Elasticity', val: '300%+ Sub-Zero Elongation' },
        { icon: '🛡️', label: 'Field Longevity', val: '30–35+ Year Proven Life' },
        { icon: '⚡', label: 'Hail Rating', val: 'UL 2218 Class 4 Impact' },
        { icon: '🌡️', label: 'Temp Range', val: '-45°F to 300°F Tolerance' }
      ],
      repairs: [
        'Lap tape seam delamination & factory primer re-adhesion',
        'Edge metal termination bar re-anchoring & sealing',
        'Penetration pipe boot replacement & corner patching'
      ],
      linkText: 'Explore EPDM Roofing Systems →',
      linkUrl: '/flat-roofing-bridgewater-nj/',
      accentColor: '#1A202C',
      patternType: 'epdm',
      imageFile: '3d_material_epdm.jpg',
      hudTop: { tier: 'Surface Membrane', title: 'Heavy-Duty Black EPDM Rubber', detail: 'Factory Lap Sealant Tape Seams', pos: { top: '24%', left: '48%' } },
      hudMid: { tier: 'Thermal Core', title: 'High-Density Polyiso Core Board', detail: 'Continuous Thermal Insulation Barrier', pos: { top: '52%', left: '54%' } },
      hudBot: { tier: 'Substrate Base', title: 'Commercial Steel / Heavy Wood Deck', detail: 'Structural Engineered Substrate', pos: { top: '74%', left: '34%' } },
      cert: 'Superior Freeze-Thaw Elasticity • 30+ Year Field Longevity'
    }
  };

  const isSubdir = window.location.pathname.split('/').filter(Boolean).length > 0;
  const assetPrefix = isSubdir ? '../assets/images/' : 'assets/images/';

  function applyHudData(hudKey, hudData) {
    if (!hudData) return;
    const pinEl = document.getElementById(`mat-layer-${hudKey}`);
    const cardEl = document.getElementById(`layer-card-${hudKey}`);

    if (pinEl) {
      pinEl.style.top = hudData.pos.top;
      pinEl.style.left = hudData.pos.left;
      const pillTier = pinEl.querySelector('.hud-pill-tier');
      if (pillTier) pillTier.textContent = hudData.tier;
    }

    if (cardEl) {
      const cardTier = cardEl.querySelector('.layer-card-tier');
      const titleEl = cardEl.querySelector('.layer-card-title');
      const detailEl = cardEl.querySelector('.layer-card-detail');
      if (cardTier) cardTier.textContent = hudData.tier;
      if (titleEl) titleEl.textContent = hudData.title;
      if (detailEl) detailEl.textContent = hudData.detail;
    }
  }

  function updateMaterial3D(data) {
    const img = document.getElementById('mat-3d-img');
    const certText = document.getElementById('hud-cert-text');

    if (img && data && data.imageFile) {
      img.style.opacity = '0.35';
      img.style.transform = 'scale(0.98)';
      setTimeout(() => {
        img.src = assetPrefix + data.imageFile;
        img.alt = `3D ${data.title} Assembly Cutaway Model`;
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 160);
    }

    if (data) {
      applyHudData('top', data.hudTop);
      applyHudData('mid', data.hudMid);
      applyHudData('bot', data.hudBot);
    }

    if (certText && data && data.cert) {
      certText.textContent = data.cert;
    }
  }

  // Interactive Layer HUD Focus & Bi-Directional Highlighting
  const layerKeys = ['top', 'mid', 'bot'];

  function setActiveLayer(activeKey) {
    layerKeys.forEach((key) => {
      const pin = document.getElementById(`mat-layer-${key}`);
      const card = document.getElementById(`layer-card-${key}`);
      const isActive = key === activeKey;
      if (pin) pin.classList.toggle('is-active', isActive);
      if (card) card.classList.toggle('is-active', isActive);
    });
  }

  layerKeys.forEach((key) => {
    const pin = document.getElementById(`mat-layer-${key}`);
    const card = document.getElementById(`layer-card-${key}`);

    if (pin) {
      pin.addEventListener('mouseenter', () => setActiveLayer(key));
      pin.addEventListener('click', () => setActiveLayer(key));
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveLayer(key);
        }
      });
    }

    if (card) {
      card.addEventListener('mouseenter', () => setActiveLayer(key));
      card.addEventListener('click', () => setActiveLayer(key));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveLayer(key);
        }
      });
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const matKey = tab.getAttribute('data-material');
      const data = materials[matKey];
      if (!data) return;

      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      
      const badgeEl = document.getElementById('mat-badge');
      if (badgeEl && data.badge) badgeEl.textContent = data.badge;

      if (data.specs) {
        data.specs.forEach((s, idx) => {
          const lbl = document.getElementById(`spec-lbl-${idx + 1}`);
          const val = document.getElementById(`spec-val-${idx + 1}`);
          const icon = document.getElementById(`spec-icon-${idx + 1}`);
          if (lbl) lbl.textContent = s.label;
          if (val) val.textContent = s.val;
          if (icon && s.icon) icon.textContent = s.icon;
        });
      }

      if (data.repairs) {
        data.repairs.forEach((r, idx) => {
          const item = document.getElementById(`repair-item-${idx + 1}`);
          if (item) item.textContent = r;
        });
      }

      if (link) {
        link.textContent = data.linkText;
        link.setAttribute('href', data.linkUrl);
      }

      // Update 3D Stage if present
      if (document.getElementById('mat-3d-img')) {
        updateMaterial3D(data);
      } else if (renderVisual) {
        // Fallback to legacy SVG if present
        updateMaterialVisual(renderVisual, data.patternType, data.accentColor);
      }
    });
  });
}

function updateMaterialVisual(svgElement, type, color) {
  svgElement.style.opacity = '0';
  setTimeout(() => {
    let content = '';
    if (type === 'asphalt' || type === 'shingles') {
      content = `
        <svg viewBox="0 0 520 360" width="100%" height="100%">
          <defs>
            <linearGradient id="shingleGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4B5868"/>
              <stop offset="100%" stop-color="#222B35"/>
            </linearGradient>
            <linearGradient id="shingleGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3B4654"/>
              <stop offset="100%" stop-color="#182028"/>
            </linearGradient>
            <pattern id="granules" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#64748B" opacity="0.4"/>
              <circle cx="6" cy="5" r="1.2" fill="#94A3B8" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="520" height="360" fill="#0A141E"/>
          
          <!-- Layer 1: Plywood Decking (1/2" CDX) -->
          <rect x="30" y="270" width="460" height="35" rx="3" fill="#B45309" stroke="#D97706" stroke-width="1.5"/>
          <text x="45" y="292" fill="#FEF3C7" font-family="Outfit" font-size="12" font-weight="700">1/2" CDX PLYWOOD ROOF DECKING</text>
          
          <!-- Layer 2: Ice & Water Shield at Eaves / Valleys -->
          <rect x="30" y="240" width="460" height="26" fill="#F47A24" fill-opacity="0.85" stroke="#F59E0B" stroke-width="1.5"/>
          <text x="45" y="258" fill="#FFFFFF" font-family="Outfit" font-size="12" font-weight="800">SELF-ADHERING ICE & WATER BARRIER (Eaves & Valleys)</text>
          
          <!-- Layer 3: Breathable Synthetic Underlayment -->
          <rect x="30" y="210" width="460" height="26" fill="#334155" stroke="#64748B" stroke-width="1.5"/>
          <text x="45" y="228" fill="#E2E8F0" font-family="Outfit" font-size="12" font-weight="700">HEAVY-DUTY SYNTHETIC ROOFING UNDERLAYMENT</text>
          
          <!-- Layer 4: Starter Shingle Strip with Sealant -->
          <rect x="30" y="180" width="460" height="26" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
          <line x1="30" y1="202" x2="490" y2="202" stroke="#F47A24" stroke-width="3" stroke-dasharray="8 4"/>
          <text x="45" y="198" fill="#CBD5E1" font-family="Outfit" font-size="11" font-weight="700">STARTER SHINGLE COURSE + DURA-GRIP ADHESIVE STRIP</text>

          <!-- Layer 5: Dimensional Architectural Shingle Courses -->
          <g transform="translate(30, 45)">
            <!-- Course 3 (Top) -->
            <rect x="0" y="0" width="460" height="45" fill="url(#shingleGrad1)" stroke="#111827" stroke-width="2"/>
            <rect x="0" y="0" width="460" height="45" fill="url(#granules)"/>
            <rect x="40" y="22" width="70" height="23" fill="url(#shingleGrad2)"/>
            <rect x="180" y="22" width="85" height="23" fill="url(#shingleGrad2)"/>
            <rect x="330" y="22" width="75" height="23" fill="url(#shingleGrad2)"/>

            <!-- Course 2 (Middle) -->
            <rect x="0" y="42" width="460" height="45" fill="url(#shingleGrad1)" stroke="#111827" stroke-width="2"/>
            <rect x="0" y="42" width="460" height="45" fill="url(#granules)"/>
            <rect x="90" y="64" width="80" height="23" fill="url(#shingleGrad2)"/>
            <rect x="240" y="64" width="75" height="23" fill="url(#shingleGrad2)"/>
            <rect x="380" y="64" width="60" height="23" fill="url(#shingleGrad2)"/>

            <!-- Course 1 (Lower) -->
            <rect x="0" y="84" width="460" height="45" fill="url(#shingleGrad1)" stroke="#111827" stroke-width="2"/>
            <rect x="0" y="84" width="460" height="45" fill="url(#granules)"/>
            <rect x="20" y="106" width="90" height="23" fill="url(#shingleGrad2)"/>
            <rect x="150" y="106" width="75" height="23" fill="url(#shingleGrad2)"/>
            <rect x="290" y="106" width="80" height="23" fill="url(#shingleGrad2)"/>
          </g>

          <text x="260" y="30" text-anchor="middle" fill="#F47A24" font-family="Outfit" font-size="13" font-weight="800">MULTI-LAYER ARCHITECTURAL SHINGLE SYSTEM</text>
          <text x="260" y="340" text-anchor="middle" fill="#94A3B8" font-family="Outfit" font-size="11">Class A Fire Resistance • 130 MPH Wind Uplift Protection</text>
        </svg>
      `;
    } else if (type === 'metal') {
      content = `
        <svg viewBox="0 0 520 360" width="100%" height="100%">
          <defs>
            <linearGradient id="metalSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#1E3A5F"/>
              <stop offset="25%" stop-color="#3874B5"/>
              <stop offset="50%" stop-color="#1E3A5F"/>
              <stop offset="75%" stop-color="#2D5A8C"/>
              <stop offset="100%" stop-color="#182E4B"/>
            </linearGradient>
          </defs>
          <rect width="520" height="360" fill="#081420"/>
          
          <!-- Decking -->
          <rect x="30" y="280" width="460" height="30" rx="3" fill="#B45309" stroke="#D97706" stroke-width="1.5"/>
          <text x="45" y="300" fill="#FEF3C7" font-family="Outfit" font-size="11" font-weight="700">SOLID PLYWOOD DECKING</text>
          
          <!-- High-Temp Synthetic Underlayment -->
          <rect x="30" y="245" width="460" height="30" fill="#047857" stroke="#10B981" stroke-width="1.5"/>
          <text x="45" y="265" fill="#ECFDF5" font-family="Outfit" font-size="11" font-weight="700">HIGH-TEMPERATURE SELF-ADHERING MEMBRANE (260°F+)</text>
          
          <!-- Standing Seam Panels with Vertical Raised Ribs -->
          <!-- Panel 1 -->
          <rect x="30" y="60" width="140" height="175" fill="url(#metalSheen)" stroke="#0F172A" stroke-width="1.5"/>
          <!-- Raised Seam 1 -->
          <rect x="165" y="45" width="10" height="195" rx="2" fill="#60A5FA" stroke="#1E40AF" stroke-width="1.5"/>
          <!-- Panel 2 -->
          <rect x="175" y="60" width="140" height="175" fill="url(#metalSheen)" stroke="#0F172A" stroke-width="1.5"/>
          <!-- Raised Seam 2 -->
          <rect x="310" y="45" width="10" height="195" rx="2" fill="#60A5FA" stroke="#1E40AF" stroke-width="1.5"/>
          <!-- Panel 3 -->
          <rect x="320" y="60" width="140" height="175" fill="url(#metalSheen)" stroke="#0F172A" stroke-width="1.5"/>
          <!-- Raised Seam 3 -->
          <rect x="455" y="45" width="10" height="195" rx="2" fill="#60A5FA" stroke="#1E40AF" stroke-width="1.5"/>

          <!-- Concealed Fastener Clip Callout -->
          <circle cx="170" cy="140" r="16" fill="rgba(244,122,36,0.3)" stroke="#F47A24" stroke-width="2"/>
          <line x1="170" y1="140" x2="230" y2="100" stroke="#F47A24" stroke-width="1.5"/>
          <rect x="230" y="85" width="190" height="28" rx="4" fill="#0F172A" stroke="#F47A24" stroke-width="1.2"/>
          <text x="240" y="103" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="700">CONCEALED EXPANSION CLIP</text>

          <text x="260" y="30" text-anchor="middle" fill="#60A5FA" font-family="Outfit" font-size="13" font-weight="800">STANDING SEAM MECHANICAL LOCK (Zero Exposed Fasteners)</text>
          <text x="260" y="340" text-anchor="middle" fill="#94A3B8" font-family="Outfit" font-size="11">50+ Year Lifespan • Solar Heat Reflective Kynar 500® Finish</text>
        </svg>
      `;
    } else if (type === 'flat') {
      content = `
        <svg viewBox="0 0 520 360" width="100%" height="100%">
          <rect width="520" height="360" fill="#0B131B"/>
          
          <!-- Substrate -->
          <rect x="30" y="275" width="460" height="35" rx="3" fill="#475569" stroke="#64748B" stroke-width="1.5"/>
          <text x="45" y="297" fill="#F1F5F9" font-family="Outfit" font-size="11" font-weight="700">HEAVY-DUTY COMMERCIAL STRUCTURAL SUBSTRATE</text>

          <!-- Tapered Polyiso Rigid Insulation (Slope to Drain) -->
          <polygon points="30,230 490,205 490,270 30,270" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="45" y="255" fill="#1E293B" font-family="Outfit" font-size="11" font-weight="800">TAPERED POLYISO RIGID INSULATION (1/4" per ft Positive Slope)</text>

          <!-- High Density Cover Board -->
          <polygon points="30,205 490,180 490,200 30,225" fill="#D97706" stroke="#B45309" stroke-width="1.2"/>
          <text x="45" y="215" fill="#FFFFFF" font-family="Outfit" font-size="10" font-weight="700">HIGH-DENSITY COMPOSITE COVER BOARD</text>

          <!-- SBS Modified Bitumen Base Ply -->
          <polygon points="30,175 490,150 490,175 30,200" fill="#334155" stroke="#475569" stroke-width="1.5"/>
          <text x="45" y="186" fill="#94A3B8" font-family="Outfit" font-size="10" font-weight="700">SELF-ADHERED SBS MODIFIED BITUMEN BASE SHEET</text>

          <!-- Granule Surfaced Mineral Cap Sheet -->
          <polygon points="30,120 490,95 490,145 30,170" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          <line x1="260" y1="107" x2="260" y2="157" stroke="#F47A24" stroke-width="3" stroke-dasharray="6 3"/>
          <text x="45" y="145" fill="#F8FAFC" font-family="Outfit" font-size="11" font-weight="800">MINERAL-SURFACED CAP SHEET (Torch-Fused Watertight Seams)</text>

          <text x="260" y="30" text-anchor="middle" fill="#F59E0B" font-family="Outfit" font-size="13" font-weight="800">MULTI-PLY SBS MODIFIED BITUMEN LOW-SLOPE SYSTEM</text>
          <text x="260" y="340" text-anchor="middle" fill="#94A3B8" font-family="Outfit" font-size="11">Engineered for Porch Roofs, Additions & Commercial Low-Slope Applications</text>
        </svg>
      `;
    } else if (type === 'tpo') {
      content = `
        <svg viewBox="0 0 520 360" width="100%" height="100%">
          <rect width="520" height="360" fill="#091420"/>
          
          <!-- Steel / Wood Deck -->
          <rect x="30" y="270" width="460" height="35" rx="3" fill="#334155" stroke="#64748B" stroke-width="1.5"/>
          <text x="45" y="292" fill="#E2E8F0" font-family="Outfit" font-size="11" font-weight="700">FLUTED STEEL OR 3/4" WOOD COMMERCIAL DECK</text>

          <!-- Vapor Barrier -->
          <rect x="30" y="245" width="460" height="20" fill="#047857" stroke="#10B981" stroke-width="1.2"/>
          <text x="45" y="260" fill="#ECFDF5" font-family="Outfit" font-size="10" font-weight="700">VAPOR RETARDER SHIELD</text>

          <!-- Rigid Polyiso Insulation with Fasteners -->
          <rect x="30" y="170" width="460" height="70" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <!-- Fastener Plates -->
          <circle cx="120" cy="205" r="10" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
          <circle cx="280" cy="205" r="10" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
          <circle cx="420" cy="205" r="10" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
          <text x="45" y="190" fill="#0F172A" font-family="Outfit" font-size="12" font-weight="800">RIGID POLYISO THERMAL INSULATION (R-30+)</text>

          <!-- TPO 60-Mil Membrane with Robotic Hot-Air Weld -->
          <rect x="30" y="70" width="460" height="95" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
          
          <!-- Welded Lap Seam -->
          <rect x="235" y="70" width="50" height="95" fill="rgba(244,122,36,0.2)" stroke="#F47A24" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="260" y="115" text-anchor="middle" fill="#C2410C" font-family="Outfit" font-size="11" font-weight="800">ROBOTIC HOT-AIR</text>
          <text x="260" y="130" text-anchor="middle" fill="#C2410C" font-family="Outfit" font-size="11" font-weight="800">WELDED SEAM</text>

          <text x="70" y="110" fill="#0F172A" font-family="Outfit" font-size="13" font-weight="800">WHITE 60-MIL TPO</text>
          <text x="70" y="130" fill="#64748B" font-family="Outfit" font-size="10">87% Solar Reflectivity</text>

          <text x="260" y="30" text-anchor="middle" fill="#FFFFFF" font-family="Outfit" font-size="13" font-weight="800">SINGLE-PLY TPO (THERMOPLASTIC POLYOLEFIN)</text>
          <text x="260" y="340" text-anchor="middle" fill="#94A3B8" font-family="Outfit" font-size="11">Cool Roof Rating Council (CRRC) Certified • Monolithic Chemical Fusion</text>
        </svg>
      `;
    } else {
      content = `
        <svg viewBox="0 0 520 360" width="100%" height="100%">
          <rect width="520" height="360" fill="#070E16"/>
          
          <!-- Substrate -->
          <rect x="30" y="270" width="460" height="35" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
          <text x="45" y="292" fill="#CBD5E1" font-family="Outfit" font-size="11" font-weight="700">STRUCTURAL SUBSTRATE & BASE MAT</text>

          <!-- High-Density Insulation Board -->
          <rect x="30" y="195" width="460" height="70" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="45" y="235" fill="#0F172A" font-family="Outfit" font-size="12" font-weight="800">HIGH-DENSITY POLYISOCYANURATE CORE</text>

          <!-- Adhesive Bonding Matrix -->
          <rect x="30" y="175" width="460" height="15" fill="#D97706" stroke="#B45309" stroke-width="1"/>
          <text x="45" y="186" fill="#FFFFFF" font-family="Outfit" font-size="9" font-weight="700">CONTINUOUS CONTACT BONDING MATRIX</text>

          <!-- EPDM Synthetic Vulcanized Rubber Membrane -->
          <rect x="30" y="65" width="460" height="105" rx="3" fill="#18181B" stroke="#3F3F46" stroke-width="2.5"/>
          
          <!-- Factory Applied Seam Tape -->
          <rect x="235" y="65" width="50" height="105" fill="#27272A" stroke="#F47A24" stroke-width="2"/>
          <text x="260" y="115" text-anchor="middle" fill="#F47A24" font-family="Outfit" font-size="11" font-weight="800">FACTORY-APPLIED</text>
          <text x="260" y="130" text-anchor="middle" fill="#F47A24" font-family="Outfit" font-size="11" font-weight="800">SEAM TAPE</text>

          <text x="65" y="115" fill="#FFFFFF" font-family="Outfit" font-size="13" font-weight="800">60-MIL SYNTHETIC EPDM</text>
          <text x="65" y="135" fill="#A1A1AA" font-family="Outfit" font-size="10">Superior Freeze-Thaw Elasticity (300%+)</text>

          <text x="260" y="30" text-anchor="middle" fill="#CBD5E1" font-family="Outfit" font-size="13" font-weight="800">EPDM ETHYLENE PROPYLENE DIENE MONOMER</text>
          <text x="260" y="340" text-anchor="middle" fill="#94A3B8" font-family="Outfit" font-size="11">Decades of Proven New Jersey Winter Performance • Extreme Hail Resilience</text>
        </svg>
      `;
    }
    svgElement.innerHTML = content;
    svgElement.style.opacity = '1';
  }, 200);
}

/**
 * SECTION 11: BEFORE / AFTER IMAGE SLIDER
 */
function initBeforeAfterSlider() {
  const containers = document.querySelectorAll('.before-after-container');
  if (!containers.length) return;

  containers.forEach((container) => {
    const afterLayer = container.querySelector('.ba-layer-after');
    const handle = container.querySelector('.ba-handle');
    const afterImg = afterLayer ? afterLayer.querySelector('img') : null;
    if (!afterLayer || !handle) return;

    let isDragging = false;

    function syncImageWidth() {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      if (w > 0) {
        container.style.setProperty('--ba-container-width', `${w}px`);
        if (afterImg) {
          afterImg.style.width = `${w}px`;
        }
      }
    }

    // Initial sync
    syncImageWidth();

    // Responsive sync
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => syncImageWidth());
      ro.observe(container);
    } else {
      window.addEventListener('resize', syncImageWidth);
    }

    function updateSliderPosition(clientX) {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;

      afterLayer.style.width = `${percent}%`;
      handle.style.left = `${percent}%`;
      handle.setAttribute('aria-valuenow', Math.round(percent));
    }

    // Mouse Events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    // Touch Events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    // Container click-to-slide
    container.addEventListener('click', (e) => {
      if (e.target.closest('.ba-badge') || e.target.closest('.ba-handle')) return;
      updateSliderPosition(e.clientX);
    });

    // Keyboard accessibility
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', 'Before and After Roof Comparison');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');

    handle.addEventListener('keydown', (e) => {
      let currentPercent = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') {
        currentPercent = Math.max(0, currentPercent - 5);
        afterLayer.style.width = `${currentPercent}%`;
        handle.style.left = `${currentPercent}%`;
        handle.setAttribute('aria-valuenow', Math.round(currentPercent));
      } else if (e.key === 'ArrowRight') {
        currentPercent = Math.min(100, currentPercent + 5);
        afterLayer.style.width = `${currentPercent}%`;
        handle.style.left = `${currentPercent}%`;
        handle.setAttribute('aria-valuenow', Math.round(currentPercent));
      }
    });
  });
}

/**
 * SECTION 13: WHAT AFFECTS ROOFING COST — INTERACTIVE DIAGRAM
 */
function initCostGraphic() {
  const cards = document.querySelectorAll('.cost-factor-card');
  const indicator = document.querySelector('.cost-diagram-indicator');
  const houseAreas = document.querySelectorAll('.cost-zone-path');
  if (!cards.length || !houseAreas.length) return;

  function highlightZone(card) {
    const zone = card.getAttribute('data-cost-zone');
    cards.forEach((c) => c.classList.remove('is-active'));
    card.classList.add('is-active');

    const heading = card.querySelector('h3, h4');
    let titleText = '';
    if (heading) {
      const clone = heading.cloneNode(true);
      const span = clone.querySelector('span');
      if (span) span.remove();
      titleText = clone.textContent.trim();
    }

    if (indicator && titleText) {
      indicator.textContent = `Highlighted Area: ${titleText}`;
    }

    houseAreas.forEach((path) => {
      const pathZone = path.getAttribute('data-zone');
      let isMatch = false;

      if (zone === 'all' || zone === 'size' || zone === 'material') {
        isMatch = (pathZone === 'pitch' || pathZone === 'decking');
      } else if (zone === 'pitch') {
        isMatch = (pathZone === 'pitch');
      } else if (zone === 'layers' || zone === 'decking') {
        isMatch = (pathZone === 'decking');
      } else if (zone === 'flashing') {
        isMatch = (pathZone === 'flashing');
      } else if (zone === 'access') {
        isMatch = (pathZone === 'access');
      } else if (zone === 'complexity') {
        isMatch = (pathZone === 'complexity');
      }

      if (isMatch) {
        path.style.fill = '#F47A24';
        path.style.stroke = '#EA580C';
        path.style.strokeWidth = path.tagName.toLowerCase() === 'line' ? '8px' : '3px';
        path.style.opacity = '1';
        path.style.filter = 'drop-shadow(0 0 10px rgba(244, 122, 36, 0.75))';
      } else {
        path.style.fill = '';
        path.style.stroke = '';
        path.style.strokeWidth = '';
        path.style.opacity = '0.3';
        path.style.filter = '';
      }
    });
  }

  function resetHighlight() {
    cards.forEach((c) => c.classList.remove('is-active'));
    houseAreas.forEach((path) => {
      path.style.fill = '';
      path.style.stroke = '';
      path.style.strokeWidth = '';
      path.style.opacity = '';
      path.style.filter = '';
    });
    if (indicator) {
      indicator.textContent = 'Hover over any factor above to highlight corresponding roof area';
    }
  }

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => highlightZone(card));
    card.addEventListener('mouseleave', resetHighlight);
    card.addEventListener('click', () => highlightZone(card));
  });
}

/**
 * SECTION 15: CUSTOMER REVIEWS CAROUSEL
 */
function initReviewsCarousel() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.review-card');
  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth > 992 ? 3 : 1;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);

    const cardWidthPercent = 100 / visibleCount;
    track.style.transform = `translateX(-${currentIndex * cardWidthPercent}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel, { passive: true });
  updateCarousel();
}

/**
 * SECTION 17: FAQ ACCORDION
 */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;

      // Close other accordion items
      triggers.forEach((other) => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          if (other.nextElementSibling) {
            other.nextElementSibling.style.maxHeight = null;
          }
        }
      });

      trigger.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded && content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else if (content) {
        content.style.maxHeight = null;
      }
    });
  });
}

/**
 * GLOBAL FORM HANDLER: HIGH-INQUIRY VOLUME PRIORITY CALL REDIRECT
 */
function initHighVolumeFormHandler() {
  // Inject modal overlay if not present
  let modalBackdrop = document.getElementById('high-volume-modal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'high-volume-modal';
    modalBackdrop.className = 'high-volume-modal-backdrop';
    modalBackdrop.setAttribute('role', 'dialog');
    modalBackdrop.setAttribute('aria-modal', 'true');
    modalBackdrop.setAttribute('aria-label', 'High Inquiry Volume Notice');
    modalBackdrop.innerHTML = `
      <div class="high-volume-modal-card">
        <button type="button" class="high-volume-close-btn" id="high-volume-close" aria-label="Close notice">&times;</button>
        <div class="high-volume-badge">
          <span class="live-dispatch-dot"></span>
          <span>High Inquiry Volume Today</span>
        </div>
        <h3 class="high-volume-modal-title">Our Online Queue Is Currently Full</h3>
        <p class="high-volume-modal-desc">
          Thank you! Due to a high surge of requests across Somerset County today, our online submission queue is at full capacity. To guarantee immediate priority service without waiting in line, our field dispatch team is standing by to take your call directly.
        </p>
        <a href="tel:+19084659944" class="btn btn-phone high-volume-call-btn" id="high-volume-call-link" data-call-source="form-queue-redirect">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>Call Dispatch Now &bull; (908) 465-9944</span>
        </a>
        <div class="high-volume-countdown">
          Connecting your call in <strong id="call-countdown-timer">4</strong>s...
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  let countdownInterval = null;

  function closeModal() {
    if (countdownInterval) clearInterval(countdownInterval);
    modalBackdrop.classList.remove('is-open');
  }

  const closeBtn = modalBackdrop.querySelector('#high-volume-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  const callLink = modalBackdrop.querySelector('#high-volume-call-link');
  if (callLink) {
    callLink.addEventListener('click', () => {
      if (countdownInterval) clearInterval(countdownInterval);
    });
  }

  function triggerHighVolumeRedirect() {
    modalBackdrop.classList.add('is-open');

    let secondsLeft = 4;
    const timerEl = document.getElementById('call-countdown-timer');
    if (timerEl) timerEl.textContent = secondsLeft.toString();

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      secondsLeft--;
      if (timerEl) timerEl.textContent = secondsLeft.toString();
      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
        window.location.href = 'tel:+19084659944';
      }
    }, 1000);
  }

  // Intercept all form submissions globally on document
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    // Check validity
    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // Trigger high volume redirect
    triggerHighVolumeRedirect();

    // Reset form safely
    try {
      form.reset();
    } catch (_) {}
  }, true);

  // Add subtle queue notices above submit buttons in forms
  const allForms = document.querySelectorAll('form');
  allForms.forEach((form) => {
    if (form.querySelector('.form-queue-notice')) return;
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      const notice = document.createElement('div');
      notice.className = 'form-queue-notice';
      notice.innerHTML = `
        <span class="live-dispatch-dot" style="width: 7px; height: 7px; flex-shrink: 0;"></span>
        <span><strong>High Volume Alert:</strong> Online responses may experience delays today. For immediate priority scheduling, call <strong>(908) 465-9944</strong>.</span>
      `;
      submitBtn.parentNode.insertBefore(notice, submitBtn);
    }
  });
}

function initEstimateForm() {
  // Maintained for backward compatibility; handled globally by initHighVolumeFormHandler
}

/**
 * FOOTER: LEGAL MODAL CONTROLLER (Privacy Policy & Terms of Service)
 */
function initLegalModal() {
  const dialog = document.getElementById('legal-dialog');
  const closeBtn = document.getElementById('legal-dialog-close');
  const triggers = document.querySelectorAll('.legal-modal-trigger');
  const title = document.getElementById('legal-dialog-title');
  const content = document.getElementById('legal-dialog-content');

  if (!dialog || !closeBtn || !triggers.length) return;

  const legalContent = {
    privacy: {
      title: 'Privacy Policy',
      html: `
        <p><strong>Bridgewater Roofer</strong> respects and protects homeowner privacy. Any contact information, property details, or photos submitted via our website or direct phone line are utilized exclusively for scheduling roof inspections, preparing written estimates, and coordinating project logistics.</p>
        <p>We do not sell, rent, or distribute personal information to third-party marketing companies. All consultations and roofing services are performed directly by our licensed New Jersey team.</p>
        <p>If you have any questions about how your data is handled, feel free to contact us at <a href="mailto:service@bridgewaterroofer.com" style="color: var(--orange);">service@bridgewaterroofer.com</a> or call <a href="tel:+19084659944" style="color: var(--orange);">(908) 465-9944</a>.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      html: `
        <p>All roof inspections, leak assessments, and project quotes provided by <strong>Bridgewater Roofer</strong> are based on observable physical conditions at the time of evaluation.</p>
        <p>Written agreements, scope documents, and warranty certificates are issued prior to commencement of work in full accordance with New Jersey Home Improvement Contractor regulations.</p>
        <p>Emergency services and urgent leak response are subject to local weather conditions and safety standards for working at heights.</p>
      `
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const type = trigger.getAttribute('data-legal');
      const data = legalContent[type] || legalContent.privacy;
      if (title) title.textContent = data.title;
      if (content) content.innerHTML = data.html;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  });

  // Close when clicking dialog backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  });
}

/**
 * SECTION 18: SERVICE AREA RADAR & DISPATCH CONSOLE
 */
function initServiceAreaConsole() {
  const filterButtons = document.querySelectorAll('.town-filter-btn');
  const cards = document.querySelectorAll('.town-dispatch-card');
  const mapNodes = document.querySelectorAll('.map-node');

  if (!cards.length) return;

  // Region lookup for nodes if data-town is used
  const townRegionMap = {};
  cards.forEach((card) => {
    const town = card.getAttribute('data-town');
    const region = card.getAttribute('data-region');
    if (town && region) {
      townRegionMap[town] = region;
    }
  });

  // Filter Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      cards.forEach((card) => {
        const region = card.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Update map nodes dimming
      mapNodes.forEach((node) => {
        const town = node.getAttribute('data-town');
        const nodeRegion = townRegionMap[town];
        if (filter === 'all' || nodeRegion === filter || town === 'bridgewater') {
          node.classList.remove('is-dimmed');
        } else {
          node.classList.add('is-dimmed');
        }
      });
    });
  });

  // Bidirectional hover sync between cards and SVG map nodes
  cards.forEach((card) => {
    const town = card.getAttribute('data-town');
    if (!town) return;

    card.addEventListener('mouseenter', () => {
      const node = document.querySelector(`.map-node[data-town="${town}"]`);
      if (node) node.classList.add('is-active');
    });

    card.addEventListener('mouseleave', () => {
      const node = document.querySelector(`.map-node[data-town="${town}"]`);
      if (node) node.classList.remove('is-active');
    });
  });

  mapNodes.forEach((node) => {
    const town = node.getAttribute('data-town');
    if (!town) return;

    node.addEventListener('mouseenter', () => {
      const card = document.querySelector(`.town-dispatch-card[data-town="${town}"]`);
      if (card) card.classList.add('is-active');
    });

    node.addEventListener('mouseleave', () => {
      const card = document.querySelector(`.town-dispatch-card[data-town="${town}"]`);
      if (card) card.classList.remove('is-active');
    });

    // Clicking map node highlights and scrolls card into view
    node.addEventListener('click', () => {
      const card = document.querySelector(`.town-dispatch-card[data-town="${town}"]`);
      if (!card) return;

      // If hidden due to filter, reset to 'all'
      if (card.classList.contains('is-hidden')) {
        const allBtn = document.querySelector('.town-filter-btn[data-filter="all"]');
        if (allBtn) allBtn.click();
      }

      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      card.classList.add('is-active');
      setTimeout(() => {
        card.classList.remove('is-active');
      }, 1500);
    });
  });
}

/**
 * SECTION 16: INFINITE LOOPING REVIEWS SLIDER
 */
function initServiceReviewsSlider() {
  const sliderEl = document.getElementById('service-reviews-slider');
  if (!sliderEl) return;

  const track = sliderEl.querySelector('.service-reviews-track');
  const prevBtn = sliderEl.querySelector('#srv-review-prev');
  const nextBtn = sliderEl.querySelector('#srv-review-next');
  const dotsContainer = sliderEl.querySelector('#srv-slider-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const originalCards = Array.from(track.querySelectorAll('.service-review-card'));
  const cardCount = originalCards.length;
  if (cardCount === 0) return;

  // 3 clones prepended, 3 clones appended for seamless continuous infinite looping
  const CLONE_BUFFER = 3;

  for (let i = cardCount - CLONE_BUFFER; i < cardCount; i++) {
    const clone = originalCards[i].cloneNode(true);
    clone.classList.add('is-clone');
    clone.setAttribute('aria-hidden', 'true');
    track.insertBefore(clone, track.firstChild);
  }

  for (let i = 0; i < CLONE_BUFFER; i++) {
    const clone = originalCards[i].cloneNode(true);
    clone.classList.add('is-clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }

  let currentIndex = CLONE_BUFFER; // Points to first real card (index 0)
  let isTransitioning = false;
  let autoPlayTimer = null;
  const AUTOPLAY_DELAY = 4500;

  // Create pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `service-slider-dot ${i === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to review ${i + 1} of ${cardCount}`);
      dot.addEventListener('click', () => {
        goToRealIndex(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function getStepWidth() {
    const firstCard = track.querySelector('.service-review-card');
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const computedGap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return cardWidth + computedGap;
  }

  function updateTrackPosition(withTransition = true) {
    const step = getStepWidth();
    if (withTransition) {
      track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.service-slider-dot');
    let realIndex = (currentIndex - CLONE_BUFFER) % cardCount;
    if (realIndex < 0) realIndex += cardCount;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === realIndex);
    });
  }

  function slideNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateTrackPosition(true);
  }

  function slidePrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateTrackPosition(true);
  }

  function goToRealIndex(idx) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = CLONE_BUFFER + idx;
    updateTrackPosition(true);
  }

  // Infinite loop boundary jump on transitionend
  track.addEventListener('transitionend', () => {
    isTransitioning = false;

    // Past last original card into appended clones
    if (currentIndex >= CLONE_BUFFER + cardCount) {
      currentIndex = currentIndex - cardCount;
      updateTrackPosition(false);
    }
    // Before first original card into prepended clones
    else if (currentIndex < CLONE_BUFFER) {
      currentIndex = currentIndex + cardCount;
      updateTrackPosition(false);
    }
  });

  // Buttons
  nextBtn.addEventListener('click', () => {
    slideNext();
    restartAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    slidePrev();
    restartAutoPlay();
  });

  // Autoplay
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      slideNext();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause on hover & focus
  sliderEl.addEventListener('mouseenter', stopAutoPlay);
  sliderEl.addEventListener('mouseleave', startAutoPlay);
  sliderEl.addEventListener('focusin', stopAutoPlay);
  sliderEl.addEventListener('focusout', startAutoPlay);

  // Mobile Touch Swipe Gestures
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    stopAutoPlay();
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        slideNext();
      } else {
        slidePrev();
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Window resize handler
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateTrackPosition(false);
    }, 100);
  }, { passive: true });

  // Initial positioning
  setTimeout(() => {
    updateTrackPosition(false);
    startAutoPlay();
  }, 100);
}

