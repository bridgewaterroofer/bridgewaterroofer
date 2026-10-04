/**
 * BRIDGEWATER ROOFER — CALL & FORM EVENT TRACKER
 * Pure Vanilla JavaScript
 */

export function initEventTracking() {
  // 1. Phone Call Tracking
  const callLinks = document.querySelectorAll('a[href^="tel:"]');

  callLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const source = link.getAttribute('data-call-source') || 'unknown';
      const destination = link.getAttribute('href');

      // Dispatch custom tracking event for Google Analytics / Tag Manager
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'roofing_phone_call',
          call_source: source,
          phone_number: destination
        });
      }

      console.info(`[Analytics] Phone Call Initiated: source=${source}, phone=${destination}`);
    });
  });

  // 2. Form Tracking
  const forms = document.querySelectorAll('form[data-form-source]');

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const formSource = form.getAttribute('data-form-source') || 'homepage';
      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'roofing_estimate_request',
          form_source: formSource
        });
      }

      console.info(`[Analytics] Estimate Form Submitted: source=${formSource}`);
    });
  });
}
