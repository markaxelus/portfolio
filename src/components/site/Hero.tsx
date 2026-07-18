"use client";

import { useRef, type CSSProperties } from "react";
import { useHero } from "@/app/_engine/hero/use-hero";
import { inkChars } from "@/app/_engine/hero/chars";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useHero(rootRef, titleRef);

  return (
    <section className="hero" id="hero" ref={rootRef}>
      {/* the specimen: his favourite glyph, at every optical size */}
      <div className="specimen final" aria-hidden="true">
        <span className="spec-head mono">SPECIMEN &middot; FRAUNCES VF &middot; OPSZ 9&rarr;144</span>
        <span className="spec-amp s1" style={{ "--o": "9", "--w": "420" } as CSSProperties}>&amp;<i className="mono">9 &middot; 420</i></span>
        <span className="spec-amp s2" style={{ "--o": "24", "--w": "450" } as CSSProperties}>&amp;<i className="mono">24 &middot; 450</i></span>
        <span className="spec-amp s3" style={{ "--o": "56", "--w": "480" } as CSSProperties}>&amp;<i className="mono">56 &middot; 480</i></span>
        <span className="spec-amp s4" style={{ "--o": "96", "--w": "510" } as CSSProperties}>&amp;<i className="mono">96 &middot; 510</i></span>
        <span className="spec-amp s5" style={{ "--o": "144", "--w": "540", "--k": "1" } as CSSProperties}>&amp;<i className="mono">144 &middot; 540 &middot; WONK</i></span>
        <span className="spec-foot mono">ONE GLYPH, PULLED AT EVERY SIZE &middot; NOT FOR RESALE</span>
      </div>

      {/* the ink calibration bar: proof-sheet furniture, 10→80% */}
      <div className="tonebar final" aria-hidden="true">
        <i style={{ "--t": ".08" } as CSSProperties}></i><i style={{ "--t": ".16" } as CSSProperties}></i><i style={{ "--t": ".24" } as CSSProperties}></i><i style={{ "--t": ".32" } as CSSProperties}></i>
        <i style={{ "--t": ".42" } as CSSProperties}></i><i style={{ "--t": ".52" } as CSSProperties}></i><i style={{ "--t": ".64" } as CSSProperties}></i><i style={{ "--t": ".78" } as CSSProperties}></i>
        <span className="mono">INK 10&rarr;80%</span>
      </div>

      {/* the fold: the void is measured, not empty */}
      <span className="foldline final" aria-hidden="true"><i className="mono">FOLD</i></span>

      {/* machine decals */}
      <div className="d-cluster spec final">
        <span className="decode" tabIndex={0}><span className="c1">MA//TC-IV <span className="sq" aria-hidden="true"></span></span><span className="c2">mark axelus, fourth redesign this year</span></span>
        <span className="decode" tabIndex={0}><span className="c1">00.MA2093 &nbsp;00 01</span><span className="c2">means nothing. looks great.</span></span>
        <span className="decode" tabIndex={0}><span className="c1">VISIT Nº <span id="visit-n" suppressHydrationWarning>001</span></span><span className="c2">yes, i&rsquo;m counting.</span></span>
      </div>
      <span className="d-scatter spec final decode" tabIndex={0}><span className="c1">R.00 &nbsp;&#9633; &nbsp;-sL</span><span className="c2">leftover from v2. sentimental.</span></span>
      <span className="d-cross final" aria-hidden="true"></span>
      <span className="d-run spec final"><span className="decode" tabIndex={0}><span className="c1">[RUN.M] MESS LAYER ARMED</span><span className="c2">press M. you&rsquo;ll see.</span></span> <span className="blink" aria-hidden="true"></span></span>

      <p className="eyebrow mono final">( ONE-PERSON PRACTICE &middot; <em>EST. 2019</em> )</p>
      <h1 className="hero-title final v3" id="hero-title" ref={titleRef}>
        <span className="amp" id="amp" data-ink="">{inkChars("&")}</span>
        <span className="v3-words">
          <span className="v3-word v3-mark" id="markw" data-ink="">{inkChars("Mark")}</span>
          <span className="v3-word v3-desk" id="deskw" data-ink="">{inkChars("My\u00A0desk")}</span>
        </span>
      </h1>
      <aside className="hero-bio mono final" id="hero-bio">
        <span className="bio-rule" aria-hidden="true"></span>
        <span style={{ whiteSpace: "nowrap" } as CSSProperties}>I&rsquo;m Mark, a software engineer.</span><br/>
        <span style={{ whiteSpace: "nowrap" } as CSSProperties}>One person, one desk, a very high bar.</span><br/>
        This is the fourth version this year; the first three weren&rsquo;t good enough.
      </aside>

      {/* loose type: the case is open */}
      <button className="spec loose-decal" id="type-decal" type="button">[!] LOOSE TYPE &middot; GRAB A LETTER</button>

      {/* the plate pull, named on the sheet (click = one demo pull) */}
      <button className="spec plates-decal" id="plates-decal" type="button">[&#8679;] PLATES &middot; SHIFT-DRAG, OFF REGISTER</button>

      {/* the hand (mess layer, anchored to the type — underlines "desk") */}
      <div className="amark scrawl" id="amark-desk" aria-hidden="true">
        <svg viewBox="0 0 100 14" preserveAspectRatio="none">
          <path className="draw" pathLength="1" d="M2,7 C20,10 42,4 60,8 C76,11 90,6 98,8" fill="none"/>
          <path className="draw echo" pathLength="1" d="M4,10 C24,12 48,7 68,10 C80,12 92,9 97,11" fill="none"/>
        </svg>
      </div>

      {/* hero marginalia */}
      <div className="proof-notes" aria-hidden="true">
        <span className="note hand-k n-eyebrow" style={{ "--d": ".16s" } as CSSProperties}>since 2019. feels longer</span>

        <div className="note drafts" style={{ "--d": ".22s" } as CSSProperties}>
          <span className="drafts-head mono">REJECTED:</span>
          <span className="hand-b struck">pixels &amp; feelings</span>
          <span className="hand-b struck">code, design &amp; coffee</span>
          {/* the proofreader wavered on this one: stet dots under the
              strike, the question, the answer */}
          <span className="hand-b struck st-line">code, design &amp; nerve<em className="stet hand-k" aria-hidden="true">stet?</em><em className="stet-no hand-b" aria-hidden="true">no.</em></span>
          <span className="hand-b struck">from the desk of mark &amp;</span>
          <span className="hand-k">mark &amp; my desk &nbsp;&#10003; <em>(finally)</em></span>
        </div>

        <span className="note hand-b n-lh" style={{ "--d": ".30s" } as CSSProperties}>the words sit crooked. &minus;3&deg; and +1.8&deg;.<br/>measured. on purpose. leave them.</span>

        <span className="note hand-b n-noscale" style={{ "--d": ".55s" } as CSSProperties}>do not scale. final size. i mean it.<br/><em>(it&rsquo;s four times bigger now.)</em></span>

        {/* JS-anchored: circle around the ampersand — sized from the live
             glyph by positionAnchors (the v3 amp is a monument, the loop
             stretches to wrap it; stroke stays pen-weight) */}
        <div className="anchor anchor-amp" id="anchor-amp" style={{ "--d": ".34s" } as CSSProperties}>
          <svg viewBox="0 0 180 120" preserveAspectRatio="none" className="scrawl">
            <path className="draw" pathLength="1" d="M90,18 C128,12 160,32 157,58 C154,88 118,106 80,103 C44,100 19,84 22,57 C25,29 56,23 96,20" fill="none"/>
            <path className="draw echo" pathLength="1" d="M92,23 C126,18 154,36 151,59 C148,84 116,100 82,98 C50,96 27,82 29,58 C31,34 58,28 94,25" fill="none"/>
          </svg>
          <span className="hand-k ac-1">the amp stays. favorite glyph.</span>
          <span className="hand-b ac-2">(you say that every time)</span>
          <span className="hand-b ac-3">(it&rsquo;s 30vw now. we&rsquo;re past help.)</span>
        </div>

        {/* JS-anchored: bracket beside the bio */}
        <div className="anchor anchor-bio" id="anchor-bio" style={{ "--d": ".40s" } as CSSProperties}>
          <svg viewBox="0 0 24 200" preserveAspectRatio="none" className="scrawl">
            <path className="draw" pathLength="1" d="M20,4 C6,10 8,60 9,100 C10,140 6,190 20,196" fill="none"/>
          </svg>
          <span className="hand-b">38ch on the long line.<br/>i counted. of course i counted.</span>
        </div>

        {/* the version ledger: the bio admits there were three before this one.
             the margins remember how each of them actually went. */}
        <div className="note versions" style={{ "--d": ".48s" } as CSSProperties}>
          <span className="vers-head mono">THIS SITE, SO FAR:</span>
          <span className="hand-k struck">v1 &middot; too safe</span>
          <span className="hand-k struck">v2 &middot; too loud</span>
          <span className="hand-k struck">v3 &middot; died at 90%</span>
          <span className="hand-k">v4 &middot; you&rsquo;re on it</span>
          <span className="hand-b">(define &ldquo;done&rdquo;)</span>
        </div>

        {/* the ledger's evidence — the dead versions, sketched from memory:
            v1 all symmetry, v2 all volume, v3's sketch stops drawing where
            v3 stopped (the .vg3-stop stroke never finishes) */}
        <div className="note vghosts" style={{ "--d": ".58s" } as CSSProperties}>
          <svg className="scrawl vg" viewBox="0 0 56 42"><path className="draw" pathLength="1" d="M4,5 H52 V37 H4 Z" fill="none"/><path className="draw" pathLength="1" d="M20,14 H36 M16,20 H40 M22,26 H34" fill="none" opacity=".55"/></svg>
          <svg className="scrawl vg vg2" viewBox="0 0 56 42"><path className="draw" pathLength="1" d="M2,36 L15,5 L28,36 M8,25 H22" fill="none"/><path className="draw" pathLength="1" d="M33,5 V36 M33,5 H51 M33,20 H47 M33,36 H51" fill="none"/></svg>
          <svg className="scrawl vg" viewBox="0 0 56 42"><path className="draw" pathLength="1" d="M4,8 H36 M4,15 H30" fill="none"/><path className="draw" pathLength="1" d="M4,24 H24 V36 H4 Z" fill="none"/><path className="draw vg3-stop" pathLength="1" d="M30,24 H52 V36 H30" fill="none"/></svg>
        </div>

        {/* the arrow from "do not scale" up at the thing that got scaled anyway */}
        <svg className="note scrawl dd-nsarrow" style={{ "--d": ".62s" } as CSSProperties} viewBox="0 0 60 52" aria-hidden="true">
          <path className="draw" pathLength="1" d="M8,46 C20,38 34,26 46,10 M46,10 l-2,11 M46,10 l-11,3" fill="none"/>
        </svg>
      </div>
    </section>
  );
}
