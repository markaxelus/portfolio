/* FIRST-VISIT FLIGHT SMOKE — clean storage, real loader run: the booth
   must lift, the frame must get a src, the hero must land, zero errors. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (m) => {
      if (m.type() === "error" && !/500|Failed to load resource/.test(m.text())) errs.push(m.text());
    });
    await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    const res = await p.evaluate(
      () =>
        new Promise((resolve) => {
          const t0 = performance.now();
          const iv = setInterval(() => {
            const mr = document.getElementById("makeready");
            const frame = document.getElementById("mr-frame");
            const out = !mr || mr.classList.contains("out");
            const src = frame && frame.getAttribute("src");
            if ((out && performance.now() - t0 > 1500) || performance.now() - t0 > 20000) {
              clearInterval(iv);
              const hero = document.querySelector(".hero-title");
              const r = hero ? hero.getBoundingClientRect() : null;
              resolve({
                boothLifted: out,
                frameSrc: src ? src.slice(0, 48) : null,
                heroBox: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null,
                tookMs: Math.round(performance.now() - t0),
              });
            }
          }, 250);
        }),
    );
    console.log(w + "x" + h, JSON.stringify(res), errs.length ? "ERRS: " + errs.join(" | ") : "clean");
    await ctx.close();
  }
  await b.close();
})();
