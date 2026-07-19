/* The proof sheets under inspection: deep-link open, contents present,
   NEXT PROOF cycles, ESC closes, the row tap opens (live mode), the art
   is inked, and not one em dash on any sheet. Shots: day, and night+mess. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));

  /* -- still mode: deep link straight onto sheet 02 -- */
  await p.goto("http://localhost:3000/?still#p-02", { waitUntil: "networkidle" });
  await p.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
    return document.fonts ? document.fonts.ready : null;
  });
  await p.waitForTimeout(600);
  const deep = await p.evaluate(() => ({
    open: document.body.classList.contains("pv-open"),
    title: document.querySelector(".pv-title")?.textContent,
    kicker: document.querySelector(".pv-kicker")?.textContent,
    client: document.querySelector(".pv-meta div")?.textContent,
    stats: document.querySelectorAll(".pv-stats li").length,
    runRows: document.querySelectorAll(".pv-run-row").length,
    bar: document.querySelectorAll(".pv-bar i").length,
    crops: document.querySelectorAll(".pv-crop").length,
    reg: !!document.querySelector(".pv-reg"),
    cap: !!document.querySelector(".pv-cap"),
    sideB: document.querySelectorAll("#pv .note").length,
    ring: !!document.querySelector(".pv-stats li .pv-ring"),
    ins: !!document.querySelector(".pv-body .pmark .pm-ins"),
    stillSeated: !document.querySelector(".pv-sheet.pv-arm"),
    plateInked: (document.querySelector(".pv-plate")?.style.backgroundImage || "").length > 50,
    duoInked: [...document.querySelectorAll(".pv-duo figure")].every((f) => (f.style.backgroundImage || "").length > 50),
  }));
  console.log("deep-link:", JSON.stringify(deep));
  await p.screenshot({ path: "scripts/shot-pv-relay.png", fullPage: false });

  /* -- NEXT PROOF hands off 02 -> 03 -- */
  await p.click("#pv-next");
  await p.waitForTimeout(300);
  const next = await p.evaluate(() => ({
    title: document.querySelector(".pv-title")?.textContent,
    hash: location.hash,
  }));
  console.log("next-proof:", JSON.stringify(next));

  /* -- ESC closes -- */
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  const closed = await p.evaluate(() => ({
    open: document.body.classList.contains("pv-open"),
    hash: location.hash,
    empty: (document.getElementById("pv")?.innerHTML || "") === "",
  }));
  console.log("esc-close:", JSON.stringify(closed));

  /* -- the em dash sweep: every sheet, text + attributes -- */
  let dashes = 0;
  for (let i = 1; i <= 4; i++) {
    await p.evaluate((n) => { location.hash = "#p-0" + n; }, i);
    await p.waitForTimeout(250);
    dashes += await p.evaluate(() => {
      const pv = document.getElementById("pv");
      let count = (pv.innerText.match(/—/g) || []).length;
      pv.querySelectorAll("*").forEach((el) => {
        for (const a of el.attributes) if (a.name !== "style" && a.value.includes("—")) count++;
      });
      return count;
    });
  }
  console.log("emdash-count:", dashes);

  /* -- night + mess: the sheet annotated -- */
  await p.evaluate(() => { location.hash = "#p-01"; });
  await p.waitForTimeout(250);
  await p.evaluate(() => document.body.classList.add("night"));
  await p.click("#pv-mess");
  await p.waitForTimeout(700);
  const mess = await p.evaluate(() => ({
    btn: document.getElementById("pv-mess")?.textContent,
    seen: document.querySelectorAll("#pv .note.seen").length,
  }));
  console.log("mess:", JSON.stringify(mess));
  await p.screenshot({ path: "scripts/shot-pv-uveec-mess-night.png", fullPage: false });
  await p.close();

  /* -- live mode: the row tap opens through the line engine -- */
  const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p2.on("pageerror", (e) => errors.push(String(e)));
  await p2.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p2.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
    return document.fonts ? document.fonts.ready : null;
  });
  await p2.waitForTimeout(600);
  await p2.evaluate(() => {
    const r = document.getElementById("p-04").getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top - innerHeight / 2, behavior: "instant" });
  });
  await p2.waitForTimeout(900);
  await p2.click("#p-04 .row-strip");
  await p2.waitForTimeout(500);
  const live = await p2.evaluate(() => ({
    open: document.body.classList.contains("pv-open"),
    title: document.querySelector(".pv-title")?.textContent,
    hash: location.hash,
    stamped: !!document.querySelector(".pv-sheet.pv-arm"),
  }));
  console.log("live-tap:", JSON.stringify(live));
  await p2.close();
  await b.close();
  console.log("pageerrors:", JSON.stringify(errors));
  console.log("done");
})();
