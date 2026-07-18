/**
 * AUDIT — Side A / Side B / loader geometry across viewports.
 *
 * Measures, per viewport width, in FINAL and PROOF (mess) modes:
 *  - horizontal ICB overflow (scrollWidth vs innerWidth)
 *  - bounding boxes of every mess note + the object it annotates
 *  - distance / containment relationships (note→target)
 * so drift is a number, not an impression. Run against the dev server:
 *   node scripts/audit-geometry.js [--after]
 *
 * Playwright is loaded from the npx cache (no local dep — repo law).
 */
const path = require("path");
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);

const URL = "http://localhost:3000/?still"; // still mode: no motion, notes all .seen-able
const VIEWPORTS = [
  { w: 390, h: 844, tag: "phone" },
  { w: 768, h: 1024, tag: "tablet" },
  { w: 1280, h: 800, tag: "laptop-s" },
  { w: 1440, h: 900, tag: "mac" },
  { w: 1920, h: 1080, tag: "1080p" },
  { w: 2560, h: 1440, tag: "1440p" },
  { w: 3440, h: 1440, tag: "ultrawide" },
];

/* note → target pairs. sel: the note; target: what it annotates (null =
   free-floating margin note, we only check containment/overlap). */
const PAIRS = [
  // hero
  { note: ".n-eyebrow", target: ".eyebrow", sect: ".hero" },
  { note: ".n-lh", target: ".v3-words", sect: ".hero" },
  { note: ".n-noscale", target: null, sect: ".hero" },
  { note: ".dd-nsarrow", target: "#amp", sect: ".hero" },
  { note: ".drafts", target: null, sect: ".hero" },
  { note: ".versions", target: null, sect: ".hero" },
  { note: ".vghosts", target: null, sect: ".hero" },
  { note: "#anchor-amp", target: "#amp", sect: ".hero" },
  { note: "#anchor-bio", target: "#hero-bio", sect: ".hero" },
  // trail
  { note: ".n-gap", target: null, sect: ".trail" },
  { note: ".n-2025", target: null, sect: ".trail" },
  { note: ".dd-redact", target: null, sect: ".trail" },
  { note: ".n-redact", target: null, sect: ".trail" },
  // imprint — the chart notes (the drift suspects)
  { note: ".n-imp-sleep-q", target: ".imp-cur", sect: ".imprint" },
  { note: ".n-imp-sleep-a", target: ".imp-cur", sect: ".imprint" },
  { note: ".n-imp-row", target: ".imp-chart", sect: ".imprint" },
  { note: ".n-imp-fish-a", target: ".chart-marlin", sect: ".imprint" },
  { note: ".n-imp-fish-b", target: ".chart-marlin", sect: ".imprint" },
  { note: ".dd-imp-fish", target: ".chart-marlin", sect: ".imprint" },
  // index
  { note: ".coffee", target: null, sect: ".index" },
  { note: ".n-coffee", target: ".coffee", sect: ".index" },
  { note: ".argue", target: null, sect: ".index" },
  { note: ".n-redo", target: null, sect: ".index" },
  { note: ".num-ring", target: "#p-03 .row-num", sect: ".index" },
  { note: ".n-fav", target: "#p-03 .row-num", sect: ".index" },
  { note: ".cat", target: null, sect: ".index" },
  { note: ".n-cat", target: ".cat", sect: ".index" },
  { note: ".dd-zzz", target: ".cat", sect: ".index" },
  // desk
  { note: ".n-desk", target: ".desk-rows", sect: ".desk" },
  { note: ".todo", target: null, sect: ".desk" },
  { note: ".dd-cup", target: null, sect: ".desk" },
  { note: ".dd-tally", target: null, sect: ".desk" },
  { note: ".n-tally", target: ".dd-tally", sect: ".desk" },
  { note: ".n-cmath", target: ".dd-tally", sect: ".desk" },
  { note: ".dd-pentest", target: null, sect: ".desk" },
  { note: ".n-pentest", target: ".dd-pentest", sect: ".desk" },
  { note: ".n-opc", target: ".op-candid", sect: ".desk" },
  { note: ".dd-vinyl", target: null, sect: ".desk" },
  { note: ".n-vinyl", target: ".dd-vinyl", sect: ".desk" },
  // yard
  { note: ".n-cairn-a", target: null, sect: ".yard" },
  { note: ".n-cairn-b", target: null, sect: ".yard" },
  { note: ".dd-cairn-arrow", target: "#pile", sect: ".yard" },
  { note: ".n-cairn-c", target: "#pile", sect: ".yard" },
  { note: ".dd-tries", target: null, sect: ".yard" },
  { note: ".n-tries", target: ".dd-tries", sect: ".yard" },
  { note: ".dd-map", target: null, sect: ".yard" },
  { note: ".n-map", target: ".dd-map", sect: ".yard" },
  { note: ".n-map2", target: ".dd-map", sect: ".yard" },
  // outro
  { note: ".big-line", target: null, sect: ".outro" },
  { note: ".big-reply", target: ".big-line", sect: ".outro" },
  { note: ".n-pm", target: ".pressmark", sect: ".outro" },
  { note: ".dd-pm-arrow", target: ".pressmark", sect: ".outro" },
  { note: ".n-okr1", target: "#okslip", sect: ".outro" },
  { note: ".n-okr2", target: "#okslip", sect: ".outro" },
  { note: ".n-okr3", target: "#okslip", sect: ".outro" },
  { note: ".dd-moon", target: null, sect: ".outro" },
  { note: ".dd-plane", target: null, sect: ".outro" },
  { note: ".dd-rip", target: null, sect: ".outro" },
  { note: ".n-rip", target: ".dd-rip", sect: ".outro" },
  { note: ".n-outro", target: null, sect: ".outro" },
  // fixed layer
  { note: ".n-chips", target: ".chips", sect: null },
  { note: ".chip-ring", target: ".chips", sect: null },
  { note: ".n-night", target: ".night-toggle", sect: null },
  { note: ".n-margin", target: null, sect: null },
  { note: ".stamp", target: null, sect: null },
  { note: "#knows-note", target: null, sect: null },
];

