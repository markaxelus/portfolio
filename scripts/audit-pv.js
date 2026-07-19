/* The proof sheets under inspection: deep-link open, contents present,
   NEXT PROOF cycles, ESC closes, the row tap opens (live mode), the art
   is inked, and not one em dash on any sheet. The redo's laws too: the
   ghost numeral rests at its ghost ink (never pinned bright), the
   below-fold blocks scroll-stamp (.pv-sc -> .pv-in), THE STET replaced
   THE NERVE, DELIVERED links only real addresses, and the NEXT PROOF
   hover rolls the ink + raises the next plate. Shots: day, night+mess. */
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
    nextPlateInked: (document.querySelector(".pv-next-plate")?.style.backgroundImage || "").length > 50,
    stet: !!document.querySelector(".pv-stet"),
    gloss: (document.querySelector(".pv-gloss")?.textContent || "").includes("LET IT STAND"),
    noNerve: !(document.getElementById("pv")?.innerText || "").includes("THE NERVE"),
    stillScSeated: [...document.querySelectorAll(".pv-sc")].every((el) => getComputedStyle(el).opacity === "1"),
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

  /* -- the em dash sweep: every sheet, text + attributes; the DELIVERED
        census rides along (3 real addresses + 1 plain-type claim) -- */
  let dashes = 0, links = 0, plainClaims = 0, nerves = 0;
  for (let i = 1; i <= 4; i++) {
    await p.evaluate((n) => { location.hash = "#p-0" + n; }, i);
    await p.waitForTimeout(250);
    const sheet = await p.evaluate(() => {
      const pv = document.getElementById("pv");
      let count = (pv.innerText.match(/—/g) || []).length;
      pv.querySelectorAll("*").forEach((el) => {
        for (const a of el.attributes) if (a.name !== "style" && a.value.includes("—")) count++;
      });
      return {
        dashes: count,
        links: pv.querySelectorAll(".pv-links a[href]").length,
        plain: pv.querySelectorAll(".pv-links em").length,
        nerve: pv.innerText.includes("THE NERVE") ? 1 : 0,
      };
    });
    dashes += sheet.dashes; links += sheet.links;
    plainClaims += sheet.plain; nerves += sheet.nerve;
  }
  console.log("emdash-count:", dashes, "delivered-links:", links, "plain-claims:", plainClaims, "nerve-mentions:", nerves);

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

  /* -- the ghost law: after the fold seats, the numeral rests at its
        ghost ink (the old fill pinned it at 1 until a timer let go) -- */
  await p2.waitForTimeout(900);
  const ghost = await p2.evaluate(() => ({
    numOpacity: getComputedStyle(document.querySelector(".pv-num")).opacity,
    foldSet: !!document.querySelector(".pv-kicker.pv-set"),
  }));
  console.log("ghost-rest:", JSON.stringify(ghost));

  /* -- one run, never two: by ~2.1s the sheet is fully at rest (no
        straggler pv animations), and the page behind holds still (the
        smooth glide is dead under pv-open) -- */
  await p2.waitForTimeout(800);
  const oneRun = await p2.evaluate(() => ({
    stillAnimating: document
      .getElementById("pv")
      .getAnimations({ subtree: true })
      .filter(
        (a) =>
          a.playState === "running" &&
          a.animationName &&
          a.animationName.indexOf("pv") === 0,
      ).length,
    scrollBehaviorUnderPv: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  console.log("one-run:", JSON.stringify(oneRun));

  /* -- the scroll law: riding to the foot stamps every below-fold block -- */
  const sc0 = await p2.evaluate(() => ({
    total: document.querySelectorAll(".pv-sc").length,
    inAtOpen: document.querySelectorAll(".pv-sc.pv-in").length,
  }));
  await p2.evaluate(() => {
    const pv = document.getElementById("pv");
    pv.scrollTo({ top: pv.scrollHeight, behavior: "instant" });
  });
  await p2.waitForTimeout(1000);
  const sc1 = await p2.evaluate(() => ({
    inAtFoot: document.querySelectorAll(".pv-sc.pv-in").length,
    statsVisible: getComputedStyle(document.querySelector(".pv-stats")).opacity === "1",
  }));
  console.log("scroll-stamp:", JSON.stringify({ ...sc0, ...sc1 }));

  /* -- the handoff hover: the ink rolls across, the next plate rises -- */
  await p2.hover("#pv-next");
  await p2.waitForTimeout(700);
  const hov = await p2.evaluate(() => ({
    inkScaleX: getComputedStyle(document.querySelector(".pv-next-ink")).transform,
    plateUp: getComputedStyle(document.querySelector(".pv-next-plate")).opacity,
    nextInked: (document.querySelector(".pv-next-plate")?.style.backgroundImage || "").length > 50,
  }));
  console.log("next-hover:", JSON.stringify(hov));
  await p2.screenshot({ path: "scripts/shot-pv-next-hover.png", fullPage: false });
  await p2.close();

  /* -- the tall-monitor law: blocks visible AT OPEN continue the fold's
        cascade (--pvd >= .48s, one press run), never a second wave -- */
  const p3 = await b.newPage({ viewport: { width: 2560, height: 1440 } });
  p3.on("pageerror", (e) => errors.push(String(e)));
  await p3.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p3.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
    return document.fonts ? document.fonts.ready : null;
  });
  await p3.waitForTimeout(400);
  await p3.evaluate(() => { location.hash = "#p-01"; });
  await p3.waitForTimeout(500);
  const tall = await p3.evaluate(() => {
    const delays = [...document.querySelectorAll(".pv-sc.pv-in")].map((el) =>
      parseFloat(el.style.getPropertyValue("--pvd")),
    );
    return {
      openVisible: delays.length,
      allContinueFold: delays.every((d) => d >= 0.48),
      delays,
    };
  });
  console.log("tall-open:", JSON.stringify(tall));
  await p3.close();
  await b.close();
  console.log("pageerrors:", JSON.stringify(errors));
  console.log("done");
})();
