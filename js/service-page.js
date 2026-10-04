/**
 * BRIDGEWATER ROOFER — SERVICE PAGE CONTROLLER (Roof Repair Master)
 * Pure Vanilla JavaScript — High Performance & Fully Accessible
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initEventTracking } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initEventTracking();
  initServiceHotspotDiagnosis();
  initBeforeAfterSlider();
  initMaterialTabs();
  initServiceFaqAccordion();
  initServiceEstimateForm();
  initLegalModal();
  initFloatingPhonePill();
  initServiceAreaMapSync();

  console.info('Bridgewater Roofer — Roof Repair Service Page Initialized.');
});

/**
 * 1. INTERACTIVE ROOF REPAIR HOTSPOT DIAGNOSIS
 */
function initServiceHotspotDiagnosis() {
  const buttons = document.querySelectorAll('.hotspot-btn');
  const pins = document.querySelectorAll('.svg-hotspot-pin');
  const tagEl = document.getElementById('diag-pill');
  const titleEl = document.getElementById('diag-title');
  const descEl = document.getElementById('diag-desc');
  const actionTitleEl = document.getElementById('diag-action-title');
  const actionTextEl = document.getElementById('diag-action-text');

  if (!buttons.length || !titleEl) return;

  const hotspotData = {
    'valley': {
      tag: 'Critical Water Channel',
      title: 'Roof Valley Infiltration & Rusted Valley Tin',
      desc: 'Roof valleys funnel heavy stormwater runoff from two meeting slopes. When debris accumulates or aged valley metal corrodes, water seeps beneath surrounding shingles directly into the decking.',
      actionTitle: 'Targeted Valley Restoration',
      actionText: 'Careful extraction of compromised shingles, installation of ice-and-water barrier underlayment, and custom-bent 26-gauge open metal valley channel.'
    },
    'flashing': {
      tag: 'High Risk Penetration',
      title: 'Chimney & Step Flashing Separation',
      desc: 'Chimneys and roof-to-wall transitions rely on L-shaped step flashing embedded in mortar. Seasonal freeze-thaw cycles in Bridgewater crack mortar joints, allowing wind-driven rain to enter attic cavities.',
      actionTitle: 'Precision Masonry & Step Flashing',
      actionText: 'Grinding out deteriorated mortar seams, sliding fresh aluminum or copper step flashing under shingles, and installing counter-flashing with polyurethane sealant.'
    },
    'pipe-boot': {
      tag: 'Common Ceiling Leak',
      title: 'Cracked Plumbing Vent Pipe Boot',
      desc: 'Rubber boot collars around plumbing vent pipes dry out and crack under intense UV exposure after 7–10 years, frequently causing localized stains directly above second-floor bathrooms and hallways.',
      actionTitle: 'Vent Boot Collar Replacement',
      actionText: 'Replacing brittle neoprene collars with heavy-duty lifetime silicone flashing collars or complete lead vent sleeves without disturbing surrounding healthy shingles.'
    },
    'shingles': {
      tag: 'Wind Uplift & Exposure',
      title: 'Lifted, Creased, or Blown-Off Shingles',
      desc: 'High wind gusts during Somerset County storms unseal asphalt adhesive strips. Creased shingles break off, exposing the underlying nail heads and black felt paper directly to rainstorms.',
      actionTitle: 'Color-Matched Architectural Shingle Patching',
      actionText: 'Extracting broken shingles with a flat pry bar, replacing corroded fasteners, and sealing new matching shingles with specialized asphalt roof mastic.'
    },
    'ridge': {
      tag: 'Ventilation & Air Exhaust',
      title: 'Loose Ridge Cap & Blown Vent Fasteners',
      desc: 'The peak ridge of the roof experiences maximum wind uplift. Lifted ridge shingles allow rain to blow horizontally into attic ventilation baffles during nor’easters.',
      actionTitle: 'Ridge Vent Realignment & Re-Securing',
      actionText: 'Re-nailing continuous ridge vent baffles with 2.5-inch ring-shank nails and installing fresh high-profile asphalt ridge cap shingles with full wind warranty.'
    },
    'eave': {
      tag: 'Ice Damming & Gutter Backflow',
      title: 'Eave Edge Damage & Winter Ice Dams',
      desc: 'Winter snowmelt refreezes at cold roof eaves in Bridgewater, backing up water under shingles. Clogged or overflowing gutters also rot the fascia board and drip edge.',
      actionTitle: 'Eave Protection & Drip Edge Re-Sealing',
      actionText: 'Re-attaching metal drip edge flashing, replacing localized water-damaged starter shingles, and ensuring clean gutter drainage.'
    }
  };

  function updateDiagnosticView(key) {
    const matchingBtn = Array.from(buttons).find(btn => btn.getAttribute('data-hotspot') === key);
    let data = hotspotData[key];

    if (matchingBtn && matchingBtn.hasAttribute('data-title')) {
      data = {
        tag: matchingBtn.getAttribute('data-tag') || matchingBtn.getAttribute('data-pill') || '',
        title: matchingBtn.getAttribute('data-title') || '',
        desc: matchingBtn.getAttribute('data-desc') || '',
        actionTitle: matchingBtn.getAttribute('data-action-title') || '',
        actionText: matchingBtn.getAttribute('data-action-text') || ''
      };
    }

    if (!data) return;

    // Update active button state
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-hotspot') === key);
    });

    // Update SVG pins
    pins.forEach(pin => {
      pin.classList.toggle('is-active', pin.getAttribute('data-hotspot') === key);
    });

    // Update copy with smooth transition
    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (actionTitleEl) actionTitleEl.textContent = data.actionTitle;
    if (actionTextEl) actionTextEl.textContent = data.actionText;
  }

  // Button clicks
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-hotspot');
      updateDiagnosticView(key);
    });
  });

  // SVG Pin clicks
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const key = pin.getAttribute('data-hotspot');
      updateDiagnosticView(key);
    });
  });
}