(async () => {
  const browser = await chromium.launch();
  const out = { meta: { when: "run", url: URL }, viewports: [] };
  const consoleErrors = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`[${vp.tag}] ${m.text()}`);
    });
    page.on("pageerror", (e) => consoleErrors.push(`[${vp.tag}] PAGEERROR ${e.message}`));
    await page.goto(URL, { waitUntil: "networkidle" });
    // kill the loader cover if present; settle fonts
    await page.evaluate(() => {
      document.documentElement.classList.remove("mr-hold");
      const mr = document.getElementById("makeready");
      if (mr) mr.remove();
      return document.fonts ? document.fonts.ready : null;
    });
    await page.waitForTimeout(600);

    const vpOut = { ...vp, modes: {} };

    for (const mode of ["final", "proof"]) {
      if (mode === "proof") {
        await page.evaluate(() => {
          document.body.classList.add("proof");
          document
            .querySelectorAll(".note, .anchor, .chip-ring, .amark")
            .forEach((el) => el.classList.add("seen"));
          // let JS anchoring run if the engine exposes it
          const w = window;
          if (w.__engineApi && w.__engineApi.positionAnchors) w.__engineApi.positionAnchors();
        });
        await page.waitForTimeout(400);
      }

      const data = await page.evaluate((pairs) => {
        const res = { overflow: null, root: null, pairs: [] };
        res.root = parseFloat(getComputedStyle(document.documentElement).fontSize);
        res.overflow = {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          over: document.documentElement.scrollWidth - window.innerWidth,
        };
        const box = (el) => {
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.left + window.scrollX),
            y: Math.round(r.top + window.scrollY),
            w: Math.round(r.width),
            h: Math.round(r.height),
          };
        };
        const visible = (el) => {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        for (const p of pairs) {
          const note = document.querySelector(p.note);
          const entry = { note: p.note, target: p.target, sect: p.sect };
          if (!note) { entry.state = "missing"; res.pairs.push(entry); continue; }
          if (!visible(note)) { entry.state = "hidden"; res.pairs.push(entry); continue; }
          entry.state = "shown";
          entry.nbox = box(note);
          if (p.target) {
            const t = document.querySelector(p.target);
            if (t && visible(t)) {
              entry.tbox = box(t);
              // centre distance + gap between boxes (0 if overlapping)
              const nc = { x: entry.nbox.x + entry.nbox.w / 2, y: entry.nbox.y + entry.nbox.h / 2 };
              const tc = { x: entry.tbox.x + entry.tbox.w / 2, y: entry.tbox.y + entry.tbox.h / 2 };
              entry.cdist = Math.round(Math.hypot(nc.x - tc.x, nc.y - tc.y));
              const gx = Math.max(0, Math.max(entry.tbox.x - (entry.nbox.x + entry.nbox.w), entry.nbox.x - (entry.tbox.x + entry.tbox.w)));
              const gy = Math.max(0, Math.max(entry.tbox.y - (entry.nbox.y + entry.nbox.h), entry.nbox.y - (entry.tbox.y + entry.tbox.h)));
              entry.gap = Math.round(Math.hypot(gx, gy));
            } else entry.tstate = "target-missing-or-hidden";
          }
          if (p.sect) {
            const s = document.querySelector(p.sect);
            if (s) {
              const sb = box(s);
              entry.inSect =
                entry.nbox.x >= sb.x - 8 &&
                entry.nbox.x + entry.nbox.w <= sb.x + sb.w + 8;
            }
          }
          // off-viewport horizontally?
          entry.offRight = entry.nbox.x + entry.nbox.w > window.innerWidth;
          entry.offLeft = entry.nbox.x < 0;
          res.pairs.push(entry);
        }
        // key final-layer boxes for scale reference
        const refs = {};
        for (const sel of [
          ".imp-chart", ".imp-shadow", ".imp-shadow-chart", ".imp-cur", ".imp-line", ".imp-desk", ".pocket",
          ".pressmark", ".op", "#okslip", ".outro-title", ".hero-title",
          "#amp", ".desk-rows", ".chips", ".night-toggle", "#pile", ".imp-stage",
        ]) {
          const el = document.querySelector(sel);
          if (el) refs[sel] = box(el);
        }
        res.refs = refs;
        return res;
      }, PAIRS);

      vpOut.modes[mode] = data;
    }
    await page.close();
    out.viewports.push(vpOut);
  }

  out.consoleErrors = consoleErrors;
  const fs = require("fs");
  const tag = process.argv.includes("--after") ? "after" : "before";
  const file = path.join(__dirname, `audit-${tag}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1));
  console.log("wrote", file);
  console.log("console errors:", consoleErrors.length);
  await browser.close();
})();
