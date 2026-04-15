/**
 * VanVek Analytics — Yandex.Metrika preparation
 * Sprint 6F — A7
 *
 * SETUP INSTRUCTIONS:
 * 1. Replace COUNTER_ID below with your real Yandex.Metrika counter ID
 * 2. Uncomment the Yandex.Metrika init snippet at the bottom of this file
 * 3. Verify goals are configured in Yandex.Metrika dashboard with matching goal IDs
 */

// ============================================================
// REPLACE WITH REAL COUNTER ID when Metrika counter is ready
// ============================================================
var COUNTER_ID = 00000000; // REPLACE WITH REAL COUNTER ID

/**
 * Safe wrapper around ym() — does nothing if Metrika is not loaded yet.
 * @param {string} goal  — Metrika goal identifier
 * @param {object} [params] — optional goal parameters
 */
function _ymGoal(goal, params) {
  try {
    if (typeof ym === 'function') {
      ym(COUNTER_ID, 'reachGoal', goal, params || {});
    }
  } catch (e) {
    // Silently ignore — analytics must never break the page
  }
}

// ============================================================
// Goal tracking functions
// ============================================================

/**
 * A7-1: User adds a service to the cart.
 * @param {string} serviceName — human-readable service name
 */
function trackAddToCart(serviceName) {
  _ymGoal('add_to_cart', { service: serviceName });
}

/**
 * A7-2: Quick Checkout bottom sheet opens.
 */
function trackOpenQuickCheckout() {
  _ymGoal('open_quick_checkout');
}

/**
 * A7-3: Quick Checkout form submitted successfully.
 */
function trackQuickCheckoutSubmit() {
  _ymGoal('quick_checkout_submit');
}

/**
 * A7-4: Full cart order form submitted successfully.
 */
function trackCartSubmit() {
  _ymGoal('cart_submit');
}

/**
 * A7-5: User clicked on a phone number link.
 */
function trackCallClick() {
  _ymGoal('call_click');
}

/**
 * A7-6: User clicked a messenger button (Max, Telegram, VK, etc.).
 * @param {string} messenger — messenger name, e.g. 'max', 'telegram', 'vk'
 */
function trackMessengerClick(messenger) {
  _ymGoal('messenger_click', { messenger: messenger });
}

/**
 * A7-7: "Describe your task" modal opened.
 */
function trackTaskModalOpen() {
  _ymGoal('task_modal_open');
}

/**
 * A7-8: Task modal form submitted successfully.
 */
function trackTaskSubmit() {
  _ymGoal('task_submit');
}

// ============================================================
// Export on window.VanVekAnalytics
// ============================================================
window.VanVekAnalytics = {
  trackAddToCart: trackAddToCart,
  trackOpenQuickCheckout: trackOpenQuickCheckout,
  trackQuickCheckoutSubmit: trackQuickCheckoutSubmit,
  trackCartSubmit: trackCartSubmit,
  trackCallClick: trackCallClick,
  trackMessengerClick: trackMessengerClick,
  trackTaskModalOpen: trackTaskModalOpen,
  trackTaskSubmit: trackTaskSubmit
};

// ============================================================
// Yandex.Metrika init snippet
// UNCOMMENT the block below when your counter is ready.
// Replace 00000000 with your real counter ID in both places.
// ============================================================
/*
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(00000000, "init", {   // REPLACE WITH REAL COUNTER ID
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  ecommerce: "dataLayer"
});
*/
// Yandex.Metrika noscript pixel (also uncomment when ready):
// <noscript><div><img src="https://mc.yandex.ru/watch/00000000" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
