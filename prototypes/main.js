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

  /* micro: plate margin notes set at 9px — dots at 1:1, legible only
     under the loupe */
  var PROJECTS = [
    { num: "01", dark: "#0E0E22", bright: "#2A2AF0", motif: "arcs",
      micro: "MRD-25 · PASS 2/4 · “MORE PREMIUM” MEANT QUIETER · APPROVED 03:12" },
    { num: "02", dark: "#160E2C", bright: "#8E7BFF", motif: "stripes",
      micro: "LRF-25 · WRONG STOCK, RIGHT ACCIDENT · KEPT IT" },
    { num: "03", dark: "#041D1C", bright: "#63D3C6", motif: "orbits",
      micro: "NOF-24 · BUILT AFTER 23:00 · OBVIOUSLY" },
    { num: "04", dark: "#22060F", bright: "#EE4E9B", motif: "steps",
      micro: "SGN-24 · SPLINTERS 11 · REGRETS 0" }
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
        '<rect width="800" height="1000" fill="url(#ht)" opacity="0.14"/>' +
        /* misregistered red proof pass, then the true pass */
        '<g transform="translate(6 4)" opacity="0.4">' + motifSVG(p.motif, "#C7361F") + "</g>" +
        motifSVG(p.motif, p.bright) +
        '<text x="30" y="985" font-family="Georgia, \'Times New Roman\', serif" font-size="560" ' +
          'font-weight="500" fill="#DDDBD4" opacity="0.16" letter-spacing="-30">' + p.num + '</text>' +
        '<g transform="rotate(-90 44 500)"><text x="44" y="500" text-anchor="middle" ' +
          'font-family="monospace" font-size="17" letter-spacing="5" fill="#DDDBD4" opacity="0.75">' +
          "M.A. &#8212; PROOF " + p.num + "/04 &#183; NOT FOR PRODUCTION</text></g>" +
        /* margin whispers — 9px on an 800-wide plate: loupe-only.
           kept inside the cover-crop safe band (y ≈ 250–780) */
        '<g font-family="monospace" font-size="9" letter-spacing="1.5" fill="#DDDBD4">' +
          '<text x="770" y="732" text-anchor="end" opacity="0.55">' + p.micro + '</text>' +
          '<text x="770" y="748" text-anchor="end" opacity="0.4">IF YOU CAN READ THIS YOU FOUND THE LOUPE</text>' +
        '</g>' +
        '<rect width="800" height="1000" filter="url(#gr)" opacity="0.14"/>' +
      '</svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  }

  var plates = PROJECTS.map(plateURI);

  /* ============ the thought-thread: the mess has a spine ============ */
  /* one continuous pencil line meandering from the top of the sheet to
     the outro, drawn in by your scroll — the chain of thought that
     connects the scrawls. mess-only. */
  var threadSvg = document.getElementById("thread");
  var threadPath = document.getElementById("thread-path");
  var threadLen = 0;
  var threadH = 1;
  var lastThreadOff = -1;
  function buildThread() {
    if (!threadSvg) return;
    var page = document.querySelector(".page");
    var W = page.clientWidth;
    var H = page.scrollHeight;
    threadH = H;
    threadSvg.setAttribute("viewBox", "0 0 " + W + " " + H);
    threadSvg.style.height = H + "px";
    var rnd = mulberry32(7);
    var pts = [[W * 0.24, 190]];
    var y = 190, side = 1;
    while (y < H - 420) {
      y += 300 + rnd() * 320;
      pts.push([W * (0.5 + side * (0.16 + rnd() * 0.24)), y + (rnd() - 0.5) * 90]);
      side = -side;
    }
    pts.push([W * 0.3, H - 260]); /* it ends at "Write to me." */
    function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length - 1; i++) {
      var m = mid(pts[i], pts[i + 1]);
      d += " Q" + pts[i][0].toFixed(1) + " " + pts[i][1].toFixed(1) +
           " " + m[0].toFixed(1) + " " + m[1].toFixed(1);
    }
    d += " L" + pts[pts.length - 1][0].toFixed(1) + " " + pts[pts.length - 1][1].toFixed(1);
    threadPath.setAttribute("d", d);
    threadLen = threadPath.getTotalLength();
    threadPath.style.strokeDasharray = threadLen + " " + threadLen;
    lastThreadOff = -1;
    updateThread();
  }
  function updateThread() {
    if (!threadLen) return;
    var f;
    if (stillMode || reduced()) {
      f = 1; /* fully drawn — no scroll choreography */
    } else {
      f = clamp((scrollY + innerHeight * 0.92) / threadH, 0, 1);
    }
    var off = Math.round(threadLen * (1 - f));
    if (off !== lastThreadOff) {
      lastThreadOff = off;
      threadPath.style.strokeDashoffset = off;
    }
  }

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
    /* one scrawl in the outro only exists 23:00–06:00 desk time */
    var h = deskHour();
    document.body.classList.toggle("late-desk", h >= 23 || h < 6);
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

  function deskHour() {
    return +new Intl.DateTimeFormat("en-GB", {
      timeZone: DESK_TZ, hour: "2-digit", hour12: false
    }).format(new Date());
  }

  function deskStatus() {
    var h = deskHour();
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
    "CTRL+P PRINTS A CLEAN PROOF",
    "PRESS S FOR PRESS NOISE",
    "HOLD L — THE LIGHT TABLE",
    "PRESS AND HOLD A PLATE — LOUPE",
    "SHIFT-DRAG THE HEADLINE — OFF REGISTER",
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
      /* while the loupe is down the sheet holds still — you move the
         glass, not the proof (also lets the glass reach the margins) */
      if (!loupeOn) {
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
      }

      var dotTf =
        "translate3d(" + mouse.x + "px," + mouse.y + "px,0) translate(-50%,-50%)";
      if (dotTf !== lastDotTf) {
        lastDotTf = dotTf;
        cursorEl.style.transform = dotTf;
      }

      /* the loupe rides the pointer over the plate — viewport math only.
         the plate is background-size: cover (plate art is 800×1000), so
         magnify the cover-fit rendering, crop offset included */
      if (loupeOn) {
        var wR = innerWidth * 0.30, hR = innerHeight * 0.38;
        var coverW, coverH;
        if (wR / hR > 0.8) { coverW = wR; coverH = wR / 0.8; }
        else { coverH = hR; coverW = hR * 0.8; }
        var ix = mouse.x - (plate.x - wR / 2) + (coverW - wR) / 2;
        var iy = mouse.y - (plate.y - hR / 2) + (coverH - hR) / 2;
        var loupeTf =
          "translate3d(" + mouse.x + "px," + mouse.y + "px,0) translate(-50%,-50%)";
        if (loupeTf !== lastLoupeTf) {
          lastLoupeTf = loupeTf;
          loupeEl.style.transform = loupeTf;
        }
        var bs = Math.round(coverW * LOUPE_M) + "px " + Math.round(coverH * LOUPE_M) + "px";
        var bp = Math.round(LOUPE_R - ix * LOUPE_M) + "px " +
                 Math.round(LOUPE_R - iy * LOUPE_M) + "px";
        if (bs !== lastLoupeBs) { lastLoupeBs = bs; loupeEl.style.backgroundSize = bs; }
        if (bp !== lastLoupeBp) { lastLoupeBp = bp; loupeEl.style.backgroundPosition = bp; }
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
      if (loupeOn) return; /* the glass is down — don't re-skin the sheet */
      indexEl.classList.add("is-hovering");
      rows.forEach(function (r) { r.classList.remove("is-active"); });
      row.classList.add("is-active");
      cursorLabel.textContent = "PROOF ↗";
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
      /* the glass is down: the sheet stays on the table until it lifts */
      if (loupeOn) { loupeLeftRow = true; return; }
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
        var impact = c.vy;
        c.y -= r.bottom - floor;
        c.vy = -c.vy * 0.42;
        c.vx *= 0.88;
        c.vr *= 0.8;
        if (Math.abs(c.vy) < 60) c.vy = 0;
        if (impact > 220) sndClack(clamp(impact / 1800, 0.12, 1));
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
      if (e.shiftKey) return; /* shift-drag is the plate pull */
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
      updateThread(); /* the thread meets you at your scroll position */
    } else {
      unwatchNotes();
    }
    catLife(on);
    /* the project sheet carries its own mess button — keep it honest */
    var pvm = document.getElementById("pv-mess");
    if (pvm) {
      pvm.textContent = on ? "OK, ENOUGH" : "SEE THE MESS";
      pvm.setAttribute("aria-pressed", String(on));
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
  var stillMode = document.documentElement.classList.contains("still");
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
  /* arrive at anchors instantly; smooth scrolling is for in-page moves.
     project hashes open their proof sheet instead (see the viewer). */
  if (location.hash && location.hash !== "#proof" && !/^#p-0[1-4]$/.test(location.hash)) {
    var landing = document.getElementById(location.hash.slice(1));
    if (landing) landing.scrollIntoView({ behavior: "instant", block: "start" });
  }
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "m" || e.key === "M" || e.key === "p" || e.key === "P") toggleProof();
    if (e.key === "n" || e.key === "N") setNight(!isNight(), true);
    if (e.key === "s" || e.key === "S") setNoise(!noiseOn);
    if (e.key === "l" || e.key === "L") setLit(true); /* keyup lets go */
    if (e.key === "Escape") {
      if (document.body.classList.contains("pv-open")) closeProject();
      else setProof(false);
    }
  });

  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      positionAnchors();
      buildThread();
    }, 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      positionAnchors();
      buildThread();
    });
  }
  buildThread();
  /* re-measure once the hero settles (proof may open mid-entrance) */
  var lastLine = document.querySelector(".hl-mask:nth-child(3) .hl");
  if (lastLine) lastLine.addEventListener("animationend", positionAnchors, { once: true });
  positionAnchors();

  /* the entrance masks release once the lines land, so commas and
     descenders render whole (they only exist for the rise) */
  function releaseMasks() { heroTitleEl.classList.add("landed"); }
  if (lastLine && !stillMode && !reduced()) {
    lastLine.addEventListener("animationend", releaseMasks, { once: true });
    setTimeout(releaseMasks, 2400); /* belt and braces */
  } else {
    releaseMasks();
  }

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
    var dh = deskHour();
    setNight(dh >= 23 || dh < 6, false);
  } else {
    setNight(nightPref === "1", false);
  }

  /* ============ visit counter — rolls like an odometer ============ */
  var visitEl = document.getElementById("visit-n");
  var odoReels = [];
  function odoDigits(n) {
    return String(Math.min(Math.max(n, 0), 999)).padStart(3, "0").split("");
  }
  function buildOdo(el, n) {
    el.textContent = "";
    odoReels = odoDigits(n).map(function (d, i) {
      var wrap = document.createElement("span");
      wrap.className = "odo";
      var reel = document.createElement("span");
      reel.className = "odo-reel";
      for (var k = 0; k <= 9; k++) {
        var s = document.createElement("span");
        s.textContent = String(k);
        reel.appendChild(s);
      }
      reel.style.transform = "translateY(-" + d + "em)";
      reel.style.transitionDelay = (i * 0.09) + "s";
      wrap.appendChild(reel);
      el.appendChild(wrap);
      return reel;
    });
  }
  function rollOdo(n) {
    odoDigits(n).forEach(function (d, i) {
      odoReels[i].style.transform = "translateY(-" + d + "em)";
    });
  }
  if (visitEl) {
    var prevVisits = 0, visits = 1;
    try {
      prevVisits = +(localStorage.getItem("ma-visits") || 0);
      visits = prevVisits + 1;
      localStorage.setItem("ma-visits", String(visits));
    } catch (e) {}
    if (reduced() || stillMode) {
      buildOdo(visitEl, visits);
    } else {
      buildOdo(visitEl, prevVisits);
      setTimeout(function () {
        document.body.classList.add("odo-live");
        requestAnimationFrame(function () { rollOdo(visits); });
      }, 1500);
    }
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
      /* the thought-thread draws in with the scroll (mess only) */
      if (document.body.classList.contains("proof")) updateThread();
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
      p.classList.add("house");
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

  /* every stone gets a number; older stones kept theirs implicitly */
  var stoneSeq = 0;
  try { stoneSeq = +(localStorage.getItem("ma-stone-seq") || 0); } catch (e) {}
  visitorStones.forEach(function (s, i) {
    if (!s.n) s.n = i + 1;
    if (s.n > stoneSeq) stoneSeq = s.n;
  });

  function drawStone(s, animate) {
    var g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "drop-wrap");
    g.setAttribute("transform", "translate(" + s.x + " 0)");
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(0, GROUND_Y - s.ry + 1, s.rx, s.ry, s.seed));
    if (s.n) p.dataset.n = String(s.n);
    if (s.t) p.dataset.t = String(s.t);
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
      sig: (visitorStones.length % 9) === 8,
      t: Date.now(),
      n: ++stoneSeq
    };
    try { localStorage.setItem("ma-stone-seq", String(stoneSeq)); } catch (e) {}
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
    setTimeout(sndTok, reduced() ? 80 : 400);
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

  /* ============ press noise: opt-in, muted by default ============ */
  /* two sounds total — a letterpress clack when thrown type lands,
     a stone tok when a visitor leaves one. nothing plays until the
     [S] decal is pressed, and the preference is never persisted:
     sound is a per-visit choice, not an ambush on the next load. */
  var noiseBtn = document.getElementById("noise-btn");
  var noiseOn = false;
  var audioCtx = null;
  function noiseCtx() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function sndClack(v) {
    if (!noiseOn) return;
    var ctx = noiseCtx();
    if (!ctx) return;
    var t = ctx.currentTime;
    /* metal type meets the bed: filtered noise tap over a wooden thump */
    var len = Math.floor(ctx.sampleRate * 0.05);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = 1.4;
    var g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.5 * v, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    src.connect(bp); bp.connect(g1); g1.connect(ctx.destination);
    src.start(t);
    var osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
    var g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.4 * v, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(g2); g2.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.1);
  }
  function sndTok() {
    if (!noiseOn) return;
    var ctx = noiseCtx();
    if (!ctx) return;
    var t = ctx.currentTime;
    /* stone on stone: one damped knock */
    var osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(720, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.06);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.12);
  }
  function setNoise(on) {
    noiseOn = !!on;
    if (noiseOn) noiseCtx();
    noiseBtn.setAttribute("aria-pressed", String(noiseOn));
    noiseBtn.innerHTML = noiseOn
      ? "[S] PRESS NOISE &mdash; ON"
      : "[S] PRESS NOISE &mdash; OFF";
    if (noiseOn) sndTok(); /* one knock so you know what you signed up for */
  }
  noiseBtn.addEventListener("click", function () { setNoise(!noiseOn); });

  /* ============ press check: the sheet comes into register ============ */
  /* once per session the hero loads as misregistered ink passes (red,
     blue, ink) that slide home while the regmark locks in. any input
     skips it; reduced motion and ?still never see it. */
  (function pressCheck() {
    if (reduced() || stillMode) return;
    var seen = false;
    try { seen = !!sessionStorage.getItem("ma-press-check"); } catch (e) {}
    if (seen) return;
    try { sessionStorage.setItem("ma-press-check", "1"); } catch (e) {}
    document.body.classList.add("press-check");
    var evs = ["keydown", "pointerdown", "wheel", "touchstart"];
    function endPress() {
      document.body.classList.remove("press-check");
      evs.forEach(function (ev) { removeEventListener(ev, endPress, true); });
    }
    evs.forEach(function (ev) {
      addEventListener(ev, endPress, { capture: true, passive: true });
    });
    setTimeout(endPress, 2600);
  })();

  /* ============ the regmark is also a fidget ============ */
  var regEl = document.querySelector(".regmark");
  regEl.addEventListener("click", function () {
    if (reduced()) return;
    regEl.classList.remove("fidget");
    void regEl.getBoundingClientRect(); /* restart mid-spin spins again */
    regEl.classList.add("fidget");
  });
  regEl.addEventListener("animationend", function (e) {
    if (e.animationName === "reg-fidget") regEl.classList.remove("fidget");
  });

  /* ============ the tab misses you ============ */
  var baseTitle = document.title;
  document.addEventListener("visibilitychange", function () {
    document.title = document.hidden
      ? "— come back, the kerning isn’t done"
      : baseTitle;
  });

  /* ============ idle whisper: two minutes of nothing ============ */
  var idleEl = document.getElementById("idle-line");
  var idleT = null;
  var idleLast = 0;
  var IDLE_MS = 120000;
  function idlePoke() {
    var now = performance.now();
    /* mousemove storms re-arm at most once a second */
    if (now - idleLast < 1000 && !idleEl.classList.contains("on")) return;
    idleLast = now;
    idleEl.classList.remove("on");
    clearTimeout(idleT);
    idleT = setTimeout(function () { idleEl.classList.add("on"); }, IDLE_MS);
  }
  if (!stillMode) {
    ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"]
      .forEach(function (ev) { addEventListener(ev, idlePoke, { passive: true }); });
    idlePoke();
  }

  /* ============ who left this one, and when ============ */
  var tipEl = document.getElementById("stone-tip");
  function stoneAge(t) {
    var d = Date.now() - t;
    if (d < 60000) return "JUST NOW";
    var m = Math.round(d / 60000);
    if (m < 60) return m + " MIN AGO";
    var h = Math.round(d / 3600000);
    if (h < 24) return h + (h === 1 ? " HOUR AGO" : " HOURS AGO");
    var days = Math.round(d / 86400000);
    return days === 1 ? "YESTERDAY" : days + " DAYS AGO";
  }
  pileEl.addEventListener("pointerover", function (e) {
    var p = e.target;
    if (p.tagName !== "path") return;
    if (p.classList.contains("house")) {
      tipEl.textContent = "THE HOUSE STACK — MINE";
    } else if (p.dataset.n) {
      var label = "Nº " + String(p.dataset.n).padStart(3, "0");
      if (p.dataset.t) label += " — " + stoneAge(+p.dataset.t);
      if (p.classList.contains("signal")) label += " · SIGNAL STONE";
      tipEl.textContent = label;
    } else return;
    var r = p.getBoundingClientRect();
    tipEl.style.left = (r.left + r.width / 2) + "px";
    tipEl.style.top = r.top + "px";
    tipEl.classList.add("on");
  });
  pileEl.addEventListener("pointerout", function (e) {
    if (e.target.tagName === "path") tipEl.classList.remove("on");
  });

  /* ============ the cat, alive at last (mess layer) ============ */
  var catEl = document.querySelector(".cat");
  var catT = null;
  function catLife(on) {
    clearTimeout(catT);
    if (!on || !catEl || reduced() || stillMode) return;
    (function nap() {
      catT = setTimeout(function () {
        /* only once she's been drawn in */
        if (catEl.classList.contains("seen")) catEl.classList.add("flick");
        nap();
      }, 6000 + Math.random() * 9000);
    })();
  }
  if (catEl) {
    catEl.addEventListener("animationend", function (e) {
      if (e.animationName === "tail-flick") catEl.classList.remove("flick");
    });
  }

  /* ============ tryout 1: the light table (hold L) ============ */
  /* momentary, no mode: while held, the sheet goes backlit and the
     mess bleeds through from underneath — dim, complete, in place */
  var lightBtn = document.getElementById("light-btn");
  function setLit(on) {
    if (on && document.body.classList.contains("proof")) on = false;
    document.body.classList.toggle("lit", on);
    lightBtn.setAttribute("aria-pressed", String(on));
  }
  lightBtn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    setLit(true);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
    lightBtn.addEventListener(ev, function () { setLit(false); });
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "l" || e.key === "L") setLit(false);
  });
  addEventListener("blur", function () { setLit(false); });

  /* ============ tryout 2: the printer's loupe ============ */
  /* press and hold a plate: the glass magnifies the halftone and the
     9px margin notes that are just dots at 1:1 */
  var loupeEl = document.getElementById("loupe");
  var LOUPE_M = 2.2, LOUPE_R = 92;
  var loupeOn = false, loupeUsed = false, loupeLeftRow = false;
  var lastLoupeTf = "", lastLoupeBs = "", lastLoupeBp = "";
  var loupeDelayT = null;
  rows.forEach(function (row) {
    row.addEventListener("pointerdown", function (e) {
      if (!trailEnabled() || !open || e.button !== 0) return;
      e.preventDefault();
      /* press-and-HOLD summons the glass; a quick click stays a click
         (and opens the project sheet instead) */
      clearTimeout(loupeDelayT);
      loupeDelayT = setTimeout(function () {
        loupeOn = true;
        loupeUsed = true;
        loupeEl.style.backgroundImage = plates[curPlate];
        loupeEl.classList.add("on");
        cursorEl.classList.add("is-loupe");
      }, 230);
    });
    /* a loupe press is not a navigation */
    row.addEventListener("click", function (e) {
      if (loupeUsed) { e.preventDefault(); loupeUsed = false; }
    });
  });
  /* the canceled pointerdown suppresses compat mousemove events, so
     feed the shared pointer position from pointermove while held */
  document.addEventListener("pointermove", function (e) {
    if (!loupeOn) return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener("pointerup", function () {
    clearTimeout(loupeDelayT);
    if (!loupeOn) return;
    loupeOn = false;
    loupeEl.classList.remove("on");
    cursorEl.classList.remove("is-loupe");
    if (loupeLeftRow) {
      /* the deferred mouseleave: put the sheet away too */
      loupeLeftRow = false;
      indexEl.classList.remove("is-hovering");
      rows.forEach(function (r) { r.classList.remove("is-active"); });
      cursorEl.classList.remove("is-view");
      scalerEl.style.transform = "scale(0)";
      open = false;
    }
  });

  /* ============ tryout 3: the plate pull (shift-drag the headline) ============ */
  /* the red and blue passes come off register and follow the hand,
     with resistance; release and they thunk back into register */
  var pullState = null;
  var lastPullShadow = "";
  function softPull(v) {
    return clamp(Math.sign(v) * Math.pow(Math.abs(v), 0.72) * 2.2, -110, 110);
  }
  heroTitleEl.addEventListener("pointerdown", function (e) {
    if (!e.shiftKey || !trailEnabled() || reduced()) return;
    if (document.body.classList.contains("proof")) return;
    e.preventDefault();
    pullState = { x: e.clientX, y: e.clientY };
    heroTitleEl.classList.remove("plates-return");
    cursorEl.classList.add("is-grab");
    cursorLabel.textContent = "OFF REGISTER";
  });
  document.addEventListener("pointermove", function (e) {
    if (!pullState) return;
    var rx = softPull(e.clientX - pullState.x);
    var ry = softPull(e.clientY - pullState.y);
    var shadow =
      Math.round(rx * 0.75) + "px " + Math.round(ry * 0.75) + "px 0 var(--pencil), " +
      Math.round(rx * -0.55) + "px " + Math.round(ry * -0.55) + "px 0 var(--accent)";
    if (shadow !== lastPullShadow) {
      lastPullShadow = shadow;
      heroTitleEl.style.textShadow = shadow;
    }
  });
  document.addEventListener("pointerup", function () {
    if (!pullState) return;
    pullState = null;
    heroTitleEl.classList.add("plates-return");
    heroTitleEl.style.textShadow = "0 0 0 var(--pencil), 0 0 0 var(--accent)";
    cursorLabel.textContent = "GRAB";
    setTimeout(function () {
      heroTitleEl.classList.remove("plates-return");
      heroTitleEl.style.textShadow = "";
      lastPullShadow = "";
    }, 600);
  });

  /* ============ the project viewer: every project is a proof sheet ============ */
  /* awwwards case-study anatomy, in this site's language: context-first
     meta rail, plate hero, THE BRIEF / THE NERVE, specimen details,
     outcome figures, a quote, and a giant NEXT PROOF handoff.
     placeholder copy throughout — awaiting mark's real projects. */
  var CASE = [
    {
      client: "Meridian Climate, Inc.",
      role: "Identity · Art direction · Design & build",
      stack: "Figma · TypeScript · WebGL",
      when: "Feb–Mar 2025 · six weeks",
      brief: "Meridian turns satellite data into climate-risk reports for banks. They arrived with a deck full of gradients and the word “premium” underlined twice. What they actually needed was to look like the only adults in a room full of dashboards.",
      nerve: "I threw out the gradients and set the whole identity in one serif and one mono — the data does the talking, the type holds its nerve. Their live feeds render as slow, quiet WebGL fields instead of dashboard confetti. The client asked for more premium. I made it quieter.",
      made: ["Wordmark & type system", "Report template suite", "Marketing site, design → build", "Data-field WebGL renderer"],
      outcome: [["6", "WEEKS, SKETCH TO LAUNCH"], ["1", "TYPEFACE — THEY HAD SEVEN"], ["+38%", "TIME ON PAGE"]],
      quote: "“We asked for premium. He gave us calm. Turns out that’s what premium is.”",
      attr: "CEO, MERIDIAN",
      notes: [
        { pen: "hand-k", pos: "n-pv1", text: "the ceo said “premium” nine times. i counted." },
        { pen: "hand-b", pos: "n-pv2", text: "quiet won." },
        { pen: "hand-k", pos: "n-pv3", text: "six weeks. never again. (again.)" }
      ]
    },
    {
      client: "Ana Vasquez, sculptor",
      role: "Art direction · Typesetting · Print production",
      stack: "InDesign · Litho · Two stocks",
      when: "2025 · 240 pages",
      brief: "A 240-page monograph for a sculptor who works in plaster and shadow. The catalogue-raisonné problem, stated plainly: how do you print work whose entire point is that it barely photographs?",
      nerve: "We shot everything in raking light and printed the plates in a duotone of black and a custom warm grey — no full colour anywhere in the book. The first proof came back on the wrong stock: textured, not coated. It made the plaster look like plaster. We kept it, and reprinted the cover to match the mistake.",
      made: ["Book design & typesetting", "Plate photography direction", "Four press checks", "Slipcase edition of 200"],
      outcome: [["240", "PAGES, ONE PAIR OF HANDS"], ["2", "INKS — THAT’S THE POINT"], ["200", "SLIPCASES, SOLD OUT"]],
      quote: "“He argued with the printer about grey for an hour. The book won.”",
      attr: "ANA VASQUEZ",
      notes: [
        { pen: "hand-k", pos: "n-pv1", text: "grey Nº4 was correct. fight me." },
        { pen: "hand-b", pos: "n-pv2", text: "the wrong stock was the right stock." },
        { pen: "hand-b", pos: "n-pv3", text: "ana cried at the unboxing. me too, quietly." }
      ]
    },
    {
      client: "Renderhaus GmbH",
      role: "Product design · Front-end · The whole thing",
      stack: "TypeScript · WebGL · WebSockets",
      when: "2024 · in production",
      brief: "A render farm needed a dashboard their artists could leave open all night — four hundred machines, thousands of jobs, and every existing tool looked like a spreadsheet having a panic attack.",
      nerve: "Dark by default, quiet by design: the interface only speaks when something needs a human. Job queues render as a slow field of embers — brighter means hotter. Alarms are typographic, never red. It’s the only dashboard I know of that people screenshot for fun.",
      made: ["Information architecture", "Design system, dark-first", "WebGL job-field visualisation", "Production build, TypeScript"],
      outcome: [["400", "MACHINES, ONE SCREEN"], ["0", "RED, ANYWHERE"], ["23:00", "WHEN IT LOOKS BEST"]],
      quote: "“Our night shift refuses to use anything else. So does our day shift.”",
      attr: "HEAD OF PIPELINE, RENDERHAUS",
      notes: [
        { pen: "hand-k", pos: "n-pv1", text: "shipped v1 at 03:40. obviously." },
        { pen: "hand-b", pos: "n-pv2", text: "fav. still fav." },
        { pen: "hand-k", pos: "n-pv3", text: "the embers were a bug. promoted to feature." }
      ]
    },
    {
      client: "Stadtwerke Kulturfonds",
      role: "Concept · Fabrication · Code",
      stack: "RF sensors · LEDs · C++ · Plywood",
      when: "2024 · public installation",
      brief: "A commission to make the city’s invisible radio traffic visible in a public square — without a single screen. The brief said “family friendly.” I heard “must survive toddlers.”",
      nerve: "One hundred and twelve stalks of light in a plywood meadow, each listening to its own slice of spectrum. Phones make ripples. A passing tram makes weather. I built the lot — sensors, boards, firmware, joinery — and I am still pulling splinters from my palms. Still worth it.",
      made: ["Concept & spatial design", "Sensor + LED hardware", "Firmware, C++", "Fabrication — three weeks on site"],
      outcome: [["112", "STALKS OF LIGHT"], ["6", "WEEKS OUTDOORS, ZERO FAILURES"], ["1", "TODDLER-PROOF MEADOW"]],
      quote: "“The square has a heartbeat now.”",
      attr: "COMMISSIONING CURATOR",
      notes: [
        { pen: "hand-k", pos: "n-pv1", text: "splinter count: eleven. worth it." },
        { pen: "hand-b", pos: "n-pv2", text: "a tram went past and it rained light." },
        { pen: "hand-k", pos: "n-pv3", text: "the toddlers tried. the meadow held." }
      ]
    }
  ];

  /* specimen details: two generated close-ups per project */
  function detailURI(p, v) {
    var inner = v === 0
      ? '<g transform="translate(-260 -160) scale(2.1)" opacity="0.9">' + motifSVG(p.motif, p.bright) + "</g>"
      : '<g transform="translate(10 7)" opacity="0.35">' + motifSVG(p.motif, "#C7361F") + "</g>" +
        '<g opacity="0.92">' + motifSVG(p.motif, p.bright) + "</g>";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">' +
      '<rect width="1200" height="760" fill="' + p.dark + '"/>' +
      '<g transform="translate(200 -60)">' + inner + "</g>" +
      '<text x="30" y="736" font-family="monospace" font-size="15" letter-spacing="4" fill="#DDDBD4" opacity="0.7">DETAIL 0' +
      (v + 1) + " &#183; PLATE " + p.num + " &#183; NOT FOR PRODUCTION</text>" +
      "</svg>";
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  }

  var pvEl = document.getElementById("pv");
  var pvIdx = -1;

  function buildPV(i) {
    var p = PROJECTS[i];
    var c = CASE[i];
    var row = rows[i];
    var title = row.querySelector(".row-title").textContent;
    var kind = row.querySelector(".row-meta").childNodes[0].textContent;
    var ref = row.querySelector(".row-ref").textContent;
    var desc = row.querySelector(".row-desc").textContent;
    var next = (i + 1) % PROJECTS.length;
    var nextTitle = rows[next].querySelector(".row-title").textContent;
    return '' +
      '<div class="pv-sheet">' +
        '<span class="pv-num" aria-hidden="true">' + p.num + '</span>' +
        '<button class="pv-close mono" id="pv-close" type="button">CLOSE &#10005; <em>ESC</em></button>' +
        '<button class="pv-messbtn mono" id="pv-mess" type="button"></button>' +
        '<header class="pv-head">' +
          '<p class="pv-kicker mono">PROOF SHEET Nº 0' + (i + 2) + " &middot; " + ref + " &middot; " + kind + "</p>" +
          '<h2 class="pv-title">' + title + "</h2>" +
          '<p class="pv-lede">' + desc + "</p>" +
        "</header>" +
        '<div class="pv-grid">' +
          '<aside class="pv-meta mono">' +
            '<div><span>CLIENT</span>' + c.client + "</div>" +
            '<div><span>ROLE</span>' + c.role + "</div>" +
            '<div><span>STACK</span>' + c.stack + "</div>" +
            '<div><span>WHEN</span>' + c.when + "</div>" +
            '<div><span>MADE</span><ul>' + c.made.map(function (m) { return "<li>" + m + "</li>"; }).join("") + "</ul></div>" +
          "</aside>" +
          '<div class="pv-body">' +
            '<figure class="pv-plate"></figure>' +
            '<h3 class="mono">THE BRIEF</h3><p>' + c.brief + "</p>" +
            '<h3 class="mono">THE NERVE</h3><p>' + c.nerve + "</p>" +
            '<div class="pv-duo"><figure></figure><figure></figure></div>' +
            '<ul class="pv-stats">' + c.outcome.map(function (o) {
              return '<li><b>' + o[0] + "</b><span class=\"mono\">" + o[1] + "</span></li>";
            }).join("") + "</ul>" +
            '<blockquote class="pv-quote">' + c.quote + '<footer class="mono">' + c.attr + "</footer></blockquote>" +
          "</div>" +
        "</div>" +
        '<a class="pv-next" id="pv-next" href="#p-0' + (next + 1) + '" data-next="' + next + '">' +
          '<span class="mono">NEXT PROOF &mdash; 0' + (next + 1) + "</span><b>" + nextTitle + " &rarr;</b></a>" +
        '<span class="pv-jobline mono" aria-hidden="true">SHEET Nº 0' + (i + 2) + " &middot; " + title.toUpperCase() + " &middot; MARK AXELUS &middot; WORKING PROOF</span>" +
        '<div class="proof-notes pv-notes" aria-hidden="true">' + c.notes.map(function (n, k) {
          return '<span class="note ' + n.pen + " " + n.pos + '" style="--d:.' + (2 + k * 3) + 's">' + n.text + "</span>";
        }).join("") + "</div>" +
      "</div>";
  }

  function openProject(i) {
    pvIdx = i;
    pvEl.innerHTML = buildPV(i);
    /* data-URI backgrounds carry quotes — assign as properties */
    pvEl.querySelector(".pv-plate").style.backgroundImage = plates[i];
    var duo = pvEl.querySelectorAll(".pv-duo figure");
    duo[0].style.backgroundImage = detailURI(PROJECTS[i], 0);
    duo[1].style.backgroundImage = detailURI(PROJECTS[i], 1);
    document.body.classList.add("pv-open");
    document.documentElement.classList.add("pv-open");
    pvEl.scrollTop = 0;
    var target = "#p-0" + (i + 1);
    if (location.hash !== target) history.pushState(null, "", target);
    document.getElementById("pv-close").addEventListener("click", closeProject);
    var pvm = document.getElementById("pv-mess");
    pvm.textContent = document.body.classList.contains("proof") ? "OK, ENOUGH" : "SEE THE MESS";
    pvm.addEventListener("click", toggleProof);
    document.getElementById("pv-next").addEventListener("click", function (e) {
      e.preventDefault();
      openProject(+this.dataset.next);
    });
    /* if the mess is already open, let it annotate this sheet too */
    if (messObserver) {
      Array.prototype.slice.call(pvEl.querySelectorAll(".note")).forEach(function (el) {
        messObserver.observe(el);
      });
    } else if (document.body.classList.contains("proof")) {
      /* ?still has no observer — the notes are simply there */
      Array.prototype.slice.call(pvEl.querySelectorAll(".note")).forEach(function (el) {
        el.classList.add("seen");
      });
    }
  }
  function closeProject() {
    if (pvIdx < 0) return;
    pvIdx = -1;
    document.body.classList.remove("pv-open");
    document.documentElement.classList.remove("pv-open");
    if (location.hash) history.pushState(null, "", location.pathname + location.search);
    pvEl.innerHTML = "";
  }
  rows.forEach(function (row) {
    row.addEventListener("click", function (e) {
      if (e.defaultPrevented) return; /* that was a loupe press */
      e.preventDefault();
      openProject(+row.dataset.plate);
    });
  });
  /* deep links: /#p-03 opens the sheet directly; the back button works */
  if (/^#p-0[1-4]$/.test(location.hash)) {
    openProject(+location.hash.slice(3) - 1);
  }
  addEventListener("hashchange", function () {
    if (/^#p-0[1-4]$/.test(location.hash)) {
      openProject(+location.hash.slice(3) - 1);
    } else if (pvIdx >= 0) {
      closeProject();
    }
  });

  /* ============ the page is awake ============ */
  /* every so often the page does one small unprompted thing: a letter
     rattles loose in its case, a decal re-decodes itself, the regmark
     corrects its drift. one act at a time; never in the mess (the cat
     has that shift), never when the tab is hidden, never under reduced
     motion or ?still. */
  function actRattle() {
    var live = chars.filter(function (c) { return !c.loose; });
    if (!live.length) return;
    var c = live[(Math.random() * live.length) | 0];
    c.el.classList.add("rattle");
    setTimeout(function () { c.el.classList.remove("rattle"); }, 650);
  }
  var MUTTER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—□";
  var mutterables = Array.prototype.slice.call(
    document.querySelectorAll(".decode .c1")
  ).filter(function (el) { return el.children.length === 0; });
  var muttering = false;
  function actMutter() {
    if (muttering || !mutterables.length) return;
    muttering = true;
    var el = mutterables[(Math.random() * mutterables.length) | 0];
    var orig = el.textContent;
    var f = 0, TOTAL = 9;
    var iv = setInterval(function () {
      f++;
      if (f >= TOTAL) {
        clearInterval(iv);
        el.textContent = orig;
        muttering = false;
        return;
      }
      var settled = Math.floor((f / TOTAL) * orig.length);
      var out = orig.slice(0, settled);
      for (var i = settled; i < orig.length; i++) {
        var ch = orig[i];
        out += (ch === " " || ch === " ")
          ? ch
          : MUTTER_CHARS[(Math.random() * MUTTER_CHARS.length) | 0];
      }
      el.textContent = out;
    }, 48);
  }
  function actHiccup() {
    regEl.classList.add("hiccup");
  }
  regEl.addEventListener("animationend", function (e) {
    if (e.animationName === "reg-hiccup") regEl.classList.remove("hiccup");
  });

  /* the rattle carries discovery weight (loose type), so it comes up more */
  var ACTS = [actRattle, actMutter, actHiccup, actRattle];
  var lifeT = null;
  function scheduleLife() {
    lifeT = setTimeout(function () {
      if (!document.hidden && !document.body.classList.contains("proof")) {
        ACTS[(Math.random() * ACTS.length) | 0]();
      }
      scheduleLife();
    }, 9000 + Math.random() * 13000);
  }
  if (!reduced() && !stillMode) scheduleLife();

  /* for the ones who open the hood */
  console.log(
    "%cyou looked under here too? we'd get along. press M. — mark",
    "font-family: monospace; color: #C7361F;"
  );
})();
