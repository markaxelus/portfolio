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

---

## 4. Current page structure (top to bottom)

1. **Hero** — "Code, design & nerve" (Fraunces, per-character spans).
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
     dry typeset line per playful act, desk-time stamped, newest last,
     under the colophon — hidden until your first act opens the ticket.
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
     window (`overflow-y:auto`, thin hairline scrollbar, `overscroll-behavior:
     contain`) that auto-scrolls to the newest line, so a long shift never
     grows the outro. New entries TELETYPE out char-by-char with a blinking
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
      The regmark draws itself (stroke-dashoffset) while a mono counter reads the
      REAL load (`document.fonts.ready`; min ~1s so it reads, max ~1.8s so it never
      stalls; states SETTING THE FORME → INKS 3/3 → REGISTER CHECK → OK TO RUN). On
      release the mark FLIES HOME to the sheet's own `.regmark` (one measured read,
      event-time). Any input skips it; reduced-motion/`?still`/print never see it.
      The hero's held entrance resumes via `body:has(#makeready:not(.out))`
      animation-play-state pause (no JS ordering). press-check failsafe stretched
      to 4800ms when the loader ran.
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
