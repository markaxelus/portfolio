/* Region screenshots for the eyeball pass (imprint + outro + yard, proof mode). */
const PW = "C:\\Users\\max3l\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules\\playwright";
const { chromium } = require(PW);
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[2560, 1440, "1440p"], [1440, 900, "mac"], [390, 844, "phone"]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto("http://localhost:3000/?still", { waitUntil: "networkidle" });
    await p.evaluate(() => {
      document.documentElement.classList.remove("mr-hold");
      document.getElementById("makeready")?.remove();
      document.body.classList.add("proof");
      document.querySelectorAll(".note, .anchor, .chip-ring, .amark").forEach((el) => el.classList.add("seen"));
    });
    await p.waitForTimeout(700);
    for (const [sel, name] of [[".imprint", "imprint"], [".outro", "outro"], [".yard", "yard"], [".desk", "desk"]]) {
      const el = await p.$(sel);
      if (el) await el.screenshot({ path: `scripts/shot-${tag}-${name}.png` }).catch(() => {});
    }
    await p.close();
  }
  await b.close();
  console.log("done");
})();
