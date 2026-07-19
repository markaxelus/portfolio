/* The type cases under inspection: on a RETURN visit (no loader) the page
   must make ZERO requests to fonts.googleapis / gstatic / fontshare — every
   face resolves from /fonts same-origin, and document.fonts confirms each
   family (roman + italic Fraunces, both mono weights, both pens, Excon).
   The FLIP contract holds: computed families keep their REAL names. On a
   ?loader replay the iframe MAY pull its own vendor copies (first-visit
   theater) — that is expected and asserted separately. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  const errors = [];

  /* ---- return visit: self-hosted only ---- */
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on("pageerror", (e) => errors.push(String(e)));
  const thirdParty = [];
  const selfFonts = [];
  p.on("request", (r) => {
    const u = r.url();
    if (/fonts\.googleapis|fonts\.gstatic|fontshare/.test(u)) thirdParty.push(u);
    if (/localhost:3000\/fonts\//.test(u)) selfFonts.push(u.split("/").pop());
  });
  /* mark the session visited so the loader (and its vendor fonts) stays out */
  await p.addInitScript(() => {
    try { sessionStorage.setItem("ma-press-check", "1"); } catch (e) {}
  });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p.evaluate(() => (document.fonts ? document.fonts.ready : null));
  await p.waitForTimeout(400);
  const faces = await p.evaluate(() => ({
    frauncesRoman: document.fonts.check('500 24px "Fraunces"'),
    frauncesItalic: document.fonts.check('italic 500 24px "Fraunces"'),
    mono400: document.fonts.check('400 16px "Space Mono"'),
    mono700: document.fonts.check('700 16px "Space Mono"'),
    caveat: document.fonts.check('400 20px "Caveat"'),
    zeyada: document.fonts.check('400 20px "Zeyada"'),
    excon700: document.fonts.check('700 40px "Excon"'),
    heroWordFamily: getComputedStyle(document.querySelector(".v3-word")).fontFamily,
    ampFamily: getComputedStyle(document.querySelector("#amp")).fontFamily,
  }));
  console.log("return-visit:", JSON.stringify({
    thirdPartyRequests: thirdParty.length,
    selfHosted: selfFonts.sort(),
    ...faces,
  }));
  await p.screenshot({ path: "scripts/shot-fonts-hero.png" });
  /* the pens (mess layer) render from the local files too */
  await p.keyboard.press("m");
  await p.waitForTimeout(900);
  await p.screenshot({ path: "scripts/shot-fonts-mess.png" });
  await p.close();

  /* ---- ?loader replay: the theater still flies ---- */
  const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p2.on("pageerror", (e) => errors.push("loader: " + e));
  await p2.goto("http://localhost:3000/?loader", { waitUntil: "domcontentloaded" });
  await p2.waitForTimeout(2500);
  const loader = await p2.evaluate(() => ({
    held: document.documentElement.classList.contains("mr-hold"),
    frame: !!document.getElementById("makeready"),
  }));
  await p2.waitForTimeout(6500);
  const after = await p2.evaluate(() => ({
    released: !document.documentElement.classList.contains("mr-hold"),
    frameGone: !document.getElementById("makeready"),
    heroLanded: !!document.querySelector(".hero-title.landed") ||
      document.body.classList.contains("hero-set") ||
      !!document.querySelector("#amp"),
  }));
  console.log("loader-replay:", JSON.stringify({ midFlight: loader, settled: after }));
  await p2.close();

  await b.close();
  console.log("pageerrors:", JSON.stringify(errors));
  console.log("done");
})();
