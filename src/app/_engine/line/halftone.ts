/**
 * THE LOUPE RESOLVES REAL DOTS (SOTD plan P2) — the signature mechanic.
 *
 * Under the glass the plate stops being vector: the magnified region is
 * re-rendered as its three ink passes, screened at press angles — key 45°,
 * accent 15°, the red working pass 75° — so the rosette a real printer's
 * loupe exists to check is actually there.
 *
 * Two halves, both pure of layout reads:
 *
 * 1. `buildSeparation` (async, once per plate+accent, cached by the caller):
 *    rasterize the sep-source SVG (plates.ts, no fake screen / no grain) at
 *    art resolution and unmix every pixel into per-ink coverage. The model is
 *    optical density (Beer–Lambert): a printed pixel is
 *      pixel = paper · Π inkTransmittance^coverage
 *    which is LINEAR in log space, so coverage is a small non-negative
 *    least-squares solve per pixel against the three inks' density vectors.
 *    Multiply-compositing the dots at those coverages reconstructs the
 *    artwork — the dots are the same image, resolved.
 *
 * 2. `renderHalftoneWindow` (per pan frame, ~8k arcs worst case on a 184px
 *    canvas): lay each ink's dot grid IN ARTWORK SPACE (rotated to its screen
 *    angle) so the dots are fixed to the plate and panning translates them —
 *    nothing swims. Dot radius ∝ √coverage (equal-area round dot); overlap
 *    past ~78% coverage joins to solid, exactly like a real screen. Key runs
 *    a finer ruling than the colour screens (as real print does) so the
 *    micro-notes stay legible under the glass.
 */

import { PLATE_INK, PLATE_PAPER, PLATE_RED } from "@/lib/plates";

export const ART_W = 800;
export const ART_H = 1000;

/** screen rulings, in GLASS pixels (the magnified space the visitor sees) */
const PITCH_K = 5.2; /* key carries the detail — finer, like real print */
const PITCH_C = 7.0; /* the two colour screens */
const ANG_K = 45;
const ANG_A = 15;
const ANG_R = 75;

/* round dot with press gain: r = P·√cov·(0.5642 + JOIN·cov). The 0.5642 term
   is the exact equal-area dot; the JOIN term is dot gain that closes the
   diagonal pinholes at full coverage (r→0.754P ≥ P/√2) so solids print
   SOLID — without it the whole dark field reads as a checkerboard of paper */
const DOT_A = 0.5642;
const DOT_JOIN = 0.19;

export interface Separation {
  w: number;
  h: number;
  k: Uint8ClampedArray;
  a: Uint8ClampedArray;
  r: Uint8ClampedArray;
}

/* ---------------- density math ---------------- */

