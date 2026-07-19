/* The performance inspection: the page under load and under a thumb.
   Desktop: CLS near zero (the index reserves the hang's room, sheets
   never flash stacked), the marquee sleeps off screen and under an open
   proof sheet. Mobile (touch, coarse pointer): a height-only viewport
   change (the URL bar breathing) must NOT re-hang the line or jump the
   scroll; the hold-register never writes text-shadow under a thumb; the
   cursor loop never arms. no-JS: the run reads as a plain list. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);

const CLS_OBSERVER = () => {
  window.__cls = 0;
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  } catch (e) {}
};

(async () => {
  const b = await chromium.launch();
  const errors = [];

  /* ---------- desktop ---------- */
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on("pageerror", (e) => errors.push("desktop: " + e));
  await p.addInitScript(CLS_OBSERVER);
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
    return document.fonts ? document.fonts.ready : null;
  });
  await p.waitForTimeout(900);
  const desk = await p.evaluate(() => ({
    cls: +window.__cls.toFixed(4),
    jsStamp: document.documentElement.classList.contains("js"),
    hung: document.querySelector(".index").classList.contains("line-hung"),
    rowsVisible: [...document.querySelectorAll(".row")].every(
      (r) => getComputedStyle(r).visibility === "visible",
    ),
    indexReserved: parseInt(getComputedStyle(document.querySelector(".index")).height) > 800,
  }));
  await p.evaluate(() =>
    document.querySelector(".ticker").scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await p.waitForTimeout(400);
  const tickInView = await p.evaluate(
    () => getComputedStyle(document.querySelector(".ticker-track")).animationPlayState,
  );
  await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await p.waitForTimeout(400);
  const tickOffscreen = await p.evaluate(
    () => getComputedStyle(document.querySelector(".ticker-track")).animationPlayState,
  );
  await p.evaluate(() => { location.hash = "#p-01"; });
  await p.waitForTimeout(400);
  const tickUnderPv = await p.evaluate(
    () => getComputedStyle(document.querySelector(".ticker-track")).animationPlayState,
  );
  console.log(
    "desktop:",
    JSON.stringify({ ...desk, tickInView, tickOffscreen, tickUnderPv }),
  );
  await p.close();

  /* ---------- mobile (touch / coarse) ---------- */
  const ctx = await b.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36",
  });
  const m = await ctx.newPage();
  m.on("pageerror", (e) => errors.push("mobile: " + e));
  await m.addInitScript(CLS_OBSERVER);
  await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await m.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
    return document.fonts ? document.fonts.ready : null;
  });
  await m.waitForTimeout(900);
  const before = await m.evaluate(() => {
    window.scrollTo({ top: 1400, behavior: "instant" });
    return {
      indexH: document.querySelector(".index").style.height,
      coarse: matchMedia("(pointer: coarse)").matches,
      hasCursor: document.body.classList.contains("has-cursor"),
      cls: +window.__cls.toFixed(4),
    };
  });
  /* the URL bar breathes: height-only viewport changes, width held */
  await m.setViewportSize({ width: 390, height: 740 });
  await m.waitForTimeout(450);
  await m.setViewportSize({ width: 390, height: 844 });
  await m.waitForTimeout(450);
  const afterBar = await m.evaluate(() => ({
    indexH: document.querySelector(".index").style.height,
    scrollY: Math.round(window.scrollY),
  }));
  /* a real rotation (width change) must still re-hang */
  await m.setViewportSize({ width: 844, height: 390 });
  await m.waitForTimeout(450);
  const afterRotate = await m.evaluate(
    () => document.querySelector(".index").style.height,
  );
  await m.setViewportSize({ width: 390, height: 844 });
  await m.waitForTimeout(450);
  /* scrolling never shears type under a thumb */
  await m.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await m.waitForTimeout(120);
  await m.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
  await m.waitForTimeout(120);
  const regShadow = await m.evaluate(
    () => document.getElementById("hero-title").style.textShadow || "(none)",
  );
  console.log(
    "mobile:",
    JSON.stringify({
      ...before,
      barKeptHeight: afterBar.indexH === before.indexH,
      barScrollY: afterBar.scrollY,
      rotateRehung: afterRotate !== before.indexH,
      regShadow,
    }),
  );
  await m.close();
  await ctx.close();

  /* ---------- no-JS: the printed-list fallback ---------- */
  const nctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const n = await nctx.newPage();
  await n.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await n.waitForTimeout(600);
  const nojs = await n.evaluate(() => ({
    rowStatic: getComputedStyle(document.querySelector(".row")).position,
    rowVisible: getComputedStyle(document.querySelector(".row")).visibility,
    wireHidden: getComputedStyle(document.querySelector(".line-wire")).display,
  }));
  console.log("no-js:", JSON.stringify(nojs));
  await n.close();
  await nctx.close();

  await b.close();
  console.log("pageerrors:", JSON.stringify(errors));
  console.log("done");
})();
