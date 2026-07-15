"use client";

import { useCallback, useEffect, useRef } from "react";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * PRESS NOISE — opt-in WebAudio, ported VERBATIM from prototypes/main.js
 * (2121-2239). Two sounds for the desk (a letterpress CLACK when thrown type
 * lands, a stone TOK when a visitor leaves one) plus the weighted slot-machine
 * SLAM for the & finale. Nothing plays until noise is enabled ([S] decal /
 * S-key), and the preference is NEVER persisted — sound is a per-visit choice,
 * not an ambush on the next load.
 *
 * This hook OWNS engine.api.current.sndClack / sndTok / sndSlam (the loose-type
 * impact, the cairn / stamp knocks and the amp finale call them through the
 * registry, no-op-safe until we mount). The AudioContext is created LAZILY on
 * first enable and resume()d on enable; the synth graphs are byte-identical to
 * the originals. Every synth gates on the live engine.noiseOn — mirrored to a
 * ref so the (stable) functions read it exactly as the source's `noiseOn`.
 */
export function useAmbientAudio(): void {
  const { noiseOn, api } = useEngine();

  // mirror the live gate so the stable synth fns read it like main.js's noiseOn
  const noiseOnRef = useRef(noiseOn);
  noiseOnRef.current = noiseOn;

  const audioCtxRef = useRef<AudioContext | null>(null);

  // main.js noiseCtx(): lazy-create, resume() on suspend, return the context
  const noiseCtx = useCallback((): AudioContext | null => {
    if (!audioCtxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  // sndClack(v) — metal type meets the bed: filtered noise tap over a wooden
  // thump (main.js 2138-2166). `v` is the impact volume (loose type clamps it).
  const sndClack = useCallback(
    (v = 1) => {
      if (!noiseOnRef.current) return;
      const ctx = noiseCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      const len = Math.floor(ctx.sampleRate * 0.05);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2600;
      bp.Q.value = 1.4;
      const g1 = ctx.createGain();
      g1.gain.setValueAtTime(0.5 * v, t);
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      src.connect(bp);
      bp.connect(g1);
      g1.connect(ctx.destination);
      src.start(t);
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(190, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.4 * v, t);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(g2);
      g2.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    },
    [noiseCtx],
  );

  // sndSlam() — the weighted slot-machine LANDING for the & finale (THE LAST
  // SLUG): a sub tonnage, a metal body-knock, a click transient, and a tiny
  // detent 'ting' as the spring catches (main.js 2170-2213).
  const sndSlam = useCallback(() => {
    if (!noiseOnRef.current) return;
    const ctx = noiseCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(130, t);
    sub.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const gs = ctx.createGain();
    gs.gain.setValueAtTime(0.6, t);
    gs.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    sub.connect(gs);
    gs.connect(ctx.destination);
    sub.start(t);
    sub.stop(t + 0.14);
    const knock = ctx.createOscillator();
    knock.type = "triangle";
    knock.frequency.setValueAtTime(320, t);
    knock.frequency.exponentialRampToValueAtTime(90, t + 0.08);
    const gk = ctx.createGain();
    gk.gain.setValueAtTime(0.5, t);
    gk.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    knock.connect(gk);
    gk.connect(ctx.destination);
    knock.start(t);
    knock.stop(t + 0.1);
    const len = Math.floor(ctx.sampleRate * 0.04);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 3200;
    bp.Q.value = 2;
    const gc = ctx.createGain();
    gc.gain.setValueAtTime(0.4, t);
    gc.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    src.connect(bp);
    bp.connect(gc);
    gc.connect(ctx.destination);
    src.start(t);
    const ting = ctx.createOscillator();
    ting.type = "sine";
    ting.frequency.setValueAtTime(1800, t + 0.008);
    const gt = ctx.createGain();
    gt.gain.setValueAtTime(0.08, t + 0.008);
    gt.gain.exponentialRampToValueAtTime(0.001, t + 0.033);
    ting.connect(gt);
    gt.connect(ctx.destination);
    ting.start(t + 0.008);
    ting.stop(t + 0.035);
  }, [noiseCtx]);

  // sndTok() — stone on stone: one damped knock (main.js 2214-2228)
  const sndTok = useCallback(() => {
    if (!noiseOnRef.current) return;
    const ctx = noiseCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(720, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.06);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }, [noiseCtx]);

  // OWN the three synths on the registry; delete only our own handles on unmount
  useEffect(() => {
    api.current.sndClack = sndClack;
    api.current.sndTok = sndTok;
    api.current.sndSlam = sndSlam;
    return () => {
      if (api.current.sndClack === sndClack) delete api.current.sndClack;
      if (api.current.sndTok === sndTok) delete api.current.sndTok;
      if (api.current.sndSlam === sndSlam) delete api.current.sndSlam;
    };
  }, [api, sndClack, sndTok, sndSlam]);

  // ENABLE: create+resume the context, then one knock so you know what you
  // signed up for (main.js setNoise(on): `if (noiseOn) noiseCtx(); … sndTok()`).
  // noiseOn boots false and is never persisted, so mount is a no-op — this fires
  // only on the rising edge (the [S] decal / S-key flip).
  useEffect(() => {
    if (!noiseOn) return;
    noiseCtx();
    sndTok();
  }, [noiseOn, noiseCtx, sndTok]);
}
