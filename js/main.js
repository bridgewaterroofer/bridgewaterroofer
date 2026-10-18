/**
 * BRIDGEWATER ROOFER — MAIN JAVASCRIPT ENTRYPOINT
 * Pure Vanilla JavaScript
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initInteractiveFeatures } from './interactive.js';
import { initEventTracking } from './tracker.js';

function init() {
  initNavigation();
  initAnimations();
  initInteractiveFeatures();
  initEventTracking();

  console.info('Bridgewater Roofer — Premium Platform Initialized.');

  // Automatic IndexNow trigger for Hostinger / production deployments
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(triggerAutoIndexNow, { timeout: 4000 });
  } else {
    setTimeout(triggerAutoIndexNow, 3500);
  }
}

function triggerAutoIndexNow() {
  try {
    if (sessionStorage.getItem('in_triggered')) return;
    sessionStorage.setItem('in_triggered', '1');
    fetch('/auto-indexnow.php', { method: 'POST', priority: 'low' }).catch(() => {});
  } catch (_) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

