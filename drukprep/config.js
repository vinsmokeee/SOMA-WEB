/*
 * ===== DRUKPREP SETTINGS =====  (the only file you need to edit)
 *
 * How payment works (no foreign payment company needed):
 *  1. Student scans your mBoB / BNB mPay QR and pays the price below.
 *  2. Student taps "Send payment proof" — WhatsApp opens with their name,
 *     phone and journal number already typed, addressed to you.
 *  3. You check the money arrived in your bank app, then reply with the
 *     unlock code (kept in private/UNLOCK-CODE.txt — never post it publicly).
 */
window.DP_CONFIG = {
  brand: "DrukPrep",

  price: 499,                 // Nu. for the Exam Pass (whole exam season)
  originalPrice: 999,         // shown crossed out; set to 0 to hide

  // Your WhatsApp number with country code, digits only (Bhutan = 975).
  whatsapp: "97517000000",    // ← REPLACE with your number

  // Name exactly as it appears on your bank account (shown under the QR).
  accountName: "YOUR NAME",   // ← REPLACE
  bank: "Bank of Bhutan (mBoB)",

  // Save your mBoB/BNB merchant or personal QR as assets/qr.png.
  qrImage: "assets/qr.png",

  // Sponsor slot: sell to coaching institutes / colleges.
  sponsor: {
    enabled: true,
    label: "Coaching institutes",
    text: "Reach thousands of BCSE candidates every season. Advertise on DrukPrep →",
    url: ""                   // filled automatically with your WhatsApp if empty
  },

  examName: "BCSE Preliminary Examination"
};
