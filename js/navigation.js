/**
 * BRIDGEWATER ROOFER — NAVIGATION & SCROLL UX
 * Pure Vanilla JavaScript Module
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const desktopPhonePill = document.querySelector('.desktop-phone-pill');
  const mobileStickyBar = document.querySelector('.mobile-sticky-bar');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileAccordions = document.querySelectorAll('.mobile-accordion-toggle');
  const heroSection = document.querySelector('.hero-section');
  const finalCtaSection = document.querySelector('.final-cta-section');

  // Dynamic header height calculation to ensure breadcrumb and hero offsets are pixel-perfect
  let unScrolledHeaderHeight = 0;
  const topTrustBar = document.querySelector('.top-trust-bar');

  function updateHeaderHeight() {
    if (header) {
      if (!header.classList.contains('is-scrolled')) {
        unScrolledHeaderHeight = header.offsetHeight;
        if (unScrolledHeaderHeight > 0) {
          document.documentElement.style.setProperty('--header-height', `${unScrolledHeaderHeight}px`);
        }
      }
      if (topTrustBar) {
        const topBarHeight = topTrustBar.offsetHeight;
        if (topBarHeight > 0) {
          document.documentElement.style.setProperty('--top-bar-height', `${topBarHeight}px`);
        }
      }
    }
  }

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateHeaderHeight);
  }

  // 1. Scroll Handlers: Header shrink, progress bar, sticky bars
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Header Blur & Slide sub-header out after 20px
    if (header) {
      if (scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // Mobile Sticky Call Bar after 200px
    if (mobileStickyBar) {
      if (scrollY > 200) {
        mobileStickyBar.classList.add('is-visible');
      } else {
        mobileStickyBar.classList.remove('is-visible');
      }
    }

    // Desktop Floating Phone Pill (past hero, hide when reaching final CTA/footer)
    if (desktopPhonePill && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const isPastHero = scrollY > (heroBottom - 150);
      
      let isNearFooter = false;
      if (finalCtaSection) {
        const finalCtaTop = finalCtaSection.offsetTop;
        isNearFooter = (scrollY + window.innerHeight) > finalCtaTop;
      }

      if (isPastHero && !isNearFooter && window.innerWidth > 992) {
        desktopPhonePill.classList.add('is-active');
      } else {
        desktopPhonePill.classList.remove('is-active');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state

  // 2. Mobile Drawer Open/Close
  function toggleMobileDrawer(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    if (mobileDrawer) {
      mobileDrawer.classList.toggle('is-open', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    }
    if (mobileBackdrop) {
      mobileBackdrop.classList.toggle('is-visible', isOpen);
    }
    if (mobileToggle) {
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileDrawer());
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileDrawer(false));
  }

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileDrawer(false);
    }
  });

  // Close mobile drawer when clicking internal anchor links
  if (mobileDrawer) {
    const mobileLinks = mobileDrawer.querySelectorAll('a[href^="#"], a[href^="/#"]');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileDrawer(false));
    });
  }

  // Smooth scroll for /# links when already on the homepage
  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '';
  if (isHomePage) {
    document.querySelectorAll('a[href^="/#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href').replace('/#', '#');
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          history.pushState(null, '', hash);
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 3. Mobile Navigation Accordions
  mobileAccordions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const body = btn.nextElementSibling;

      // Close other accordions in mobile drawer
      mobileAccordions.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded && body) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else if (body) {
        body.style.maxHeight = null;
      }
    });
  });
}