function hexRGB(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const T_FLOOR = 0.02; /* transmittance floor — caps density, avoids ln(0) */

/** per-channel optical density of an ink laid on the plate paper */
function inkDensity(hex: string, paper: [number, number, number]): [number, number, number] {
  const c = hexRGB(hex);
  const d = [0, 0, 0] as [number, number, number];
  for (let i = 0; i < 3; i++) {
    const t = Math.min(1, Math.max(T_FLOOR, c[i] / Math.max(1, paper[i])));
    d[i] = -Math.log(t);
  }
  return d;
}

function dot3(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Unmix the rendered plate into key / accent / red coverage maps.
 * Chunked over rows (a macro-task between chunks) so the build never blocks
 * the main thread for more than a few ms — the glass shows the smooth zoom
 * until the dots are ready, and the resolve reads as the loupe focusing.
 */
export async function buildSeparation(uri: string, accent: string): Promise<Separation> {
  const img = new Image();
  img.decoding = "async";
  const loaded = new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("sep source failed to load"));
  });
  img.src = uri;
  await loaded;

  const cv = document.createElement("canvas");
  cv.width = ART_W;
  cv.height = ART_H;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  if (!cx) throw new Error("no 2d context");
  cx.drawImage(img, 0, 0, ART_W, ART_H);
  const px = cx.getImageData(0, 0, ART_W, ART_H).data;

  const paper = hexRGB(PLATE_PAPER);
  const Dk = inkDensity(PLATE_INK, paper);
  const Da = inkDensity(accent, paper);
  const Dr = inkDensity(PLATE_RED, paper);

  /* Gram matrix of the ink basis + its inverse (3×3, computed once) */
  const g00 = dot3(Dk, Dk), g01 = dot3(Dk, Da), g02 = dot3(Dk, Dr);
  const g11 = dot3(Da, Da), g12 = dot3(Da, Dr), g22 = dot3(Dr, Dr);
  const det =
    g00 * (g11 * g22 - g12 * g12) -
    g01 * (g01 * g22 - g12 * g02) +
    g02 * (g01 * g12 - g11 * g02);
  const i00 = (g11 * g22 - g12 * g12) / det;
  const i01 = (g02 * g12 - g01 * g22) / det;
  const i02 = (g01 * g12 - g02 * g11) / det;
  const i11 = (g00 * g22 - g02 * g02) / det;
  const i12 = (g01 * g02 - g00 * g12) / det;
  const i22 = (g00 * g11 - g01 * g01) / det;

  /* 2×2 pair solvers (active-set fallback when a coverage goes negative) */
  const detKA = g00 * g11 - g01 * g01;
  const detKR = g00 * g22 - g02 * g02;
  const detAR = g11 * g22 - g12 * g12;

  const N = ART_W * ART_H;
  const K = new Uint8ClampedArray(N);
  const A = new Uint8ClampedArray(N);
  const R = new Uint8ClampedArray(N);

  const ROWS_PER_CHUNK = 40; /* ~3-4ms a chunk — a warm build never owns a frame */
  for (let y0 = 0; y0 < ART_H; y0 += ROWS_PER_CHUNK) {
    const y1 = Math.min(ART_H, y0 + ROWS_PER_CHUNK);
    for (let y = y0; y < y1; y++) {
      let o = y * ART_W;
      let q = o * 4;
      for (let x = 0; x < ART_W; x++, o++, q += 4) {
        /* pixel density relative to the paper */
        const d0 = -Math.log(Math.min(1, Math.max(T_FLOOR, px[q] / paper[0])));
        const d1 = -Math.log(Math.min(1, Math.max(T_FLOOR, px[q + 1] / paper[1])));
        const d2 = -Math.log(Math.min(1, Math.max(T_FLOOR, px[q + 2] / paper[2])));
        const bk = Dk[0] * d0 + Dk[1] * d1 + Dk[2] * d2;
        const ba = Da[0] * d0 + Da[1] * d1 + Da[2] * d2;
        const br = Dr[0] * d0 + Dr[1] * d1 + Dr[2] * d2;
        let ck = i00 * bk + i01 * ba + i02 * br;
        let ca = i01 * bk + i11 * ba + i12 * br;
        let cr = i02 * bk + i12 * ba + i22 * br;
        if (ck < 0 || ca < 0 || cr < 0) {
          /* drop the most negative ink, re-solve the remaining pair, then
             clamp — visually indistinguishable from full NNLS here */
          if (ck <= ca && ck <= cr) {
            ck = 0;
            ca = (g22 * ba - g12 * br) / detAR;
            cr = (g11 * br - g12 * ba) / detAR;
          } else if (ca <= ck && ca <= cr) {
            ca = 0;
            ck = (g22 * bk - g02 * br) / detKR;
            cr = (g00 * br - g02 * bk) / detKR;
          } else {
            cr = 0;
            ck = (g11 * bk - g01 * ba) / detKA;
            ca = (g00 * ba - g01 * bk) / detKA;
          }
          if (ck < 0) ck = 0;
          if (ca < 0) ca = 0;
          if (cr < 0) cr = 0;
        }
        K[o] = ck * 255;
        A[o] = ca * 255;
        R[o] = cr * 255;
      }
    }
    if (y1 < ART_H) await new Promise((res) => setTimeout(res, 0));
  }
  return { w: ART_W, h: ART_H, k: K, a: A, r: R };
}

/* ---------------- the screened window ---------------- */

