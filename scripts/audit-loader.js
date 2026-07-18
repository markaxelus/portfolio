/* LOADER AUDIT — root scale, lockup size, mobile furniture, overflow. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[390, 844], [768, 1024], [1440, 900], [1920, 1080], [2560, 1440]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    await p.goto("http://localhost:3000/loader-lockup-mock.html", { waitUntil: "load" });
    await p.waitForTimeout(900);
    const r = await p.evaluate(() => {
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const g = (sel, prop) => {
        const el = document.querySelector(sel);
        return el ? parseFloat(getComputedStyle(el)[prop]).toFixed(1) : null;
      };
      const vis = (sel) => {
        const el = document.querySelector(sel);
        return !!el && getComputedStyle(el).display !== "none";
      };
      return {
        root: root.toFixed(2),
        markPx: g(".l-mark", "fontSize"),
        numPx: g(".make .num", "fontSize"),
        capPx: g(".cap", "fontSize"),
        plateShown: vis(".plate"),
        bioShown: vis(".bio"),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    console.log(w + "x" + h, JSON.stringify(r), errs.length ? "ERRS:" + errs.join("|") : "");
    await p.close();
  }
  await b.close();
})();
