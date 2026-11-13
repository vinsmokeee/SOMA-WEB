/*
 * ===== SOMA MONETIZATION CONFIG =====
 * This is the ONLY file you must edit to start taking money.
 * Payments go through Lemon Squeezy (https://lemonsqueezy.com), which pays out
 * to Bhutanese bank accounts. Full steps are in README.md.
 *
 * For each product in Lemon Squeezy: open it → "Share" → copy the checkout link,
 * and paste it below. In the product's "Confirmation modal" settings, set the
 * button link to  https://YOUR-SITE/success.html?plan=pro   (or business / pack).
 */
window.SOMA_CONFIG = {
  brand: "Soma",

  paymentLinks: {
    pro:            "REPLACE_WITH_PRO_MONTHLY_CHECKOUT_LINK",       // $9/month
    proYearly:      "REPLACE_WITH_PRO_YEARLY_CHECKOUT_LINK",        // $90/year
    business:       "REPLACE_WITH_BUSINESS_MONTHLY_CHECKOUT_LINK",  // $29/month
    businessYearly: "REPLACE_WITH_BUSINESS_YEARLY_CHECKOUT_LINK",   // $290/year
    pack:           "REPLACE_WITH_BUSINESS_KIT_CHECKOUT_LINK"       // $19 one-time
  },

  // Where subscribers manage or cancel. Lemon Squeezy gives every store one:
  // https://YOUR-STORE.lemonsqueezy.com/billing
  customerPortal: "",

  // Email list (newsletter = repeat traffic). Free endpoint from https://formspree.io
  // e.g. "https://formspree.io/f/abcdwxyz". Leave empty to just store locally.
  newsletterEndpoint: "",

  // Sponsor slot shown to free users. Sell it to an accounting/banking brand.
  sponsor: {
    enabled: true,
    label: "Your brand here",
    text: "Reach 1,000s of freelancers every month. Advertise on Soma →",
    url: "mailto:ads@example.com?subject=Advertise%20on%20Soma"
  },

  supportEmail: "support@example.com"
};