/** bilinear coverage sample, 0..1, zero outside the sheet */
function sample(map: Uint8ClampedArray, w: number, h: number, x: number, y: number): number {
  if (x < 0 || y < 0 || x > w - 1 || y > h - 1) return 0;
  const x0 = x | 0;
  const y0 = y | 0;
  const x1 = x0 < w - 1 ? x0 + 1 : x0;
  const y1 = y0 < h - 1 ? y0 + 1 : y0;
  const fx = x - x0;
  const fy = y - y0;
  const top = map[y0 * w + x0] * (1 - fx) + map[y0 * w + x1] * fx;
  const bot = map[y1 * w + x0] * (1 - fx) + map[y1 * w + x1] * fx;
  return (top * (1 - fy) + bot * fy) / 255;
}

export interface WindowOpts {
  /** glass diameter in CSS px (ctx is pre-scaled for DPR) */
  size: number;
  /** accent ink hex (the luminous variant the plates print in) */
  accent: string;
  /** artwork px → glass px scale (cover-scale × loupe magnification) */
  S: number;
  /** artwork origin in glass coords (the CSS background-position pair, unrounded) */
  offX: number;
  offY: number;
  /** focus-pull radius multiplier (1 = resolved) */
  focus: number;
  /** the solid type pass — small type is never screened in real print; the
   *  pre-rasterized text layer (whole plate at S, DPR-crisp) blits over the
   *  dots so the micro-notes stay razor under the glass */
  text?: { src: CanvasImageSource; w: number; h: number } | null;
}

interface Screen {
  ink: string;
  map: "k" | "a" | "r";
  cos: number;
  sin: number;
  pitch: number;
  /** multiply only where overprint truly differs — the red pass over accent.
   *  Key is near-black (multiply ≈ itself) and accent lands on bare paper, so
   *  those run source-over, which software rasterizers fill much faster. */
  blend: GlobalCompositeOperation;
}

function screensFor(accent: string): Screen[] {
  const mk = (
    ink: string,
    map: "k" | "a" | "r",
    deg: number,
    pitch: number,
    blend: GlobalCompositeOperation,
  ): Screen => ({
    ink,
    map,
    cos: Math.cos((deg * Math.PI) / 180),
    sin: Math.sin((deg * Math.PI) / 180),
    pitch,
    blend,
  });
  /* draw order: colour passes down first, red overprints, key locks it */
  return [
    mk(accent, "a", ANG_A, PITCH_C, "source-over"),
    mk(PLATE_RED, "r", ANG_R, PITCH_C, "multiply"),
    mk(PLATE_INK, "k", ANG_K, PITCH_K, "source-over"),
  ];
}

/** cache the trig per accent — accents change on a chip click, never per frame */
let screenCache: { accent: string; screens: Screen[] } | null = null;

function screensCached(accent: string): Screen[] {
  if (!screenCache || screenCache.accent !== accent) {
    screenCache = { accent, screens: screensFor(accent) };
  }
  return screenCache.screens;
}

/** paint ONE ink screen's dots into ctx. `size` is the paint region (CSS px,
 *  ctx pre-scaled for DPR); offX/offY place the ARTWORK origin in that region
 *  — the dot grid is anchored to the artwork, so panning translates it. */
