/* The wax under the loupe: shoot the seal close, the bundle whole (two
   widths), the night pour — count what's left of the knot (nothing) and
   survey every band tip against the sheet silhouette it must land on
   (positive delta = tucked inside the edge; negative = floating in air). */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
const TIPS = { vTop: [426, 32], vBot: [401, 810], hLeft: [17, 596], hRight: [559, 629] };
(async () => {
  const b = await chromium.launch();
  for (const [w, tag] of [[1440, "mac"], [2560, "1440p"]]) {
    const p = await b.newPage({ viewport: { width: w, height: 2300 }, deviceScaleFactor: 2 });
    await p.goto("http://localhost:3000/?still", { waitUntil: "networkidle" });
    await p.evaluate(() => {
      document.documentElement.classList.remove("mr-hold");
      document.getElementById("makeready")?.remove();
      return document.fonts ? document.fonts.ready : null;
    });
    await p.waitForTimeout(700);
    await p.evaluate(() => {
      const t = document.querySelector(".bd-tie").getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + t.top + (615 / 820) * t.height - innerHeight / 2, behavior: "instant" });
    });
    await p.waitForTimeout(400);
    const facts = await p.evaluate((TIPS) => {
      const tie = document.querySelector(".bd-tie").getBoundingClientRect();
      const seal = document.querySelector(".bd-seal").getBoundingClientRect();
      const px = (vx) => tie.left + (vx / 600) * tie.width;
      const py = (vy) => tie.top + (vy / 820) * tie.height;
      const hit = (x, y) => document.elementsFromPoint(x, y).some((el) => el.closest && el.closest(".bd") && !el.closest(".bd-tie, .bd-seal"));
      const tips = {};
      for (const [name, [vx, vy]] of Object.entries(TIPS)) {
        const tx = px(vx), ty = py(vy);
        let edge = null, delta = null;
        if (name === "vTop") { for (let y = Math.max(0, Math.ceil(tie.top)); y < ty + 60; y++) if (hit(tx, y)) { edge = y; break; } delta = edge !== null ? ty - edge : null; }
        if (name === "vBot") { for (let y = Math.min(innerHeight - 1, Math.floor(tie.bottom)); y > ty - 60; y--) if (hit(tx, y)) { edge = y; break; } delta = edge !== null ? edge - ty : null; }
        if (name === "hLeft") { for (let x = Math.ceil(tie.left); x < tx + 60; x++) if (hit(x, ty)) { edge = x; break; } delta = edge !== null ? tx - edge : null; }
        if (name === "hRight") { for (let x = Math.floor(tie.right); x > tx - 60; x--) if (hit(x, ty)) { edge = x; break; } delta = edge !== null ? edge - tx : null; }
        tips[name] = delta !== null ? Math.round(delta * 10) / 10 : null;
      }
      const cross = { x: px(414), y: py(615) };
      return {
        tieCircles: document.querySelectorAll(".bd-tie circle").length,
        sealOnCross: Math.round(seal.left + seal.width / 2 - cross.x) + "," + Math.round(seal.top + seal.height / 2 - cross.y),
        dieOpacity: getComputedStyle(document.querySelector(".bd-seal-die")).opacity,
        tipTuckPx: tips,
      };
    }, TIPS);
    console.log("== " + tag + " ==", JSON.stringify(facts));
    const pk = await p.$("#pocket");
    await pk.screenshot({ path: `scripts/shot-seal-pocket-${tag}.png` });
    if (w === 1440) {
      for (const night of [false, true]) {
        await p.evaluate((n) => document.body.classList.toggle("night", n), night);
        await p.waitForTimeout(300);
        const sb = await p.evaluate(() => {
          const r = document.querySelector(".bd-seal").getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        });
        await p.screenshot({
          path: `scripts/shot-seal-zoom${night ? "-night" : ""}.png`,
          clip: { x: sb.x - 45, y: sb.y - 45, width: sb.width + 105, height: sb.height + 110 },
        });
      }
    }
    await p.close();
  }
  await b.close();
  console.log("done");
})();
