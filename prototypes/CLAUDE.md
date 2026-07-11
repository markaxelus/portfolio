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
- **The dog-ear peel** — a draggable page corner that peeled the proof back over
  the mess (three revisions deep: corner flap → proximity lift → full-screen
  peel with click-to-open, replacing the SEE THE MESS button). Mark: "idk if I
  like this peeling thing I think we need to think of something else u can
  bring back the button." Removed July 2026; the corner button is back. A
  replacement "big gesture" is an open question — do not rebuild the peel.

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
   Has `margin-top: 10vh` so it never parks at the fold on load — the hero is
   ~one viewport tall and the marquee used to idle exactly under the jobline
   (Mark flagged this twice; the jobline is also docked flush to the sheet edge,
   `bottom: 3px`, out of the content's travel path).
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
  The jobline sits on a **solid stone chip, docked flush to the bottom edge**
  (`bottom: 3px`) so page content passes under it, never through it; the sheet
  is softened via `color-mix`, NOT opacity (Mark flagged the SHEET Nº / ticker
  collision twice — see also the ticker's 10vh margin in §4.2).
- Corners: MARK AXELUS / CONTACT ↗ / ©2026 — ALL MINE + live LA clock / SEE THE
  MESS (↔ OK, ENOUGH), all **bordered tabs that invert on hover** (SEE THE MESS
  fills pencil red) — Mark said they read as background before; they must look
  clickable.
- `[N] NIGHT OFFICE` decal button top-right; `[S] PRESS NOISE — OFF` decal under it
  (opt-in sound, see delights); grip tape "AXELUS • AXELUS" up the left
  edge; hazard stripes; `SCROLL 042%` live telemetry; cairn scroll indicator
  (5 stones stack with scroll progress); `[RUN.M] MESS LAYER ARMED` + blinking acid
  caret; hero spec cluster with hover-decodes (`00.MA2093` → "means nothing. looks
  great.", `VISIT Nº 007` → real localStorage visit counter, rolls like an odometer
  on arrival).
- **The page is awake**: every 9–22s it does ONE small unprompted act — a hero
  letter rattles in its case (invites the grab), a spec decal re-decodes itself
  (scramble → settle), or the regmark corrects its drift (`rotate` composes with
  the transform `reg-spin`, so the drift never resets). Rattle is weighted double
  (it carries discovery). Never in mess mode (the cat has that shift), never when
  the tab is hidden, never under reduced motion or `?still`. Plus the ghost M.
  parallaxes at 0.12× scroll (transform-only write inside the existing scroll rAF).
- **Press check intro**: once per session (sessionStorage `ma-press-check`) the
  hero loads as three misregistered passes — red (`--pencil`) and blue (`--accent`)
  text-shadows under the ink — that slide into register (0.85s, starts 1.6s, after
  the last line lands) while the regmark locks in (`reg-lock`). Any input skips it;
  reduced-motion and `?still` never see it.
- **Ctrl+P prints a clean proof**: real `@media print` stylesheet — black ink on
  white, crop marks, jobline, "PRINTED FROM THE WORKING PROOF · MRKAXELUS@GMAIL.COM"
  slug, all screen chrome stripped, sections reflowed with `break-inside: avoid`.
- Custom cursor (dot; PROOF ↗ over rows; GRAB over headline; LIFT over the
  dog-ear), grain overlay.

### Modes & keys
- **M or P** — mess layer (also `?proof` URL / `#proof`). Esc exits.
- **N** — night office (auto-on 23:00–06:00 LA time when no stored pref; persisted
  on manual toggle). Dark ink sheet, acid accents, brightened pencil red
  (`#F0603F`), stamp switches to normal blend (multiply made it invisible — fixed).
- **R** — reset the loose type case.
- **S** — press noise on/off (also the `[S]` decal). Opt-in, never persisted —
  sound is a per-visit choice, not an ambush on the next load. Two sounds only:
  letterpress clack when thrown type lands hard, stone tok when a stone drops.
  WebAudio, synthesized, context created lazily on first enable.
- **`?still`** — freezes all motion (press shots / deterministic screenshots).
- **`?fps`** — dev-only frame meter (measured FPS + worst frame ms per window).
- Reduced motion respected everywhere (no physics, no draw-ins, instant toggles).

### Easter eggs / delights
- Console: "you looked under here too? we'd get along. press M. — mark" (red mono).
- Stamp: "MARK AXELUS — WORKING PROOF / STILL NOT DONE / AT MY DESK · date".
- Every 9th visitor stone is a blue "signal stone."
- Tab blur → title becomes "— come back, the kerning isn't done"; restores on focus.
- Visitor stones carry a number + timestamp (`data-n`/`data-t`); hovering one shows
  "Nº 023 — 3 DAYS AGO" (house stack says "THE HOUSE STACK — MINE").
- The registration mark is a fidget: click → two fast turns, eases back to its
  90s drift (`reg-fidget`).
- Two idle minutes → "STILL HERE? IT STILL ISN'T DONE" fades in bottom-center
  (re-arm throttled to 1/s so mousemove storms don't churn timers).
- Mess layer: the cat tail-flicks every 6–15s once drawn in (`tail-flick`,
  scheduled only while M is on — `catLife()` in `setProof`).
- Mess layer, 23:00–06:00 desk time only (`body.late-desk`, ticked with the clock):
  one extra outro scrawl — "you're up late too?" — day visitors never see it.

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
- **localStorage keys:** `cairn-stones-v1` (stones now also store `t` timestamp +
  `n` sequence number), `ma-night`, `ma-accent-i`, `ma-visits`, `ma-stone-seq`.
  sessionStorage: `ma-press-check`. Noise preference is deliberately NOT stored.
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
10. (`prototypes-big-three`) Delights batch —
    Mark picked "the big three": the **dog-ear** (drag the corner, proof peels
    back over the mess, peel far enough to fall in), the **press-check intro**
    (once per session, misregistered passes slide into register), and a real
    **print stylesheet** (Ctrl+P → clean proof sheet). Plus the small delights:
    tab-blur title, visit-counter odometer, regmark fidget spin, stone
    timestamps/hover tips, idle whisper, opt-in press noise ([S] decal), cat
    tail-flick, and the 23:00–06:00-only "you're up late too?" scrawl. All
    verified headless (Playwright): 12/12 behaviors pass, no console errors.
11. (`prototypes-big-three`) Alive pass, from Mark's review — "the page should
    feel alive, its own entity"; "peeling should be more obvious"; corners
    "don't seem clickable"; jobline overlapped the ticker; hero comma was
    clipped. Built the awake scheduler (flutter / rattle / mutter / hiccup),
    dog-ear proximity lift + teach flutter, ghost-M parallax; corners became
    bordered invert-on-hover tabs; jobline got a solid chip (sheet dims via
    color-mix now, not opacity); entrance masks release on `.landed` so commas
    and descenders render whole; [N]/[S] decals moved clear of the CONTACT tab
    (desktop + mobile hero padding). Comma clipping was NOT a design choice —
    it was a side effect of the entrance masks.
12. (`prototypes-big-three`) One-corner rule + full-screen peel, from Mark's
    review — "why is SEE THE MESS right beside the peeler, choose one or the
    other" and "when u peel it should actually peel the whole screen, not peel
    it halfway and then it pops." The dog-ear became the single way in (click
    opens, drag peels, threshold release finishes the peel across the whole
    screen); SEE THE MESS button is mess-only now (OK, ENOUGH). Peel handoff
    is seamless: de-under grid matches .under exactly.
13. (`prototypes-big-three`) **Dog-ear removed** — even at full-screen, Mark
    didn't like the peel ("idk if I like this peeling thing... u can bring back
    the button"). Peel deleted entirely (HTML/CSS/JS), SEE THE MESS corner
    button restored, flutter act dropped from the awake scheduler (rattle /
    mutter / hiccup remain). Ticker/jobline collision fixed for real this time:
    the marquee parked at the fold on load, under the jobline — ticker got
    `margin-top: 10vh` (below the fold at load on all screens) and the jobline
    docked flush to the edge. Dog-ear is in the graveyard (§3); the fourth
    signature slot is open — candidates should be pitched to Mark first.
14. (branch `prototypes-signature-4`, off prototypes-big-three) **Three
    signature-Nº4 candidates built as tryouts** — Mark said "try the signature
    slots but new branch". None is chosen yet; he picks, the rest get deleted.
    - **Light table (hold L, or the [L] decal hold)**: momentary, no mode —
      `body.lit` backlights the sheet (`.lightglow` radial, z 40, no blend
      modes) and the mess bleeds through in place: `.under` at .55, notes /
      amarks / stamp / chip-ring at ~.3, scrawls forced fully drawn. Gated
      off inside the mess. Key L down/up + decal pointerdown/up.
    - **Printer's loupe (press-hold a plate row)**: the reveal plate FREEZES
      (frame loop skips the lerp while `loupeOn`), a 184px glass follows the
      pointer magnifying the plate at 2.2× — background-size/position math
      accounts for the plate's `background-size: cover` crop. Plates now carry
      9px "margin whisper" micro-notes (per-project `micro` lines + "IF YOU
      CAN READ THIS YOU FOUND THE LOUPE"), dots at 1:1, legible only under
      glass; halftone bumped 0.10→0.14. Row mouseenter/mouseleave are guarded
      while the glass is down (else the sheet re-skins mid-inspection); a
      loupe press suppresses the row's click. GOTCHA: canceled pointerdown
      suppresses compat mousemove, so a pointermove listener feeds mouse.x/y
      while held.
    - **Plate pull (shift-drag the headline)**: red/blue passes come off
      register via inline text-shadow with a resistance curve (`softPull`,
      pow 0.72, clamp ±110px), thunk back on release (`.plates-return`
      transition). Shift is the discriminator vs loose-type grabs (char
      pointerdown returns early on shiftKey). Cursor label OFF REGISTER.
15. **The bonsai + page-cat experiments live on branch `prototypes-cat`**
    (commits 8d191ba → 2757544, on top of this branch). Mark asked for a
    hero bonsai and a living cat, iterated through four versions (choreo
    vignette → living rig → legged walk + yarn physics → real silhouettes
    traced from his AdobeStock_232143247.ai), then said "put all this in
    its own branch I dont like the way it is rn" — so it was split off
    whole. The generative bonsai (+ mess note, ticker line, leaf act) went
    with it; if Mark wants the tree WITHOUT the cat, strip the cat from
    that branch rather than rebuilding. The stock .ai sits untracked in
    prototypes/. Nothing from that branch is merged anywhere.

## 8. Ideas discussed but not built (fair game later)

- Project detail pages, each as its own proof sheet / case study.
- Desk board fed from a small JSON Mark edits.
- Stone-skipping or cairn-balance mini-game (parked — don't dilute the guestbook).
- Hidden **cyanotype proof** (blueprint-blue paper, white ink, found by a quiet
  gesture, not a fourth paint chip). Print-authentic but it's a third full palette
  to maintain across night mode + mess — only build it if Mark says he's in love.

---

*Memory also lives in the agent's memory folder (`design-taste.md`,
`prototype-portfolio-project.md`) — keep both in sync when taste rules change.*
