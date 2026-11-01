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
  initLegalModal();
  initServiceAreaConsole();
  initServiceReviewsSlider();
  initServiceAreaMap();
  initServiceFilters();
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
    },
    // Gutter Diagnostics
    'gutter-overflow': {
      tag: 'Runoff Capacity Exceeded',
      title: 'Heavy Rain Gutter Overflow & Spilling',
      desc: 'Water pouring over gutter edges during storms signals undersized 5-inch troughs, clogged downspouts, or improper eave pitch. Overflow saturates foundation soil and enters basements.',
      service: '6-Inch Seamless Gutter Installation',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    },
    'gutter-sagging': {
      tag: 'Fastener & Load Failure',
      title: 'Sagging, Pulling Away & Standing Water',
      desc: 'When spike-and-ferrule fasteners pull loose or fascia boards soften with rot, gutters sag, trap heavy standing water, and pull away under winter ice loads.',
      service: 'Hidden Screw Hanger & Fascia Repair',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    },
    'gutter-leaks': {
      tag: 'Seam Separation & Corrosion',
      title: 'Leaking Corner Miters & End Cap Seams',
      desc: 'Sectional gutters have seams every 10 feet that degrade and leak. Custom-extruded seamless aluminum gutters eliminate seam leaks across the entire roofline run.',
      service: 'Custom Seamless Gutters',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    },
    'gutter-foundation': {
      tag: 'Structural Hazard',
      title: 'Foundation Soil Erosion & Basement Dampness',
      desc: 'Short downspout discharges deposit thousands of gallons directly against foundation footings, causing hydrostatic pressure cracks and damp crawl spaces.',
      service: 'Downspout Extension & Drainage',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-ceiling'
    },
    'gutter-ice': {
      tag: 'Winter Weather Damage',
      title: 'Frozen Gutters, Icicles & Eave Ice Dams',
      desc: 'Debris-filled gutters prevent winter meltwater drainage, backing freezing water up beneath lower shingle courses and soaking interior ceiling drywall.',
      service: 'Micro-Mesh Gutter Guards',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-valley'
    },
    'gutter-fascia': {
      tag: 'Wood Decay Warning',
      title: 'Soft, Decayed, or Waterlogged Fascia Boards',
      desc: 'Continuous water overflow rots wood fascia and sub-fascia behind gutters. We replace deteriorated lumber with primed spruce or maintenance-free composite trim.',
      service: 'Fascia Board Replacement',
      url: '/gutter-installation-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    },
    // Skylight Diagnostics
    'skylight-leak': {
      tag: 'Active Envelope Breach',
      title: 'Water Dripping from Skylight Frame',
      desc: 'Water leaking around skylight drywall tunnels during rain usually stems from dried-out rubber perimeter gaskets or deteriorated top saddle flashing on the uphill slope.',
      service: 'Skylight Leak Repair & Flashing',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-flashing'
    },
    'skylight-condensation': {
      tag: 'Thermal Seal Failure',
      title: 'Fogging, Moisture & Hazing Between Panes',
      desc: 'Trapped condensation between double-pane glass indicates thermal seal failure. Insulating argon gas has escaped, requiring full glass or sash replacement.',
      service: 'Energy-Star Velux Replacement',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-vent'
    },
    'skylight-cracked': {
      tag: 'Impact Hazard',
      title: 'Hail Impact or Cracked Acrylic/Glass Pane',
      desc: 'Aged plastic bubble domes become brittle and fracture under hail or falling tree branches. Modern impact-rated laminated glass provides shatter resistance and UV filtering.',
      service: 'Laminated Glass Skylights',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-shingles'
    },
    'skylight-flashing': {
      tag: 'Step Flashing Wear',
      title: 'Corroded or Disturbed Skylight Flashing',
      desc: 'Tar patches around old skylights crack and crumble. We install engineered factory Velux aluminum flashing kits interwoven with ice and water underlayment.',
      service: 'Factory Flashing Rebuild',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-flashing'
    },
    'skylight-drywall': {
      tag: 'Interior Damage Alert',
      title: 'Attic Shaft Stains & Peeling Tunnel Paint',
      desc: 'Brown rings or soft drywall on light shafts indicate slow hidden leaks tracing down rafters before showing visibly. Non-destructive moisture tracking resolves the source.',
      service: 'Non-Destructive Leak Detection',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-ceiling'
    },
    'skylight-drafts': {
      tag: 'Thermal Inefficiency',
      title: 'Winter Drafts & Summer Solar Heat Gain',
      desc: 'Single-glazed or aged skylights leak expensive conditioned air. Upgrading to Low-E argon-filled units with solar thermal blinds cuts heating and cooling loads.',
      service: 'Solar Powered Venting Skylights',
      url: '/skylight-repair-installation-bridgewater-nj/',
      hotspotId: 'hotspot-vent'
    },
    // Siding Diagnostics
    'siding-damage': {
      tag: 'Storm & Wind Impact',
      title: 'Cracked, Unzipped, or Missing Siding Panels',
      desc: 'High wind gusts can unlock vinyl siding seams or fracture panels. Prompt replacement prevents wind-driven rain from penetrating the wood wall sheathing behind.',
      service: 'Targeted Siding Panel Repair',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-shingles'
    },
    'siding-warping': {
      tag: 'Thermal Distortion',
      title: 'Buckled, Wavy, or Distorted Siding Runs',
      desc: 'Vinyl siding nailed too tightly into wall studs cannot expand during hot NJ summers, causing buckling. Improper nailing clearances must be corrected.',
      service: 'Siding Re-Hanging & Alignment',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    },
    'siding-rot': {
      tag: 'Hidden Moisture Hazard',
      title: 'Moisture Intrusion & Wall Sheathing Rot',
      desc: 'Missing window head flashing or torn housewrap channels rain behind siding panels, rotting exterior OSB sheathing and framing studs undetected.',
      service: 'Water-Resistive Barrier Restoration',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-flashing'
    },
    'siding-drafts': {
      tag: 'Insulation Loss',
      title: 'Wall Drafts & Skyrocketing Energy Bills',
      desc: 'Uninsulated hollow vinyl allows thermal bridging across wall studs. Contoured foam-backed siding adds continuous R-value and eliminates interior cold spots.',
      service: 'Insulated Siding Installation',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-ceiling'
    },
    'siding-paint': {
      tag: 'Sun & Oxidation Aging',
      title: 'Fading, Chalking, or Peeling Exterior Finish',
      desc: 'Wood siding requires scraping and repainting every 4-6 years. Upgrading to James Hardie fiber cement or ColorPlus® finishes delivers 15+ years of vibrant color.',
      service: 'James Hardie Fiber Cement',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-vent'
    },
    'siding-trim': {
      tag: 'Envelope Perimeter Wear',
      title: 'Loose Corner Posts, Soffits & J-Channel Gaps',
      desc: 'Openings around corner posts and soffit transitions allow water and nesting pests into exterior wall cavities. We install custom-bent aluminum trim capping.',
      service: 'Aluminum Trim Coil Capping',
      url: '/siding-contractor-bridgewater-nj/',
      hotspotId: 'hotspot-gutter'
    }
  };

  function selectProblem(problemKey, triggerEl) {
    let data = problemData[problemKey];
    if (!data && triggerEl) {
      data = {
        tag: triggerEl.getAttribute('data-tag') || 'Diagnostic Analysis',
        title: triggerEl.getAttribute('data-title') || triggerEl.textContent.trim(),
        desc: triggerEl.getAttribute('data-desc') || '',
        service: triggerEl.getAttribute('data-service') || 'Inspection',
        url: triggerEl.getAttribute('data-url') || '#estimate-form-wrap',
        hotspotId: triggerEl.getAttribute('data-hotspot') || ''
      };
    }
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
      selectProblem(key, btn);
    });
  });

  // Hotspot clicks & keyboard accessibility
  hotspots.forEach((hs) => {
    hs.addEventListener('click', () => {
      const targetProblem = hs.getAttribute('data-linked-problem');
      if (targetProblem) {
        selectProblem(targetProblem, hs);
      }
    });

    hs.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetProblem = hs.getAttribute('data-linked-problem');
        if (targetProblem) {
          selectProblem(targetProblem, hs);
        }
      }
    });
  });

  // Location Page Hotspots support
  const locHotspotButtons = document.querySelectorAll('.hotspot-btn');
  if (locHotspotButtons.length) {
    locHotspotButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        locHotspotButtons.forEach((b) => b.classList.remove('active', 'is-active'));
        btn.classList.add('active', 'is-active');

        const title = btn.getAttribute('data-title');
        const pill = btn.getAttribute('data-pill') || btn.getAttribute('data-tag');
        const desc = btn.getAttribute('data-desc');
        const actionTitle = btn.getAttribute('data-action-title');
        const actionText = btn.getAttribute('data-action-text');

        const pillEl = document.getElementById('diag-pill');
        const titleEl = document.getElementById('diag-title');
        const descEl = document.getElementById('diag-desc');
        const actionTitleEl = document.getElementById('diag-action-title');
        const actionTextEl = document.getElementById('diag-action-text');

        if (pillEl && pill) pillEl.textContent = pill;
        if (titleEl && title) titleEl.textContent = title;
        if (descEl && desc) descEl.textContent = desc;
        if (actionTitleEl && actionTitle) actionTitleEl.textContent = actionTitle;
        if (actionTextEl && actionText) actionTextEl.textContent = actionText;
      });
    });
  }
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
    },
    // Gutter Materials
    'aluminum': {
      title: 'Seamless Aluminum Gutters (0.032" Heavy-Gauge)',
      badge: 'Residential Standard',
      desc: 'Formed on-site from thick 0.032-gauge aluminum coils. Seamless fabrication eliminates mid-run joints, preventing leaks while handling high-volume stormwater across Somerset County.',
      specs: [
        { icon: '📏', label: 'Profiles', val: '5" & 6" K-Style' },
        { icon: '🛡️', label: 'Lifespan', val: '25–30+ Years' },
        { icon: '🎨', label: 'Finish', val: '28 Baked Enamel Colors' },
        { icon: '💧', label: 'Capacity', val: '40% More Runoff (6")' }
      ],
      repairs: [
        'On-site continuous roll-forming with zero leak seams',
        'Heavy-duty hidden screw hangers spaced every 24 inches',
        'Rot-resistant primed wood or AZEK composite fascia mounting'
      ],
      linkText: 'Explore Seamless Gutter Services →',
      linkUrl: '/gutter-installation-bridgewater-nj/',
      accentColor: '#38BDF8',
      imageFile: 'gutter_installation_action.jpg',
      hudTop: { tier: 'Runoff Channel', title: '0.032" Heavy Aluminum Trough', detail: 'Seamless Precision Roll-Formed Run', pos: { top: '26%', left: '52%' } },
      hudMid: { tier: 'Fastener System', title: 'Hidden Heavy Screw Hanger', detail: 'Self-Sealing Zinc Fasteners into Rafters', pos: { top: '48%', left: '58%' } },
      hudBot: { tier: 'Mounting Base', title: 'Solid Wood or Composite Fascia', detail: 'Protected by Drip Edge Flashing', pos: { top: '70%', left: '42%' } },
      cert: 'Lifetime Baked Enamel Finish • Zero Mid-Span Seams'
    },
    'copper': {
      title: 'Pure Architectural Copper Gutters',
      badge: 'Prestigious Longevity',
      desc: 'Crafted from heavy 16 oz cold-rolled copper. Develops a distinguished protective patina over time, ideal for Somerset County historic colonials, stone manors, and luxury estates.',
      specs: [
        { icon: '⏳', label: 'Lifespan', val: '80–100+ Years' },
        { icon: '✨', label: 'Aesthetic', val: 'Natural Verdigris Patina' },
        { icon: '🔧', label: 'Joints', val: 'Hand-Soldered Seams' },
        { icon: '🏛️', label: 'Profiles', val: 'Half-Round & K-Style' }
      ],
      repairs: [
        'Custom seamless roll-forming and traditional half-round sections',
        'Hand-soldered brass brackets and expansion joints',
        'Matching solid copper round fluted downspouts'
      ],
      linkText: 'Explore Copper Gutter Installation →',
      linkUrl: '/gutter-installation-bridgewater-nj/',
      accentColor: '#B45309',
      imageFile: 'gutter_installation_action.jpg',
      hudTop: { tier: 'Prestige Channel', title: '16 oz Architectural Copper Trough', detail: 'Naturally Weathering Protective Patina', pos: { top: '26%', left: '52%' } },
      hudMid: { tier: 'Fastener System', title: 'Cast Brass & Copper Brackets', detail: 'Reinforced Shank & Circle Hangers', pos: { top: '48%', left: '58%' } },
      hudBot: { tier: 'Mounting Base', title: 'Custom Crown Fascia & Rafter Tails', detail: 'Artisan Architectural Integration', pos: { top: '70%', left: '42%' } },
      cert: 'Generational Craftsmanship • 100-Year Potential Life'
    },
    'galvalume': {
      title: 'Galvalume Steel Heavy-Duty Gutters',
      badge: 'Industrial Durability',
      desc: 'Steel substrate coated in aluminum-zinc alloy for superior resistance to rust and heavy snow impact. Built to withstand punishing winter ice accumulation without denting.',
      specs: [
        { icon: '🛡️', label: 'Strength', val: 'Superior Snow/Ice Load' },
        { icon: '⏳', label: 'Lifespan', val: '35–45+ Years' },
        { icon: '🛡️', label: 'Corrosion', val: 'Galvalume Self-Healing' },
        { icon: '❄️', label: 'Impact', val: 'Denting & Hail Resistant' }
      ],
      repairs: [
        'Commercial-grade seamless runs for large roof footprints',
        'Industrial internal box-miters and high-capacity outlets',
        'Heavy-duty snow bracket reinforcement'
      ],
      linkText: 'Explore Heavy-Duty Gutters →',
      linkUrl: '/gutter-installation-bridgewater-nj/',
      accentColor: '#64748B',
      imageFile: 'gutter_installation_action.jpg',
      hudTop: { tier: 'Heavy-Duty Channel', title: 'Galvalume Steel Alloy Trough', detail: 'Alu-Zinc Self-Healing Corrosion Barrier', pos: { top: '26%', left: '52%' } },
      hudMid: { tier: 'Fastener System', title: 'Reinforced Commercial Hanger Screws', detail: 'Withstands Dense Winter Snow Loads', pos: { top: '48%', left: '58%' } },
      hudBot: { tier: 'Mounting Base', title: 'Heavy Sub-Fascia Framing', detail: 'Engineered Eave Anchorage', pos: { top: '70%', left: '42%' } },
      cert: 'Engineered for Heavy Winter Snow & Large Roof Runoff'
    },
    'guards': {
      title: 'Stainless Steel Micro-Mesh Gutter Guards',
      badge: 'Zero-Clog Defense',
      desc: 'Medical-grade 316 stainless steel micro-mesh on an anodized aluminum frame. Blocks pine needles, pollen, shingle granules, and leaves while pulling in torrential rainwater.',
      specs: [
        { icon: '🛡️', label: 'Filtration', val: '50-Micron Micro-Mesh' },
        { icon: '💧', label: 'Rain Volume', val: '60+ Inches Per Hour' },
        { icon: '❄️', label: 'Ice Defense', val: 'Prevents Gutter Clog Ice' },
        { icon: '📜', label: 'Warranty', val: 'Lifetime No-Clog Guarantee' }
      ],
      repairs: [
        'Fits directly beneath shingle drip edges without voiding roof warranties',
        'Heavy-gauge extruded aluminum substrate frame',
        'Completely eliminates seasonal ladder cleaning hazards'
      ],
      linkText: 'Explore Gutter Guard Options →',
      linkUrl: '/gutter-installation-bridgewater-nj/',
      accentColor: '#10B981',
      imageFile: 'gutter_leaf_guard_detail.jpg',
      hudTop: { tier: 'Filtration Course', title: '316 Marine Stainless Micro-Mesh', detail: 'Sheds Pine Needles & Shingle Granules', pos: { top: '26%', left: '50%' } },
      hudMid: { tier: 'Support Frame', title: 'Anodized Aluminum Truss Frame', detail: 'Structural Ribbing Resists Heavy Twigs', pos: { top: '48%', left: '56%' } },
      hudBot: { tier: 'Mounting Base', title: 'Fascia-Locked Precision Pitch', detail: 'Integrated Seamless Gutter Lip Fit', pos: { top: '70%', left: '42%' } },
      cert: '100% No-Clog Performance • Roof Warranty Compliant'
    },
    // Skylight Systems
    'deck-mounted': {
      title: 'Velux Deck-Mounted Glass Skylights',
      badge: 'No-Leak Gold Standard',
      desc: 'Engineered to mount directly to the structural roof decking with three patented layers of water protection. Features Low-E Clean, Quiet & Safe laminated glass.',
      specs: [
        { icon: '☀️', label: 'Glass', val: 'Low-E3 Laminated Safety Glass' },
        { icon: '💧', label: 'Protection', val: 'Triple Seal No-Leak Kit' },
        { icon: '🔇', label: 'Sound', val: '25% Noise Reduction' },
        { icon: '🛡️', label: 'Warranty', val: '10-Yr No-Leak Guarantee' }
      ],
      repairs: [
        'Deck-seal adhesive membrane wrapped directly to roof deck',
        'Surrounding high-temp ice and water underlayment collar',
        'Engineered aluminum step flashing integrated into shingles'
      ],
      linkText: 'Explore Deck-Mounted Skylights →',
      linkUrl: '/skylight-repair-installation-bridgewater-nj/',
      accentColor: '#0284C7',
      imageFile: 'skylight_installation_action.jpg',
      hudTop: { tier: 'Glazing Course', title: 'Low-E3 Dual Pane Laminated Glass', detail: 'Neat® Coating Stays Clean Longer', pos: { top: '28%', left: '52%' } },
      hudMid: { tier: 'Flashing System', title: 'Factory Velux Step Flashing', detail: 'Interwoven with Surrounding Shingle Courses', pos: { top: '50%', left: '60%' } },
      hudBot: { tier: 'Deck Seal', title: 'Self-Adhered Waterproof Membrane', detail: 'Direct Deck Mounting Collar', pos: { top: '72%', left: '40%' } },
      cert: 'Velux 10-Year No-Leak Warranty • Energy Star Certified'
    },
    'curb-mounted': {
      title: 'Velux Curb-Mounted Skylights',
      badge: 'Versatile Replacement',
      desc: 'Built to fit over a site-constructed wooden curb. Ideal for low-pitch roofs, flat roof additions, or fast replacement of older aged bubble skylights without disturbing interior trim.',
      specs: [
        { icon: '📐', label: 'Pitch Range', val: '0° to 60° (Flat to Steep)' },
        { icon: '🛡️', label: 'Durability', val: 'Commercial-Grade Heavy Frame' },
        { icon: '☀️', label: 'Energy Star', val: 'Low Solar Heat Gain' },
        { icon: '💧', label: 'Curb Flashing', val: 'Custom Welded Saddle' }
      ],
      repairs: [
        'Insulated 2x4 or 2x6 wood curb rebuilding and leveling',
        'Heavy-duty rubber curb gasket and exterior counter-flashing',
        'Continuous ice barrier wrap up all four curb sides'
      ],
      linkText: 'Explore Curb-Mounted Skylights →',
      linkUrl: '/skylight-repair-installation-bridgewater-nj/',
      accentColor: '#0369A1',
      imageFile: 'skylight_flashing_detail.jpg',
      hudTop: { tier: 'Glazing Cap', title: 'Heavy Aluminum Glazing Frame', detail: 'Double-Sealed Insulated Glass Unit', pos: { top: '28%', left: '52%' } },
      hudMid: { tier: 'Curb Flashing', title: 'Preformed Aluminum Curb Flashing', detail: 'Custom Saddle & Sill Water Deflector', pos: { top: '50%', left: '60%' } },
      hudBot: { tier: 'Structural Base', title: 'Waterproof Membrane Wrapped Curb', detail: 'Solid Lumber Framing Anchor', pos: { top: '72%', left: '40%' } },
      cert: 'Engineered for Low-Slope & Traditional Roof Curbs'
    },
    'solar-venting': {
      title: 'Solar-Powered Fresh Air Venting Skylights',
      badge: '30% Federal Tax Credit',
      desc: 'Brings fresh breezes and natural light indoors with zero electrical wiring. An integrated solar panel charges the battery, while an acoustic rain sensor automatically closes the sash at the first drop of rain.',
      specs: [
        { icon: '⚡', label: 'Power', val: 'Built-In Solar PV Cell' },
        { icon: '🌧️', label: 'Rain Sensor', val: 'Auto-Closing Acoustic Sensor' },
        { icon: '💰', label: 'Tax Credit', val: 'Up to 30% Federal Credit' },
        { icon: '📱', label: 'Control', val: 'Wireless Wall Remote / App' }
      ],
      repairs: [
        'Passive chimney effect exhausts hot, stale attic air',
        'Eligible for 30% federal clean energy tax credits on product and labor',
        'Optional factory-fitted solar room-darkening shades'
      ],
      linkText: 'Explore Solar Venting Skylights →',
      linkUrl: '/skylight-repair-installation-bridgewater-nj/',
      accentColor: '#F59E0B',
      imageFile: 'skylight_installation_action.jpg',
      hudTop: { tier: 'Smart Operator', title: 'Motorized Solar Venting Sash', detail: 'Rain Sensor Closes Window Automatically', pos: { top: '28%', left: '52%' } },
      hudMid: { tier: 'Flashing Envelope', title: 'Velux Triple-Seal Flashing Kit', detail: 'Full Waterproof Underlayment Tie-In', pos: { top: '50%', left: '60%' } },
      hudBot: { tier: 'Shaft Collar', title: 'Insulated Framing & Drywall Return', detail: 'Thermal Bridge Elimination', pos: { top: '72%', left: '40%' } },
      cert: '30% Federal Clean Energy Tax Credit Eligible'
    },
    'sun-tunnel': {
      title: 'Velux Sun Tunnel® Tubular Daylighting',
      badge: 'Compact Interior Brightness',
      desc: 'Brings daylight into dark interior spaces like hallways, walk-in closets, powder rooms, and laundry spaces through a highly reflective optical tube extending from roof to ceiling.',
      specs: [
        { icon: '☀️', label: 'Reflectivity', val: '99.7% Pure Optical Mirror' },
        { icon: '⏱️', label: 'Install Time', val: 'Under 3 Hours' },
        { icon: '🏠', label: 'Applications', val: 'Hallways, Baths, Closets' },
        { icon: '🛡️', label: 'Roof Pitch', val: '14° to 60° Pitches' }
      ],
      repairs: [
        'Low-profile integrated roof pitch flashing tile',
        'Rigid or flexible ultra-reflective tunnel tubing',
        'Frosted ceiling diffuser for soft, glare-free daylight distribution'
      ],
      linkText: 'Explore Sun Tunnel Daylighting →',
      linkUrl: '/skylight-repair-installation-bridgewater-nj/',
      accentColor: '#EAB308',
      imageFile: 'skylight_flashing_detail.jpg',
      hudTop: { tier: 'Roof Collector', title: 'High-Impact Acrylic Roof Dome', detail: 'Captures Low-Angle Morning & Evening Sun', pos: { top: '28%', left: '52%' } },
      hudMid: { tier: 'Optical Channel', title: '99.7% Reflective Miro-Silver Tube', detail: 'Transfers Natural Light Around Obstacles', pos: { top: '50%', left: '60%' } },
      hudBot: { tier: 'Ceiling Output', title: 'Dual-Diffuser Ceiling Lens', detail: 'Glare-Free Interior Room Illumination', pos: { top: '72%', left: '40%' } },
      cert: 'Ideal for Dark Hallways & Windowless Interior Rooms'
    },
    // Siding Materials
    'vinyl': {
      title: 'Insulated Premium Vinyl Siding',
      badge: 'High-Efficiency Value',
      desc: 'CertainTeed Monogram premium vinyl siding backed by contoured EPS foam insulation. Eliminates thermal bridging across studs, resists 130 MPH winds, and never requires painting.',
      specs: [
        { icon: '💨', label: 'Wind Uplift', val: 'Class 130+ MPH Wind' },
        { icon: '❄️', label: 'Insulation', val: 'Continuous R-Value Layer' },
        { icon: '🎨', label: 'Maintenance', val: 'Zero Scraping or Painting' },
        { icon: '🛡️', label: 'Warranty', val: 'Lifetime Limited Transferable' }
      ],
      repairs: [
        'Rigid interlocking hem locks panels securely against nor’easters',
        'Contoured foam core resists impact from lawnmowers and hail',
        'Available in traditional clapboard and contemporary Dutch lap'
      ],
      linkText: 'Explore Insulated Vinyl Siding →',
      linkUrl: '/siding-contractor-bridgewater-nj/',
      accentColor: '#38BDF8',
      imageFile: '3d_material_siding.webp',
      hudTop: { tier: 'Exterior Course', title: '0.046" Heavy Virgin Vinyl Panel', detail: 'TrueTexture™ Cedar Woodgrain Texture', pos: { top: '36%', left: '70%' } },
      hudMid: { tier: 'Thermal Shield', title: 'Contoured EPS Foam Core Board', detail: 'Eliminates Thermal Stud Bridging (R-3+)', pos: { top: '48%', left: '45%' } },
      hudBot: { tier: 'Weather Barrier', title: 'DuPont Tyvek® Breathable Wrap', detail: 'Flashing Tape Around Windows & Doors', pos: { top: '64%', left: '24%' } },
      cert: 'Class 130 MPH Wind Certified • High Thermal R-Value'
    },
    'fiber-cement': {
      title: 'James Hardie® Fiber Cement Siding',
      badge: 'Architectural Prestige',
      desc: 'Composed of Portland cement, sand, and cellulose fibers engineered for NJ climate zones (HardieZone® HZ5). Resists freeze-thaw cracking, moisture swelling, rot, pests, and fire.',
      specs: [
        { icon: '🔥', label: 'Fire Rating', val: 'Class A Non-Combustible' },
        { icon: '🛡️', label: 'Substrate', val: '30-Yr Non-Prorated Warranty' },
        { icon: '🎨', label: 'ColorPlus®', val: '15-Yr Baked Finish Warranty' },
        { icon: '🪵', label: 'Texture', val: 'Authentic Deep Cedar Grain' }
      ],
      repairs: [
        'Non-combustible composite will not burn or melt when exposed to flame',
        'Resistant to carpenter bees, termites, and woodpecker pecking',
        'HardiePlank® lap siding, HardieShingle®, and HardieTrim® boards'
      ],
      linkText: 'Explore James Hardie Siding →',
      linkUrl: '/siding-contractor-bridgewater-nj/',
      accentColor: '#D97706',
      imageFile: '3d_material_siding.webp',
      hudTop: { tier: 'Armor Course', title: '5/16" James Hardie® Plank', detail: 'Class A Non-Combustible Fire Rating', pos: { top: '36%', left: '70%' } },
      hudMid: { tier: 'Drainage Plane', title: 'HardieWrap® Weather Barrier', detail: 'Micro-Grooved Moisture Drainage Gap', pos: { top: '48%', left: '45%' } },
      hudBot: { tier: 'Substrate Base', title: '1/2" CDX Exterior Sheathing', detail: 'Ring-Shank Corrosion Proof Fastening', pos: { top: '64%', left: '24%' } },
      cert: 'HardieZone® HZ5 Engineered for New Jersey Freeze-Thaw'
    },
    'shakes': {
      title: 'Architectural Cedar Shake Impressions',
      badge: 'Colonial Shore Accent',
      desc: 'Molded directly from authentic hand-split cedar shingles. Captures subtle grain variations, sawmill marks, and rustic shadow lines without the rot, curling, or insect vulnerability of raw wood.',
      specs: [
        { icon: '🪵', label: 'Appearance', val: 'Hand-Split Cedar Impression' },
        { icon: '🛡️', label: 'Rot Resistance', val: '100% Moisture Proof Poly' },
        { icon: '💨', label: 'Wind Rating', val: 'Up to 110 MPH Locked' },
        { icon: '🎨', label: 'Varieties', val: 'Perfection, Rough-Split, Scallop' }
      ],
      repairs: [
        'Ideal for accent gables, second-story dormers, and portico entries',
        'Continuous perimeter perimeter J-channel and drip cap integration',
        'Zero oiling, staining, or annual cedar preservative chemical treatments'
      ],
      linkText: 'Explore Shake Siding Options →',
      linkUrl: '/siding-contractor-bridgewater-nj/',
      accentColor: '#92400E',
      imageFile: '3d_material_siding.webp',
      hudTop: { tier: 'Accent Profile', title: 'Perfection Cedar Shake Shingles', detail: 'Deep Shadow Lines & Staggered Butt Joints', pos: { top: '36%', left: '70%' } },
      hudMid: { tier: 'Locking Interlock', title: 'Perimeter Panel Latch Seams', detail: 'Seamless Horizontal & Vertical Interlock', pos: { top: '48%', left: '45%' } },
      hudBot: { tier: 'Sub-Sheathing', title: 'Engineered Weather-Tight Wall Plane', detail: 'Protected Gables & Dormer Sidewalls', pos: { top: '64%', left: '24%' } },
      cert: 'Authentic Colonial Charm with Zero Wood Rot Maintenance'
    },
    'board-batten': {
      title: 'Modern Vertical Board & Batten Siding',
      badge: 'Modern Farmhouse Architecture',
      desc: 'Features wide 8-inch or 10-inch vertical boards accented by raised 2-inch batten strips. Creates soaring vertical lines and contemporary farmhouse curb appeal across Somerset County.',
      specs: [
        { icon: '📐', label: 'Design', val: 'Vertical Architectural Lines' },
        { icon: '🛡️', label: 'Substrate', val: 'Fiber Cement or Heavy Vinyl' },
        { icon: '🎨', label: 'Colors', val: 'Modern Dark Charcoal & White' },
        { icon: '❄️', label: 'Durability', val: 'Impact & Weather Resistant' }
      ],
      repairs: [
        'Durable vertical furring strip installation for true flat planes',
        'Integrated z-flashing water management between multi-level courses',
        'Striking modern aesthetic combined with lifetime low maintenance'
      ],
      linkText: 'Explore Board & Batten Siding →',
      linkUrl: '/siding-contractor-bridgewater-nj/',
      accentColor: '#475569',
      imageFile: '3d_material_siding.webp',
      hudTop: { tier: 'Vertical Facade', title: 'Wide Board & Raised Batten Profile', detail: 'Dramatic Modern Farmhouse Architectural Lines', pos: { top: '36%', left: '70%' } },
      hudMid: { tier: 'Flashing Transit', title: 'Z-Flashing Horizontal Seam Drips', detail: 'Directs Rain Outward Away from Sheathing', pos: { top: '48%', left: '45%' } },
      hudBot: { tier: 'Framing Anchors', title: 'Horizontal Wall Furring & OSB Deck', detail: 'High-Tensile Structural Fastener Grid', pos: { top: '64%', left: '24%' } },
      cert: 'Contemporary Elevation Architecture • Engineered Water Shedding'
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
    const slidingLayer = container.querySelector('.ba-layer-before') || container.querySelector('.ba-layer-after');
    const handle = container.querySelector('.ba-handle');
    const slidingImg = slidingLayer ? slidingLayer.querySelector('img') : null;
    if (!slidingLayer || !handle) return;

    let isDragging = false;

    function syncImageWidth() {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      if (w > 0) {
        container.style.setProperty('--ba-container-width', `${w}px`);
        if (slidingImg) {
          slidingImg.style.width = `${w}px`;
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

      slidingLayer.style.width = `${percent}%`;
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
  const triggers = document.querySelectorAll('.faq-trigger, .faq-question');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const answerContent = trigger.nextElementSibling;

      // Close other accordion items in the same container
      const container = trigger.closest('.faq-accordion') || trigger.parentElement.parentElement;
      if (container) {
        const siblings = container.querySelectorAll('.faq-trigger, .faq-question');
        siblings.forEach((other) => {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
            const otherAns = other.nextElementSibling;
            if (otherAns) {
              otherAns.style.maxHeight = null;
              if (otherAns.classList.contains('faq-answer')) {
                otherAns.setAttribute('hidden', '');
              }
            }
          }
        });
      }

      trigger.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded && answerContent) {
        answerContent.removeAttribute('hidden');
        answerContent.style.maxHeight = answerContent.scrollHeight + 'px';
      } else if (answerContent) {
        answerContent.setAttribute('hidden', '');
        answerContent.style.maxHeight = null;
      }
    });
  });
}

