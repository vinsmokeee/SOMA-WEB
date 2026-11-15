(() => {
  const C = window.DP_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("dp:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("dp:" + k, JSON.stringify(v)); } catch {} }
  };
  const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 3000); };
  const wa = (text) => `https://wa.me/${(C.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
  const PASS_MARK = 55;

  // ---------- Config into page ----------
  document.querySelectorAll("#price, .js-price").forEach((el) => (el.textContent = C.price));
  if (C.originalPrice) $("#oldPrice").textContent = "Nu. " + C.originalPrice;
  $("#acct").innerHTML = `<b>${esc(C.accountName || "")}</b><br>${esc(C.bank || "")}`;
  const qr = $("#qrImg");
  qr.onerror = () => { const d = document.createElement("div"); d.className = "missing"; d.textContent = "Add your QR as assets/qr.png"; qr.replaceWith(d); };
  qr.src = C.qrImage || "assets/qr.png";
  $("#contactLink").href = wa("Hello DrukPrep, I have a question.");
  const sp = C.sponsor || {};
  if (sp.enabled === false) $("#sponsorBand").remove();
  else $("#sponsorLink").href = sp.url || wa("Hello, I'd like to advertise on DrukPrep.");
  $("#year").textContent = new Date().getFullYear();

  // ---------- Decryption of paid packs ----------
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  async function decryptPack(id, code) {
    const r = await fetch(`packs/${id}.json`, { cache: "no-cache" });
    if (!r.ok) throw new Error("missing");
    const p = await r.json();
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(code.trim().toUpperCase()), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: unb64(p.salt), iterations: 200000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(p.iv) }, key, unb64(p.data));
    return JSON.parse(new TextDecoder().decode(plain));
  }
  const packs = window.DP_PACKS || [];
  let code = store.get("code", "");

  // ---------- Test list ----------
  function renderList() {
    const best = store.get("best", {});
    const items = [{ ...window.DP_FREE, count: window.DP_FREE.questions.length, free: true }, ...packs];
    $("#testList").innerHTML = items.map((t) => {
      const locked = !t.free && !code;
      const b = best[t.id];
      return `<article class="test">
        <div class="test-top"><span class="tag ${t.free ? "free" : locked ? "lock" : "free"}">${t.free ? "Free" : locked ? "Exam Pass" : "Unlocked"}</span>${t.kind === "full" ? `<span class="tag full">Full exam</span>` : ""}${b != null ? `<p class="best">Best <b>${b}%</b></p>` : ""}</div>
        <h3>${esc(t.title)}</h3>
        <p class="meta">${t.count} questions · ${t.minutes} minutes · ${t.sections || 4} sections</p>
        <button class="btn ${locked ? "btn-ghost" : "btn-primary"}" data-id="${t.id}">${locked ? "Unlock with Exam Pass" : b != null ? "Retake test" : "Start test"}</button>
      </article>`;
    }).join("");
  }
  $("#testList").addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-id]"); if (!b) return;
    const id = b.dataset.id;
    if (id === "free") return start(window.DP_FREE);
    if (!code) { location.hash = "#pass"; return toast("This test is part of the Exam Pass."); }
    b.disabled = true; b.textContent = "Opening…";
    try { start(await decryptPack(id, code)); }
    catch { toast("Your code doesn't open this test. Message us on WhatsApp."); }
    finally { renderList(); }
  });

  // ---------- Runner ----------
  let T, ans, cur, deadline, tick;
  const runner = $("#runner"), body = $("#runBody");
  const keys = ["A", "B", "C", "D", "E"];
  const dzKeys = ["ཀ", "ཁ", "ག", "ང"];
  const keyFor = (q, i) => (q.s === "Dzongkha" ? dzKeys : keys)[i];

  function start(test) {
    T = { ...test, done: false }; ans = new Array(test.questions.length).fill(null); cur = 0;
    deadline = Date.now() + test.minutes * 60000;
    $("#runTitle").textContent = test.title;
    runner.hidden = false; document.body.classList.add("running");
    clearInterval(tick); tick = setInterval(updateTimer, 500); updateTimer();
    renderQ();
  }
  function updateTimer() {
    const left = Math.max(0, deadline - Date.now()), m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
    const el = $("#timer"); el.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    el.classList.toggle("low", left < 120000);
    if (left === 0) { toast("Time's up! Here are your results."); finish(); }
  }
  const dataTable = (d) => `<table class="dtable"><caption>${esc(d.title)}</caption><thead><tr>${d.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${d.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

  // ---------- Shared material: passages, charts, tables ----------
  const PALETTE = ["var(--gold)", "var(--brand-2)"];
  function barChart(g) {
    const W = 420, H = 260, L = 40, B = 34, T = 16, max = g.max || Math.ceil(Math.max(...g.series.flatMap((s) => s.values)) / 20) * 20;
    const n = g.labels.length, gw = (W - L - 8) / n, bw = Math.min(26, (gw - 14) / g.series.length);
    const y = (v) => T + (H - T - B) * (1 - v / max);
    let svg = "";
    for (let i = 0; i <= 4; i++) { const v = max / 4 * i; svg += `<line x1="${L}" x2="${W - 4}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${v}</text>`; }
    g.labels.forEach((lab, i) => {
      const x0 = L + i * gw + (gw - bw * g.series.length) / 2;
      g.series.forEach((s, k) => {
        const v = s.values[i], x = x0 + k * bw;
        svg += `<rect x="${x + 1}" y="${y(v)}" width="${bw - 2}" height="${y(0) - y(v)}" rx="2" fill="${PALETTE[k]}"/><text x="${x + bw / 2}" y="${y(v) - 4}" class="val" text-anchor="middle">${v}</text>`;
      });
      svg += `<text x="${L + i * gw + gw / 2}" y="${H - 12}" class="ax" text-anchor="middle">${esc(lab)}</text>`;
    });
    return chartWrap(g, svg, W, H);
  }
  function lineChart(g) {
    const W = 420, H = 250, L = 40, B = 34, T = 18, vals = g.series[0].values;
    const max = g.max || Math.ceil(Math.max(...vals) * 10 / 5) * 5 / 10 + .2, min = g.min ?? 0;
    const n = g.labels.length, xs = (i) => L + 18 + i * (W - L - 40) / (n - 1), y = (v) => T + (H - T - B) * (1 - (v - min) / (max - min));
    let svg = "";
    for (let i = 0; i <= 4; i++) { const v = +(min + (max - min) / 4 * i).toFixed(2); svg += `<line x1="${L}" x2="${W - 4}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${v}</text>`; }
    if (g.ref != null) svg += `<line x1="${L}" x2="${W - 4}" y1="${y(g.ref)}" y2="${y(g.ref)}" class="ref"/>`;
    svg += `<polyline fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linejoin="round" points="${vals.map((v, i) => `${xs(i)},${y(v)}`).join(" ")}"/>`;
    vals.forEach((v, i) => { svg += `<circle cx="${xs(i)}" cy="${y(v)}" r="4" fill="var(--gold)"/><text x="${xs(i)}" y="${y(v) - 9}" class="val" text-anchor="middle">${Number.isInteger(v) && vals.some((x) => !Number.isInteger(x)) ? v.toFixed(1) : v}</text><text x="${xs(i)}" y="${H - 12}" class="ax" text-anchor="middle">${esc(g.labels[i])}</text>`; });
    return chartWrap(g, svg, W, H);
  }
  const chartWrap = (g, svg, W, H) => `<figure class="chart"><figcaption>${esc(g.title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(g.title)}">${svg}</svg>${g.series.length > 1 ? `<div class="legend">${g.series.map((s, k) => `<span><i style="background:${PALETTE[k]}"></i>${esc(s.name)}</span>`).join("")}</div>` : ""}</figure>`;
  const passage = (g) => `<div class="passage"><p class="passage-title">${esc(g.title)}</p>${g.text.split(/\n\n+/).map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
  function groupHTML(test, q) {
    const g = q.g && test.groups && test.groups[q.g];
    if (g) return g.type === "passage" ? passage(g) : g.type === "bar" ? barChart(g) : g.type === "line" ? lineChart(g) : dataTable(g);
    return q.s === "Data interpretation" && test.data ? dataTable(test.data) : "";
  }

  function renderQ() {
    const q = T.questions[cur], n = T.questions.length;
    $("#runProgress").textContent = `Question ${cur + 1} of ${n}`;
    $("#runBar").style.width = ((ans.filter((a) => a != null).length) / n * 100) + "%";
    body.innerHTML = `
      <p class="q-sec">${esc(q.s)}</p>
      ${groupHTML(T, q)}
      <p class="q-text${q.s === "Dzongkha" ? " dz" : ""}">${esc(q.q)}</p>
      <div class="opts${q.s === "Dzongkha" ? " dz" : ""}">${q.o.map((o, i) => `<button class="opt ${ans[cur] === i ? "sel" : ""}" data-i="${i}"><span class="k">${keyFor(q, i)}</span>${esc(o)}</button>`).join("")}</div>
      <div class="run-nav">
        <button class="btn btn-ghost" id="prevBtn" ${cur === 0 ? "disabled" : ""}>← Back</button>
        ${cur < n - 1 ? `<button class="btn btn-primary" id="nextBtn">Next →</button>` : `<button class="btn btn-primary" id="finishBtn">Submit test</button>`}
      </div>
      <div class="palette" aria-label="Jump to question">${T.questions.map((_, i) => `<button class="${ans[i] != null ? "done" : ""} ${i === cur ? "cur" : ""}" data-j="${i}">${i + 1}</button>`).join("")}</div>`;
    runner.scrollTop = 0;
  }
  body.addEventListener("click", (e) => {
    const o = e.target.closest(".opt[data-i]"); if (o && T && !T.done) { ans[cur] = +o.dataset.i; renderQ(); return; }
    const j = e.target.closest("[data-j]"); if (j) { cur = +j.dataset.j; renderQ(); return; }
    if (e.target.closest("#prevBtn")) { cur--; renderQ(); }
    else if (e.target.closest("#nextBtn")) { cur++; renderQ(); }
    else if (e.target.closest("#finishBtn")) {
      const left = ans.filter((a) => a == null).length;
      if (left && !confirm(`You have ${left} unanswered question${left > 1 ? "s" : ""}. Submit anyway?`)) return;
      finish();
    } else if (e.target.closest("#doneBtn")) close();
    else if (e.target.closest("#upsellBtn")) { close(); location.hash = "#pass"; }
  });

  function finish() {
    clearInterval(tick); T.done = true;
    const qs = T.questions, right = qs.filter((q, i) => ans[i] === q.a).length, pct = Math.round(right / qs.length * 100);
    const best = store.get("best", {}); best[T.id] = Math.max(best[T.id] || 0, pct); store.set("best", best);
    const secs = {};
    qs.forEach((q, i) => { secs[q.s] = secs[q.s] || [0, 0]; secs[q.s][1]++; if (ans[i] === q.a) secs[q.s][0]++; });
    const weakest = Object.entries(secs).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])[0][0];
    $("#runProgress").textContent = "Results"; $("#runBar").style.width = "100%"; $("#timer").textContent = "Done";
    body.innerHTML = `
      <div class="result-hero">
        <div class="big">${pct}%</div>
        <p>${right} of ${qs.length} correct</p>
        <span class="verdict ${pct >= PASS_MARK ? "pass" : "fail"}">${pct >= PASS_MARK ? "Above" : "Below"} the 2025 pass mark of ${PASS_MARK}</span>
      </div>
      <div class="secs">${Object.entries(secs).map(([s, [r, t]]) => `<div class="sec-row"><span>${esc(s)}</span><b>${r}/${t}</b><div class="bar"><span style="width:${r / t * 100}%"></span></div></div>`).join("")}</div>
      <p class="muted">Focus next on <b>${esc(weakest)}</b>, your weakest section in this test.</p>
      ${T.id === "free" && !code ? `<div class="upsell"><h3>Keep practising with the Exam Pass</h3><p>More full mock tests with explanations, for Nu. ${C.price}, paid with mBoB or BNB.</p><button class="btn btn-primary" id="upsellBtn">Get the Exam Pass</button></div>` : ""}
      <div class="review"><h3>Review answers</h3>${qs.map((q, i) => `
        ${q.g && (i === 0 || qs[i - 1].g !== q.g) ? `<div class="rev-group">${groupHTML(T, q)}</div>` : ""}<div class="rev"><p class="q-sec">${i + 1} · ${esc(q.s)}</p><p class="q-text${q.s === "Dzongkha" ? " dz" : ""}">${esc(q.q)}</p>
          <div class="opts${q.s === "Dzongkha" ? " dz" : ""}">${q.o.map((o, k) => `<div class="opt ${k === q.a ? "right" : k === ans[i] ? "wrong" : ""}"><span class="k">${keyFor(q, k)}</span>${esc(o)}</div>`).join("")}</div>
          <p class="exp">${ans[i] == null ? "<b>Not answered.</b> " : ""}${esc(q.e)}</p></div>`).join("")}</div>
      <div class="run-nav"><span></span><button class="btn btn-primary" id="doneBtn">Back to tests</button></div>`;
    runner.scrollTop = 0;
  }
  function close() { clearInterval(tick); runner.hidden = true; document.body.classList.remove("running"); T = null; renderList(); $("#tests").scrollIntoView(); }
  $("#quitBtn").onclick = () => { if (!T || T.done || confirm("Exit this test? Your answers will be lost.")) close(); };

  // ---------- Payment proof via WhatsApp ----------
  $("#proofForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const msg = `Hello DrukPrep, I have paid Nu. ${C.price} for the Exam Pass.\n\nName: ${f.name}\nPhone: ${f.phone}\nJournal no.: ${f.journal}\n\nPlease send my unlock code.`;
    if (!C.whatsapp || /^9751700000+$/.test(C.whatsapp)) return toast("WhatsApp number not set yet (config.js).");
    location.href = wa(msg);
  });

  // ---------- Unlock code ----------
  $("#codeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const c = e.target.code.value.trim().toUpperCase(), msg = $("#codeMsg");
    if (!packs.length) { msg.className = "err"; msg.textContent = "No paid tests are published yet."; return; }
    msg.className = ""; msg.textContent = "Checking…";
    try {
      await decryptPack(packs[0].id, c);
      code = c; store.set("code", c); renderList();
      msg.className = "ok"; msg.textContent = "Unlocked! All Exam Pass tests are open on this device.";
      setTimeout(() => $("#tests").scrollIntoView(), 900);
    } catch { msg.className = "err"; msg.textContent = "That code didn't work. Check it and try again."; }
  });
  if (code) $("#codeMsg").textContent = "Exam Pass active on this device.";

  renderList();
})();