/**
 * 2. BEFORE / AFTER COMPARISON SLIDER
 */
function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-slider-container');
  const sliderHandle = document.querySelector('.ba-slider-handle');
  const beforeLayer = document.querySelector('.ba-before-layer');
  if (!container || !sliderHandle || !beforeLayer) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    pos = Math.max(0.05, Math.min(0.95, pos));
    const percent = (pos * 100).toFixed(2) + '%';

    sliderHandle.style.left = percent;
    beforeLayer.style.width = percent;
  }

  // Pointer drag events
  const startDrag = (e) => {
    isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setSliderPosition(clientX);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setSliderPosition(clientX);
  };

  const endDrag = () => {
    isDragging = false;
  };

  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', endDrag);

  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', onDrag, { passive: true });
  window.addEventListener('touchend', endDrag);

  // Keyboard accessibility
  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'slider');
  container.setAttribute('aria-label', 'Before and After roof repair comparison');
  container.setAttribute('aria-valuemin', '0');
  container.setAttribute('aria-valuemax', '100');
  container.setAttribute('aria-valuenow', '50');

  container.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const currentPercent = parseFloat(sliderHandle.style.left || '50');
    if (e.key === 'ArrowLeft') {
      const newPos = Math.max(5, currentPercent - 5);
      sliderHandle.style.left = newPos + '%';
      beforeLayer.style.width = newPos + '%';
      container.setAttribute('aria-valuenow', newPos.toString());
    } else if (e.key === 'ArrowRight') {
      const newPos = Math.min(95, currentPercent + 5);
      sliderHandle.style.left = newPos + '%';
      beforeLayer.style.width = newPos + '%';
      container.setAttribute('aria-valuenow', newPos.toString());
    }
  });
}

/**
 * 3. MATERIAL TABS SWITCHER
 */
function initMaterialTabs() {
  const tabBtns = document.querySelectorAll('.mat-tab-btn');
  const panels = document.querySelectorAll('.mat-tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const activePanel = document.getElementById(`mat-${target}`);
      if (activePanel) activePanel.classList.add('is-active');
    });
  });
}

/**
 * 4. SERVICE FAQ ACCORDION (Matches Homepage UI & UX)
 */
