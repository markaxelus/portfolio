(function () {
  "use strict";

  /* ============ tiny seeded rng (stones must wobble the same way twice) ============ */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* hand-drawn stone: closed wobbly blob through smoothed points */
  function stonePath(cx, cy, rx, ry, seed) {
    var rnd = mulberry32(seed);
    var N = 9, pts = [], i;
    for (i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2;
      var w = 0.82 + rnd() * 0.3;
      pts.push([
        cx + Math.cos(a) * rx * w,
        cy + Math.sin(a) * ry * (0.86 + rnd() * 0.26)
      ]);
    }
    function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
    var d = "M" + mid(pts[N - 1], pts[0]).map(r1).join(" ");
    for (i = 0; i < N; i++) {
      var p = pts[i], m = mid(pts[i], pts[(i + 1) % N]);
      d += " Q" + r1(p[0]) + " " + r1(p[1]) + " " + r1(m[0]) + " " + r1(m[1]);
    }
    return d + " Z";
    function r1(v) { return Math.round(v * 10) / 10; }
  }

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ============ generated plates ============ */
  /* duotone gradient + misregistered motif + halftone + proof slug +
     ghost numeral + grain, as an inline SVG data-URI */

  var PROJECTS = [
    { num: "01", dark: "#0E0E22", bright: "#2A2AF0", motif: "arcs" },
    { num: "02", dark: "#160E2C", bright: "#8E7BFF", motif: "stripes" },
    { num: "03", dark: "#041D1C", bright: "#63D3C6", motif: "orbits" },
    { num: "04", dark: "#22060F", bright: "#EE4E9B", motif: "steps" }
  ];

  function motifSVG(kind, color) {
    var s = "";
    var i;
    if (kind === "arcs") {
      for (i = 1; i <= 6; i++) {
        s += '<circle cx="560" cy="300" r="' + (i * 58) +
             '" fill="none" stroke="' + color + '" stroke-width="2" opacity="' + (0.9 - i * 0.1) + '"/>';
      }
      s += '<circle cx="560" cy="300" r="14" fill="' + color + '"/>';
    } else if (kind === "stripes") {
      s += '<g transform="rotate(-24 400 500)">';
      for (i = 0; i < 9; i++) {
        s += '<rect x="' + (-100 + i * 120) + '" y="120" width="34" height="760" fill="' + color +
             '" opacity="' + (i % 2 ? 0.85 : 0.4) + '"/>';
      }
      s += "</g>";
    } else if (kind === "orbits") {
      s += '<circle cx="400" cy="430" r="240" fill="none" stroke="' + color + '" stroke-width="2"/>';
      s += '<ellipse cx="400" cy="430" rx="340" ry="120" fill="none" stroke="' + color + '" stroke-width="1.5" opacity="0.7"/>';
      s += '<circle cx="640" cy="360" r="26" fill="' + color + '"/>';
      for (i = 0; i < 5; i++) {
        for (var j = 0; j < 4; j++) {
          var x = 120 + i * 44, y = 760 + j * 44;
          s += '<path d="M' + x + " " + (y - 9) + "v18M" + (x - 9) + " " + y + "h18" +
               '" stroke="' + color + '" stroke-width="2" opacity="0.75"/>';
        }
      }
    } else if (kind === "steps") {
      for (i = 0; i < 7; i++) {
        s += '<rect x="90" y="' + (180 + i * 78) + '" width="' + (620 - i * 78) +
             '" height="40" fill="' + color + '" opacity="' + (0.95 - i * 0.11) + '"/>';
      }
    }
    return s;
  }

  function plateURI(p) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
        '<defs>' +
          '<linearGradient id="duo" x1="0" y1="0" x2="1" y2="1.2">' +
            '<stop offset="0" stop-color="' + p.dark + '"/>' +
            '<stop offset="1" stop-color="' + p.bright + '" stop-opacity="0.55"/>' +
          '</linearGradient>' +
          '<pattern id="ht" width="9" height="9" patternUnits="userSpaceOnUse">' +
            '<circle cx="4.5" cy="4.5" r="1.5" fill="' + p.bright + '"/>' +
          '</pattern>' +
          '<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>' +
          '<feColorMatrix type="saturate" values="0"/></filter>' +
        '</defs>' +
        '<rect width="800" height="1000" fill="' + p.dark + '"/>' +
        '<rect width="800" height="1000" fill="url(#duo)"/>' +
        '<rect width="800" height="1000" fill="url(#ht)" opacity="0.1"/>' +
        /* misregistered red proof pass, then the true pass */
        '<g transform="translate(6 4)" opacity="0.4">' + motifSVG(p.motif, "#C7361F") + "</g>" +
        motifSVG(p.motif, p.bright) +
        '<text x="30" y="985" font-family="Georgia, \'Times New Roman\', serif" font-size="560" ' +
          'font-weight="500" fill="#DDDBD4" opacity="0.16" letter-spacing="-30">' + p.num + '</text>' +
        '<g transform="rotate(-90 44 500)"><text x="44" y="500" text-anchor="middle" ' +
          'font-family="monospace" font-size="17" letter-spacing="5" fill="#DDDBD4" opacity="0.75">' +
          "M.A. &#8212; PROOF " + p.num + "/04 &#183; NOT FOR PRODUCTION</text></g>" +
        '<rect width="800" height="1000" filter="url(#gr)" opacity="0.14"/>' +
      '</svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  }

  var plates = PROJECTS.map(plateURI);

  /* static thumbnails for touch / narrow viewports */
  var rows = Array.prototype.slice.call(document.querySelectorAll(".row"));
  rows.forEach(function (row) {
    var thumb = row.querySelector(".row-thumb");
    thumb.style.backgroundImage = plates[+row.dataset.plate];
  });

  /* ============ clocks, dates, desk status ============ */
  var DESK_TZ = "America/Los_Angeles";
  function deskTime() {
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: DESK_TZ,
      hour: "2-digit", minute: "2-digit", hour12: false
    });
    return fmt.format(new Date());
  }
  var clockEl = document.getElementById("clock");
  function tickClock() {
    if (clockEl) clockEl.textContent = " — " + deskTime() + " AT MY DESK";
  }
  tickClock();
  setInterval(tickClock, 30000);

  var dateStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: DESK_TZ, day: "2-digit", month: "short", year: "numeric"
  }).format(new Date()).toUpperCase();
  var jd = document.getElementById("job-date");
  var sd = document.getElementById("stamp-date");
  if (jd) jd.textContent = dateStr;
  if (sd) sd.textContent = dateStr;

  function deskStatus() {
    var h = +new Intl.DateTimeFormat("en-GB", {
      timeZone: DESK_TZ, hour: "2-digit", hour12: false
    }).format(new Date());
    return (h >= 8 && h < 19)
      ? "I AM PROBABLY AT THE DESK"
      : "THE DESK SLEEPS — WRITE ANYWAY";
  }

  /* ============ ticker ============ */
  var TICKER = [
    "CODE — DESIGN — TYPE — MOTION",
    "AVAILABLE Q4 2026",
    deskStatus(),
    "THE KERNING IS DONE — IT ISN’T",
    "PRESS M FOR THE MESS",
    "PRESS N FOR NIGHT OFFICE",
    "THE HEADLINE IS LOOSE TYPE — GRAB IT",
    "THE CHIPS AT THE BOTTOM ARE PAINT",
    "ONE-PERSON OPERATION"
  ];
  var track = document.getElementById("ticker-track");
  TICKER.forEach(function (item) {
    var s = document.createElement("span");
    s.textContent = item;
    track.appendChild(s);
    var m = document.createElement("span");
    m.className = "tick-mark";
    m.innerHTML = "&#10042;";
    track.appendChild(m);
  });
  var clone = document.createElement("div");
  clone.style.display = "inline-flex";
  clone.setAttribute("aria-hidden", "true");
  clone.innerHTML = track.innerHTML;
  track.appendChild(clone);

  /* ============ pointer-mode detection ============ */
  var mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var mqWide = window.matchMedia("(min-width: 821px)");
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function trailEnabled() { return mqFine.matches && mqWide.matches; }
  function reduced() { return mqReduce.matches; }

  var cursorEl = document.getElementById("cursor");
  var revealEl = document.querySelector(".reveal");
  var scalerEl = document.getElementById("reveal-scaler");
  var plateEl = document.getElementById("reveal-plate");
  var indexEl = document.querySelector(".index");

  function syncMode() {
    document.body.classList.toggle("has-cursor", trailEnabled() && !reduced());
  }
  syncMode();
  [mqFine, mqWide, mqReduce].forEach(function (mq) {
    if (mq.addEventListener) mq.addEventListener("change", syncMode);
  });

  /* ============ lerp loop: cursor dot + reveal trail ============ */
  /* the dot rides the pointer 1:1 (a lagging dot reads as input lag when
     cursor:none hides the real one); only the plate keeps its lazy trail.
     no offsetWidth/getBoundingClientRect in here — this loop must never
     force layout, so centring is done with translate(-50%,-50%). */
  var LERP_PLATE = 0.12;
  var mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  var plate = { x: mouse.x, y: mouse.y };
  var prevPlateX = plate.x;
  var seenPointer = false;
  var open = false;
  var lastPlateTf = "", lastDotTf = "";

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function r2(v) { return Math.round(v * 100) / 100; }

  document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!seenPointer) {
      seenPointer = true;
      document.body.classList.add("pointer-seen");
      plate.x = mouse.x;
      plate.y = mouse.y;
    }
  });

  function frame() {
    if (trailEnabled() && seenPointer) {
      if (reduced()) {
        plate.x = mouse.x; plate.y = mouse.y;
      } else {
        plate.x = lerp(plate.x, mouse.x, LERP_PLATE);
        plate.y = lerp(plate.y, mouse.y, LERP_PLATE);
        /* settle when close so the writes below can stop */
        if (Math.abs(plate.x - mouse.x) + Math.abs(plate.y - mouse.y) < 0.3) {
          plate.x = mouse.x; plate.y = mouse.y;
        }
      }

      var vx = plate.x - prevPlateX;
      prevPlateX = plate.x;
      var skew = reduced() ? 0 : clamp(vx * 0.45, -9, 9);
      var rot = reduced() ? 0 : clamp(vx * 0.06, -1.6, 1.6);

      var plateTf =
        "translate3d(" + r2(plate.x) + "px," + r2(plate.y) + "px,0)" +
        " translate(-50%,-50%) skewX(" + r2(skew) + "deg) rotate(" + r2(rot) + "deg)";
      if (plateTf !== lastPlateTf) {
        lastPlateTf = plateTf;
        revealEl.style.transform = plateTf;
      }

      var dotTf =
        "translate3d(" + mouse.x + "px," + mouse.y + "px,0) translate(-50%,-50%)";
      if (dotTf !== lastDotTf) {
        lastDotTf = dotTf;
        cursorEl.style.transform = dotTf;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ============ row choreography + reveal swap ============ */
  var curPlate = -1;
  rows.forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      if (!trailEnabled()) return;
      indexEl.classList.add("is-hovering");
      rows.forEach(function (r) { r.classList.remove("is-active"); });
      row.classList.add("is-active");
      cursorEl.classList.add("is-view");

      if (+row.dataset.plate !== curPlate) {
        curPlate = +row.dataset.plate;
        plateEl.style.backgroundImage = plates[curPlate];
      }
      if (!open) {
        plate.x = mouse.x; plate.y = mouse.y; prevPlateX = plate.x;
        if (reduced()) scalerEl.style.transition = "none";
        scalerEl.style.transform = "scale(1)";
        open = true;
      }
    });

    row.addEventListener("mouseleave", function () {
      if (!trailEnabled()) return;
      indexEl.classList.remove("is-hovering");
      row.classList.remove("is-active");
      cursorEl.classList.remove("is-view");
      scalerEl.style.transform = "scale(0)";
      open = false;
    });
  });

  document.addEventListener("mouseleave", function () {
    scalerEl.style.transform = "scale(0)";
    open = false;
    indexEl.classList.remove("is-hovering");
    rows.forEach(function (r) { r.classList.remove("is-active"); });
  });

  /* ============ ink pooling: hero type swells under the nib ============ */
  var chars = [];
  Array.prototype.slice.call(document.querySelectorAll("[data-ink]")).forEach(function (el) {
    var isAmp = el.id === "amp" || el.classList.contains("amp");
    var text = el.textContent;
    el.textContent = "";
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (c === " " || c === " ") {
        el.appendChild(document.createTextNode(c));
        continue;
      }
      var span = document.createElement("span");
      span.className = "ch";
      span.textContent = c;
      el.appendChild(span);
      chars.push({ el: span, amp: isAmp, t: 0, lw: -1, ls: -1 });
    }
  });

  var INK_R = 170;
  var inkQueued = false;
  var inkActive = false;
  /* hero box cached in document coords — the gate below must not measure
     anything, so mousemove forces zero reflows anywhere on the page.
     re-measured in positionAnchors (init, fonts.ready, resize, animationend). */
  var heroGate = null;
  function measureHeroGate() {
    var hr = heroEl.getBoundingClientRect();
    heroGate = {
      left: hr.left, right: hr.right,
      top: hr.top + scrollY, bottom: hr.bottom + scrollY
    };
  }
  function inkFrame() {
    inkQueued = false;
    if (!trailEnabled() || reduced() || document.body.classList.contains("proof")) return;
    if (!heroGate) return;
    var my = mouse.y + scrollY;
    var near =
      mouse.x > heroGate.left - INK_R && mouse.x < heroGate.right + INK_R &&
      my > heroGate.top - INK_R && my < heroGate.bottom + INK_R;
    if (!near) {
      if (inkActive) {
        chars.forEach(function (c) { setInk(c, 0); });
        inkActive = false;
      }
      return;
    }
    var rects = chars.map(function (c) { return c.el.getBoundingClientRect(); });
    inkActive = false;
    chars.forEach(function (c, i) {
      var r = rects[i];
      if (r.bottom < -40 || r.top > innerHeight + 40) { setInk(c, 0); return; }
      var dx = mouse.x - (r.left + r.width / 2);
      var dy = mouse.y - (r.top + r.height / 2);
      var d = Math.sqrt(dx * dx + dy * dy);
      var t = clamp(1 - d / INK_R, 0, 1);
      t = t * t * (3 - 2 * t);
      /* 20 steps, smoothed by the 0.28s .ch transition — writing fresh axes
         every frame kept 17 display glyphs re-shaping continuously */
      t = Math.round(t * 20) / 20;
      setInk(c, t);
      if (c.t > 0) inkActive = true;
    });
  }
  function setInk(c, t) {
    if (t === 0 && c.t === 0) return;
    c.t = t;
    var w = Math.round(c.amp ? 340 + 220 * t : 480 + 240 * t);
    var s = Math.round(70 * t);
    if (w === c.lw && s === c.ls) return; /* same rendered axes — no style churn */
    c.lw = w; c.ls = s;
    c.el.style.fontVariationSettings =
      '"opsz" 144, "wght" ' + w + ', "SOFT" ' + s + ', "WONK" 0';
  }
  document.addEventListener("mousemove", function () {
    if (!inkQueued) {
      inkQueued = true;
      requestAnimationFrame(inkFrame);
    }
  });

  /* ============ loose type: the case is open ============ */
  var typeDecal = document.getElementById("type-decal");
  var heroTitleEl = document.getElementById("hero-title");
  var cursorLabel = cursorEl.querySelector(".cursor-label");
  var GRAV = 2400;
  var grabbed = null;
  var anyLoose = false;
  var physicsRunning = false;

  chars.forEach(function (c) {
    c.x = 0; c.y = 0; c.vx = 0; c.vy = 0;
    c.rot = 0; c.vr = 0;
    c.loose = false; c.resting = false;
  });

  function applyChar(c) {
    c.el.style.transform =
      "translate3d(" + c.x.toFixed(1) + "px," + c.y.toFixed(1) + "px,0) rotate(" + c.rot.toFixed(2) + "deg)";
  }

  function physicsFrame(now) {
    if (!physicsRunning) return;
    var heroRect = heroEl.getBoundingClientRect();
    var floor = heroRect.bottom - 10;
    var activeCount = 0;
    chars.forEach(function (c) {
      if (!c.loose || c === (grabbed && grabbed.c) || c.resting) return;
      activeCount++;
      var dt = 0.016;
      c.vy += GRAV * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      c.rot += c.vr * dt;
      applyChar(c);
      var r = c.el.getBoundingClientRect();
      if (r.bottom > floor) {
        c.y -= r.bottom - floor;
        c.vy = -c.vy * 0.42;
        c.vx *= 0.88;
        c.vr *= 0.8;
        if (Math.abs(c.vy) < 60) c.vy = 0;
      }
      if (r.left < heroRect.left) { c.x += heroRect.left - r.left; c.vx = -c.vx * 0.5; }
      if (r.right > heroRect.right) { c.x -= r.right - heroRect.right; c.vx = -c.vx * 0.5; }
      if (c.vy === 0 && Math.abs(c.vx) < 10 && r.bottom >= floor - 2) {
        c.vx = 0; c.vr = 0; c.resting = true;
      }
      applyChar(c);
    });
    if (activeCount === 0 && !grabbed) { physicsRunning = false; return; }
    requestAnimationFrame(physicsFrame);
  }
  function startPhysics() {
    if (!physicsRunning) {
      physicsRunning = true;
      requestAnimationFrame(physicsFrame);
    }
  }

  function resetCase() {
    chars.forEach(function (c) {
      if (!c.loose) return;
      c.el.classList.add("returning");
      c.el.style.transform = "";
      c.x = 0; c.y = 0; c.vx = 0; c.vy = 0; c.rot = 0; c.vr = 0;
      c.loose = false; c.resting = false;
      setTimeout(function () { c.el.classList.remove("returning"); }, 750);
    });
    anyLoose = false;
    grabbed = null;
    setTimeout(function () {
      if (!anyLoose) heroEl.classList.remove("type-loose");
    }, 750);
    typeDecal.textContent = "[!] LOOSE TYPE — GRAB A LETTER";
  }
  typeDecal.addEventListener("click", function () {
    if (anyLoose) resetCase();
  });

  chars.forEach(function (c) {
    c.el.addEventListener("pointerdown", function (e) {
      if (!trailEnabled() || reduced()) return;
      if (document.body.classList.contains("proof")) return;
      e.preventDefault();
      heroEl.classList.add("type-loose");
      c.loose = true; c.resting = false;
      c.el.classList.add("grabbed");
      grabbed = {
        c: c,
        startPX: e.clientX, startPY: e.clientY,
        baseX: c.x, baseY: c.y,
        lastPX: e.clientX, lastPY: e.clientY,
        lastT: performance.now()
      };
      anyLoose = true;
      typeDecal.textContent = "[R] RESET THE CASE";
      cursorLabel.textContent = "WHEEE";
      startPhysics();
    });
  });

  document.addEventListener("pointermove", function (e) {
    if (!grabbed) return;
    var g = grabbed, c = g.c;
    c.x = g.baseX + (e.clientX - g.startPX);
    c.y = g.baseY + (e.clientY - g.startPY);
    var now = performance.now();
    var dt = Math.max(8, now - g.lastT) / 1000;
    c.vx = (e.clientX - g.lastPX) / dt;
    c.vy = (e.clientY - g.lastPY) / dt;
    g.lastPX = e.clientX; g.lastPY = e.clientY; g.lastT = now;
    applyChar(c);
  });

  document.addEventListener("pointerup", function () {
    if (!grabbed) return;
    var c = grabbed.c;
    c.el.classList.remove("grabbed");
    c.vx = clamp(c.vx, -1600, 1600);
    c.vy = clamp(c.vy, -1600, 1600);
    c.vr = c.vx * 0.15 + (c.vy > 0 ? 40 : -40);
    grabbed = null;
    cursorLabel.textContent = "GRAB";
    startPhysics();
  });

  heroTitleEl.addEventListener("mouseenter", function () {
    if (!trailEnabled() || reduced() || document.body.classList.contains("proof")) return;
    cursorLabel.textContent = grabbed ? "WHEEE" : "GRAB";
    cursorEl.classList.add("is-grab");
  });
  heroTitleEl.addEventListener("mouseleave", function () {
    cursorEl.classList.remove("is-grab");
  });
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if ((e.key === "r" || e.key === "R") && anyLoose) resetCase();
  });

  /* ============ proof mode: the working layer ============ */
  var proofBtn = document.getElementById("proof-btn");
  var ampEl = document.getElementById("amp");
  var heroEl = document.getElementById("hero");
  var bioEl = document.getElementById("hero-bio");
  var anchorAmp = document.getElementById("anchor-amp");
  var anchorBio = document.getElementById("anchor-bio");
  var nerveEl = document.getElementById("nerve");
  var amarkNerve = document.getElementById("amark-nerve");
  var writeEl = document.getElementById("write-link");
  var amarkWrite = document.getElementById("amark-write");
  var outroEl = document.querySelector(".outro");

  function positionAnchors() {
    measureHeroGate();
    /* the hand on the finished page: underline + circle */
    if (amarkNerve && nerveEl) {
      var hr0 = heroEl.getBoundingClientRect();
      var nr = nerveEl.getBoundingClientRect();
      amarkNerve.style.left = (nr.left - hr0.left + nr.width * 0.06) + "px";
      amarkNerve.style.top = (nr.bottom - hr0.top - nr.height * 0.02) + "px";
      amarkNerve.style.width = (nr.width * 0.92) + "px";
      amarkNerve.style.height = Math.max(10, nr.width * 0.055) + "px";
    }
    if (amarkWrite && writeEl && outroEl) {
      var or = outroEl.getBoundingClientRect();
      var wr = writeEl.getBoundingClientRect();
      amarkWrite.style.left = (wr.left - or.left - wr.width * 0.07) + "px";
      amarkWrite.style.top = (wr.top - or.top - wr.height * 0.1) + "px";
      amarkWrite.style.width = (wr.width * 1.14) + "px";
      amarkWrite.style.height = (wr.height * 1.28) + "px";
    }
    if (!document.body.classList.contains("proof")) return;
    var hr = heroEl.getBoundingClientRect();
    if (anchorAmp && ampEl) {
      var ar = ampEl.getBoundingClientRect();
      var cx = ar.left + ar.width / 2 - hr.left;
      var cy = ar.top + ar.height / 2 - hr.top;
      anchorAmp.style.left = Math.max(8, cx - 90) + "px";
      anchorAmp.style.top = Math.max(8, cy - 64) + "px";
    }
    if (anchorBio && bioEl) {
      var br = bioEl.getBoundingClientRect();
      anchorBio.style.left = (br.left - hr.left - 34) + "px";
      anchorBio.style.top = (br.top - hr.top - 6) + "px";
      anchorBio.style.height = (br.height + 12) + "px";
      anchorBio.style.width = "34px";
    }
  }

  /* notes draw themselves in only when they scroll into view */
  var messObserver = null;
  function watchNotes() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll(".note, .anchor, .chip-ring, .amark")
    );
    if (document.documentElement.classList.contains("still")) {
      els.forEach(function (el) { el.classList.add("seen"); });
      return;
    }
    messObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("seen");
          messObserver.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { messObserver.observe(el); });
  }
  function unwatchNotes() {
    if (messObserver) { messObserver.disconnect(); messObserver = null; }
    Array.prototype.slice.call(document.querySelectorAll(".seen")).forEach(function (el) {
      el.classList.remove("seen");
    });
  }

  function setProof(on) {
    document.body.classList.toggle("proof", on);
    proofBtn.setAttribute("aria-pressed", String(on));
    proofBtn.textContent = on ? "OK, ENOUGH" : "SEE THE MESS";
    if (on) {
      chars.forEach(function (c) {
        c.el.style.fontVariationSettings = "";
        c.t = 0; c.lw = -1; c.ls = -1;
      });
      positionAnchors();
      scalerEl.style.transform = "scale(0)";
      open = false;
      if (!messObserver) watchNotes();
    } else {
      unwatchNotes();
    }
  }
  function toggleProof() {
    setProof(!document.body.classList.contains("proof"));
  }

  proofBtn.addEventListener("click", toggleProof);
  /* /?still — freeze all motion (press shots, screenshots, pen plotters) */
  if (/(^|[?&])still/.test(location.search)) {
    document.documentElement.classList.add("still");
  }
  /* /?fps — dev-only frame meter (measured rate + worst frame in the window) */
  if (/(^|[?&])fps/.test(location.search)) {
    var fpsEl = document.createElement("div");
    fpsEl.className = "mono fps-meter";
    fpsEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(fpsEl);
    var fpsLast = performance.now(), fpsEma = 16.7, fpsWorst = 0, fpsShown = 0;
    requestAnimationFrame(function fpsLoop(now) {
      var dt = now - fpsLast; fpsLast = now;
      fpsEma += (dt - fpsEma) * 0.05;
      if (dt > fpsWorst) fpsWorst = dt;
      if (now - fpsShown > 250) {
        fpsShown = now;
        fpsEl.textContent =
          String(Math.round(1000 / fpsEma)).padStart(3, "0") +
          " FPS — WORST " + Math.round(fpsWorst) + "MS";
        fpsWorst = 0;
      }
      requestAnimationFrame(fpsLoop);
    });
  }
  /* shareable working layer: /?proof or #proof opens marked-up */
  if (/(^|[?&])proof/.test(location.search) || location.hash === "#proof") {
    setProof(true);
  }
  /* arrive at anchors instantly; smooth scrolling is for in-page moves */
  if (location.hash && location.hash !== "#proof") {
    var landing = document.getElementById(location.hash.slice(1));
    if (landing) landing.scrollIntoView({ behavior: "instant", block: "start" });
  }
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "m" || e.key === "M" || e.key === "p" || e.key === "P") toggleProof();
    if (e.key === "n" || e.key === "N") setNight(!isNight(), true);
    if (e.key === "Escape") setProof(false);
  });

  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(positionAnchors, 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionAnchors);
  }
  /* re-measure once the hero settles (proof may open mid-entrance) */
  var lastLine = document.querySelector(".hl-mask:nth-child(3) .hl");
  if (lastLine) lastLine.addEventListener("animationend", positionAnchors, { once: true });
  positionAnchors();

  /* ============ the trail: one stone per year ============ */
  Array.prototype.slice.call(document.querySelectorAll(".mile-stone")).forEach(function (svg, i) {
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(30, 15, 21, 9, 201 + i * 17));
    svg.appendChild(p);
  });

  /* ============ paint chips: pick my accent ============ */
  var ACCENTS = [
    { day: "#2A2AF0", night: "#7C7CFF" },  /* signal */
    { day: "#D6246E", night: "#FF5FA2" },  /* magenta */
    { day: "#6E7D00", night: "#C6D600" }   /* acid */
  ];
  var chipEls = Array.prototype.slice.call(document.querySelectorAll(".chips .chip"));
  var accentI = 0;
  try { accentI = Math.min(2, Math.max(0, +(localStorage.getItem("ma-accent-i") || 0))); } catch (e) {}

  function isNight() { return document.body.classList.contains("night"); }
  function applyAccent() {
    document.documentElement.style.setProperty(
      "--accent", ACCENTS[accentI][isNight() ? "night" : "day"]
    );
    chipEls.forEach(function (c) {
      c.setAttribute("aria-pressed", String(+c.dataset.ai === accentI));
    });
  }
  chipEls.forEach(function (c) {
    c.addEventListener("click", function () {
      accentI = +c.dataset.ai;
      try { localStorage.setItem("ma-accent-i", String(accentI)); } catch (e) {}
      applyAccent();
    });
  });

  /* ============ night office ============ */
  var nightBtn = document.getElementById("night-btn");
  function setNight(on, persist) {
    document.body.classList.toggle("night", on);
    nightBtn.setAttribute("aria-pressed", String(on));
    nightBtn.innerHTML = on
      ? '[N] DAY SHIFT <span class="moon">&#9728;</span>'
      : '[N] NIGHT OFFICE <span class="moon">&#9686;</span>';
    if (persist) { try { localStorage.setItem("ma-night", on ? "1" : "0"); } catch (e) {} }
    applyAccent();
  }
  nightBtn.addEventListener("click", function () { setNight(!isNight(), true); });

  var nightPref = null;
  try { nightPref = localStorage.getItem("ma-night"); } catch (e) {}
  if (nightPref === null) {
    /* no opinion stored: the office goes dark on its own schedule */
    var dh = +new Intl.DateTimeFormat("en-GB", {
      timeZone: DESK_TZ, hour: "2-digit", hour12: false
    }).format(new Date());
    setNight(dh >= 23 || dh < 6, false);
  } else {
    setNight(nightPref === "1", false);
  }

  /* ============ visit counter ============ */
  var visitEl = document.getElementById("visit-n");
  if (visitEl) {
    var visits = 1;
    try {
      visits = (+(localStorage.getItem("ma-visits") || 0)) + 1;
      localStorage.setItem("ma-visits", String(visits));
    } catch (e) {}
    visitEl.textContent = String(Math.min(visits, 999)).padStart(3, "0");
  }

  /* ============ cairn scroll indicator ============ */
  var cairnSvg = document.getElementById("cairn-svg");
  var IND = [
    { cy: 108, rx: 16,   ry: 8,   seed: 11 },
    { cy: 93,  rx: 13.5, ry: 7,   seed: 23 },
    { cy: 79.5, rx: 11,  ry: 6.5, seed: 37 },
    { cy: 67.5, rx: 8.5, ry: 5.5, seed: 51 },
    { cy: 57.5, rx: 6,   ry: 4.5, seed: 66 }
  ];
  var indStones = IND.map(function (s, i) {
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(22, s.cy, s.rx, s.ry, s.seed));
    if (i === IND.length - 1) p.classList.add("top-stone");
    cairnSvg.appendChild(p);
    return p;
  });

  var scrollQueued = false;
  var pctEl = document.getElementById("scroll-pct");
  var lastPct = "";
  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(function () {
      scrollQueued = false;
      var max = document.documentElement.scrollHeight - innerHeight;
      var prog = max > 0 ? clamp(scrollY / max, 0, 1) : 1;
      indStones.forEach(function (p, i) {
        p.classList.toggle("on", prog >= (i + 1) * 0.19);
      });
      var pct = String(Math.round(prog * 100)).padStart(3, "0");
      if (pctEl && pct !== lastPct) {
        lastPct = pct;
        pctEl.textContent = pct; /* rewriting identical text still dirties layout */
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ visitors' cairn ============ */
  var pileEl = document.getElementById("pile");
  var yardEl = document.getElementById("yard-ground");
  var yardSvgEl = document.getElementById("yard-svg");
  var countEl = document.getElementById("yard-count");
  var GROUND_Y = 143;
  var STORE_KEY = "cairn-stones-v1";
  var MAX_STONES = 60;

  /* the studio's own stack, centre stage */
  var OURS = [
    { rx: 50, ry: 12, seed: 101 },
    { rx: 42, ry: 10, seed: 102 },
    { rx: 36, ry: 9,  seed: 103 },
    { rx: 30, ry: 8,  seed: 104 },
    { rx: 25, ry: 7,  seed: 105 },
    { rx: 20, ry: 6,  seed: 106 },
    { rx: 15, ry: 5,  seed: 107 }
  ];
  (function drawOurs() {
    var bottom = GROUND_Y + 1;
    OURS.forEach(function (s) {
      var p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", stonePath(500, bottom - s.ry, s.rx, s.ry, s.seed));
      pileEl.appendChild(p);
      bottom = bottom - 2 * s.ry + 3;
    });
  })();

  function loadStones() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function saveStones(arr) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  var visitorStones = loadStones();

  function drawStone(s, animate) {
    var g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "drop-wrap");
    g.setAttribute("transform", "translate(" + s.x + " 0)");
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(0, GROUND_Y - s.ry + 1, s.rx, s.ry, s.seed));
    if (s.sig) p.classList.add("signal");
    if (animate && !reduced()) p.classList.add("dropping");
    g.appendChild(p);
    pileEl.appendChild(g);
  }

  function updateCount() {
    var total = OURS.length + visitorStones.length;
    var verb = mqFine.matches ? "CLICK" : "TAP";
    countEl.textContent = total + " STONES — " + verb + " TO LEAVE YOURS";
  }

  visitorStones.forEach(function (s) { drawStone(s, false); });
  updateCount();

  function addStone(viewX) {
    var seed = Math.floor(Math.random() * 100000);
    var rnd = mulberry32(seed);
    var x = clamp(viewX, 40, 960);
    /* keep the studio's stack clear */
    if (Math.abs(x - 500) < 95) {
      x = 500 + (x >= 500 ? 1 : -1) * (95 + rnd() * 60);
    }
    var s = {
      x: Math.round(x),
      rx: Math.round(13 + rnd() * 14),
      ry: Math.round(6 + rnd() * 5),
      seed: seed,
      sig: (visitorStones.length % 9) === 8
    };
    visitorStones.push(s);
    if (visitorStones.length > MAX_STONES) {
      visitorStones.shift();
      /* re-render the pile without the eroded stone */
      Array.prototype.slice.call(pileEl.querySelectorAll("g.drop-wrap"))
        .forEach(function (n) { n.remove(); });
      visitorStones.forEach(function (st, i) {
        drawStone(st, i === visitorStones.length - 1);
      });
    } else {
      drawStone(s, true);
    }
    saveStones(visitorStones);
    updateCount();
  }

  yardEl.addEventListener("click", function (e) {
    var r = yardSvgEl.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width) * 1000;
    addStone(x);
  });
  yardEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addStone(80 + Math.random() * 840);
    }
  });

  /* for the ones who open the hood */
  console.log(
    "%cyou looked under here too? we'd get along. press M. — mark",
    "font-family: monospace; color: #C7361F;"
  );
})();
