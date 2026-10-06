/**
 * BRIDGEWATER ROOFER — MOTION & 3D ANIMATIONS MODULE
 * Pure Vanilla JavaScript
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initScrollReveals();
  initProcessTimelineScroll();
  init3DCardTilt();
  initHeroParallax();
}

/**
 * 1. Intersection Observer for Smooth Section & Element Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 2. Process Timeline Progress Bar Fill on Scroll
 */
function initProcessTimelineScroll() {
  const timeline = document.querySelector('.process-timeline-wrapper');
  const lineFill = document.querySelector('.process-line-fill');
  const steps = document.querySelectorAll('.process-step-node');
  if (!timeline || !lineFill) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate line fill to 100%
        lineFill.style.width = '100%';
        // Stagger active step bubbles
        steps.forEach((step, idx) => {
          setTimeout(() => {
            step.classList.add('is-active');
          }, idx * 180);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(timeline);
}

/**
 * 3. 3D Card Hover Perspective Tilt (Desktop with Fine Pointer Only)
 */
function init3DCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle rotation max 4 degrees
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.setProperty('--rotateX', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--rotateY', `${rotateY.toFixed(2)}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotateX', '0deg');
      card.style.setProperty('--rotateY', '0deg');
    });
  });
}

/**
 * 4. Hero Pointer Parallax (Subtle 4–10px Depth Tracking on Desktop)
 */
function initHeroParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const hero = document.querySelector('.hero-section, .service-hero');
  const stage = document.querySelector('.hero-architectural-stage, .service-hero-stage');
  const floatCards = document.querySelectorAll('.hero-float-card');
  if (!hero || !stage) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Move stage subtly
    stage.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;

    // Move floating cards at varied depths
    floatCards.forEach((fc, idx) => {
      const factor = (idx + 1) * 6;
      fc.style.transform = `translate(${x * factor}px, ${y * factor}px) translateZ(${20 + idx * 15}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    stage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    floatCards.forEach((fc) => {
      fc.style.transform = '';
    });
  });
}
