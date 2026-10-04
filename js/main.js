/**
 * BRIDGEWATER ROOFER — MAIN JAVASCRIPT ENTRYPOINT
 * Pure Vanilla JavaScript
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initInteractiveFeatures } from './interactive.js';
import { initEventTracking } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initInteractiveFeatures();
  initEventTracking();

  console.info('Bridgewater Roofer — Premium Platform Initialized.');
});
