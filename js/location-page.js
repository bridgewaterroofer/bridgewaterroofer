/**
 * BRIDGEWATER ROOFER — LOCATION PAGE CONTROLLER (Somerville, NJ Master)
 * Pure Vanilla JavaScript — High Performance, Fully Accessible & Conversion-Focused
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initEventTracking } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initEventTracking();
  initLocationHotspotDiagnosis();
  initMaterialTabs();
  initLocationFaqAccordion();
  initLocationEstimateForm();
  initLegalModal();
  initFloatingPhonePill();
  initLocationMapSync();

  console.info('Bridgewater Roofer — Somerville Location Page Initialized.');
});

/**
 * 1. INTERACTIVE LOCAL ROOF PROBLEM DIAGNOSIS (Somerville Context)
 */
function initLocationHotspotDiagnosis() {
  const buttons = document.querySelectorAll('.hotspot-btn');
  const tagEl = document.getElementById('diag-pill');
  const titleEl = document.getElementById('diag-title');
  const descEl = document.getElementById('diag-desc');
  const actionTitleEl = document.getElementById('diag-action-title');
  const actionTextEl = document.getElementById('diag-action-text');

  if (!buttons.length || !titleEl) return;

  const problemData = {
    'chimney': {
      tag: 'Common in Somerville Victorians',
      title: 'Masonry Chimney & Counter-Flashing Separation',
      desc: 'Historic brick chimneys on Somerville Victorian and Colonial homes undergo seasonal mortar expansion. When mortar joints crumble or lead/copper counter-flashing pulls away from the brick face, wind-driven rains infiltrate behind the roofline into upper-floor ceilings.',
      actionTitle: 'Custom Step & Counter-Flashing Restoration',
      actionText: 'Rake out deteriorated mortar joints, slide new heavy-gauge aluminum or copper step flashing under existing shingle courses, embed counter-flashing in fresh masonry, and seal with polyurethane.'
    },
    'valley': {
      tag: 'Tree Debris & Water Channel',
      title: 'Roof Valley Infiltration & Leaf Accumulation',
      desc: 'With Somerville’s dense canopy of mature oak and maple shade trees, autumn leaves naturally collect in roof valleys. Trapped wet leaves hold moisture against shingles and accelerate granule erosion, causing water backup under heavy downpours.',
      actionTitle: 'Ice & Water Valley Barrier & Metal Channel',
      actionText: 'Extract degraded valley shingles, install a high-temperature self-adhering ice-and-water barrier, and install open metal valley channels to facilitate rapid debris and stormwater shedding.'
    },
    'shingles': {
      tag: 'Aging Shingle Field',
      title: 'Brittle Shingles, Blown Tabs & Granule Loss',
      desc: 'Roofing systems over 15–20 years in central New Jersey suffer from thermal shock and UV drying. Brittle shingles lose wind resistance during Raritan Valley storm fronts, leading to lifted tabs, water penetration, and exposed felt underlayment.',
      actionTitle: 'Targeted Shingle Patching or Full Replacement',
      actionText: 'Evaluate shingle pliability and nail withdrawal resistance. If isolated, replace damaged tabs with color-matched architectural shingles; if widespread, recommend a complete GAF or CertainTeed roofing system.'
    },
    'pipe-boot': {
      tag: 'Attic & Ceiling Leak Source',
      title: 'Deteriorated Plumbing Vent Collar Boot',
      desc: 'Neoprene rubber collars around bathroom exhaust and plumbing vent stacks crack after 7–10 years of sun exposure. In Somerville properties, this is a leading cause of small, mysterious water rings on upstairs drywall.',
      actionTitle: 'Silicone Lifetime Collar Replacement',
      actionText: 'Install UV-stabilized lifetime silicone repair collars or replace full vent flashing sleeves without tearing up surrounding shingles.'
    },
    'ice-dam': {
      tag: 'Winter Freeze-Thaw Hazard',
      title: 'Eave Ice Damming & Interior Ceiling Infiltration',
      desc: 'Somerville winters bring repeated freeze-thaw cycles. Heat escaping through older attics melts snow on upper roof slopes, which refreezes at uninsulated cold eaves, backing water up underneath shingle courses into soffits and walls.',
      actionTitle: 'Eave Waterproofing & Attic Airflow Balance',
      actionText: 'Install full 6-foot code-compliant ice-and-water shield along eaves during repairs and evaluate soffit-to-ridge airflow to maintain a continuous cold roof surface.'
    }
  };

  const pins = document.querySelectorAll('.svg-hotspot-pin');
  const allTriggers = [...buttons, ...pins];

  function activateProblem(key) {
    const matchingBtn = Array.from(buttons).find(b => (b.getAttribute('data-problem') === key || b.getAttribute('data-hotspot') === key));
    let data = problemData[key];

    if (matchingBtn && matchingBtn.hasAttribute('data-title')) {
      data = {
        tag: matchingBtn.getAttribute('data-tag') || matchingBtn.getAttribute('data-pill') || (data ? data.tag : ''),
        title: matchingBtn.getAttribute('data-title') || (data ? data.title : ''),
        desc: matchingBtn.getAttribute('data-desc') || (data ? data.desc : ''),
        actionTitle: matchingBtn.getAttribute('data-action-title') || (data ? data.actionTitle : ''),
        actionText: matchingBtn.getAttribute('data-action-text') || (data ? data.actionText : '')
      };
    }

    if (!data) return;

    buttons.forEach(b => {
      if (b.getAttribute('data-problem') === key || b.getAttribute('data-hotspot') === key) {
        b.classList.add('is-active');
      } else {
        b.classList.remove('is-active');
      }
    });

    pins.forEach(p => {
      if (p.getAttribute('data-problem') === key || p.getAttribute('data-hotspot') === key) {
        p.classList.add('is-active');
      } else {
        p.classList.remove('is-active');
      }
    });

    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (actionTitleEl) actionTitleEl.textContent = data.actionTitle;
    if (actionTextEl) actionTextEl.textContent = data.actionText;
  }

  allTriggers.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-problem') || item.getAttribute('data-hotspot');
      activateProblem(key);
    });
  });
}

