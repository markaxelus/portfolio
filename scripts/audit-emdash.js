/* EM-DASH SWEEP — collect every rendered string containing U+2014 from the
   live page (final + proof modes) and the loader, incl. aria/title attrs. */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);

async function sweep(page) {
  return page.evaluate(() => {
    const found = new Set();
    const walk = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      if (n.nodeValue && n.nodeValue.includes("—"))
        found.add(n.nodeValue.replace(/\s+/g, " ").trim().slice(0, 90));
    }
    document.querySelectorAll("*").forEach((el) => {
      for (const a of ["aria-label", "title", "alt", "placeholder", "content"]) {
        const v = el.getAttribute && el.getAttribute(a);
        if (v && v.includes("—")) found.add(a + "= " + v.slice(0, 90));
      }
    });
    if (document.title.includes("—")) found.add("TITLE= " + document.title);
    return [...found];
  });
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:3000/?still", { waitUntil: "networkidle" });
  await p.evaluate(() => {
    document.documentElement.classList.remove("mr-hold");
    document.getElementById("makeready")?.remove();
  });
  await p.waitForTimeout(400);
  console.log("== PAGE (final) ==");
  (await sweep(p)).forEach((s) => console.log("  " + s));
  await p.evaluate(() => document.body.classList.add("proof"));
  await p.waitForTimeout(300);
  console.log("== PAGE (proof extras) ==");
  (await sweep(p)).forEach((s) => console.log("  " + s));
  // a project sheet
  await p.evaluate(() => document.querySelector("#p-01")?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })));
  await p.waitForTimeout(700);
  console.log("== PV SHEET ==");
  (await sweep(p)).forEach((s) => console.log("  " + s));
  await p.goto("http://localhost:3000/loader-lockup-mock.html", { waitUntil: "load" });
  await p.waitForTimeout(600);
  console.log("== LOADER ==");
  (await sweep(p)).forEach((s) => console.log("  " + s));
  await b.close();
})();