function initServiceFaqAccordion() {
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
 * 5. COMPACT ESTIMATE FORM UX
 */
function initServiceEstimateForm() {
  const formCard = document.getElementById('estimate-form');
  const statusMsg = document.getElementById('form-status');
  if (!formCard || !statusMsg) return;

  const form = formCard.tagName === 'FORM' ? formCard : formCard.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');

    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
      alert('Please provide your name and phone number so our Bridgewater roofing team can reach you.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Submitting Request...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Repair Request Received ✓';
      statusMsg.classList.add('is-success');
      form.reset();
      statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  });
}

/**
 * 6. LEGAL MODAL CONTROLLER
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
        <p><strong>Bridgewater Roofer</strong> respects and protects homeowner privacy. Any contact information or property details submitted are utilized exclusively for scheduling roof repair consultations and providing written estimates.</p>
        <p>We never sell or distribute personal information to third-party marketing services. All inquiries are handled directly by our local Bridgewater, New Jersey team.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      html: `
        <p>All roof assessments, leak inspections, and repair quotes provided by <strong>Bridgewater Roofer</strong> are based on observable physical conditions at the time of evaluation.</p>
        <p>Written agreements and workmanship warranty details are issued prior to project commencement in accordance with New Jersey Home Improvement Contractor regulations.</p>
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
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  });

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  });
}

/**
 * 7. FLOATING PHONE PILL CONTROLLER
 */
function initFloatingPhonePill() {
  const pill = document.querySelector('.desktop-phone-pill');
  if (!pill) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      pill.classList.add('is-visible');
    } else {
      pill.classList.remove('is-visible');
    }
  }, { passive: true });
}

/**
 * 8. BIDIRECTIONAL SERVICE AREA DISPATCH MAP SYNC
 */
function initServiceAreaMapSync() {
  const mapNodes = document.querySelectorAll('.map-community-node');
  const townItems = document.querySelectorAll('.town-hub-item');

  if (!mapNodes.length || !townItems.length) return;

  function setActive(targetKey) {
    mapNodes.forEach(node => {
      const key = node.getAttribute('data-node');
      const isMatch = key && key.toLowerCase() === targetKey.toLowerCase();
      const rect = node.querySelector('rect');
      const circle = node.querySelector('circle');
      if (rect) {
        rect.style.stroke = isMatch ? 'var(--orange)' : '';
        rect.style.strokeWidth = isMatch ? '2px' : '';
      }
      if (circle && !node.classList.contains('is-hq')) {
        circle.style.fill = isMatch ? 'var(--orange)' : '';
        circle.style.filter = isMatch ? 'drop-shadow(0 0 8px rgba(244,122,36,0.8))' : '';
      }
    });

    townItems.forEach(item => {
      const key = item.getAttribute('data-target-node');
      const isMatch = key && key.toLowerCase() === targetKey.toLowerCase();
      if (isMatch) {
        item.style.borderColor = 'var(--orange)';
        item.style.background = '#FFF6EE';
      } else if (!item.classList.contains('is-hq')) {
        item.style.borderColor = '';
        item.style.background = '';
      }
    });
  }

  function resetActive() {
    mapNodes.forEach(node => {
      const rect = node.querySelector('rect');
      const circle = node.querySelector('circle');
      if (rect) {
        rect.style.stroke = '';
        rect.style.strokeWidth = '';
      }
      if (circle) {
        circle.style.fill = '';
        circle.style.filter = '';
      }
    });

    townItems.forEach(item => {
      if (!item.classList.contains('is-hq')) {
        item.style.borderColor = '';
        item.style.background = '';
      }
    });
  }

  townItems.forEach(item => {
    const key = item.getAttribute('data-target-node');
    if (!key) return;

    item.addEventListener('mouseenter', () => setActive(key));
    item.addEventListener('mouseleave', resetActive);
    item.addEventListener('focus', () => setActive(key));
    item.addEventListener('blur', resetActive);
  });

  mapNodes.forEach(node => {
    const key = node.getAttribute('data-node');
    if (!key) return;

    node.addEventListener('mouseenter', () => setActive(key));
    node.addEventListener('mouseleave', resetActive);
  });
}