/**
 * 2. MATERIAL TABS SWITCHER
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
 * 3. LOCATION FAQ ACCORDION (Matches Global Master UI/UX)
 */
function initLocationFaqAccordion() {
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
 * 4. LOCATION ESTIMATE FORM UX
 */
function initLocationEstimateForm() {
  const formCard = document.getElementById('estimate-form');
  if (!formCard) return;

  const form = formCard.querySelector('form');
  const statusMsg = document.getElementById('form-status');
  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();

    if (!name || !phone) {
      alert('Please provide your name and contact phone number so our team can reach you.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Request...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Roofing Estimate';
      }
      statusMsg.classList.add('is-success');
      statusMsg.textContent = 'Thank you! Your roofing estimate request for Somerville has been received. Our Bridgewater dispatch team will call you shortly.';
    }, 800);
  });
}

/**
 * 5. ACCESSIBLE LEGAL MODAL DIALOG
 */
function initLegalModal() {
  const triggers = document.querySelectorAll('.legal-modal-trigger');
  const dialog = document.getElementById('legal-dialog');
  const title = document.getElementById('legal-dialog-title');
  const content = document.getElementById('legal-dialog-content');
  const closeBtn = document.getElementById('legal-dialog-close');

  if (!dialog || !triggers.length || !closeBtn) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const type = trigger.getAttribute('data-legal');
      if (type === 'privacy') {
        title.textContent = 'Privacy Policy';
        content.innerHTML = '<p>Bridgewater Roofer values and protects your privacy. Contact information submitted through our website or direct phone line is used strictly to provide roofing estimates, arrange on-site inspections in Somerville and Somerset County, and coordinate repair services.</p><p>We do not sell, rent, or distribute personal information to third-party marketing services.</p>';
      } else if (type === 'terms') {
        title.textContent = 'Terms of Service';
        content.innerHTML = '<p>All estimates and proposals are subject to physical roof and attic evaluation. Workmanship warranties apply to completed repairs and full roof replacements as outlined in your individual written service agreement.</p><p>Bridgewater Roofer is a licensed and fully insured New Jersey Home Improvement Contractor.</p>';
      }

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
 * 6. FLOATING PHONE PILL
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
 * 7. INTERACTIVE LOCATION MAP & TOWN CARD SYNC
 */
function initLocationMapSync() {
  const mapNodes = document.querySelectorAll('.map-community-node');
  const townCards = document.querySelectorAll('.nearby-city-card');

  if (!mapNodes.length || !townCards.length) return;

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

    townCards.forEach(card => {
      const key = card.getAttribute('data-target-node');
      const isMatch = key && key.toLowerCase() === targetKey.toLowerCase();
      if (isMatch) {
        card.style.borderColor = 'var(--orange)';
        card.style.transform = 'translateY(-4px)';
      } else {
        card.style.borderColor = '';
        card.style.transform = '';
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

    townCards.forEach(card => {
      card.style.borderColor = '';
      card.style.transform = '';
    });
  }

  townCards.forEach(card => {
    const key = card.getAttribute('data-target-node');
    if (!key) return;

    card.addEventListener('mouseenter', () => setActive(key));
    card.addEventListener('mouseleave', resetActive);
  });

  mapNodes.forEach(node => {
    const key = node.getAttribute('data-node');
    if (!key) return;

    node.addEventListener('mouseenter', () => setActive(key));
    node.addEventListener('mouseleave', resetActive);
  });
}
