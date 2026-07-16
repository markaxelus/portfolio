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
2. **The stones** (visitors' cairn — no longer just a guestbook: your stone
   lands ON the cairn, which leans and topples, §4.6)
3. **Loose type** (hero letters are grabbable/throwable letterpress physics)
4. **The plate pull** (shift-drag the headline → the ink passes come off
   register; chosen July 2026 over the loupe / light-table tryouts, §4.1)

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
- **The ghost M.** — the huge 36vw italic glyph bleeding off the hero's right
  edge. Mark: "can we have something else instead of the M... Im not a fan."
- **The ghost target** — its replacement, an oversized faint registration ring.
  Mark: "not a fan of that ring." LESSON: big abstract ghost fillers die here;
  the hero wants real OBJECTS with craft (specimen, plates, stones). Replaced
  by the ampersand specimen (§4.1).
- **Play-the-typeface (drag instrument on the 144pt &)** — built, pulled same
  day. Mark: "Im not saying to make like play... I want elements that can
  fill in the gap like that [the & cascade] was a good start." The hero
  wants quiet PRINT FURNITURE that fills, not toys. Hover-swell stays.
- **The light table (hold L)** — one of three signature-Nº4 tryouts (§7 #14).
  Struck July 2026 in the sharpen pass: it read as a debug rectangle and did
  a worse version of what M already does. The plate pull won the slot; the
  loupe stays as a quiet unlabeled delight. Do not rebuild it.
- **The trail-as-timeline** — five equal ovals evenly spaced on a straight
  dashed connector. The connector was the metronome tell; a juror flagged it
  as the one templated section. Replaced by the measured FIG.1 terrain
  (§4.3). Don't put the dashed connector back.
- **The imprint's five deaths** (v2 site, July 2026) — impressum scraps
  ("looked empty"), a bordered two-shifts box ("read as linear"), the torn
  night-slab, a scattered off-axis colophon, then THE STATUTORY LINE — one
  big typeset sentence with mono margin instruments. Mark on the sentence:
  "this is so bad… this is all just words. Add assets, svgs, interactivity,
  make it asymmetrical. That's what the rest of the page has." LESSON (two
  halves): a section must BE one real print-world object — but TYPOGRAPHY
  ALONE IS NOT AN OBJECT on this site. Every living section has a crafted
  VISUAL ASSET plus a gesture (line/plate/cairn/specimen). The v6 HARBOUR
  CHART (engraved strait + marlin) nailed asset+gesture but died on a
  SECOND law — Mark: the figure's CONTENT was ocean-sector-specific; a sea
  chart reads "ocean job" whatever the labels say, and dies the day the
  job changes. Resolved as FIG.2 — THE DESK, SURVEYED (v7, 81bfb32): an
  architect's plan of the desk itself — the one subject employment can't
  invalidate. The chair = SHIFT 02 · NIGHT STATION; SHIFT 01 = the commute
  dashing OFF THE PLAN's edge (any employer/startup is "the station off
  this sheet"); facts in one SHIFT01 config block; ink-in on entry, red
  pass registers on hover, live RUNNING lamps. LESSON: the figure must be
  tied to the DESK or the PLACE, never the employer's industry — and the
  editable facts live in one config block, never in the artwork.

---

## 4. Current page structure (top to bottom)

