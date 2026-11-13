# Soma — Free Invoice Generator (that makes money)

A fast, no-signup invoice generator for freelancers and small businesses.
The free tool brings in visitors from search ("free invoice generator" is a
high-volume, evergreen keyword), and the site makes money five ways:

| Revenue stream | How it works | Price |
|---|---|---|
| **Pro subscription** | Removes "Made with Soma" footer, adds logo, brand colors, saved clients, auto-numbering, no ads | $9/mo or $90/yr |
| **Business subscription** | Pro + team seats + priority support | $29/mo or $290/yr |
| **Business Kit** (one-time digital product) | Contracts, proposals, reminder scripts, tax tracker | $19 |
| **Sponsor slot** | One ad slot shown to free users in the generator. Sell it to banks, accounting software, or payment apps | You set the rate |
| **Newsletter** | Collects emails for repeat traffic and launches. Sponsorships can be sold here later | — |

**Built-in growth loop:** every free invoice carries a small "Created free with Soma"
footer, so each invoice a free user sends advertises Soma to their client.

## Files

```
index.html    landing page + invoice generator + pricing + FAQ
styles.css    styles (light/dark, mobile, print → PDF)
app.js        generator logic, Pro gating, upsells, checkout
config.js     ← EDIT THIS: your Stripe links, sponsor, email
success.html  page Stripe redirects to after payment (unlocks Pro)
legal.html    terms, privacy, refund policy (required by Stripe)
```

No build step and no server. It's plain HTML/CSS/JS.

## Launch checklist

Payments use [Lemon Squeezy](https://lemonsqueezy.com) because Stripe does not
support sellers in Bhutan. Lemon Squeezy pays out to Bhutanese bank accounts.

1. **Publish the site:** repo Settings → Pages → deploy from this branch, `/ (root)`.
   The repo must be public for free GitHub Pages. Your site will be at
   `https://vinsmokeee.github.io/SOMA-WEB/`.
2. **Lemon Squeezy:** sign up, create a store, and complete identity verification
   and payout setup (bank account in Bhutan).
3. Create products: Pro (subscription, $9/month and $90/year variants), Business
   ($29/month and $290/year), and the Business Kit ($19, single payment, attach
   the files).
4. For each product, set the confirmation button link to
   `https://vinsmokeee.github.io/SOMA-WEB/success.html?plan=pro` (`business` / `pack`).
5. Copy each product's checkout link into **`config.js`**, plus
   `https://YOUR-STORE.lemonsqueezy.com/billing` as `customerPortal`.
6. Test a purchase in Lemon Squeezy's test mode, then activate the store.
7. Optional: [Formspree](https://formspree.io) endpoint for newsletter signups,
   [Plausible](https://plausible.io) analytics, and review `legal.html`.

## Getting traffic

- Submit the site to Google Search Console. The page is already set up with a
  title, meta description and structured data for "free invoice generator".
- Post it on Product Hunt, Indie Hackers, and in r/freelance and r/smallbusiness.
- Add pages for long-tail searches, such as "invoice template for photographers"
  or "UK VAT invoice generator", linking back to the tool.

## Limitations

Pro is unlocked in the browser after the Stripe redirect, using localStorage. That
is fine for a launch, but a determined user could bypass it, and Pro does not
carry over between devices. Once revenue justifies it, add a small backend (for
example Supabase, or a Cloudflare Worker with a Stripe webhook) that verifies
the subscription by email login.
