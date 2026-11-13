/*
 * ===== SOMA MONETIZATION CONFIG =====
 * This is the ONLY file you must edit to start taking money.
 *
 * 1. Create a free Stripe account: https://dashboard.stripe.com/register
 * 2. Products → create "Soma Pro" ($9/mo), "Soma Business" ($29/mo),
 *    "Soma Template Pack" ($19 one-time).
 *    Add yearly prices too: Pro $90/yr, Business $290/yr.
 * 3. For each, click "Create payment link". In the link's
 *    "After payment" settings choose "Don't show confirmation page" →
 *    redirect to:  https://YOUR-DOMAIN/success.html?plan=pro   (or business / pack)
 * 4. Paste the payment link URLs below.
 */
window.SOMA_CONFIG = {
  brand: "Soma",

  stripeLinks: {
    pro:            "https://buy.stripe.com/REPLACE_WITH_PRO_MONTHLY_LINK",
    proYearly:      "https://buy.stripe.com/REPLACE_WITH_PRO_YEARLY_LINK",       // $90/yr
    business:       "https://buy.stripe.com/REPLACE_WITH_BUSINESS_MONTHLY_LINK",
    businessYearly: "https://buy.stripe.com/REPLACE_WITH_BUSINESS_YEARLY_LINK",  // $290/yr
    pack:     "https://buy.stripe.com/REPLACE_WITH_TEMPLATE_PACK_LINK"
  },

  // Optional: Stripe customer portal link so subscribers can manage/cancel.
  customerPortal: "https://billing.stripe.com/p/login/REPLACE_ME",

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