1. **Hero** — the V3 LOCKUP: a giant roman Fraunces & (`#amp`,
   clamp(13rem, 30vw, 36rem), opsz 144 wght 470 — NEVER name SOFT/WONK in
   its axis string, that swaps in a narrow alternate &) sits BEHIND the
   Excon uppercase words MARK (`#markw`, −3° rest splay) and MY DESK
   (`#deskw`, +1.8°) which cross its body — same grid cell, words z1, & z0.
   Bio: "I'm Mark, a software engineer. / One person, one desk, a very high
   bar. / This is the fourth version this year; the first three weren't
   good enough." (History: §7 #28–#29 word-hunt "Mark / & my desk" →
   hero-asym V3 mock chosen; per-char .ch spans kept everywhere.)
   - Ink pooling: letters swell (wght/SOFT axes) near the cursor.
   - **LOOSE TYPE**: grab a letter → letterpress physics (gravity, bounce, spin
     inside the hero). Decal `[!] LOOSE TYPE — GRAB A LETTER` ↔ `[R] RESET THE CASE`
     (click or key R). Cursor label GRAB / WHEEE. Desktop fine-pointer only.
   - Bio right column; the **ampersand specimen** on the right edge — his
     favourite glyph cascading through Fraunces' optical sizes (9→144) with
     tiny mono axis labels, like a torn corner of a specimen book. The 144pt
     one is italic in the accent (echoes the headline amp). Each glyph swells
     on hover (CSS font-variation transition, `calc(var(--w) + 90)` + SOFT).
     Dims as `.final`-alike in mess; hidden ≤820px; PRINTS (it's content).
     Replaced the ghost M and the ghost target (both graveyarded — no more
     abstract ghost fillers).
   - The specimen is a COMPOSED PLATE, not a floater: header rule +
     cascade + footer caption ("ONE GLYPH, PULLED AT EVERY SIZE · NOT FOR
     RESALE"), with the **ink calibration TONE BAR** (8 steps, 10→80%,
     rotated caption) beside it and the dashed **FOLD LINE** at 57%
     structuring the void ("the void is measured, not empty"). Hover
     still swells the glyphs. GOTCHA RECORDED:
     `.hero-title.landed .hl { animation: none; transform: none }` is
     REQUIRED — a filled entrance transform makes each full-width .hl a
     stacking context that steals the specimen's pointer events.
   - **REPAINT = REPRINT**: clicking a paint chip re-registers the headline
     (0.45s press-register flash in the new accent). Chip clicks only —
     not init, not night toggle.
   - **THE PILE** (`.frame::before`): two offset sheet-edges + soft stack
     shadow at bottom-right — the proof is the top sheet of a stack.
2. **Ticker** — personal marquee in Mark's voice ("THE KERNING IS DONE — IT
   ISN'T", desk status by LA hour). **Exactly one hint per cycle** — press M
   for the mess — the rest is voice (sharpen pass: it used to read its own
   manual, nine instructions per loop; the decals + the awake rattle teach the
   other interactions now). Pauses in mess mode.
   Has `margin-top: 10vh` so it never parks at the fold on load — the hero is
   ~one viewport tall and the marquee used to idle exactly under the jobline
   (Mark flagged this twice; the jobline is also docked flush to the sheet edge,
   `bottom: 3px`, out of the content's travel path).
3. **THE TRAIL SO FAR — FIG.1** — recomposed as a captioned figure, not a
   timeline (sharpen pass). Header rule + `FIG.1 — THE TRAIL SO FAR` /
   `ONE STONE PER YEAR THAT MATTERED · 2019–2026 · NOT TO SCALE`. Stones
   sized by the weight each year carried (`--sz`) and lifted to varied
   elevation (`--lift`); the **ground line is MEASURED** through the actual
   stone bases by `buildTerrain()` (a `#terrain-ground` SVG, run at
   load/fonts.ready/resize — never in a frame loop), with hairline drops to
   a legend row. The **2022 gap is left as a gap** (a dashed vertical tick +
   faint `2022` label, no stone). The **2026 stone is accent-colored and
   proud** — the ground climbs to it. `terrain-stones` and `terrain-labels`
   share one grid template so labels sit under their stones. Mobile hides the
   measured ground (a hairline under the stones) and drops the legend to two
   columns; print rules the stones + prints the legend. Serif facts on the
   final layer; the red asides ("terrifying. correct." etc.) are MESS-ONLY,
   plus "the gap in 2022? we don't talk about 2022."
3½. **THE THOUGHT-THREAD = THE RE-READ (mess only)** — the spine of the
   hidden page, redirected per Direction Nº 001 (Mark: the line was "too
   linear... looks a bit dead... direct user eyes to certain spots").
   The line is Mark re-reading his own margins at 2am: it ROUTES through
   the real note positions (drafts → amp → line-height → do-not-scale →
   [hesitation knot] → 2022 → tic-tac-toe LOOP → [spur toward "one more
   pass", scratched out] → coffee LOOP → the record → TODAY-card LOOP →
   the graves → arrow onto "Write to me."). Two path pairs: RED day pen
   (#th-a) hands off to GRAPHITE 2am pen (#th-b) AT THE RECORD — the
   scroll crosses midnight. A tip-dot rides the head of the stroke (the
   pen is writing NOW); echo passes give pencil texture; reveal is mapped
   by monotonic max-y samples so the pen darts between notes and lingers
   inside loops (`thSamples`, binary search per scroll frame + one
   getPointAtLength for the tip — no layout reads). Events (#th-spur,
   #th-scratch, #th-arrow, pathLength=1) toggle by drawn-length
   thresholds. Anchors hidden at a breakpoint are skipped gracefully.
   Full-drawn under `?still`/reduced motion. z 4.
   **THE PEN HAS A SPEED** (Mark: "the line should be smooth but its
   snapping"): the drawn length CHASES the scroll target through a
   capped lerp (`threadStep` rAF, TH_SPEED 3600 px/s, lerp .16) — a
   violent scroll becomes a continuous sprint, scrolling up retracts
   smoothly (verified ≤61px stroke/frame both directions). The
   catch-up clamp (retrace only the last 1100px) fires ONLY on
   mess-entry — `updateThread(true)` — never during scroll.
4. **SELECTED WORK** — 4 fictional placeholder projects (Meridian, Low Relief,
   Night Office, Signal Garden), each with one-line description, REF// part number,
   generated SVG press-plates **in the site's own inks** (sharpen pass: ink
   field + accent linework + the red working pass off register + halftone +
   proof slug + ghost numeral). No exotic per-plate hues — told apart by MOTIF
   (arcs/stripes/orbits/steps), not colour, so the colophon's `3 INKS` holds.
   The plate always takes the luminous (night) accent so it reads on the dark
   tile in any mode. **The paint chips reprint the work** (`rebuildPlates`):
   a chip re-inks every plate surface on screen — thumbs, hover reveal, loupe,
   and the open viewer (REPAINT = REPRINT, extended from the headline to the
   plates). Cursor-trailing plate reveal on hover (desktop), static thumbs
   on touch. Row titles go WONK on hover. Mess: row notes, "fav." circle on 03,
   the cat + zzz on row 04, and the pen argument ("ship it." / "one more pass.").
   **Clicking a row opens the PROJECT VIEWER** (`#pv`, z 60): each project is
   its own full proof sheet — accent kicker, giant title, sticky meta rail
   (CLIENT/ROLE/STACK/WHEN/MADE), plate hero, THE BRIEF / THE NERVE sections,
   two generated specimen details (`detailURI`), a 3-figure outcome row, pull
   quote, giant NEXT PROOF handoff (hover inverts), per-sheet jobline, ghost
   numeral. Case copy lives in `CASE` in main.js (ALL PLACEHOLDER). Routing:
   `#p-01…04` deep links, hashchange + back button, Esc closes (before mess),
   history entries deduped. Loupe vs click on rows: press-and-HOLD 230ms
   summons the glass; a quick click opens the sheet. Data-URI backgrounds are
   assigned as JS properties (quotes break inline style attributes). Mess-mode
   notes render inside each sheet (`c.notes`, observed on open if the mess is
   already up). Anatomy follows awwwards case-study conventions (researched:
   context-first meta, long-form magazine flow, next/prev footer).
5. **AT THE DESK — RIGHT NOW-ISH** — BUILDING "This site. Again." / READING "The
   Shape of Design, again" / LISTENING "The same three albums, on loop" / COFFEE
   "Nº 094 this quarter". Mess: "update this, mark. it's been three weeks.",
   coffee-cup doodle, tally marks ("lost count in march.").
   - **THE OPERATOR'S PLATE** (July 11): Mark's photo (`operator.jpg`, 800×1000
     crop of IMG_2814) printed in the site's inks — inline SVG, duotone via
     feComponentTransfer (ink→paper), a misregistered RED PASS at translate(7,5)
     multiply-blended under the ink pass, the plates' 9px halftone screen, the
     rotated proof slug ("PROOF 00/04"), grain. `isolation: isolate` keeps the
     multiplies inside the plate (no page-level blending — perf rule holds).
     **Hover slides the red pass into register.** Baked colors like every
     plate — it stays a lit print on the night sheet. Desk is a 2-col grid
     ≥821px (rows | plate); plate keeps `margin-right: 2.4rem` to clear the
     fixed edge chrome (scroll telemetry + cairn indicator); TODAY card moved
     inboard (`right: 30%`) and n-desk to `right: 34%` because the plate owns
     the old top-right void. Prints (≤52mm, candid hidden).
   - **THE CANDID (mess)**: `body.proof` reveals the unscreened color original
     taped over the dimmed plate — white photo border, two tape strips,
     day-pen "me, apparently." floating left of it. The two-exposure echo:
     the FINAL layer gets the screened official portrait, the mess gets the
     real one. A profile picture was Mark's ask; the circle-avatar "bubble"
     was rejected on concept — the photo had to become a print artifact.
6. **PASSERS-BY (visitors' cairn)** — the guestbook that keeps its promise
   (sharpen pass, the labeled risk). A click/tap adds your stone **ON the
   cairn**, not beside it: the tower grows on the studio's own stack (`OURS`,
   the foundation, never falls), a **seeded lean** develops (`leanStep`,
   deterministic per stone), and past `LEAN_LIMIT`/`STACK_CAP` it **topples**
   — the stacked stones fall to the ground row (an accelerating, heavy fall
   with tumble, `e*e` easing, never a bounce) and the count flashes "THE STACK
   FELL — WE STACK AGAIN". Fallen stones persist as the ground (`GROUND_CAP`
   erosion); the leaning tower persists too. Every 9th stone is a signal
   (accent) stone; hover tips read `Nº 023 — 3 DAYS AGO` / `THE HOUSE STACK
   — MINE`. Every stone is one `<g>`-per-stone (positioned group + inner
   anim group + origin-centred blob) so the topple is **pure transform
   writes** — 165fps through the fall, no layout reads in the rAF. Reduced
   motion seats every stone and the collapse instantly; a `cairnBusy` guard
   stops fast clicks racing the fall. Storage: `cairn-stones-v2`
   (`{stack, ground}`; v1's scattered stones migrate into `ground`). The
   `#yard-svg` viewBox gained headroom (`0 -80 1000 240`) for the growing
   tower. NOT the parked stone-balance mini-game (§8): no aim, no score, no
   fail — the same one click, now with weight.
7. **Outro** — "Got a brief? / Write to me." + colophon ("NO FRAMEWORK · NO
   TRACKERS · HAND-BUILT / 24PX GRID · 3 INKS · 1 CAT"). Mess: "it just never
   stops, does it." / "you love it though. — 2am me", moon+stars, paper plane,
   Write-to-me circle (JS-anchored), "mention the stones" handshake.
   - **SOCIAL TABS** (July 11): GITHUB ↗ / LINKEDIN ↗ under the email meta —
     corner-tab language (stone bg, hairline border, invert to ink on hover)
     with small currentColor SVG icons. github.com/markaxelus confirmed from
     the repo remote; **linkedin.com/in/markaxelus is a GUESS — confirm with
     Mark** (§6). In print they flatten to slugs with full `attr(href)` URLs.
   - **THE OK SLIP** (Direction Nº 003, P3): the visitor is the press-check
     client and the sheet has been AWAITING OK all along. A bordered slip
     before the social tabs: machine-set initials field (typed, never
     handwritten — the hard rule holds), three stamp-tabs that commit on a
     ~620ms HOLD with the accent ink visibly rising (`.ok-tab::after`
     scaleY) — the face says HOLD; Enter/Space commit for keyboards, Enter
     in the field passes the sheet (nothing key-only, nothing hold-only).
     The stamp thunks down steel-crisp in the accent at −4° (same double
     ring as the mess stamp, none of its hand — that one is rubber, this
     one is steel); the jobline permanently gains `· PASSED FOR PRESS ·
     OK "JD" · 14:32`; the mess argues back per verdict (ok: "someone
     passed it. it is not done." / "who let them in.", corrections:
     "corrections. plural. i know about the kerning.", reproof: "yeah. i
     know.") and clocks a re-stamp ("changed your mind. noted.",
     `okState.n`). Persisted `ma-ok-v1`; prints on the Ctrl+P proof minus
     the screen instructions. Typing initials is guarded from the M/N/S/R
     mode keys (INPUT check in both keydown handlers).
   - **THE JOB LOG** (Direction Nº 003, P4): the shop witnesses you. One
     dry typeset line per playful act, desk-time stamped, newest first
     (top), in the LEFT column beside the OK slip (moved there July 13 —
     approve + witness together) — hidden until your first act opens it.
     Hooks: chips ("ink changed to acid. bold choice."), throws (+ "that's
     four throws. the type forgives." at exactly four), case reset, plate
     pull (only if a drag actually happened — `lastPullShadow` gate),
     loupe (once per plate), stones ("the stack… hm." when the next one
     topples it), the fall, night by hand only (the 23:00 auto-dim is not
     the visitor's act), "the margins read." (once/session), the stamp,
     "the sheet fully pulled." (once ever, from `retireLine`), and
     beforeprint ("a clean proof pulled to paper."). Adjacent identical
     acts collapse into one line with a fresh clock; last ~10 kept; a
     returning session's first act inserts `— reading nº 003 —` from the
     real visit counter. Fine print: THIS LOG PRINTS ON YOUR COPY ONLY.
     SHOP POLICY. (It does print — that's where the joke lands hardest.)
     `ma-presslog-v1`; renders only on acts, never in a loop.
     **REFINED (July 11, Mark's note — "it drags the page down... should be
     scrollable and cap at a height... if it gets approved it writes it out
     so the system looks alive"):** `#jl-lines` is now a capped 7.5rem
     window (`overflow-y:auto`, `overscroll-behavior: contain`) that
     auto-scrolls to the newest line, so a long shift never grows the outro.
     **THE SCROLL RAIL is real DOM (July 13), not a native scrollbar:** the
     ticket printer's tractor feed — a `.jl-rail` (sprocket-hole radial-gradient
     down a hairline margin) + a js-synced `.jl-thumb` ink carriage (`#jl-rail`/
     `#jl-thumb` inside a `.jl-scroll` wrapper; `updateJoblogBar()` runs off
     `scrollLogEnd` + scroll/resize, thumb is draggable and inks up to the
     accent on hover). Shown only on overflow (`.has-scroll`; ~10+ acts). WHY
     DOM: native `::-webkit-scrollbar` is ignored by overlay/fluent Chrome
     (Mark: "I dont see that change") and barely styleable in Firefox — a real
     element renders identically everywhere. Verified headless day+night, 11
     seeded lines over a 120px window, zero errors. New entries TELETYPE out char-by-char with a blinking
     block caret (`.jl-typing::after`, `typeOutLast()` — renders all but the
     newest instantly, then chatters the last line like the shop's ticket
     printer); the stamp/approval line rides the same path, so getting passed
     for press visibly prints itself. `logAct(line, instant)` — load, print,
     reduced-motion and hidden-tab pass `instant`/take the instant `renderLog()`
     path (so a Ctrl+P proof captures whole lines and the full log still prints
     UNCAPPED — `@media print` lifts the cap). `renderLog`/`typeOutLast` build
     via `textContent` now (was innerHTML string-concat). Verified headless:
     10 seeded lines clip to 120px over 265px scroll, pinned to newest;
     new act types 3→23 chars live; caps at 11; zero console errors.

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
  reduced-motion and `?still` never see it. Since Direction Nº 003 it is no
  longer a one-off: it's the hero's STRIKE — the first note of the governing
  law (everything on this page is struck, and you are present for the striking).
- **THE IMPRESSION LINE** (Direction Nº 003, P1 — the flagship): below a fixed
  hairline at 62vh (`.impline`, labeled `IMPRESSION LINE — THE SHEET PRINTS AS
  READ` in the FOLD's furniture voice), every section is blind impression —
  real type, uninked: transparent fill + a two-tone emboss rim (`--emb-hi`/
  `--emb-lo`, day and night variants), svg linework pressed to the rim tone,
  plates ghosted to 5%. As a unit's first visible child crosses the line it
  STRIKES: ink floods in ~120ms (transitions ride on `.striking`), the unit
  shudders 1px (inline `translate` steps — a keyframe would restart filled
  entrance animations), and the regmark ticks one notch (36° per unit; a full
  first read turns the crosshair exactly once). One-way, persisted per unit
  (`ma-struck-v1`); struck is the DEFAULT — js arms `.unstruck` at boot, so
  no-js/print/reduced/?still simply ship printed. Ten units (ticker, trail,
  index head, four rows, desk, yard, outro); the hero is always pre-struck
  (the intro is its strike). A deliberate click/focus strikes a unit early;
  entering the mess strikes everything ("you can't annotate unprinted
  paper"); beforeprint strikes all. When the last unit lands the line
  retires and the colophon admits it: `PULLED IN ONE VISIT` / `PULLED OVER
  003 VISITS` (`ma-pulled-n`). Unstruck rows don't run their reveal/hover
  choreography — unprinted paper doesn't perform. GOTCHA: strike positions
  are cached at load/fonts.ready/resize (`measureStrikes`, same discipline
  as buildTerrain) so the scroll rAF does pure math.
- **HOLD REGISTER** (Direction Nº 003, P2): the sheet is only true when you
  are still. One global registration-error scalar written in the existing
  scroll rAF: scroll velocity shears the ink passes of the display type —
  hero headline, row titles, outro title, the 144pt specimen amp (`.regel`,
  never body text) — 1–3px via the press-check's text-shadow pass language,
  quantized to quarter-px so identical frames write nothing. ~300ms of
  stillness thunks everything home (`.reg-settling` transition, then inline
  styles clear). The regmark's crosshair drifts by exactly the current error
  (`translate` composes with `reg-spin`) — the page's live instrument. A
  hard loose-type landing kicks ~1–2px of error in (`regKick`); the plate
  pull owns the headline while in hand (`regHeroBusy`); the mess, the
  viewer, reduced motion and `?still` all pin the error at zero. The decal
  `[⇧] PLATES — SHIFT-DRAG, OFF REGISTER` sits under the loose-type decal
  (fine-pointer only) and its click runs a demo `regKick` — the gesture,
  taught by the gesture. This fixed signature Nº4's discoverability gap
  (nothing had advertised shift-drag since the ticker manual was cut).
- **Ctrl+P prints a clean proof**: real `@media print` stylesheet — black ink on
  white, crop marks, jobline, "PRINTED FROM THE WORKING PROOF · MRKAXELUS@GMAIL.COM"
  slug, all screen chrome stripped, sections reflowed with `break-inside: avoid`.
- Custom cursor (dot; PROOF ↗ over rows; GRAB over headline; LIFT over the
  dog-ear), grain overlay.

### Modes & keys
> **THE KEYBOARD RULE (Mark's note, July 2026, Direction Nº 003): nothing is
> ever key-only.** "They're not gonna know to press SPACE or M." Every feature
> has a visible, clickable, self-labeling affordance in the furniture language
> (SEE THE MESS tab, [N]/[S] decals, [R] on the loose-type decal, the [⇧]
> plates decal, HOLD on the stamp faces); keys are silent bonuses for people
> who live on keyboards. STOP THE PRESS (hold SPACE) was dropped from the
> press-check phase for exactly this — it only worked as a keypress.
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
- **The mess knows you** (`#knows-note`, under the stamp): visit-aware 2am
  scrawl — v1 "first time here. look around." / v2–4 "back again. the
  kerning still isn’t fixed." / v5+ "you again. leave a stone if you
  haven’t." Uses the existing `ma-visits` counter.
- **Fresh ink**: the scrawl nearest the cursor darkens a breath
  (`.note.wet`, filter) — note positions cached on mess-entry
  (`cacheInkNotes`), mousemove does pure math at ≤1/90ms. Kill-switch: the
  class and one listener.
- **The desk lamp**: entering the mess WARMS the paper — `body.proof` swaps
  `--stone`/`--stone-deep` a few degrees warmer (day `#E1DBCC`, night
  `#1A160E` via `body.night.proof`). Cozy was an explicit ask.
- **The music corner** (desk, mess): a hand-drawn record that spins (7s
  linear, only while the mess is open + drawn in; reduced-motion off) with
  tonearm, two ♪ doodles, and "side B. again." in the day pen.
- **The mood gauge** (index, mess): an arc with three ticks, the needle hard
  on the third — "fine · tired · *tired but wired* ←".

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
- **localStorage keys:** `cairn-stones-v2` (`{stack, ground}`; v1 migrates into
  `ground`), `ma-night`, `ma-accent-i`, `ma-visits`, `ma-stone-seq`,
  `ma-struck-v1` (impression-line units), `ma-pulled-n` (visits the full pull
  took), `ma-ok-v1` (press-check verdict/initials/time/count),
  `ma-presslog-v1` (job-log entries). sessionStorage: `ma-press-check`,
  `ma-log-sess` (reading divider), `ma-log-mess` (margins-read once).
  Noise preference is deliberately NOT stored.
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
  - **The measured trail ground** (`buildTerrain`, §4.3) reads layout ONCE per
    load/fonts.ready/resize (same discipline as `buildThread`/`positionAnchors`)
    — never per frame. **The cairn topple** (§4.6) animates each falling stone's
    `<g>` transform in a one-shot rAF with ZERO layout reads (positions are
    known SVG numbers), so a full collapse holds 165fps. **Plate reprints**
    (`rebuildPlates`) only fire on a chip click, never in a loop.
  - **Direction Nº 003 additions obey the same laws:** the impression line
    caches unit tops outside the rAF (`measureStrikes`) and strikes via class
    swaps + opacity/color transitions (body text never changes weight — zero
    reflow; display type strikes its axes, transition-smoothed); hold register
    writes one quantized text-shadow string per frame and skips writes when the
    quarter-px value didn't change; the job log renders only on user acts.
    Certified after P4: 162fps, 6ms worst frame, zero console errors, mobile
    inner/scroll 390/390.
  - Next.js was considered for perf and rejected: the jank was runtime layout
    thrash, not load time. Site stays vanilla (colophon says NO FRAMEWORK).
- **THE COMPAT-MOUSEMOVE GOTCHA (three sites now):** any `pointerdown` handler
  that calls `preventDefault()` suppresses compatibility mouse events for the
  whole hold — `mouse.x/y` (the cursor dot's feed) freezes until release. Every
  drag interaction must feed `mouse.x/y` from its own `pointermove` handler:
  the loupe, the loose-type drag, and the plate pull all do this. Mark reported
  the frozen-dot symptom on loose type July 11 (dot stuck at grab point,
  snapping to the real position on release).
- **GRAB label scoping:** the `.hl` lines are full-width blocks, so hover on
  `#hero-title` covered huge empty areas. GRAB is delegated to the `.ch` spans
  (mouseover/mouseout, 90ms exit debounce to bridge word spaces). The
  loose-type and plate-pull `pointerup`s only keep the ring if the release
  actually lands on a letter.
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
- **LinkedIn URL** — outro tab points at linkedin.com/in/markaxelus (guessed
  from the GitHub handle); confirm or correct. GitHub URL is confirmed real.

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
15. (`prototypes-signature-4`) **Ghost target + project viewer + mess
    expansion**, from Mark's brief ("something else instead of the M...
    build out the actual projects page... more content on the hidden page...
    draw inspirations from the awwwards websites"). Ghost M → generated
    registration-target (§4.1); the project viewer (§4.4) with placeholder
    case copy; mess additions: TODAY card w/ struck items (desk), pen
    argument (index), tic-tac-toe "cat's game. both players were me."
    (trail), hand sitemap (yard — NOTE: .yard needed position:relative),
    RIP tombstones for the graveyard features (outro), "do not scale" (hero).
    Loupe changed to press-and-hold (230ms) so row clicks open sheets.
16. **The bonsai + page-cat experiments live on branch `prototypes-cat`**
    (commits 8d191ba → 2757544, on top of this branch). Mark asked for a
    hero bonsai and a living cat, iterated through four versions (choreo
    vignette → living rig → legged walk + yarn physics → real silhouettes
    traced from his AdobeStock_232143247.ai), then said "put all this in
    its own branch I dont like the way it is rn" — so it was split off
    whole. The generative bonsai (+ mess note, ticker line, leaf act) went
    with it; if Mark wants the tree WITHOUT the cat, strip the cat from
    that branch rather than rebuilding. The stock .ai sits untracked in
    prototypes/. Nothing from that branch is merged anywhere.

18. (branch `prototypes-reread`, off prototypes-signature-4) **Direction
    Nº 001 built** — Mark: "I dont want u to just use my ideas... ur a
    senior art director... the line looks a bit dead... I like the hero
    better but I think we can make it WAY better." Direction sheet first
    (artifact "Direction Nº 001"), then all six ideas: the Re-read (see
    §4.3½), Play-the-typeface, Repaint=Reprint, the Pile, the-mess-knows-
    you, Fresh ink. Principle adopted: EVERY ELEMENT MUST BE AN ARTIFACT
    OF THE PRINT WORLD, THE DESK WORLD, OR A DOOR BETWEEN THEM — pinned
    in §3 graveyard lesson. HELD: loose-type after-images, live day-count
    eyebrow. KILLED: weather, cursor trails, ghost objects, music player.

19. (July 11, `prototypes-reread`) **The operator's plate + socials + two
    cursor bugs.** Mark supplied his photo ("u can do what u want with it"),
    approved the print-artifact treatment over a "bubble" avatar (his own
    instinct — "putting a bubble would look weird"), and asked for GitHub +
    LinkedIn space ("if icons make more sense u can just use icons").
    Built: the operator's plate at the desk (§4.5) with the mess candid,
    outro social tabs (§4.7), and fixed two bugs he reported: GRAB showing
    across the hero's empty space (now delegated to .ch letters) and the
    cursor dot freezing at the grab point during a letter drag (the
    compat-mousemove gotcha, §5 — loose type + plate pull now feed
    mouse.x/y from pointermove like the loupe always did). Verified via
    Playwright: label scoping, sub-pixel dot tracking mid-drag, candid
    reveal + note draw-in, zero console errors. Assets: `operator.jpg`
    (committed content), `IMG_2814.jpg` (source, like the stock .ai).

20. (branch `prototypes-sharpen`, off prototypes-reread) **The SOTD
    sharpen — five moves, no redesign.** A juror pass (judged the live
    site headless, day/night/main/mess/mobile/print) scored it Honorable
    Mention, not Site-of-the-Day, and named the gap: mobile was broken,
    the plates lied about the inks, the trail was the one templated
    section, three signature tryouts were still live, and the cairn didn't
    keep its promise. Mark: "make a new branch and implement the fix."
    Built in rank order, each screenshotted + self-critiqued + verified:
    - **M1 — the pocket proof.** The layout viewport widened to 468px on a
      390 screen (`#type-decal` at left:26rem + the mess stamp overflowed
      the ICB), throwing all fixed chrome off-canvas — SEE THE MESS was
      untappable. Killed the loose-type decal on coarse/narrow (fine-
      pointer gesture only), centred + un-scaled the stamp, dropped the
      do-not-scale note and re-anchored the knows-note. innerWidth back to
      390 at every section; the tap lands.
    - **M2 — three inks means three inks (§4.4).** The project plates ran
      in exotic hues (teal/violet/pink) that contradicted `3 INKS` and
      read as generative-placeholder stock. Rebuilt `plateURI`/`detailURI`
      in the site's own inks — ink field + accent linework + the red
      working pass off register — told apart by MOTIF, not colour. Then
      **the paint chips re-ink the whole plate library** (`rebuildPlates`):
      a chip reprints the work too (thumbs, reveal, loupe, open viewer).
      `ACCENTS`/`accentI` moved to the top of main.js so the first build
      knows the stored accent; the plate always takes the luminous (night)
      variant so it stays a lit print in any room.
    - **M3 — the trail becomes terrain (§4.3).** Recomposed as FIG.1: a
      measured ground line drawn through the actual stone bases
      (`buildTerrain`, run at load/fonts.ready/resize — NEVER in a frame
      loop), stones sized by the weight each year carried, the 2022 gap
      left as a gap, the present stone proud where the ground climbs to it,
      hairline drops to the legend. The dashed connector — the metronome
      tell — is gone.
    - **M4 — one gesture, cut the manual.** Chose the **plate pull** as
      signature Nº4 (it lives on the headline where every cursor already
      is), kept the loupe as an unannounced delight, and **struck the
      light table entirely** (graveyard — read as a debug rectangle). The
      ticker dropped from nine instructions to one voice-woven hint
      (press M); the decals + the rattle do the rest of the teaching.
    - **M5 — the cairn keeps its promise (§4.6, the risk).** Your stone
      lands ON the stack now. It grows on the house foundation, leans
      (seeded), and topples past a threshold — the stacked stones fall to
      the ground row and "THE STACK FELL — WE STACK AGAIN" flashes.
      localStorage bumped to `cairn-stones-v2` (v1 stones migrate to the
      ground).
    Verified headless throughout: 165fps / 6ms worst frame through the
    topple and steady scroll (the one-off 115ms spike is the operator
    plate's SVG-filter raster on first scroll-in, pre-existing), mobile
    inner/scroll both 390 across a full scroll, zero console errors in any
    mode. The fourth signature slot (open since §7 #13) is now filled.

21. (branch `prototypes-presscheck`, off prototypes-sharpen) **Direction
    Nº 003 — THE PRESS CHECK, P1–P4.** Mark asked for the thing award
    sites have — "this unique feel that draws the user... unique to us"
    (his reference: 3D rooms of screens; his caveat: not literally).
    A five-lens brainstorm (physics / place / time / role / flat-
    contrarian, ~40 ideas) converged on a governing law instead of a
    component: **nothing on this page simply exists — everything is
    STRUCK, and the visitor is present for the striking.** The fiction:
    you walked in while your copy was coming off the press, and you're
    the press-check client it was waiting for. Mark's one note before
    execute: **keys aren't discoverable — "either drop it or it needs
    to be really clear."** That became the keyboard rule (§ Modes) and
    killed STOP-THE-PRESS (hold SPACE) outright.
    Built, in rank order: **P1 the impression line** (reading prints the
    sheet; see Fixed furniture — the flagship), **P2 hold register**
    (velocity shears the passes, stillness thunks them true, the regmark
    is the instrument; + the [⇧] plates decal that finally advertises
    signature Nº4), **P3 the OK slip** (the visitor signs off; the mess
    argues), **P4 the job log** (the shop witnesses you, in type). The
    arc: arrive mid-run → read (you print it) → play (the log records)
    → stamp your verdict → the margins talk back → "Write to me."
    Synthesis kills (stay dead): weather/sunlight ideas (weather died in
    Direction Nº 001), a full sheet-flip into the mess (peel-adjacent —
    its one good detail, blind embossing, lives on INSIDE the unstruck
    state), an ink duct you must refill (nag), a visitor composing stick
    (dilutes the cairn), sheet-mass tilt (breaks fixed chrome under a
    transformed ancestor). Parked with potential: the Friday close, the
    galley view, the wire edition, the visitor's pull souvenir, the
    stray sort, the anglepoise, the night edition (needs a writing
    session, not code). P3's commit was delayed by a tooling outage
    mid-session; the work was verified and committed after ("continue
    the work I think P3 is done"). All four phases verified headless:
    P3 9/9, P4 15/15 (one suite flake was the TEST scrolling smoothly
    while measuring — `scroll-behavior: smooth` + `scrollTo(0,0)` +
    400ms ≠ arrived; fixed in the test, site was correct), 162fps/6ms,
    zero console errors throughout.

22. (branch `prototypes-line`, off prototypes-presscheck) **Direction Nº 006 —
    THE LINE + the MAKE-READY loader.** The long arc to the main-page identity:
    Mark rejected effect-signatures ("living press feels like a gimmick... the
    DESK feels like an identity — that's what I'm looking for"), then rejected
    concept-pitches ("I don't get these concepts — think of a visually striking
    element that's clearly unique"), then set the real brief: something that says
    *"despite all this messy work/mind, things get delivered"* — polished, awe-
    striking, its own identity like the hidden page. Ideation anchored on his own
    unownable word — NERVE ("interfaces that hold their nerve"); of a nerve batch
    (still-center / tonnage / taut-line) he picked **the taut line**, then steered
    it three times: (a) full-page mock `line-mock.html` (the whole page hangs +
    delivery dock) — "the sort of unique element I'm looking for," but worried it
    cannibalised the desk; (b) scoped + machined `line-work-mock.html` — right;
    (c) "too linear / physics too snappy / add a loader / do it on the real site,
    new branch." THIS build answers all four. Provenance mocks kept in prototypes/.
    Shipped on the real site:
    - **MAKE-READY loader** (`#makeready`, styles.css/main.js): first arrival each
      session (shares the `ma-press-check` gate, hands straight into the press-
      check strike — one continuous fiction: make-ready → strike → in register).
      **v2 (Mark: "put it on the main page / it should be smooth / we can do way
      better"):** the loader is now the make-ready CONVERGENCE — a registration
      TARGET whose three ink passes (red `#C7361F` / blue `#7C7CFF` / key `#DDDBD4`)
      start ~14px off-register and GLIDE together into one crisp mark, on a
      slow-fast-slow `easeInOut` over ~2.2s (continuous, NEVER stepped — the earlier
      discrete "test pulls" read snappy and were cut). The counter IS the make-ready
      progress `(1 - e/START)*100`, held below 100 until `document.fonts.ready` so
      it never lies; the readout t"REG +N.NN mm" ticks down to "IN REGISTER — OK TO
      RUN". At register the booth (`#0C0B08`) FLOODS to the real hero underneath
      (overlay opacity → 0, target scales/fades) and the hero's own entrance +
      press-check resume via `body:has(#makeready:not(.out))` animation-play-state
      pause. `?loader` URL param clears the session flag to replay the whole
      first-visit sequence (dev). Any input skips; reduced-motion/`?still`/print
      never see it; press-check failsafe stretched to 4800ms when the loader ran.
      Provenance/richer-alt mock: `prototypes/loader-mock.html` (the stepped-pull
      version — kept for reference, but the SMOOTH convergence is what shipped).
      The mock's iterative-test-pull idea (each pull closer to register, spoilage
      ghosts) is parked if we ever want a longer, richer make-ready.
    - **THE LINE** — SELECTED WORK only (the rest of the page unchanged). One strung
      wire MEANDERS through the section; the four project plates hang salon-style
      from **drop-cords of different lengths, varied sizes, varied rest-leans, small
      overlaps** (unstructured on purpose — fixes "too linear"). MACHINED hardware
      only (cleat, turnbuckle, bearing pulleys, bar clips, etched REF// slugs, the
      `[W.L.L.] 04 SHEETS — HOLDS` instrument that blips `LOAD +N% — HELD` on a
      flick) — the desk keeps the ONLY handmade language; the line is the machine
      of delivery. THE RHYME with the hidden page: the cairn stacks and TOPPLES
      (mess, relatable); the line sways and HOLDS (nerve, delivered). Physics are
      **LANGUID** (fixes "too snappy"): idle micro-sway, scroll = a slow-dying
      draft, hover STEADIES a sheet, drag follows the hand with lag (lerp .055) and
      drifts home OVERDAMPED with NO bounce (−4.2/−4.4), never a snap. Geometry in
      `buildLine()` (LINE_GEO_D/_M) — all reads at build/resize/fonts.ready, the one
      rAF does pure math + writes only a changed `rotate` per sheet; idles off-screen
      (IntersectionObserver) and under hidden tab. The `.row` was rehung as the
      sheet (position:absolute, clip = pivot); the manifest semantics stay (data-
      plate, `#p-01..04` deep links, the viewer opens on a quick click; a drag is
      not a nav — `lineDragUsed` preventDefault). **Loupe + cursor-trailing reveal
      RETIRED on the line** (they fought the drag and doubled the plate the sheet
      already shows — the `!open` guard + explicit `if (lineOn) return`). Plates
      still print in the site's inks and `rebuildPlates` re-inks them. The impression
      line strikes each sheet as its clip crosses (unstruck sheets hang still, don't
      sway — "unprinted paper doesn't perform"). The dock keeps the run
      (`DELIVERED SINCE 2019 · ON THE LINE — 004 · NONE HAVE FALLEN`). Mess layer:
      the cat now sits ON the wire (repositioned in buildLine), the pen asides hang
      off each sheet's corner. `overflow-x: clip` on `.index` holds the pocket-proof
      rule. Print reflows the hang to a plain manifest. Verified headless: desktop
      + mobile (390, zero x-overflow), mess, reduced-motion (sheets hung true, no
      drift, loader skipped), viewer routing, sections stack with no collision,
      >60fps on drag, zero console errors in every mode.
    **STILL OPEN (Mark's ask, not yet built):** "unstructuredness on the main page
    AS WELL" beyond the work section — the line delivers the work-section unstructure;
    a MOTIVATED asymmetry pass on the rest (not random tilts) is proposed, awaiting
    his pick (candidates: the operator plate hung with a rest-lean; the desk rows as
    clipped cards; the parked stray sort). Do NOT scatter arbitrary tilts.

    **FOLLOW-UP (same branch, Mark's next asks — "the zoom lens on projects / more
    interactivity / the hidden page is lacking in parts"):**
    - **The loupe returns to the line, disambiguated from the drag.** ONE press, three
      gestures: hold STILL ~200ms → the printer's glass drops onto the plate (magnifies
      the halftone + the 9px margin notes; the cover-fit math is retargeted to the
      sheet's cached face rect, refreshed on press); press + MOVE → the swing; quick
      TAP → the viewer. The line owns its pointerup (`if (lineOn) return` on the old
      handler); the flat-list loupe path is kept for the non-line fallback. Fixed a
      real bug: a drag's lingering `lineDragUsed` suppressed the NEXT click — now reset
      at pointerdown.
    - **Hover lifts the sheet** (line rAF: `it.lift` lerps in a `scale(1+lift*0.035)`,
      deeper drop-shadow via `.is-active`, z bumped to 9) — pick it up off the line to
      look. Composes with the steadying and the glass.
    - **Hidden-page pass — the yard was the thin spot** (surveyed all sections in
      `?proof&still`; hero/trail/desk/outro were already full, the cairn sat in an
      empty void). Added three margin notes tying the cairn to the site's soul: 2am pen
      "it topples sometimes. / i stack it again." (the topple-and-restack = the nerve
      theme, in the hand), day pen "strangers, all of them. / i've read every timestamp."
      (tender-obsessive, echoes "of course i counted"), + an arrow & "go on. leave one."
      Mobile keeps only the topple note (the others would crowd the tower/header).
    All verified headless (loupe hold/drag/tap, hover lift, yard desktop+mobile, zero
    x-overflow, zero console errors).

23. (branch `prototypes-searchlight`) **The loader HANDS OFF as a shared-element
    morph — the words MOVE into the page instead of being replaced.** The shipping
    loader is now the asymmetric LOCKUP make-ready (`loader-lockup-mock.html?embed`,
    which superseded the v2 convergence; a travelling followspot lights the word as
    it registers). Mark: *"I want the words to actually transition to the main page
    like it just moves from loader to the main page… instead of being replaced."*
    The old handoff cross-faded the whole iframe out over the settled hero — two
    separate "Code, design & nerve" swapped by opacity = "replaced." Fix: a
    cross-boundary FLIP. The iframe is full-viewport + same-origin, so its coords ==
    the page's and its script already reads `parent.document`. At register the loader
    (`relaxToHero`) reads the LIVE hero's four word rects and FLIPs `.l-code/.l-design/
    .l-amp/.l-nerve` from the lockup INTO them (translate+scale, ~0.92s), on the still-
    dark booth; then `toPage()` floods booth→page colours + words→ink, and the frame
    fades to reveal the identical hero settled behind — the reveal is a takeover, not a
    cut. The asymmetric lockup literally RELAXES into the headline. Gotchas solved
    (all measured to ~0.1px landing, day+mobile):
    - **opacity**: `.line` base CSS is `opacity:0`, held at 1 only by the lockdrop
      `forwards` fill — `animation:none` for the FLIP drops it, so pin `opacity:1`.
    - **transform-origin** at the GLYPH box (Range), not the block box, or scale adds a
      `(borderTop−glyphTop)(sc−1)` vertical error.
    - **opsz 144** forced on every loader word (`.l-code/.l-design/.l-amp` + nerve's VF):
      the words are scaled UP in the flight, and small-opsz letterforms (wide) ghost
      against the hero's display-opsz (narrow) shapes. This was the biggest visible win.
    - **hero #nerve is "&nbsp;nerve"** — its raw Range includes the leading space and
      shoved the loader's spaceless "nerve" a space-width left, jammed on the amp.
      `glyphRect()` measures the hero's VISUAL box across the `.ch` spans (skips the space).
    - **nerve resolves** soft/light (SOFT 40, wght 300) → the hero's crisp/heavy (SOFT 0,
      wght 480) during the flight; measure its FINAL width for the scale, and fade the
      misregister ghost passes so the soft (wider) ghosts don't fringe it.
    - **the live page owns the furniture**: `body.relaxing` fades the make-ready furniture
      AND the loader's own eyebrow/bio/corners/jobline (embed only) so they don't double
      against the real page's through the reveal.
    - **no `will-change`** on the words/`.lockup`: a promoted layer holds a soft, scaled
      mid-flight texture — the amp (which also shifts lavender→blue) left a stale coloured
      ghost in HEADLESS screenshots only (the §5 dev quirk: transitions stall / captures go
      stale). Alignment is pixel-exact; confirm the reveal in a real browser, don't chase it.
    Parent side unchanged but the release wait is 470ms (let the flood settle before the
    fade). Skips intact: reduced-motion / `?still` / return-visit never load the frame;
    the STANDALONE mock (no parent) falls back to flood-in-place (no morph, REPLAY works).
    `?loader` still replays. Verified headless: 4/4 words land ~0.1px (pos/size/colour),
    mobile adapts to the mobile hero + 390/390 no x-overflow, return visit skips, zero
    console errors.

    **FOLLOW-UP (same branch, Mark: "the loader letters and the main page aren't 1
    to 1 — a shift when it finishes... and make the & like a roulette that rolls up
    or down"):**
    - **The 1:1 hand-off (`bakeToNative`).** Mark saw a shift the HEADLESS captures
      couldn't (headless has no classic scrollbar and hides sub-pixel scaled-text
      rendering). Two real causes: (1) **the loader loaded a different Fraunces file**
      — its font URL omitted the `WONK` axis, so Google served a different variable
      subset with subtly different metrics (the & rendered **22px narrower** at the
      same size). Fixed by making the loader's font link the EXACT same axes/URL as
      index.html. (2) The flown words were **transform-scaled** (code ~4×), and scaled
      text never renders pixel-identical to the same glyph SET natively. Fixed:
      `bakeToNative()` at `toPage()` re-sets each flown word in the hero's OWN native
      font (its `font-size` + variation + weight + `letter-spacing`, scale dropped) at
      the identical box, so the reveal is native→native. It's **two-pass** — resize
      ALL words first, one reflow, THEN measure+translate — because changing font-size
      reflows the lockup flow (measuring mid-resize put code 262px off). After: every
      word dt=0/dl=0, code+amp dw=0, nerve within ~4px (a text-run vs per-`.ch`-span
      letter-spacing-gap nuance; left/top exact, negligible). Can't repro the shift
      headless, so confirm in a real browser with `?loader`.
    - **The & roulette (`spinAmp`).** Mark's ask, from a reel/tumble/spin choice he
      picked **character spin**: as the amp flies in, `spinAmp()` flickers `.l-amp`
      through a run of glyphs (`e 8 & 3 % & s 2 & e &` — always ends on &) with an
      easing `blur()` (1.4px→0, smears fast then sharpens), decelerating (×1.18/tick)
      and LOCKING onto & right as it lands — like a type slug being set.
      `finishAmpSpin()` force-lands the & before the native bake so measurement/hand-
      off always see a settled glyph; it's also cleared on REPLAY. Single-glyph (never
      a reel/window) so it doesn't disturb the FLIP/bake geometry — landing stays 1:1.
      **(SUPERSEDED — the character-spin was reconceived into THE LAST SLUG below;
      spinAmp/finishAmpSpin were removed from the loader.)**

24. (branch `prototypes-searchlight`) **THE LAST SLUG — the & is the finale.**
    Mark on the character-spin: *"why does the resolution drop for the & when it's
    spinning... make it like a roulette like in casino. Before it lands the page
    should load — all the letters, the main page — and soon after it slots in the &
    with impact like a slot machine."* Two faults: (1) the spin looked low-res because
    it was a transform-SCALED (~3.4×) small glyph + a CSS blur — a resolution drop,
    not motion; (2) the choreography was wrong — the & should arrive LAST, after the
    whole page is up, as a jackpot. Designed via a **Workflow motion-design panel**
    (4 philosophies — mechanical / print-slug / drama / restraint — + an xhigh
    synthesis; all four independently converged on the same concept, a strong signal).
    Result, built:
    - **Choreography:** the approved make-ready reveals the page ALREADY SET with an
      EMPTY slot ("Code, design ▯ nerve"); the loader stops flying the amp — `.l-amp`
      is dropped from `relaxToHero`'s map[] and `bakeToNative`'s specs[] and simply
      **fades via `body.relaxing .l-amp`**; the page holds `#amp .ch` at `opacity:0`
      (`body.amp-armed`, added right after `mrRan=true`) so the advance is reserved and
      'nerve' never reflows. After the iframe is removed (release()'s 760ms timeout →
      `scheduleAmpFinale()`), a **280ms BEAT** of stillness, then `dropAmp()`.
    - **The reel (runs on the REAL page — crisp by construction):** `dropAmp()` measures
      `#amp`+`.ch` ONCE, builds an overlay that is a **CHILD of `#amp`** (tracks layout,
      survives scroll, zero doc-coord math): `.amp-reel` (the slot window, `overflow:hidden;
      clip-path:inset(0 -0.2em)`) › `.amp-reel-strip` › 16 `.amp-cell`/`.rc`, every `.rc`
      set to the amp's OWN native face (Fraunces italic, opsz 144 wght 340, `font-size`=A
      measured ~208px, its letter-spacing) — so **every symbol is full-resolution vector
      type, moved by `translateY` only, NEVER scaled/blurred**. Bank: idx0=`$` (near-miss
      decoy above the &), idx1=`&` (target, seats at translateY 0), idx2..15 = printer's
      sorts braided with casino money (`8 % 7 ¶ @ § 3 $ ẞ 9 % 8 7 §`) so it reads jackpot
      yet stays a proof. Pitch P=round(A·1.32)≈275; window WIN=round(P·1.15)≈316; a
      `.spinning` compositor **mask-image edge-gradient** sells the streak (no glyph
      filter). One **WAAPI** transform anim (compositor, no rAF, no per-frame reads),
      1000ms: −14P accel → −12.6P cruise → −3P weighted decel → **+1P NEAR-MISS on `$`**
      → hold ~95ms → snap back over-travelling the seat by −6px → 0 (& seated).
    - **Impact (`seatAmp`→`ampImpact`, all local, transform/opacity/paint only):** the
      overlay is destroyed and native `#amp .ch` un-hidden the SAME frame (a dead-crisp
      italic accent &, full swash whole via `.hero-title.landed .hl-mask{overflow:visible}`);
      then the 3rd `.hl` **shudders** 1px (discrete inline steps 2/-1/1/0 at 0/30/60/90/120ms,
      cleared to '' — a keyframe would restart the entrance transform), an `.amp-bloom`
      accent flash (scale 0.6→1.3, opacity 0→.5→0 / 260ms), `regKick(1.8)` shears+thunks
      the ink passes true over 300ms, and **`sndSlam()`** (new, next to sndClack, opt-in
      on `noiseOn`: sub 130→42Hz + triangle body-knock + bandpass click + 1800Hz detent).
    - **Fallbacks (all → the & simply present, crisp):** return-visit/reduced/`?still`
      never add `amp-armed`; `dropAmp` bails to `revealAmpStatic()` if the hero isn't
      `.landed` or WAAPI is absent; a **failsafe** (release+3500ms) and a **watchdog**
      (reel-start+1400ms) never leave the slot empty; input during the reel `skipFinale()`s
      (seat now + a quick 120ms bloom). Verified headless: slot held empty (nerve left=366
      constant — no reflow), reel builds (16 cells) + spins + seats (armed off, .ch op 1,
      reel gone, bloom fires), near-miss `$` visible, zero console errors; return/reduced/
      skip all show a normal &. CRISPNESS + the reel FEEL need a real browser (`?loader`)
      per the §5 headless quirk — headless renders WAAPI/mask stale.
    OPEN/TUNABLE: total load ≈7–8s (make-ready is the bulk, approved/untouched; finale adds
    a short beat + reel after the reveal); near-miss over-travel is a full pitch (bold — can
    drop to 0.5P); check the seated swash at min/max clamp widths and night-mode accent.
    **REVISIONS (two rounds — the choreography above is SUPERSEDED):**
    (i) Mark: *"it shouldn't just disappear — on screen at all times, spinning as it MOVES to
    the location, eventually stops."* First tried: no empty beat + the reel SLIDES in from the
    left while spinning. But that still hid the loader amp, so — (ii) Mark: *"the E [the italic
    &] from the loader literally disappeared, it's not travelling with the other letters."*
    THE FIX (superseded): **the & flies in WITH the other three letters again** — restored to
    `relaxToHero`'s map[] and `bakeToNative`'s specs[] in the loader. The reel then spun **IN
    PLACE** after a beat. The flagged trade-off — spin AT the landing, not DURING the flight —
    went to Mark, and (iii) he called it: *"as it moves… that E starts spinning… right now it
    disappears quickly and then the roulette comes — these are 2 different E when I want it to
    be the same so it feels fluid."* So —

25. (branch `prototypes-searchlight`) **THE CEDE — one E from first roll to seat.**
    The spin now happens DURING the flight without the old resolution drop, by
    inverting who flies: at the first frame of `relaxToHero` the loader calls
    `parent.__ampFly(glyphRect, MORPH_MS, color)` **synchronously** and, on true,
    adds `body.ceded` (`.l-amp { visibility: hidden }` — an atomic same-frame swap,
    never a fade) and drops the amp from map[]/specs[]. The parent builds ONE
    `position:fixed` reel on `document.body` at **z 221** (above `#makeready`'s 220,
    so it rides the dark booth mid-flight), cells at the hero's NATIVE size, the
    carriage transform-scaled DOWN to the lockup glyph box (s≈0.31 — downscaled text
    stays crisp; scaling UP was what looked low-res) and flown to identity with the
    words' own clock (920ms, `cubic-bezier(0.19,1,0.22,1)`, centre-to-centre map).
    The strip is ONE WAAPI timeline across the whole hand-off — bank = the in-place
    16 + another lap of sorts + a trailing `&` (31 cells): **the reel's first frame
    IS the & it replaced** (starts at −29P exactly), 260ms accel as the words lift,
    cruise through the flood + frame fade, then the approved tail in absolute ms
    (weighted decel → near-miss `$` at +1P → ~95ms hold → snap −6px → seat), TOTAL
    = MORPH+30+470+760+350 ≈ 2530ms, so the & thunks in ~350ms **after the page is
    fully up** (seat 6923 > mrGone 6572, headless). `__ampFlood` (called inside the
    loader's `toPage`) flips the reel to the live accent the instant the old
    `body.page .l-amp` colour flip happened — lavender→accent, computed from
    `#amp .ch` so day/night/chips all read true. amp-armed spans flight→seat;
    seat = existing `seatAmp` (native & same frame, shudder, bloom, regKick,
    sndSlam). SKIP_EVS gained `"scroll"`: the flight reel is fixed, so ANY input
    (incl. scroll) seats the native & instantly (skipFinale) — the fixed reel can
    never shear off the hero. Fallback intact: no `__ampFly` (old loader,
    degenerate measure, throw → cleanup+false) ⇒ the amp flies as a word and
    `dropAmp` spins in place — its bank's idx15 is now `&` too, so even the
    fallback opens on the glyph it hides. Verified headless (Playwright, real rAF;
    36/36 + 5/5 mobile): cede centre/width d=0.0 with `.l-amp` hidden the same
    frame and parked (0px drift); lands on native ch d=0.0/dw=0.0; strip from
    −29P, 62 distinct Y, near-miss +1P; colour floods once; seat relax+2562 with
    bloom + & restored; fallback/return/standalone unaffected; 390px: lands
    d=0.0, no x-overflow; zero console errors everywhere. NOTE: the embedded
    Claude pane cannot play this at all now (rAF fully stalled in the nested
    loader iframe — measured raf:0 for 7s; the parent 9s failsafe releases it),
    so FEEL tuning (cruise speed via bank length, the beat, the 260ms accel)
    needs a real browser with `?loader`, per the §5 quirk.
    **REVISION (same day, Mark: "cut the roulette time a little — it's going a
    bit too long after the screen loads" + "I don't like the arrival effect —
    it feels janky and a little too forced"):** the ending is now a WEIGHTED
    ARRIVAL, not theater. Near-miss `$` / hold / snap-back / over-travel all
    CUT from BOTH reels — the strip just brakes into the & and stops
    (−2.5P → 0, `cubic-bezier(0.18,0.82,0.22,1)`, ~380ms; fallback offset
    0.62→1; no overshoot — maxY=0 verified). Impact softened: the 3rd-line
    shudder and the `regKick` shear are cut (the janky bits), the bloom is
    smaller/quieter/faster (0.78→1.22, 0.32 peak, 220ms), `sndSlam` stays
    (opt-in). TOTAL's post-frame-out pad 350→80ms — seat ≈ relax+2260
    (measured 2315, ~110ms after the frame is gone), ~270ms sooner. Bank
    unchanged (idx0's `$` simply never enters the window). Re-verified
    headless 36/36 + 5/5 mobile — this pass ran after 23:00 LA, so it also
    covered NIGHT mode, which exposed a harness-only nuance worth recording:
    in night the hero amp's live accent IS the lockup lavender (`#7C7CFF`),
    so `__ampFlood` is correctly a visual no-op — the flood invariant is
    "reel ends on the live `#amp .ch` colour", NOT "colour changes once."
    **REVISION 2 (Mark: "make it land faster"):** the seat moved INTO the
    frame fade instead of after the frame's removal — the fade is an extreme
    ease-out (0.7s, ~95% dissolved by half-time), so the & thunks in as the
    last wisp clears with zero wash (measured loader opacity 0.01 at the
    seat frame). `TOTAL = MORPH + 30 + 470 + 380` (the 760 frame-out no
    longer gates it); brake shortened 380→280ms from −2P with a slightly
    harder curve (`cubic-bezier(0.18,0.84,0.26,1)`); fallback brake matched
    (offset 0.72, −2P). Seat measured relax+1874 (was 2315, originally
    2562) — ~0.7s faster than the first build. 36/36 + 5/5 re-verified;
    landing still d=0.0/dw=0.0, maxY −0.2 (no overshoot).
    **REVISION 3 (Mark: "the landing, like that pulse thing — I'm not a fan,
    can we make that better"):** the bloom died too. The landing is now THE
    IMPRESSION — the glyph itself lands pressed into the paper (`#amp .ch`,
    `translateY(2px) scale(1.045)` → none, 300ms, WAAPI on the inline-block
    span, transform-only so it can't reflow or fight the ink pooling) and
    settles. No radial light, no overlay — the slug is the effect. `sndSlam`
    stays (opt-in). skipFinale is now a quiet instant & (no pulse).
    `ampBloom`/`ampGeo`/`.amp-bloom` deleted. ARRIVAL LESSON (three cuts in
    one day — shudder/regKick, then near-miss/snap, then the bloom): Mark
    strips arrival theater down to ONE physical, print-true gesture on the
    object itself; light-shows and overlays read as "effects" and die.
    Verified 36/36 (impression fires, chAnim 1 across the seat window).
    **LOUPE STATUS (same session):** Mark asked "where is the magnifying
    glass for the project cards" — it is ALIVE and untouched on this branch
    (verified 9/9 headless: tap opens the sheet + no glass, Esc closes,
    press-and-HOLD ~200ms still drops the glass with the plate under it,
    release lifts, zero errors). It is hold-only and unlabeled BY DESIGN
    (sharpen M4 kept it as the quiet delight) — but Mark himself couldn't
    find it, which re-opens the keyboard-rule question ("nothing is ever
    key-only" — is hold-only any different?). RESOLVED in #27: it is not —
    Mark asked a third time ("literally ur cursor turns to glass") and the
    glass now rides the hover. No decal needed; the gesture advertises
    itself.

26. (branch `prototypes-searchlight`) **THE INSPECTION TOUR — the light earns
    its keep.** Mark: *"I want more light movement I think, or idk — should we
    keep the light or nah? And the camera box is arriving a tad too late
    compared to the light."* Call made (and argued to Mark): KEEP the light —
    it is the loader's identity and pure print-world (an operator's work-lamp
    inspecting the forme before the pull); the flaw was that it had TWO stops
    and parked on the word for ~2.3s of its 4s. Built, in `frame()`/
    `writeSpot()` of the loader:
    - **The tour:** plate (the work, e<0.10) → counter (the gauge, e<0.26) →
      forme (`.l-design`, the upper lockup, e<0.46) → down onto the keystone
      WORD. Brisk lerp between stations (0.085 — it arcs through them, never
      parking), heavy on the final settle (0.058). One clean right-to-left
      sweep — the stations are nearly collinear by layout, which reads as one
      deliberate pass (a path-length assertion is the WRONG check; station
      proximity is the honest one).
    - **The held lamp:** `writeSpot(now)` adds a faint two-sine hand drift
      (±8px) + a breathing iris (±18px on --sr) while the shop works;
      REGISTER STILLS IT (drift gated by `registered` — stillness =
      registration, the site's own law; measured xRange 0.10px post-register
      vs ~45px in the hold). Callers without a clock get the lamp at rest.
    - **The box sync:** `.bk` transition 0.85→0.7s and the launch moved from
      light-arrival to the FORME turn (`leg >= 2`) — the crop brackets frame
      the lockup while the light sweeps down it; measured box-land 2193 vs
      light-arrival 2008 (185ms, inside the settling drift — reads together).
      Fired on arrival (original) it trailed ~0.85s; on the final leg, ~0.5s.
    - **Mobile zero-rect guard:** `centreOf()` returns null for hidden
      stations (the plate is display:none ≤breakpoint — it used to measure
      [0,0] and aim the lamp at the corner; latent since the followspot was
      built). Fallbacks now take over; play()'s start position guarded too.
    Register/relax timing untouched — the cede/flight handoff is unaffected.
    Verified: 11/11 light (stations visited: d(make)=19, d(forme)=86, starts
    on plate d=3; drift/breathe/still/iris all measured), 36/36 flight, 5/5
    mobile, zero console errors.

27. (branch `prototypes-searchlight`) **THE GLASS IS THE CURSOR.** Mark asked
    for the loupe a THIRD time ("wheres the picture zoom thing… literally ur
    cursor turns to glass and through that glass it zooms") — hold-only was
    dead on arrival, twice explained and twice unfound. New gesture model on
    the line rows (main.js, "the glass is the cursor" block):
    - **HOVER a plate face (`.row-thumb`) → the glass drops instantly**; the
      cursor dot hides (`.cursor.is-loupe`), the glass pans the 2.2× zoom as
      the pointer moves (frame() already fed it from mouse.x/y — page-coord
      face math, scroll-proof); **leaving the photo lifts it** — cursor back
      to normal. Confirmed spec with Mark: instant, no delay, normal outside
      the picture.
    - **Press + MOVE → the glass YIELDS to the hand** (dropLoupe at the 6px
      swing threshold) — the swing is unchanged; on release, if the pointer
      still rests on the face, the glass re-seats (`lineHoverItem` in
      lineUp; a settling swung plate needs the next 1px hand move to
      re-hit-test — real hands always move).
    - **Quick TAP → wasNav in lineUp drops the glass so the case sheet opens
      clean** (hover no longer suppresses clicks — only drags/held presses
      set lineDragUsed); **press-held-STILL keeps working** (the 200ms timer
      now just summons if hover hasn't, and still marks the press
      non-navigating).
    - Delegated `pointerover/pointerout` on `#index` (mouse-type pointers
      only, guards: reduced / trailEnabled / unstruck / mid-gesture; DOM
      identity stable across buildLine re-runs). pointercancel never
      navigates (lineUp takes the event). Flat-fallback (non-line) loupe
      path untouched (coarse pointers have no hover).
    Verified 10/10 headless: instant on-hover (on+cursor swap), zoom pans
    (backgroundPosition moves with the pointer), lifts off-photo, tap opens
    sheet + Esc, glass yields mid-swing + returns after settle, zero
    console errors; plus 36/36 flight + 5/5 mobile + 11/11 light re-run
    green (62 total).

28. (branch `prototypes-searchlight`, July 13) **THE HEADLINE IS THE LETTERHEAD —
    "Mark & / From the desk" replaces "Code, design & nerve."** Mark: the old
    line "sounds cliche or awkward... idk what I want to convey." The hunt (all
    in `hero-reset-mock.html`, kept as provenance): thesis lines (DRAFTED &
    DELIVERED → DOUBTED & DELIVERED), world-word triplets (INK DOUBT & NERVE /
    SET STRUCK & SHIPPED), name moves (MARK AXELUS & CO. / AXELUS & AXELUS),
    self-mined mantra (AGAIN & AGAIN — his own most-repeated word, 9×) — ALL
    rejected. **Research that broke it open:** actual Awwwards portfolio
    winners set QUIET, FACTUAL hero copy (Pertant: "motion & sound designer
    based in paris"; Bruno Simon / Snellenberg / Mangham: name + role) — the
    clever triplet is a mid-tier pattern; the poetry budget goes to the craft.
    THE LINE IS MARK'S OWN PITCH ("Mark e /n From the desk" — he calls the
    italic & "the E"): the letterhead convention ("From the desk of —"), name /
    mark / address. His two rules shaped the setting: (a) asymmetry — both
    lines SAME SIZE, ragged left, no centring, no small second line; (b) the
    Fraunces italic & is the historic Et-ligature and doesn't read as "and" —
    so the line parses as NAME + MAKER'S DEVICE, never an unfinished sentence
    ("it could be safe" — his call, correct). "From the desk" doubles as the
    place line and the first breadcrumb to the hidden page.
    **Wired to the real site + loader (verified 27/27 headless + 4-width
    specimen-collision sweep):**
    - index.html: two-line hero (`#markw` "Mark&nbsp;" + `#amp` "&" on line 1;
      "From the&nbsp;" + `#deskw` "desk" on line 2 — trailing-space-in-word
      pattern keeps #amp a single pure .ch for the reel). Title/meta updated.
      Drafts note now strikes "code, design & nerve" and checks "mark & — from
      the desk ✓ (finally)".
    - styles.css: .hero-title clamp(3.2rem, 10.6vw, 12.5rem) (13-sort line 2
      sets the measure), mobile clamp(2.3rem, 13vw, 6rem), print 44pt; dead
      nth-child(3) rule removed.
    - main.js: `lastLine` selector nth-child(3) → :last-child (WOULD HAVE
      KILLED THE ENTRANCE — null lastLine fell into the instant-landed branch);
      amark-nerve → amark-desk, the pen now underlines "desk" (nerveEl→deskEl).
      "nerve" survives in the bio ("interfaces that hold their nerve") — the
      word stayed, the headline stopped shouting it.
    - loader-lockup-mock.html: lockup = .l-mark / .l-amp / .l-desk (keystone
      "From the desk" carries the ghosts + KEY_VF resolve); heroTargets → 
      {mark, amp, desk}; relaxToHero map + bakeToNative specs re-set (amp
      splices at 1); tour forme station = .l-mark; id keystone.
    - ALL & finale machinery untouched by design — parent side is keyed to
      `#amp .ch` and never knew the words. Cede fires, reel opens on &, seats
      into the frame fade. Landings measured: Mark 0/0/0, From-the-desk
      0/0/0.1 px. Mobile 390/390 no overflow. Zero console errors everywhere.
    NOTE: `hero-reset-mock.html` is the word-hunt sandbox, superseded; the
    &c. nugget (MARK, &c. = "and the rest") died by the no-obscure-refs rule.

29. (branch `prototypes-searchlight`, July 13) **THE & FINALLY FITS —
    "Mark / & my desk" replaces "From the desk of / Mark &".** Mark's issue
    with the trailing amp: "the & doesn't fit... but I want it here." He was
    right — an ampersand is a JOINING mark (wants a thing left AND right);
    "Mark &" gave it a left and nothing right, so it dangled no matter how
    §28 justified it as a "device." The fix: MOVE #amp to the HEAD of line 2,
    where it joins "Mark" (above) to "my desk" (right) and, at the ragged-left
    margin, opens the line as an italic swash — more prominent, not less.
    Also cut the stiff "of" and went first-person per his instinct. The
    specimen cascade still carries the & as a pure object at every size, so
    the headline & now WORKS while the specimen & still SHOWS OFF (two jobs,
    two places). Verified 8/8 headless + the real loader flight (Playwright,
    1440×900): loader flips 1:1 into the live hero, zero console errors.
    - index.html: hero reordered — line 1 `#markw` "Mark"; line 2 `#amp` "&"
      (trailing nbsp keeps it a single pure .ch for the reel) + `#deskw`
      "my desk". `#deskline` dropped (only the loader read it). Title → "My
      Desk", meta "from my desk", drafts note strikes "from the desk of mark
      &" and checks "mark & my desk ✓".
    - loader-lockup-mock.html: keystone `.l-desk` "From the desk of" → "my
      desk" (all three misregister passes); `heroTargets` desk anchor
      `#deskline` → `#deskw`. The flight map/cede/bake were already keyed to
      the three IDs, so no structural change — the whole-line target simply
      became the word target.
    - main.js: logic untouched — the amp reel, the mess amp-circle, and the
      pen (`deskEl`=`#deskw`, now underlines "my desk") all read live rects,
      so moving #amp to line 2 needed no code. Comment tweaks only.
    - styles.css: measure comment only. "& my desk" is shorter than "From
      the desk", so the existing clamp can't overflow — left as-is (more rag
      = more asymmetry). SUPERSEDES §28's arrangement; short-over-long +
      name-on-top both HOLD, only the amp's position + the address words moved.

30. (branch `prototypes-searchlight`, July 14) **THE SETTING — matter arrives
    by hand.** Mark on the reveals: *"all too linear and generic, doesn't fit
    our concept of asymmetry and mess... some elements don't have a reveal on
    first load like the glyphs, the stones."* He was right three ways: the
    (uncommitted) scroll pop was a uniform 40px fade-UP on metronome staggers
    (desk rows at exactly .07/.14/.21s); the load furniture ran one `rise`
    keyframe on a near-linear delay ladder; and the specimen glyphs, tonebar,
    foldline, decals, trail stones and the v3 lockup itself had NO entrance
    (the old entrance still targeted the dead `.hl` lines). Replaced with a
    second governing law beside the strike: **ink arrives by STRIKE (untouched);
    MATTER arrives by hand — set DOWN onto the sheet, never floated up.**
    Fade-up is the one gesture that belongs to no print shop.
    - **The gesture (`setdown`/`set-in`):** drop from above + a breath of
      over-press (+1px) + settle — the amp-impression language generalized.
      Every arrival is jittered by a per-load mulberry32 seed (drop height
      −10..−24px, duration .42–.62s, delay, occasional ±px lateral or a
      ≤0.7° arrival-lean that settles true). No two elements move alike, no
      two loads are identical; DESTINATIONS are always exact — the asymmetry
      lives in the arrival, never the resting state (the no-arbitrary-tilts
      rule holds). Groups (desk rows, outro cluster) get seeded SHUFFLED
      delays — tossed on, not dealt.
    - **Dialects:** stones DROP (accelerating fall + seat squash — the
      cairn's own language): the trail stones land L→R jittered, the 2026
      accent stone LAST, and only then is the measured ground DRAWN through
      their landed bases (dashoffset on pathLength=1, buildTerrain re-measured
      once at seat time so a mid-fall resize can't bend the line), ticks +
      legend following; the yard cairn STACKS bottom-up (`cairn-set`, classes
      stripped after the land so renderCairn re-runs stay inert). Sheets on
      the line HANG: fade + a seeded draft impulse straight into the real
      physics (`it.du += ±0.6–1.3`) so each swings from being just-hung and
      settles per its own pendulum — the W.L.L. blips "TAKING THE LOAD —
      HELD" once per visit. The specimen is PULLED size-by-size (s1→s5,
      seeded, the 144pt italic last + heaviest, axis labels ticking in
      after each pull); the tonebar inks its ramp step-by-step (machine-
      LINEAR on purpose — it's a calibration instrument); the foldline is
      SCORED down the sheet (scaleY).
    - **The v3 lockup finally has an entrance** (`body.hero-set`, non-loader
      loads only — the loader's flight IS the entrance when it runs): the
      giant & seats first with weight (`seat-amp`), MARK then MY DESK set
      over it on opposite lateral vectors with a touch more lean than their
      rest splay, landing exactly on it (words carry `--rest` vars; keyframes
      end on `var(--rest)`). Furniture (eyebrow/bio/decals) chatters in on
      seeded clocks. `releaseMasks` re-wired: `.landed` on the v3-desk's own
      animationend (target-checked — animationend BUBBLES from .ch rattles)
      + 2.4s failsafe; positionAnchors re-measures at land.
    - **Loader path:** `body.spec-armed` (added at mrRan) pre-hides the
      specimen plate under the booth; `release()` swaps it to `spec-set` so
      the pulls run right after the flood — the shop finishes the sheet.
      hero-set never arms there; the amp reel/cede machinery is untouched
      (verified: full no-skip flight green, & seats, zero errors).
    - **Discipline:** all transform/opacity, vars written once at arm time,
      zero reads in any loop; mess-enter disarms everything (setProof →
      `disarmSetting`) so `.final` dims; reduced/`?still`/no-js/print ship
      visible (belt-and-braces force rules in the reduce + print blocks).
      `rise` renamed `setdown` and re-voiced (down, not up) for all fixed
      chrome; the ticker's load rise removed (the scroll SETTING owns it).
    Verified headless (Playwright, real rAF — scratchpad suites
    `verify-setting.js` + `verify-flight-perf.js`): 46/46 across return-visit
    entrance (words land ±0.05° of splay), specimen/tonebar/foldline, sheet
    kick + W.L.L., trail (2026 last, ground drawn, legend), yard inertness,
    mess disarm, reduced/still/loader/mobile-390 paths; 6/6 full flight +
    frame health (60fps, worst 17.6ms through the stone-land while
    scrolling); zero console errors everywhere. FEEL tuning (kick size, pull
    rhythm) needs a real browser per the §5 pane quirk.

31. (branch `prototypes-searchlight`, July 14) **SIDE B CATCHES UP — the mess
    reflects the v3 page, and gets messier on purpose.** Mark: *"a lot of the
    content on main page has changed… make changes to reflect the content…
    be bold, the point is to show the realistic part of day to day like its
    a mess nothing goes linearly, add more doodles… fix some of the circles
    also like the circle on hero on the Amp its a much different Amp."*
    - **The amp circle fits the monument (`positionAnchors` + `handLoopD`).**
      The old 180×120 oval floated over the giant &'s waist, circling
      nothing. Now the journaling loop is REDRAWN AT GLYPH SIZE per measure
      (box = amp rect ×1.24/×1.06, seeded hand wobble, viewBox rebuilt).
      GOTCHA RECORDED: stretching the old path with `preserveAspectRatio:
      none` + `vector-effect: non-scaling-stroke` BREAKS the `pathLength=1`
      dash draw-in in chromium (dash pattern goes screen-space) — the loop
      only half-drew. Regenerating the `d` at target size is the fix.
      Captions ride the loop's corners (`.ac-1/2/3`; new third line: "(it's
      30vw now. we're past help.)").
    - **The desk underline hugs the word (`positionAnchors`).** `#deskw` is
      `display:block` in v3, so its rect spanned the whole lockup column —
      the pen stroke ran across the page (fat, ~1050px). Now it measures the
      `.ch` GLYPH RUN (first-left → last-right) and rotates to the run's own
      measured angle, so the underline rides MY DESK's +1.8° splay and a
      re-tuned `--rest` can't strand it.
    - **Stale notes re-inked:** "0.84 line-height" (dead since v3) → "the
      words sit crooked. −3° and +1.8°. measured. on purpose. leave them.";
      bio bracket 26ch → "38ch on the long line." (the new bio's longest
      nowrap line — recounted, of course); "do not scale. final size." gains
      the 2am confession "(it's four times bigger now.)" + a graphite arrow
      up at the &. The fav ring re-anchored to the hung sheet's strip
      (bottom 4.5rem — it was circling the description, not the 03); the
      moon moved off the new EMAIL tab (top 6% / right 34%).
    - **New margins (nothing goes linearly):** the VERSION LEDGER under the
      REJECTED drafts — "THIS SITE, SO FAR — v1 · too safe / v2 · too loud /
      v3 · died at 90% / v4 · you're on it / (define "done")" — two ledgers
      of dead attempts in one corner; the out-of-order day log on the index
      margin ("23:58 — fixed the kerning." ABOVE "09:12 — it wasn't fixed."
      + a frustration burst); the PEN TEST scribble at the desk ("new pen.
      testing, testing. it's fine."); the coffee recount "31 + 28 + 35 = 94.
      recounted. twice." directly under "lost count in march."; "ship v4"
      struck on the TODAY card; the scribbled-out cairn sketch in the yard
      ("tried to sketch the cairn. can't. it won't sit still." — it topples;
      it wouldn't pose), placed LEFT of the tower because the right band
      belongs to the fixed stamp/knows-note column at most scrolls; the
      maker's mark fact-check in the outro ("it scans. tested it at 3am. /
      it just says my name." + graphite arrow).
    - All new notes are mess-only, two-pen voiced, seeded-tilted, non-ladder
      delays, draw in per viewport via the existing observer, and are hidden
      ≤1100px with the other delicate notes (pocket proof holds 390/390).
    Verified headless (scratchpad `verify-sideb.js`, real rAF): 28/28 —
    circle sized/centred on the & (d=0.0) + re-fits on resize, underline =
    glyph run ±4px at the measured lean, all 12 new notes present + draw in,
    ledger strikes 3, night inked, mobile trims + no x-overflow, zero
    console errors; plus the existing suites re-run green (46/46 setting,
    6/6 flight/perf — the loader path, which calls positionAnchors at land,
    is untouched). Suite gotcha reconfirmed: tests must scroll with
    `scrollBehavior: auto` — the site's smooth scroll makes "wait then
    measure" race the travel (§7 #21's flake, hit again).
    OPEN QUESTION (asked, answer delivered in chat): whether the amp
    roulette finale survives the v3 monument & — recommendation was to
    retire the reel and let the & arrive by seat/impression (one motion law),
    keeping `sndSlam`; Mark decides.

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
