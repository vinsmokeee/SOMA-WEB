(() => {
  const C = window.SOMA_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("soma:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("soma:" + k, JSON.stringify(v)); } catch {} }
  };

  // ---------- Plan state ----------
  // NOTE: a static site can't securely verify payment. Pro is unlocked via the
  // checkout success redirect (success.html). See README "Going further" for a
  // backend-verified setup once revenue justifies it.
  const isPro = () => ["pro", "business"].includes(store.get("plan", "free"));
  function applyPlan() {
    const pro = isPro();
    document.body.classList.toggle("is-pro", pro);
    const badge = $("#planBadge");
    badge.textContent = pro ? (store.get("plan") === "business" ? "Business plan" : "Pro plan") : "Free plan";
    badge.classList.toggle("pro", pro);
    $("#navCta").textContent = pro ? "Manage plan" : "Go Pro";
    $("#navCta").href = pro ? (C.customerPortal || "#pricing") : "#pricing";
  }

  // ---------- Toast / modal ----------
  const toast = (msg) => {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2800);
  };
  function upsell(reason) {
    $("#upgradeReason").textContent = reason;
    const m = $("#upgradeModal");
    m.showModal ? m.showModal() : (location.hash = "#pricing");
    track("upsell_shown", { reason });
  }
  function track(event, data) {
    // Hook for analytics (Plausible / GA). Safe no-op if none installed.
    if (window.plausible) window.plausible(event, { props: data });
    if (window.gtag) window.gtag("event", event, data);
  }

  // ---------- Checkout ----------
  let cycle = "monthly";
  function checkout(plan) {
    const links = C.paymentLinks || {};
    const key = cycle === "yearly" && links[plan + "Yearly"] ? plan + "Yearly" : plan;
    const url = links[key];
    track("checkout_click", { plan: key });
    if (!url || url.includes("REPLACE")) {
      toast("Checkout isn't connected yet. Add your checkout links in config.js.");
      return;
    }
    location.href = url;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".buy");
    if (b) { e.preventDefault(); checkout(b.dataset.plan); }
  });
  $$(".billing-toggle button").forEach((btn) => btn.addEventListener("click", () => {
    cycle = btn.dataset.cycle;
    $$(".billing-toggle button").forEach((x) => x.classList.toggle("on", x === btn));
    $$("[data-m]").forEach((el) => { el.textContent = el.dataset[cycle === "yearly" ? "y" : "m"]; });
  }));

  // ---------- Invoice generator ----------
  const CURRENCIES = ["USD","EUR","GBP","CAD","AUD","NZD","JPY","CNY","INR","SGD","HKD","CHF","SEK","NOK","DKK","PLN","CZK","HUF","RON","BGN","TRY","ZAR","NGN","KES","GHS","EGP","MAD","AED","SAR","QAR","ILS","BRL","MXN","ARS","CLP","COP","PEN","KRW","IDR","MYR","PHP","THB","VND","PKR","BDT"];
  const form = $("#invForm");
  const sel = $("#currency");
  CURRENCIES.forEach((c) => sel.add(new Option(c, c)));
  try {
    const guess = new Intl.NumberFormat(navigator.language, { style: "currency", currency: "USD" }).resolvedOptions().locale;
    const region = (guess.split("-")[1] || "").toUpperCase();
    const map = { GB: "GBP", CA: "CAD", AU: "AUD", IN: "INR", JP: "JPY", NZ: "NZD", ZA: "ZAR", NG: "NGN", KE: "KES", BR: "BRL", MX: "MXN", CH: "CHF", SG: "SGD", AE: "AED", PH: "PHP", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", IE: "EUR" };
    if (map[region]) sel.value = map[region];
  } catch {}

  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const itemsEl = $("#items");
  let color = "#14171a";
  let logoData = null;

  function addItem(it = { d: "", q: 1, r: 0 }) {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      <input placeholder="Description" class="d" aria-label="Description">
      <input type="number" min="0" step="any" class="q" aria-label="Quantity">
      <input type="number" min="0" step="any" class="r" aria-label="Rate">
      <button type="button" class="rm" aria-label="Remove item">×</button>`;
    $(".d", row).value = it.d; $(".q", row).value = it.q; $(".r", row).value = it.r;
    $(".rm", row).onclick = () => { row.remove(); if (!itemsEl.children.length) addItem(); render(); };
    itemsEl.append(row);
  }

  function readState() {
    const f = Object.fromEntries(new FormData(form));
    delete f.logo;
    f.items = $$(".item", itemsEl).map((r) => ({ d: $(".d", r).value, q: +$(".q", r).value || 0, r: +$(".r", r).value || 0 }));
    return f;
  }
  function writeState(s) {
    for (const [k, v] of Object.entries(s)) {
      if (k === "items") continue;
      const el = form.elements[k]; if (el && el.type !== "file") el.value = v;
    }
    itemsEl.innerHTML = "";
    (s.items && s.items.length ? s.items : [{ d: "", q: 1, r: 0 }]).forEach(addItem);
  }

  const fmtDate = (v) => v ? new Date(v + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function render() {
    const s = readState();
    const money = (n) => { try { return new Intl.NumberFormat(undefined, { style: "currency", currency: s.currency }).format(n); } catch { return s.currency + " " + n.toFixed(2); } };
    $("#pvFrom").textContent = s.fromName || "Your business";
    $("#pvFromDetails").textContent = s.fromDetails;
    $("#pvTo").textContent = s.toName || "Client";
    $("#pvToDetails").textContent = s.toDetails;
    $("#pvNumber").textContent = s.number || "—";
    $("#pvDate").textContent = fmtDate(s.date);
    $("#pvDue").textContent = fmtDate(s.due);
    $("#pvNotes").textContent = s.notes;

    let sub = 0;
    $("#pvItems").innerHTML = s.items.map((i) => {
      const amt = i.q * i.r; sub += amt;
      return `<tr><td>${esc(i.d) || '<span class="muted">Item description</span>'}</td><td>${i.q}</td><td>${money(i.r)}</td><td>${money(amt)}</td></tr>`;
    }).join("");
    const disc = sub * (+s.discount || 0) / 100;
    const tax = (sub - disc) * (+s.tax || 0) / 100;
    $("#pvSub").textContent = money(sub);
    $("#pvDisc").textContent = "−" + money(disc);
    $("#pvTax").textContent = money(tax) + (s.tax > 0 ? ` (${s.tax}%)` : "");
    $("#pvDiscRow").hidden = !(+s.discount);
    $("#pvTaxRow").hidden = !(+s.tax);
    $("#pvTotal").textContent = money(sub - disc + tax);

    const pro = isPro();
    $("#invoice").style.setProperty("--inv", pro ? color : "#14171a");
    const logo = $("#pvLogo");
    logo.hidden = !(pro && logoData);
    if (pro && logoData) logo.src = logoData;

    store.set("draft", s);
  }

  form.addEventListener("input", render);

  $("#addItem").onclick = () => { addItem(); render(); $$(".item .d", itemsEl).pop().focus(); };

  $("#logoInput").addEventListener("change", (e) => {
    if (!isPro()) { e.target.value = ""; return upsell("Add your logo to every invoice with Pro."); }
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { logoData = r.result; store.set("logo", logoData); render(); };
    r.readAsDataURL(file);
  });
  $("#logoInput").addEventListener("click", (e) => {
    if (!isPro()) { e.preventDefault(); upsell("Add your logo to every invoice with Pro."); }
  });

  $$("#swatches button").forEach((b) => b.addEventListener("click", () => {
    if (!isPro()) return upsell("Match invoices to your brand colors with Pro.");
    color = b.dataset.c; store.set("color", color);
    $$("#swatches button").forEach((x) => x.classList.toggle("on", x === b));
    render();
  }));

  // Saved clients (Pro)
  function refreshClients() {
    const list = store.get("clients", {});
    $("#savedClients").innerHTML = Object.keys(list).map((n) => `<option value="${esc(n)}">`).join("");
  }
  form.elements.toName.addEventListener("change", (e) => {
    const c = store.get("clients", {})[e.target.value];
    if (c && isPro()) { form.elements.toDetails.value = c; render(); }
  });
  $("#saveClientBtn").onclick = () => {
    if (!isPro()) return upsell("Save clients and fill invoices in one click with Pro.");
    const name = form.elements.toName.value.trim();
    if (!name) return toast("Enter a client name first.");
    const list = store.get("clients", {}); list[name] = form.elements.toDetails.value;
    store.set("clients", list); refreshClients(); toast(`Saved “${name}”.`);
  };

  // Download
  let downloads = store.get("downloads", 0);
  $("#downloadBtn").onclick = () => {
    render();
    track("invoice_download", { pro: isPro() });
    window.print();
    downloads++; store.set("downloads", downloads);
    // Pro: auto-increment invoice number
    if (isPro()) {
      const n = form.elements.number;
      n.value = n.value.replace(/(\d+)(?!.*\d)/, (m) => String(+m + 1).padStart(m.length, "0"));
      render();
    } else if (downloads === 3 || downloads % 10 === 0) {
      // Gentle upsell after the user has gotten real value.
      setTimeout(() => upsell("You're invoicing regularly — remove the Soma footer and add your logo with Pro."), 800);
    }
  };

  $("#resetBtn").onclick = () => {
    if (!confirm("Clear this invoice?")) return;
    writeState({ number: form.elements.number.value, date: iso(today), due: iso(new Date(Date.now() + 14 * 864e5)), currency: sel.value, tax: 0, discount: 0, items: [] });
    ["fromName", "fromDetails", "toName", "toDetails", "notes"].forEach((k) => (form.elements[k].value = ""));
    render();
  };

  // Init
  const draft = store.get("draft", null);
  if (draft) writeState(draft);
  else {
    writeState({ date: iso(today), due: iso(new Date(Date.now() + 14 * 864e5)), currency: sel.value, items: [{ d: "Website design", q: 1, r: 1200 }, { d: "Hosting setup", q: 2, r: 75 }] });
  }
  color = store.get("color", color);
  logoData = store.get("logo", null);
  $$("#swatches button").forEach((x) => x.classList.toggle("on", x.dataset.c === color));
  applyPlan(); refreshClients(); render();

  // ---------- Sponsor ----------
  const sp = C.sponsor;
  const spEl = $("#sponsor");
  if (sp && sp.enabled) { spEl.href = sp.url; spEl.innerHTML = `<b>${esc(sp.label)}</b> — ${esc(sp.text)}`; }
  else spEl.remove();

  // ---------- Newsletter ----------
  $("#newsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const msg = $("#newsMsg");
    try {
      if (C.newsletterEndpoint) {
        const r = await fetch(C.newsletterEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "soma-newsletter" }) });
        if (!r.ok) throw new Error();
      } else {
        const list = store.get("subscribers", []); list.push(email); store.set("subscribers", list);
      }
      msg.textContent = "You're in! Check your inbox for the template.";
      e.target.reset();
      track("newsletter_signup");
    } catch { msg.textContent = "Something went wrong — please try again."; }
  });

  // ---------- Footer ----------
  $("#year").textContent = new Date().getFullYear();
  $("#portalLink").href = C.customerPortal || "#";
  $("#supportLink").href = "mailto:" + (C.supportEmail || "");
})();
