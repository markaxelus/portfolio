# CONTEXT — Mark Axelus Portfolio (prototype)

This file is the session memory for this project. Read it before touching anything.
It records what Mark asked for, the rules he set, every decision made, and where the
project stands. (Named CLAUDE.md so coding agents load it automatically; it's a
plain context file otherwise.)

---

## 1. What this is

Mark Axelus's **personal portfolio**. Static site, no build step, no framework, no
trackers. Three files:

- `index.html` — all markup
- `styles.css` — all styles
- `main.js` — all behavior

Run it: `python3 -m http.server 4173` from this folder (a `.claude/launch.json`
exists for the preview server). Contact email used in the site: mrkaxelus@gmail.com.
Desk timezone: `America/Los_Angeles` (constant `DESK_TZ` in main.js).

---

## 2. The core concept (do not break this)

**The page is a print proof. Underneath it lives the working desk.**

Two strictly separated layers:

1. **The FINAL layer (main page)** — clean editorial print: stone/ink/blue, Fraunces
   display type, Space Mono labels, print-production furniture (crop marks,
   registration mark, job line), techwear machine decals. Its personality comes from
   **interactive/playable elements**, never from handwriting.
2. **The MESS layer (press M)** — the persona page. Red-pencil baseline grid,
   handwritten self-talk in two pens (Caveat red = day pen "K-style", Zeyada
   graphite = 2am pen), journaling circles, doodles, the cat, the stamp.

### THE HARD RULE (Mark corrected this explicitly — July 2026)
> Hand-drawn / red-pencil / handwritten personal touches live ONLY in the mess (M)
> layer. They must NEVER appear on the main page. "That personal touch only stays on
> that other persona page which is the whole point."

