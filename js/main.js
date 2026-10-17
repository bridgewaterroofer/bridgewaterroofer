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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

