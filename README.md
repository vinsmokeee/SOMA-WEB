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

## Launch checklist (about 30 minutes)

1. **Stripe:** create a free account. Create products for Pro (monthly and yearly
   prices), Business (monthly and yearly) and the Business Kit. Create a
   **Payment Link** for each one.
   - In each link, under "After payment", set it to redirect to
     `https://YOUR-DOMAIN/success.html?plan=pro` (`business` / `pack`).
   - For the Business Kit, attach the file in the product's confirmation email,
     or use Gumroad / Lemon Squeezy, which deliver files automatically.
2. Paste the links into **`config.js`**. Turn on the Stripe **Customer Portal**
   and paste its link too.
3. **Deploy for free** using either option:
   - GitHub Pages: in repo Settings → Pages, deploy from your branch, root folder.
   - Netlify or Cloudflare Pages: drag and drop the folder.
4. Optional: [Formspree](https://formspree.io) endpoint for newsletter signups → `config.js`.
5. Optional: [Plausible](https://plausible.io) analytics. Add its script tag to
   `index.html`. The `checkout_click`, `upsell_shown`, `invoice_download` and
   `purchase` events are already wired.
6. Review `legal.html` for your country and set your support email.

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
