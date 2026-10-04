/**
 * Bridgewater Roofer - Blog & Editorial Engine
 * Pure Vanilla JavaScript (No frameworks or dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initTableOfContents();
  initMobileToc();
  initFaqAccordion();
  initDecisionTree();
  initCopyLinkButton();
});

/**
 * 1. Thin 2px Reading Progress Bar
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById('readingProgressBar') || document.querySelector('.reading-progress-bar');
  if (!progressBar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const article = document.querySelector('.article-body-content') || document.body;
        const rect = article.getBoundingClientRect();
        const articleTop = rect.top + window.scrollY;
        const articleHeight = rect.height;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const start = articleTop - 150;
        const end = articleTop + articleHeight - windowHeight;

        let percentage = 0;
        if (scrollY > start && end > start) {
          percentage = Math.min(100, Math.max(0, ((scrollY - start) / (end - start)) * 100));
        } else if (scrollY >= end) {
          percentage = 100;
        }

        progressBar.style.width = `${percentage}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 2. Sticky Table of Contents with IntersectionObserver
 */
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-nav-item a, .mobile-toc-content a');
  if (!tocLinks.length) return;

  const sectionIds = Array.from(tocLinks)
    .map(link => link.getAttribute('href')?.replace('#', ''))
    .filter(Boolean);

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  let activeId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId = entry.target.id;
      }
    });

    if (activeId) {
      tocLinks.forEach(link => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        if (targetId === activeId) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }
  }, {
    rootMargin: '-80px 0px -65% 0px',
    threshold: 0.05
  });

  sections.forEach(section => observer.observe(section));

  // Smooth scroll support with offset
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 110;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile TOC if open
        const mobileToc = document.getElementById('mobileTocList');
        const mobileToggle = document.getElementById('mobileTocToggle');
        if (mobileToc && mobileToc.classList.contains('open')) {
          mobileToc.classList.remove('open');
          if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.innerHTML = 'Table of Contents <span>▾</span>';
          }
        }

        // Set URL hash without jump
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });
}

/**
 * 3. Mobile Collapsible Table of Contents
 */
function initMobileToc() {
  const toggleBtn = document.getElementById('mobileTocToggle');
  const tocList = document.getElementById('mobileTocList');

  if (!toggleBtn || !tocList) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    tocList.classList.toggle('open');
    toggleBtn.innerHTML = !isExpanded 
      ? 'Table of Contents <span>▴</span>' 
      : 'Table of Contents <span>▾</span>';
  });
}

/**
 * 4. Accessible FAQ Accordion
 */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close other FAQs for clean single-view accordion
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.hidden = true;
          }
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        answer.hidden = isExpanded;
      }
    });
  });
}

/**
 * 5. Interactive Repair vs. Replacement Decision Tree Tool
 */
