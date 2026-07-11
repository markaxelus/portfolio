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
     under the loupe. `g` is the field's ink-to-accent gradient depth —
     the only per-plate variation; the motif does the rest. no exotic
     hues: every plate runs paper + ink + the red working pass, in the
     current accent (three inks, four plates — told apart by what's on
     them, not by colour). */
  var PROJECTS = [
    { num: "01", motif: "arcs",    g: 0.32,
      micro: "MRD-25 · PASS 2/4 · “MORE PREMIUM” MEANT QUIETER · APPROVED 03:12" },
    { num: "02", motif: "stripes", g: 0.52,
      micro: "LRF-25 · WRONG STOCK, RIGHT ACCIDENT · KEPT IT" },
    { num: "03", motif: "orbits",  g: 0.4,
      micro: "NOF-24 · BUILT AFTER 23:00 · OBVIOUSLY" },
    { num: "04", motif: "steps",   g: 0.6,
      micro: "SGN-24 · SPLINTERS 11 · REGRETS 0" }
  ];

  /* the paint chips pick the site accent; the plates print in it too.
     defined up here (not with the chip handlers below) so the first
     plate build already knows the stored accent. the plate is a dark
     tile lit the same in any room — like the operator's plate — so it
     always takes the luminous (night) variant. */
  var ACCENTS = [
    { day: "#2A2AF0", night: "#7C7CFF" },  /* signal */
    { day: "#D6246E", night: "#FF5FA2" },  /* magenta */
    { day: "#6E7D00", night: "#C6D600" }   /* acid */
  ];
  var accentI = 0;
  try { accentI = Math.min(2, Math.max(0, +(localStorage.getItem("ma-accent-i") || 0))); } catch (e) {}
  function plateAccent() { return ACCENTS[accentI].night; }
  var PLATE_INK = "#16150F", PLATE_PAPER = "#DDDBD4", PLATE_RED = "#C7361F";

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

  function plateURI(p, accent) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
        '<defs>' +
          '<linearGradient id="duo" x1="0" y1="0" x2="0.9" y2="1.15">' +
            '<stop offset="0" stop-color="' + PLATE_INK + '"/>' +
            '<stop offset="1" stop-color="' + accent + '" stop-opacity="' + p.g + '"/>' +
          '</linearGradient>' +
          '<pattern id="ht" width="9" height="9" patternUnits="userSpaceOnUse">' +
            '<circle cx="4.5" cy="4.5" r="1.5" fill="' + accent + '"/>' +
          '</pattern>' +
          '<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>' +
          '<feColorMatrix type="saturate" values="0"/></filter>' +
        '</defs>' +
        /* paper never shows through — this is a press plate, not a duotone;
           the ink field, the accent pass, and one red pass off register */
        '<rect width="800" height="1000" fill="' + PLATE_INK + '"/>' +
        '<rect width="800" height="1000" fill="url(#duo)"/>' +
        '<rect width="800" height="1000" fill="url(#ht)" opacity="0.14"/>' +
        '<g transform="translate(6 4)" opacity="0.42">' + motifSVG(p.motif, PLATE_RED) + "</g>" +
        motifSVG(p.motif, accent) +
        '<text x="30" y="985" font-family="Georgia, \'Times New Roman\', serif" font-size="560" ' +
          'font-weight="500" fill="' + PLATE_PAPER + '" opacity="0.14" letter-spacing="-30">' + p.num + '</text>' +
        '<g transform="rotate(-90 44 500)"><text x="44" y="500" text-anchor="middle" ' +
          'font-family="monospace" font-size="17" letter-spacing="5" fill="' + PLATE_PAPER + '" opacity="0.72">' +
          "M.A. &#8212; PROOF " + p.num + "/04 &#183; NOT FOR PRODUCTION</text></g>" +
        /* margin whispers — 9px on an 800-wide plate: loupe-only.
           kept inside the cover-crop safe band (y ≈ 250–780) */
        '<g font-family="monospace" font-size="9" letter-spacing="1.5" fill="' + PLATE_PAPER + '">' +
          '<text x="770" y="732" text-anchor="end" opacity="0.55">' + p.micro + '</text>' +
          '<text x="770" y="748" text-anchor="end" opacity="0.4">IF YOU CAN READ THIS YOU FOUND THE LOUPE</text>' +
        '</g>' +
        '<rect width="800" height="1000" filter="url(#gr)" opacity="0.14"/>' +
      '</svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  }

  var plates = PROJECTS.map(function (p) { return plateURI(p, plateAccent()); });

  /* ============ the thought-thread: THE RE-READ ============ */
  /* the line is Mark re-reading his own margins at 2am. it routes
     note-to-note through the real scrawl positions, circles what
     matters, ties a hesitation knot, throws one dead-end spur toward
     "one more pass" and scratches it out, changes pens at the record
     (midnight), and lands as an arrow on "Write to me." — the tour of
     the mess ends at contact. a tip-dot rides the head of the stroke:
     the line is being written now, not revealed. */
  var threadSvg = document.getElementById("thread");
  var thA = document.getElementById("th-a");
  var thAe = document.getElementById("th-a-echo");
  var thB = document.getElementById("th-b");
  var thBe = document.getElementById("th-b-echo");
  var thSpur = document.getElementById("th-spur");
  var thScratch = document.getElementById("th-scratch");
  var thArrow = document.getElementById("th-arrow");
  var thTip = document.getElementById("th-tip");
  var thLenA = 0, thLenB = 0;
  var thSamples = [];
  var thSpurLen = 0;
  var lastThA = -1, lastThB = -1, lastTipOnB = false;

  function pageRect(sel) {
    var n = document.querySelector(sel);
    if (!n) return null;
    var r = n.getBoundingClientRect();
    if (r.width < 3) return null; /* hidden at this breakpoint */
    return {
      x: r.left + r.width / 2, y: r.top + scrollY + r.height / 2,
      w: r.width, h: r.height,
      left: r.left, right: r.right,
      top: r.top + scrollY, bottom: r.bottom + scrollY
    };
  }
  function buildThread() {
    if (!threadSvg) return;
    var page = document.querySelector(".page");
    var W = page.clientWidth;
    var H = page.scrollHeight;
    threadSvg.setAttribute("viewBox", "0 0 " + W + " " + H);
    threadSvg.style.height = H + "px";
    var rnd = mulberry32(7);

    var drafts = pageRect(".drafts"), amp = pageRect("#amp"), lh = pageRect(".n-lh"),
        nosc = pageRect(".n-noscale"), y2022 = pageRect(".n-2022"), ttt = pageRect(".dd-ttt"),
        argue = pageRect(".argue"), coffee = pageRect(".coffee"), vinyl = pageRect(".dd-vinyl"),
        todo = pageRect(".todo"), rip = pageRect(".dd-rip"), write = pageRect("#write-link");

    var pts = [];
    var penChangeAt = -1;
    var spurFrom = null;
    function push(x, y) { pts.push([x, y]); }
    function jitterTo(x, y) {
      /* long transits wander twice — a hand never draws a chord */
      var p = pts[pts.length - 1];
      var dist = Math.abs(x - p[0]) + Math.abs(y - p[1]);
      if (dist > 650) {
        push(p[0] + (x - p[0]) * 0.33 + (rnd() - 0.5) * 160, p[1] + (y - p[1]) * 0.33 + (rnd() - 0.5) * 70);
        push(p[0] + (x - p[0]) * 0.7 + (rnd() - 0.5) * 160, p[1] + (y - p[1]) * 0.7 + (rnd() - 0.5) * 70);
      } else {
        push((p[0] + x) / 2 + (rnd() - 0.5) * 100, (p[1] + y) / 2 + (rnd() - 0.5) * 60);
      }
      push(x, y);
    }
    function loop(r, padX, padY) {
      /* a journaling circle, 1.2 turns, entered from wherever we are */
      var rx = r.w / 2 + padX, ry = r.h / 2 + padY;
      var N = 9, steps = Math.floor(N * 1.22);
      for (var i = 0; i <= steps; i++) {
        var a = Math.PI + (i / N) * Math.PI * 2;
        push(r.x + Math.cos(a) * rx * (1 + (rnd() - 0.5) * 0.16),
             r.y + Math.sin(a) * ry * (1 + (rnd() - 0.5) * 0.16));
      }
    }
    function knot(x, y) {
      /* the pen hesitates: a small tightening tangle */
      for (var i = 0; i <= 15; i++) {
        var a = (i / 7.5) * Math.PI * 2;
        var rr = 7 + i * 0.9;
        push(x + Math.cos(a) * rr * 1.5, y + Math.sin(a) * rr);
      }
    }

    push(W * 0.3, 150);
    if (drafts) jitterTo(drafts.left - 36, drafts.y);
    if (amp) jitterTo(amp.x + amp.w * 0.62 + 30, amp.y);
    if (lh) jitterTo(lh.x, lh.bottom + 14);
    if (nosc) jitterTo(nosc.x, nosc.top - 16);
    var prev = pts[pts.length - 1];
    knot(W * (0.42 + rnd() * 0.2), prev[1] + (y2022 ? (y2022.y - prev[1]) * 0.5 : 400));
    if (y2022) jitterTo(y2022.x, y2022.bottom + 12);
    if (ttt) { jitterTo(ttt.left - 26, ttt.y); loop(ttt, 26, 22); }
    spurFrom = pts[pts.length - 1].slice();
    if (coffee) { jitterTo(coffee.left - 18, coffee.y); loop(coffee, 12, 10); }
    if (vinyl) { jitterTo(vinyl.right + 26, vinyl.y); penChangeAt = pts.length - 1; }
    if (todo) { jitterTo(todo.left - 24, todo.y); loop(todo, 20, 16); }
    if (rip) jitterTo(rip.x, rip.top - 18);
    if (write) jitterTo(write.x - write.w * 0.2, write.top - 26);
    else jitterTo(W * 0.3, H - 240);

    if (penChangeAt < 0) penChangeAt = Math.floor(pts.length * 0.6);

    function smooth(list) {
      if (list.length < 2) return "";
      var d = "M" + list[0][0].toFixed(1) + " " + list[0][1].toFixed(1);
      for (var i = 1; i < list.length - 1; i++) {
        var mx = (list[i][0] + list[i + 1][0]) / 2;
        var my = (list[i][1] + list[i + 1][1]) / 2;
        d += " Q" + list[i][0].toFixed(1) + " " + list[i][1].toFixed(1) +
             " " + mx.toFixed(1) + " " + my.toFixed(1);
      }
      return d + " L" + list[list.length - 1][0].toFixed(1) + " " + list[list.length - 1][1].toFixed(1);
    }
    var listA = pts.slice(0, penChangeAt + 1);
    var listB = pts.slice(penChangeAt);
    thA.setAttribute("d", smooth(listA));
    thAe.setAttribute("d", smooth(listA));
    thB.setAttribute("d", smooth(listB));
    thBe.setAttribute("d", smooth(listB));
    thLenA = thA.getTotalLength();
    thLenB = thB.getTotalLength();
    [[thA, thLenA], [thAe, thLenA], [thB, thLenB], [thBe, thLenB]].forEach(function (pl) {
      pl[0].style.strokeDasharray = pl[1] + " " + pl[1];
    });

    /* the spur: a thought toward "one more pass" — abandoned, scratched */
    if (spurFrom && argue) {
      var sx = spurFrom[0], sy = spurFrom[1];
      var tx = argue.left - 20, ty = argue.y;
      thSpur.setAttribute("d",
        "M" + sx.toFixed(1) + " " + sy.toFixed(1) +
        " Q" + ((sx + tx) / 2 + 40).toFixed(1) + " " + ((sy + ty) / 2 - 60).toFixed(1) +
        " " + tx.toFixed(1) + " " + ty.toFixed(1));
      var mx2 = (sx + tx) / 2 + 12, my2 = (sy + ty) / 2 - 26;
      thScratch.setAttribute("d",
        "M" + (mx2 - 48).toFixed(1) + " " + (my2 + 2).toFixed(1) +
        " L" + (mx2 + 48).toFixed(1) + " " + (my2 - 12).toFixed(1) +
        " M" + (mx2 - 42).toFixed(1) + " " + (my2 + 14).toFixed(1) +
        " L" + (mx2 + 42).toFixed(1) + " " + (my2 - 24).toFixed(1));
      thSpurLen = 0;
      for (var s = 0; s <= 80; s++) {
        var q = thA.getPointAtLength(thLenA * s / 80);
        if (Math.abs(q.x - sx) + Math.abs(q.y - sy) < 26) { thSpurLen = thLenA * s / 80; break; }
      }
      if (!thSpurLen) thSpurLen = thLenA * 0.7;
    } else {
      thSpur.removeAttribute("d");
      thScratch.removeAttribute("d");
      thSpurLen = 0;
    }

    /* the arrowhead, landing on the CTA */
    var end = pts[pts.length - 1];
    thArrow.setAttribute("d",
      "M" + (end[0] - 15).toFixed(1) + " " + (end[1] - 16).toFixed(1) +
      " L" + end[0].toFixed(1) + " " + end[1].toFixed(1) +
      " M" + (end[0] - 18).toFixed(1) + " " + (end[1] + 3).toFixed(1) +
      " L" + end[0].toFixed(1) + " " + end[1].toFixed(1));

    /* reading samples: monotonic max-y → drawn length (this is what
       makes the reveal dart between notes and linger inside loops) */
    thSamples = [];
    var maxY = 0, K = 400, k, q2;
    for (k = 0; k <= K; k++) {
      q2 = thA.getPointAtLength(thLenA * k / K);
      maxY = Math.max(maxY, q2.y);
      thSamples.push({ p: 0, len: thLenA * k / K, y: maxY });
    }
    for (k = 0; k <= K; k++) {
      q2 = thB.getPointAtLength(thLenB * k / K);
      maxY = Math.max(maxY, q2.y);
      thSamples.push({ p: 1, len: thLenB * k / K, y: maxY });
    }
    lastThA = -1;
    lastThB = -1;
    thCur = 0;
    updateThread();
  }

  /* the pen has a speed: the drawn length chases the scroll target
     through a capped lerp, so the stroke FLOWS — no snapping, no
     chunks appearing at once, however hard you scroll */
  var thCur = 0, thTgt = 0, thAnimOn = false, thPrevT = 0;
  var TH_SPEED = 3600; /* px of stroke per second, at full sprint */

  function updateThread(entering) {
    if (!thSamples.length) return;
    var full = stillMode || reduced();
    var target = full ? Infinity : scrollY + innerHeight * 0.86;
    var lo = 0, hi = thSamples.length - 1;
    while (lo < hi) {
      var mid = (lo + hi + 1) >> 1;
      if (thSamples[mid].y <= target) lo = mid; else hi = mid - 1;
    }
    var s = thSamples[lo];
    var total = s.p === 0 ? s.len : thLenA + s.len;
    if (thSamples[0].y > target) total = 0;
    thTgt = total;
    if (full) {
      thCur = thTgt;
      threadRender();
      return;
    }
    /* ONLY on mess-entry: retrace just the last stretch instead of
       re-writing the whole tour from the top. never during scroll —
       the pen's speed cap is what keeps the stroke continuous. */
    if (entering === true && thTgt - thCur > 1100) thCur = thTgt - 1100;
    if (!thAnimOn) {
      thAnimOn = true;
      thPrevT = performance.now();
      requestAnimationFrame(threadStep);
    }
  }
  function threadStep(now) {
    if (!document.body.classList.contains("proof")) {
      thCur = thTgt;
      threadRender();
      thAnimOn = false;
      return;
    }
    var dt = Math.min(0.05, (now - thPrevT) / 1000);
    thPrevT = now;
    var diff = thTgt - thCur;
    if (Math.abs(diff) < 0.6) {
      thCur = thTgt;
      threadRender();
      thAnimOn = false;
      return;
    }
    var step = clamp(diff * 0.16, -TH_SPEED * dt, TH_SPEED * dt);
    if (Math.abs(step) < 1.4) step = Math.sign(diff) * Math.min(Math.abs(diff), 1.4);
    thCur += step;
    threadRender();
    requestAnimationFrame(threadStep);
  }
  function threadRender() {
    var lenA = Math.min(thLenA, thCur);
    var lenB = Math.max(0, Math.min(thLenB, thCur - thLenA));
    var offA = (thLenA - lenA).toFixed(1);
    var offB = (thLenB - lenB).toFixed(1);
    if (offA !== lastThA) {
      lastThA = offA;
      thA.style.strokeDashoffset = offA;
      thAe.style.strokeDashoffset = offA;
    }
    if (offB !== lastThB) {
      lastThB = offB;
      thB.style.strokeDashoffset = offB;
      thBe.style.strokeDashoffset = offB;
    }
    thSpur.classList.toggle("on", thSpurLen > 0 && lenA >= thSpurLen);
    thScratch.classList.toggle("on", thSpurLen > 0 && lenA >= thSpurLen + 70);
    thArrow.classList.toggle("on", thLenB > 0 && lenB >= thLenB - 4);
    /* the tip: the pen is writing this right now */
    var full = stillMode || reduced();
    if (full || (thLenB > 0 && lenB >= thLenB - 2) || thCur <= 1) {
      thTip.style.opacity = "0";
    } else {
      var onB = lenB > 0;
      var tp = onB ? thB.getPointAtLength(lenB) : thA.getPointAtLength(lenA);
      thTip.style.opacity = "1";
      thTip.setAttribute("transform", "translate(" + tp.x.toFixed(1) + " " + tp.y.toFixed(1) + ")");
      if (onB !== lastTipOnB) {
        lastTipOnB = onB;
        thTip.setAttribute("class", onB ? "th-gra" : "th-red");
      }
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
  /* the seam speaks in Mark's voice, not the manual. exactly one hint per
     cycle — press M for the mess (signature Nº1). the rest of the page
     teaches itself: the decals name themselves, the letters rattle to
     invite the grab, the plates reward a press, the headline a shift-drag. */
  var TICKER = [
    "CODE — DESIGN — TYPE — MOTION",
    "AVAILABLE Q4 2026",
    deskStatus(),
    "THE KERNING IS DONE — IT ISN’T",
    "I SHIP SLOWLY, ON PURPOSE",
    "THERE’S ANOTHER PAGE UNDER THIS ONE — PRESS M",
    "NO FRAMEWORK — NO TRACKERS — HAND-BUILT",
    "ONE-PERSON OPERATION",
    "STILL NOT DONE — NEVER QUITE IS",
    "MRKAXELUS@GMAIL.COM — REPLIES IN 48H"
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
      /* an unstruck row is unprinted paper — no plate reveal, no
         choreography, until the line (or a click) strikes it */
      if (row.classList.contains("unstruck")) return;
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
        /* a hard landing kicks a pixel of error into the register */
        if (impact > 900) regKick(clamp(impact / 700, 1, 2.2));
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
    /* the canceled pointerdown suppresses compat mousemove for the whole
       drag, freezing mouse.x/y — the dot's feed. keep it fed from here
       (same gotcha as the loupe) so the dot rides the drag. */
    mouse.x = e.clientX;
    mouse.y = e.clientY;
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

  document.addEventListener("pointerup", function (e) {
    if (!grabbed) return;
    var c = grabbed.c;
    c.el.classList.remove("grabbed");
    c.vx = clamp(c.vx, -1600, 1600);
    c.vy = clamp(c.vy, -1600, 1600);
    c.vr = c.vx * 0.15 + (c.vy > 0 ? 40 : -40);
    grabbed = null;
    /* the thrown letter usually rides under the pointer, so this stays
       GRAB; released over empty case, the ring goes away */
    if (overCh(e.target)) cursorLabel.textContent = "GRAB";
    else cursorEl.classList.remove("is-grab");
    startPhysics();
  });

  /* GRAB only over an actual letter — the h1's .hl lines are full-width
     blocks, so most of the title box is empty case, not type. delegate to
     the .ch spans; the short exit delay bridges word spaces so the ring
     doesn't flicker while sweeping across the headline. */
  var grabHoverT = null;
  function overCh(t) { return !!(t && t.classList && t.classList.contains("ch")); }
  heroTitleEl.addEventListener("mouseover", function (e) {
    if (!overCh(e.target)) return;
    if (!trailEnabled() || reduced() || document.body.classList.contains("proof")) return;
    clearTimeout(grabHoverT);
    cursorLabel.textContent = grabbed ? "WHEEE" : "GRAB";
    cursorEl.classList.add("is-grab");
  });
  heroTitleEl.addEventListener("mouseout", function (e) {
    if (!overCh(e.target) || grabbed) return; /* mid-drag it stays WHEEE */
    clearTimeout(grabHoverT);
    grabHoverT = setTimeout(function () {
      if (!grabbed) cursorEl.classList.remove("is-grab");
    }, 90);
  });
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target && e.target.tagName === "INPUT") return; /* the ok slip types here */
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
      strikeAll(true); /* you can't annotate unprinted paper */
      regHardZero();   /* the desk holds still */
      chars.forEach(function (c) {
        c.el.style.fontVariationSettings = "";
        c.t = 0; c.lw = -1; c.ls = -1;
      });
      positionAnchors();
      scalerEl.style.transform = "scale(0)";
      open = false;
      if (!messObserver) watchNotes();
      updateThread(true); /* the thread meets you at your scroll position */
      cacheInkNotes(); /* fresh ink needs to know where the notes live */
    } else {
      unwatchNotes();
      clearWet();
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
    /* initials typed on the ok slip are not mode switches */
    if (e.target && e.target.tagName === "INPUT" && e.key !== "Escape") return;
    if (e.key === "m" || e.key === "M" || e.key === "p" || e.key === "P") toggleProof();
    if (e.key === "n" || e.key === "N") setNight(!isNight(), true);
    if (e.key === "s" || e.key === "S") setNoise(!noiseOn);
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
      buildTerrain();
      buildThread();
      measureStrikes();
      checkStrikes();
    }, 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      positionAnchors();
      buildTerrain();
      buildThread();
      measureStrikes();
      checkStrikes();
    });
  }
  buildTerrain();
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

  /* ============ the trail: a figure of stones on measured ground ============ */
  /* each stone sits at the bottom of its 60×34 box (base ≈ y33) so the
     ground line — drawn through the measured bases — meets it cleanly. */
  Array.prototype.slice.call(document.querySelectorAll(".terrain-stones .mile-stone")).forEach(function (svg, i) {
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(30, 24, 22, 9, 201 + i * 17));
    svg.appendChild(p);
  });

  /* the ground is measured, not drawn: one line through the actual stone
     bases (so it follows their sizes + lifts), with hairline drops to the
     legend. re-run on load / fonts.ready / resize, never in a frame loop. */
  function buildTerrain() {
    var terrain = document.getElementById("terrain");
    var svg = document.getElementById("terrain-ground");
    if (!terrain || !svg) return;
    var slots = Array.prototype.slice.call(terrain.querySelectorAll(".stone-slot"));
    var labelsEl = terrain.querySelector(".terrain-labels");
    var tr = terrain.getBoundingClientRect();
    var W = tr.width, H = tr.height;
    if (W < 40 || !slots.length) return;
    /* hidden at this breakpoint (mobile drops the measured ground) */
    if (getComputedStyle(svg).display === "none") return;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var anchors = slots.map(function (slot) {
      var gap = slot.classList.contains("stone-gap");
      var el = gap ? slot : slot.querySelector(".mile-stone");
      var r = el.getBoundingClientRect();
      return {
        x: r.left - tr.left + r.width / 2,
        y: gap ? r.bottom - tr.top - 10 : r.bottom - tr.top - 2,
        gap: gap
      };
    });
    var pts = [{ x: 2, y: anchors[0].y + 5 }];
    anchors.forEach(function (a) { pts.push({ x: a.x, y: a.y }); });
    pts.push({ x: W - 2, y: anchors[anchors.length - 1].y + 5 });
    var d = "M" + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var mx = (a.x + b.x) / 2, my = Math.max(a.y, b.y) + 5;
      d += " Q" + mx.toFixed(1) + " " + my.toFixed(1) + " " + b.x.toFixed(1) + " " + b.y.toFixed(1);
    }
    var labelTop = labelsEl ? (labelsEl.getBoundingClientRect().top - tr.top) : H;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    anchors.forEach(function (a) {
      if (a.gap) return;
      var ln = document.createElementNS(SVG_NS, "line");
      ln.setAttribute("class", "tick");
      ln.setAttribute("x1", a.x.toFixed(1)); ln.setAttribute("y1", (a.y + 3).toFixed(1));
      ln.setAttribute("x2", a.x.toFixed(1)); ln.setAttribute("y2", (labelTop - 8).toFixed(1));
      svg.appendChild(ln);
    });
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("class", "ground");
    path.setAttribute("d", d);
    svg.appendChild(path);
  }

  /* ============ paint chips: pick my accent ============ */
  /* ACCENTS + accentI are declared up top (the plates need them at build
     time); here we just wire the chips and the reprint. */
  var chipEls = Array.prototype.slice.call(document.querySelectorAll(".chips .chip"));

  function isNight() { return document.body.classList.contains("night"); }
  function applyAccent() {
    document.documentElement.style.setProperty(
      "--accent", ACCENTS[accentI][isNight() ? "night" : "day"]
    );
    chipEls.forEach(function (c) {
      c.setAttribute("aria-pressed", String(+c.dataset.ai === accentI));
    });
  }
  /* repaint = reprint, extended to the work: a new ink re-runs the whole
     plate library and repaints every plate surface currently on screen */
  function rebuildPlates() {
    var pa = plateAccent();
    plates = PROJECTS.map(function (p) { return plateURI(p, pa); });
    rows.forEach(function (row) {
      var th = row.querySelector(".row-thumb");
      if (th) th.style.backgroundImage = plates[+row.dataset.plate];
    });
    if (curPlate >= 0 && plateEl) plateEl.style.backgroundImage = plates[curPlate];
    if (loupeOn && curPlate >= 0) loupeEl.style.backgroundImage = plates[curPlate];
    if (pvIdx >= 0) {
      var pl = pvEl.querySelector(".pv-plate");
      if (pl) pl.style.backgroundImage = plates[pvIdx];
      var duo = pvEl.querySelectorAll(".pv-duo figure");
      if (duo.length === 2) {
        duo[0].style.backgroundImage = detailURI(PROJECTS[pvIdx], 0, pa);
        duo[1].style.backgroundImage = detailURI(PROJECTS[pvIdx], 1, pa);
      }
    }
  }
  chipEls.forEach(function (c) {
    c.addEventListener("click", function () {
      accentI = +c.dataset.ai;
      try { localStorage.setItem("ma-accent-i", String(accentI)); } catch (e) {}
      applyAccent();
      rebuildPlates(); /* the work reprints in the new ink too */
      /* new ink: the press runs a quick re-register */
      if (!reduced() && !stillMode) {
        heroTitleEl.classList.remove("reprint");
        void heroTitleEl.getBoundingClientRect();
        heroTitleEl.classList.add("reprint");
        setTimeout(function () { heroTitleEl.classList.remove("reprint"); }, 500);
      }
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
    /* the mess knows you — the scrawl by the stamp remembers */
    var knowsEl = document.getElementById("knows-note");
    if (knowsEl) {
      knowsEl.textContent =
        visits <= 1 ? "first time here. look around." :
        visits < 5 ? "back again. the kerning still isn’t fixed." :
        "you again. leave a stone if you haven’t.";
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
      /* the impression line: cached positions vs scrollY — pure math */
      checkStrikes();
      /* hold register: scroll velocity shears the ink passes */
      regFrame();
      /* the thought-thread draws in with the scroll (mess only) */
      if (document.body.classList.contains("proof")) updateThread();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ visitors' cairn — your stone lands ON the stack ============ */
  /* the guestbook keeps its promise: a click doesn't scatter a pebble
     beside the pile, it adds to the cairn. the stack grows, a seeded lean
     develops, and past a threshold it TOPPLES — the stacked stones fall to
     the ground row and we stack again. the studio's own stack is the
     foundation; visitors build on it. every 9th stone is a signal stone.
     the fall accelerates (heavy, not bouncy); reduced motion seats it. */
  var pileEl = document.getElementById("pile");
  var yardEl = document.getElementById("yard-ground");
  var countEl = document.getElementById("yard-count");
  var GROUND_Y = 143;
  var STORE_KEY = "cairn-stones-v2";
  var LEAN_LIMIT = 30;   /* px of apex lean before it gives */
  var STACK_CAP = 9;     /* it never stacks higher than this */
  var GROUND_CAP = 42;   /* the ground erodes past this */

  /* the studio's own stack, centre stage — the foundation, never falls */
  var OURS = [
    { rx: 50, ry: 12, seed: 101 },
    { rx: 42, ry: 10, seed: 102 },
    { rx: 36, ry: 9,  seed: 103 },
    { rx: 30, ry: 8,  seed: 104 },
    { rx: 25, ry: 7,  seed: 105 },
    { rx: 20, ry: 6,  seed: 106 },
    { rx: 15, ry: 5,  seed: 107 }
  ];
  /* the top surface of the house stack — visitor stones start here */
  var HOUSE_APEX = (function () {
    var b = GROUND_Y + 1;
    OURS.forEach(function (s) { b = b - 2 * s.ry + 3; });
    return b;
  })();

  /* a stone's size + its lean contribution are derived from its seed, so
     the same stack renders identically on every load */
  function stoneSize(seed) {
    var r = mulberry32(seed ^ 0x1234);
    return { rx: 12 + Math.floor(r() * 6), ry: 5 + Math.floor(r() * 3) };
  }
  function leanStep(seed) { return (mulberry32(seed ^ 0x9E37)() - 0.5) * 22; }

  /* one draw path for every stone: a positioned group, an animation group
     (for the drop / topple), and the wobbly blob centred at its own origin
     so a rotate() tumbles it around its middle */
  function drawStoneG(cx, cy, rx, ry, meta, drop) {
    var g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("transform", "translate(" + cx.toFixed(1) + " " + cy.toFixed(1) + ")");
    var inner = document.createElementNS(SVG_NS, "g");
    inner.setAttribute("class", "stone-inner" + (drop ? " dropping" : ""));
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", stonePath(0, 0, rx, ry, meta.seed));
    if (meta.n) p.dataset.n = String(meta.n);
    if (meta.t) p.dataset.t = String(meta.t);
    if (meta.house) p.classList.add("house");
    if (meta.sig) p.classList.add("signal");
    inner.appendChild(p);
    g.appendChild(inner);
    pileEl.appendChild(g);
    return g;
  }

  var stackStones, groundStones, stoneSeq = 0;
  function loadCairn() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        return { stack: Array.isArray(o.stack) ? o.stack : [], ground: Array.isArray(o.ground) ? o.ground : [] };
      }
      /* migrate the old scattered stones into the ground row */
      var v1 = localStorage.getItem("cairn-stones-v1");
      if (v1) {
        var arr = JSON.parse(v1);
        if (Array.isArray(arr)) return { stack: [], ground: arr.map(function (s) {
          return { x: s.x, seed: s.seed, sig: s.sig, t: s.t, n: s.n, rx: s.rx, ry: s.ry };
        }) };
      }
    } catch (e) {}
    return { stack: [], ground: [] };
  }
  function saveCairn() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ stack: stackStones, ground: groundStones })); } catch (e) {}
  }
  (function initCairn() {
    var l = loadCairn();
    stackStones = l.stack; groundStones = l.ground;
    try { stoneSeq = +(localStorage.getItem("ma-stone-seq") || 0); } catch (e) {}
    stackStones.concat(groundStones).forEach(function (s) { if (s.n && s.n > stoneSeq) stoneSeq = s.n; });
  })();

  /* the tower's geometry: each stone sits on the last, carrying the lean */
  function stackGeom() {
    var out = [], bottom = HOUSE_APEX, lean = 0;
    stackStones.forEach(function (s) {
      var sz = stoneSize(s.seed);
      lean += leanStep(s.seed);
      out.push({ cx: 500 + lean, cy: bottom - sz.ry, rx: sz.rx, ry: sz.ry, seed: s.seed, n: s.n, t: s.t, sig: s.sig });
      bottom = bottom - 2 * sz.ry + 3;
    });
    return out;
  }
  function towerLean() {
    var lean = 0;
    stackStones.forEach(function (s) { lean += leanStep(s.seed); });
    return lean;
  }

  function renderCairn(dropLast) {
    while (pileEl.firstChild) pileEl.removeChild(pileEl.firstChild);
    var b = GROUND_Y + 1;
    OURS.forEach(function (s) { drawStoneG(500, b - s.ry, s.rx, s.ry, { seed: s.seed, house: true }, false); b = b - 2 * s.ry + 3; });
    groundStones.forEach(function (s) {
      var sz = stoneSize(s.seed);
      drawStoneG(s.x, GROUND_Y - (s.ry || sz.ry), s.rx || sz.rx, s.ry || sz.ry, s, false);
    });
    var geom = stackGeom();
    geom.forEach(function (g, i) { drawStoneG(g.cx, g.cy, g.rx, g.ry, g, dropLast && i === geom.length - 1); });
  }

  function updateCount() {
    var total = OURS.length + stackStones.length + groundStones.length;
    var verb = mqFine.matches ? "CLICK" : "TAP";
    countEl.textContent = total + " STONES — " + verb + " TO LEAVE YOURS";
  }

  var fellT = null;
  function showFellLine() {
    countEl.textContent = "THE STACK FELL — WE STACK AGAIN";
    clearTimeout(fellT);
    fellT = setTimeout(updateCount, 2600);
  }

  function trimGround() { while (groundStones.length > GROUND_CAP) groundStones.shift(); }

  var cairnBusy = false; /* locked while a topple plays, so fast clicks don't race it */
  function topple() {
    var geom = stackGeom();
    if (!geom.length) { cairnBusy = false; return; }
    var targets = geom.map(function (g, i) {
      var side = (i % 2 === 0) ? -1 : 1;
      var spread = 70 + i * 22 + mulberry32(g.seed ^ 0x5151)() * 60;
      return {
        seed: g.seed, sig: g.sig, t: g.t, n: g.n, rx: g.rx, ry: g.ry,
        fromX: g.cx, fromY: g.cy,
        tx: clamp(500 + side * spread, 55, 945), ty: GROUND_Y - g.ry,
        rot: (mulberry32(g.seed ^ 0xAAAA)() * 2 - 1) * 46
      };
    });
    stackStones = [];
    showFellLine();
    if (reduced() || stillMode) {
      targets.forEach(function (t) { groundStones.push(groundEntry(t)); });
      trimGround(); saveCairn(); updateCount(); renderCairn(false);
      cairnBusy = false;
      return;
    }
    renderCairn(false); /* tower gone; house + existing ground */
    var nodes = targets.map(function (t) {
      return drawStoneG(t.fromX, t.fromY, t.rx, t.ry, { seed: t.seed, sig: t.sig, n: t.n, t: t.t }, false);
    });
    var start = performance.now(), DUR = 700;
    requestAnimationFrame(function fall(now) {
      var e = Math.min(1, (now - start) / DUR);
      var kg = e * e; /* accelerate — the pile lets go, it doesn't spring */
      nodes.forEach(function (node, i) {
        var t = targets[i];
        var x = t.fromX + (t.tx - t.fromX) * kg;
        var y = t.fromY + (t.ty - t.fromY) * kg;
        node.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + (t.rot * kg).toFixed(1) + ")");
      });
      if (e < 1) { requestAnimationFrame(fall); return; }
      targets.forEach(function (t) { groundStones.push(groundEntry(t)); });
      trimGround(); saveCairn(); updateCount(); renderCairn(false);
      cairnBusy = false;
      if (noiseOn) sndTok();
    });
  }
  function groundEntry(t) { return { x: Math.round(t.tx), seed: t.seed, sig: t.sig, t: t.t, n: t.n, rx: t.rx, ry: t.ry }; }

  function addStone() {
    if (cairnBusy) return; /* the pile is mid-collapse — let it land */
    var visitorTotal = stackStones.length + groundStones.length;
    var s = { seed: Math.floor(Math.random() * 1e9), sig: (visitorTotal % 9) === 8, t: Date.now(), n: ++stoneSeq };
    try { localStorage.setItem("ma-stone-seq", String(stoneSeq)); } catch (e) {}
    stackStones.push(s);
    saveCairn();
    updateCount();
    var willTopple = Math.abs(towerLean()) > LEAN_LIMIT || stackStones.length >= STACK_CAP;
    renderCairn(true);
    setTimeout(sndTok, reduced() ? 60 : 340);
    if (willTopple) { cairnBusy = true; setTimeout(topple, (reduced() || stillMode) ? 260 : 560); }
  }

  renderCairn(false);
  updateCount();

  yardEl.addEventListener("click", function () { addStone(); });
  yardEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); addStone(); }
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

  /* ============ the impression line: the sheet prints as read ============ */
  /* below a fixed hairline at 62% of the viewport every section is blind
     impression — real type, uninked. as a section's top crosses the line
     it STRIKES: the ink floods in, the unit shudders a pixel, the regmark
     ticks one notch (ten units — a full first read turns the crosshair
     exactly once). one-way, persisted (ma-struck-v1): return visits
     arrive printed and the line retires; the colophon then admits how
     many visits the pull took. struck is the DEFAULT state — js arms
     .unstruck at boot and only the line, or a deliberate touch, takes it
     away. the hero is always pre-struck: the press-check intro is its
     strike. strike positions are cached (load/fonts/resize, same
     discipline as buildTerrain) so the scroll rAF does pure math. */
  var IMP_LINE = 0.62; /* keep in sync with .impline { top: 62vh } */
  var STRIKE_SEL = [".ticker", ".trail", ".index-head",
                    "#p-01", "#p-02", "#p-03", "#p-04",
                    ".desk", ".yard", ".outro"];
  var implineEl = document.getElementById("impline");
  var strikeUnits = [];
  var struckStore = {};
  var regTicks = 0;
  try { struckStore = JSON.parse(localStorage.getItem("ma-struck-v1") || "{}") || {}; } catch (e) { struckStore = {}; }

  function saveStruck() {
    try { localStorage.setItem("ma-struck-v1", JSON.stringify(struckStore)); } catch (e) {}
  }
  function measureStrikes() {
    if (implineEl) implineEl.style.top = Math.round(innerHeight * IMP_LINE) + "px";
    strikeUnits.forEach(function (u) {
      if (u.struck) return;
      /* anchor on the first visible child, not the padding box — the
         type strikes when the type reaches the line (.trail carries
         7vw of dead padding above its first rule) */
      var a = u.el.firstElementChild || u.el;
      var r = a.getBoundingClientRect();
      if (r.width < 2 && r.height < 2) r = u.el.getBoundingClientRect();
      u.top = r.top + scrollY;
    });
  }
  function regTick() {
    regTicks++;
    regEl.style.rotate = (regTicks * 36) + "deg";
  }
  function colophonPulled() {
    var el = document.getElementById("colo-pulled");
    var n = 0;
    try { n = +(localStorage.getItem("ma-pulled-n") || 0); } catch (e) {}
    if (!el || !n) return;
    el.innerHTML = "<br>" +
      (n === 1 ? "PULLED IN ONE VISIT"
               : "PULLED OVER " + String(n).padStart(3, "0") + " VISITS");
  }
  function retireLine() {
    document.body.classList.remove("imp-armed");
    try {
      if (!localStorage.getItem("ma-pulled-n")) {
        localStorage.setItem("ma-pulled-n",
          String(Math.max(1, +(localStorage.getItem("ma-visits") || 1))));
      }
    } catch (e) {}
    colophonPulled();
  }
  function strikeUnit(u, instant) {
    if (u.struck) return;
    u.struck = true;
    struckStore[u.id] = 1;
    saveStruck();
    u.el.classList.remove("unstruck");
    if (!instant && !stillMode && !reduced()) {
      /* the flood (transitions ride on .striking) + the shudder — an
         inline translate step: it composes with entrance transforms
         and can't restart a filled animation the way a keyframe would */
      u.el.classList.add("striking");
      u.el.style.translate = "0 1px";
      setTimeout(function () { u.el.style.translate = "0 -0.5px"; }, 90);
      setTimeout(function () { u.el.style.translate = ""; }, 180);
      clearTimeout(u.t);
      u.t = setTimeout(function () { u.el.classList.remove("striking"); }, 500);
      regTick();
    }
    if (!strikeUnits.some(function (s) { return !s.struck; })) retireLine();
  }
  function strikeAll(instant) {
    /* ?proof calls setProof before this block runs — initStrikes
       handles that arrival itself */
    if (!strikeUnits) return;
    strikeUnits.forEach(function (u) { strikeUnit(u, instant); });
  }
  function checkStrikes() {
    if (!strikeUnits || !strikeUnits.length) return;
    var lineY = scrollY + innerHeight * IMP_LINE;
    for (var i = 0; i < strikeUnits.length; i++) {
      if (!strikeUnits[i].struck && strikeUnits[i].top <= lineY) {
        strikeUnit(strikeUnits[i]);
      }
    }
  }
  (function initStrikes() {
    /* reduced motion / ?still ship fully printed — no line, nothing stored */
    if (stillMode || reduced()) return;
    STRIKE_SEL.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el || struckStore[sel]) return; /* printed on an earlier visit */
      strikeUnits.push({ el: el, id: sel, top: 0, struck: false, t: null });
      el.classList.add("unstruck");
    });
    if (!strikeUnits.length) return; /* fully printed — the line has retired */
    /* arriving straight in the mess: you can't annotate unprinted paper */
    if (document.body.classList.contains("proof")) { strikeAll(true); return; }
    document.body.classList.add("imp-armed");
    measureStrikes();
    checkStrikes();
    strikeUnits.forEach(function (u) {
      /* a deliberate touch prints the sheet where you touched it */
      u.el.addEventListener("click", function () { strikeUnit(u); }, true);
      u.el.addEventListener("focusin", function () { strikeUnit(u); });
    });
    /* pulling a paper proof pulls the whole sheet */
    addEventListener("beforeprint", function () { strikeAll(true); });
    if (mqReduce.addEventListener) {
      mqReduce.addEventListener("change", function () {
        if (reduced()) strikeAll(true);
      });
    }
  })();
  colophonPulled();

  /* ============ hold register: true only when you are still ============ */
  /* one global registration-error scalar, written in the existing scroll
     rAF (no new loops): scroll velocity shears the ink passes of the
     display type — hero headline, row titles, outro title, the 144pt
     specimen amp — by 1–3px via the same text-shadow pass language the
     press-check intro uses. ~300ms of stillness and everything thunks
     back true (a transition, not a loop). the regmark's crosshair drifts
     by exactly the same error. a hard loose-type landing kicks a pixel
     of error into the system; the plate pull's inline styles win while
     you're pulling. never touches body text; reduced motion, ?still,
     the mess and the viewer all pin the error at zero. */
  var regEls = [heroTitleEl,
                document.querySelector(".outro-title"),
                document.querySelector(".spec-amp.s5")]
    .concat(rows.map(function (r) { return r.querySelector(".row-title"); }))
    .filter(Boolean);
  regEls.forEach(function (el) { el.classList.add("regel"); });
  var regCur = 0, regPrevY = -1, regSettleT = null;
  var regLastShadow = "";

  function regEnabled() {
    return !reduced() && !stillMode &&
      !document.body.classList.contains("proof") &&
      !document.body.classList.contains("pv-open") &&
      !document.body.classList.contains("press-check");
  }
  function regHeroBusy() {
    /* the manual extreme owns the headline while it's in hand */
    return !!pullState || heroTitleEl.classList.contains("plates-return");
  }
  function regWrite(px) {
    var q = Math.round(px * 4) / 4; /* quarter-px steps — no style churn */
    var shadow = q === 0
      ? "0 0 0 var(--pencil), 0 0 0 var(--accent)"
      : "0 " + (q * 0.75).toFixed(2) + "px 0 var(--pencil), 0 " +
        (-q * 0.55).toFixed(2) + "px 0 var(--accent)";
    if (shadow === regLastShadow) return;
    regLastShadow = shadow;
    for (var i = 0; i < regEls.length; i++) {
      if (regEls[i] === heroTitleEl && regHeroBusy()) continue;
      regEls[i].style.textShadow = shadow;
    }
    regEl.style.translate = q === 0
      ? "0px 0px"
      : (q * 0.5).toFixed(2) + "px " + (q * 0.9).toFixed(2) + "px";
  }
  function regSettle() {
    document.body.classList.add("reg-settling");
    regCur = 0;
    regWrite(0);
    setTimeout(function () {
      document.body.classList.remove("reg-settling");
      for (var i = 0; i < regEls.length; i++) {
        if (regEls[i] === heroTitleEl && regHeroBusy()) continue;
        regEls[i].style.textShadow = "";
      }
      regEl.style.translate = "";
      regLastShadow = "";
    }, 430);
  }
  function regHardZero() {
    if (!regEls) return; /* ?proof calls setProof before this block */
    clearTimeout(regSettleT);
    regCur = 0;
    regLastShadow = "";
    regEls.forEach(function (el) {
      if (el === heroTitleEl && regHeroBusy()) return;
      el.style.textShadow = "";
    });
    regEl.style.translate = "";
  }
  function regFrame() {
    if (regPrevY < 0) { regPrevY = scrollY; return; }
    var dy = scrollY - regPrevY;
    regPrevY = scrollY;
    if (!regEnabled()) {
      if (regCur) regHardZero();
      return;
    }
    var target = clamp(dy * 0.05, -3, 3);
    regCur += (target - regCur) * 0.5;
    if (Math.abs(regCur) < 0.05) regCur = 0;
    regWrite(regCur);
    clearTimeout(regSettleT);
    regSettleT = setTimeout(regSettle, 300);
  }
  function regKick(px) {
    if (!regEnabled()) return;
    regCur = clamp(px, -3, 3);
    regWrite(regCur);
    clearTimeout(regSettleT);
    regSettleT = setTimeout(regSettle, 300);
  }

  /* the decal runs one demo pull: the sheet lurches off register and
     thunks back — the gesture, taught by the gesture */
  var platesDecal = document.getElementById("plates-decal");
  if (platesDecal) {
    platesDecal.addEventListener("click", function () { regKick(2.6); });
  }

  /* ============ the ok slip: the visitor signs the press check ============ */
  /* you've read the sheet — you're the client at the press check now.
     initials machine-set (typed, never handwritten: the hand belongs to
     the mess), three stamp-tabs that commit on a ~620ms HOLD (stamping
     should feel like stamping; the face says so) — plain Enter or Space
     commits for keyboard people, Enter in the initials field passes the
     sheet. the stamp thunks down in the accent, the jobline carries the
     verdict permanently, and the mess argues back. re-stamping allowed:
     changed your mind. noted. persisted (ma-ok-v1); prints on the proof. */
  var OK_STORE = "ma-ok-v1";
  var okInput = document.getElementById("ok-initials");
  var okStampEl = document.getElementById("ok-stamp");
  var okDateEl = document.getElementById("ok-date");
  var jobOkEl = document.getElementById("job-ok");
  var okTabs = Array.prototype.slice.call(document.querySelectorAll(".ok-tab"));
  var okReply1 = document.getElementById("ok-reply1");
  var okReply2 = document.getElementById("ok-reply2");
  var okReply3 = document.getElementById("ok-reply3");
  var OK_META = {
    ok:   { face: "OK TO PRINT",      job: "PASSED FOR PRESS",
            r1: "someone passed it. it is not done.", r2: "who let them in." },
    corr: { face: "OK W/ CORRECTIONS", job: "OK WITH CORRECTIONS",
            r1: "corrections. plural. i know about the kerning.", r2: "" },
    re:   { face: "REPROOF",           job: "MARKED FOR REPROOF",
            r1: "", r2: "yeah. i know." }
  };
  var okState = null;
  try { okState = JSON.parse(localStorage.getItem(OK_STORE) || "null"); } catch (e) { okState = null; }
  if (okDateEl) okDateEl.textContent = dateStr;

  function renderOK(fresh) {
    if (!okState || !OK_META[okState.v]) return;
    var m = OK_META[okState.v];
    okStampEl.innerHTML =
      '<span class="oks1">' + m.face + '</span>' +
      '<span class="oks2">“' + okState.ini + '” · ' + okState.time + '</span>';
    okStampEl.classList.add("on");
    if (fresh && !reduced() && !stillMode) {
      okStampEl.classList.remove("thunk");
      void okStampEl.getBoundingClientRect();
      okStampEl.classList.add("thunk");
    }
    if (jobOkEl) {
      jobOkEl.textContent = " · " + m.job +
        (okState.v === "ok" ? " · OK" : "") +
        " “" + okState.ini + "” · " + okState.time;
    }
    okTabs.forEach(function (tab) {
      tab.setAttribute("aria-pressed", String(tab.dataset.verdict === okState.v));
    });
    if (okInput && !okInput.value && okState.ini !== "—") okInput.value = okState.ini;
    /* the mess gets its reply */
    if (okReply1) okReply1.textContent = m.r1;
    if (okReply2) okReply2.textContent = m.r2;
    if (okReply3) okReply3.textContent = okState.n > 1 ? "changed your mind. noted." : "";
  }
  function commitOK(verdict) {
    if (!OK_META[verdict]) return;
    var ini = (okInput.value || "").replace(/[^\w.\-]/g, "").toUpperCase().slice(0, 4) || "—";
    okState = {
      v: verdict,
      ini: ini,
      time: deskTime(),
      n: okState && okState.v ? (okState.n || 1) + 1 : 1
    };
    try { localStorage.setItem(OK_STORE, JSON.stringify(okState)); } catch (e) {}
    renderOK(true);
    sndTok(); /* the stamp knocks, if the noise is on */
  }
  var okHoldT = null;
  okTabs.forEach(function (tab) {
    tab.addEventListener("pointerdown", function (e) {
      if (e.button && e.button !== 0) return;
      clearTimeout(okHoldT);
      tab.classList.add("holding");
      okHoldT = setTimeout(function () {
        tab.classList.remove("holding");
        commitOK(tab.dataset.verdict);
      }, 620);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      tab.addEventListener(ev, function () {
        clearTimeout(okHoldT);
        tab.classList.remove("holding");
      });
    });
    /* nothing is key-only — and nothing is hold-only either */
    tab.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        commitOK(tab.dataset.verdict);
      }
    });
  });
  if (okInput) {
    okInput.addEventListener("keydown", function (e) {
      /* enter in the field is the affirmative: the sheet passes */
      if (e.key === "Enter") { e.preventDefault(); commitOK("ok"); }
    });
  }
  renderOK(false);

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

  /* ============ fresh ink: the mess notices being read ============ */
  /* the scrawl nearest the cursor darkens a breath, like wet ink under
     the lamp. note positions cached on mess-entry (event-driven read);
     mousemove does pure math. */
  var inkNotes = [];
  var wetEl = null;
  var wetLast = 0;
  function cacheInkNotes() {
    inkNotes = [];
    Array.prototype.slice.call(document.querySelectorAll(".page .note")).forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width < 3) return;
      inkNotes.push({ el: el, x: r.left + r.width / 2, y: r.top + scrollY + r.height / 2 });
    });
  }
  function clearWet() {
    if (wetEl) { wetEl.classList.remove("wet"); wetEl = null; }
    inkNotes = [];
  }
  document.addEventListener("mousemove", function (e) {
    if (!inkNotes.length) return;
    var now = performance.now();
    if (now - wetLast < 90) return;
    wetLast = now;
    var px = e.clientX, py = e.clientY + scrollY;
    var best = null, bd = 170 * 170;
    for (var i = 0; i < inkNotes.length; i++) {
      var dx = inkNotes[i].x - px, dy = inkNotes[i].y - py;
      var d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = inkNotes[i].el; }
    }
    if (best !== wetEl) {
      if (wetEl) wetEl.classList.remove("wet");
      wetEl = best;
      if (wetEl) wetEl.classList.add("wet");
    }
  });

  /* ============ the printer's loupe (a quiet delight) ============ */
  /* press and hold a plate: the glass magnifies the halftone and the
     9px margin notes that are just dots at 1:1. unannounced on purpose —
     a reward for the curious, not a line in the ticker. */
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

  /* ============ signature Nº4: the plate pull (shift-drag the headline) ============ */
  /* the chosen fourth signature. the red and blue passes come off register
     and follow the hand, with resistance; release and they thunk back.
     it lives on the headline — where every cursor already is (loose type),
     so a shift-drag is the most-stumbled-upon gesture on the page. */
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
    /* same compat-mousemove suppression as the loose-type drag: keep the
       dot's feed alive while the plates are held off register */
    mouse.x = e.clientX;
    mouse.y = e.clientY;
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
  document.addEventListener("pointerup", function (e) {
    if (!pullState) return;
    pullState = null;
    heroTitleEl.classList.add("plates-return");
    heroTitleEl.style.textShadow = "0 0 0 var(--pencil), 0 0 0 var(--accent)";
    /* is-grab came from the pull, not a letter hover — clear it unless
       the release actually lands on a letter */
    if (overCh(e.target)) cursorLabel.textContent = "GRAB";
    else cursorEl.classList.remove("is-grab");
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

  /* specimen details: two generated close-ups per project, same inks */
  function detailURI(p, v, accent) {
    accent = accent || plateAccent();
    var inner = v === 0
      ? '<g transform="translate(-260 -160) scale(2.1)" opacity="0.9">' + motifSVG(p.motif, accent) + "</g>"
      : '<g transform="translate(10 7)" opacity="0.35">' + motifSVG(p.motif, PLATE_RED) + "</g>" +
        '<g opacity="0.92">' + motifSVG(p.motif, accent) + "</g>";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">' +
      '<rect width="1200" height="760" fill="' + PLATE_INK + '"/>' +
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
