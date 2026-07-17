# THE SOTD PLAN — getting the working proof past the jury

*Written July 16, 2026. Target: Awwwards Site of the Day. Current honest
odds: 10–20%. With this plan executed to standard: 40–50%, with the
Developer Award better than a coin flip and an Honorable Mention near
certain. Nothing makes SOTD a lock — it is relative to that day's pool.*

## Why this is winnable at all

The July 2026 pool proves the meta is not pure WebGL spectacle: three
personal portfolios took SOTD inside three weeks (Hiroto Sato, Julien
Calot, Meech213) and a pure typography site won July 14 (PP Neue
Montreal). Craft-and-concept sites win when the core idea is executed so
far that the execution *is* the spectacle.

The strategy in one line: **never bolt on effects — take the print
fiction more seriously than anyone has taken any fiction on the web.**
Every item below is the shop made more real, which is why none of them
violate the house taste rules (see agent memory `design-taste.md` +
CLAUDE.md §3).

## The scorecard we're playing against

Awwwards jury: design 40% · usability 30% · creativity 20% · content 10%,
plus user votes on the day. Judges give a site seconds before deciding
how hard to look, judge on laptop AND phone, and favor sites with one
screen-recordable "how did they do that" moment.

## The plan, ranked by leverage

### P1 — The loader becomes the trailer (design 40%)
The make-ready flight is the one sanctioned arrival theater and the
jury's first five seconds. It must be undeniable: sheet feeds,
registration marks lock, inks lay down pass by pass, the hero IS the
printed result. Storyboard it like a title sequence; every frame must
read as the press working.
**Effort:** 3–5 days. **Moves:** design + first impression.

### P2 — The signature mechanic: the loupe resolves real halftone dots
Under the glass, the page stops being vector and becomes actual
halftone rosettes (shader/canvas re-render of the magnified region — a
real printer's loupe exists precisely to see dots). Nobody has done a
true loupe on the web. Contained to one component, concept-perfect, and
it is the 10-second clip that gets shared. This is the differentiator;
build it first because it is also the riskiest.
**Effort:** 1–2 weeks. **Moves:** design + creativity + dev award.
**STATUS (July 17): BUILT on `staging`** — true 3-ink separations in
density space, screens at 45/15/75°, solid type pass, tile-cached blit
panning, focus-pull resolve; 26/26 headless, zero console errors
(prototypes/CLAUDE.md §7 #35). Awaiting Mark's real-browser feel-check
(dot pitch, focus timing); the operator-plate extension (the PHOTO
resolving into dots — the phone clip) is the queued follow-up.

### P3 — Sound behind the existing [S] toggle
Stamp thunks, paper slide between sections, teletype ticker, pen
scratch as mess notes draw in, vinyl crackle while side B is open. The
audio registry already exists. Restrained, always opt-in.
**Effort:** 2–3 days. **Moves:** design + creativity, cheap.

### P4 — Mobile keeps the personality (usability 30% — the biggest leak)
Below 820px the site currently hides most of what makes it this site.
The jury phone-tests. Side B must exist on mobile (fewer notes, but
present, with the toggle), and the bundle, cairn, and loupe need touch
equivalents. Unglamorous; nearly a third of the score.
**Effort:** 1 week. **Moves:** usability.

### P5 — Scroll feel on mid hardware
Profile with a throttled CPU through the heavy sections (index hang,
imprint ink-in, outro). One janky scroll during judging caps the design
score. Fix long frames, keep the measure-once/pure-math law.
**Effort:** 2–3 days. **Moves:** design + usability.

### P6 — The jury must find side B
Do not bet the creativity score on someone pressing M. One idle
ink-pulse on SEE THE MESS after ~10s, and the submission description
says "press M" outright. Submission screenshots: loader mid-flight,
hero, loupe on dots, side B in full argument, night mode, mobile.
**Effort:** half a day. **Moves:** creativity actually getting scored.

### P7 — Submission craft and timing
Launch to free galleries first (Godly, Minimal Gallery, siteinspire)
for traffic + votes. Submit Awwwards mid-week in a quiet season, with a
30s video. Small X/LinkedIn push on submission day — user votes count.
**Effort:** 1 day + $65 when P1–P5 are done. Not before.

## Order of work

P2 first (fail fast on the risky build) → P1 → P3 → P5 → P4 → P6 → P7.
Ship each to `staging`, feel-check in a real browser (the §5 pane quirk
— headless verifies correctness, never feel), then `main`.

## What we deliberately will NOT do

WebGL hero scenes, 3D paper flips, cursor particles, scroll hijack.
Off-concept; the taste rules kill them; they read as decoration bolted
onto a fiction that was working.