function initDecisionTree() {
  const form = document.getElementById('decisionToolForm');
  const resultCard = document.getElementById('decisionResultCard');
  const resetBtn = document.getElementById('decisionResetBtn');

  if (!form || !resultCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const damageScope = form.querySelector('input[name="damageScope"]:checked')?.value;
    const roofAge = form.querySelector('input[name="roofAge"]:checked')?.value;
    const leakHistory = form.querySelector('input[name="leakHistory"]:checked')?.value;
    const deckingCondition = form.querySelector('input[name="deckingCondition"]:checked')?.value;

    if (!damageScope || !roofAge || !leakHistory || !deckingCondition) {
      alert('Please answer all 4 questions to evaluate your roofing condition.');
      return;
    }

    let score = 0;

    // Scope
    if (damageScope === 'isolated') score += 1;
    else if (damageScope === 'multiple') score += 3;
    else if (damageScope === 'widespread') score += 5;

    // Age
    if (roofAge === 'young') score += 0;
    else if (roofAge === 'middle') score += 3;
    else if (roofAge === 'old') score += 6;

    // Leaks
    if (leakHistory === 'first') score += 1;
    else if (leakHistory === 'isolated_past') score += 2;
    else if (leakHistory === 'chronic') score += 5;

    // Decking / Layers
    if (deckingCondition === 'sound') score += 0;
    else if (deckingCondition === 'two_layers') score += 4;
    else if (deckingCondition === 'sagging_rot') score += 6;

    let verdictTitle = '';
    let verdictBadge = '';
    let verdictClass = '';
    let verdictSummary = '';
    let recommendationBullets = [];

    if (score <= 5) {
      verdictTitle = 'Targeted Roof Repair Likely Feasible';
      verdictBadge = 'Recommendation: Localized Repair';
      verdictClass = 'repair-focused';
      verdictSummary = 'Based on your inputs, the underlying roofing system appears relatively sound. Isolated shingle blow-offs, plumbing pipe boots, or minor flashing sealant gaps can typically be remediated with precision repairs without the expense of full tear-off.';
      recommendationBullets = [
        'Have a licensed roofer inspect the affected slope and confirm the surrounding shingles have adequate pliability.',
        'Replace localized damaged shingles, re-seal flashing, or install a new pipe boot collar.',
        'Keep repair documentation to maintain existing roof warranties.',
        'Estimated typical homeowner savings: 75%–90% compared to complete replacement.'
      ];
    } else if (score <= 11) {
      verdictTitle = 'Comprehensive On-Site Inspection Recommended';
      verdictBadge = 'Recommendation: Borderline Case';
      verdictClass = 'borderline-focused';
      verdictSummary = 'Your roof falls into the critical transition zone. While an immediate full replacement may not be strictly mandatory today, aging shingles or multiple prior repair attempts mean patching may only deliver short-term protection before another failure occurs.';
      recommendationBullets = [
        'Perform a tactile shingle brittleness test—if adjacent shingles crack when lifted for repair, replacement is usually necessary.',
        'Request an attic inspection to verify decking moisture, insulation health, and proper ridge/soffit ventilation.',
        'Compare a firm repair estimate against the pro-rated remaining lifespan of the current roof.',
        'If planning to stay in the home longer than 3–5 years, investing in a complete replacement system often prevents recurring water damage.'
      ];
    } else {
      verdictTitle = 'Full Roof Replacement Highly Recommended';
      verdictBadge = 'Recommendation: Full System Replacement';
      verdictClass = 'replacement-focused';
      verdictSummary = 'Given the cumulative age, widespread shingle deterioration, multiple leak points, or existing layer/decking constraints, localized repairs represent sunk costs that fail to resolve systemic roof failure.';
      recommendationBullets = [
        'Under NJ Uniform Construction Code (UCC), roofs with 2 existing layers must be completely torn off down to bare decking before re-roofing.',
        'Inspect and replace rotted, delaminated, or sagging plywood roof decking to ensure a solid structural foundation.',
        'Install modern high-performance ice and water barrier along eaves, valleys, and vulnerable chimney/sidewall abutments.',
        'A full replacement restores your 25–50 year manufacturer warranty and protects your Somerset County home equity.'
      ];
    }

    const badgeEl = resultCard.querySelector('.result-badge');
    const titleEl = resultCard.querySelector('.result-title');
    const summaryEl = resultCard.querySelector('.result-summary');
    const listEl = resultCard.querySelector('.result-bullets');

    if (badgeEl) badgeEl.textContent = verdictBadge;
    if (titleEl) titleEl.textContent = verdictTitle;
    if (summaryEl) summaryEl.textContent = verdictSummary;

    if (listEl) {
      listEl.innerHTML = '';
      recommendationBullets.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listEl.appendChild(li);
      });
    }

    resultCard.classList.remove('repair-focused', 'borderline-focused', 'replacement-focused');
    resultCard.classList.add(verdictClass);
    resultCard.hidden = false;

    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      resultCard.hidden = true;
    });
  }
}

/**
 * 6. Copy Link to Clipboard
 */
function initCopyLinkButton() {
  const copyBtn = document.getElementById('copyArticleLinkBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Link Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.classList.remove('copied');
      }, 2500);
    }).catch(err => {
      console.warn('Could not copy link: ', err);
    });
  });
}
