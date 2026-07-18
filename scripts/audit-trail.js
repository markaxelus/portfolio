/* FIG.1 look + geometry: screenshot the trail and measure stone/tick/label alignment. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1440, 900, "mac"], [2560, 1440, "1440p"]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto("http://localhost:3000/?still", { waitUntil: "networkidle" });
    await p.evaluate(() => {
      document.documentElement.classList.remove("mr-hold");
      document.getElementById("makeready")?.remove();
      return document.fonts ? document.fonts.ready : null;
    });
    await p.waitForTimeout(800);
    const geo = await p.evaluate(() => {
      const out = { stones: [], ticks: [], years: [], ground: null };
      const trail = document.querySelector(".trail");
      const tb = trail.getBoundingClientRect();
      document.querySelectorAll(".stone-slot .mile-stone").forEach((s) => {
        const r = s.getBoundingClientRect();
        out.stones.push({ cx: Math.round(r.left + r.width / 2 - tb.left), base: Math.round(r.bottom - tb.top), w: Math.round(r.width) });
      });
      document.querySelectorAll(".terrain-ground .tick").forEach((t) => {
        const r = t.getBoundingClientRect();
        out.ticks.push({ cx: Math.round(r.left + r.width / 2 - tb.left), top: Math.round(r.top - tb.top), bot: Math.round(r.bottom - tb.top) });
      });
      document.querySelectorAll(".mile-year").forEach((y) => {
        const r = y.getBoundingClientRect();
        out.years.push({ left: Math.round(r.left - tb.left), cx: Math.round(r.left + r.width / 2 - tb.left), txt: y.textContent });
      });
      const g = document.querySelector(".terrain-ground .ground");
      if (g) { const r = g.getBoundingClientRect(); out.ground = { left: Math.round(r.left - tb.left), right: Math.round(r.right - tb.left), top: Math.round(r.top - tb.top), bot: Math.round(r.bottom - tb.top) }; }
      const gg = document.querySelector(".terrain-ground .gap-ghost");
      if (gg) { const r = gg.getBoundingClientRect(); out.gapGhost = { left: Math.round(r.left - tb.left), right: Math.round(r.right - tb.left), y: Math.round(r.top - tb.top) }; }
      return out;
    });
    console.log("== " + tag + " ==");
    console.log(JSON.stringify(geo, null, 1));
    const el = await p.$(".trail");
    await el.screenshot({ path: `scripts/shot-${tag}-trail.png` });
    await p.close();
  }
  await b.close();
  console.log("done");
})();
