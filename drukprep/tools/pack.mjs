#!/usr/bin/env node
/*
 * DrukPrep pack tool — encrypts paid mock tests so only people with the
 * unlock code can read them. The readable files live in drukprep/private/
 * (git-ignored, never published). Only the encrypted packs/*.json go online.
 *
 *   Encrypt all tests in private/ with a code:
 *     node tools/pack.mjs encrypt DRUK-AB12-CD34
 *   Recover readable files from the published packs (e.g. on a new computer):
 *     node tools/pack.mjs decrypt DRUK-AB12-CD34
 *
 * To change the code for a new exam season, decrypt with the old code, then
 * encrypt with the new one, and give the new code to new buyers.
 */
import { webcrypto as crypto } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [mode, code] = process.argv.slice(2);
if (!["encrypt", "decrypt"].includes(mode) || !code) {
  console.error("Usage: node tools/pack.mjs encrypt|decrypt <CODE>");
  process.exit(1);
}
const norm = (c) => c.trim().toUpperCase();
const b64 = (u8) => Buffer.from(u8).toString("base64");
const unb64 = (s) => new Uint8Array(Buffer.from(s, "base64"));

async function key(salt) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(norm(code)), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

const packsDir = join(root, "packs"), privDir = join(root, "private");
mkdirSync(packsDir, { recursive: true }); mkdirSync(privDir, { recursive: true });

if (mode === "encrypt") {
  const files = readdirSync(privDir).filter((f) => f.endsWith(".json"));
  const index = [];
  for (const f of files) {
    const test = JSON.parse(readFileSync(join(privDir, f), "utf8"));
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await key(salt), new TextEncoder().encode(JSON.stringify(test)));
    writeFileSync(join(packsDir, test.id + ".json"), JSON.stringify({ v: 1, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)) }));
    index.push({ id: test.id, title: test.title, minutes: test.minutes, count: test.questions.length });
    console.log(`encrypted ${f} → packs/${test.id}.json (${test.questions.length} questions)`);
  }
  // Public list of locked tests (titles only, no questions)
  writeFileSync(join(packsDir, "index.js"), "window.DP_PACKS = " + JSON.stringify(index, null, 2) + ";\n");
  console.log("wrote packs/index.js");
} else {
  for (const f of readdirSync(packsDir).filter((f) => f.endsWith(".json"))) {
    const p = JSON.parse(readFileSync(join(packsDir, f), "utf8"));
    try {
      const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(p.iv) }, await key(unb64(p.salt)), unb64(p.data));
      writeFileSync(join(privDir, f), JSON.stringify(JSON.parse(new TextDecoder().decode(plain)), null, 2));
      console.log(`decrypted packs/${f} → private/${f}`);
    } catch { console.error(`wrong code for packs/${f}`); process.exitCode = 1; }
  }
}