/**
 * SECTION 19: FORM INTERCEPTOR & CALL REDIRECTION (CRO System Maintenance Notice)
 */
function showCallToast() {
  let toast = document.getElementById('form-call-toast');
  if (!toast) {
    toast = document.createElement('aside');
    toast.id = 'form-call-toast';
    toast.className = 'form-call-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.innerHTML = `
      <div class="form-call-toast-header">
        <span class="form-call-toast-badge">
          <span class="notice-pulse"></span>
          <span>⚡ Direct Phone Dispatch Active</span>
        </span>
        <button type="button" class="form-call-toast-close" aria-label="Close notification">&times;</button>
      </div>
      <div class="form-call-toast-title">Faster Service Available by Phone</div>
      <div class="form-call-toast-desc">
        Online submissions are temporarily paused for scheduled maintenance. To ensure zero delay and instant scheduling, please call our Bridgewater priority desk directly:
      </div>
      <a href="tel:+19084659944" class="btn-notice-call cta-phone" data-call-source="form-toast">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span>Call (908) 465-9944</span>
      </a>
      <div class="notice-meta" style="margin-top: 0.65rem;">
        <span>✓ Direct Roofer Access</span>
        <span>✓ No Waiting</span>
      </div>
    `;
    document.body.appendChild(toast);
    toast.querySelector('.form-call-toast-close').addEventListener('click', () => {
      toast.classList.remove('is-visible');
    });
  }
  toast.classList.add('is-visible');
}

function initEstimateForm() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const card = form.closest('.estimate-form-card, .contact-form-card, #estimate-form') || form;
    const notice = card.querySelector('.form-compact-callout, .form-out-of-order-notice');

    const triggerNotice = () => {
      if (notice) {
        notice.classList.add('is-highlighted');
      }
      showCallToast();
    };

    // Trigger on any input focus, click, or keydown
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach((field) => {
      field.addEventListener('focus', triggerNotice);
      field.addEventListener('click', triggerNotice);
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      triggerNotice();

      if (notice) {
        notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Mobile visitors are smoothly prompted directly into the phone dialer
      if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        setTimeout(() => {
          window.location.href = 'tel:+19084659944';
        }, 150);
      }
    });
  });
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

/**
 * SECTION 16: INTERACTIVE LEAFLET SERVICE AREA MAP (Somerset County)
 */
function initServiceAreaMap() {
  const mapContainer = document.getElementById('service-area-leaflet-map');
  if (!mapContainer) return;

  const startLeaflet = () => {
    if (typeof window.L === 'undefined') return;
    if (mapContainer._leaflet_id) return; // Prevent double init

    const centerCoords = [40.5939, -74.6254]; // Bridgewater, NJ Hub
    const map = L.map('service-area-leaflet-map', {
      center: centerCoords,
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);

    // Circular Service Radius (matching Image 1)
    L.circle(centerCoords, {
      radius: 13500, // ~13.5 km coverage radius
      color: '#0d9488',
      fillColor: '#0d9488',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(map);

    // 11 Somerset County Service Areas
    const serviceAreas = [
      { name: 'Bridgewater (Central Hub)', lat: 40.5939, lng: -74.6254, url: '/service-area/', isHub: true },
      { name: 'Somerville', lat: 40.5743, lng: -74.6099, url: '/service-area/roofer-somerville-nj/' },
      { name: 'Raritan', lat: 40.5695, lng: -74.6343, url: '/service-area/roofer-raritan-nj/' },
      { name: 'Martinsville', lat: 40.6012, lng: -74.5779, url: '/service-area/roofer-martinsville-nj/' },
      { name: 'Bound Brook', lat: 40.5684, lng: -74.5385, url: '/service-area/roofer-bound-brook-nj/' },
      { name: 'Hillsborough', lat: 40.4998, lng: -74.6646, url: '/service-area/roofer-hillsborough-nj/' },
      { name: 'Warren', lat: 40.6382, lng: -74.5090, url: '/service-area/roofer-warren-nj/' },
      { name: 'Basking Ridge', lat: 40.7065, lng: -74.5493, url: '/service-area/roofer-basking-ridge-nj/' },
      { name: 'Branchburg', lat: 40.5784, lng: -74.7077, url: '/service-area/roofer-branchburg-nj/' },
      { name: 'Bedminster', lat: 40.6698, lng: -74.6599, url: '/service-area/roofer-bedminster-nj/' },
      { name: 'Manville', lat: 40.5407, lng: -74.5888, url: '/service-area/roofer-manville-nj/' }
    ];

    const markers = {};

    // Custom Teardrop Pin Marker (matching Image 1)
    function createPinIcon(isHub = false) {
      const color = isHub ? '#f47a24' : '#0284c7';
      const size = isHub ? [30, 39] : [24, 32];
      const anchor = isHub ? [15, 39] : [12, 32];
      return L.divIcon({
        className: 'leaflet-custom-pin' + (isHub ? ' is-hub' : ''),
        html: `
          <svg width="${size[0]}" height="${size[1]}" viewBox="0 0 28 36" fill="none">
            <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.732-6.268-14-14-14z" fill="${color}" />
            <circle cx="14" cy="14" r="5" fill="#ffffff" />
          </svg>
        `,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: [0, -anchor[1] + 6]
      });
    }

    // Add pins to map
    serviceAreas.forEach((area) => {
      const marker = L.marker([area.lat, area.lng], {
        icon: createPinIcon(area.isHub),
        title: area.name
      }).addTo(map);

      const popupHtml = `
        <div class="map-popup-card">
          <div class="popup-badge">${area.isHub ? '⭐ HEADQUARTERS & HUB' : '📍 SERVICE AREA'}</div>
          <h4 class="popup-title">${area.name}</h4>
          <p class="popup-desc">Roof repair, replacement &amp; inspections in ${area.name}.</p>
          <a href="${area.url}" class="popup-link">Explore ${area.name} Services &rarr;</a>
        </div>
      `;

      marker.bindPopup(popupHtml);
      markers[area.name.toLowerCase().replace(/[^a-z]/g, '')] = marker;
    });

    // Connect Community Chips in right column to Map Pins
    const chips = document.querySelectorAll('.community-chip');
    chips.forEach((chip) => {
      const cleanName = chip.textContent.toLowerCase().replace(/[^a-z]/g, '');
      const matchedKey = Object.keys(markers).find(k => cleanName.includes(k) || k.includes(cleanName));

      if (matchedKey && markers[matchedKey]) {
        chip.addEventListener('mouseenter', () => {
          markers[matchedKey].openPopup();
        });
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          const marker = markers[matchedKey];
          map.setView(marker.getLatLng(), 13, { animate: true });
          marker.openPopup();
        });
      }
    });

    // Invalidate map size when it scrolls into view to ensure full tile rendering
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            map.invalidateSize();
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(mapContainer);
    }
  };

  if (typeof window.L !== 'undefined') {
    startLeaflet();
  } else {
    // If Leaflet script is still loading, wait for it
    const checkLeaflet = setInterval(() => {
      if (typeof window.L !== 'undefined') {
        clearInterval(checkLeaflet);
        startLeaflet();
      }
    }, 100);
    setTimeout(() => clearInterval(checkLeaflet), 5000);
  }
}

/**
 * SECTION 4: SERVICE CATEGORY FILTERING
 */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');
  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const isMatch = category === 'all' || cardCat.split(' ').includes(category);
        card.classList.toggle('is-hidden', !isMatch);
      });
    });
  });
}
