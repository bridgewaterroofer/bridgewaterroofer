/**
 * BRIDGEWATER ROOFER — CALL & LEAD CONVERSION TRACKER
 * Native GA4 gtag() + Google Tag Manager dataLayer Integration
 */

/**
 * Helper to dispatch events to both GA4 gtag and dataLayer
 * @param {string} eventName 
 * @param {object} params 
 */
function sendGA4Event(eventName, params = {}) {
  try {
    // 1. Direct GA4 gtag() dispatch
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // 2. dataLayer push (GTM compatibility)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params
      });
    }

    // Diagnostic console log for developer testing
    console.info(`[GA4 Tracker] ${eventName}`, params);
  } catch (err) {
    console.warn('[GA4 Tracker] Error dispatching event:', err);
  }
}

export function initEventTracking() {
  // 1. Global Click-to-Call Tracking via Event Delegation
  document.addEventListener('click', (event) => {
    const callLink = event.target.closest('a[href^="tel:"]');
    if (!callLink) return;

    const source = callLink.getAttribute('data-call-source') ||
                   callLink.getAttribute('id') ||
                   callLink.className.split(' ').filter(c => c && c !== 'cta-phone' && c !== 'btn').join('-') ||
                   'header-or-body-phone';
    const destination = callLink.getAttribute('href') || 'tel:+19084659944';

    // A. Detailed Custom Event for Reporting
    sendGA4Event('phone_call_click', {
      call_source: source,
      phone_number: destination,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    });

    // B. Standard GA4 Native Conversion Metric (generate_lead)
    sendGA4Event('generate_lead', {
      event_category: 'Lead',
      method: 'phone_call',
      lead_source: source,
      value: 1,
      currency: 'USD'
    });
  });

  // 2. Global Form Submission Tracking
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || form.tagName !== 'FORM') return;

    const formSource = form.getAttribute('data-form-source') ||
                       form.getAttribute('id') ||
                       'estimate-form';

    // A. Form Submit Event
    sendGA4Event('estimate_form_submit', {
      form_source: formSource,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    });

    // B. Standard GA4 Native Conversion Metric (generate_lead)
    sendGA4Event('generate_lead', {
      event_category: 'Lead',
      method: 'estimate_form',
      lead_source: formSource,
      value: 1,
      currency: 'USD'
    });
  });

  // 3. Thank-You Page Conversion (fires on arrival after successful form submit)
  if (window.location.pathname.includes('/thank-you/')) {
    sendGA4Event('generate_lead', {
      event_category: 'Lead',
      method: 'thank_you_pageview',
      lead_source: 'confirmation_page',
      value: 1,
      currency: 'USD'
    });
  }
}