The main page earns uniqueness through **interaction** instead. Current main-page
signatures (Mark counts these himself):
1. **Press M** (the mess layer itself — the thing he loved first)
2. **The stones** (visitors' cairn guestbook — "the stone concept is good I like it")
3. **Loose type** (hero letters are grabbable/throwable letterpress physics)

---

## 3. Mark's taste rules (distilled from his own words)

- **"Unique and different is the key word."** Award-winning (Awwwards-level) feel.
  "This is mine, this is my art, this is me."
- **"Signature" means the one memorable interaction** (Awwwards sense) — NOT a
  literal autograph graphic (he rejected that idea explicitly).
- **Reference aesthetic:** a custom techwear PS5 controller — cryptic mono
  micro-labels (`MRTHM //TC-IV`, `[RUN.R] SENSORY INPUT SYSTEM`), registration
  crosses, diagonal hazard stripes, acid green accents, one big glitchy letterform,
  scattered tiny squares/arrows. His word: **"asymmetricness."**
- **Journaling circles** — he loves elements being circled like margin notes.
- **Visible, not hidden:** unique touches shouldn't all be secrets; the page should
  feel alive on its face (decals, living details). But hand-drawn ones go in M.
- **Authenticity > professionalism. "Sometimes a little goofiness goes a long way."**
- **Late-night vibe is the soul of the mess layer:** "It just never stops..." —
  the alternate lifestyle people don't see. Internal dialogues, unstructuredness.
- **Recruiter perspective matters for CONTENT** (what do they want to see) but he
  rejected corporate-feeling sections (see graveyard below).
- **No obscure references** in copy — he didn't know what Khruangbin was; keep
  cultural references universal.
- **Mess annotations must draw in per viewport** (IntersectionObserver), not all at
  once — so the pencil animation is actually seen wherever you are. He asked for
  this specifically.
- **The cat:** scratchy hand-drawn, pencil-sketch animation, "it just exists."
  He requested it personally. She sits on the row border above Signal Garden.

### Section graveyard (tried and rejected — do not resurrect)
- **HOUSE RULES manifesto** ("Slow is smooth" etc.) — disliked.
- **WHAT I DO capability grid** (design/build/currently columns) — disliked;
  research confirmed winners don't do skills walls.
- **Desk board with STACK/AVAILABLE rows** — he preferred the human version
  (BUILDING / READING / LISTENING / COFFEE).
- **Literal autograph/signature SVG** — rejected before it was built.
- **Hand marks on the main page** (nerve underline, Write-to-me circle, trail
  asides in red) — built, then moved into the mess layer per the hard rule.

---

## 4. Current page structure (top to bottom)

1. **Hero** — "Code, design & nerve" (Fraunces, per-character spans).
   - Ink pooling: letters swell (wght/SOFT axes) near the cursor.
   - **LOOSE TYPE**: grab a letter → letterpress physics (gravity, bounce, spin
     inside the hero). Decal `[!] LOOSE TYPE — GRAB A LETTER` ↔ `[R] RESET THE CASE`
     (click or key R). Cursor label GRAB / WHEEE. Desktop fine-pointer only.
   - Bio top-right column; ghost `M.` glyph bleeding off the right edge.
2. **Ticker** — personal marquee ("THE KERNING IS DONE — IT ISN'T", desk status by
   LA hour, hints for M / N / chips / loose type). Pauses in mess mode.
3. **THE TRAIL SO FAR** — career as a dashed hand-path with 5 generated stones
   (2019→2026, 2026 stone is accent-colored). Serif facts on main page; the five
   red asides ("terrifying. correct." etc.) are MESS-ONLY notes, plus "the gap in
   2022? we don't talk about 2022."
4. **SELECTED WORK** — 4 fictional placeholder projects (Meridian, Low Relief,
   Night Office, Signal Garden), each with one-line description, REF// part number,
   generated duotone SVG plates (halftone, misregistered red pass, proof slug,
   ghost numeral). Cursor-trailing plate reveal on hover (desktop), static thumbs
   on touch. Row titles go WONK on hover. Mess: row notes, "fav." circle on 03,
   the cat + zzz on row 04.
5. **AT THE DESK — RIGHT NOW-ISH** — BUILDING "This site. Again." / READING "The
   Shape of Design, again" / LISTENING "The same three albums, on loop" / COFFEE
   "Nº 094 this quarter". Mess: "update this, mark. it's been three weeks.",
   coffee-cup doodle, tally marks ("lost count in march.").
6. **PASSERS-BY (visitors' cairn)** — hand-drawn stone stack + click/tap to leave a
   stone (localStorage, capped 60, every 9th stone accent-colored, drop animation).
7. **Outro** — "Got a brief? / Write to me." + colophon ("NO FRAMEWORK · NO
   TRACKERS · HAND-BUILT / 24PX GRID · 3 INKS · 1 CAT"). Mess: "it just never
   stops, does it." / "you love it though. — 2am me", moon+stars, paper plane,
   Write-to-me circle (JS-anchored), "mention the stones" handshake.

### Fixed furniture (all pages)
- Poster frame + crop marks, spinning registration mark, color bar → **paint chips**
  (clickable accent swap: signal blue / magenta / acid; persisted), job line.
- Corners: MARK AXELUS / CONTACT ↗ / ©2026 — ALL MINE + live LA clock / SEE THE MESS
  button (↔ OK, ENOUGH).
- `[N] NIGHT OFFICE` decal button top-right; grip tape "AXELUS • AXELUS" up the left
  edge; hazard stripes; `SCROLL 042%` live telemetry; cairn scroll indicator
  (5 stones stack with scroll progress); `[RUN.M] MESS LAYER ARMED` + blinking acid
  caret; hero spec cluster with hover-decodes (`00.MA2093` → "means nothing. looks
  great.", `VISIT Nº 007` → real localStorage visit counter).
- Custom cursor (dot; PROOF ↗ over rows; GRAB over headline), grain overlay.

### Modes & keys
- **M or P** — mess layer (also `?proof` URL / `#proof`). Esc exits.
- **N** — night office (auto-on 23:00–06:00 LA time when no stored pref; persisted
  on manual toggle). Dark ink sheet, acid accents, brightened pencil red
  (`#F0603F`), stamp switches to normal blend (multiply made it invisible — fixed).
- **R** — reset the loose type case.
- **`?still`** — freezes all motion (press shots / deterministic screenshots).
- **`?fps`** — dev-only frame meter (measured FPS + worst frame ms per window).
- Reduced motion respected everywhere (no physics, no draw-ins, instant toggles).

### Easter eggs / delights
- Console: "you looked under here too? we'd get along. press M. — mark" (red mono).
- Stamp: "MARK AXELUS — WORKING PROOF / STILL NOT DONE / AT MY DESK · date".
- Every 9th visitor stone is a blue "signal stone."

---

## 5. Technical notes

- **Fonts (Google):** Fraunces variable with `ital, opsz, wght, SOFT, WONK` axes
  (WONK=1 + SOFT used for "unfinished" letterforms in mess mode and row hover);
  Space Mono; Caveat (day pen); Zeyada (2am pen).
- **Palette tokens:** `--stone #DDDBD4`, `--ink #16150F`, `--accent` (user-pickable
  via chips, day/night pairs in `ACCENTS` in main.js), `--acid #B4C400`,
  `--pencil #C7361F` (night `#F0603F`), `--graphite`. Night mode swaps tokens on
  `body.night`.
- **Mess reveal system:** notes/anchors/amarks get `.seen` from an
  IntersectionObserver created on mess-enter, removed on exit (so draw-ins replay).
  `?still` bypasses the observer (marks everything seen).
- **JS-anchored marks** (`positionAnchors()` in main.js): amp circle, bio bracket
  (mess), nerve underline + Write-to-me circle (mess, `.amark`). Re-measured on
  fonts.ready, hero animationend, resize.
- **Stones:** `stonePath()` seeded generator (mulberry32) draws all stones — yard,
  cairn indicator, trail. Same visual language everywhere.
- **localStorage keys:** `cairn-stones-v1`, `ma-night`, `ma-accent-i`, `ma-visits`.
- **Loose type physics:** in main.js — `GRAV = 2400`, bounce `0.42`, wall bounce
  `0.5`. Two numbers to tune feel.
- **Perf rules (July 2026 pass — Mark reported cursor lag/chop):**
  - The rAF loop must never read layout (`offsetWidth`/`getBoundingClientRect`);
    cursor + reveal are centred with `translate(-50%,-50%)` instead.
  - The cursor dot follows 1:1 (no lerp) — with `cursor: none` a lerped dot reads
    as input lag. Only the reveal plate keeps its lazy trail (`LERP_PLATE 0.12`).
  - Ink pooling is gated by the hero box cached in document coords (`heroGate`,
    re-measured in `positionAnchors`) — mousemove does ZERO layout reads anywhere
    on the page. Per-letter rect reads only run near the hero; swell `t` is
    quantized to 20 steps (the 0.28s `.ch` transition hides the steps) so glyphs
    aren't re-shaped every frame; identical axis values are never re-written.
  - The grain is a pre-baked 180px tiled data-URI SVG on a div, NOT a live
    full-viewport feTurbulence (that re-rasters the whole screen).
  - NO full-screen blend modes, ever: the ticker/reg-mark animate continuously,
    so a full-screen `mix-blend-mode` layer makes the compositor isolate and
    re-blend the entire page every frame forever (this alone read ~26fps on
    Mark's machine). The old multiply/screen grain look is baked into the tile
    alpha instead — multiply by gray g at opacity a === black at alpha a(1−g);
    screen === white at alpha a·g — pixel-identical on any backdrop. Day tile
    flattens noise over white, night tile (`.night .grain`) over black. The
    cursor dot keeps its `difference` blend: tiny region, negligible.
  - Transform/text writes are skipped when the value didn't change (cursor, plate,
    scroll %, reveal background).
  - Next.js was considered for perf and rejected: the jank was runtime layout
    thrash, not load time. Site stays vanilla (colophon says NO FRAMEWORK).
- **Known dev quirk:** the embedded Claude browser pane throttles rAF/compositor —
  transitions stall and screenshots go stale there. NOT a site bug; always confirm
  in a real browser before "fixing."

---

## 6. Placeholder content awaiting Mark's real data

- The 4 project names, descriptions, and plate art.
- Trail years/facts (2019–2026 milestones are invented).
- Desk rows (reading/listening/coffee count).
- "EST. 2019", "AVAILABLE Q4 2026", coffee "Nº 094".
- Timezone if not US Pacific.

---

## 7. Session history (July 10, 2026 — how we got here)

1. Started as a fictional studio one-pager ("CAIRN™ — Ink, stone & signal") Mark
   called "a good start but generic." Asked for award-winning uniqueness.
2. Researched Awwwards/Muzli patterns → built the proof-sheet concept: proof-mode
   underdrawing (press P then), print furniture, cairn stones, ink pooling. Split
   into 3 files.
3. Personalized to Mark: "Code, design & nerve," one voice in two pens, SEE THE
   MESS, desk clock. (Clarified: "signature" = the interaction, not an autograph.)
4. Controller-decal pass: acid accents, spec clusters with hover-decodes, hazard
   stripes, tape, ghost M., night office, paint chips, visit counter, telemetry.
5. Added sections (house rules → later killed), desk board, colophon, the cat,
   per-viewport mess reveals.
6. Recruiter pass: project descriptions; late-night footer dialogue; night-mode
   stamp visibility fix. (WHAT I DO built → later killed.)
7. Awwwards re-research (Snellenberg, Pertant) → THE TRAIL SO FAR replaced WHAT I
   DO; desk restored to human rows.
8. Two-layer rule enforced (hand marks moved to mess only) + **LOOSE TYPE** physics
   added as the third main-page signature.
9. Performance pass (cursor felt laggy/choppy): killed per-frame forced reflows,
   dot now 1:1, grain tiled, ink pooling gated to the hero. Next.js rejected as a
   perf fix — see perf rules in §5.

## 8. Ideas discussed but not built (fair game later)

- Project detail pages, each as its own proof sheet / case study.
- Desk board fed from a small JSON Mark edits.
- Cat blinking or tail-flick after she's drawn.
- Stone-skipping or cairn-balance mini-game (parked — don't dilute the guestbook).

---

*Memory also lives in the agent's memory folder (`design-taste.md`,
`prototype-portfolio-project.md`) — keep both in sync when taste rules change.*