function paintScreen(
  ctx: CanvasRenderingContext2D,
  sep: Separation,
  sc: Screen,
  size: number,
  offX: number,
  offY: number,
  S: number,
  focus: number,
  /** optional y-band (region coords) — staged tile builds paint the dense
   *  key screen in halves so no single frame carries it whole */
  y0 = -Infinity,
  y1 = Infinity,
): void {
  ctx.globalCompositeOperation = sc.blend;
  const P = sc.pitch;
  const maxR = P * (DOT_A + DOT_JOIN) * focus;
  const pad = maxR + 1;
  const bandTop = Math.max(-pad, y0);
  const bandBot = Math.min(size + pad, y1);
  /* bound the rotated grid by projecting the padded band's corners */
  let uMin = Infinity, uMax = -Infinity, vMin = Infinity, vMax = -Infinity;
  for (let cx = 0; cx < 2; cx++) {
    for (let cy = 0; cy < 2; cy++) {
      const wx = (cx ? size + pad : -pad) - offX;
      const wy = (cy ? bandBot : bandTop) - offY;
      const u = (wx * sc.cos + wy * sc.sin) / P;
      const v = (-wx * sc.sin + wy * sc.cos) / P;
      if (u < uMin) uMin = u;
      if (u > uMax) uMax = u;
      if (v < vMin) vMin = v;
      if (v > vMax) vMax = v;
    }
  }
  ctx.beginPath();
  for (let v = Math.floor(vMin); v <= Math.ceil(vMax); v++) {
    for (let u = Math.floor(uMin); u <= Math.ceil(uMax); u++) {
      const ax = (u * sc.cos - v * sc.sin) * P;
      const ay = (u * sc.sin + v * sc.cos) * P;
      const wx = ax + offX;
      const wy = ay + offY;
      if (wx < -pad || wx > size + pad || wy < bandTop || wy >= bandBot) continue;
      const cov = sample(sep[sc.map], sep.w, sep.h, ax / S, ay / S);
      if (cov < 0.015) continue;
      const r = P * Math.sqrt(cov) * (DOT_A + DOT_JOIN * cov) * focus;
      ctx.moveTo(wx + r, wy);
      ctx.arc(wx, wy, r, 0, Math.PI * 2);
    }
  }
  ctx.fillStyle = sc.ink;
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

/** clip dot painting to the plate's true edge — ink trims clean at the sheet,
 *  it never scallops (dots at full coverage otherwise merge into blobs that
 *  overhang the artwork boundary) */
function clipToPlate(
  ctx: CanvasRenderingContext2D,
  offX: number,
  offY: number,
  S: number,
): void {
  ctx.beginPath();
  ctx.rect(offX, offY, ART_W * S, ART_H * S);
  ctx.clip();
}

function paintAll(
  ctx: CanvasRenderingContext2D,
  sep: Separation,
  accent: string,
  size: number,
  offX: number,
  offY: number,
  S: number,
  focus: number,
): void {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = PLATE_PAPER;
  ctx.fillRect(0, 0, size, size);
  ctx.save();
  clipToPlate(ctx, offX, offY, S);
  for (const sc of screensCached(accent)) {
    paintScreen(ctx, sep, sc, size, offX, offY, S, focus);
  }
  ctx.restore();
}

/**
 * THE TILE — steady-state panning must cost blits, not arcs (the site's rAF
 * law). Dots render into an oversized offscreen tile anchored to the artwork;
 * each pan frame blits the visible window out of it. A fresh tile builds
 * DOUBLE-BUFFERED and STAGED (one ink screen per render call) whenever the
 * window nears the front tile's edge, then swaps in whole — so no frame ever
 * pays for more than one screen's dots, and most pay for none.
 */
const TILE_MARG = 128; /* travel budget around the window */
const TILE_TRIGGER = 84; /* start the next build this far from the edge */

export class HalftoneTiler {
  private size: number;
  private dpr: number;
  private tileSize: number;
  private front: HTMLCanvasElement | null = null;
  private back: HTMLCanvasElement | null = null;
  private fx = 0; /* front tile origin, artwork-anchored glass coords */
  private fy = 0;
  private frontValid = false;
  private bx = 0;
  private by = 0;
  private stage = 0; /* 0 idle · 1..3 next screen to paint into back */
  private key: { sep: Separation; accent: string; S: number } | null = null;

  constructor(size: number, dpr: number) {
    this.size = size;
    this.dpr = dpr;
    this.tileSize = size + 2 * TILE_MARG;
    try {
      this.front = document.createElement("canvas");
      this.back = document.createElement("canvas");
      const px = Math.round(this.tileSize * dpr);
      this.front.width = px;
      this.front.height = px;
      this.back.width = px;
      this.back.height = px;
    } catch {
      this.front = this.back = null; /* direct painting still works */
    }
  }

  /** paint the window's dots into ctx (blit when possible). Advances at most
   *  one staged screen per call. Falls back to a direct paint when the tile
   *  machinery can't serve the frame. */
  paint(ctx: CanvasRenderingContext2D, sep: Separation, o: WindowOpts): void {
    const focusing = o.focus !== 1;
    if (this.key && (this.key.sep !== sep || this.key.accent !== o.accent || this.key.S !== o.S)) {
      this.frontValid = false;
      this.stage = 0;
      this.key = null;
    }
    if (!this.key) this.key = { sep, accent: o.accent, S: o.S };

    const wx0 = -o.offX; /* window origin, artwork-anchored glass coords */
    const wy0 = -o.offY;

    if (!this.front || !this.back) {
      paintAll(ctx, sep, o.accent, this.size, o.offX, o.offY, o.S, o.focus);
      return;
    }

    /* keep the build moving whenever a frame comes through */
    this.advanceBuild(sep, o, wx0, wy0);

    const inside =
      this.frontValid &&
      wx0 >= this.fx &&
      wy0 >= this.fy &&
      wx0 + this.size <= this.fx + this.tileSize &&
      wy0 + this.size <= this.fy + this.tileSize;

    if (focusing || !inside) {
      /* focus animates radii (tile would churn) — and an outrun window can't
         blit. Both paint direct; the staged build keeps converging. */
      paintAll(ctx, sep, o.accent, this.size, o.offX, o.offY, o.S, o.focus);
      return;
    }

    const d = this.dpr;
    ctx.clearRect(0, 0, this.size, this.size);
    ctx.drawImage(
      this.front,
      (wx0 - this.fx) * d,
      (wy0 - this.fy) * d,
      this.size * d,
      this.size * d,
      0,
      0,
      this.size,
      this.size,
    );
  }

  private advanceBuild(sep: Separation, o: WindowOpts, wx0: number, wy0: number): void {
    const needFresh =
      !this.frontValid ||
      wx0 - this.fx < TILE_TRIGGER ||
      wy0 - this.fy < TILE_TRIGGER ||
      this.fx + this.tileSize - (wx0 + this.size) < TILE_TRIGGER ||
      this.fy + this.tileSize - (wy0 + this.size) < TILE_TRIGGER;

    if (this.stage === 0) {
      if (!needFresh) return;
      /* a fresh back tile, centred on where the window is now */
      this.bx = Math.round(wx0 - TILE_MARG);
      this.by = Math.round(wy0 - TILE_MARG);
      const bctx = this.back!.getContext("2d");
      if (!bctx) return;
      bctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      bctx.globalCompositeOperation = "source-over";
      bctx.fillStyle = PLATE_PAPER;
      bctx.fillRect(0, 0, this.tileSize, this.tileSize);
      this.stage = 1;
      return;
    }

    const screens = screensCached(o.accent);
    const bctx = this.back!.getContext("2d");
    if (!bctx) return;
    bctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    /* stage plan: each screen in top/bottom halves — six slim frames, so no
       single frame ever carries a whole screen's dots */
    const mid = this.tileSize / 2;
    const si = (this.stage - 1) >> 1; /* which screen */
    const top = (this.stage - 1) % 2 === 0;
    bctx.save();
    clipToPlate(bctx, -this.bx, -this.by, o.S);
    paintScreen(
      bctx,
      sep,
      screens[si],
      this.tileSize,
      -this.bx,
      -this.by,
      o.S,
      1,
      top ? -Infinity : mid,
      top ? mid : Infinity,
    );
    bctx.restore();
    this.stage++;
    if (this.stage > 6) {
      /* swap — the built tile becomes the front */
      const t = this.front!;
      this.front = this.back;
      this.back = t;
      this.fx = this.bx;
      this.fy = this.by;
      this.frontValid = true;
      this.stage = 0;
    }
  }
}

export function renderHalftoneWindow(
  ctx: CanvasRenderingContext2D,
  sep: Separation,
  o: WindowOpts,
  tiler?: HalftoneTiler | null,
): void {
  if (tiler) tiler.paint(ctx, sep, o);
  else paintAll(ctx, sep, o.accent, o.size, o.offX, o.offY, o.S, o.focus);
  /* the type pass — set solid over the screens, exactly as a press would;
     kept out of the tile so its glyphs never resample on a subpixel blit */
  if (o.text) {
    ctx.drawImage(o.text.src, o.offX, o.offY, o.text.w, o.text.h);
  }
}
